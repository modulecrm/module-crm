
import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus, Edit, Trash2, Package, Tags } from 'lucide-react';

const ProductCategory = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [categoryName, setCategoryName] = useState('');
  const [categoryDescription, setCategoryDescription] = useState('');
  const [selectedVatRate, setSelectedVatRate] = useState('');
  const [selectedTaxCategory, setSelectedTaxCategory] = useState('');

  // Mock VAT rates and tax categories (these would typically come from settings)
  const vatRates = [
    { id: '1', name: 'Standard VAT', rate: 20, isDefault: true },
    { id: '2', name: 'Reduced VAT', rate: 5, isDefault: false },
    { id: '3', name: 'Zero VAT', rate: 0, isDefault: false },
  ];

  const taxCategories = [
    { id: '1', name: 'Sales Tax', rate: 8.5 },
    { id: '2', name: 'Service Tax', rate: 12 },
    { id: '3', name: 'Import Duty', rate: 15 },
  ];

  const { data: categories, isLoading } = useQuery({
    queryKey: ['product_categories'],
    queryFn: async () => {
      // Mock data since we don't have a categories table yet
      return [
        { id: '1', name: 'Workspace', description: 'Workspace-related products and services', product_count: 12, created_at: '2024-01-15' },
        { id: '2', name: 'Meeting Rooms', description: 'Meeting room rentals and equipment', product_count: 8, created_at: '2024-01-10' },
        { id: '3', name: 'Virtual Services', description: 'Virtual office and digital services', product_count: 6, created_at: '2024-01-20' },
        { id: '4', name: 'Add-ons', description: 'Additional services and products', product_count: 15, created_at: '2024-01-05' },
      ];
    }
  });

  const handleCreateCategory = () => {
    console.log('Creating category:', { 
      name: categoryName, 
      description: categoryDescription,
      vatRate: selectedVatRate,
      taxCategory: selectedTaxCategory
    });
    setIsDialogOpen(false);
    setCategoryName('');
    setCategoryDescription('');
    setSelectedVatRate('');
    setSelectedTaxCategory('');
    // Implementation for creating category
  };

  const handleEditCategory = (categoryId: string) => {
    console.log('Editing category:', categoryId);
    // Implementation for editing category
  };

  const handleDeleteCategory = (categoryId: string) => {
    console.log('Deleting category:', categoryId);
    // Implementation for deleting category
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Product Categories</h2>
          <p className="text-gray-600">Organize your products and services into categories</p>
        </div>
        
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
                <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleCreateCategory}>Create Category</Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Category overview cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Tags className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <div className="text-2xl font-bold">{categories?.length || 0}</div>
                <div className="text-sm text-gray-600">Total Categories</div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <Package className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <div className="text-2xl font-bold">
                  {categories?.reduce((sum, cat) => sum + cat.product_count, 0) || 0}
                </div>
                <div className="text-sm text-gray-600">Total Products</div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <Tags className="h-5 w-5 text-yellow-600" />
              </div>
              <div>
                <div className="text-2xl font-bold">
                  {Math.round((categories?.reduce((sum, cat) => sum + cat.product_count, 0) || 0) / (categories?.length || 1))}
                </div>
                <div className="text-sm text-gray-600">Avg Products/Category</div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Package className="h-5 w-5 text-purple-600" />
              </div>
              <div>
                <div className="text-2xl font-bold">
                  {categories?.find(cat => cat.product_count === Math.max(...(categories?.map(c => c.product_count) || [0])))?.name || 'N/A'}
                </div>
                <div className="text-sm text-gray-600">Largest Category</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Categories table */}
      <Card>
        <CardHeader>
          <CardTitle>Categories</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="text-center py-8">Loading categories...</div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Category Name</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Products</TableHead>
                  <TableHead>Created</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {categories?.map((category) => (
                  <TableRow key={category.id}>
                    <TableCell className="font-medium">
                      <div className="flex items-center gap-2">
                        <Tags className="h-4 w-4 text-gray-400" />
                        {category.name}
                      </div>
                    </TableCell>
                    <TableCell className="text-gray-600">
                      {category.description}
                    </TableCell>
                    <TableCell>
                      <Badge variant="secondary">
                        {category.product_count} products
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {new Date(category.created_at).toLocaleDateString()}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => handleEditCategory(category.id)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => handleDeleteCategory(category.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
                
                {!categories?.length && (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-8 text-gray-500">
                      No categories found. Create your first category to organize your products.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ProductCategory;
