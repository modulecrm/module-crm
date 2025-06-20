
import React, { useState } from 'react';
import { MessageSquare, Plus, Vote, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
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

  // Combine all modules for the sidebar
  const allModules = [
    { id: 'all', name: 'All Modules', color: 'from-gray-400 to-gray-500' },
    { id: 'my-votes', name: 'My Votes', color: 'from-purple-400 to-purple-500' },
    { id: 'dashboard', name: 'Dashboard', color: 'from-blue-400 to-blue-500' },
    ...modules,
    ...branchModules,
  ];

  const handleVoteChange = () => {
    refetchVotes();
  };

  const handleModuleChange = (moduleId: string) => {
    setSelectedModule(moduleId);
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Vertical Module Menu - 20% */}
      <div className="w-1/5 bg-white border-r border-gray-200 overflow-y-auto">
        <div className="p-6">
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-2 flex items-center gap-2">
              <Filter className="h-5 w-5" />
              Filter by Module
            </h2>
            <p className="text-sm text-gray-600">
              Select a module to view its feature requests
            </p>
          </div>

          {/* Voting Info */}
          <Card className="mb-6">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm flex items-center gap-2">
                <Vote className="h-4 w-4" />
                Voting Power
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <p className="text-xs text-gray-600">
                {totalVotesUsed || 0}/10 votes used
              </p>
            </CardContent>
          </Card>

          {/* Module List */}
          <div className="space-y-2">
            {allModules.map((module) => {
              const Icon = module.icon;
              return (
                <button
                  key={module.id}
                  onClick={() => handleModuleChange(module.id)}
                  className={`w-full text-left p-3 rounded-lg transition-all duration-200 ${
                    selectedModule === module.id
                      ? 'bg-blue-50 border-blue-200 border'
                      : 'hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    {Icon && (
                      <div className={`p-2 rounded-md bg-gradient-to-r ${module.color}`}>
                        <Icon className="h-4 w-4 text-white" />
                      </div>
                    )}
                    <span className={`text-sm font-medium ${
                      selectedModule === module.id ? 'text-blue-900' : 'text-gray-700'
                    }`}>
                      {module.name}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main Content - 80% */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-6">
          {/* Header */}
          <div className="mb-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-900 mb-2 flex items-center gap-3">
                  <MessageSquare className="h-6 w-6" />
                  Feature Requests
                  {selectedModule !== 'all' && selectedModule !== 'my-votes' && (
                    <span className="text-lg text-gray-500">
                      - {allModules.find(m => m.id === selectedModule)?.name}
                    </span>
                  )}
                </h1>
                <p className="text-gray-600">
                  {selectedModule === 'my-votes' 
                    ? 'Manage your votes and see where you\'ve allocated them'
                    : 'Vote on features you\'d like to see implemented'
                  }
                </p>
              </div>
              <Button onClick={() => setShowCreateDialog(true)} className="flex items-center gap-2">
                <Plus className="h-4 w-4" />
                Request Feature
              </Button>
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
        </div>
      </div>

      {/* Create Feature Request Dialog */}
      <CreateFeatureRequestDialog 
        open={showCreateDialog} 
        onOpenChange={setShowCreateDialog}
      />
    </div>
  );
};

export default FeatureRequestsModule;
