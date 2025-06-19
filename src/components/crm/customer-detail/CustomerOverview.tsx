import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Plus, Mail, CheckSquare, BarChart3, Package } from 'lucide-react';

interface CustomerOverviewProps {
  customer: {
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
      [key: string]: any;
    };
    address?: {
      [key: string]: any;
    };
  };
}

const CustomerOverview: React.FC<CustomerOverviewProps> = ({ customer }) => {
  // Format address from object to string
  const formatAddress = (address?: { [key: string]: any }): string => {
    if (!address) return 'No address provided';
    const { city, country, ...rest } = address;
    const parts = [city, country].filter(Boolean);
    return parts.length > 0 ? parts.join(', ') : 'No address provided';
  };

  // Get title from custom fields or default
  const getTitle = (): string => {
    return customer.custom_fields?.title || customer.industry || 'Customer';
  };

  return (
    <div className="w-full space-y-4">
      {/* Main Customer Card */}
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">{customer.name}</CardTitle>
          <CardDescription>
            {getTitle()} at {customer.company}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-4">
            <Avatar>
              <AvatarImage src={`https://avatar.vercel.sh/${customer.name}.png`} />
              <AvatarFallback>{customer.name.substring(0, 2)}</AvatarFallback>
            </Avatar>
            <div>
              <p className="text-lg font-semibold">{customer.name}</p>
              <p className="text-gray-500">{customer.email}</p>
            </div>
          </div>
          <div className="mt-4">
            <Badge variant="secondary">{customer.status}</Badge>
          </div>
          <div className="mt-4 space-y-2">
            <p>
              <span className="font-semibold">Phone:</span> {customer.phone}
            </p>
            <p>
              <span className="font-semibold">Address:</span> {formatAddress(customer.address)}
            </p>
          </div>

          {/* Action Buttons */}
          <div className="mt-6 flex flex-wrap gap-2">
            <Button variant="outline" size="sm">
              <Plus className="h-4 w-4 mr-1" />
              Sales
            </Button>
            <Button variant="outline" size="sm">
              <Plus className="h-4 w-4 mr-1" />
              Subscription
            </Button>
            <Button variant="outline" size="sm">
              <Plus className="h-4 w-4 mr-1" />
              Payment
            </Button>
            <Button variant="outline" size="sm">
              <Mail className="h-4 w-4 mr-1" />
              Email
            </Button>
            <Button variant="outline" size="sm">
              <Plus className="h-4 w-4 mr-1" />
              Task
            </Button>
          </div>

          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="sm" className="text-xs mt-4">
                Latest Invoice
              </Button>
            </SheetTrigger>
            <SheetContent className="w-full max-w-full sm:max-w-full overflow-y-auto">
              <SheetHeader>
                <SheetTitle>Invoice Management</SheetTitle>
                <SheetDescription>
                  Manage invoices for {customer.name}
                </SheetDescription>
              </SheetHeader>
              {/* Invoice Management Content Here */}
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <label htmlFor="invoiceNumber" className="text-right">
                    Invoice Number
                  </label>
                  <input
                    type="text"
                    id="invoiceNumber"
                    value="INV-2024-001"
                    className="col-span-3 rounded-md border shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <label htmlFor="invoiceDate" className="text-right">
                    Invoice Date
                  </label>
                  <input
                    type="date"
                    id="invoiceDate"
                    value="2024-03-15"
                    className="col-span-3 rounded-md border shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <label htmlFor="amount" className="text-right">
                    Amount
                  </label>
                  <input
                    type="number"
                    id="amount"
                    value="1200.00"
                    className="col-span-3 rounded-md border shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <label htmlFor="status" className="text-right">
                    Status
                  </label>
                  <select
                    id="status"
                    className="col-span-3 rounded-md border shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                  >
                    <option>Paid</option>
                    <option>Unpaid</option>
                    <option>Overdue</option>
                  </select>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </CardContent>
      </Card>

      {/* Additional Quick Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 w-full">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Lead Score</p>
                <p className="text-2xl font-bold">{customer.lead_score}/100</p>
              </div>
              <BarChart3 className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Purchases</p>
                <p className="text-2xl font-bold">$12,450</p>
              </div>
              <Package className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Open Tasks</p>
                <p className="text-2xl font-bold">3</p>
              </div>
              <CheckSquare className="h-8 w-8 text-orange-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Last Contact</p>
                <p className="text-2xl font-bold">2 days</p>
              </div>
              <Mail className="h-8 w-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CustomerOverview;
