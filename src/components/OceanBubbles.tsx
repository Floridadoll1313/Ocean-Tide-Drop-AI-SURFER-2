import React from 'react';

export default function OceanBubbles() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0 bubbles">
      <span style={{ left: '10%', animationDuration: '8s', width: '30px', height: '30px' }}></span>
      <span style={{ left: '20%', animationDuration: '12s', animationDelay: '2s' }}></span>
      <span style={{ left: '35%', animationDuration: '9s', animationDelay: '4s', width: '40px', height: '40px' }}></span>
      <span style={{ left: '50%', animationDuration: '14s', animationDelay: '1s' }}></span>
      <span style={{ left: '65%', animationDuration: '10s', animationDelay: '3s', width: '25px', height: '25px' }}></span>
      <span style={{ left: '80%', animationDuration: '15s', animationDelay: '5s', width: '50px', height: '50px' }}></span>
      <span style={{ left: '90%', animationDuration: '11s', animationDelay: '0s' }}></span>
    </div>
  );
}
