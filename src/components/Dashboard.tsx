
import React from 'react';
import { Users, Calendar, CheckSquare, TrendingUp, DollarSign, Mail } from 'lucide-react';

interface DashboardProps {
  enabledModules: string[];
}

const Dashboard = ({ enabledModules }: DashboardProps) => {
  const stats = [
    { name: 'Total Customers', value: '2,847', change: '+12%', icon: Users, color: 'bg-blue-500' },
    { name: 'Active Subscriptions', value: '1,234', change: '+5%', icon: DollarSign, color: 'bg-green-500' },
    { name: 'Bookings This Month', value: '456', change: '+18%', icon: Calendar, color: 'bg-orange-500' },
    { name: 'Open Tasks', value: '89', change: '-3%', icon: CheckSquare, color: 'bg-red-500' },
  ];

  const recentActivity = [
    { action: 'New customer registered', user: 'John Smith', time: '2 min ago' },
    { action: 'Booking confirmed', user: 'Sarah Wilson', time: '15 min ago' },
    { action: 'Task completed', user: 'Mike Johnson', time: '1 hour ago' },
    { action: 'Newsletter sent', user: 'System', time: '2 hours ago' },
  ];

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-2">Welcome to your modular CRM system</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.name} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.name}</p>
                  <p className="text-3xl font-bold text-gray-900 mt-2">{stat.value}</p>
                  <p className={`text-sm mt-2 ${stat.change.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                    {stat.change} from last month
                  </p>
                </div>
                <div className={`${stat.color} p-3 rounded-lg`}>
                  <Icon className="h-6 w-6 text-white" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Activity */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Recent Activity</h2>
          <div className="space-y-4">
            {recentActivity.map((activity, index) => (
              <div key={index} className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                  <p className="text-xs text-gray-500">{activity.user} • {activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Enabled Modules */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Active Modules</h2>
          <div className="grid grid-cols-2 gap-3">
            {enabledModules.filter(module => module !== 'dashboard').map((moduleId) => {
              const moduleNames: { [key: string]: string } = {
                crm: 'CRM Core',
                subscription: 'Subscriptions',
                booking: 'Booking',
                tasks: 'Tasks',
                projects: 'Projects',
                newsletters: 'Newsletters',
                support: 'Support'
              };
              
              return (
                <div key={moduleId} className="bg-gradient-to-r from-blue-50 to-indigo-50 p-3 rounded-lg border border-blue-100">
                  <p className="text-sm font-medium text-blue-900">
                    {moduleNames[moduleId] || moduleId}
                  </p>
                </div>
              );
            })}
          </div>
          
          {enabledModules.length === 1 && (
            <div className="mt-4 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
              <p className="text-sm text-yellow-800">
                Go to Settings to enable more modules
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
