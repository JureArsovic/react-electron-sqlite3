import React from 'react';
import { Link } from 'react-router-dom';
import './ConfirmButton.css';

interface ConfirmButtonProps {
  to: string;
  onClick?: () => void; // New onClick prop of type function
  children: React.ReactNode;
}

const ConfirmButton: React.FC<ConfirmButtonProps> = ({ to, onClick, children }) => {
  const handleClick = () => {
    if (onClick) {
      onClick();
    }
  };

  return (
    <Link to={to} className="confirm-button" onClick={handleClick}>
      {children}
    </Link>
  );
};

export default ConfirmButton;