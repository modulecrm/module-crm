
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Shield, Crown, User, Users, Building, Settings, Eye, Edit, Plus, Info } from 'lucide-react';

// Define access levels that YOUR CUSTOMERS can assign to their employees
const customerAccessLevels = [
  {
    id: 'owner',
    name: 'Owner/Admin',
    description: 'Complete access to all CRM functions for business owners',
    icon: Crown,
    color: 'bg-red-100 text-red-700 border-red-200',
    permissions: [
      'Full CRM access',
      'Employee management',
      'All customer data access',
      'Billing & subscription management',
      'All module access',
      'Settings configuration',
      'Report generation',
      'Data export/import'
    ],
    restrictions: [],
    commonUse: 'Business owners, Company directors'
  },
  {
    id: 'head-office',
    name: 'Head Office Manager',
    description: 'Advanced access for head office staff - excludes billing information',
    icon: Building,
    color: 'bg-purple-100 text-purple-700 border-purple-200',
    permissions: [
      'Full CRM access',
      'Multi-location oversight',
      'Team management',
      'Customer management',
      'Deal oversight',
      'Advanced reporting',
      'Data export'
    ],
    restrictions: [
      'No billing access',
      'No payment information',
      'Cannot change subscription',
      'Limited settings access'
    ],
    commonUse: 'Head office managers, Regional directors'
  },
  {
    id: 'regional-manager',
    name: 'Regional Manager',
    description: 'Management access for specific regions or multiple locations',
    icon: Users,
    color: 'bg-blue-100 text-blue-700 border-blue-200',
    permissions: [
      'Regional CRM access',
      'Location team management',
      'Regional customer oversight',
      'Area performance reports',
      'Staff scheduling (if enabled)',
      'Regional booking management'
    ],
    restrictions: [
      'Regional data only',
      'No billing access',
      'Cannot add/remove employees',
      'Limited system settings',
      'No company-wide reports'
    ],
    commonUse: 'Regional managers, Area supervisors'
  },
  {
    id: 'location-manager',
    name: 'Location Manager',
    description: 'Management access for individual gym/center managers',
    icon: Building,
    color: 'bg-green-100 text-green-700 border-green-200',
    permissions: [
      'Location-specific CRM access',
      'Local customer management',
      'Staff coordination',
      'Local booking management',
      'Location reporting',
      'Customer communication'
    ],
    restrictions: [
      'Single location access only',
      'No billing information',
      'Cannot manage other locations',
      'Limited employee management',
      'No system configuration'
    ],
    commonUse: 'Gym managers, Studio managers, Facility supervisors'
  },
  {
    id: 'staff-member',
    name: 'Staff Member',
    description: 'Basic access for front-line employees and trainers',
    icon: User,
    color: 'bg-orange-100 text-orange-700 border-orange-200',
    permissions: [
      'Customer interaction',
      'Booking management',
      'Basic customer info access',
      'Task completion',
      'Communication logging',
      'Schedule viewing'
    ],
    restrictions: [
      'Limited customer data access',
      'No financial information',
      'Cannot delete records',
      'No management functions',
      'No reporting access',
      'View-only for most data'
    ],
    commonUse: 'Trainers, Front desk staff, Instructors'
  },
  {
    id: 'viewer',
    name: 'Viewer/Auditor',
    description: 'Read-only access for auditing and monitoring purposes',
    icon: Eye,
    color: 'bg-gray-100 text-gray-700 border-gray-200',
    permissions: [
      'Read-only CRM access',
      'Report viewing',
      'Dashboard monitoring',
      'Data export (limited)',
      'Audit trail viewing'
    ],
    restrictions: [
      'No data editing',
      'No customer interaction',
      'No system changes',
      'No billing access',
      'View-only permissions'
    ],
    commonUse: 'Auditors, Consultants, Part-time staff'
  }
];

