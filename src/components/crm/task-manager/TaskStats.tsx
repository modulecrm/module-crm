
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Clock, AlertCircle, CheckCircle, PlayCircle } from 'lucide-react';

interface Task {
  id: string;
  status: string;
  due_date: string;
}

interface TaskStatsProps {
  tasks: Task[];
  filter: string;
  onStatsCardClick: (filterType: string) => void;
}

const TaskStats: React.FC<TaskStatsProps> = ({ tasks, filter, onStatsCardClick }) => {
  const isOverdue = (dueDate: string) => {
    return new Date(dueDate) < new Date() && dueDate;
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
      <Card 
        className={`cursor-pointer transition-all hover:shadow-md ${filter === 'all' ? 'ring-2 ring-blue-500' : ''}`}
        onClick={() => onStatsCardClick('all')}
      >
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">Total Tasks</span>
            <Clock className="h-4 w-4 text-gray-400" />
          </div>
          <p className="text-2xl font-bold text-gray-900">{tasks.length}</p>
        </CardContent>
      </Card>
      
      <Card 
        className={`cursor-pointer transition-all hover:shadow-md ${filter === 'pending' ? 'ring-2 ring-blue-500' : ''}`}
        onClick={() => onStatsCardClick('pending')}
      >
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">Pending</span>
            <AlertCircle className="h-4 w-4 text-yellow-500" />
          </div>
          <p className="text-2xl font-bold text-yellow-600">
            {tasks.filter(t => t.status === 'pending').length}
          </p>
        </CardContent>
      </Card>
      
      <Card 
        className={`cursor-pointer transition-all hover:shadow-md ${filter === 'in_progress' ? 'ring-2 ring-blue-500' : ''}`}
        onClick={() => onStatsCardClick('in_progress')}
      >
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">In Progress</span>
            <PlayCircle className="h-4 w-4 text-blue-500" />
          </div>
          <p className="text-2xl font-bold text-blue-600">
            {tasks.filter(t => t.status === 'in_progress').length}
          </p>
        </CardContent>
      </Card>
      
      <Card 
        className={`cursor-pointer transition-all hover:shadow-md ${filter === 'completed' ? 'ring-2 ring-blue-500' : ''}`}
        onClick={() => onStatsCardClick('completed')}
      >
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">Completed</span>
            <CheckCircle className="h-4 w-4 text-green-500" />
          </div>
          <p className="text-2xl font-bold text-green-600">
            {tasks.filter(t => t.status === 'completed').length}
          </p>
        </CardContent>
      </Card>
      
      <Card 
        className={`cursor-pointer transition-all hover:shadow-md ${filter === 'overdue' ? 'ring-2 ring-blue-500' : ''}`}
        onClick={() => onStatsCardClick('overdue')}
      >
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">Overdue</span>
            <AlertCircle className="h-4 w-4 text-red-500" />
          </div>
          <p className="text-2xl font-bold text-red-600">
            {tasks.filter(t => isOverdue(t.due_date) && t.status !== 'completed').length}
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default TaskStats;
