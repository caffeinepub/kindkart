import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Phone } from 'lucide-react';

export default function EmergencySupportPage() {
  return (
    <div className="container py-8 max-w-2xl">
      <h1 className="text-3xl font-bold mb-6">Emergency Support</h1>
      <Card>
        <CardHeader>
          <CardTitle>Emergency Contacts</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div>
              <p className="font-semibold">Police</p>
              <p className="text-sm text-muted-foreground">Emergency Services</p>
            </div>
            <Button size="sm">
              <Phone className="h-4 w-4 mr-2" />
              100
            </Button>
          </div>
          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div>
              <p className="font-semibold">KindKart Support</p>
              <p className="text-sm text-muted-foreground">24/7 Help</p>
            </div>
            <Button size="sm">
              <Phone className="h-4 w-4 mr-2" />
              1800-XXX-XXXX
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
