import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useDeliveries } from '../../state/DeliveriesContext';
import { CheckCircle2 } from 'lucide-react';

export default function CompletedDeliveriesPage() {
  const { deliveries } = useDeliveries();
  const completedDeliveries = deliveries.filter((d) => d.status === 'delivered');

  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold mb-6">Completed Deliveries</h1>
      <Card>
        <CardHeader>
          <CardTitle>Delivery History</CardTitle>
        </CardHeader>
        <CardContent>
          {completedDeliveries.length === 0 ? (
            <p className="text-center text-muted-foreground py-8">No completed deliveries</p>
          ) : (
            <div className="space-y-4">
              {completedDeliveries.map((delivery) => (
                <div key={delivery.id} className="border rounded-lg p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5" />
                      <div>
                        <h3 className="font-semibold">{delivery.productName}</h3>
                        <p className="text-sm text-muted-foreground">
                          {delivery.buyerName} • {new Date(delivery.timeline[delivery.timeline.length - 1].timestamp).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <Badge variant="outline">Delivered</Badge>
                  </div>
                  <div className="space-y-1 text-sm">
                    <p><span className="font-medium">Route:</span> {delivery.pickupAddress} → {delivery.deliveryAddress}</p>
                    {delivery.proofUrl && (
                      <p className="text-green-600 flex items-center gap-1">
                        <CheckCircle2 className="h-3 w-3" />
                        Proof of delivery uploaded
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
