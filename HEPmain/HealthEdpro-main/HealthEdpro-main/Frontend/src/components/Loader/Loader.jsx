import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const Loader = ({ onComplete }) => {
  const containerRef = useRef(null);
  const lettersRef = useRef([]);

  lettersRef.current = [];

  const addToRefs = (el) => {
    if (el && !lettersRef.current.includes(el)) {
      lettersRef.current.push(el);
    }
  };

  useEffect(() => {
    const tl = gsap.timeline({
      onComplete: () => {
        if (onComplete) onComplete();
      },
    });

    tl.fromTo(
      lettersRef.current,
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, stagger: 0.15, ease: 'power3.out' }
    )
      .to(lettersRef.current, { duration: 0.5, opacity: 1 })
      
      .to(containerRef.current, { opacity: 0, duration: 0.8, ease: 'power3.in' });
  }, [onComplete]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 flex items-center justify-center bg-black z-50"
    >
      <div className="flex space-x-2">
        {['HEALTH',  '', 'ED',  '', 'PRO' ].map(
          (letter, index) => (
            <span
              key={index}
              ref={addToRefs}
              className="text-4xl font-bold text-white opacity-0"
            >
              {letter}
            </span>
          )
        )}
      </div>
    </div>
  );
};

export default Loader;
