import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function DeliverySettingsPage() {
  return (
    <div className="container py-8 max-w-2xl">
      <h1 className="text-3xl font-bold mb-6">Delivery Settings</h1>
      <Card>
        <CardHeader>
          <CardTitle>Preferences</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Settings configuration</p>
        </CardContent>
      </Card>
    </div>
  );
}
