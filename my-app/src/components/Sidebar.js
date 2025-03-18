import React from 'react';
import './Sidebar.css';

function Sidebar({ onNavigate, pages }) {
  return (
    <div className="sidebar">
      <ul>
        {pages.map((page, index) => (
          <li key={index}>
            <a href={`#${page.name.toLowerCase()}`} onClick={() => onNavigate(page.name)}>
              {page.name}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Sidebar;
