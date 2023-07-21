import React from 'react';
import './Alert.css';

interface AlertProps {
  type: string;
  message: string;
  onClose: () => void;
}

const Alert: React.FC<AlertProps> = ({ type, message, onClose }) => {
  const alertClass = `alert ${type}`;

  return (
    <div className={alertClass}>
      <span className="alertClose" onClick={onClose}>X</span>
      <span className="alertText">{message}</span>
    </div>
  );
};

export default Alert;
