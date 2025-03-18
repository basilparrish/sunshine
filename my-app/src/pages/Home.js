import React from 'react';
import './Home.css';

function Home() {
  return (
    <div className="page">
      <img src="/favicon.ico" alt="Site Icon" className="site-icon" />
      <h1>Welcome to the Domain of Mr. Parrish</h1>
      <hr className="divider" />
      <p>i am a noob coder located in pacific northwest</p>
      <br/>
      <p> -contact info-</p>
      <p> phone: <a href="tel:+13608209406">+1 (360)-820-9406</a></p>
      <p> email: <a href="mailto:basilkenku@gmail.com">basilkenku@gmail.com</a></p>
      <br/>
      <p> -name- </p>
        <p> Basil James Parrish </p>
      <hr className="divider" />
      <p>This is the home page. Feel free to explore!</p>
    </div>
  );
}

export default Home;
