import React from 'react';

const Header: React.FC = () => {
  const headerStyle: React.CSSProperties = {
    backgroundColor: '#888888',
    color: '#F8F8F8',
    padding: '1rem',
  };

  const titleStyle: React.CSSProperties = {
    margin: 0,
  };

  return (
    <header style={headerStyle}>
      <h1 style={titleStyle}>Scholar article system</h1>
    </header>
  );
};

export default Header;
