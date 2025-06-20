
import React, { useState } from 'react';
import { MessageSquare, Plus, Vote, MessageCircle, TrendingUp, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import FeatureRequestList from './feature-requests/FeatureRequestList';
import CreateFeatureRequestDialog from './feature-requests/CreateFeatureRequestDialog';
import MyVotesManager from './feature-requests/MyVotesManager';
import { useAuth } from '@/contexts/AuthContext';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

const FeatureRequestsModule = () => {
  const [activeModule, setActiveModule] = useState('all');
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

  const modules = [
    { id: 'all', name: 'All Modules', icon: MessageSquare },
    { id: 'my-votes', name: 'My Votes', icon: User },
    { id: 'dashboard', name: 'Dashboard', icon: TrendingUp },
    { id: 'crm', name: 'CRM', icon: MessageCircle },
    { id: 'invoice', name: 'Invoice', icon: MessageSquare },
    { id: 'booking', name: 'Booking', icon: MessageSquare },
    { id: 'subscription', name: 'Subscription', icon: MessageSquare },
  ];

  const handleVoteChange = () => {
    refetchVotes();
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

      {/* Module Tabs */}
      <Tabs value={activeModule} onValueChange={setActiveModule} className="w-full">
        <TabsList className="grid w-full grid-cols-7">
          {modules.map((module) => {
            const Icon = module.icon;
            return (
              <TabsTrigger key={module.id} value={module.id} className="flex items-center gap-2">
                <Icon className="h-4 w-4" />
                {module.name}
              </TabsTrigger>
            );
          })}
        </TabsList>

        <TabsContent value="my-votes" className="mt-6">
          <MyVotesManager onVoteChange={handleVoteChange} />
        </TabsContent>

        {modules.filter(m => m.id !== 'my-votes').map((module) => (
          <TabsContent key={module.id} value={module.id} className="mt-6">
            <FeatureRequestList 
              moduleFilter={module.id === 'all' ? null : module.id}
              onVoteChange={handleVoteChange}
            />
          </TabsContent>
        ))}
      </Tabs>

      {/* Create Feature Request Dialog */}
      <CreateFeatureRequestDialog 
        open={showCreateDialog} 
        onOpenChange={setShowCreateDialog}
      />
    </div>
  );
};

export default FeatureRequestsModule;
