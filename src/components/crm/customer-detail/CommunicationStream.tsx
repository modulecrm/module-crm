
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Search, Filter, Mail, MessageSquare, Phone, FileText, Bot, Paperclip } from 'lucide-react';

interface CommunicationStreamProps {
  customerId: string;
}

interface CommunicationItem {
  id: string;
  type: 'email' | 'note' | 'support' | 'ai' | 'document' | 'call';
  title: string;
  content: string;
  date: string;
  author: string;
  tags: string[];
  attachments?: string[];
}

const CommunicationStream: React.FC<CommunicationStreamProps> = ({ customerId }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<string>('all');

  // Mock communication data
  const communications: CommunicationItem[] = [
    {
      id: '1',
      type: 'email',
      title: 'Invoice Payment Reminder',
      content: 'Sent payment reminder for invoice INV-2024-001',
      date: '2024-01-15 14:30',
      author: 'System',
      tags: ['Payment', 'Reminder']
    },
    {
      id: '2',
      type: 'note',
      title: 'Client Meeting Notes',
      content: 'Discussed upgrade options and implementation timeline',
      date: '2024-01-14 10:00',
      author: 'John Manager',
      tags: ['Meeting', 'Upgrade']
    },
    {
      id: '3',
      type: 'support',
      title: 'Technical Support Request',
      content: 'Customer reported login issues with their account',
      date: '2024-01-13 16:45',
      author: 'Support Team',
      tags: ['Technical', 'Urgent']
    },
    {
      id: '4',
      type: 'ai',
      title: 'AI Recommendation',
      content: 'Customer is eligible for premium upgrade based on usage patterns',
      date: '2024-01-12 09:00',
      author: 'AI Assistant',
      tags: ['Recommendation', 'Upgrade']
    }
  ];

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'email': return <Mail className="h-4 w-4" />;
      case 'note': return <MessageSquare className="h-4 w-4" />;
      case 'support': return <MessageSquare className="h-4 w-4" />;
      case 'ai': return <Bot className="h-4 w-4" />;
      case 'document': return <FileText className="h-4 w-4" />;
      case 'call': return <Phone className="h-4 w-4" />;
      default: return <MessageSquare className="h-4 w-4" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'email': return 'bg-blue-100 text-blue-800';
      case 'note': return 'bg-gray-100 text-gray-800';
      case 'support': return 'bg-red-100 text-red-800';
      case 'ai': return 'bg-purple-100 text-purple-800';
      case 'document': return 'bg-green-100 text-green-800';
      case 'call': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredCommunications = communications.filter(comm => {
    const matchesSearch = comm.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         comm.content.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterType === 'all' || comm.type === filterType;
    return matchesSearch && matchesFilter;
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Communication Stream</CardTitle>
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search communications..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Types</option>
            <option value="email">Emails</option>
            <option value="note">Notes</option>
            <option value="support">Support</option>
            <option value="ai">AI</option>
            <option value="document">Documents</option>
            <option value="call">Calls</option>
          </select>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {filteredCommunications.map((item) => (
            <div key={item.id} className="border rounded-lg p-4 hover:bg-gray-50">
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-full ${getTypeColor(item.type)}`}>
                    {getTypeIcon(item.type)}
                  </div>
                  <div>
                    <h4 className="font-semibold">{item.title}</h4>
                    <p className="text-sm text-gray-600">{item.content}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-xs text-gray-500">{item.date}</p>
                  <p className="text-xs text-gray-500">{item.author}</p>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex flex-wrap gap-1">
                  {item.tags.map((tag, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
                <Button variant="ghost" size="sm">
                  Add Comment
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default CommunicationStream;
