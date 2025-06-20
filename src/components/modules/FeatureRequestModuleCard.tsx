
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MessageSquare, TrendingUp, Users } from 'lucide-react';

interface FeatureRequestModuleCardProps {
  moduleId: string;
  moduleName: string;
}

const FeatureRequestModuleCard = ({ moduleId, moduleName }: FeatureRequestModuleCardProps) => {
  const { data: moduleStats } = useQuery({
    queryKey: ['module-feature-stats', moduleId],
    queryFn: async () => {
      const { data: requests, error } = await supabase
        .from('feature_requests')
        .select('id, title, vote_count')
        .eq('module', moduleId)
        .order('vote_count', { ascending: false })
        .limit(3);

      if (error) throw error;

      const totalRequests = requests?.length || 0;
      const totalVotes = requests?.reduce((sum, req) => sum + req.vote_count, 0) || 0;
      const topRequest = requests?.[0];

      return {
        totalRequests,
        totalVotes,
        topRequest,
        recentRequests: requests || []
      };
    },
  });

  const handleNavigateToModule = () => {
    // This would typically use router navigation to feature requests filtered by module
    console.log(`Navigate to feature requests for module: ${moduleId}`);
  };

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-center gap-2">
          <MessageSquare className="h-5 w-5" />
          {moduleName}
        </CardTitle>
        <CardDescription>
          Feature requests and voting activity
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Stats */}
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Users className="h-4 w-4 text-gray-500" />
            <span className="text-sm text-gray-600">
              {moduleStats?.totalRequests || 0} requests
            </span>
          </div>
          <div className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4 text-gray-500" />
            <span className="text-sm text-gray-600">
              {moduleStats?.totalVotes || 0} votes
            </span>
          </div>
        </div>

        {/* Top Request */}
        {moduleStats?.topRequest && (
          <div className="p-3 bg-gray-50 rounded-lg">
            <p className="text-sm font-medium text-gray-900 mb-1">
              Top Request:
            </p>
            <p className="text-sm text-gray-700 mb-2">
              {moduleStats.topRequest.title}
            </p>
            <Badge variant="outline" className="text-xs">
              {moduleStats.topRequest.vote_count} votes
            </Badge>
          </div>
        )}

        {/* Action Button */}
        <Button 
          variant="outline" 
          className="w-full"
          onClick={handleNavigateToModule}
        >
          View & Vote on Features
        </Button>
      </CardContent>
    </Card>
  );
};

export default FeatureRequestModuleCard;
