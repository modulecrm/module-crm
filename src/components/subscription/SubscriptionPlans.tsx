
import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Check, Plus, Edit, Trash2 } from 'lucide-react';
import { Tables } from '@/integrations/supabase/types';

type SubscriptionPlan = Tables<'subscription_plans'>;

const SubscriptionPlans = () => {
  const [plans, setPlans] = useState<SubscriptionPlan[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPlans();
  }, []);

  const fetchPlans = async () => {
    try {
      const { data, error } = await supabase
        .from('subscription_plans')
        .select('*')
        .order('price');
      
      if (error) throw error;
      setPlans(data || []);
    } catch (error) {
      console.error('Error fetching plans:', error);
    } finally {
      setLoading(false);
    }
  };

  const getTierColor = (tier: string | null) => {
    switch (tier) {
      case 'basic': return 'bg-green-100 text-green-800';
      case 'premium': return 'bg-blue-100 text-blue-800';
      case 'enterprise': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return <div className="p-8 text-center">Loading subscription plans...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Subscription Plans</h2>
          <p className="text-gray-600">Manage your pricing tiers and features</p>
        </div>
        <Button className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Create New Plan
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {plans.map((plan) => (
          <div key={plan.id} className="border rounded-lg p-6 bg-white shadow-sm hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-xl font-semibold text-gray-900">{plan.name}</h3>
                {plan.tier && (
                  <Badge className={`mt-1 ${getTierColor(plan.tier)}`}>
                    {plan.tier.toUpperCase()}
                  </Badge>
                )}
              </div>
              <div className="flex gap-2">
                <Button size="sm" variant="outline">
                  <Edit className="h-4 w-4" />
                </Button>
                <Button size="sm" variant="outline">
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="mb-4">
              <div className="flex items-baseline">
                <span className="text-3xl font-bold text-gray-900">
                  ${plan.price}
                </span>
                <span className="text-gray-600 ml-1">
                  /{plan.billing_interval}
                </span>
              </div>
              {plan.trial_period_days && plan.trial_period_days > 0 && (
                <p className="text-sm text-green-600 mt-1">
                  {plan.trial_period_days} days free trial
                </p>
              )}
            </div>

            <p className="text-gray-600 mb-4">{plan.description}</p>

            <div className="space-y-2">
              <p className="font-medium text-gray-900">Features:</p>
              {Array.isArray(plan.features) && plan.features.length > 0 ? (
                <ul className="space-y-1">
                  {(plan.features as string[]).map((feature, index) => (
                    <li key={index} className="flex items-center text-sm text-gray-600">
                      <Check className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-gray-500">No features listed</p>
              )}
            </div>

            <div className="mt-6 pt-4 border-t">
              <div className="flex justify-between items-center">
                <Badge variant={plan.is_active ? "default" : "secondary"}>
                  {plan.is_active ? 'Active' : 'Inactive'}
                </Badge>
                <Button size="sm" className="w-full ml-4">
                  View Details
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {plans.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-400 mb-4">
            <CreditCard className="h-12 w-12 mx-auto" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No subscription plans</h3>
          <p className="text-gray-500 mb-4">Get started by creating your first subscription plan</p>
          <Button>Create Your First Plan</Button>
        </div>
      )}
    </div>
  );
};

export default SubscriptionPlans;
