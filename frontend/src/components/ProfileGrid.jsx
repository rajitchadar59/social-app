import React from 'react';
import { Box, Typography, Avatar } from '@mui/material';
import { Favorite, ChatBubble } from '@mui/icons-material';
import './ProfileGrid.css';

const ProfileGrid = ({ posts, username }) => {
  const myPosts = posts.filter(p => p.username === username);

  const totalLikes = myPosts.reduce(
    (sum, post) => sum + (post.likes?.length || 0), 0
  );

  const totalComments = myPosts.reduce(
    (sum, post) => sum + (post.comments?.length || 0), 0
  );

  return (
    <div className="profile-wrapper">
      
   
      <div className="profile-header">
        <Avatar className="profile-avatar">
          {username?.[0]?.toUpperCase()}
        </Avatar>

        <h2 className="profile-username">{username}</h2>

        <div className="profile-stats">
          <div>
           
            <span>Your Posts {myPosts.length}</span>
          </div>

        </div>
      </div>


      <div className="profile-grid">
        {myPosts.length > 0 ? (
          myPosts.map(post => (
            <div key={post._id} className="grid-item">
              
              {post.imageUrl ? (
                <img src={post.imageUrl} alt="post" />
              ) : (
                <div className="text-post">
                  {post.content.slice(0, 40)}...
                </div>
              )}

      
              <div className="grid-overlay">
                <div>
                  <Favorite fontSize="small" />
                  <span>{post.likes?.length || 0}</span>
                </div>
                <div>
                  <ChatBubble fontSize="small" />
                  <span>{post.comments?.length || 0}</span>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="empty-text">No posts to show</p>
        )}
      </div>

    </div>
  );
};

export default ProfileGrid;
