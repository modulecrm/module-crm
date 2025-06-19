
import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import { TrendingUp, DollarSign, FileText, Calendar, Download, Brain } from 'lucide-react';

const InvoiceReports = () => {
  const [timeRange, setTimeRange] = useState('month');
  const [reportType, setReportType] = useState('revenue');

  const { data: revenueData } = useQuery({
    queryKey: ['revenue_data', timeRange],
    queryFn: async () => {
      // Mock data for demonstration
      return [
        { month: 'Jan', revenue: 12500, invoices: 45 },
        { month: 'Feb', revenue: 15200, invoices: 52 },
        { month: 'Mar', revenue: 18900, invoices: 61 },
        { month: 'Apr', revenue: 16750, invoices: 48 },
        { month: 'May', revenue: 21200, invoices: 67 },
        { month: 'Jun', revenue: 19800, invoices: 59 }
      ];
    }
  });

  const { data: customerData } = useQuery({
    queryKey: ['customer_revenue'],
    queryFn: async () => {
      // Mock data for top customers
      return [
        { name: 'Acme Corp', value: 15400, color: '#3B82F6' },
        { name: 'TechStart Inc', value: 12800, color: '#10B981' },
        { name: 'Global Ltd', value: 9600, color: '#F59E0B' },
        { name: 'StartUp Co', value: 7200, color: '#EF4444' },
        { name: 'Others', value: 8900, color: '#6B7280' }
      ];
    }
  });

  const { data: forecastData } = useQuery({
    queryKey: ['cash_flow_forecast'],
    queryFn: async () => {
      // AI-powered forecast mock data
      return [
        { month: 'Jul', actual: 19800, forecast: 22500, confidence: 85 },
        { month: 'Aug', actual: null, forecast: 24200, confidence: 82 },
        { month: 'Sep', actual: null, forecast: 26800, confidence: 78 },
        { month: 'Oct', actual: null, forecast: 25100, confidence: 75 },
        { month: 'Nov', actual: null, forecast: 27900, confidence: 72 },
        { month: 'Dec', actual: null, forecast: 31200, confidence: 70 }
      ];
    }
  });

  const totalRevenue = revenueData?.reduce((sum, item) => sum + item.revenue, 0) || 0;
  const totalInvoices = revenueData?.reduce((sum, item) => sum + item.invoices, 0) || 0;
  const avgInvoiceValue = totalInvoices > 0 ? totalRevenue / totalInvoices : 0;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Invoice Reports & Analytics</h2>
          <p className="text-gray-600">AI-powered insights and forecasting for your business</p>
        </div>
        
        <div className="flex gap-2">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="week">This Week</SelectItem>
              <SelectItem value="month">This Month</SelectItem>
              <SelectItem value="quarter">This Quarter</SelectItem>
              <SelectItem value="year">This Year</SelectItem>
            </SelectContent>
          </Select>
          
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <DollarSign className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <div className="text-2xl font-bold">${totalRevenue.toLocaleString()}</div>
                <div className="text-sm text-gray-600">Total Revenue</div>
                <div className="text-xs text-green-600 flex items-center gap-1 mt-1">
                  <TrendingUp className="h-3 w-3" />
                  +12.5% vs last period
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <FileText className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <div className="text-2xl font-bold">{totalInvoices}</div>
                <div className="text-sm text-gray-600">Invoices Sent</div>
                <div className="text-xs text-green-600 flex items-center gap-1 mt-1">
                  <TrendingUp className="h-3 w-3" />
                  +8.2% vs last period
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Calendar className="h-5 w-5 text-purple-600" />
              </div>
              <div>
                <div className="text-2xl font-bold">${avgInvoiceValue.toFixed(0)}</div>
                <div className="text-sm text-gray-600">Avg Invoice Value</div>
                <div className="text-xs text-red-600 flex items-center gap-1 mt-1">
                  <TrendingUp className="h-3 w-3 rotate-180" />
                  -2.1% vs last period
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-orange-100 rounded-lg">
                <Brain className="h-5 w-5 text-orange-600" />
              </div>
              <div>
                <div className="text-2xl font-bold">18 days</div>
                <div className="text-sm text-gray-600">Avg Payment Time</div>
                <div className="text-xs text-green-600 flex items-center gap-1 mt-1">
                  <TrendingUp className="h-3 w-3" />
                  3 days faster
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Trend */}
        <Card>
          <CardHeader>
            <CardTitle>Revenue Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip formatter={(value) => [`$${value.toLocaleString()}`, 'Revenue']} />
                <Bar dataKey="revenue" fill="#3B82F6" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Top Customers */}
        <Card>
          <CardHeader>
            <CardTitle>Revenue by Customer</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={customerData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {customerData?.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => `$${value.toLocaleString()}`} />
              </PieChart>
            </ResponsiveContainer>
            <div className="mt-4 space-y-2">
              {customerData?.map((customer, index) => (
                <div key={index} className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <div 
                      className="w-3 h-3 rounded-full" 
                      style={{ backgroundColor: customer.color }}
                    />
                    <span>{customer.name}</span>
                  </div>
                  <span className="font-medium">${customer.value.toLocaleString()}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* AI Cash Flow Forecast */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Brain className="h-5 w-5 text-blue-600" />
            <CardTitle>AI-Powered Cash Flow Forecast</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={forecastData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip 
                formatter={(value, name) => [
                  `$${value?.toLocaleString()}`, 
                  name === 'actual' ? 'Actual' : 'Forecast'
                ]} 
              />
              <Line 
                type="monotone" 
                dataKey="actual" 
                stroke="#10B981" 
                strokeWidth={3}
                dot={{ fill: '#10B981', strokeWidth: 2, r: 6 }}
                connectNulls={false}
              />
              <Line 
                type="monotone" 
                dataKey="forecast" 
                stroke="#3B82F6" 
                strokeWidth={2}
                strokeDasharray="5 5"
                dot={{ fill: '#3B82F6', strokeWidth: 2, r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
          <div className="mt-4 text-sm text-gray-600">
            <p>🧠 AI Analysis: Based on historical data and current trends, revenue is expected to grow 15-20% over the next 6 months. 
            Peak season anticipated in December with 85% confidence.</p>
          </div>
        </CardContent>
      </Card>

      {/* Export options */}
      <Card>
        <CardHeader>
          <CardTitle>Export & Integration</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-3">
              <h3 className="font-semibold">Export Formats</h3>
              <div className="space-y-2">
                <Button variant="outline" className="w-full justify-start">
                  📊 Excel Spreadsheet
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  📄 PDF Report
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  📈 CSV Data
                </Button>
              </div>
            </div>
            
            <div className="space-y-3">
              <h3 className="font-semibold">Accounting Integration</h3>
              <div className="space-y-2">
                <Button variant="outline" className="w-full justify-start">
                  🏢 QuickBooks
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  📚 Xero
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  💼 Fortnox
                </Button>
              </div>
            </div>
            
            <div className="space-y-3">
              <h3 className="font-semibold">Scheduled Reports</h3>
              <div className="space-y-2">
                <Button variant="outline" className="w-full justify-start">
                  📅 Weekly Summary
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  📆 Monthly Report
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  📊 Quarterly Review
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default InvoiceReports;
