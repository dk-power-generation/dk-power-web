import React, { useState } from 'react';
import './App.css';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import MainContent from './components/MainContent';

function App() {
  const [sidebarWidth, setSidebarWidth] = useState(250);
  const [isSidebarVisible, setIsSidebarVisible] = useState(true);

  const handleSidebarResize = (newWidth) => {
    setSidebarWidth(newWidth);
  };

  const toggleSidebar = () => {
    setIsSidebarVisible(!isSidebarVisible);
  };

  return (
    <div className="App">
      <Header toggleSidebar={toggleSidebar} />
      <div className="content-wrapper">
        <MainContent />
        <Sidebar
          width={sidebarWidth}
          onResize={handleSidebarResize}
          isVisible={isSidebarVisible}
        />
      </div>
    </div>
  );
}

export default App;