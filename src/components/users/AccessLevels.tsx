
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Shield, Crown, User, Users, Building, Settings, Eye, Edit, Trash2, Plus } from 'lucide-react';

// Define access levels for different organizational roles
const accessLevels = [
  {
    id: 'admin',
    name: 'Admin',
    description: 'Full system access with complete administrative privileges',
    icon: Crown,
    color: 'bg-red-100 text-red-700 border-red-200',
    permissions: [
      'Full CRM access',
      'User management',
      'System settings',
      'Payment & billing access',
      'Invoice management',
      'Module configuration',
      'Security settings',
      'Audit logs',
      'Data export/import',
      'System integrations'
    ],
    restrictions: [],
    userCount: 1
  },
  {
    id: 'super-user',
    name: 'Super User',
    description: 'Advanced access to all modules except payment and billing information',
    icon: Shield,
    color: 'bg-purple-100 text-purple-700 border-purple-200',
    permissions: [
      'Full CRM access',
      'User profile viewing',
      'Invoice viewing (no editing)',
      'All module access',
      'Customer management',
      'Deal management',
      'Task management',
      'Report generation',
      'Data export'
    ],
    restrictions: [
      'No payment method access',
      'No billing settings',
      'No user role changes',
      'Limited system settings'
    ],
    userCount: 1
  },
  {
    id: 'sales-manager',
    name: 'Sales Manager',
    description: 'Department-level access with team management capabilities',
    icon: Users,
    color: 'bg-blue-100 text-blue-700 border-blue-200',
    permissions: [
      'Team CRM access',
      'Department user management',
      'Sales reporting',
      'Deal oversight',
      'Task assignment',
      'Customer management',
      'Pipeline management',
      'Team performance metrics'
    ],
    restrictions: [
      'No system settings',
      'No payment access',
      'Department-only user access',
      'Limited invoice viewing'
    ],
    userCount: 1
  },
  {
    id: 'sales-rep',
    name: 'Sales Representative',
    description: 'Basic CRM access for individual sales activities',
    icon: User,
    color: 'bg-green-100 text-green-700 border-green-200',
    permissions: [
      'Personal CRM access',
      'Customer interaction',
      'Deal management',
      'Task management',
      'Basic reporting',
      'Activity logging'
    ],
    restrictions: [
      'No user management',
      'No system settings',
      'No payment access',
      'No team oversight',
      'Limited customer access'
    ],
    userCount: 1
  },
  {
    id: 'account-manager',
    name: 'Account Manager',
    description: 'Customer-focused access with relationship management capabilities',
    icon: Building,
    color: 'bg-orange-100 text-orange-700 border-orange-200',
    permissions: [
      'Customer portfolio access',
      'Account management',
      'Communication tracking',
      'Deal collaboration',
      'Customer support',
      'Contract management',
      'Renewal management'
    ],
    restrictions: [
      'No new customer creation',
      'No system settings',
      'No payment access',
      'Limited user access',
      'Portfolio-specific access only'
    ],
    userCount: 0
  },
  {
    id: 'viewer',
    name: 'Viewer',
    description: 'Read-only access for monitoring and reporting purposes',
    icon: Eye,
    color: 'bg-gray-100 text-gray-700 border-gray-200',
    permissions: [
      'Read-only CRM access',
      'Report viewing',
      'Dashboard access',
      'Basic analytics',
      'Data export (limited)'
    ],
    restrictions: [
      'No data editing',
      'No user management',
      'No system settings',
      'No payment access',
      'View-only permissions'
    ],
    userCount: 0
  }
];

const AccessLevels = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Access Levels</h2>
          <p className="text-gray-600 mt-1">Define and manage user roles and permissions for your organization</p>
        </div>
        <Button className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Create Custom Role
        </Button>
      </div>

      {/* Access Levels Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {accessLevels.map((level) => {
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
                      <div className="flex items-center gap-2 mt-1">
                        <Badge variant="outline" className="text-xs">
                          {level.userCount} user{level.userCount !== 1 ? 's' : ''}
                        </Badge>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-1">
                    <Button variant="ghost" size="sm">
                      <Edit className="h-4 w-4" />
                    </Button>
                    {level.userCount === 0 && (
                      <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    )}
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

      {/* Role Hierarchy Explanation */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Role Hierarchy & Best Practices
          </CardTitle>
          <CardDescription>
            Understanding access levels and organizational structure
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-gray-900 mb-3">Organizational Hierarchy</h4>
              <div className="space-y-2">
                <div className="flex items-center gap-3 p-2 bg-red-50 rounded-lg">
                  <Crown className="h-4 w-4 text-red-600" />
                  <span className="text-sm"><strong>Admin</strong> - Complete system control</span>
                </div>
                <div className="flex items-center gap-3 p-2 bg-purple-50 rounded-lg">
                  <Shield className="h-4 w-4 text-purple-600" />
                  <span className="text-sm"><strong>Super User</strong> - Advanced operational access</span>
                </div>
                <div className="flex items-center gap-3 p-2 bg-blue-50 rounded-lg">
                  <Users className="h-4 w-4 text-blue-600" />
                  <span className="text-sm"><strong>Sales Manager</strong> - Team leadership</span>
                </div>
                <div className="flex items-center gap-3 p-2 bg-green-50 rounded-lg">
                  <User className="h-4 w-4 text-green-600" />
                  <span className="text-sm"><strong>Sales Rep</strong> - Individual contributor</span>
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold text-gray-900 mb-3">Security Best Practices</h4>
              <div className="space-y-2 text-sm text-gray-600">
                <div className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                  <span>Assign the minimum required access level for each user's role</span>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                  <span>Regularly review and audit user permissions</span>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                  <span>Use custom roles for specific organizational needs</span>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                  <span>Deactivate users immediately when they leave the organization</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AccessLevels;
