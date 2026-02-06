import React, { useState } from 'react';
import { Card, CardHeader, CardMedia, CardContent, CardActions, Typography, Avatar, IconButton, Divider, Box, TextField, Collapse } from '@mui/material';
import { Favorite, FavoriteBorder, ChatBubbleOutline, Send } from '@mui/icons-material';
import axios from 'axios';

const PostCard = ({ post, currentUserId, onLike, fetchPosts }) => {
  const [showComments, setShowComments] = useState(false);
  const [commentText, setCommentText] = useState('');
  const isLiked = post.likes.includes(currentUserId);
  const token = localStorage.getItem('token');

  const handleComment = async () => {
    if (!commentText.trim()) return;
    await axios.post(`https://social-app-il4g.onrender.com/api/posts/${post._id}/comment`, { text: commentText }, { headers: { 'Authorization': token } });
    setCommentText('');
    fetchPosts();
  };

  return (
    <Card sx={{ mb: 4, borderRadius: 4, boxShadow: '0 4px 20px rgba(0,0,0,0.05)', border: '1px solid #eef2f6' }}>
      <CardHeader
        avatar={<Avatar sx={{ bgcolor: '#10b981' }}>{post.username[0].toUpperCase()}</Avatar>}
        title={<Typography fontWeight="700">{post.username}</Typography>}
        subheader={new Date(post.createdAt).toDateString()}
      />
      {post.content && <CardContent sx={{ pt: 0 }}><Typography>{post.content}</Typography></CardContent>}
      {post.imageUrl && (
        <Box sx={{ px: 2, pb: 1 }}>
          <CardMedia component="img" image={post.imageUrl} sx={{ borderRadius: 3, maxHeight: 450, objectFit: 'cover' }} />
        </Box>
      )}
      <CardActions sx={{ px: 2 }}>
        <IconButton onClick={() => onLike(post._id)} color={isLiked ? "error" : "default"}>
          {isLiked ? <Favorite /> : <FavoriteBorder />}
        </IconButton>
        <Typography variant="body2" fontWeight="bold">{post.likes.length}</Typography>
        <IconButton onClick={() => setShowComments(!showComments)} sx={{ ml: 1 }}>
          <ChatBubbleOutline />
        </IconButton>
        <Typography variant="body2" fontWeight="bold">{post.comments.length}</Typography>
      </CardActions>

      <Collapse in={showComments}>
        <Divider />
        <Box sx={{ p: 2, bgcolor: '#fcfcfc' }}>
          {post.comments.map((c, i) => (
            <Box key={i} sx={{ mb: 1, display: 'flex', gap: 1 }}>
              <Typography variant="body2"><strong>{c.username}:</strong> {c.text}</Typography>
            </Box>
          ))}
          <Box sx={{ display: 'flex', mt: 1 }}>
            <TextField fullWidth size="small" placeholder="Add comment..." value={commentText} onChange={(e) => setCommentText(e.target.value)} />
            <IconButton color="primary" onClick={handleComment}><Send /></IconButton>
          </Box>
        </Box>
      </Collapse>
    </Card>
  );
};
export default PostCard;