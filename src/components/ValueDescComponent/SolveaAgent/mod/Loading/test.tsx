'use client';
import React from 'react';
import Loading from './index';

export default function LoadingTest() {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '20px',
        padding: '50px',
        background: '#f0f0f0',
      }}
    >
      <h2>Loading Component Test</h2>

      <div>
        <h3>Default Loading</h3>
        <Loading />
      </div>

      <div>
        <h3>Custom Size</h3>
        <Loading size={150} />
      </div>

      <div>
        <h3>Custom Color</h3>
        <Loading
          size={200}
          color="#ff6b6b"
          backgroundColor="rgba(255, 107, 107, 0.1)"
        />
      </div>

      <div>
        <h3>Large Size</h3>
        <Loading
          size={300}
          color="#4ecdc4"
          backgroundColor="rgba(78, 205, 196, 0.1)"
        />
      </div>
    </div>
  );
}
