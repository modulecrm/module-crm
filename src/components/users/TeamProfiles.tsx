
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { User, Mail, Phone, Shield, Plus, Edit2, Eye, UserCheck, UserX } from 'lucide-react';

// Mock team members data for the current organization
const mockTeamMembers = [
  {
    id: '1',
    name: 'Sarah Johnson',
    email: 'sarah@fitnessstudio.com',
    phone: '+1 (555) 123-4567',
    role: 'Owner',
    accessLevel: 'Full Access',
    status: 'Active',
    lastLogin: '2024-01-20 14:30',
    joinDate: '2023-06-01',
    department: 'Management'
  },
  {
    id: '2',
    name: 'Mike Chen',
    email: 'mike@fitnessstudio.com',
    phone: '+1 (555) 234-5678',
    role: 'Head Trainer',
    accessLevel: 'Advanced Access',
    status: 'Active',
    lastLogin: '2024-01-20 09:15',
    joinDate: '2023-08-15',
    department: 'Training'
  },
  {
    id: '3',
    name: 'Emma Wilson',
    email: 'emma@fitnessstudio.com',
    phone: '+1 (555) 345-6789',
    role: 'Gym Manager',
    accessLevel: 'Manager Access',
    status: 'Active',
    lastLogin: '2024-01-19 16:45',
    joinDate: '2023-09-20',
    department: 'Operations'
  },
  {
    id: '4',
    name: 'David Brown',
    email: 'david@fitnessstudio.com',
    phone: '+1 (555) 456-7890',
    role: 'Trainer',
    accessLevel: 'Basic Access',
    status: 'Active',
    lastLogin: '2024-01-18 11:20',
    joinDate: '2023-11-10',
    department: 'Training'
  },
  {
    id: '5',
    name: 'Lisa Davis',
    email: 'lisa@fitnessstudio.com',
    phone: '+1 (555) 567-8901',
    role: 'Receptionist',
    accessLevel: 'Limited Access',
    status: 'Inactive',
    lastLogin: '2024-01-10 13:45',
    joinDate: '2023-12-01',
    department: 'Front Desk'
  }
];

const TeamProfiles = () => {
  const [teamMembers] = useState(mockTeamMembers);

  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case 'Owner':
        return 'bg-purple-100 text-purple-700';
      case 'Head Trainer':
        return 'bg-blue-100 text-blue-700';
      case 'Gym Manager':
        return 'bg-green-100 text-green-700';
      case 'Trainer':
        return 'bg-orange-100 text-orange-700';
      case 'Receptionist':
        return 'bg-gray-100 text-gray-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusBadgeColor = (status: string) => {
    return status === 'Active' 
      ? 'bg-green-100 text-green-700' 
      : 'bg-red-100 text-red-700';
  };

  const getAccessLevelBadgeColor = (accessLevel: string) => {
    switch (accessLevel) {
      case 'Full Access':
        return 'bg-red-100 text-red-700';
      case 'Advanced Access':
        return 'bg-blue-100 text-blue-700';
      case 'Manager Access':
        return 'bg-green-100 text-green-700';
      case 'Basic Access':
        return 'bg-yellow-100 text-yellow-700';
      case 'Limited Access':
        return 'bg-gray-100 text-gray-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const activeMembers = teamMembers.filter(member => member.status === 'Active').length;
  const totalMembers = teamMembers.length;

  return (
    <div className="space-y-6">
      {/* Header with Add Team Member Button */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Team Members</h2>
          <p className="text-gray-600 mt-1">Manage your organization's internal team and their CRM access</p>
        </div>
        <Button className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Add Team Member
        </Button>
      </div>

      {/* Team Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <User className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Total Team Members</p>
                <p className="text-2xl font-bold text-gray-900">{totalMembers}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <UserCheck className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Active Members</p>
                <p className="text-2xl font-bold text-gray-900">{activeMembers}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-red-100 rounded-lg">
                <UserX className="h-5 w-5 text-red-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Inactive Members</p>
                <p className="text-2xl font-bold text-gray-900">{totalMembers - activeMembers}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Shield className="h-5 w-5 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Departments</p>
                <p className="text-2xl font-bold text-gray-900">
                  {new Set(teamMembers.map(member => member.department)).size}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Team Members Table */}
      <Card>
        <CardHeader>
          <CardTitle>All Team Members</CardTitle>
          <CardDescription>Complete list of your organization's team members and their CRM access levels</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Team Member</TableHead>
                <TableHead>Contact Information</TableHead>
                <TableHead>Role & Department</TableHead>
                <TableHead>Access Level</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Last Login</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {teamMembers.map((member) => (
                <TableRow key={member.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                        <User className="h-5 w-5 text-gray-600" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{member.name}</p>
                        <p className="text-sm text-gray-600">Joined {member.joinDate}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-sm">
                        <Mail className="h-3 w-3 text-gray-400" />
                        <span>{member.email}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Phone className="h-3 w-3 text-gray-400" />
                        <span>{member.phone}</span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <Badge className={getRoleBadgeColor(member.role)}>
                        {member.role}
                      </Badge>
                      <p className="text-sm text-gray-600">{member.department}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={getAccessLevelBadgeColor(member.accessLevel)}>
                      {member.accessLevel}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge className={getStatusBadgeColor(member.status)}>
                      {member.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <span className="text-sm text-gray-600">{member.lastLogin}</span>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex gap-1 justify-end">
                      <Button variant="outline" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Edit2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default TeamProfiles;
