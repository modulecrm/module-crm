
-- Create enum for feature request status
CREATE TYPE public.feature_status AS ENUM ('open', 'in_progress', 'completed', 'rejected', 'on_hold');

-- Create feature_requests table
CREATE TABLE public.feature_requests (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title VARCHAR NOT NULL,
  description TEXT,
  module VARCHAR NOT NULL,
  status feature_status NOT NULL DEFAULT 'open',
  created_by UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  vote_count INTEGER NOT NULL DEFAULT 0
);

-- Create votes table
CREATE TABLE public.feature_votes (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  feature_id UUID REFERENCES public.feature_requests(id) ON DELETE CASCADE NOT NULL,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  votes_allocated INTEGER NOT NULL DEFAULT 1 CHECK (votes_allocated > 0),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(feature_id, user_id)
);

-- Create comments table
CREATE TABLE public.feature_comments (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  feature_id UUID REFERENCES public.feature_requests(id) ON DELETE CASCADE NOT NULL,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  content TEXT NOT NULL,
  parent_id UUID REFERENCES public.feature_comments(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on all tables
ALTER TABLE public.feature_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.feature_votes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.feature_comments ENABLE ROW LEVEL SECURITY;

-- RLS policies for feature_requests (everyone can read, authenticated users can create)
CREATE POLICY "Anyone can view feature requests" ON public.feature_requests FOR SELECT USING (true);
CREATE POLICY "Authenticated users can create feature requests" ON public.feature_requests FOR INSERT WITH CHECK (auth.uid() = created_by);
CREATE POLICY "Users can update their own feature requests" ON public.feature_requests FOR UPDATE USING (auth.uid() = created_by);

-- RLS policies for feature_votes (authenticated users can manage their votes)
CREATE POLICY "Users can view all votes" ON public.feature_votes FOR SELECT USING (true);
CREATE POLICY "Users can create their own votes" ON public.feature_votes FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own votes" ON public.feature_votes FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete their own votes" ON public.feature_votes FOR DELETE USING (auth.uid() = user_id);

-- RLS policies for feature_comments (everyone can read, authenticated users can create/update their own)
CREATE POLICY "Anyone can view comments" ON public.feature_comments FOR SELECT USING (true);
CREATE POLICY "Authenticated users can create comments" ON public.feature_comments FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own comments" ON public.feature_comments FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete their own comments" ON public.feature_comments FOR DELETE USING (auth.uid() = user_id);

-- Function to update vote count when votes are added/removed/updated
CREATE OR REPLACE FUNCTION update_feature_vote_count()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    UPDATE public.feature_requests 
    SET vote_count = vote_count + NEW.votes_allocated 
    WHERE id = NEW.feature_id;
    RETURN NEW;
  ELSIF TG_OP = 'UPDATE' THEN
    UPDATE public.feature_requests 
    SET vote_count = vote_count - OLD.votes_allocated + NEW.votes_allocated 
    WHERE id = NEW.feature_id;
    RETURN NEW;
  ELSIF TG_OP = 'DELETE' THEN
    UPDATE public.feature_requests 
    SET vote_count = vote_count - OLD.votes_allocated 
    WHERE id = OLD.feature_id;
    RETURN OLD;
  END IF;
  RETURN NULL;
END;
$$ LANGUAGE plpgsql;

-- Create triggers to automatically update vote counts
CREATE TRIGGER update_vote_count_on_insert
  AFTER INSERT ON public.feature_votes
  FOR EACH ROW EXECUTE FUNCTION update_feature_vote_count();

CREATE TRIGGER update_vote_count_on_update
  AFTER UPDATE ON public.feature_votes
  FOR EACH ROW EXECUTE FUNCTION update_feature_vote_count();

CREATE TRIGGER update_vote_count_on_delete
  AFTER DELETE ON public.feature_votes
  FOR EACH ROW EXECUTE FUNCTION update_feature_vote_count();

-- Function to check user's total votes used
CREATE OR REPLACE FUNCTION get_user_votes_used(user_uuid UUID)
RETURNS INTEGER AS $$
BEGIN
  RETURN COALESCE((
    SELECT SUM(votes_allocated) 
    FROM public.feature_votes 
    WHERE user_id = user_uuid
  ), 0);
END;
$$ LANGUAGE plpgsql STABLE;

-- Add constraint to ensure users don't exceed 10 votes total
CREATE OR REPLACE FUNCTION check_user_vote_limit()
RETURNS TRIGGER AS $$
DECLARE
  current_votes INTEGER;
  new_total INTEGER;
BEGIN
  -- Calculate current votes used by user (excluding the current record if updating)
  IF TG_OP = 'UPDATE' THEN
    current_votes := get_user_votes_used(NEW.user_id) - OLD.votes_allocated;
  ELSE
    current_votes := get_user_votes_used(NEW.user_id);
  END IF;
  
  new_total := current_votes + NEW.votes_allocated;
  
  IF new_total > 10 THEN
    RAISE EXCEPTION 'User cannot allocate more than 10 votes total. Current: %, Attempting to add: %', current_votes, NEW.votes_allocated;
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to enforce vote limit
CREATE TRIGGER enforce_vote_limit
  BEFORE INSERT OR UPDATE ON public.feature_votes
  FOR EACH ROW EXECUTE FUNCTION check_user_vote_limit();
