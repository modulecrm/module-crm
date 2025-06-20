
import React from 'react';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import { Vote } from 'lucide-react';

interface VoteAllocationSliderProps {
  value: number;
  onChange: (value: number) => void;
  maxVotes: number;
  remainingVotes: number;
}

const VoteAllocationSlider = ({ value, onChange, maxVotes, remainingVotes }: VoteAllocationSliderProps) => {
  const handleSliderChange = (newValue: number[]) => {
    onChange(newValue[0]);
  };

  return (
    <div className="space-y-4">
      <Label className="flex items-center gap-2">
        <Vote className="h-4 w-4" />
        Allocate Votes ({value}/{maxVotes} available)
      </Label>
      
      <div className="px-2">
        <Slider
          value={[value]}
          onValueChange={handleSliderChange}
          max={Math.min(maxVotes, remainingVotes)}
          min={0}
          step={1}
          className="w-full"
        />
      </div>
      
      <div className="flex justify-between text-sm text-gray-500">
        <span>0 votes</span>
        <span className="font-medium">
          {remainingVotes} remaining after allocation
        </span>
        <span>{Math.min(maxVotes, remainingVotes)} votes</span>
      </div>
      
      {value > 0 && (
        <div className="p-2 bg-blue-50 rounded-lg text-sm text-blue-700">
          You will allocate {value} vote{value !== 1 ? 's' : ''} to this feature request
        </div>
      )}
    </div>
  );
};

export default VoteAllocationSlider;
