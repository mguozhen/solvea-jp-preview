'use client';
import React from 'react';
import i18n from '@/i18n';

export default function NotFound() {
  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        padding: '20px',
        backgroundColor: '#f8f9fa',
      }}
    >
      <div style={{ maxWidth: '600px' }}>
        <h2
          style={{
            fontSize: '6rem',
            fontWeight: 'bold',
            color: '#333',
            margin: '0 0 20px 0',
          }}
        >
          404
        </h2>
        <p
          style={{
            fontSize: '1.1rem',
            color: '#888',
            margin: '0 0 40px 0',
            lineHeight: '1.6',
          }}
        >
          {i18n('solvea.Page_404_title')}
          <br />
          {i18n('solvea.Page_404_description')}
        </p>
      </div>
    </div>
  );
}
