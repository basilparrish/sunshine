import React, { useState } from 'react';
import CollapsiblePost from '../components/CollapsiblePost'; // Ensure correct default import
import './Blog.css';

function Blog({ posts }) {
  const [expandedDates, setExpandedDates] = useState([]);
  const [openPosts, setOpenPosts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  const today = new Date().toISOString().split('T')[0]; // Get today's date in YYYY-MM-DD format

  const groupedPosts = posts.reduce((groups, post) => {
    const date = post.date;
    if (!groups[date]) {
      groups[date] = [];
    }
    groups[date].push(post);
    return groups;
  }, {});

  const sortedDates = Object.keys(groupedPosts).sort((a, b) => new Date(b) - new Date(a)); // Sort dates newest to oldest

  const handleDateClick = (date) => {
    if (expandedDates.includes(date)) {
      setExpandedDates(expandedDates.filter((d) => d !== date));
    } else {
      setExpandedDates([...expandedDates, date]);
    }
  };

  const handlePostClick = (post) => {
    if (openPosts.includes(post)) {
      setOpenPosts(openPosts.filter((p) => p !== post)); // Close the post if already open
    } else {
      setOpenPosts([...openPosts, post]); // Open the post if not already open
    }
  };

  const handleMovePost = (post, direction) => {
    const index = openPosts.indexOf(post);
    if (direction === 'up' && index > 0) {
      const newOrder = [...openPosts];
      [newOrder[index - 1], newOrder[index]] = [newOrder[index], newOrder[index - 1]];
      setOpenPosts(newOrder);
    } else if (direction === 'down' && index < openPosts.length - 1) {
      const newOrder = [...openPosts];
      [newOrder[index + 1], newOrder[index]] = [newOrder[index], newOrder[index + 1]];
      setOpenPosts(newOrder);
    }
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value.toLowerCase());
  };

  const filteredPosts = posts.filter(
    (post) =>
      post.title.toLowerCase().includes(searchQuery) ||
      post.subtitle.toLowerCase().includes(searchQuery) ||
      post.content.toLowerCase().includes(searchQuery)
  );

  const filteredDates = sortedDates.filter((date) =>
    groupedPosts[date].some((post) => filteredPosts.includes(post))
  );

  return (
    <div className="blog">
      <div className="date-sidebar">
        <input
          type="text"
          placeholder="Search posts..."
          className="search-bar"
          value={searchQuery}
          onChange={handleSearch}
        />
        <div className="date-list">
          {filteredDates.map((date) => (
            <div key={date} className="date-group">
              <button
                className={`date-button ${expandedDates.includes(date) ? 'active' : ''}`}
                onClick={() => handleDateClick(date)}
              >
                {date === today && <span className="new-indicator">-NEW POSTS-</span>}
                {date}
              </button>
              {expandedDates.includes(date) && (
                <div className="post-titles-box">
                  {groupedPosts[date]
                    .filter((post) => filteredPosts.includes(post))
                    .map((post, index) => (
                      <button
                        key={index}
                        className={`post-title-button ${
                          openPosts.includes(post) ? 'active' : ''
                        }`}
                        onClick={() => handlePostClick(post)}
                      >
                        {post.date === today && <span className="new-indicator">-NEW-</span>}
                        {post.title}
                      </button>
                    ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      <div className="content-area">
        {openPosts.length === 0 ? (
          <div className="blog-welcome">
            <img src={`${process.env.PUBLIC_URL}/data/attachments/blog1-file1.jpg`} alt="Site Icon" className="site-icon" />
            <h1>Welcome to the Blog!</h1>
            <hr className="divider" />
            <p>Explore posts and updates from Basil J Parrish.</p>
            <p>Click on a date or post title to get started!</p>
          </div>
        ) : (
          openPosts.map((post, index) => (
            <div
              key={index}
              className={`blog-post-content ${index === openPosts.length - 1 ? 'last-post' : ''}`}
            >
              <div className="post-controls">
                <button onClick={() => handleMovePost(post, 'up')}>↑</button>
                <button onClick={() => handleMovePost(post, 'down')}>↓</button>
                <button onClick={() => handlePostClick(post)}>✖</button>
              </div>
              <CollapsiblePost {...post} />
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Blog;
