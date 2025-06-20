
-- Create a table for task notes
CREATE TABLE public.task_notes (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  task_id UUID NOT NULL REFERENCES public.tasks(id) ON DELETE CASCADE,
  user_id UUID NOT NULL DEFAULT auth.uid(),
  content TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Add Row Level Security (RLS) to ensure users can only see notes for tasks they have access to
ALTER TABLE public.task_notes ENABLE ROW LEVEL SECURITY;

-- Create policy that allows users to view task notes (they can see notes for tasks they can see)
CREATE POLICY "Users can view task notes for accessible tasks" 
  ON public.task_notes 
  FOR SELECT 
  USING (
    EXISTS (
      SELECT 1 FROM public.tasks 
      WHERE tasks.id = task_notes.task_id 
      AND tasks.user_id = auth.uid()
    )
  );

-- Create policy that allows users to create notes for tasks they can access
CREATE POLICY "Users can create notes for accessible tasks" 
  ON public.task_notes 
  FOR INSERT 
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.tasks 
      WHERE tasks.id = task_notes.task_id 
      AND tasks.user_id = auth.uid()
    )
  );

-- Create policy that allows users to update their own notes
CREATE POLICY "Users can update their own task notes" 
  ON public.task_notes 
  FOR UPDATE 
  USING (user_id = auth.uid());

-- Create policy that allows users to delete their own notes
CREATE POLICY "Users can delete their own task notes" 
  ON public.task_notes 
  FOR DELETE 
  USING (user_id = auth.uid());

-- Create trigger to update the updated_at column
CREATE TRIGGER update_task_notes_updated_at
  BEFORE UPDATE ON public.task_notes
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();
