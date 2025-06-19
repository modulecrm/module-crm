
import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CreditCard, Shield, Globe, Zap } from 'lucide-react';

const PaymentSettings = () => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Payment Settings</h2>
        <p className="text-gray-600">Configure payment gateways, security, and compliance settings</p>
      </div>

      {/* Payment Gateways */}
      <div className="bg-white rounded-lg border shadow-sm">
        <div className="px-6 py-4 border-b">
          <h3 className="text-lg font-semibold">Payment Gateways</h3>
          <p className="text-sm text-gray-600">Configure multiple payment providers for global coverage</p>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="border rounded-lg p-4">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <CreditCard className="h-8 w-8 text-blue-600" />
                  <div className="ml-3">
                    <h4 className="font-semibold">Stripe</h4>
                    <p className="text-sm text-gray-600">Primary gateway</p>
                  </div>
                </div>
                <Badge className="bg-green-100 text-green-800">Active</Badge>
              </div>
              <div className="space-y-2 text-sm text-gray-600">
                <div className="flex justify-between">
                  <span>Cards</span>
                  <span>✓</span>
                </div>
                <div className="flex justify-between">
                  <span>Bank Transfers</span>
                  <span>✓</span>
                </div>
                <div className="flex justify-between">
                  <span>Digital Wallets</span>
                  <span>✓</span>
                </div>
              </div>
              <Button className="w-full mt-4" size="sm">Configure</Button>
            </div>

            <div className="border rounded-lg p-4 opacity-60">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <CreditCard className="h-8 w-8 text-blue-600" />
                  <div className="ml-3">
                    <h4 className="font-semibold">PayPal</h4>
                    <p className="text-sm text-gray-600">Secondary gateway</p>
                  </div>
                </div>
                <Badge variant="secondary">Inactive</Badge>
              </div>
              <div className="space-y-2 text-sm text-gray-600">
                <div className="flex justify-between">
                  <span>PayPal Balance</span>
                  <span>-</span>
                </div>
                <div className="flex justify-between">
                  <span>Credit Cards</span>
                  <span>-</span>
                </div>
                <div className="flex justify-between">
                  <span>Bank Accounts</span>
                  <span>-</span>
                </div>
              </div>
              <Button className="w-full mt-4" size="sm" variant="outline">Setup</Button>
            </div>

            <div className="border rounded-lg p-4 opacity-60">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <CreditCard className="h-8 w-8 text-blue-600" />
                  <div className="ml-3">
                    <h4 className="font-semibold">Square</h4>
                    <p className="text-sm text-gray-600">Regional gateway</p>
                  </div>
                </div>
                <Badge variant="secondary">Inactive</Badge>
              </div>
              <div className="space-y-2 text-sm text-gray-600">
                <div className="flex justify-between">
                  <span>In-person</span>
                  <span>-</span>
                </div>
                <div className="flex justify-between">
                  <span>Online</span>
                  <span>-</span>
                </div>
                <div className="flex justify-between">
                  <span>Mobile</span>
                  <span>-</span>
                </div>
              </div>
              <Button className="w-full mt-4" size="sm" variant="outline">Setup</Button>
            </div>
          </div>
        </div>
      </div>

      {/* Security & Compliance */}
      <div className="bg-white rounded-lg border shadow-sm">
        <div className="px-6 py-4 border-b">
          <h3 className="text-lg font-semibold">Security & Compliance</h3>
          <p className="text-sm text-gray-600">Ensure secure transactions and regulatory compliance</p>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-start">
                <Shield className="h-6 w-6 text-green-500 mt-1 mr-3" />
                <div>
                  <h4 className="font-semibold text-gray-900">PCI DSS Compliance</h4>
                  <p className="text-sm text-gray-600">All payment data is securely processed and stored according to PCI DSS standards</p>
                  <Badge className="bg-green-100 text-green-800 mt-2">Compliant</Badge>
                </div>
              </div>
              <div className="flex items-start">
                <Globe className="h-6 w-6 text-blue-500 mt-1 mr-3" />
                <div>
                  <h4 className="font-semibold text-gray-900">GDPR & Data Privacy</h4>
                  <p className="text-sm text-gray-600">Customer data protection and right-to-forget compliance</p>
                  <Badge className="bg-blue-100 text-blue-800 mt-2">Enabled</Badge>
                </div>
              </div>
              <div className="flex items-start">
                <Zap className="h-6 w-6 text-yellow-500 mt-1 mr-3" />
                <div>
                  <h4 className="font-semibold text-gray-900">Fraud Detection</h4>
                  <p className="text-sm text-gray-600">AI-powered fraud prevention and chargeback protection</p>
                  <Badge className="bg-yellow-100 text-yellow-800 mt-2">Active</Badge>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 rounded-lg p-6">
              <h4 className="font-semibold text-gray-900 mb-4">Security Settings</h4>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">3D Secure</span>
                  <Badge className="bg-green-100 text-green-800">Enabled</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Payment Tokenization</span>
                  <Badge className="bg-green-100 text-green-800">Enabled</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Webhook Signatures</span>
                  <Badge className="bg-green-100 text-green-800">Enabled</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Rate Limiting</span>
                  <Badge className="bg-green-100 text-green-800">Enabled</Badge>
                </div>
              </div>
              <Button className="w-full mt-4" size="sm">Security Settings</Button>
            </div>
          </div>
        </div>
      </div>

      {/* Tax & Currency */}
      <div className="bg-white rounded-lg border shadow-sm">
        <div className="px-6 py-4 border-b">
          <h3 className="text-lg font-semibold">Tax & Currency Settings</h3>
          <p className="text-sm text-gray-600">Configure global tax compliance and multi-currency support</p>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-gray-900 mb-4">Supported Currencies</h4>
              <div className="space-y-2">
                {['USD - US Dollar', 'EUR - Euro', 'GBP - British Pound', 'CAD - Canadian Dollar'].map((currency) => (
                  <div key={currency} className="flex justify-between items-center p-2 bg-gray-50 rounded">
                    <span className="text-sm">{currency}</span>
                    <Badge className="bg-green-100 text-green-800">Active</Badge>
                  </div>
                ))}
              </div>
              <Button className="w-full mt-4" size="sm" variant="outline">Add Currency</Button>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-4">Tax Configuration</h4>
              <div className="space-y-2">
                {['VAT (EU)', 'GST (Canada)', 'Sales Tax (US)', 'Custom Tax Rules'].map((tax) => (
                  <div key={tax} className="flex justify-between items-center p-2 bg-gray-50 rounded">
                    <span className="text-sm">{tax}</span>
                    <Badge className="bg-blue-100 text-blue-800">Configured</Badge>
                  </div>
                ))}
              </div>
              <Button className="w-full mt-4" size="sm" variant="outline">Configure Tax</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentSettings;
