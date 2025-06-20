import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Vote, MessageCircle, User, Calendar } from 'lucide-react';
import { format } from 'date-fns';
import FeatureRequestCard from './FeatureRequestCard';
import { useAuth } from '@/contexts/AuthContext';

interface FeatureRequestListProps {
  moduleFilter?: string | null;
  onVoteChange?: () => void;
}

const FeatureRequestList = ({ moduleFilter, onVoteChange }: FeatureRequestListProps) => {
  const { user } = useAuth();

  const { data: featureRequests, isLoading, refetch } = useQuery({
    queryKey: ['feature-requests', moduleFilter],
    queryFn: async () => {
      let query = supabase
        .from('feature_requests')
        .select(`
          *,
          feature_votes (
            votes_allocated,
            user_id
          ),
          feature_comments (
            id
          )
        `)
        .order('vote_count', { ascending: false });

      if (moduleFilter) {
        query = query.eq('module', moduleFilter);
      }

      const { data, error } = await query;
      if (error) throw error;
      return data;
    },
  });

  const { data: userVotes } = useQuery({
    queryKey: ['user-votes', user?.id],
    queryFn: async () => {
      if (!user?.id) return [];
      const { data, error } = await supabase
        .from('feature_votes')
        .select('*')
        .eq('user_id', user.id);
      if (error) throw error;
      return data;
    },
    enabled: !!user?.id,
  });

  const handleVoteChange = () => {
    refetch();
    onVoteChange?.();
  };

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <Card key={i} className="animate-pulse">
            <CardHeader>
              <div className="h-6 bg-gray-200 rounded w-3/4"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            </CardHeader>
            <CardContent>
              <div className="h-4 bg-gray-200 rounded w-full"></div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (!featureRequests?.length) {
    return (
      <Card>
        <CardContent className="p-8 text-center">
          <MessageCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No feature requests yet</h3>
          <p className="text-gray-500">Be the first to request a feature for this module!</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {featureRequests.map((request) => (
        <FeatureRequestCard 
          key={request.id} 
          request={request}
          userVotes={userVotes || []}
          onVoteChange={handleVoteChange}
        />
      ))}
    </div>
  );
};

export default FeatureRequestList;
