
import React from 'react';

const ShieldCheckIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 flex-shrink-0 text-brand-blue-700">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.602-3.751m-.227-1.021a7.5 7.5 0 0 0-1.752-1.438m-2.228.165a7.5 7.5 0 0 1-1.282.81M3 9.75A9.75 9.75 0 0 1 12 3m0 0a9.75 9.75 0 0 1 9 6.75" />
  </svg>
);


const TrustBanner: React.FC = () => {
  return (
    <div className="bg-brand-blue-50 border-b border-brand-blue-200">
      <div className="container mx-auto px-4 py-3 flex items-center justify-center gap-3 text-brand-blue-900">
        <ShieldCheckIcon />
        <p className="text-sm font-medium text-center">
          A verified digital platform for transparent orphanage management, donations, and child welfare in India.
        </p>
      </div>
    </div>
  );
};

export default TrustBanner;
