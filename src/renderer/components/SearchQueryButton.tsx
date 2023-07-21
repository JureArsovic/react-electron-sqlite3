import React from 'react';

interface SearchQueryButtonProps {
  onClick: () => void;
  children: React.ReactNode;
  style?: React.CSSProperties;
}

const SearchQueryButton: React.FC<SearchQueryButtonProps> = ({ onClick, children, style }) => {
  return (
    <button className="search-button" onClick={onClick} style={style}>
      {children}
    </button>
  );
};

export default SearchQueryButton;
