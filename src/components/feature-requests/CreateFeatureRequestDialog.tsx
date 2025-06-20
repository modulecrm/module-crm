
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import VoteAllocationSlider from './VoteAllocationSlider';
import FeatureRequestForm from './FeatureRequestForm';
import InlineVoteWithdrawal from './components/InlineVoteWithdrawal';
import { useFeatureRequestForm } from './hooks/useFeatureRequestForm';
import { useVoteManagement } from './hooks/useVoteManagement';
import { createFeatureRequestWithVotes } from './services/featureRequestService';

interface CreateFeatureRequestDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const CreateFeatureRequestDialog = ({ open, onOpenChange }: CreateFeatureRequestDialogProps) => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedVotesForWithdrawal, setSelectedVotesForWithdrawal] = useState<string[]>([]);

  const {
    formData,
    updateFormData,
    resetForm,
    isFormValid,
  } = useFeatureRequestForm();

  const {
    voteAllocation,
    setVoteAllocation,
    remainingVotes,
    votesNeeded,
    userVotes,
    handleWithdrawVotes,
    resetVoteAllocation,
  } = useVoteManagement();

  const needsWithdrawal = voteAllocation > remainingVotes;

  const createFeatureRequest = async () => {
    try {
      await createFeatureRequestWithVotes({
        title: formData.title,
        description: formData.description,
        module: formData.module,
        userId: user!.id,
        voteAllocation,
      });

      toast({
        title: "Feature request created",
        description: voteAllocation > 0 
          ? `Your feature request has been submitted with ${voteAllocation} vote${voteAllocation !== 1 ? 's' : ''}`
          : "Your feature request has been submitted successfully",
      });

      resetForm();
      resetVoteAllocation();
      setSelectedVotesForWithdrawal([]);
      onOpenChange(false);
    } catch (error: any) {
      console.error('Error creating feature request:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to create feature request",
        variant: "destructive",
      });
    }
  };

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

    if (!isFormValid()) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // Check if we need to withdraw votes
      if (needsWithdrawal) {
        // Check if user has selected enough votes for withdrawal
        const selectedVotesTotal = selectedVotesForWithdrawal.reduce((total, voteId) => {
          const vote = userVotes.find(v => v.id === voteId);
          return total + (vote?.votes_allocated || 0);
        }, 0);

        if (selectedVotesTotal < votesNeeded) {
          toast({
            title: "Insufficient votes selected",
            description: `Please select at least ${votesNeeded} vote${votesNeeded !== 1 ? 's' : ''} to withdraw`,
            variant: "destructive",
          });
          setIsSubmitting(false);
          return;
        }

        // Withdraw selected votes first
        const success = await handleWithdrawVotes(selectedVotesForWithdrawal);
        if (!success) {
          setIsSubmitting(false);
          return;
        }
      }

      // Create the feature request
      await createFeatureRequest();
    } catch (error: any) {
      console.error('Error in submit handler:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to process request",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const canSubmit = isFormValid() && (!needsWithdrawal || (needsWithdrawal && selectedVotesForWithdrawal.reduce((total, voteId) => {
    const vote = userVotes.find(v => v.id === voteId);
    return total + (vote?.votes_allocated || 0);
  }, 0) >= votesNeeded));

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Request a New Feature</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <FeatureRequestForm
            formData={formData}
            onFormDataChange={updateFormData}
          />

          <div className="border-t pt-4">
            <VoteAllocationSlider
              value={voteAllocation}
              onChange={setVoteAllocation}
              remainingVotes={remainingVotes}
            />
          </div>

          {needsWithdrawal && userVotes.length > 0 && (
            <InlineVoteWithdrawal
              userVotes={userVotes}
              votesNeeded={votesNeeded}
              onVoteSelectionChange={setSelectedVotesForWithdrawal}
              selectedVotes={selectedVotesForWithdrawal}
            />
          )}

          <div className="flex justify-end gap-2 pt-4 border-t">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting || !canSubmit}>
              {isSubmitting ? 'Creating...' : 'Create Request'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateFeatureRequestDialog;
