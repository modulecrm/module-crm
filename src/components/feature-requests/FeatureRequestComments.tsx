import React, { useState } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { format } from 'date-fns';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

interface FeatureRequestCommentsProps {
  featureId: string;
}

const FeatureRequestComments = ({ featureId }: FeatureRequestCommentsProps) => {
  const { user } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [newComment, setNewComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { data: comments, isLoading } = useQuery({
    queryKey: ['feature-comments', featureId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('feature_comments')
        .select('*')
        .eq('feature_id', featureId)
        .is('parent_id', null)
        .order('created_at', { ascending: true });
      
      if (error) throw error;
      return data;
    },
  });

  const handleSubmitComment = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please log in to comment",
        variant: "destructive",
      });
      return;
    }

    if (!newComment.trim()) return;

    setIsSubmitting(true);

    try {
      const { error } = await supabase
        .from('feature_comments')
        .insert({
          feature_id: featureId,
          user_id: user.id,
          content: newComment.trim(),
        });

      if (error) throw error;

      setNewComment('');
      queryClient.invalidateQueries({ queryKey: ['feature-comments', featureId] });
      
      toast({
        title: "Comment added",
        description: "Your comment has been posted",
      });
    } catch (error: any) {
      console.error('Error adding comment:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to add comment",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return <div className="animate-pulse">Loading comments...</div>;
  }

  return (
    <div className="space-y-4">
      {comments?.map((comment) => (
        <Card key={comment.id}>
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              <Avatar className="h-8 w-8">
                <AvatarFallback>
                  {comment.user_id?.slice(0, 2).toUpperCase() || 'U'}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <span className="font-medium text-sm">User</span>
                  <span className="text-xs text-gray-500">
                    {format(new Date(comment.created_at), 'MMM d, yyyy HH:mm')}
                  </span>
                </div>
                <p className="text-sm text-gray-700">{comment.content}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}

      {/* Add Comment Form */}
      <form onSubmit={handleSubmitComment} className="space-y-3">
        <Textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Add a comment..."
          rows={3}
        />
        <Button type="submit" disabled={isSubmitting || !newComment.trim()}>
          {isSubmitting ? 'Posting...' : 'Post Comment'}
        </Button>
      </form>
    </div>
  );
};

export default FeatureRequestComments;
