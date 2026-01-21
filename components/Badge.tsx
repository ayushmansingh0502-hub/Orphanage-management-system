
import React from 'react';

interface BadgeProps {
  text: string;
  color: 'green' | 'red' | 'yellow' | 'blue';
  icon?: React.ReactNode;
  className?: string;
}

const Badge: React.FC<BadgeProps> = ({ text, color, icon, className }) => {
  const colorClasses = {
    green: 'bg-green-100 text-green-800 border-green-200',
    red: 'bg-red-100 text-red-800 border-red-200',
    yellow: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    blue: 'bg-blue-100 text-blue-800 border-blue-200',
  };

  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${colorClasses[color]} ${className}`}>
      {icon}
      {text}
    </span>
  );
};

export default Badge;
