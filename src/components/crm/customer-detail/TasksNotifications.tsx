
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CheckSquare, Plus, Calendar, AlertCircle, Clock } from 'lucide-react';

interface TasksNotificationsProps {
  customerId: string;
}

interface Task {
  id: string;
  title: string;
  description: string;
  status: 'open' | 'completed' | 'overdue';
  priority: 'low' | 'medium' | 'high';
  dueDate: string;
  assignee: string;
}

const TasksNotifications: React.FC<TasksNotificationsProps> = ({ customerId }) => {
  const [tasks] = useState<Task[]>([
    {
      id: '1',
      title: 'Follow up on payment',
      description: 'Customer payment is 5 days overdue',
      status: 'overdue',
      priority: 'high',
      dueDate: '2024-01-10',
      assignee: 'John Manager'
    },
    {
      id: '2',
      title: 'Schedule upgrade meeting',
      description: 'Discuss premium plan options',
      status: 'open',
      priority: 'medium',
      dueDate: '2024-01-20',
      assignee: 'Sarah Sales'
    },
    {
      id: '3',
      title: 'Send welcome package',
      description: 'New customer onboarding materials',
      status: 'completed',
      priority: 'low',
      dueDate: '2024-01-15',
      assignee: 'Mike Support'
    }
  ]);

  const notifications = [
    {
      id: '1',
      message: 'Payment reminder sent automatically',
      type: 'system',
      date: '2024-01-16 10:00'
    },
    {
      id: '2',
      message: 'AI suggests upgrading customer to premium',
      type: 'ai',
      date: '2024-01-15 14:30'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'open': return 'bg-blue-100 text-blue-800';
      case 'overdue': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckSquare className="h-4 w-4" />;
      case 'overdue': return <AlertCircle className="h-4 w-4" />;
      default: return <Clock className="h-4 w-4" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Tasks */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            Tasks & TODOs
            <Button className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Create Task
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {tasks.map((task) => (
              <div key={task.id} className="border rounded-lg p-4">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-start gap-3">
                    <div className={`p-1 rounded ${getStatusColor(task.status)}`}>
                      {getStatusIcon(task.status)}
                    </div>
                    <div>
                      <h4 className="font-semibold">{task.title}</h4>
                      <p className="text-sm text-gray-600">{task.description}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-1 text-sm text-gray-600 mb-1">
                      <Calendar className="h-3 w-3" />
                      {task.dueDate}
                    </div>
                    <p className="text-xs text-gray-500">{task.assignee}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge className={getStatusColor(task.status)}>
                    {task.status}
                  </Badge>
                  <Badge className={getPriorityColor(task.priority)} variant="outline">
                    {task.priority}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Notifications & Reminders */}
      <Card>
        <CardHeader>
          <CardTitle>Notifications & AI Recommendations</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {notifications.map((notification) => (
              <div key={notification.id} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                <div className={`p-1 rounded-full ${notification.type === 'ai' ? 'bg-purple-100' : 'bg-blue-100'}`}>
                  {notification.type === 'ai' ? '🧠' : '🔔'}
                </div>
                <div className="flex-1">
                  <p className="font-medium">{notification.message}</p>
                  <p className="text-xs text-gray-500">{notification.date}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TasksNotifications;
