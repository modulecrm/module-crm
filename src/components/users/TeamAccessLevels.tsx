
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Shield, Crown, User, Users, Building, Settings, Eye, Edit, Trash2, Plus, UserCheck } from 'lucide-react';

// Define access levels for internal team members
const teamAccessLevels = [
  {
    id: 'owner',
    name: 'Owner',
    description: 'Complete access to all CRM functions and organization management',
    icon: Crown,
    color: 'bg-purple-100 text-purple-700 border-purple-200',
    permissions: [
      'Full CRM access',
      'Team management',
      'Billing & subscription',
      'All customer data',
      'System settings',
      'Report generation',
      'Module configuration',
      'Access level management',
      'Data export/import',
      'Integration settings'
    ],
    restrictions: [],
    userCount: 1
  },
  {
    id: 'head-trainer',
    name: 'Head Trainer',
    description: 'Advanced access to training programs, staff oversight, and customer management',
    icon: Shield,
    color: 'bg-blue-100 text-blue-700 border-blue-200',
    permissions: [
      'Full customer access',
      'Training program management',
      'Staff scheduling',
      'Performance tracking',
      'Booking management',
      'Customer communication',
      'Trainer supervision',
      'Class scheduling',
      'Equipment management'
    ],
    restrictions: [
      'No billing access',
      'No system settings',
      'Limited user management',
      'No subscription changes'
    ],
    userCount: 1
  },
  {
    id: 'gym-manager',
    name: 'Gym Manager',
    description: 'Operational access for day-to-day facility management and customer service',
    icon: Building,
    color: 'bg-green-100 text-green-700 border-green-200',
    permissions: [
      'Customer management',
      'Booking oversight',
      'Staff coordination',
      'Facility scheduling',
      'Membership management',
      'Basic reporting',
      'Inventory tracking',
      'Customer support'
    ],
    restrictions: [
      'No billing access',
      'No system settings',
      'Limited staff management',
      'No training program changes'
    ],
    userCount: 1
  },
  {
    id: 'trainer',
    name: 'Trainer',
    description: 'Access to assigned clients, training programs, and scheduling functions',
    icon: User,
    color: 'bg-orange-100 text-orange-700 border-orange-200',
    permissions: [
      'Assigned client access',
      'Personal training sessions',
      'Class scheduling',
      'Progress tracking',
      'Exercise programming',
      'Client communication',
      'Availability management'
    ],
    restrictions: [
      'Client-specific access only',
      'No billing access',
      'No system settings',
      'Limited customer data',
      'No staff management'
    ],
    userCount: 1
  },
  {
    id: 'receptionist',
    name: 'Receptionist',
    description: 'Front desk operations, basic customer service, and appointment scheduling',
    icon: UserCheck,
    color: 'bg-yellow-100 text-yellow-700 border-yellow-200',
    permissions: [
      'Basic customer info',
      'Appointment scheduling',
      'Check-ins/check-outs',
      'Payment processing',
      'Phone inquiries',
      'Membership updates',
      'Visitor management'
    ],
    restrictions: [
      'Limited customer data',
      'No training programs',
      'No staff management',
      'No system settings',
      'No detailed reporting'
    ],
    userCount: 1
  },
  {
    id: 'viewer',
    name: 'Viewer',
    description: 'Read-only access for monitoring and basic reporting',
    icon: Eye,
    color: 'bg-gray-100 text-gray-700 border-gray-200',
    permissions: [
      'View customer lists',
      'Basic reporting',
      'Schedule viewing',
      'Dashboard access',
      'Activity monitoring'
    ],
    restrictions: [
      'No data editing',
      'No customer management',
      'No system settings',
      'Read-only access',
      'Limited data visibility'
    ],
    userCount: 0
  }
];

const TeamAccessLevels = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Team Access Levels</h2>
          <p className="text-gray-600 mt-1">Define and manage access permissions for your internal team members</p>
        </div>
        <Button className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Create Custom Role
        </Button>
      </div>

      {/* Access Levels Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {teamAccessLevels.map((level) => {
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
            Team Role Hierarchy & Guidelines
          </CardTitle>
          <CardDescription>
            Understanding your organization's access structure and best practices
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-gray-900 mb-3">Organizational Structure</h4>
              <div className="space-y-2">
                <div className="flex items-center gap-3 p-2 bg-purple-50 rounded-lg">
                  <Crown className="h-4 w-4 text-purple-600" />
                  <span className="text-sm"><strong>Owner</strong> - Full system control</span>
                </div>
                <div className="flex items-center gap-3 p-2 bg-blue-50 rounded-lg">
                  <Shield className="h-4 w-4 text-blue-600" />
                  <span className="text-sm"><strong>Head Trainer</strong> - Training oversight</span>
                </div>
                <div className="flex items-center gap-3 p-2 bg-green-50 rounded-lg">
                  <Building className="h-4 w-4 text-green-600" />
                  <span className="text-sm"><strong>Gym Manager</strong> - Daily operations</span>
                </div>
                <div className="flex items-center gap-3 p-2 bg-orange-50 rounded-lg">
                  <User className="h-4 w-4 text-orange-600" />
                  <span className="text-sm"><strong>Trainer</strong> - Client-focused</span>
                </div>
                <div className="flex items-center gap-3 p-2 bg-yellow-50 rounded-lg">
                  <UserCheck className="h-4 w-4 text-yellow-600" />
                  <span className="text-sm"><strong>Receptionist</strong> - Front desk</span>
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold text-gray-900 mb-3">Access Management Tips</h4>
              <div className="space-y-2 text-sm text-gray-600">
                <div className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                  <span>Grant minimum necessary access for each role</span>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                  <span>Review permissions regularly as roles change</span>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                  <span>Create custom roles for specific needs</span>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                  <span>Deactivate access immediately when staff leave</span>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                  <span>Use viewer roles for temporary or limited access</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TeamAccessLevels;
