
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Building2, Users, DollarSign, Calendar, Plus, Edit2, Eye } from 'lucide-react';

// Mock customer organizations data
const mockCustomerOrganizations = [
  {
    id: '1',
    name: 'FitLife Training Center',
    contactEmail: 'admin@fitlife.com',
    contactPhone: '+1 (555) 123-4567',
    industry: 'Fitness & Training',
    subscriptionPlan: 'Premium',
    monthlyRevenue: 299.99,
    employeeCount: 12,
    activeEmployees: 10,
    status: 'Active',
    joinDate: '2024-01-15',
    lastPayment: '2024-01-15',
    modules: ['CRM', 'Booking', 'Invoice', 'Subscription']
  },
  {
    id: '2',
    name: 'PowerGym Chain',
    contactEmail: 'billing@powergym.com',
    contactPhone: '+1 (555) 234-5678',
    industry: 'Fitness Centers',
    subscriptionPlan: 'Enterprise',
    monthlyRevenue: 599.99,
    employeeCount: 25,
    activeEmployees: 23,
    status: 'Active',
    joinDate: '2023-11-20',
    lastPayment: '2024-01-12',
    modules: ['CRM', 'Booking', 'Invoice', 'Subscription', 'Analytics']
  },
  {
    id: '3',
    name: 'Wellness Studio Pro',
    contactEmail: 'contact@wellnesspro.com',
    contactPhone: '+1 (555) 345-6789',
    industry: 'Wellness & Spa',
    subscriptionPlan: 'Standard',
    monthlyRevenue: 149.99,
    employeeCount: 6,
    activeEmployees: 5,
    status: 'Active',
    joinDate: '2024-02-01',
    lastPayment: '2024-01-20',
    modules: ['CRM', 'Booking', 'Invoice']
  },
  {
    id: '4',
    name: 'Elite Sports Academy',
    contactEmail: 'admin@elitesports.com',
    contactPhone: '+1 (555) 456-7890',
    industry: 'Sports Training',
    subscriptionPlan: 'Premium',
    monthlyRevenue: 299.99,
    employeeCount: 8,
    activeEmployees: 6,
    status: 'Payment Overdue',
    joinDate: '2023-12-10',
    lastPayment: '2023-12-15',
    modules: ['CRM', 'Booking', 'Invoice']
  }
];

const CustomerOrganizations = () => {
  const [customers] = useState(mockCustomerOrganizations);

  const getPlanBadgeColor = (plan: string) => {
    switch (plan) {
      case 'Enterprise':
        return 'bg-purple-100 text-purple-700';
      case 'Premium':
        return 'bg-blue-100 text-blue-700';
      case 'Standard':
        return 'bg-green-100 text-green-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case 'Active':
        return 'bg-green-100 text-green-700';
      case 'Payment Overdue':
        return 'bg-red-100 text-red-700';
      case 'Suspended':
        return 'bg-yellow-100 text-yellow-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const totalRevenue = customers.reduce((sum, customer) => sum + customer.monthlyRevenue, 0);
  const totalEmployees = customers.reduce((sum, customer) => sum + customer.employeeCount, 0);

  return (
    <div className="space-y-6">
      {/* Header with Add Customer Button */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Customer Organizations</h2>
          <p className="text-gray-600 mt-1">Manage your paying customers and their CRM subscriptions</p>
        </div>
        <Button className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Add New Customer
        </Button>
      </div>

      {/* Revenue Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Building2 className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Total Customers</p>
                <p className="text-2xl font-bold text-gray-900">{customers.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <DollarSign className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Monthly Revenue</p>
                <p className="text-2xl font-bold text-gray-900">${totalRevenue.toFixed(2)}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Users className="h-5 w-5 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Total Employees</p>
                <p className="text-2xl font-bold text-gray-900">{totalEmployees}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-orange-100 rounded-lg">
                <Calendar className="h-5 w-5 text-orange-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Active Organizations</p>
                <p className="text-2xl font-bold text-gray-900">
                  {customers.filter(customer => customer.status === 'Active').length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Customers Table */}
      <Card>
        <CardHeader>
          <CardTitle>All Customer Organizations</CardTitle>
          <CardDescription>Complete list of your paying customers and their subscription details</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Organization</TableHead>
                <TableHead>Contact Information</TableHead>
                <TableHead>Subscription</TableHead>
                <TableHead>Employees</TableHead>
                <TableHead>Monthly Revenue</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {customers.map((customer) => (
                <TableRow key={customer.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                        <Building2 className="h-5 w-5 text-gray-600" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{customer.name}</p>
                        <p className="text-sm text-gray-600">{customer.industry}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <p className="text-sm">{customer.contactEmail}</p>
                      <p className="text-sm text-gray-600">{customer.contactPhone}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <Badge className={getPlanBadgeColor(customer.subscriptionPlan)}>
                        {customer.subscriptionPlan}
                      </Badge>
                      <p className="text-xs text-gray-600">{customer.modules.length} modules</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <p className="font-medium">{customer.activeEmployees}/{customer.employeeCount}</p>
                      <p className="text-xs text-gray-600">Active/Total</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <p className="font-semibold text-green-600">${customer.monthlyRevenue}</p>
                  </TableCell>
                  <TableCell>
                    <Badge className={getStatusBadgeColor(customer.status)}>
                      {customer.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex gap-1 justify-end">
                      <Button variant="outline" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Edit2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default CustomerOrganizations;
