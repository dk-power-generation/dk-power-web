import React, { useRef, useEffect, useCallback } from 'react';

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
      </div>
  );
}

export default Sidebar;