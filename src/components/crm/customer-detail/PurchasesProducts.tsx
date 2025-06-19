
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Package, TrendingUp, Calendar } from 'lucide-react';

interface PurchasesProductsProps {
  customerId: string;
}

interface Purchase {
  id: string;
  productName: string;
  category: string;
  amount: string;
  date: string;
  status: 'active' | 'expired' | 'cancelled';
}

const PurchasesProducts: React.FC<PurchasesProductsProps> = ({ customerId }) => {
  const [purchases] = useState<Purchase[]>([
    {
      id: '1',
      productName: 'Premium Subscription',
      category: 'Subscription',
      amount: 'DKK 2,500',
      date: '2024-01-01',
      status: 'active'
    },
    {
      id: '2',
      productName: 'Additional Storage',
      category: 'Add-on',
      amount: 'DKK 500',
      date: '2023-12-15',
      status: 'active'
    },
    {
      id: '3',
      productName: 'Basic Plan',
      category: 'Subscription',
      amount: 'DKK 1,200',
      date: '2023-06-01',
      status: 'expired'
    }
  ]);

  const frequentProducts = ['Premium Subscription', 'Additional Storage', 'Support Package'];
  const recommendations = ['Enterprise Upgrade', 'Advanced Analytics', 'Priority Support'];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'expired': return 'bg-gray-100 text-gray-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Purchase History */}
      <Card>
        <CardHeader>
          <CardTitle>Purchase History</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {purchases.map((purchase) => (
              <div key={purchase.id} className="border rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <Package className="h-5 w-5 text-gray-400" />
                    <div>
                      <h4 className="font-semibold">{purchase.productName}</h4>
                      <p className="text-sm text-gray-600">{purchase.category}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">{purchase.amount}</p>
                    <p className="text-sm text-gray-600">{purchase.date}</p>
                  </div>
                </div>
                <Badge className={getStatusColor(purchase.status)}>
                  {purchase.status}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* AI Analytics */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Frequently Purchased
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {frequentProducts.map((product, index) => (
                <div key={index} className="flex items-center justify-between py-2 border-b last:border-b-0">
                  <span className="font-medium">{product}</span>
                  <Badge variant="secondary">{3 - index}x</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              🧠 AI Recommendations
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {recommendations.map((product, index) => (
                <div key={index} className="p-3 bg-blue-50 rounded-lg">
                  <p className="font-medium text-blue-900">{product}</p>
                  <p className="text-sm text-blue-700">Based on usage patterns</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PurchasesProducts;
