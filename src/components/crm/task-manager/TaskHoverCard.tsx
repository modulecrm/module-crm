
import React from 'react';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';
import { Badge } from '@/components/ui/badge';
import { Calendar, User, FileText, Clock } from 'lucide-react';

interface Task {
  id: string;
  title: string;
  description: string;
  priority: string;
  status: string;
  due_date: string;
  created_at: string;
  customer_name?: string;
  deal_title?: string;
}

interface TaskHoverCardProps {
  task: Task;
  children: React.ReactNode;
}

const TaskHoverCard: React.FC<TaskHoverCardProps> = ({ task, children }) => {
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent': return 'bg-red-100 text-red-800';
      case 'high': return 'bg-orange-100 text-orange-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'in_progress': return 'bg-blue-100 text-blue-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return 'No date set';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const isOverdue = (dueDate: string) => {
    return dueDate && new Date(dueDate) < new Date() && task.status !== 'completed';
  };

  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        {children}
      </HoverCardTrigger>
      <HoverCardContent className="w-96 p-4">
        <div className="space-y-4">
          <div>
            <h3 className="font-semibold text-lg text-gray-900 mb-2">{task.title}</h3>
            <div className="flex gap-2 mb-3">
              <Badge className={getPriorityColor(task.priority)}>
                {task.priority}
              </Badge>
              <Badge className={getStatusColor(task.status)}>
                {task.status.replace('_', ' ')}
              </Badge>
            </div>
          </div>

          <div className="space-y-3">
            {task.description && (
              <div className="flex items-start gap-2">
                <FileText className="h-4 w-4 text-gray-500 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-gray-700">Description</p>
                  <p className="text-sm text-gray-600">{task.description}</p>
                </div>
              </div>
            )}

            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-gray-500" />
              <div>
                <p className="text-sm font-medium text-gray-700">Due Date</p>
                <p className={`text-sm ${isOverdue(task.due_date) ? 'text-red-600 font-medium' : 'text-gray-600'}`}>
                  {formatDate(task.due_date)}
                  {isOverdue(task.due_date) && ' (Overdue)'}
                </p>
              </div>
            </div>

            {task.customer_name && (
              <div className="flex items-center gap-2">
                <User className="h-4 w-4 text-gray-500" />
                <div>
                  <p className="text-sm font-medium text-gray-700">Customer</p>
                  <p className="text-sm text-gray-600">{task.customer_name}</p>
                </div>
              </div>
            )}

            {task.deal_title && (
              <div className="flex items-center gap-2">
                <FileText className="h-4 w-4 text-gray-500" />
                <div>
                  <p className="text-sm font-medium text-gray-700">Deal</p>
                  <p className="text-sm text-gray-600">{task.deal_title}</p>
                </div>
              </div>
            )}

            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-gray-500" />
              <div>
                <p className="text-sm font-medium text-gray-700">Created</p>
                <p className="text-sm text-gray-600">{formatDate(task.created_at)}</p>
              </div>
            </div>
          </div>

          <div className="pt-2 border-t border-gray-200">
            <p className="text-xs text-gray-500">Click on the task to edit</p>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
};

export default TaskHoverCard;
