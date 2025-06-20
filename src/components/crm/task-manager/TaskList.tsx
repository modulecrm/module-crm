
import React from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import { CheckCircle } from 'lucide-react';
import TaskCard from './TaskCard';

interface Task {
  id: string;
  title: string;
  description: string;
  priority: string;
  status: string;
  due_date: string;
  customer_name?: string;
}

interface TaskListProps {
  tasks: Task[];
  selectedTasks: string[];
  onTaskSelect: (taskId: string, checked: boolean) => void;
  onSelectAll: (checked: boolean) => void;
  onTaskUpdate: (taskId: string, updates: Partial<Task>) => void;
  onTaskStatusChange: (taskId: string, completed: boolean) => void;
}

const TaskList: React.FC<TaskListProps> = ({
  tasks,
  selectedTasks,
  onTaskSelect,
  onSelectAll,
  onTaskUpdate,
  onTaskStatusChange
}) => {
  if (tasks.length === 0) {
    return (
      <div className="text-center py-12">
        <CheckCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">No tasks found</h3>
        <p className="text-gray-600">Try adjusting your filters or add a new task</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Checkbox
          checked={selectedTasks.length === tasks.length}
          onCheckedChange={onSelectAll}
        />
        <span className="text-sm text-gray-600">Select all tasks</span>
      </div>

      <div className="space-y-3">
        {tasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            isSelected={selectedTasks.includes(task.id)}
            onSelect={onTaskSelect}
            onUpdate={onTaskUpdate}
            onStatusChange={onTaskStatusChange}
          />
        ))}
      </div>
    </div>
  );
};

export default TaskList;
