import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useDeliveries } from '../../state/DeliveriesContext';

export default function AssignedPickupsPage() {
  const { deliveries } = useDeliveries();
  const assignedPickups = deliveries.filter((d) => d.status === 'scheduled');

  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold mb-6">Assigned Pickups</h1>
      <Card>
        <CardHeader>
          <CardTitle>Pending Pickups</CardTitle>
        </CardHeader>
        <CardContent>
          {assignedPickups.length === 0 ? (
            <p className="text-center text-muted-foreground py-8">No pickups assigned</p>
          ) : (
            <div className="space-y-4">
              {assignedPickups.map((delivery) => (
                <div key={delivery.id} className="border rounded-lg p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="font-semibold">{delivery.productName}</h3>
                      <p className="text-sm text-muted-foreground">Seller: {delivery.sellerName}</p>
                    </div>
                    <Badge>{delivery.status}</Badge>
                  </div>
                  <div className="space-y-1 text-sm">
                    <p><span className="font-medium">Pickup:</span> {delivery.pickupAddress}</p>
                    <p><span className="font-medium">Delivery:</span> {delivery.deliveryAddress}</p>
                    <p><span className="font-medium">Scheduled:</span> {new Date(delivery.scheduledDate).toLocaleDateString()}</p>
                  </div>
                  <Button className="w-full mt-4" size="sm">Start Pickup</Button>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
