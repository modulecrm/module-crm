
import React from 'react';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import { Vote } from 'lucide-react';

interface VoteAllocationSliderProps {
  value: number;
  onChange: (value: number) => void;
  remainingVotes: number;
}

const VoteAllocationSlider = ({ value, onChange, remainingVotes }: VoteAllocationSliderProps) => {
  const handleSliderChange = (newValue: number[]) => {
    onChange(newValue[0]);
  };

  const needsWithdrawal = value > remainingVotes;

  return (
    <div className="space-y-4">
      <Label className="flex items-center gap-2">
        <Vote className="h-4 w-4" />
        Allocate Votes (0-10 available)
      </Label>
      
      <div className="px-2">
        <Slider
          value={[value]}
          onValueChange={handleSliderChange}
          max={10}
          min={0}
          step={1}
          className="w-full"
        />
      </div>
      
      <div className="flex justify-between text-sm text-gray-500">
        <span>0 votes</span>
        <span className="font-medium">
          {remainingVotes} remaining votes
        </span>
        <span>10 votes</span>
      </div>
      
      {value > 0 && !needsWithdrawal && (
        <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg text-sm text-blue-700">
          You will allocate {value} vote{value !== 1 ? 's' : ''} to this feature request
        </div>
      )}
    </div>
  );
};

export default VoteAllocationSlider;
