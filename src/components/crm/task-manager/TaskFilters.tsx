
import React from 'react';

interface TaskFiltersProps {
  filter: string;
  onFilterChange: (filter: string) => void;
}

const TaskFilters: React.FC<TaskFiltersProps> = ({ filter, onFilterChange }) => {
  const filterOptions = [
    'all', 'pending', 'in_progress', 'completed', 'overdue', 
    'urgent', 'high', 'medium', 'low'
  ];

  return (
    <div className="flex gap-2 overflow-x-auto pb-2">
      {filterOptions.map((filterOption) => (
        <button
          key={filterOption}
          onClick={() => onFilterChange(filterOption)}
          className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
            filter === filterOption
              ? 'bg-blue-100 text-blue-800'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          {filterOption === 'in_progress' ? 'In Progress' : filterOption.charAt(0).toUpperCase() + filterOption.slice(1)}
        </button>
      ))}
    </div>
  );
};

export default TaskFilters;
