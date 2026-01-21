
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-brand-blue-950 text-white mt-12">
      <div className="container mx-auto px-4 py-6 text-center text-sm">
        <p>&copy; {new Date().getFullYear()} Ministry of Women & Child Development, Government of India. All Rights Reserved.</p>
        <p className="text-xs text-brand-blue-300 mt-2">This is a conceptual demonstration platform.</p>
      </div>
    </footer>
  );
};

export default Footer;
