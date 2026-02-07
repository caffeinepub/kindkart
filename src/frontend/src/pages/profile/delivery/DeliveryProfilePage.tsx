import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function DeliveryProfilePage() {
  return (
    <div className="container py-8 max-w-2xl">
      <h1 className="text-3xl font-bold mb-6">Delivery Partner Profile</h1>
      <Card>
        <CardHeader>
          <CardTitle>Profile Information</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Delivery partner details</p>
        </CardContent>
      </Card>
    </div>
  );
}
