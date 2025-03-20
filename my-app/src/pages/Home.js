import React from 'react';
import './Home.css';

function Home() {
  return (
    <div className="page">
      <img src="/data/attachments/blog1-file1.jpg" alt="blah" className="sunny" />
      <h1>Welcome to the Domain of Mr. Parrish</h1>
      <p>This is the home page. Feel free to explore!</p>
      <div className="contact-info">
        <h2>Contact Info</h2>
        <p>Name: Basil James Parrish</p>
        <p>Phone: <a href="tel:+13608209406">+1 (360)-820-9406</a></p>
        <p>Email: <a href="mailto:basilkenku@gmail.com">basilkenku@gmail.com</a></p>
        <p>
          Discord: <a href="https://discord.com/users/bjjflp" target="_blank" rel="noopener noreferrer">bjjflp</a>
        </p>
      </div>
    </div>
  );
}

export default Home;
