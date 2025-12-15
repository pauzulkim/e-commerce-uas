import React, { useEffect, useState } from 'react';
import { FiCheckCircle, FiXCircle, FiInfo, FiAlertTriangle, FiX } from 'react-icons/fi';

const Toast = ({ message, type = 'success', onClose }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onClose, 300);
    }, 3000);

    return () => clearTimeout(timer);
  }, [onClose]);

  const icons = {
    success: <FiCheckCircle className="text-success" />,
    error: <FiXCircle className="text-danger" />,
    info: <FiInfo className="text-blue-500" />,
    warning: <FiAlertTriangle className="text-warning" />,
  };

  const bgColors = {
    success: 'bg-green-50 border-green-200',
    error: 'bg-red-50 border-red-200',
    info: 'bg-blue-50 border-blue-200',
    warning: 'bg-yellow-50 border-yellow-200',
  };

  if (!isVisible) return null;

  return (
    <div className={`fixed top-4 right-4 z-50 flex items-center p-4 rounded-lg border ${bgColors[type]} shadow-lg transform transition-all duration-300 translate-x-0`}>
      <div className="text-xl mr-3">{icons[type]}</div>
      <div className="flex-1 mr-4">
        <p className="font-medium text-gray-800">{message}</p>
      </div>
      <button
        onClick={() => {
          setIsVisible(false);
          setTimeout(onClose, 300);
        }}
        className="text-gray-400 hover:text-gray-600"
      >
        <FiX size={20} />
      </button>
    </div>
  );
};

export default Toast;