const CustomerAccessLevels = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Customer Access Levels</h2>
          <p className="text-gray-600 mt-1">
            Access levels that your customers can assign to their employees within their CRM system
          </p>
        </div>
        <Button className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Create Custom Level
        </Button>
      </div>

      {/* Information Card */}
      <Card className="border-blue-200 bg-blue-50">
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <Info className="h-5 w-5 text-blue-600 mt-0.5" />
            <div>
              <h4 className="font-semibold text-blue-900 mb-1">How Customer Access Levels Work</h4>
              <p className="text-sm text-blue-800">
                These are the permission levels that <strong>your customers</strong> (like FitLife Training Center, PowerGym Chain) 
                can assign to <strong>their employees</strong>. For example, a gym owner can give their regional managers 
                different access than their front desk staff.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Access Levels Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {customerAccessLevels.map((level) => {
          const IconComponent = level.icon;
          return (
            <Card key={level.id} className="relative">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`p-3 rounded-lg ${level.color.replace('text-', 'bg-').replace('border-', '').split(' ')[0]}`}>
                      <IconComponent className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{level.name}</CardTitle>
                      <p className="text-xs text-gray-500 mt-1">{level.commonUse}</p>
                    </div>
                  </div>
                  <div className="flex gap-1">
                    <Button variant="ghost" size="sm">
                      <Edit className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <CardDescription>{level.description}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Permissions */}
                <div>
                  <h4 className="font-medium text-gray-900 mb-2 flex items-center gap-2">
                    <Settings className="h-4 w-4" />
                    Permissions
                  </h4>
                  <div className="space-y-1">
                    {level.permissions.slice(0, 4).map((permission, index) => (
                      <div key={index} className="flex items-center gap-2 text-sm">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span className="text-gray-600">{permission}</span>
                      </div>
                    ))}
                    {level.permissions.length > 4 && (
                      <div className="text-sm text-gray-500 mt-1">
                        +{level.permissions.length - 4} more permissions
                      </div>
                    )}
                  </div>
                </div>

                {/* Restrictions */}
                {level.restrictions.length > 0 && (
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2 flex items-center gap-2">
                      <Shield className="h-4 w-4" />
                      Restrictions
                    </h4>
                    <div className="space-y-1">
                      {level.restrictions.slice(0, 3).map((restriction, index) => (
                        <div key={index} className="flex items-center gap-2 text-sm">
                          <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                          <span className="text-gray-600">{restriction}</span>
                        </div>
                      ))}
                      {level.restrictions.length > 3 && (
                        <div className="text-sm text-gray-500 mt-1">
                          +{level.restrictions.length - 3} more restrictions
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Usage Examples */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Building className="h-5 w-5" />
            Real-World Usage Examples
          </CardTitle>
          <CardDescription>
            How different types of businesses typically structure their employee access
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h4 className="font-semibold text-gray-900">Training Center Chain</h4>
              <div className="space-y-2">
                <div className="flex items-center gap-3 p-2 bg-red-50 rounded-lg">
                  <Crown className="h-4 w-4 text-red-600" />
                  <span className="text-sm"><strong>Owner</strong> - Full system access</span>
                </div>
                <div className="flex items-center gap-3 p-2 bg-purple-50 rounded-lg">
                  <Building className="h-4 w-4 text-purple-600" />
                  <span className="text-sm"><strong>Head Office</strong> - All locations, no billing</span>
                </div>
                <div className="flex items-center gap-3 p-2 bg-blue-50 rounded-lg">
                  <Users className="h-4 w-4 text-blue-600" />
                  <span className="text-sm"><strong>Regional Manager</strong> - Multiple locations</span>
                </div>
                <div className="flex items-center gap-3 p-2 bg-green-50 rounded-lg">
                  <Building className="h-4 w-4 text-green-600" />
                  <span className="text-sm"><strong>Location Manager</strong> - Single gym</span>
                </div>
                <div className="flex items-center gap-3 p-2 bg-orange-50 rounded-lg">
                  <User className="h-4 w-4 text-orange-600" />
                  <span className="text-sm"><strong>Trainers</strong> - Customer interaction only</span>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <h4 className="font-semibold text-gray-900">Single Location Studio</h4>
              <div className="space-y-2">
                <div className="flex items-center gap-3 p-2 bg-red-50 rounded-lg">
                  <Crown className="h-4 w-4 text-red-600" />
                  <span className="text-sm"><strong>Studio Owner</strong> - Complete control</span>
                </div>
                <div className="flex items-center gap-3 p-2 bg-green-50 rounded-lg">
                  <Building className="h-4 w-4 text-green-600" />
                  <span className="text-sm"><strong>Studio Manager</strong> - Daily operations</span>
                </div>
                <div className="flex items-center gap-3 p-2 bg-orange-50 rounded-lg">
                  <User className="h-4 w-4 text-orange-600" />
                  <span className="text-sm"><strong>Instructors</strong> - Class & customer management</span>
                </div>
                <div className="flex items-center gap-3 p-2 bg-gray-50 rounded-lg">
                  <Eye className="h-4 w-4 text-gray-600" />
                  <span className="text-sm"><strong>Part-time Staff</strong> - View-only access</span>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-gray-200">
            <h4 className="font-semibold text-gray-900 mb-3">Implementation Tips</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2 text-sm text-gray-600">
                <div className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                  <span>Start with basic levels and customize as needed for each customer</span>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                  <span>Consider the customer's business structure and hierarchy</span>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                  <span>Regularly review access levels as businesses grow</span>
                </div>
              </div>
              <div className="space-y-2 text-sm text-gray-600">
                <div className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                  <span>Train customers on how to assign appropriate access levels</span>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                  <span>Provide templates for common business types</span>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                  <span>Monitor usage to suggest optimal access configurations</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CustomerAccessLevels;
