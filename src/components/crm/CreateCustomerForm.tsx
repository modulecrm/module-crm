
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { useForm } from 'react-hook-form';
import { supabase } from '@/integrations/supabase/client';
import { X, Upload } from 'lucide-react';

interface CreateCustomerFormProps {
  onClose: () => void;
  onSuccess: () => void;
}

interface CustomerFormData {
  // General Information
  name: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  customer_type: 'business' | 'private';
  language: string;
  currency: string;
  
  // Address & Location
  billing_address: string;
  delivery_address: string;
  country: string;
  region: string;
  city: string;
  postal_code: string;
  
  // Company Information (B2B)
  company_registration: string;
  business_form: string;
  industry: string;
  employees_count: number;
  revenue: number;
  website: string;
  
  // Payment & Invoicing
  billing_method: string;
  payment_terms: string;
  vat_number: string;
  preferred_payment_gateway: string;
  
  // CRM Categorizations
  status: string;
  source: string;
  tags: string[];
  segment: string;
}

const CreateCustomerForm = ({ onClose, onSuccess }: CreateCustomerFormProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  
  const form = useForm<CustomerFormData>({
    defaultValues: {
      customer_type: 'business',
      language: 'en',
      currency: 'USD',
      status: 'potential',
      payment_terms: 'Net 30',
      billing_method: 'email',
      tags: []
    }
  });

  const availableTags = ['VIP', 'High Priority', 'Subscriber', 'Enterprise', 'SMB', 'Startup', 'Lead', 'Prospect'];

  const handleTagChange = (tag: string, checked: boolean) => {
    if (checked) {
      setSelectedTags(prev => [...prev, tag]);
    } else {
      setSelectedTags(prev => prev.filter(t => t !== tag));
    }
  };

  const onSubmit = async (data: CustomerFormData) => {
    setIsSubmitting(true);
    try {
      const customerData = {
        name: data.customer_type === 'business' ? data.name : `${data.first_name} ${data.last_name}`,
        email: data.email,
        phone: data.phone,
        company: data.customer_type === 'business' ? data.name : '',
        status: data.status,
        industry: data.industry,
        tags: selectedTags,
        lead_score: Math.floor(Math.random() * 100), // Initial random score
        custom_fields: {
          customer_type: data.customer_type,
          language: data.language,
          currency: data.currency,
          company_registration: data.company_registration,
          business_form: data.business_form,
          employees_count: data.employees_count,
          revenue: data.revenue,
          website: data.website,
          billing_method: data.billing_method,
          payment_terms: data.payment_terms,
          vat_number: data.vat_number,
          preferred_payment_gateway: data.preferred_payment_gateway,
          source: data.source,
          segment: data.segment
        },
        address: {
          billing: data.billing_address,
          delivery: data.delivery_address,
          country: data.country,
          region: data.region,
          city: data.city,
          postal_code: data.postal_code
        }
      };

      const { error } = await supabase
        .from('customers')
        .insert([customerData]);

      if (error) throw error;
      
      onSuccess();
      onClose();
    } catch (error) {
      console.error('Error creating customer:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-2xl font-bold">Create New Customer</h2>
          <Button variant="ghost" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="p-6 space-y-8">
            {/* General Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900">🧑‍💼 General Information</h3>
              
              <FormField
                control={form.control}
                name="customer_type"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormLabel>Customer Type 🌟</FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="flex flex-row space-x-6"
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="business" id="business" />
                          <Label htmlFor="business">B2B (Business)</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="private" id="private" />
                          <Label htmlFor="private">B2C (Private)</Label>
                        </div>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {form.watch('customer_type') === 'business' ? (
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Company Name 🌟</FormLabel>
                        <FormControl>
                          <Input placeholder="Acme Corporation" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                ) : (
                  <>
                    <FormField
                      control={form.control}
                      name="first_name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>First Name 🌟</FormLabel>
                          <FormControl>
                            <Input placeholder="John" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="last_name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Last Name 🌟</FormLabel>
                          <FormControl>
                            <Input placeholder="Doe" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </>
                )}

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email 🌟</FormLabel>
                      <FormControl>
                        <Input type="email" placeholder="john@example.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone Number 🌟</FormLabel>
                      <FormControl>
                        <Input placeholder="+1 (555) 123-4567" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="language"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Language 🌟</FormLabel>
                      <FormControl>
                        <select {...field} className="w-full px-3 py-2 border border-gray-300 rounded-md">
                          <option value="en">English</option>
                          <option value="da">Danish</option>
                          <option value="de">German</option>
                          <option value="es">Spanish</option>
                          <option value="fr">French</option>
                        </select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="currency"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Currency 🌟</FormLabel>
                      <FormControl>
                        <select {...field} className="w-full px-3 py-2 border border-gray-300 rounded-md">
                          <option value="USD">USD</option>
                          <option value="EUR">EUR</option>
                          <option value="DKK">DKK</option>
                          <option value="GBP">GBP</option>
                        </select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            {/* Address & Location */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900">🏢 Address & Location</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="billing_address"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Billing Address 🌟</FormLabel>
                      <FormControl>
                        <Input placeholder="123 Main St, Suite 100" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="delivery_address"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Delivery Address</FormLabel>
                      <FormControl>
                        <Input placeholder="Same as billing or different" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="country"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Country 🌟</FormLabel>
                      <FormControl>
                        <select {...field} className="w-full px-3 py-2 border border-gray-300 rounded-md">
                          <option value="">Select Country</option>
                          <option value="US">United States</option>
                          <option value="DK">Denmark</option>
                          <option value="DE">Germany</option>
                          <option value="GB">United Kingdom</option>
                          <option value="FR">France</option>
                        </select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="city"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>City</FormLabel>
                      <FormControl>
                        <Input placeholder="Copenhagen" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="postal_code"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Postal Code</FormLabel>
                      <FormControl>
                        <Input placeholder="1234" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="region"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Region/State</FormLabel>
                      <FormControl>
                        <Input placeholder="California" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            {/* Company Information (B2B only) */}
            {form.watch('customer_type') === 'business' && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900">📦 Company Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="company_registration"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Company Registration 🌟</FormLabel>
                        <FormControl>
                          <Input placeholder="CVR: 12345678" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="business_form"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Business Form 🌟</FormLabel>
                        <FormControl>
                          <select {...field} className="w-full px-3 py-2 border border-gray-300 rounded-md">
                            <option value="">Select Business Form</option>
                            <option value="ApS">ApS</option>
                            <option value="A/S">A/S</option>
                            <option value="LLC">LLC</option>
                            <option value="Corp">Corporation</option>
                            <option value="Sole">Sole Proprietorship</option>
                          </select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="industry"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Industry</FormLabel>
                        <FormControl>
                          <Input placeholder="Software Development" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="employees_count"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Number of Employees 🌟</FormLabel>
                        <FormControl>
                          <Input type="number" placeholder="50" {...field} onChange={e => field.onChange(parseInt(e.target.value) || 0)} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="revenue"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Annual Revenue 🌟</FormLabel>
                        <FormControl>
                          <Input type="number" placeholder="1000000" {...field} onChange={e => field.onChange(parseInt(e.target.value) || 0)} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="website"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Website 💰</FormLabel>
                        <FormControl>
                          <Input placeholder="https://example.com" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            )}

            {/* Payment & Invoicing */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900">💰 Payment & Invoicing</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="billing_method"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Billing Method 🌟</FormLabel>
                      <FormControl>
                        <select {...field} className="w-full px-3 py-2 border border-gray-300 rounded-md">
                          <option value="email">Email</option>
                          <option value="ean">EAN</option>
                          <option value="e-invoice">E-Invoice</option>
                          <option value="manual">Manual</option>
                        </select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="payment_terms"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Payment Terms 🌟</FormLabel>
                      <FormControl>
                        <select {...field} className="w-full px-3 py-2 border border-gray-300 rounded-md">
                          <option value="Net 14">Net 14 days</option>
                          <option value="Net 30">Net 30 days</option>
                          <option value="Net 60">Net 60 days</option>
                          <option value="Due on receipt">Due on receipt</option>
                        </select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="vat_number"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>VAT Number 🌟</FormLabel>
                      <FormControl>
                        <Input placeholder="DK12345678" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="preferred_payment_gateway"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Preferred Payment Gateway 🌟</FormLabel>
                      <FormControl>
                        <select {...field} className="w-full px-3 py-2 border border-gray-300 rounded-md">
                          <option value="">Select Gateway</option>
                          <option value="stripe">Stripe</option>
                          <option value="mobilepay">MobilePay</option>
                          <option value="paypal">PayPal</option>
                          <option value="bank_transfer">Bank Transfer</option>
                        </select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            {/* CRM Categorizations */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900">📁 CRM Categorizations</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="status"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Customer Status 🌟</FormLabel>
                      <FormControl>
                        <select {...field} className="w-full px-3 py-2 border border-gray-300 rounded-md">
                          <option value="potential">Potential</option>
                          <option value="active">Active</option>
                          <option value="inactive">Inactive</option>
                          <option value="churned">Churned</option>
                        </select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="source"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Source 🌟</FormLabel>
                      <FormControl>
                        <select {...field} className="w-full px-3 py-2 border border-gray-300 rounded-md">
                          <option value="">Select Source</option>
                          <option value="facebook">Facebook</option>
                          <option value="google_ads">Google Ads</option>
                          <option value="referral">Referral</option>
                          <option value="website">Website</option>
                          <option value="cold_outreach">Cold Outreach</option>
                          <option value="trade_show">Trade Show</option>
                        </select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="segment"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Segment/Group</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g. Coworking → Office space" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Tags */}
              <div className="space-y-2">
                <Label>Tags/Labels</Label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                  {availableTags.map(tag => (
                    <div key={tag} className="flex items-center space-x-2">
                      <Checkbox
                        id={tag}
                        checked={selectedTags.includes(tag)}
                        onCheckedChange={(checked) => handleTagChange(tag, checked as boolean)}
                      />
                      <Label htmlFor={tag} className="text-sm">{tag}</Label>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Submit Buttons */}
            <div className="flex justify-end space-x-4 pt-6 border-t">
              <Button type="button" variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Creating...' : 'Create Customer'}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default CreateCustomerForm;
