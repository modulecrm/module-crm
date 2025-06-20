
import React from 'react';

interface PlaceholderModuleProps {
  title: string;
  description: string;
  isPremium?: boolean;
}

const PlaceholderModule = ({ title, description, isPremium = false }: PlaceholderModuleProps) => {
  const bgClass = isPremium 
    ? 'bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200'
    : 'bg-blue-50 border border-blue-200';

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-4">{title}</h1>
      <div className={`${bgClass} rounded-lg p-6`}>
        {isPremium && (
          <p className="text-blue-800 mb-2"><strong>Premium Module</strong></p>
        )}
        <p className={isPremium ? "text-blue-700" : "text-blue-800"}>{description}</p>
      </div>
    </div>
  );
};

export default PlaceholderModule;
