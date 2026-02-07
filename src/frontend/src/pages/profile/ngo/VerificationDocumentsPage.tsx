import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function VerificationDocumentsPage() {
  return (
    <div className="container py-8 max-w-2xl">
      <h1 className="text-3xl font-bold mb-6">Verification Documents</h1>
      <Card>
        <CardHeader>
          <CardTitle>Uploaded Documents</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">No documents uploaded yet</p>
        </CardContent>
      </Card>
    </div>
  );
}
