import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useDeliveries } from '../../state/DeliveriesContext';

export default function OngoingDeliveriesPage() {
  const { deliveries } = useDeliveries();
  const ongoingDeliveries = deliveries.filter((d) => d.status === 'picked-up' || d.status === 'in-transit');

  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold mb-6">Ongoing Deliveries</h1>
      <Card>
        <CardHeader>
          <CardTitle>Active Deliveries</CardTitle>
        </CardHeader>
        <CardContent>
          {ongoingDeliveries.length === 0 ? (
            <p className="text-center text-muted-foreground py-8">No ongoing deliveries</p>
          ) : (
            <div className="space-y-4">
              {ongoingDeliveries.map((delivery) => (
                <div key={delivery.id} className="border rounded-lg p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="font-semibold">{delivery.productName}</h3>
                      <p className="text-sm text-muted-foreground">Buyer: {delivery.buyerName}</p>
                    </div>
                    <Badge variant={delivery.status === 'in-transit' ? 'default' : 'secondary'}>
                      {delivery.status}
                    </Badge>
                  </div>
                  <div className="space-y-1 text-sm">
                    <p><span className="font-medium">From:</span> {delivery.pickupAddress}</p>
                    <p><span className="font-medium">To:</span> {delivery.deliveryAddress}</p>
                    <p><span className="font-medium">OTP:</span> {delivery.otp}</p>
                  </div>
                  <Button className="w-full mt-4" size="sm" variant="outline">
                    Update Status
                  </Button>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
