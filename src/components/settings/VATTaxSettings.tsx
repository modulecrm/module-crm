
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Plus, Edit, Trash2, Calculator } from 'lucide-react';

const VATTaxSettings = () => {
  const [vatRates, setVatRates] = useState([
    { id: '1', name: 'Standard VAT', rate: 20, isDefault: true, description: 'Standard rate for most goods and services' },
    { id: '2', name: 'Reduced VAT', rate: 5, isDefault: false, description: 'Reduced rate for specific items' },
    { id: '3', name: 'Zero VAT', rate: 0, isDefault: false, description: 'Zero rate for exempt items' },
  ]);

  const [taxCategories, setTaxCategories] = useState([
    { id: '1', name: 'Sales Tax', rate: 8.5, description: 'General sales tax' },
    { id: '2', name: 'Service Tax', rate: 12, description: 'Tax on services' },
    { id: '3', name: 'Import Duty', rate: 15, description: 'Tax on imported goods' },
  ]);

  const [newVatRate, setNewVatRate] = useState({ name: '', rate: '', description: '' });
  const [newTaxCategory, setNewTaxCategory] = useState({ name: '', rate: '', description: '' });

  const addVatRate = () => {
    if (newVatRate.name && newVatRate.rate) {
      const newRate = {
        id: Date.now().toString(),
        name: newVatRate.name,
        rate: parseFloat(newVatRate.rate),
        isDefault: false,
        description: newVatRate.description
      };
      setVatRates([...vatRates, newRate]);
      setNewVatRate({ name: '', rate: '', description: '' });
    }
  };

  const addTaxCategory = () => {
    if (newTaxCategory.name && newTaxCategory.rate) {
      const newCategory = {
        id: Date.now().toString(),
        name: newTaxCategory.name,
        rate: parseFloat(newTaxCategory.rate),
        description: newTaxCategory.description
      };
      setTaxCategories([...taxCategories, newCategory]);
      setNewTaxCategory({ name: '', rate: '', description: '' });
    }
  };

  const removeVatRate = (id: string) => {
    setVatRates(vatRates.filter(rate => rate.id !== id));
  };

  const removeTaxCategory = (id: string) => {
    setTaxCategories(taxCategories.filter(category => category.id !== id));
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">VAT & Tax Settings</h2>
          <p className="text-gray-600">Configure VAT rates and tax categories for your products</p>
        </div>
      </div>

      {/* VAT Rates Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calculator className="h-5 w-5" />
            VAT Rates
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {vatRates.map((rate) => (
              <div key={rate.id} className="border rounded-lg p-4 space-y-2">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold">{rate.name}</h3>
                    <p className="text-2xl font-bold text-blue-600">{rate.rate}%</p>
                  </div>
                  <div className="flex gap-1">
                    {rate.isDefault && (
                      <Badge className="bg-green-100 text-green-700">Default</Badge>
                    )}
                    <Button variant="ghost" size="sm" onClick={() => removeVatRate(rate.id)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <p className="text-sm text-gray-600">{rate.description}</p>
              </div>
            ))}
          </div>

          {/* Add New VAT Rate */}
          <div className="border-t pt-4">
            <h4 className="font-semibold mb-3">Add New VAT Rate</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div>
                <Label htmlFor="vat-name">Name</Label>
                <Input
                  id="vat-name"
                  placeholder="e.g., Standard VAT"
                  value={newVatRate.name}
                  onChange={(e) => setNewVatRate({ ...newVatRate, name: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="vat-rate">Rate (%)</Label>
                <Input
                  id="vat-rate"
                  type="number"
                  placeholder="20"
                  value={newVatRate.rate}
                  onChange={(e) => setNewVatRate({ ...newVatRate, rate: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="vat-description">Description</Label>
                <Input
                  id="vat-description"
                  placeholder="Description"
                  value={newVatRate.description}
                  onChange={(e) => setNewVatRate({ ...newVatRate, description: e.target.value })}
                />
              </div>
            </div>
            <Button onClick={addVatRate} className="mt-3">
              <Plus className="h-4 w-4 mr-2" />
              Add VAT Rate
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Tax Categories Section */}
      <Card>
        <CardHeader>
          <CardTitle>Tax Categories</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {taxCategories.map((category) => (
              <div key={category.id} className="border rounded-lg p-4 space-y-2">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold">{category.name}</h3>
                    <p className="text-2xl font-bold text-orange-600">{category.rate}%</p>
                  </div>
                  <Button variant="ghost" size="sm" onClick={() => removeTaxCategory(category.id)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
                <p className="text-sm text-gray-600">{category.description}</p>
              </div>
            ))}
          </div>

          {/* Add New Tax Category */}
          <div className="border-t pt-4">
            <h4 className="font-semibold mb-3">Add New Tax Category</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div>
                <Label htmlFor="tax-name">Name</Label>
                <Input
                  id="tax-name"
                  placeholder="e.g., Sales Tax"
                  value={newTaxCategory.name}
                  onChange={(e) => setNewTaxCategory({ ...newTaxCategory, name: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="tax-rate">Rate (%)</Label>
                <Input
                  id="tax-rate"
                  type="number"
                  placeholder="8.5"
                  value={newTaxCategory.rate}
                  onChange={(e) => setNewTaxCategory({ ...newTaxCategory, rate: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="tax-description">Description</Label>
                <Input
                  id="tax-description"
                  placeholder="Description"
                  value={newTaxCategory.description}
                  onChange={(e) => setNewTaxCategory({ ...newTaxCategory, description: e.target.value })}
                />
              </div>
            </div>
            <Button onClick={addTaxCategory} className="mt-3">
              <Plus className="h-4 w-4 mr-2" />
              Add Tax Category
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Regional Settings */}
      <Card>
        <CardHeader>
          <CardTitle>Regional Tax Settings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="tax-region">Tax Region</Label>
              <Input id="tax-region" placeholder="e.g., United Kingdom" />
            </div>
            <div>
              <Label htmlFor="tax-number">Tax Registration Number</Label>
              <Input id="tax-number" placeholder="e.g., GB123456789" />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="currency">Default Currency</Label>
              <Input id="currency" placeholder="GBP" />
            </div>
            <div>
              <Label htmlFor="tax-year">Tax Year</Label>
              <Input id="tax-year" placeholder="2024" />
            </div>
          </div>
          <Button>Save Regional Settings</Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default VATTaxSettings;
