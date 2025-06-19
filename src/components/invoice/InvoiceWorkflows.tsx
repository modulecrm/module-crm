
import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus, Settings, Calendar, Zap, CheckCircle } from 'lucide-react';

const InvoiceWorkflows = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const { data: workflows, isLoading } = useQuery({
    queryKey: ['invoice_workflows'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('invoice_workflows')
        .select('*')
        .order('created_at', { ascending: false });
      if (error) throw error;
      return data;
    }
  });

  const predefinedWorkflows = [
    {
      id: 'booking_confirmed',
      name: 'Booking Confirmed Invoice',
      description: 'Automatically create invoice when a booking is confirmed',
      trigger: 'booking_confirmed',
      icon: Calendar,
      color: 'text-blue-600 bg-blue-100'
    },
    {
      id: 'subscription_renewed',
      name: 'Subscription Renewal',
      description: 'Generate recurring invoice for subscription renewals',
      trigger: 'subscription_renewed',
      icon: Zap,
      color: 'text-purple-600 bg-purple-100'
    },
    {
      id: 'milestone_completed',
      name: 'Project Milestone',
      description: 'Create invoice when project milestone is completed',
      trigger: 'milestone_completed',
      icon: CheckCircle,
      color: 'text-green-600 bg-green-100'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Automated Invoice Workflows</h2>
          <p className="text-gray-600">Set up automatic invoice generation based on business events</p>
        </div>
        
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Create Workflow
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Create New Workflow</DialogTitle>
            </DialogHeader>
            
            <div className="space-y-4">
              <div>
                <Label htmlFor="workflow_name">Workflow Name</Label>
                <Input id="workflow_name" placeholder="e.g., Monthly Membership Invoice" />
              </div>
              
              <div>
                <Label htmlFor="trigger_type">Trigger Event</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select trigger event" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="booking_confirmed">Booking Confirmed</SelectItem>
                    <SelectItem value="subscription_renewed">Subscription Renewed</SelectItem>
                    <SelectItem value="milestone_completed">Project Milestone Completed</SelectItem>
                    <SelectItem value="manual">Manual Trigger</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="flex items-center space-x-2">
                <Switch id="requires_approval" />
                <Label htmlFor="requires_approval">Requires approval before sending</Label>
              </div>
              
              <div className="flex justify-end gap-2 pt-4">
                <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancel
                </Button>
                <Button>Create Workflow</Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Predefined workflow templates */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {predefinedWorkflows.map((workflow) => {
          const IconComponent = workflow.icon;
          return (
            <Card key={workflow.id} className="hover:shadow-md transition-shadow cursor-pointer">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className={`p-3 rounded-lg ${workflow.color}`}>
                    <IconComponent className="h-6 w-6" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold mb-2">{workflow.name}</h3>
                    <p className="text-sm text-gray-600 mb-3">{workflow.description}</p>
                    <Button variant="outline" size="sm" className="w-full">
                      <Settings className="h-4 w-4 mr-2" />
                      Configure
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Active workflows */}
      <Card>
        <CardHeader>
          <CardTitle>Active Workflows</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="text-center py-8">Loading workflows...</div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Workflow Name</TableHead>
                  <TableHead>Trigger</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Requires Approval</TableHead>
                  <TableHead>Created</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {workflows?.map((workflow) => (
                  <TableRow key={workflow.id}>
                    <TableCell className="font-medium">{workflow.name}</TableCell>
                    <TableCell>
                      <Badge variant="outline">
                        {workflow.trigger_type.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant={workflow.is_active ? "default" : "secondary"}>
                        {workflow.is_active ? 'Active' : 'Inactive'}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {workflow.requires_approval ? (
                        <Badge variant="secondary">Yes</Badge>
                      ) : (
                        <Badge variant="outline">No</Badge>
                      )}
                    </TableCell>
                    <TableCell>
                      {new Date(workflow.created_at).toLocaleDateString()}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="ghost" size="sm">
                          Edit
                        </Button>
                        <Switch 
                          checked={workflow.is_active}
                          onCheckedChange={() => {/* Handle toggle */}}
                        />
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
                
                {!workflows?.length && (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-8 text-gray-500">
                      No workflows configured. Create your first workflow to automate invoice generation.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      {/* Workflow insights */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <CheckCircle className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <div className="text-2xl font-bold">24</div>
                <div className="text-sm text-gray-600">Invoices Generated</div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Zap className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <div className="text-2xl font-bold">3</div>
                <div className="text-sm text-gray-600">Active Workflows</div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-orange-100 rounded-lg">
                <Settings className="h-5 w-5 text-orange-600" />
              </div>
              <div>
                <div className="text-2xl font-bold">89%</div>
                <div className="text-sm text-gray-600">Automation Rate</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default InvoiceWorkflows;
