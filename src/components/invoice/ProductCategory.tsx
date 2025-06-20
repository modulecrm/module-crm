
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import CategoryOverviewCards from './product-category/CategoryOverviewCards';
import CreateCategoryDialog from './product-category/CreateCategoryDialog';
import CategoriesTable from './product-category/CategoriesTable';
import { vatRates, taxCategories, mockCategories } from './product-category/mockData';

const ProductCategory = () => {
  const { data: categories, isLoading } = useQuery({
    queryKey: ['product_categories'],
    queryFn: async () => {
      return mockCategories;
    }
  });

  const handleCreateCategory = (categoryData: {
    name: string;
    description: string;
    vatRate: string;
    taxCategory: string;
  }) => {
    console.log('Creating category:', categoryData);
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
        
        <CreateCategoryDialog
          vatRates={vatRates}
          taxCategories={taxCategories}
          onCreateCategory={handleCreateCategory}
        />
      </div>

      <CategoryOverviewCards categories={categories} />

      <CategoriesTable
        categories={categories}
        isLoading={isLoading}
        onEditCategory={handleEditCategory}
        onDeleteCategory={handleDeleteCategory}
      />
    </div>
  );
};

export default ProductCategory;
