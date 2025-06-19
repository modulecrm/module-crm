
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { FileText, Download, Upload, Eye, Lock } from 'lucide-react';

interface DocumentsContractsProps {
  customerId: string;
}

interface Document {
  id: string;
  name: string;
  type: 'invoice' | 'contract' | 'other';
  size: string;
  uploadDate: string;
  status: 'signed' | 'pending' | 'draft';
  accessLevel: 'all' | 'finance' | 'admin';
}

const DocumentsContracts: React.FC<DocumentsContractsProps> = ({ customerId }) => {
  const [documents] = useState<Document[]>([
    {
      id: '1',
      name: 'Service Agreement 2024',
      type: 'contract',
      size: '2.4 MB',
      uploadDate: '2024-01-15',
      status: 'signed',
      accessLevel: 'admin'
    },
    {
      id: '2',
      name: 'Invoice INV-2024-001',
      type: 'invoice',
      size: '156 KB',
      uploadDate: '2024-01-10',
      status: 'signed',
      accessLevel: 'finance'
    },
    {
      id: '3',
      name: 'NDA Document',
      type: 'other',
      size: '890 KB',
      uploadDate: '2024-01-05',
      status: 'pending',
      accessLevel: 'all'
    }
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'signed': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'draft': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getAccessLevelColor = (level: string) => {
    switch (level) {
      case 'admin': return 'bg-red-100 text-red-800';
      case 'finance': return 'bg-blue-100 text-blue-800';
      case 'all': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          Documents & Contracts
          <Button className="flex items-center gap-2">
            <Upload className="h-4 w-4" />
            Add Document
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {documents.map((doc) => (
            <div key={doc.id} className="border rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-3">
                  <FileText className="h-6 w-6 text-gray-400" />
                  <div>
                    <h4 className="font-semibold">{doc.name}</h4>
                    <p className="text-sm text-gray-600">{doc.size} • {doc.uploadDate}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="sm">
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Badge className={getStatusColor(doc.status)}>
                    {doc.status}
                  </Badge>
                  <Badge className={getAccessLevelColor(doc.accessLevel)} variant="outline">
                    <Lock className="h-3 w-3 mr-1" />
                    {doc.accessLevel}
                  </Badge>
                </div>
                <Badge variant="outline" className="text-xs">
                  {doc.type}
                </Badge>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default DocumentsContracts;
