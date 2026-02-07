import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function NGOBankDetailsPage() {
  return (
    <div className="container py-8 max-w-2xl">
      <h1 className="text-3xl font-bold mb-6">Bank Details</h1>
      <Card>
        <CardHeader>
          <CardTitle>Banking Information</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Bank details not configured</p>
        </CardContent>
      </Card>
    </div>
  );
}
