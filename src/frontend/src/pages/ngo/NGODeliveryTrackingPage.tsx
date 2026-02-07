import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Package, MapPin, Clock } from 'lucide-react';

export default function NGODeliveryTrackingPage() {
  // Dummy delivery data for NGO
  const deliveries = [
    {
      id: 'del-001',
      donorName: 'Anonymous',
      itemName: 'Educational Books (50 units)',
      status: 'in-transit',
      pickupLocation: 'Mumbai, Maharashtra',
      estimatedArrival: '2026-02-10',
      otp: '4523',
    },
    {
      id: 'del-002',
      donorName: 'Rajesh Kumar',
      itemName: 'Winter Blankets (30 units)',
      status: 'scheduled',
      pickupLocation: 'Delhi, NCR',
      estimatedArrival: '2026-02-12',
      otp: '7891',
    },
    {
      id: 'del-003',
      donorName: 'Priya Sharma',
      itemName: 'Kitchen Utensils (20 sets)',
      status: 'picked-up',
      pickupLocation: 'Bangalore, Karnataka',
      estimatedArrival: '2026-02-09',
      otp: '3456',
    },
  ];

  const getStatusVariant = (status: string) => {
    switch (status) {
      case 'in-transit':
        return 'default';
      case 'picked-up':
        return 'secondary';
      case 'scheduled':
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
      <h1 className="text-3xl font-bold mb-6">Delivery Tracking</h1>
      
      <div className="space-y-4">
        {deliveries.map((delivery) => (
          <Card key={delivery.id}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Package className="h-5 w-5" />
                    {delivery.itemName}
                  </CardTitle>
                  <p className="text-sm text-muted-foreground">From: {delivery.donorName}</p>
                </div>
                <Badge variant={getStatusVariant(delivery.status)}>
                  {getStatusLabel(delivery.status)}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-start gap-2">
                <MapPin className="h-4 w-4 text-muted-foreground mt-0.5" />
                <div className="text-sm">
                  <p className="font-medium">Pickup Location</p>
                  <p className="text-muted-foreground">{delivery.pickupLocation}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Clock className="h-4 w-4" />
                <span>ETA: {new Date(delivery.estimatedArrival).toLocaleDateString()}</span>
              </div>

              {delivery.status !== 'scheduled' && (
                <div className="text-sm">
                  <span className="font-medium">Delivery OTP: </span>
                  <span className="font-mono bg-muted px-2 py-1 rounded">{delivery.otp}</span>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
