import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export default function UserVerificationStatusPage() {
  return (
    <div className="container py-8 max-w-2xl">
      <h1 className="text-3xl font-bold mb-6">Verification Status</h1>
      <Card>
        <CardHeader>
          <CardTitle>Account Verification</CardTitle>
        </CardHeader>
        <CardContent>
          <Badge variant="secondary">Verified</Badge>
          <p className="mt-4 text-muted-foreground">Your account is verified and active.</p>
        </CardContent>
      </Card>
    </div>
  );
}
