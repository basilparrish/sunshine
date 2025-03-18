import React from 'react';
import CollapsiblePost from '../components/CollapsiblePost';
import './Blog.css';

function Blog({ posts }) {
  return (
    <div className="blog">
      <h2>Blog</h2>
      {posts.map((post, index) => (
        <CollapsiblePost key={index} {...post} />
      ))}
    </div>
  );
}

export default Blog;
