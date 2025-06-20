
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

export const useVoteManagement = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [voteAllocation, setVoteAllocation] = useState(1);
  const [showWithdrawalDialog, setShowWithdrawalDialog] = useState(false);

  const { data: totalVotesUsed, refetch: refetchVotes } = useQuery({
    queryKey: ['total-votes-used', user?.id],
    queryFn: async () => {
      if (!user?.id) return 0;
      const { data } = await supabase.rpc('get_user_votes_used', { user_uuid: user.id });
      return data || 0;
    },
    enabled: !!user?.id,
  });

  const { data: userVotes } = useQuery({
    queryKey: ['user-votes', user?.id],
    queryFn: async () => {
      if (!user?.id) return [];
      const { data, error } = await supabase
        .from('feature_votes')
        .select(`
          *,
          feature_requests (
            id,
            title,
            module
          )
        `)
        .eq('user_id', user.id)
        .order('votes_allocated', { ascending: false });
      if (error) throw error;
      return data;
    },
    enabled: !!user?.id,
  });

  const remainingVotes = 10 - (totalVotesUsed || 0);
  const votesNeeded = Math.max(0, voteAllocation - remainingVotes);

  const handleWithdrawVotes = async (voteIdsToWithdraw: string[]) => {
    try {
      const { error } = await supabase
        .from('feature_votes')
        .delete()
        .in('id', voteIdsToWithdraw);

      if (error) throw error;

      setShowWithdrawalDialog(false);
      await refetchVotes();
      
      return true;
    } catch (error: any) {
      console.error('Error withdrawing votes:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to withdraw votes",
        variant: "destructive",
      });
      return false;
    }
  };

  const resetVoteAllocation = () => {
    setVoteAllocation(1);
  };

  return {
    voteAllocation,
    setVoteAllocation,
    remainingVotes,
    votesNeeded,
    userVotes: userVotes || [],
    showWithdrawalDialog,
    setShowWithdrawalDialog,
    handleWithdrawVotes,
    resetVoteAllocation,
  };
};
