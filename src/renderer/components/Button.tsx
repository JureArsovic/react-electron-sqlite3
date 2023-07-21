import React from 'react';
import { Link } from 'react-router-dom';
import './Button.css';

interface ButtonProps {
  to: string;
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ to, children }) => {
  return (
    <Link to={to} className="button">
      {children}
    </Link>
  );
};

export default Button;
