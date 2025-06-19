
import React, { useState } from 'react';
import { Users, BarChart3, Activity, CheckSquare, MessageSquare, Calendar } from 'lucide-react';
import CustomerList from './crm/CustomerList';
import SalesPipeline from './crm/SalesPipeline';
import ActivityTimeline from './crm/ActivityTimeline';
import TaskManager from './crm/TaskManager';

const CRMModule = () => {
  const [activeTab, setActiveTab] = useState('customers');

  const tabs = [
    { id: 'customers', name: 'Customers', icon: Users, component: CustomerList },
    { id: 'pipeline', name: 'Sales Pipeline', icon: BarChart3, component: SalesPipeline },
    { id: 'activities', name: 'Activities', icon: Activity, component: ActivityTimeline },
    { id: 'tasks', name: 'Tasks', icon: CheckSquare, component: TaskManager },
  ];

  const ActiveComponent = tabs.find(tab => tab.id === activeTab)?.component || CustomerList;

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Customers</h1>
        <p className="text-gray-600 mt-2">Comprehensive customer relationship management</p>
      </div>

      {/* Tab Navigation */}
      <div className="mb-8">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <Icon className="h-4 w-4" />
                    {tab.name}
                  </div>
                </button>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Active Tab Content */}
      <div className="bg-gray-50 rounded-lg p-6">
        <ActiveComponent />
      </div>
    </div>
  );
};

export default CRMModule;
