import React, { useState, useRef, useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar/Sidebar';
import Navbar from '../components/Navbar';

const MainLayout = () => {
  const [sidebarWidth, setSidebarWidth] = useState(280); // Default smaller size
  const [isResizing, setIsResizing] = useState(false);
  const [resetKey, setResetKey] = useState(0);
  const sidebarRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (isResizing) {
        const newWidth = e.clientX;
        if (newWidth >= 200 && newWidth <= 500) {
          setSidebarWidth(newWidth);
        }
      }
    };

    const handleMouseUp = () => {
      setIsResizing(false);
    };

    if (isResizing) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isResizing]);

  const handleNewProject = () => {
    setResetKey(prev => prev + 1);
    navigate('/');
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Left Sidebar */}
      <div 
        ref={sidebarRef}
        style={{ width: `${sidebarWidth}px` }}
        className="relative flex-shrink-0"
      >
        <Sidebar onNewProject={handleNewProject} />
        
        {/* Resize Handle */}
        <div
          className="absolute top-0 right-0 w-1 h-full resize-handle"
          onMouseDown={() => setIsResizing(true)}
        />
      </div>
      
      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">
        {/* Top Navigation */}
        <Navbar />
        
        {/* Main Content */}
        <main className="flex-1 overflow-auto">
          <Outlet context={{ resetKey }} />
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
