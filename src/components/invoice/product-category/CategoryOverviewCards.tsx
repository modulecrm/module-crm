
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Tags, Package } from 'lucide-react';

interface Category {
  id: string;
  name: string;
  description: string;
  product_count: number;
  created_at: string;
}

interface CategoryOverviewCardsProps {
  categories: Category[] | undefined;
}

const CategoryOverviewCards = ({ categories }: CategoryOverviewCardsProps) => {
  const totalCategories = categories?.length || 0;
  const totalProducts = categories?.reduce((sum, cat) => sum + cat.product_count, 0) || 0;
  const avgProductsPerCategory = Math.round(totalProducts / (totalCategories || 1));
  const largestCategory = categories?.find(cat => 
    cat.product_count === Math.max(...(categories?.map(c => c.product_count) || [0]))
  )?.name || 'N/A';

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Tags className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <div className="text-2xl font-bold">{totalCategories}</div>
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
              <div className="text-2xl font-bold">{totalProducts}</div>
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
              <div className="text-2xl font-bold">{avgProductsPerCategory}</div>
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
              <div className="text-2xl font-bold">{largestCategory}</div>
              <div className="text-sm text-gray-600">Largest Category</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CategoryOverviewCards;
