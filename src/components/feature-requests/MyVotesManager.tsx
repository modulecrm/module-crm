
import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Trash2, Edit3, Vote } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/components/ui/use-toast';

interface MyVotesManagerProps {
  onVoteChange: () => void;
}

const MyVotesManager = ({ onVoteChange }: MyVotesManagerProps) => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [selectedVotes, setSelectedVotes] = useState<string[]>([]);
  const [isWithdrawing, setIsWithdrawing] = useState(false);

  const { data: userVotes, refetch } = useQuery({
    queryKey: ['my-votes', user?.id],
    queryFn: async () => {
      if (!user?.id) return [];
      const { data, error } = await supabase
        .from('feature_votes')
        .select(`
          *,
          feature_requests (
            id,
            title,
            module,
            status
          )
        `)
        .eq('user_id', user.id)
        .order('votes_allocated', { ascending: false });
      if (error) throw error;
      return data;
    },
    enabled: !!user?.id,
  });

  const totalVotesUsed = userVotes?.reduce((sum, vote) => sum + vote.votes_allocated, 0) || 0;

  const handleSelectVote = (voteId: string, checked: boolean) => {
    if (checked) {
      setSelectedVotes([...selectedVotes, voteId]);
    } else {
      setSelectedVotes(selectedVotes.filter(id => id !== voteId));
    }
  };

  const handleWithdrawSelected = async () => {
    if (!selectedVotes.length) return;
    
    setIsWithdrawing(true);
    try {
      const { error } = await supabase
        .from('feature_votes')
        .delete()
        .in('id', selectedVotes);

      if (error) throw error;

      toast({
        title: "Votes withdrawn",
        description: `Successfully withdrew ${selectedVotes.length} vote(s)`,
      });

      setSelectedVotes([]);
      refetch();
      onVoteChange();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to withdraw votes",
        variant: "destructive",
      });
    } finally {
      setIsWithdrawing(false);
    }
  };

  const handleWithdrawSingle = async (voteId: string) => {
    try {
      const { error } = await supabase
        .from('feature_votes')
        .delete()
        .eq('id', voteId);

      if (error) throw error;

      toast({
        title: "Vote withdrawn",
        description: "Successfully withdrew vote",
      });

      refetch();
      onVoteChange();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to withdraw vote",
        variant: "destructive",
      });
    }
  };

  if (!userVotes?.length) {
    return (
      <Card>
        <CardContent className="p-8 text-center">
          <Vote className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No votes cast yet</h3>
          <p className="text-gray-500">Start voting on features to see your vote history here!</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Vote className="h-5 w-5" />
            My Votes ({totalVotesUsed}/10)
          </CardTitle>
          {selectedVotes.length > 0 && (
            <Button
              variant="destructive"
              size="sm"
              onClick={handleWithdrawSelected}
              disabled={isWithdrawing}
              className="flex items-center gap-2"
            >
              <Trash2 className="h-4 w-4" />
              Withdraw Selected ({selectedVotes.length})
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {userVotes.map((vote) => (
            <div key={vote.id} className="flex items-center justify-between p-3 border rounded-lg">
              <div className="flex items-center gap-3">
                <Checkbox
                  checked={selectedVotes.includes(vote.id)}
                  onCheckedChange={(checked) => handleSelectVote(vote.id, checked as boolean)}
                />
                <div className="flex-1">
                  <h4 className="font-medium">{vote.feature_requests?.title}</h4>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge variant="outline">{vote.feature_requests?.module}</Badge>
                    <Badge variant="outline">{vote.votes_allocated} votes</Badge>
                  </div>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleWithdrawSingle(vote.id)}
                className="text-red-600 hover:text-red-700"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default MyVotesManager;
