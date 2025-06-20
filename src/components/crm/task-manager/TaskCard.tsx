import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Calendar as CalendarIcon } from 'lucide-react';
import TaskQuickEdit from './TaskQuickEdit';
import TaskHoverCard from './TaskHoverCard';

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

interface TaskCardProps {
  task: Task;
  isSelected: boolean;
  onSelect: (taskId: string, checked: boolean) => void;
  onUpdate: (taskId: string, updates: Partial<Task>) => void;
  onStatusChange: (taskId: string, completed: boolean) => void;
}

const TaskCard: React.FC<TaskCardProps> = ({ 
  task, 
  isSelected, 
  onSelect, 
  onUpdate, 
  onStatusChange 
}) => {
  const navigate = useNavigate();

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

  const isOverdue = (dueDate: string) => {
    return new Date(dueDate) < new Date() && dueDate;
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    return new Date(dateString).toLocaleDateString();
  };

  const handleCardClick = () => {
    navigate(`/task/${task.id}`);
  };

  return (
    <TaskHoverCard task={task}>
      <Card className="hover:shadow-md transition-shadow cursor-pointer" onClick={handleCardClick}>
        <CardContent className="p-4">
          <div className="flex items-center gap-4">
            <Checkbox
              checked={isSelected}
              onCheckedChange={(checked) => onSelect(task.id, checked as boolean)}
              onClick={(e) => e.stopPropagation()}
            />
            
            <div className="flex-1 grid grid-cols-1 md:grid-cols-5 gap-4 items-center">
              <div className="min-w-0">
                <h3 className={`font-semibold truncate ${task.status === 'completed' ? 'line-through text-gray-500' : 'text-gray-900'}`}>
                  {task.title}
                </h3>
                {task.customer_name && (
                  <p className="text-sm text-gray-500">{task.customer_name}</p>
                )}
              </div>
              
              <div className="text-sm">
                <div className={`flex items-center gap-1 ${isOverdue(task.due_date) && task.status !== 'completed' ? 'text-red-500' : 'text-gray-600'}`}>
                  <CalendarIcon className="h-3 w-3" />
                  {task.due_date ? formatDate(task.due_date) : 'No due date'}
                </div>
              </div>
              
              <div>
                <Badge className={getPriorityColor(task.priority)}>
                  {task.priority}
                </Badge>
              </div>
              
              <div>
                <Badge className={getStatusColor(task.status)}>
                  {task.status.replace('_', ' ')}
                </Badge>
              </div>
              
              <div className="text-sm text-gray-600 truncate">
                {task.description || 'No description'}
              </div>
            </div>
            
            <div onClick={(e) => e.stopPropagation()}>
              <TaskQuickEdit 
                task={task} 
                onUpdate={(updates) => onUpdate(task.id, updates)}
                onStatusChange={(completed) => onStatusChange(task.id, completed)}
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </TaskHoverCard>
  );
};

export default TaskCard;
