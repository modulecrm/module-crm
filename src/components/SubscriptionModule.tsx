
import React, { useState } from 'react';
import { CreditCard, Users, BarChart3, Bell, Shield, Zap } from 'lucide-react';
import SubscriptionPlans from './subscription/SubscriptionPlans';
import CustomerPortal from './subscription/CustomerPortal';
import Analytics from './subscription/Analytics';
import ChurnPrediction from './subscription/ChurnPrediction';

const SubscriptionModule = () => {
  const [activeTab, setActiveTab] = useState('plans');

  const tabs = [
    { id: 'plans', name: 'Subscription Plans', icon: CreditCard, component: SubscriptionPlans },
    { id: 'customers', name: 'Customer Portal', icon: Users, component: CustomerPortal },
    { id: 'analytics', name: 'Analytics & Reports', icon: BarChart3, component: Analytics },
    { id: 'churn', name: 'Churn Prediction', icon: Zap, component: ChurnPrediction },
  ];

  const ActiveComponent = tabs.find(tab => tab.id === activeTab)?.component || SubscriptionPlans;

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Subscription Management</h1>
        <p className="text-gray-600 mt-2">Comprehensive subscription and billing management system</p>
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
                      ? 'border-purple-500 text-purple-600'
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
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <ActiveComponent />
      </div>
    </div>
  );
};

export default SubscriptionModule;
