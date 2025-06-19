
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, TrendingDown, AlertTriangle, Target, DollarSign, Activity } from 'lucide-react';

interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  status: string;
  lead_score: number;
  tags: string[];
  industry: string;
  created_at: string;
  custom_fields?: {
    customer_type?: 'business' | 'private';
    language?: string;
    currency?: string;
    [key: string]: any;
  };
  address?: {
    country?: string;
    city?: string;
    [key: string]: any;
  };
}

interface StatisticsInsightsProps {
  customer: Customer;
}

const StatisticsInsights: React.FC<StatisticsInsightsProps> = ({ customer }) => {
  // Mock analytics data
  const analytics = {
    billingHistory: [
      { month: 'Jan', amount: 2500 },
      { month: 'Feb', amount: 2500 },
      { month: 'Mar', amount: 3000 },
      { month: 'Apr', amount: 3500 },
      { month: 'May', amount: 3500 },
      { month: 'Jun', amount: 4000 }
    ],
    engagementRate: 78,
    emailOpenRate: 65,
    tasksCompleted: 12,
    riskScore: 25,
    churnWarning: false
  };

  const aiRecommendations = [
    'Send quote for Advanced Analytics package',
    'Schedule quarterly business review',
    'Offer bulk discount for annual subscription'
  ];

  const getRiskColor = (score: number) => {
    if (score < 30) return 'bg-green-100 text-green-800';
    if (score < 70) return 'bg-yellow-100 text-yellow-800';
    return 'bg-red-100 text-red-800';
  };

  const getRiskLabel = (score: number) => {
    if (score < 30) return 'Low Risk';
    if (score < 70) return 'Medium Risk';
    return 'High Risk';
  };

  return (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <DollarSign className="h-5 w-5 text-green-600" />
              <div>
                <p className="text-sm text-gray-600">Monthly Revenue</p>
                <p className="text-xl font-bold">DKK 4,000</p>
                <div className="flex items-center gap-1 text-sm">
                  <TrendingUp className="h-3 w-3 text-green-600" />
                  <span className="text-green-600">+15%</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Activity className="h-5 w-5 text-blue-600" />
              <div>
                <p className="text-sm text-gray-600">Engagement Rate</p>
                <p className="text-xl font-bold">{analytics.engagementRate}%</p>
                <div className="flex items-center gap-1 text-sm">
                  <TrendingUp className="h-3 w-3 text-blue-600" />
                  <span className="text-blue-600">Good</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Target className="h-5 w-5 text-purple-600" />
              <div>
                <p className="text-sm text-gray-600">Email Open Rate</p>
                <p className="text-xl font-bold">{analytics.emailOpenRate}%</p>
                <div className="flex items-center gap-1 text-sm">
                  <TrendingDown className="h-3 w-3 text-red-600" />
                  <span className="text-red-600">-5%</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-orange-600" />
              <div>
                <p className="text-sm text-gray-600">Risk Score</p>
                <p className="text-xl font-bold">{analytics.riskScore}</p>
                <Badge className={getRiskColor(analytics.riskScore)} variant="secondary">
                  {getRiskLabel(analytics.riskScore)}
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Billing History Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Billing History</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-48 flex items-end justify-between gap-2">
            {analytics.billingHistory.map((item, index) => (
              <div key={index} className="flex flex-col items-center flex-1">
                <div 
                  className="bg-blue-500 w-full rounded-t"
                  style={{ height: `${(item.amount / 4000) * 150}px` }}
                ></div>
                <p className="text-xs text-gray-600 mt-2">{item.month}</p>
                <p className="text-xs font-semibold">{item.amount}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* AI Insights & Recommendations */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            🧠 AI Insights & Recommendations
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {aiRecommendations.map((recommendation, index) => (
              <div key={index} className="p-4 bg-blue-50 rounded-lg border-l-4 border-blue-500">
                <p className="font-medium text-blue-900">{recommendation}</p>
                <p className="text-sm text-blue-700 mt-1">
                  Based on customer behavior and industry trends
                </p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default StatisticsInsights;
