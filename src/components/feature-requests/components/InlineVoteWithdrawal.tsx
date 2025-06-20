
import React, { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { Vote, AlertTriangle, Zap } from 'lucide-react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';

interface InlineVoteWithdrawalProps {
  userVotes: any[];
  votesNeeded: number;
  onVoteSelectionChange: (selectedVotes: string[]) => void;
  selectedVotes: string[];
}

const InlineVoteWithdrawal = ({ 
  userVotes, 
  votesNeeded, 
  onVoteSelectionChange,
  selectedVotes
}: InlineVoteWithdrawalProps) => {
  const [isExpanded, setIsExpanded] = useState(true);

  const handleVoteSelect = (voteId: string, checked: boolean) => {
    if (checked) {
      onVoteSelectionChange([...selectedVotes, voteId]);
    } else {
      onVoteSelectionChange(selectedVotes.filter(id => id !== voteId));
    }
  };

  const selectedVotesTotal = selectedVotes.reduce((total, voteId) => {
    const vote = userVotes.find(v => v.id === voteId);
    return total + (vote?.votes_allocated || 0);
  }, 0);

  const canProceed = selectedVotesTotal >= votesNeeded;

  const handleAutoSelect = () => {
    // Sort votes by allocation (descending) and select minimum needed
    const sortedVotes = [...userVotes].sort((a, b) => b.votes_allocated - a.votes_allocated);
    const autoSelected: string[] = [];
    let totalSelected = 0;

    for (const vote of sortedVotes) {
      if (totalSelected < votesNeeded) {
        autoSelected.push(vote.id);
        totalSelected += vote.votes_allocated;
      }
    }

    onVoteSelectionChange(autoSelected);
  };

  return (
    <div className="border border-amber-200 bg-amber-50 rounded-lg overflow-hidden">
      <Collapsible open={isExpanded} onOpenChange={setIsExpanded}>
        <CollapsibleTrigger asChild>
          <div className="p-4 cursor-pointer hover:bg-amber-100 transition-colors">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-amber-600" />
                <span className="font-medium text-amber-800">
                  Withdraw {votesNeeded} vote{votesNeeded !== 1 ? 's' : ''} to continue
                </span>
              </div>
              <div className="text-xs text-amber-600">
                {isExpanded ? 'Hide' : 'Show'} withdrawal options
              </div>
            </div>
            <p className="text-sm text-amber-700 mt-1">
              Select features to withdraw votes from to allocate them to this new request
            </p>
          </div>
        </CollapsibleTrigger>

        <CollapsibleContent>
          <div className="border-t border-amber-200 p-4 space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-amber-800">
                Select votes to withdraw:
              </span>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={handleAutoSelect}
                className="text-xs"
              >
                <Zap className="h-3 w-3 mr-1" />
                Auto-select minimum
              </Button>
            </div>

            <div className="space-y-2 max-h-48 overflow-y-auto">
              {userVotes.map((vote) => (
                <div key={vote.id} className="flex items-center justify-between p-3 bg-white border border-amber-100 rounded-lg">
                  <div className="flex items-center gap-3">
                    <Checkbox
                      checked={selectedVotes.includes(vote.id)}
                      onCheckedChange={(checked) => handleVoteSelect(vote.id, checked as boolean)}
                    />
                    <div className="flex-1">
                      <h4 className="font-medium text-sm text-gray-900">{vote.feature_requests?.title}</h4>
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

            <div className="p-3 bg-white border border-amber-100 rounded-lg">
              <div className="flex justify-between text-sm">
                <span>Votes selected for withdrawal:</span>
                <span className={`font-medium ${canProceed ? 'text-green-600' : 'text-red-600'}`}>
                  {selectedVotesTotal} / {votesNeeded}
                </span>
              </div>
              {!canProceed && selectedVotesTotal > 0 && (
                <p className="text-xs text-gray-600 mt-1">
                  Select {votesNeeded - selectedVotesTotal} more vote{(votesNeeded - selectedVotesTotal) !== 1 ? 's' : ''} to proceed
                </p>
              )}
              {canProceed && (
                <p className="text-xs text-green-600 mt-1">
                  ✓ Sufficient votes selected for withdrawal
                </p>
              )}
            </div>
          </div>
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
};

export default InlineVoteWithdrawal;
