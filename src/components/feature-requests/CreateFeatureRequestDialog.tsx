
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import VoteAllocationSlider from './VoteAllocationSlider';
import VoteWithdrawalDialog from './VoteWithdrawalDialog';
import FeatureRequestForm from './FeatureRequestForm';
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
    showWithdrawalDialog,
    setShowWithdrawalDialog,
    handleWithdrawVotes,
    resetVoteAllocation,
  } = useVoteManagement();

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

  const handleWithdrawAndCreate = async (voteIdsToWithdraw: string[]) => {
    const success = await handleWithdrawVotes(voteIdsToWithdraw);
    if (success) {
      await createFeatureRequest();
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
      if (voteAllocation > remainingVotes) {
        setShowWithdrawalDialog(true);
        setIsSubmitting(false);
        return;
      }

      // If we have enough votes, proceed directly
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

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Request a New Feature</DialogTitle>
          </DialogHeader>
          
          <form onSubmit={handleSubmit} className="space-y-4">
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

      <VoteWithdrawalDialog
        open={showWithdrawalDialog}
        onOpenChange={setShowWithdrawalDialog}
        userVotes={userVotes}
        votesNeeded={votesNeeded}
        onConfirmWithdrawal={handleWithdrawAndCreate}
      />
    </>
  );
};

export default CreateFeatureRequestDialog;
