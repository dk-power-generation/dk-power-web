import React from 'react';

function Header({ toggleSidebar }) {
  return (
    <header className="header">
      <nav>
        <ul>
          <li><a href="/">Home</a></li>
          <li><a href="/files">Files</a></li>
          <li><a href="/contact">Contact</a></li>
        </ul>
      </nav>
      <button onClick={toggleSidebar}>Toggle Sidebar</button>
    </header>
  );
}

export default Header;