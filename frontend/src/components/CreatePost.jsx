import React, { useState } from 'react';
import { Card, TextField, Button, Box, IconButton, CircularProgress } from '@mui/material';
import { Image, Send } from '@mui/icons-material';

const CreatePost = ({ onPost }) => {
  const [content, setContent] = useState('');
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!content && !image) return;
    setLoading(true);
    await onPost(content, image);
    setContent('');
    setImage(null);
    setLoading(false);
  };

  return (
    <Card sx={{ p: 3, mb: 3, boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
      <TextField
        fullWidth
        placeholder="Share your thoughts..."
        multiline
        rows={2}
        variant="standard"
        InputProps={{ disableUnderline: true }}
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      
      {image && (
        <Box sx={{ mt: 2, borderRadius: 2, overflow: 'hidden', maxHeight: 200, width: 'fit-content' }}>
          <img src={URL.createObjectURL(image)} alt="Preview" style={{ maxWidth: '100%', maxHeight: '200px' }} />
        </Box>
      )}

      <Box display="flex" justifyContent="space-between" alignItems="center" mt={2}>
        <IconButton color="primary" component="label">
          <input hidden type="file" accept="image/*" onChange={(e) => setImage(e.target.files[0])} />
          <Image />
        </IconButton>
        
        <Button 
          variant="contained" 
          disableElevation 
          endIcon={loading ? <CircularProgress size={20} color="inherit"/> : <Send />}
          onClick={handleSubmit}
          disabled={loading}
          sx={{ borderRadius: 20, px: 3 }}
        >
          Post
        </Button>
      </Box>
    </Card>
  );
};
export default CreatePost;