import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import CreateTaskDialog from './CreateTaskDialog';
import { 
  Plus, 
  Clock, 
  User, 
  AlertCircle, 
  CheckCircle,
  Calendar as CalendarIcon,
  MoreHorizontal,
  Edit3
} from 'lucide-react';
import { format } from 'date-fns';

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
  const [viewMode, setViewMode] = useState('priority'); // 'priority' or 'due_date'
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [selectedTasks, setSelectedTasks] = useState<string[]>([]);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [showBulkActions, setShowBulkActions] = useState(false);

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

      // Sort based on view mode
      const sortedTasks = tasksWithCustomSort.sort((a, b) => {
        if (viewMode === 'priority') {
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
        } else {
          // Sort by due date only
          if (a.due_date && b.due_date) {
            return new Date(a.due_date).getTime() - new Date(b.due_date).getTime();
          }
          
          // Tasks with due dates come before those without
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

      {/* Bulk Actions */}
      {selectedTasks.length > 0 && (
        <Card className="bg-blue-50 border-blue-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-blue-900">
                {selectedTasks.length} task{selectedTasks.length > 1 ? 's' : ''} selected
              </span>
              <div className="flex gap-2">
                <Select onValueChange={(value) => bulkUpdateTasks({ status: value })}>
                  <SelectTrigger className="w-32">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="in_progress">In Progress</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                    <SelectItem value="cancelled">Cancelled</SelectItem>
                  </SelectContent>
                </Select>
                <Select onValueChange={(value) => bulkUpdateTasks({ priority: value })}>
                  <SelectTrigger className="w-32">
                    <SelectValue placeholder="Priority" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="urgent">Urgent</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="low">Low</SelectItem>
                  </SelectContent>
                </Select>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => setSelectedTasks([])}
                >
                  Clear Selection
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Task Stats - Now clickable */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card 
          className={`cursor-pointer transition-all hover:shadow-md ${filter === 'all' ? 'ring-2 ring-blue-500' : ''}`}
          onClick={() => handleStatsCardClick('all')}
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
          onClick={() => handleStatsCardClick('pending')}
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
          className={`cursor-pointer transition-all hover:shadow-md ${filter === 'completed' ? 'ring-2 ring-blue-500' : ''}`}
          onClick={() => handleStatsCardClick('completed')}
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
          onClick={() => handleStatsCardClick('overdue')}
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

      {/* Select All Checkbox */}
      {filteredTasks.length > 0 && (
        <div className="flex items-center gap-2">
          <Checkbox
            checked={selectedTasks.length === filteredTasks.length}
            onCheckedChange={handleSelectAll}
          />
          <span className="text-sm text-gray-600">Select all tasks</span>
        </div>
      )}

      {/* Tasks List */}
      <div className="space-y-3">
        {filteredTasks.map((task) => (
          <Card key={task.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-4">
              <div className="flex items-center gap-4">
                <Checkbox
                  checked={selectedTasks.includes(task.id)}
                  onCheckedChange={(checked) => handleTaskSelect(task.id, checked as boolean)}
                />
                
                <div className="flex-1 grid grid-cols-1 md:grid-cols-5 gap-4 items-center">
                  {/* Subject */}
                  <div className="min-w-0">
                    <h3 className={`font-semibold truncate ${task.status === 'completed' ? 'line-through text-gray-500' : 'text-gray-900'}`}>
                      {task.title}
                    </h3>
                    {task.customer_name && (
                      <p className="text-sm text-gray-500">{task.customer_name}</p>
                    )}
                  </div>
                  
                  {/* Due Date */}
                  <div className="text-sm">
                    <div className={`flex items-center gap-1 ${isOverdue(task.due_date) && task.status !== 'completed' ? 'text-red-500' : 'text-gray-600'}`}>
                      <CalendarIcon className="h-3 w-3" />
                      {task.due_date ? formatDate(task.due_date) : 'No due date'}
                    </div>
                  </div>
                  
                  {/* Priority */}
                  <div>
                    <Badge className={getPriorityColor(task.priority)}>
                      {task.priority}
                    </Badge>
                  </div>
                  
                  {/* Status */}
                  <div>
                    <Badge className={getStatusColor(task.status)}>
                      {task.status.replace('_', ' ')}
                    </Badge>
                  </div>
                  
                  {/* Description */}
                  <div className="text-sm text-gray-600 truncate">
                    {task.description || 'No description'}
                  </div>
                </div>
                
                {/* Actions */}
                <TaskQuickEdit 
                  task={task} 
                  onUpdate={(updates) => updateTask(task.id, updates)}
                  onStatusChange={(completed) => updateTaskStatus(task.id, completed)}
                />
              </div>
            </CardContent>
          </Card>
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

// Quick Edit Component for individual tasks
const TaskQuickEdit = ({ task, onUpdate, onStatusChange }: { 
  task: Task; 
  onUpdate: (updates: Partial<Task>) => void;
  onStatusChange: (completed: boolean) => void;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [note, setNote] = useState('');
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    task.due_date ? new Date(task.due_date) : undefined
  );

  const handleDateSelect = (date: Date | undefined) => {
    setSelectedDate(date);
    if (date) {
      onUpdate({ due_date: date.toISOString() });
    }
  };

  const handleAddNote = () => {
    if (note.trim()) {
      const currentDescription = task.description || '';
      const newDescription = currentDescription 
        ? `${currentDescription}\n\n--- Note added ${new Date().toLocaleDateString()} ---\n${note}`
        : note;
      onUpdate({ description: newDescription });
      setNote('');
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="sm">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Quick Edit Task</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          {/* Status Toggle */}
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Mark as completed</span>
            <Checkbox
              checked={task.status === 'completed'}
              onCheckedChange={(checked) => onStatusChange(checked as boolean)}
            />
          </div>
          
          {/* Priority Update */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Priority</label>
            <Select 
              value={task.priority} 
              onValueChange={(value) => onUpdate({ priority: value })}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="urgent">Urgent</SelectItem>
                <SelectItem value="high">High</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="low">Low</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          {/* Status Update */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Status</label>
            <Select 
              value={task.status} 
              onValueChange={(value) => onUpdate({ status: value })}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="in_progress">In Progress</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          {/* Due Date Update */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Due Date</label>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="w-full justify-start text-left">
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {selectedDate ? format(selectedDate, "PPP") : "Select date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={handleDateSelect}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
          
          {/* Add Note */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Add Note</label>
            <Textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Add a note to this task..."
              rows={3}
            />
            <Button 
              onClick={handleAddNote} 
              disabled={!note.trim()}
              className="w-full"
            >
              <Edit3 className="mr-2 h-4 w-4" />
              Add Note
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TaskManager;
