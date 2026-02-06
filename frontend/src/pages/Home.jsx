import React, { useEffect, useState } from 'react';
import { Box, CircularProgress, Fade, Typography } from '@mui/material';
import Navbar from '../components/Navbar';
import CreatePost from '../components/CreatePost';
import PostCard from '../components/PostCard';
import ProfileGrid from '../components/ProfileGrid';
import axios from 'axios';
import './Home.css';

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState('feed');

  const [user] = useState({
    username: localStorage.getItem('username') || 'User',
    id: localStorage.getItem('userId'),
  });

  const token = localStorage.getItem('token');

  const fetchPosts = async () => {
    try {
      const res = await axios.get('https://social-app-il4g.onrender.com/api/posts');
      setPosts(res.data);
    } catch (err) {
      console.error('Fetch Error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleCreatePost = async (content, image) => {
    const formData = new FormData();
    formData.append('content', content);
    if (image) formData.append('image', image);

    try {
      await axios.post('https://social-app-il4g.onrender.com/api/posts', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: token,
        },
      });
      fetchPosts();
    } catch (err) {
      alert('Post failed!');
    }
  };

  const handleLike = async (postId) => {
    try {
      await axios.put(
        `https://social-app-il4g.onrender.com/api/posts/${postId}/like`,
        {},
        { headers: { Authorization: token } }
      );
      fetchPosts();
    } catch (err) {
      console.log('Like failed');
    }
  };

  return (
    <div className="home-wrapper">
      <Navbar
        user={user}
        onProfileClick={() => setView('profile')}
        onHomeClick={() => setView('feed')}
        handleLogout={() => {
          localStorage.clear();
          window.location.href = '/';
        }}
      />

      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 10 }}>
          <CircularProgress thickness={5} />
        </Box>
      ) : (
        <Fade in={true}>
          <div className="main-content">
            {view === 'feed' ? (
              <>
                
                <div className="sidebar">
                  <div>
                    <Typography variant="h6" fontWeight="800" color="#1e293b">
                      Share Something
                    </Typography>
                    <Typography variant="caption" color="textSecondary">
                      Let the community know what's up!
                    </Typography>
                  </div>

                  <CreatePost onPost={handleCreatePost} user={user} />

                  <div className="welcome-card">
                    <Typography variant="subtitle1">
                      Hi, {user.username}! 👋
                    </Typography>
                    <Typography variant="body2" sx={{ opacity: 0.8 }}>
                      Ready to inspire the community today? Share your thoughts.
                    </Typography>
                  </div>
                </div>

              
                <div className="feed-container">
                  <div
                    style={{
                      maxWidth: '680px',
                      margin: '0 auto',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '24px',
                    }}
                  >
                    <div className="feed-header">
                      <Typography
                        variant="h5"
                        fontWeight="800"
                        color="#1e293b"
                      >
                        Social Feed
                      </Typography>
                      <span className="post-count-badge">
                        {posts.length} Posts
                      </span>
                    </div>

                    {posts.length > 0 ? (
                      posts.map((post) => (
                        <PostCard
                          key={post._id}
                          post={post}
                          currentUserId={user.id}
                          onLike={handleLike}
                          fetchPosts={fetchPosts}
                        />
                      ))
                    ) : (
                      <div
                        style={{
                          textAlign: 'center',
                          padding: '50px',
                          background: '#fff',
                          borderRadius: '15px',
                        }}
                      >
                        <Typography color="textSecondary">
                          No posts yet.
                        </Typography>
                      </div>
                    )}
                  </div>
                </div>
              </>
            ) : (
              <div className="profile-view-full">
                <ProfileGrid posts={posts} username={user.username} />
              </div>
            )}
          </div>
        </Fade>
      )}
    </div>
  );
};

export default Home;
