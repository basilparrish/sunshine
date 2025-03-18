import './App.css';
import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import pages from './pages/PageConfig';
import blogPosts from './data/blogPosts.json';
import Home from './pages/Home';
import Blog from './pages/Blog';

function App() {
  const [currentPage, setCurrentPage] = useState('Home');

  const renderContent = () => {
    switch (currentPage) {
      case 'Blog':
        return <Blog posts={blogPosts} />;
      case 'Home':
      default:
        return <Home />;
    }
  };

  return (
    <div className="App">
      <Sidebar onNavigate={setCurrentPage} pages={pages} />
      <div className="main-container">
        <div className="App-content">{renderContent()}</div>
      </div>
    </div>
  );
}

export default App;
