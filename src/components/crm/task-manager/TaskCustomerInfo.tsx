
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { User, Mail, Phone, Building, MapPin, Send, CreditCard, Calendar } from 'lucide-react';
import EmailDialog from './EmailDialog';
import { format } from 'date-fns';

interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  status: string;
  industry: string;
  address?: {
    city?: string;
    country?: string;
  };
}

interface Subscription {
  id: string;
  status: string;
  current_period_start: string;
  current_period_end: string;
  plan_id: string;
  subscription_plans: {
    name: string;
    price: number;
  };
}

interface TaskCustomerInfoProps {
  customer: Customer;
  taskTitle: string;
  subscription?: Subscription | null;
}

const TaskCustomerInfo: React.FC<TaskCustomerInfoProps> = ({ customer, taskTitle, subscription }) => {
  const [emailDialogOpen, setEmailDialogOpen] = useState(false);

  const getSubscriptionStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'active':
        return 'default';
      case 'trialing':
        return 'secondary';
      case 'past_due':
        return 'destructive';
      case 'canceled':
        return 'outline';
      default:
        return 'secondary';
    }
  };

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="h-5 w-5" />
            Customer Information
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-lg">{customer.name}</h3>
            <Badge 
              variant={customer.status === 'active' ? 'default' : 'secondary'}
            >
              {customer.status}
            </Badge>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {customer.email && (
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-gray-500" />
                <span className="text-sm">{customer.email}</span>
              </div>
            )}
            
            {customer.phone && (
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-gray-500" />
                <span className="text-sm">{customer.phone}</span>
              </div>
            )}
            
            {customer.company && (
              <div className="flex items-center gap-2">
                <Building className="h-4 w-4 text-gray-500" />
                <span className="text-sm">{customer.company}</span>
              </div>
            )}
            
            {customer.address && (customer.address.city || customer.address.country) && (
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-gray-500" />
                <span className="text-sm">
                  {[customer.address.city, customer.address.country].filter(Boolean).join(', ')}
                </span>
              </div>
            )}
          </div>

          {customer.industry && (
            <div>
              <span className="text-sm font-medium text-gray-600">Industry: </span>
              <span className="text-sm">{customer.industry}</span>
            </div>
          )}

          {/* Subscription Information */}
          <div className="border-t pt-4">
            <div className="flex items-center gap-2 mb-3">
              <CreditCard className="h-4 w-4 text-gray-500" />
              <span className="text-sm font-medium text-gray-600">Subscription</span>
            </div>
            
            {subscription ? (
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">{subscription.subscription_plans.name}</span>
                  <Badge variant={getSubscriptionStatusColor(subscription.status)}>
                    {subscription.status}
                  </Badge>
                </div>
                <div className="text-sm text-gray-600">
                  ${subscription.subscription_plans.price}/month
                </div>
                {subscription.current_period_end && (
                  <div className="flex items-center gap-1 text-xs text-gray-500">
                    <Calendar className="h-3 w-3" />
                    Renews {format(new Date(subscription.current_period_end), 'MMM d, yyyy')}
                  </div>
                )}
              </div>
            ) : (
              <div className="text-sm text-gray-500">
                No active subscription
              </div>
            )}
          </div>

          {customer.email && (
            <div className="pt-4 border-t">
              <Button 
                onClick={() => setEmailDialogOpen(true)}
                className="flex items-center gap-2"
              >
                <Send className="h-4 w-4" />
                Send Email
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      <EmailDialog
        open={emailDialogOpen}
        onOpenChange={setEmailDialogOpen}
        customerEmail={customer.email}
        customerName={customer.name}
        taskTitle={taskTitle}
      />
    </>
  );
};

export default TaskCustomerInfo;
