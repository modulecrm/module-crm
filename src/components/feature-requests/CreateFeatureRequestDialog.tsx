
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/components/ui/use-toast';
import { useQuery } from '@tanstack/react-query';
import VoteAllocationSlider from './VoteAllocationSlider';
import { modules, branchModules } from '../modules/moduleData';

interface CreateFeatureRequestDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const CreateFeatureRequestDialog = ({ open, onOpenChange }: CreateFeatureRequestDialogProps) => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    module: '',
  });
  const [voteAllocation, setVoteAllocation] = useState(1);

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

  // Combine all modules for selection
  const allModules = [
    { value: 'dashboard', label: 'Dashboard' },
    ...modules.map(m => ({ value: m.id, label: m.name })),
    ...branchModules.map(m => ({ value: m.id, label: m.name })),
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please log in to create feature requests",
        variant: "destructive",
      });
      return;
    }

    if (!formData.title.trim() || !formData.module) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    if (voteAllocation > remainingVotes) {
      toast({
        title: "Not enough votes",
        description: `You only have ${remainingVotes} votes remaining`,
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // Create the feature request
      const { data: featureRequest, error: createError } = await supabase
        .from('feature_requests')
        .insert({
          title: formData.title.trim(),
          description: formData.description.trim(),
          module: formData.module,
          created_by: user.id,
        })
        .select()
        .single();

      if (createError) throw createError;

      // Add votes if allocation > 0
      if (voteAllocation > 0) {
        const { error: voteError } = await supabase
          .from('feature_votes')
          .insert({
            feature_id: featureRequest.id,
            user_id: user.id,
            votes_allocated: voteAllocation,
          });

        if (voteError) throw voteError;
      }

      toast({
        title: "Feature request created",
        description: voteAllocation > 0 
          ? `Your feature request has been submitted with ${voteAllocation} vote${voteAllocation !== 1 ? 's' : ''}`
          : "Your feature request has been submitted successfully",
      });

      setFormData({ title: '', description: '', module: '' });
      setVoteAllocation(1);
      onOpenChange(false);
    } catch (error: any) {
      console.error('Error creating feature request:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to create feature request",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Request a New Feature</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="title">Feature Title *</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="Brief description of the feature"
              required
            />
          </div>

          <div>
            <Label htmlFor="module">Module *</Label>
            <Select value={formData.module} onValueChange={(value) => setFormData({ ...formData, module: value })}>
              <SelectTrigger>
                <SelectValue placeholder="Select a module" />
              </SelectTrigger>
              <SelectContent>
                {allModules.map((module) => (
                  <SelectItem key={module.value} value={module.value}>
                    {module.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Detailed description of the feature and why it would be valuable"
              rows={4}
            />
          </div>

          {remainingVotes > 0 && (
            <div className="border-t pt-4">
              <VoteAllocationSlider
                value={voteAllocation}
                onChange={setVoteAllocation}
                maxVotes={Math.min(10, remainingVotes)}
                remainingVotes={remainingVotes - voteAllocation}
              />
            </div>
          )}

          {remainingVotes === 0 && (
            <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg text-sm text-amber-700">
              You have used all 10 of your votes. You can still create feature requests but won't be able to vote on them immediately.
            </div>
          )}

          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Creating...' : 'Create Request'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateFeatureRequestDialog;
