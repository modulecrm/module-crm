import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import CreateTaskDialog from './CreateTaskDialog';
import { 
  Plus, 
  Clock, 
  User, 
  AlertCircle, 
  CheckCircle,
  Calendar
} from 'lucide-react';

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

const TaskManager = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [showCreateDialog, setShowCreateDialog] = useState(false);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const { data, error } = await supabase
        .from('tasks')
        .select(`
          *,
          customers (name),
          deals (title)
        `)
        .order('due_date', { ascending: true });

      if (error) throw error;

      const tasksWithCustomSort = data?.map(task => ({
        ...task,
        customer_name: task.customers?.name,
        deal_title: task.deals?.title
      })) || [];

      // Sort by priority first (urgent, high, medium, low), then by due date
      const sortedTasks = tasksWithCustomSort.sort((a, b) => {
        // Define priority order
        const priorityOrder = { 'urgent': 0, 'high': 1, 'medium': 2, 'low': 3 };
        
        // First sort by priority
        const priorityA = priorityOrder[a.priority as keyof typeof priorityOrder] ?? 4;
        const priorityB = priorityOrder[b.priority as keyof typeof priorityOrder] ?? 4;
        
        if (priorityA !== priorityB) {
          return priorityA - priorityB;
        }
        
        // If same priority, sort by due date (earliest first)
        if (a.due_date && b.due_date) {
          return new Date(a.due_date).getTime() - new Date(b.due_date).getTime();
        }
        
        // Tasks with due dates come before those without
        if (a.due_date && !b.due_date) return -1;
        if (!a.due_date && b.due_date) return 1;
        
        return 0;
      });

      setTasks(sortedTasks);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateTaskStatus = async (taskId: string, completed: boolean) => {
    try {
      const newStatus = completed ? 'completed' : 'pending';
      const { error } = await supabase
        .from('tasks')
        .update({ 
          status: newStatus,
          completed_date: completed ? new Date().toISOString() : null
        })
        .eq('id', taskId);

      if (error) throw error;

      setTasks(prevTasks =>
        prevTasks.map(task =>
          task.id === taskId
            ? { ...task, status: newStatus }
            : task
        )
      );
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent': return 'bg-red-100 text-red-800';
      case 'high': return 'bg-orange-100 text-orange-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case 'urgent':
      case 'high':
        return <AlertCircle className="h-4 w-4" />;
      default:
        return <Clock className="h-4 w-4" />;
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

  const filteredTasks = tasks.filter(task => {
    if (filter === 'all') return true;
    if (filter === 'pending') return task.status === 'pending';
    if (filter === 'completed') return task.status === 'completed';
    if (filter === 'overdue') return isOverdue(task.due_date) && task.status !== 'completed';
    return task.priority === filter;
  });

  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    return new Date(dateString).toLocaleDateString();
  };

  const handleTaskCreated = () => {
    fetchTasks(); // Refresh the tasks list
  };

  if (loading) {
    return <div className="p-8">Loading tasks...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Task Manager</h2>
        <Button 
          className="flex items-center gap-2"
          onClick={() => setShowCreateDialog(true)}
        >
          <Plus className="h-4 w-4" />
          Add Task
        </Button>
      </div>

      {/* Filter Bar */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        {['all', 'pending', 'completed', 'overdue', 'urgent', 'high', 'medium', 'low'].map((filterOption) => (
          <button
            key={filterOption}
            onClick={() => setFilter(filterOption)}
            className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
              filter === filterOption
                ? 'bg-blue-100 text-blue-800'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {filterOption.charAt(0).toUpperCase() + filterOption.slice(1)}
          </button>
        ))}
      </div>

      {/* Task Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">Total Tasks</span>
            <Clock className="h-4 w-4 text-gray-400" />
          </div>
          <p className="text-2xl font-bold text-gray-900">{tasks.length}</p>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">Pending</span>
            <AlertCircle className="h-4 w-4 text-yellow-500" />
          </div>
          <p className="text-2xl font-bold text-yellow-600">
            {tasks.filter(t => t.status === 'pending').length}
          </p>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">Completed</span>
            <CheckCircle className="h-4 w-4 text-green-500" />
          </div>
          <p className="text-2xl font-bold text-green-600">
            {tasks.filter(t => t.status === 'completed').length}
          </p>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">Overdue</span>
            <AlertCircle className="h-4 w-4 text-red-500" />
          </div>
          <p className="text-2xl font-bold text-red-600">
            {tasks.filter(t => isOverdue(t.due_date) && t.status !== 'completed').length}
          </p>
        </div>
      </div>

      {/* Tasks List */}
      <div className="space-y-4">
        {filteredTasks.map((task) => (
          <div key={task.id} className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-start justify-between">
              <div className="flex items-start space-x-4">
                <Checkbox
                  checked={task.status === 'completed'}
                  onCheckedChange={(checked) => updateTaskStatus(task.id, checked as boolean)}
                />
                
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className={`font-semibold ${task.status === 'completed' ? 'line-through text-gray-500' : 'text-gray-900'}`}>
                      {task.title}
                    </h3>
                    <Badge className={getPriorityColor(task.priority)}>
                      <div className="flex items-center gap-1">
                        {getPriorityIcon(task.priority)}
                        {task.priority}
                      </div>
                    </Badge>
                    <Badge className={getStatusColor(task.status)}>
                      {task.status.replace('_', ' ')}
                    </Badge>
                  </div>
                  
                  {task.description && (
                    <p className="text-gray-600 mb-3">{task.description}</p>
                  )}
                  
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    {task.customer_name && (
                      <div className="flex items-center gap-1">
                        <User className="h-3 w-3" />
                        {task.customer_name}
                      </div>
                    )}
                    {task.deal_title && (
                      <span>Deal: {task.deal_title}</span>
                    )}
                    {task.due_date && (
                      <div className={`flex items-center gap-1 ${isOverdue(task.due_date) && task.status !== 'completed' ? 'text-red-500' : ''}`}>
                        <Calendar className="h-3 w-3" />
                        Due: {formatDate(task.due_date)}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredTasks.length === 0 && (
        <div className="text-center py-12">
          <CheckCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No tasks found</h3>
          <p className="text-gray-600">Try adjusting your filters or add a new task</p>
        </div>
      )}

      <CreateTaskDialog
        open={showCreateDialog}
        onOpenChange={setShowCreateDialog}
        onTaskCreated={handleTaskCreated}
      />
    </div>
  );
};

export default TaskManager;
