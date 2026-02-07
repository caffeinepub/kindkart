import { useParams } from '@tanstack/react-router';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { MapPin } from 'lucide-react';

export default function DeliveryTrackingPage() {
  const { trackingId } = useParams({ from: '/authenticated/tracking/$trackingId' });

  return (
    <div className="container py-8 max-w-3xl">
      <h1 className="text-3xl font-bold mb-6">Track Delivery</h1>
      
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Delivery Status</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <Badge>In Transit</Badge>
            <Progress value={60} className="mt-4" />
          </div>
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="h-3 w-3 rounded-full bg-primary" />
              <div>
                <p className="font-medium">Order Placed</p>
                <p className="text-sm text-muted-foreground">Completed</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="h-3 w-3 rounded-full bg-primary" />
              <div>
                <p className="font-medium">Picked Up</p>
                <p className="text-sm text-muted-foreground">Completed</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="h-3 w-3 rounded-full bg-muted" />
              <div>
                <p className="font-medium">Out for Delivery</p>
                <p className="text-sm text-muted-foreground">Pending</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Map Preview Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="h-5 w-5" />
            Map Preview
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative w-full rounded-lg overflow-hidden bg-muted">
            <img
              src="/assets/generated/route-map-mock.dim_1600x900.png"
              alt="Delivery route preview"
              className="w-full h-auto object-contain"
            />
            
            {/* Overlay badge */}
            <div className="absolute top-3 right-3">
              <Badge variant="secondary" className="bg-background/95 backdrop-blur-sm shadow-md">
                Delivery #{trackingId}
              </Badge>
            </div>
          </div>
          <p className="text-sm text-muted-foreground mt-3">
            Your delivery is currently in transit. The driver is following the optimal route to your location.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
