
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Users, BarChart3, Activity, CheckSquare } from 'lucide-react';
import CustomerList from './crm/CustomerList';
import SalesPipeline from './crm/SalesPipeline';
import ActivityTimeline from './crm/ActivityTimeline';
import TaskManager from './crm/TaskManager';

interface CRMModuleProps {
  activeSubTab?: string;
}

const CRMModule = ({ activeSubTab }: CRMModuleProps) => {
  const [searchParams] = useSearchParams();
  const [activeTab, setActiveTab] = useState('customers');

  useEffect(() => {
    if (activeSubTab) {
      setActiveTab(activeSubTab);
    } else {
      const tabParam = searchParams.get('tab');
      if (tabParam && ['customers', 'pipeline', 'activities', 'tasks'].includes(tabParam)) {
        setActiveTab(tabParam);
      }
    }
  }, [searchParams, activeSubTab]);

  const renderActiveContent = () => {
    switch (activeTab) {
      case 'customers':
        return <CustomerList />;
      case 'pipeline':
        return <SalesPipeline />;
      case 'activities':
      case 'activity':
        return <ActivityTimeline />;
      case 'tasks':
        return <TaskManager />;
      default:
        return <CustomerList />;
    }
  };

  return (
    <div className="w-full">
      <div className="p-4 md:p-8 mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Customers</h1>
        <p className="text-gray-600 mt-2">Comprehensive customer relationship management</p>
      </div>

      {/* Content based on sub-navigation selection */}
      <div className="w-full">
        {renderActiveContent()}
      </div>
    </div>
  );
};

export default CRMModule;
