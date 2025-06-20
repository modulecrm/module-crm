
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { AlertTriangle, Vote } from 'lucide-react';

interface VoteWithdrawalDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  userVotes: any[];
  votesNeeded: number;
  onConfirmWithdrawal: (voteIdsToWithdraw: string[]) => void;
}

const VoteWithdrawalDialog = ({ 
  open, 
  onOpenChange, 
  userVotes, 
  votesNeeded, 
  onConfirmWithdrawal 
}: VoteWithdrawalDialogProps) => {
  const [selectedVotes, setSelectedVotes] = useState<string[]>([]);

  const handleVoteSelect = (voteId: string, checked: boolean) => {
    if (checked) {
      setSelectedVotes([...selectedVotes, voteId]);
    } else {
      setSelectedVotes(selectedVotes.filter(id => id !== voteId));
    }
  };

  const selectedVotesTotal = selectedVotes.reduce((total, voteId) => {
    const vote = userVotes.find(v => v.id === voteId);
    return total + (vote?.votes_allocated || 0);
  }, 0);

  const canProceed = selectedVotesTotal >= votesNeeded;

  const handleConfirm = () => {
    onConfirmWithdrawal(selectedVotes);
    setSelectedVotes([]);
  };

  const handleCancel = () => {
    setSelectedVotes([]);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-amber-500" />
            Withdraw Votes to Continue
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg">
            <p className="text-sm text-amber-700">
              You need to withdraw <strong>{votesNeeded} vote{votesNeeded !== 1 ? 's' : ''}</strong> from other features to proceed.
              Select which features to withdraw votes from:
            </p>
          </div>

          <div className="space-y-3 max-h-60 overflow-y-auto">
            {userVotes.map((vote) => (
              <div key={vote.id} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center gap-3">
                  <Checkbox
                    checked={selectedVotes.includes(vote.id)}
                    onCheckedChange={(checked) => handleVoteSelect(vote.id, checked as boolean)}
                  />
                  <div className="flex-1">
                    <h4 className="font-medium text-sm">{vote.feature_requests?.title}</h4>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge variant="outline" className="text-xs">{vote.feature_requests?.module}</Badge>
                      <div className="flex items-center gap-1 text-xs text-gray-500">
                        <Vote className="h-3 w-3" />
                        {vote.votes_allocated} vote{vote.votes_allocated !== 1 ? 's' : ''}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="p-3 bg-gray-50 rounded-lg">
            <div className="flex justify-between text-sm">
              <span>Votes to withdraw:</span>
              <span className={`font-medium ${canProceed ? 'text-green-600' : 'text-red-600'}`}>
                {selectedVotesTotal} / {votesNeeded}
              </span>
            </div>
            {!canProceed && selectedVotesTotal > 0 && (
              <p className="text-xs text-gray-600 mt-1">
                Select {votesNeeded - selectedVotesTotal} more vote{(votesNeeded - selectedVotesTotal) !== 1 ? 's' : ''} to proceed
              </p>
            )}
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={handleCancel}>
            Cancel
          </Button>
          <Button 
            onClick={handleConfirm} 
            disabled={!canProceed}
            className="bg-amber-600 hover:bg-amber-700"
          >
            Withdraw & Continue
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default VoteWithdrawalDialog;
