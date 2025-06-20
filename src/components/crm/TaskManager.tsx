
import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import CreateTaskDialog from './CreateTaskDialog';
import TaskStats from './task-manager/TaskStats';
import TaskFilters from './task-manager/TaskFilters';
import BulkActions from './task-manager/BulkActions';
import TaskList from './task-manager/TaskList';
import { Plus } from 'lucide-react';

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
  const [viewMode, setViewMode] = useState('priority');
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [selectedTasks, setSelectedTasks] = useState<string[]>([]);

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

      const sortedTasks = tasksWithCustomSort.sort((a, b) => {
        if (viewMode === 'priority') {
          const priorityOrder = { 'urgent': 0, 'high': 1, 'medium': 2, 'low': 3 };
          
          const priorityA = priorityOrder[a.priority as keyof typeof priorityOrder] ?? 4;
          const priorityB = priorityOrder[b.priority as keyof typeof priorityOrder] ?? 4;
          
          if (priorityA !== priorityB) {
            return priorityA - priorityB;
          }
          
          if (a.due_date && b.due_date) {
            return new Date(a.due_date).getTime() - new Date(b.due_date).getTime();
          }
          
          if (a.due_date && !b.due_date) return -1;
          if (!a.due_date && b.due_date) return 1;
          
          return 0;
        } else {
          if (a.due_date && b.due_date) {
            return new Date(a.due_date).getTime() - new Date(b.due_date).getTime();
          }
          
          if (a.due_date && !b.due_date) return -1;
          if (!a.due_date && b.due_date) return 1;
          
          return 0;
        }
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

  const updateTask = async (taskId: string, updates: Partial<Task>) => {
    try {
      const { error } = await supabase
        .from('tasks')
        .update(updates)
        .eq('id', taskId);

      if (error) throw error;

      setTasks(prevTasks =>
        prevTasks.map(task =>
          task.id === taskId
            ? { ...task, ...updates }
            : task
        )
      );
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  const bulkUpdateTasks = async (updates: Partial<Task>) => {
    try {
      const { error } = await supabase
        .from('tasks')
        .update(updates)
        .in('id', selectedTasks);

      if (error) throw error;

      setTasks(prevTasks =>
        prevTasks.map(task =>
          selectedTasks.includes(task.id)
            ? { ...task, ...updates }
            : task
        )
      );
      
      setSelectedTasks([]);
    } catch (error) {
      console.error('Error bulk updating tasks:', error);
    }
  };

  const isOverdue = (dueDate: string) => {
    return new Date(dueDate) < new Date() && dueDate;
  };

  const filteredTasks = tasks.filter(task => {
    if (filter === 'all') return true;
    if (filter === 'pending') return task.status === 'pending';
    if (filter === 'in_progress') return task.status === 'in_progress';
    if (filter === 'completed') return task.status === 'completed';
    if (filter === 'overdue') return isOverdue(task.due_date) && task.status !== 'completed';
    return task.priority === filter;
  });

  const handleTaskCreated = () => {
    fetchTasks();
  };

  const handleTaskSelect = (taskId: string, checked: boolean) => {
    if (checked) {
      setSelectedTasks(prev => [...prev, taskId]);
    } else {
      setSelectedTasks(prev => prev.filter(id => id !== taskId));
    }
  };

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedTasks(filteredTasks.map(task => task.id));
    } else {
      setSelectedTasks([]);
    }
  };

  const handleStatsCardClick = (filterType: string) => {
    setFilter(filterType);
  };

  if (loading) {
    return <div className="p-8">Loading tasks...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Task Manager</h2>
        <div className="flex items-center gap-4">
          <Select value={viewMode} onValueChange={setViewMode}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="priority">Priority View</SelectItem>
              <SelectItem value="due_date">Due Date View</SelectItem>
            </SelectContent>
          </Select>
          <Button 
            className="flex items-center gap-2"
            onClick={() => setShowCreateDialog(true)}
          >
            <Plus className="h-4 w-4" />
            Add Task
          </Button>
        </div>
      </div>

      <TaskFilters filter={filter} onFilterChange={setFilter} />

      <BulkActions
        selectedTasks={selectedTasks}
        onBulkUpdate={bulkUpdateTasks}
        onClearSelection={() => setSelectedTasks([])}
      />

      <TaskStats
        tasks={tasks}
        filter={filter}
        onStatsCardClick={handleStatsCardClick}
      />

      <TaskList
        tasks={filteredTasks}
        selectedTasks={selectedTasks}
        onTaskSelect={handleTaskSelect}
        onSelectAll={handleSelectAll}
        onTaskUpdate={updateTask}
        onTaskStatusChange={updateTaskStatus}
      />

      <CreateTaskDialog
        open={showCreateDialog}
        onOpenChange={setShowCreateDialog}
        onTaskCreated={handleTaskCreated}
      />
    </div>
  );
};

export default TaskManager;
