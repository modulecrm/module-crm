
import React from 'react';
import { Search, Filter, Grid, List } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CustomView } from './types';

interface CustomerFiltersProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  viewMode: 'table' | 'grid';
  onViewModeChange: (mode: 'table' | 'grid') => void;
  onOpenCustomViewEditor: () => void;
  activeView: string;
  onActiveViewChange: (view: string) => void;
  customViews: CustomView[];
}

const CustomerFilters: React.FC<CustomerFiltersProps> = ({
  searchTerm,
  onSearchChange,
  viewMode,
  onViewModeChange,
  onOpenCustomViewEditor,
  activeView,
  onActiveViewChange,
  customViews
}) => {
  return (
    <div className="bg-white border-b border-gray-200 px-4 sm:px-6 lg:px-8 py-4">
      <div className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:space-y-0 sm:space-x-4">
        <div className="flex-1 max-w-md">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search customers..."
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
          <Button
            variant="outline"
            onClick={onOpenCustomViewEditor}
            className="w-full sm:w-auto"
          >
            <Filter className="h-4 w-4 mr-2" />
            <span className="sm:hidden">Filter</span>
            <span className="hidden sm:inline">Custom View</span>
          </Button>
          
          <div className="flex rounded-md border border-gray-300 bg-white">
            <Button
              variant={viewMode === 'table' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => onViewModeChange('table')}
              className="rounded-r-none border-0"
            >
              <List className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === 'grid' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => onViewModeChange('grid')}
              className="rounded-l-none border-0"
            >
              <Grid className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      <div className="mt-4">
        <Tabs value={activeView} onValueChange={onActiveViewChange}>
          <TabsList className="w-full sm:w-auto">
            <TabsTrigger value="all" className="flex-1 sm:flex-none">All Customers</TabsTrigger>
            {customViews.map(view => (
              <TabsTrigger key={view.id} value={view.id} className="flex-1 sm:flex-none">
                {view.name}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      </div>
    </div>
  );
};

export default CustomerFilters;
