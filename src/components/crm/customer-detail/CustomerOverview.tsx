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

interface CustomerOverviewProps {
  customer: {
    id: string;
    name: string;
    email: string;
    phone: string;
    address: string;
    company: string;
    title: string;
    status: 'Active' | 'Inactive' | 'Lead';
  };
}

const CustomerOverview: React.FC<CustomerOverviewProps> = ({ customer }) => {
  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold">{customer.name}</CardTitle>
          <CardDescription>
            {customer.title} at {customer.company}
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
              <span className="font-semibold">Address:</span> {customer.address}
            </p>
          </div>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="sm" className="text-xs">
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
    </div>
  );
};

export default CustomerOverview;
