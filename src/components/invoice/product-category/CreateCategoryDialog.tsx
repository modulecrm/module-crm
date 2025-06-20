
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus } from 'lucide-react';

interface VatRate {
  id: string;
  name: string;
  rate: number;
  isDefault: boolean;
}

interface TaxCategory {
  id: string;
  name: string;
  rate: number;
}

interface CreateCategoryDialogProps {
  vatRates: VatRate[];
  taxCategories: TaxCategory[];
  onCreateCategory: (categoryData: {
    name: string;
    description: string;
    vatRate: string;
    taxCategory: string;
  }) => void;
}

const CreateCategoryDialog = ({ vatRates, taxCategories, onCreateCategory }: CreateCategoryDialogProps) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [categoryName, setCategoryName] = useState('');
  const [categoryDescription, setCategoryDescription] = useState('');
  const [selectedVatRate, setSelectedVatRate] = useState('');
  const [selectedTaxCategory, setSelectedTaxCategory] = useState('');

  const handleCreateCategory = () => {
    if (categoryName.trim()) {
      onCreateCategory({
        name: categoryName,
        description: categoryDescription,
        vatRate: selectedVatRate,
        taxCategory: selectedTaxCategory
      });
      
      // Reset form
      setCategoryName('');
      setCategoryDescription('');
      setSelectedVatRate('');
      setSelectedTaxCategory('');
      setIsDialogOpen(false);
    }
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Add Category
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create New Category</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <div>
            <Label htmlFor="category_name">Category Name</Label>
            <Input 
              id="category_name" 
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
              placeholder="e.g., Workspace, Meeting Rooms" 
            />
          </div>
          
          <div>
            <Label htmlFor="category_description">Description</Label>
            <Textarea 
              id="category_description"
              value={categoryDescription}
              onChange={(e) => setCategoryDescription(e.target.value)}
              placeholder="Brief description of this category"
              rows={3}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="vat_rate">VAT Rate</Label>
              <Select value={selectedVatRate} onValueChange={setSelectedVatRate}>
                <SelectTrigger>
                  <SelectValue placeholder="Select VAT rate" />
                </SelectTrigger>
                <SelectContent>
                  {vatRates.map((rate) => (
                    <SelectItem key={rate.id} value={rate.id}>
                      {rate.name} ({rate.rate}%)
                      {rate.isDefault && <span className="text-xs text-green-600 ml-1">(Default)</span>}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="tax_category">Tax Category</Label>
              <Select value={selectedTaxCategory} onValueChange={setSelectedTaxCategory}>
                <SelectTrigger>
                  <SelectValue placeholder="Select tax category" />
                </SelectTrigger>
                <SelectContent>
                  {taxCategories.map((category) => (
                    <SelectItem key={category.id} value={category.id}>
                      {category.name} ({category.rate}%)
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="flex justify-end gap-2 pt-4">
            <Button 
              variant="outline" 
              onClick={() => {
                setIsDialogOpen(false);
                setCategoryName('');
                setCategoryDescription('');
                setSelectedVatRate('');
                setSelectedTaxCategory('');
              }}
            >
              Cancel
            </Button>
            <Button onClick={handleCreateCategory}>Create Category</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CreateCategoryDialog;
