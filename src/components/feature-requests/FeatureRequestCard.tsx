
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Vote, MessageCircle, User, Calendar, Plus, Minus } from 'lucide-react';
import { format } from 'date-fns';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/components/ui/use-toast';
import { useQuery } from '@tanstack/react-query';
import FeatureRequestComments from './FeatureRequestComments';

interface FeatureRequestCardProps {
  request: any;
  userVotes: any[];
  onVoteChange: () => void;
}

const FeatureRequestCard = ({ request, userVotes, onVoteChange }: FeatureRequestCardProps) => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [showComments, setShowComments] = useState(false);

  const userVote = userVotes.find(vote => vote.feature_id === request.id);
  const userVotesAllocated = userVote?.votes_allocated || 0;

  const { data: totalVotesUsed } = useQuery({
    queryKey: ['total-votes-used', user?.id],
    queryFn: async () => {
      if (!user?.id) return 0;
      const { data } = await supabase.rpc('get_user_votes_used', { user_uuid: user.id });
      return data || 0;
    },
    enabled: !!user?.id,
  });

  const remainingVotes = 10 - (totalVotesUsed || 0);

  const handleVote = async (voteChange: number) => {
    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please log in to vote on features",
        variant: "destructive",
      });
      return;
    }

    try {
      const newVotesAllocated = Math.max(0, userVotesAllocated + voteChange);
      
      if (newVotesAllocated === 0) {
        // Remove vote
        await supabase
          .from('feature_votes')
          .delete()
          .eq('feature_id', request.id)
          .eq('user_id', user.id);
      } else if (userVote) {
        // Update existing vote
        await supabase
          .from('feature_votes')
          .update({ votes_allocated: newVotesAllocated })
          .eq('feature_id', request.id)
          .eq('user_id', user.id);
      } else {
        // Create new vote
        await supabase
          .from('feature_votes')
          .insert({
            feature_id: request.id,
            user_id: user.id,
            votes_allocated: newVotesAllocated,
          });
      }

      onVoteChange();
      
      toast({
        title: "Vote updated",
        description: `You now have ${newVotesAllocated} votes on this feature`,
      });
    } catch (error: any) {
      console.error('Error voting:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to update vote",
        variant: "destructive",
      });
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open': return 'bg-blue-100 text-blue-800';
      case 'in_progress': return 'bg-yellow-100 text-yellow-800';
      case 'completed': return 'bg-green-100 text-green-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      case 'on_hold': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-lg mb-2">{request.title}</CardTitle>
            <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
              <Badge variant="outline">{request.module}</Badge>
              <Badge className={getStatusColor(request.status)}>
                {request.status.replace('_', ' ')}
              </Badge>
            </div>
            <p className="text-gray-600 mb-3">{request.description}</p>
            <div className="flex items-center gap-4 text-sm text-gray-500">
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                {format(new Date(request.created_at), 'MMM d, yyyy')}
              </div>
              <div className="flex items-center gap-1">
                <MessageCircle className="h-4 w-4" />
                {request.feature_comments?.length || 0} comments
              </div>
            </div>
          </div>
          
          <div className="flex flex-col items-center gap-2 ml-4">
            <div className="flex items-center gap-1">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleVote(-1)}
                disabled={userVotesAllocated === 0}
              >
                <Minus className="h-3 w-3" />
              </Button>
              <span className="text-lg font-bold text-center min-w-[3rem]">
                {request.vote_count}
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleVote(1)}
                disabled={remainingVotes + userVotesAllocated <= userVotesAllocated}
              >
                <Plus className="h-3 w-3" />
              </Button>
            </div>
            <div className="text-xs text-center text-gray-500">
              {userVotesAllocated > 0 && (
                <div>Your votes: {userVotesAllocated}</div>
              )}
              <div>Remaining: {remainingVotes}</div>
            </div>
          </div>
        </div>
      </CardHeader>
      
      <CardContent>
        <div className="flex items-center justify-between">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowComments(!showComments)}
            className="flex items-center gap-2"
          >
            <MessageCircle className="h-4 w-4" />
            {showComments ? 'Hide' : 'Show'} Comments
          </Button>
        </div>
        
        {showComments && (
          <div className="mt-4 border-t pt-4">
            <FeatureRequestComments featureId={request.id} />
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default FeatureRequestCard;
