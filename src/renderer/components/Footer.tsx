import React from 'react';

const Footer: React.FC = () => {
  const footerStyle: React.CSSProperties = {
    backgroundColor: '#888888',
    color: '#F8F8F8',
    padding: '1rem',
    textAlign: 'center',
    position: 'fixed',
    left: 0,
    bottom: 0,
    width: '100%',
  };

  const textStyle: React.CSSProperties = {
    margin: 0,
  };

  return (
    <footer style={footerStyle}>
      <p style={textStyle}>© 2023 Scholar article system. All rights reserved.</p>
    </footer>
  );
};

export default Footer;
