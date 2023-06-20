import React from 'react';

const LoadingPage = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-blue-50">
      <div className="flex flex-col items-center">
        <svg className="w-20 h-20 text-blue-600 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 14l-4-4m0 0l-4 4m4-4v12" />
        </svg>
        <span className="mt-4 text-lg font-medium text-blue-600">Loading Nurse Information...</span>
      </div>
    </div>
  );
};

export default LoadingPage;
