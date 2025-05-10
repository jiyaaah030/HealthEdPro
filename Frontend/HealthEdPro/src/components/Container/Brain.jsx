import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';

const Brain3D = () => {
  const svgRef = useRef(null);

  useEffect(() => {
    gsap.to(svgRef.current, {
      rotationY: 720,   
      transformPerspective: 800, 
      transformOrigin: '50% 50%',
      duration: 4,
      repeat: -1,
      ease: 'linear'
    });
  }, []);

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="perspective-1000">
        <svg
          ref={svgRef}
          width="300"
          height="300"
          viewBox="0 0 300 300"
          className="w-64 h-64"
        >
          
          <path
            d="M150 20 
               C 200 20, 280 100, 150 280
               C 20 100, 100 20, 150 20
               Z"
            fill="#ffcc00"
          />
          <text
            x="50%"
            y="50%"
            textAnchor="middle"
            fill="#000"
            fontSize="20"
            fontWeight="bold"
            dy=".3em"
          >
            Mental Health Matters
          </text>
        </svg>
      </div>
    </div>
  );
};

export default Brain3D;
