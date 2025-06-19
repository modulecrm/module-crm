
import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CreditCard, User, Bell, Download, Settings } from 'lucide-react';

const CustomerPortal = () => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Customer Self-Service Portal</h2>
        <p className="text-gray-600">Empower customers to manage their subscriptions independently</p>
      </div>

      {/* Portal Features */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg border shadow-sm">
          <div className="flex items-center mb-4">
            <User className="h-8 w-8 text-blue-500" />
            <h3 className="text-lg font-semibold text-gray-900 ml-3">Account Management</h3>
          </div>
          <ul className="space-y-3 text-sm text-gray-600">
            <li className="flex items-center">
              <div className="h-2 w-2 bg-green-400 rounded-full mr-3"></div>
              View subscription details
            </li>
            <li className="flex items-center">
              <div className="h-2 w-2 bg-green-400 rounded-full mr-3"></div>
              Update billing information
            </li>
            <li className="flex items-center">
              <div className="h-2 w-2 bg-green-400 rounded-full mr-3"></div>
              Change subscription plans
            </li>
            <li className="flex items-center">
              <div className="h-2 w-2 bg-green-400 rounded-full mr-3"></div>
              Cancel or pause subscription
            </li>
          </ul>
          <Button className="w-full mt-4" variant="outline">
            Configure Portal
          </Button>
        </div>

        <div className="bg-white p-6 rounded-lg border shadow-sm">
          <div className="flex items-center mb-4">
            <CreditCard className="h-8 w-8 text-green-500" />
            <h3 className="text-lg font-semibold text-gray-900 ml-3">Payment Management</h3>
          </div>
          <ul className="space-y-3 text-sm text-gray-600">
            <li className="flex items-center">
              <div className="h-2 w-2 bg-green-400 rounded-full mr-3"></div>
              Add/remove payment methods
            </li>
            <li className="flex items-center">
              <div className="h-2 w-2 bg-green-400 rounded-full mr-3"></div>
              View billing history
            </li>
            <li className="flex items-center">
              <div className="h-2 w-2 bg-green-400 rounded-full mr-3"></div>
              Download invoices
            </li>
            <li className="flex items-center">
              <div className="h-2 w-2 bg-green-400 rounded-full mr-3"></div>
              Update billing address
            </li>
          </ul>
          <Button className="w-full mt-4" variant="outline">
            Setup Payments
          </Button>
        </div>

        <div className="bg-white p-6 rounded-lg border shadow-sm">
          <div className="flex items-center mb-4">
            <Bell className="h-8 w-8 text-yellow-500" />
            <h3 className="text-lg font-semibold text-gray-900 ml-3">Notifications</h3>
          </div>
          <ul className="space-y-3 text-sm text-gray-600">
            <li className="flex items-center">
              <div className="h-2 w-2 bg-green-400 rounded-full mr-3"></div>
              Renewal reminders
            </li>
            <li className="flex items-center">
              <div className="h-2 w-2 bg-green-400 rounded-full mr-3"></div>
              Payment confirmations
            </li>
            <li className="flex items-center">
              <div className="h-2 w-2 bg-green-400 rounded-full mr-3"></div>
              Usage alerts
            </li>
            <li className="flex items-center">
              <div className="h-2 w-2 bg-green-400 rounded-full mr-3"></div>
              Feature updates
            </li>
          </ul>
          <Button className="w-full mt-4" variant="outline">
            Manage Notifications
          </Button>
        </div>
      </div>

      {/* Portal Preview */}
      <div className="bg-white rounded-lg border shadow-sm">
        <div className="px-6 py-4 border-b">
          <h3 className="text-lg font-semibold">Customer Portal Preview</h3>
          <p className="text-sm text-gray-600">How your customers will see their subscription dashboard</p>
        </div>

        <div className="p-6">
          <div className="bg-gray-50 rounded-lg p-6 border-2 border-dashed border-gray-300">
            <div className="text-center">
              <Settings className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h4 className="text-lg font-medium text-gray-900 mb-2">Portal Preview</h4>
              <p className="text-gray-600 mb-4">
                Configure your customer portal settings to enable the preview
              </p>
              <Button>Launch Portal Builder</Button>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-lg border shadow-sm">
        <div className="px-6 py-4 border-b">
          <h3 className="text-lg font-semibold">Quick Actions</h3>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button className="h-20 flex flex-col items-center justify-center space-y-2">
              <User className="h-6 w-6" />
              <span>Customer Login</span>
            </Button>
            <Button variant="outline" className="h-20 flex flex-col items-center justify-center space-y-2">
              <Download className="h-6 w-6" />
              <span>Export Data</span>
            </Button>
            <Button variant="outline" className="h-20 flex flex-col items-center justify-center space-y-2">
              <Settings className="h-6 w-6" />
              <span>Portal Settings</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerPortal;
