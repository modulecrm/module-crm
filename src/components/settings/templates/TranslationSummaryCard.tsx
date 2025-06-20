
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { AlertCircle } from 'lucide-react';

interface TranslationSummaryCardProps {
  untranslatedCount: number;
  showUntranslatedOnly: boolean;
  onToggleFilter: () => void;
}

const TranslationSummaryCard = ({ 
  untranslatedCount, 
  showUntranslatedOnly, 
  onToggleFilter 
}: TranslationSummaryCardProps) => {
  return (
    <Card 
      className={`cursor-pointer transition-all hover:shadow-md ${
        showUntranslatedOnly ? 'ring-2 ring-orange-500 bg-orange-50' : 'hover:border-orange-300'
      }`}
      onClick={onToggleFilter}
    >
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-orange-100 rounded-lg">
              <AlertCircle className="h-6 w-6 text-orange-600" />
            </div>
            <div>
              <h3 className="font-semibold text-lg">Translation Status</h3>
              <p className="text-sm text-gray-600">
                {untranslatedCount} template{untranslatedCount !== 1 ? 's' : ''} need{untranslatedCount === 1 ? 's' : ''} translation
              </p>
            </div>
          </div>
          <Badge 
            variant={untranslatedCount > 0 ? "destructive" : "default"}
            className={untranslatedCount > 0 ? "bg-orange-100 text-orange-700" : "bg-green-100 text-green-700"}
          >
            {untranslatedCount > 0 ? `${untranslatedCount} pending` : 'Complete'}
          </Badge>
        </div>
        <div className="mt-3 text-xs text-gray-500">
          {showUntranslatedOnly ? 'Showing untranslated templates only' : 'Click to filter untranslated templates'}
        </div>
      </CardContent>
    </Card>
  );
};

export default TranslationSummaryCard;
