import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useNavigate } from '@tanstack/react-router';
import { Package, MapPin, Clock } from 'lucide-react';
import { useDeliveries } from '../../state/DeliveriesContext';

export default function UserDeliveriesPage() {
  const { deliveries } = useDeliveries();
  const navigate = useNavigate();

  const getStatusVariant = (status: string) => {
    switch (status) {
      case 'delivered':
        return 'default';
      case 'in-transit':
        return 'secondary';
      case 'picked-up':
        return 'outline';
      default:
        return 'secondary';
    }
  };

  const getStatusLabel = (status: string) => {
    return status.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  };

  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold mb-6">My Deliveries</h1>
      
      <div className="space-y-4">
        {deliveries.map((delivery) => (
          <Card key={delivery.id}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Package className="h-5 w-5" />
                    {delivery.productName}
                  </CardTitle>
                  <Badge variant={getStatusVariant(delivery.status)}>
                    {getStatusLabel(delivery.status)}
                  </Badge>
                </div>
                <Button 
                  variant="outline"
                  onClick={() => navigate({ to: '/tracking/$trackingId', params: { trackingId: delivery.id } })}
                >
                  Track
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="flex items-start gap-2">
                  <MapPin className="h-4 w-4 text-muted-foreground mt-0.5" />
                  <div className="text-sm">
                    <p className="font-medium">Pickup</p>
                    <p className="text-muted-foreground">{delivery.pickupAddress}</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <MapPin className="h-4 w-4 text-muted-foreground mt-0.5" />
                  <div className="text-sm">
                    <p className="font-medium">Delivery</p>
                    <p className="text-muted-foreground">{delivery.deliveryAddress}</p>
                  </div>
                </div>
              </div>
              
              {delivery.status !== 'delivered' && (
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Clock className="h-4 w-4" />
                  <span>Estimated arrival: {new Date(delivery.scheduledDate).toLocaleDateString()}</span>
                </div>
              )}

              {delivery.status === 'delivered' && delivery.proofUrl && (
                <div className="text-sm text-muted-foreground">
                  Delivered on {new Date(delivery.scheduledDate).toLocaleDateString()}
                </div>
              )}
            </CardContent>
          </Card>
        ))}

        {deliveries.length === 0 && (
          <Card>
            <CardContent className="p-8 text-center">
              <Package className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-lg font-semibold mb-2">No Deliveries Yet</h3>
              <p className="text-muted-foreground mb-4">
                Your delivery history will appear here once you make a purchase or donation.
              </p>
              <Button onClick={() => navigate({ to: '/user/marketplace' })}>
                Browse Marketplace
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
