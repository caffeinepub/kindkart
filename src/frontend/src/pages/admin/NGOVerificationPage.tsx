import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Loader2, FileText, CheckCircle, XCircle } from 'lucide-react';
import { toast } from 'sonner';

interface NGOVerification {
  id: string;
  ngoName: string;
  category: string;
  submittedDate: string;
  status: 'pending' | 'approved' | 'rejected';
  documents: {
    name: string;
    type: string;
    uploadedDate: string;
  }[];
}

export default function NGOVerificationPage() {
  const [verifications, setVerifications] = useState<NGOVerification[]>([
    {
      id: '1',
      ngoName: 'Care for Children Foundation',
      category: 'Education',
      submittedDate: '2026-01-28',
      status: 'pending',
      documents: [
        { name: 'Registration Certificate', type: 'PDF', uploadedDate: '2026-01-28' },
        { name: 'PAN Card', type: 'PDF', uploadedDate: '2026-01-28' },
        { name: 'Address Proof', type: 'PDF', uploadedDate: '2026-01-28' },
      ],
    },
    {
      id: '2',
      ngoName: 'Clean Water Initiative',
      category: 'Health',
      submittedDate: '2026-01-30',
      status: 'pending',
      documents: [
        { name: 'Registration Certificate', type: 'PDF', uploadedDate: '2026-01-30' },
        { name: 'Tax Exemption Certificate', type: 'PDF', uploadedDate: '2026-01-30' },
        { name: 'Board Resolution', type: 'PDF', uploadedDate: '2026-01-30' },
      ],
    },
    {
      id: '3',
      ngoName: 'Animal Welfare Society',
      category: 'Animal Welfare',
      submittedDate: '2026-02-01',
      status: 'pending',
      documents: [
        { name: 'Registration Certificate', type: 'PDF', uploadedDate: '2026-02-01' },
        { name: 'PAN Card', type: 'PDF', uploadedDate: '2026-02-01' },
        { name: 'Bank Account Letter', type: 'PDF', uploadedDate: '2026-02-01' },
      ],
    },
  ]);

  const [processingId, setProcessingId] = useState<string | null>(null);

  const handleApprove = async (id: string) => {
    setProcessingId(id);
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setVerifications(prev =>
      prev.map(v => v.id === id ? { ...v, status: 'approved' as const } : v)
    );
    
    setProcessingId(null);
    toast.success('NGO verification approved successfully');
  };

  const handleReject = async (id: string) => {
    setProcessingId(id);
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setVerifications(prev =>
      prev.map(v => v.id === id ? { ...v, status: 'rejected' as const } : v)
    );
    
    setProcessingId(null);
    toast.success('NGO verification rejected');
  };

  const pendingVerifications = verifications.filter(v => v.status === 'pending');
  const approvedVerifications = verifications.filter(v => v.status === 'approved');
  const rejectedVerifications = verifications.filter(v => v.status === 'rejected');

  const renderVerificationCard = (verification: NGOVerification) => (
    <div key={verification.id} className="border rounded-lg p-4">
      <div className="flex items-start justify-between mb-3">
        <div>
          <h3 className="font-semibold">{verification.ngoName}</h3>
          <p className="text-sm text-muted-foreground">{verification.category}</p>
        </div>
        <Badge 
          variant={
            verification.status === 'approved' ? 'default' : 
            verification.status === 'rejected' ? 'destructive' : 
            'secondary'
          }
        >
          {verification.status}
        </Badge>
      </div>
      <p className="text-xs text-muted-foreground mb-3">
        Submitted: {new Date(verification.submittedDate).toLocaleDateString()}
      </p>
      <div className="flex gap-2">
        {verification.status === 'pending' && (
          <>
            <Button 
              size="sm" 
              onClick={() => handleApprove(verification.id)}
              disabled={processingId === verification.id}
            >
              {processingId === verification.id ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <>
                  <CheckCircle className="h-4 w-4 mr-1" />
                  Approve
                </>
              )}
            </Button>
            <Dialog>
              <DialogTrigger asChild>
                <Button size="sm" variant="outline">
                  <FileText className="h-4 w-4 mr-1" />
                  Review Documents
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Documents - {verification.ngoName}</DialogTitle>
                </DialogHeader>
                <div className="space-y-3 mt-4">
                  {verification.documents.map((doc, index) => (
                    <div key={index} className="border rounded p-3">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-sm">{doc.name}</p>
                          <p className="text-xs text-muted-foreground">
                            {doc.type} • Uploaded {new Date(doc.uploadedDate).toLocaleDateString()}
                          </p>
                        </div>
                        <FileText className="h-5 w-5 text-muted-foreground" />
                      </div>
                    </div>
                  ))}
                </div>
              </DialogContent>
            </Dialog>
            <Button 
              size="sm" 
              variant="destructive"
              onClick={() => handleReject(verification.id)}
              disabled={processingId === verification.id}
            >
              {processingId === verification.id ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <>
                  <XCircle className="h-4 w-4 mr-1" />
                  Reject
                </>
              )}
            </Button>
          </>
        )}
        {verification.status !== 'pending' && (
          <Dialog>
            <DialogTrigger asChild>
              <Button size="sm" variant="outline">
                <FileText className="h-4 w-4 mr-1" />
                View Documents
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Documents - {verification.ngoName}</DialogTitle>
              </DialogHeader>
              <div className="space-y-3 mt-4">
                {verification.documents.map((doc, index) => (
                  <div key={index} className="border rounded p-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-sm">{doc.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {doc.type} • Uploaded {new Date(doc.uploadedDate).toLocaleDateString()}
                        </p>
                      </div>
                      <FileText className="h-5 w-5 text-muted-foreground" />
                    </div>
                  </div>
                ))}
              </div>
            </DialogContent>
          </Dialog>
        )}
      </div>
    </div>
  );

  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold mb-6">NGO Verification</h1>
      
      <Tabs defaultValue="pending">
        <TabsList>
          <TabsTrigger value="pending">
            Pending ({pendingVerifications.length})
          </TabsTrigger>
          <TabsTrigger value="approved">
            Approved ({approvedVerifications.length})
          </TabsTrigger>
          <TabsTrigger value="rejected">
            Rejected ({rejectedVerifications.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="pending">
          <Card>
            <CardHeader>
              <CardTitle>Pending Verifications</CardTitle>
            </CardHeader>
            <CardContent>
              {pendingVerifications.length === 0 ? (
                <p className="text-center text-muted-foreground py-8">No pending verifications</p>
              ) : (
                <div className="space-y-4">
                  {pendingVerifications.map(renderVerificationCard)}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="approved">
          <Card>
            <CardHeader>
              <CardTitle>Approved NGOs</CardTitle>
            </CardHeader>
            <CardContent>
              {approvedVerifications.length === 0 ? (
                <p className="text-center text-muted-foreground py-8">No approved NGOs yet</p>
              ) : (
                <div className="space-y-4">
                  {approvedVerifications.map(renderVerificationCard)}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="rejected">
          <Card>
            <CardHeader>
              <CardTitle>Rejected Applications</CardTitle>
            </CardHeader>
            <CardContent>
              {rejectedVerifications.length === 0 ? (
                <p className="text-center text-muted-foreground py-8">No rejected applications</p>
              ) : (
                <div className="space-y-4">
                  {rejectedVerifications.map(renderVerificationCard)}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
