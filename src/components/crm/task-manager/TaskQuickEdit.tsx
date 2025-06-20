
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Textarea } from '@/components/ui/textarea';
import { MoreHorizontal, Edit3, Calendar as CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';

interface Task {
  id: string;
  title: string;
  description: string;
  priority: string;
  status: string;
  due_date: string;
}

interface TaskQuickEditProps {
  task: Task;
  onUpdate: (updates: Partial<Task>) => void;
  onStatusChange: (completed: boolean) => void;
}

const TaskQuickEdit: React.FC<TaskQuickEditProps> = ({ task, onUpdate, onStatusChange }) => {
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
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Mark as completed</span>
            <Checkbox
              checked={task.status === 'completed'}
              onCheckedChange={(checked) => onStatusChange(checked as boolean)}
            />
          </div>
          
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

export default TaskQuickEdit;
