
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Shield, CheckCircle, XCircle, AlertCircle, FileText, Upload } from 'lucide-react';

interface GDPRComplianceProps {
  customerId: string;
}

interface ConsentItem {
  type: string;
  granted: boolean;
  date: string;
  status: 'active' | 'withdrawn' | 'pending';
}

interface KYCDocument {
  id: string;
  type: string;
  status: 'verified' | 'pending' | 'rejected';
  uploadDate: string;
}

const GDPRCompliance: React.FC<GDPRComplianceProps> = ({ customerId }) => {
  const [consents] = useState<ConsentItem[]>([
    { type: 'Newsletter', granted: true, date: '2024-01-01', status: 'active' },
    { type: 'Email Marketing', granted: true, date: '2024-01-01', status: 'active' },
    { type: 'Data Processing', granted: true, date: '2024-01-01', status: 'active' },
    { type: 'Analytics Tracking', granted: false, date: '2024-01-01', status: 'withdrawn' }
  ]);

  const [kycDocuments] = useState<KYCDocument[]>([
    { id: '1', type: 'ID Verification', status: 'verified', uploadDate: '2024-01-01' },
    { id: '2', type: 'Address Proof', status: 'verified', uploadDate: '2024-01-01' },
    { id: '3', type: 'Business License', status: 'pending', uploadDate: '2024-01-15' }
  ]);

  const kycScore = 85;
  const amlRisk = 'Low';

  const getConsentIcon = (granted: boolean, status: string) => {
    if (status === 'pending') return <AlertCircle className="h-4 w-4 text-yellow-600" />;
    return granted ? <CheckCircle className="h-4 w-4 text-green-600" /> : <XCircle className="h-4 w-4 text-red-600" />;
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'verified':
      case 'active': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'rejected':
      case 'withdrawn': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getRiskColor = (risk: string) => {
    switch (risk.toLowerCase()) {
      case 'low': return 'bg-green-100 text-green-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'high': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* GDPR Consents */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            GDPR Consent Management
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {consents.map((consent, index) => (
              <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center gap-3">
                  {getConsentIcon(consent.granted, consent.status)}
                  <div>
                    <p className="font-medium">{consent.type}</p>
                    <p className="text-sm text-gray-600">Last updated: {consent.date}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge className={getStatusColor(consent.status)}>
                    {consent.status}
                  </Badge>
                  <Button variant="outline" size="sm">
                    Edit
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* KYC/AML Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>KYC Documentation</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {kycDocuments.map((doc) => (
                <div key={doc.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <FileText className="h-5 w-5 text-gray-400" />
                    <div>
                      <p className="font-medium">{doc.type}</p>
                      <p className="text-sm text-gray-600">{doc.uploadDate}</p>
                    </div>
                  </div>
                  <Badge className={getStatusColor(doc.status)}>
                    {doc.status}
                  </Badge>
                </div>
              ))}
              <Button variant="outline" className="w-full flex items-center gap-2">
                <Upload className="h-4 w-4" />
                Upload Document
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Risk Assessment</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium">KYC Score</span>
                <span className="text-xl font-bold text-green-600">{kycScore}/100</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-green-600 h-2 rounded-full" 
                  style={{ width: `${kycScore}%` }}
                ></div>
              </div>
            </div>
            
            <div className="p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center justify-between">
                <span className="font-medium">AML Risk Level</span>
                <Badge className={getRiskColor(amlRisk)}>
                  {amlRisk}
                </Badge>
              </div>
              <p className="text-sm text-gray-600 mt-2">
                Automated assessment based on verification documents and activity patterns
              </p>
            </div>

            <div className="p-4 bg-blue-50 rounded-lg border-l-4 border-blue-500">
              <p className="font-medium text-blue-900">Compliance Status: Good</p>
              <p className="text-sm text-blue-700">
                All required documentation verified. Customer meets compliance requirements.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default GDPRCompliance;
