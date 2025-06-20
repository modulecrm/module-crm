
import React, { useState } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Vote, MessageCircle, Calendar, Plus, Minus, ChevronDown, ChevronUp } from 'lucide-react';
import { format } from 'date-fns';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
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
  const [showFullDescription, setShowFullDescription] = useState(false);

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
        await supabase
          .from('feature_votes')
          .delete()
          .eq('feature_id', request.id)
          .eq('user_id', user.id);
      } else if (userVote) {
        await supabase
          .from('feature_votes')
          .update({ votes_allocated: newVotesAllocated })
          .eq('feature_id', request.id)
          .eq('user_id', user.id);
      } else {
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

  const truncatedDescription = request.description?.length > 120 
    ? request.description.substring(0, 120) + '...'
    : request.description;

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex-1 min-w-0">
            <h3 className="text-base font-semibold text-gray-900 mb-2 line-clamp-2">{request.title}</h3>
            <div className="flex items-center gap-2 mb-2">
              <Badge variant="outline" className="text-xs">{request.module}</Badge>
              <Badge className={`text-xs ${getStatusColor(request.status)}`}>
                {request.status.replace('_', ' ')}
              </Badge>
            </div>
          </div>
          
          {/* Voting Controls */}
          <div className="flex flex-col items-center gap-1 ml-4">
            <div className="flex items-center gap-1">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleVote(-1)}
                disabled={userVotesAllocated === 0}
                className="h-7 w-7 p-0"
              >
                <Minus className="h-3 w-3" />
              </Button>
              <span className="text-base font-bold text-center min-w-[2rem]">
                {request.vote_count}
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleVote(1)}
                disabled={remainingVotes + userVotesAllocated <= userVotesAllocated}
                className="h-7 w-7 p-0"
              >
                <Plus className="h-3 w-3" />
              </Button>
            </div>
            {userVotesAllocated > 0 && (
              <div className="text-xs text-gray-500">Your: {userVotesAllocated}</div>
            )}
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="pt-0">
        {/* Description */}
        <div className="mb-3">
          <p className="text-sm text-gray-600">
            {showFullDescription ? request.description : truncatedDescription}
          </p>
          {request.description?.length > 120 && (
            <button
              onClick={() => setShowFullDescription(!showFullDescription)}
              className="text-xs text-blue-600 hover:text-blue-800 mt-1 flex items-center gap-1"
            >
              {showFullDescription ? (
                <>
                  Show less <ChevronUp className="h-3 w-3" />
                </>
              ) : (
                <>
                  Show more <ChevronDown className="h-3 w-3" />
                </>
              )}
            </button>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between text-xs text-gray-500">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1">
              <Calendar className="h-3 w-3" />
              {format(new Date(request.created_at), 'MMM d')}
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowComments(!showComments)}
              className="flex items-center gap-1 h-6 px-2 text-xs"
            >
              <MessageCircle className="h-3 w-3" />
              {request.feature_comments?.length || 0}
            </Button>
          </div>
          <div className="text-xs text-gray-400">
            Remaining: {remainingVotes}
          </div>
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
