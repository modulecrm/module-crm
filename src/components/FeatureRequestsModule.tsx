
import React, { useState } from 'react';
import { MessageSquare, Plus, Vote, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import FeatureRequestList from './feature-requests/FeatureRequestList';
import CreateFeatureRequestDialog from './feature-requests/CreateFeatureRequestDialog';
import MyVotesManager from './feature-requests/MyVotesManager';
import { useAuth } from '@/contexts/AuthContext';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { modules, branchModules } from './modules/moduleData';

const FeatureRequestsModule = () => {
  const [selectedModule, setSelectedModule] = useState('all');
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const { user } = useAuth();

  const { data: totalVotesUsed, refetch: refetchVotes } = useQuery({
    queryKey: ['total-votes-used', user?.id],
    queryFn: async () => {
      if (!user?.id) return 0;
      const { data } = await supabase.rpc('get_user_votes_used', { user_uuid: user.id });
      return data || 0;
    },
    enabled: !!user?.id,
  });

  // Combine all modules for the dropdown
  const allModules = [
    { id: 'all', name: 'All Modules' },
    { id: 'my-votes', name: 'My Votes' },
    { id: 'dashboard', name: 'Dashboard' },
    ...modules.map(m => ({ id: m.id, name: m.name })),
    ...branchModules.map(m => ({ id: m.id, name: m.name })),
  ];

  const handleVoteChange = () => {
    refetchVotes();
  };

  const handleModuleChange = (value: string) => {
    setSelectedModule(value);
  };

  return (
    <div className="p-8">
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2 flex items-center gap-3">
              <MessageSquare className="h-8 w-8" />
              Feature Requests
            </h1>
            <p className="text-gray-600">
              Help us prioritize development by voting on features you'd like to see
            </p>
          </div>
          <Button onClick={() => setShowCreateDialog(true)} className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Request Feature
          </Button>
        </div>
      </div>

      {/* Voting Info Card */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Vote className="h-5 w-5" />
            Your Voting Power
          </CardTitle>
          <CardDescription>
            You have {totalVotesUsed || 0}/10 votes allocated. You can put multiple votes on features you really want!
          </CardDescription>
        </CardHeader>
      </Card>

      {/* Module Filter */}
      <div className="mb-6">
        <div className="flex items-center gap-4">
          <Filter className="h-5 w-5 text-gray-500" />
          <Select value={selectedModule} onValueChange={handleModuleChange}>
            <SelectTrigger className="w-64">
              <SelectValue placeholder="Filter by module" />
            </SelectTrigger>
            <SelectContent>
              {allModules.map((module) => (
                <SelectItem key={module.id} value={module.id}>
                  {module.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Content based on selected module */}
      {selectedModule === 'my-votes' ? (
        <MyVotesManager onVoteChange={handleVoteChange} />
      ) : (
        <FeatureRequestList 
          moduleFilter={selectedModule === 'all' ? null : selectedModule}
          onVoteChange={handleVoteChange}
        />
      )}

      {/* Create Feature Request Dialog */}
      <CreateFeatureRequestDialog 
        open={showCreateDialog} 
        onOpenChange={setShowCreateDialog}
      />
    </div>
  );
};

export default FeatureRequestsModule;
