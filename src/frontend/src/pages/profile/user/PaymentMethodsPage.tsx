import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default function PaymentMethodsPage() {
  return (
    <div className="container py-8 max-w-2xl">
      <h1 className="text-3xl font-bold mb-6">Payment Methods</h1>
      <Card>
        <CardHeader>
          <CardTitle>Saved Payment Methods</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground mb-4">No payment methods saved yet.</p>
          <Button>Add Payment Method</Button>
        </CardContent>
      </Card>
    </div>
  );
}
