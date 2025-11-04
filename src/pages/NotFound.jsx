import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div style={{
      textAlign: 'center',
      padding: '80px 20px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '60vh'
    }}>
      <h1 style={{
        fontSize: '72px',
        margin: '0 0 20px 0',
        color: 'var(--text-primary)',
        fontWeight: 'bold'
      }}>
        404
      </h1>
      <p style={{
        fontSize: '18px',
        margin: '0 0 30px 0',
        color: 'var(--text-secondary)'
      }}>
        Page not found
      </p>
      <Link
        to="/"
        style={{
          padding: '12px 24px',
          backgroundColor: 'var(--primary-color)',
          color: 'white',
          textDecoration: 'none',
          borderRadius: '6px',
          fontSize: '16px',
          fontWeight: '500',
          transition: 'background-color 0.2s ease'
        }}
        onMouseOver={(e) => e.target.style.backgroundColor = 'var(--primary-hover)'}
        onMouseOut={(e) => e.target.style.backgroundColor = 'var(--primary-color)'}
      >
        Go to Dashboard
      </Link>
    </div>
  );
};

export default NotFound;