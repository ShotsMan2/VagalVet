import React from 'react';

const BackgroundGeometry = () => {
  return (
    <div className="bg-geometry-container">
      <div className="geo-shape primary"></div>
      <div className="geo-shape secondary"></div>
      
      {/* Additional grid for cyberpunk/2031 feel */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundImage: `
          linear-gradient(var(--border-glass) 1px, transparent 1px),
          linear-gradient(90deg, var(--border-glass) 1px, transparent 1px)
        `,
        backgroundSize: '50px 50px',
        opacity: 0.1,
        perspective: '1000px',
        transform: 'rotateX(60deg) translateY(-100px) translateZ(-200px)',
        transformOrigin: 'top center'
      }}></div>
    </div>
  );
};

export default BackgroundGeometry;
