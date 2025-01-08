import React, { useRef, useEffect, useCallback } from 'react';
import { fileService } from '../api';

function Sidebar({ width, onResize, isVisible }) {
  const sidebarRef = useRef(null);
  const resizerRef = useRef(null);
  const isDraggingRef = useRef(false);

  const handleMouseMove = useCallback((e) => {
    if (!isDraggingRef.current) return;
    const newWidth = document.body.clientWidth - e.clientX;
    onResize(Math.max(200, Math.min(newWidth, 400)));
  }, [onResize]);

  const handleMouseUp = useCallback(() => {
    isDraggingRef.current = false;
    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mouseup', handleMouseUp);
    document.body.style.userSelect = '';
    document.body.style.cursor = '';
  }, [handleMouseMove]);

  const handleMouseDown = useCallback((e) => {
    e.preventDefault();
    isDraggingRef.current = true;
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
    document.body.style.userSelect = 'none';
    document.body.style.cursor = 'ew-resize';
  }, [handleMouseMove, handleMouseUp]);

  const handleApiRequest = async () => {
    try {
      const fileObject ={
        name: 'Example File',
        rootPath: '/root',
        folder: '/documents',
        fileNumber: '001',
        extension: '.pdf',
        path: '/root/documents/001.pdf',
        fileType: { category: 'File Type', value: 'Test type' },
        vendor: { category: 'Vendor', value: 'Kiewit' },
        systems: [{ category: 'System', value: 'System A' }],
        // tags: [{ stage: '1', status: 'Important' }],
        elements: [{
          coordinates: '10,20,30,40',
          originalPictureSize: '1000x800',
          startX: 10,
          startY: 20,
          endX: 30,
          endY: 40,
          width: 20,
          height: 20,
          pictureWidth: 1000,
          pictureHeight: 800,
          tagNumber: 'TAG001',
          elementType: { category: 'Element Type', value: 'Type A' }
      }]
    }
      const response = await fileService.createFile(fileObject);
      console.log('API response:', response);
      // Handle the response as needed
    } catch (error) {
      console.error('API request failed:', error);
      // Handle the error as needed
    }
  };
  useEffect(() => {
    const resizer = resizerRef.current;
    resizer.addEventListener('mousedown', handleMouseDown);

    return () => {
      resizer.removeEventListener('mousedown', handleMouseDown);
    };
  }, [handleMouseDown]);

  return (
    <div
      ref={sidebarRef}
      className={`sidebar ${isVisible ? '' : 'hidden'}`}
      style={{ width: `${width}px` }}
    >
      <div ref={resizerRef} className="resizer"></div>
      <h2>Sidebar</h2>
      <ul>
        <li>Menu Item 1</li>
        <li>Menu Item 2</li>
        <li>Menu Item 3</li>
      </ul>
      <button onClick={handleApiRequest}>Create File</button>
    </div>
  );
}

export default Sidebar;