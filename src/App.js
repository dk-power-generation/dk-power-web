import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import './App.css';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import MainContent from './components/MainContent';
import Files from './pages/files/Files';

const queryClient = new QueryClient();

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
    <QueryClientProvider client={queryClient}>
      <Router>
        <div className="App">
          <Header toggleSidebar={toggleSidebar} />
          <div className="content-wrapper">
            <div className="main-content">
              <Routes>
                <Route path="/" element={<MainContent />} />
                <Route path="/files" element={<Files />} />
              </Routes>
            </div>
            <Sidebar
              width={sidebarWidth}
              onResize={handleSidebarResize}
              isVisible={isSidebarVisible}
            />
          </div>
        </div>
      </Router>
    </QueryClientProvider>
  );
}

export default App;