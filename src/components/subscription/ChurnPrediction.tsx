
import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { AlertTriangle, Zap, TrendingDown, Users } from 'lucide-react';
import { Tables } from '@/integrations/supabase/types';

type ChurnPrediction = Tables<'churn_predictions'>;

const ChurnPrediction = () => {
  const [predictions, setPredictions] = useState<ChurnPrediction[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchChurnPredictions();
  }, []);

  const fetchChurnPredictions = async () => {
    try {
      const { data, error } = await supabase
        .from('churn_predictions')
        .select('*')
        .order('risk_score', { ascending: false })
        .limit(20);
      
      if (error) throw error;
      setPredictions(data || []);
    } catch (error) {
      console.error('Error fetching churn predictions:', error);
    } finally {
      setLoading(false);
    }
  };

  const getRiskLevel = (score: number | null) => {
    if (!score) return { level: 'Unknown', color: 'bg-gray-100 text-gray-800' };
    if (score >= 0.8) return { level: 'High Risk', color: 'bg-red-100 text-red-800' };
    if (score >= 0.6) return { level: 'Medium Risk', color: 'bg-yellow-100 text-yellow-800' };
    if (score >= 0.4) return { level: 'Low Risk', color: 'bg-green-100 text-green-800' };
    return { level: 'Very Low Risk', color: 'bg-blue-100 text-blue-800' };
  };

  if (loading) {
    return <div className="p-8 text-center">Loading churn predictions...</div>;
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">AI-Powered Churn Prediction</h2>
        <p className="text-gray-600">Identify customers at risk of cancellation and take preventive action</p>
      </div>

      {/* AI Features Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg border shadow-sm">
          <div className="flex items-center">
            <Zap className="h-8 w-8 text-yellow-500" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">AI Analysis</p>
              <p className="text-2xl font-bold text-gray-900">Active</p>
              <p className="text-sm text-yellow-600">Real-time monitoring</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg border shadow-sm">
          <div className="flex items-center">
            <AlertTriangle className="h-8 w-8 text-red-500" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">High Risk</p>
              <p className="text-2xl font-bold text-gray-900">
                {predictions.filter(p => (p.risk_score || 0) >= 0.8).length}
              </p>
              <p className="text-sm text-red-600">Customers</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg border shadow-sm">
          <div className="flex items-center">
            <TrendingDown className="h-8 w-8 text-orange-500" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Medium Risk</p>
              <p className="text-2xl font-bold text-gray-900">
                {predictions.filter(p => (p.risk_score || 0) >= 0.6 && (p.risk_score || 0) < 0.8).length}
              </p>
              <p className="text-sm text-orange-600">Customers</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg border shadow-sm">
          <div className="flex items-center">
            <Users className="h-8 w-8 text-green-500" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Low Risk</p>
              <p className="text-2xl font-bold text-gray-900">
                {predictions.filter(p => (p.risk_score || 0) < 0.6).length}
              </p>
              <p className="text-sm text-green-600">Customers</p>
            </div>
          </div>
        </div>
      </div>

      {/* AI Features */}
      <div className="bg-white rounded-lg border shadow-sm">
        <div className="px-6 py-4 border-b">
          <h3 className="text-lg font-semibold">AI-Powered Features</h3>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-start">
                <Zap className="h-6 w-6 text-yellow-500 mt-1 mr-3" />
                <div>
                  <h4 className="font-semibold text-gray-900">Behavioral Analysis</h4>
                  <p className="text-sm text-gray-600">AI analyzes usage patterns, login frequency, and feature adoption to predict churn risk</p>
                </div>
              </div>
              <div className="flex items-start">
                <AlertTriangle className="h-6 w-6 text-red-500 mt-1 mr-3" />
                <div>
                  <h4 className="font-semibold text-gray-900">Early Warning System</h4>
                  <p className="text-sm text-gray-600">Get alerts when customers show signs of disengagement before they cancel</p>
                </div>
              </div>
              <div className="flex items-start">
                <TrendingDown className="h-6 w-6 text-blue-500 mt-1 mr-3" />
                <div>
                  <h4 className="font-semibold text-gray-900">Retention Recommendations</h4>
                  <p className="text-sm text-gray-600">AI suggests personalized retention strategies for each at-risk customer</p>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 rounded-lg p-6 border-2 border-dashed border-gray-300">
              <div className="text-center">
                <Zap className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h4 className="text-lg font-medium text-gray-900 mb-2">AI Model Training</h4>
                <p className="text-gray-600 mb-4">
                  Configure AI models to improve prediction accuracy
                </p>
                <Button>Configure AI Settings</Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Churn Predictions Table */}
      {predictions.length > 0 ? (
        <div className="bg-white rounded-lg border shadow-sm">
          <div className="px-6 py-4 border-b">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">Churn Risk Analysis</h3>
              <Button size="sm">Run New Analysis</Button>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Customer
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Risk Score
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Risk Level
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Predicted Churn Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {predictions.map((prediction) => {
                  const riskInfo = getRiskLevel(prediction.risk_score);
                  return (
                    <tr key={prediction.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          Customer #{prediction.user_id?.slice(0, 8)}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          {prediction.risk_score ? (prediction.risk_score * 100).toFixed(1) : 'N/A'}%
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <Badge className={riskInfo.color}>
                          {riskInfo.level}
                        </Badge>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {prediction.predicted_churn_date 
                          ? new Date(prediction.predicted_churn_date).toLocaleDateString()
                          : 'N/A'
                        }
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <Button size="sm" variant="outline">
                          Take Action
                        </Button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-lg border shadow-sm">
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <Zap className="h-12 w-12 mx-auto" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No churn predictions available</h3>
            <p className="text-gray-500 mb-4">Start collecting customer data to enable AI-powered churn prediction</p>
            <Button>Initialize AI Analysis</Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChurnPrediction;
