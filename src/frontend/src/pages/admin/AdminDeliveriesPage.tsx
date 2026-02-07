import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Eye, MapPin, User, Package } from 'lucide-react';

interface Delivery {
  id: string;
  orderId: string;
  status: 'scheduled' | 'picked-up' | 'in-transit' | 'delivered';
  pickupAddress: string;
  dropAddress: string;
  assignedPartner: string;
  scheduledDate: string;
  completedDate?: string;
}

export default function AdminDeliveriesPage() {
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [selectedDelivery, setSelectedDelivery] = useState<Delivery | null>(null);

  const mockDeliveries: Delivery[] = [
    {
      id: 'DEL-001',
      orderId: 'ORD-2456',
      status: 'delivered',
      pickupAddress: '123 MG Road, Bangalore',
      dropAddress: '456 Indiranagar, Bangalore',
      assignedPartner: 'Ramesh Kumar',
      scheduledDate: '2026-02-05',
      completedDate: '2026-02-05',
    },
    {
      id: 'DEL-002',
      orderId: 'ORD-2457',
      status: 'in-transit',
      pickupAddress: '789 Koramangala, Bangalore',
      dropAddress: '321 Whitefield, Bangalore',
      assignedPartner: 'Suresh Patel',
      scheduledDate: '2026-02-07',
    },
    {
      id: 'DEL-003',
      orderId: 'ORD-2458',
      status: 'picked-up',
      pickupAddress: '555 HSR Layout, Bangalore',
      dropAddress: '888 Electronic City, Bangalore',
      assignedPartner: 'Vijay Singh',
      scheduledDate: '2026-02-07',
    },
    {
      id: 'DEL-004',
      orderId: 'ORD-2459',
      status: 'scheduled',
      pickupAddress: '222 Jayanagar, Bangalore',
      dropAddress: '999 BTM Layout, Bangalore',
      assignedPartner: 'Anil Sharma',
      scheduledDate: '2026-02-08',
    },
    {
      id: 'DEL-005',
      orderId: 'ORD-2460',
      status: 'delivered',
      pickupAddress: '111 Malleshwaram, Bangalore',
      dropAddress: '777 Rajajinagar, Bangalore',
      assignedPartner: 'Ramesh Kumar',
      scheduledDate: '2026-02-04',
      completedDate: '2026-02-04',
    },
  ];

  const getStatusBadge = (status: string) => {
    const variants: Record<string, 'default' | 'secondary' | 'outline' | 'destructive'> = {
      scheduled: 'outline',
      'picked-up': 'secondary',
      'in-transit': 'default',
      delivered: 'default',
    };
    return <Badge variant={variants[status] || 'default'}>{status.replace('-', ' ')}</Badge>;
  };

  const filteredDeliveries = statusFilter === 'all' 
    ? mockDeliveries 
    : mockDeliveries.filter(d => d.status === statusFilter);

  return (
    <div className="container py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Deliveries Overview</h1>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Deliveries</SelectItem>
            <SelectItem value="scheduled">Scheduled</SelectItem>
            <SelectItem value="picked-up">Picked Up</SelectItem>
            <SelectItem value="in-transit">In Transit</SelectItem>
            <SelectItem value="delivered">Delivered</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Deliveries ({filteredDeliveries.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredDeliveries.map((delivery) => (
              <div key={delivery.id} className="border rounded-lg p-4">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold">{delivery.id}</h3>
                      {getStatusBadge(delivery.status)}
                    </div>
                    <p className="text-sm text-muted-foreground">Order: {delivery.orderId}</p>
                  </div>
                  <Sheet>
                    <SheetTrigger asChild>
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => setSelectedDelivery(delivery)}
                      >
                        <Eye className="h-4 w-4 mr-2" />
                        View Details
                      </Button>
                    </SheetTrigger>
                    <SheetContent>
                      <SheetHeader>
                        <SheetTitle>Delivery Details</SheetTitle>
                      </SheetHeader>
                      {selectedDelivery && (
                        <div className="mt-6 space-y-4">
                          <div>
                            <p className="text-sm font-medium mb-1">Delivery ID</p>
                            <p className="text-sm text-muted-foreground">{selectedDelivery.id}</p>
                          </div>
                          <div>
                            <p className="text-sm font-medium mb-1">Order ID</p>
                            <p className="text-sm text-muted-foreground">{selectedDelivery.orderId}</p>
                          </div>
                          <div>
                            <p className="text-sm font-medium mb-1">Status</p>
                            {getStatusBadge(selectedDelivery.status)}
                          </div>
                          <div>
                            <p className="text-sm font-medium mb-1 flex items-center gap-2">
                              <MapPin className="h-4 w-4" />
                              Pickup Address
                            </p>
                            <p className="text-sm text-muted-foreground">{selectedDelivery.pickupAddress}</p>
                          </div>
                          <div>
                            <p className="text-sm font-medium mb-1 flex items-center gap-2">
                              <MapPin className="h-4 w-4" />
                              Drop Address
                            </p>
                            <p className="text-sm text-muted-foreground">{selectedDelivery.dropAddress}</p>
                          </div>
                          <div>
                            <p className="text-sm font-medium mb-1 flex items-center gap-2">
                              <User className="h-4 w-4" />
                              Assigned Partner
                            </p>
                            <p className="text-sm text-muted-foreground">{selectedDelivery.assignedPartner}</p>
                          </div>
                          <div>
                            <p className="text-sm font-medium mb-1">Scheduled Date</p>
                            <p className="text-sm text-muted-foreground">
                              {new Date(selectedDelivery.scheduledDate).toLocaleDateString()}
                            </p>
                          </div>
                          {selectedDelivery.completedDate && (
                            <div>
                              <p className="text-sm font-medium mb-1">Completed Date</p>
                              <p className="text-sm text-muted-foreground">
                                {new Date(selectedDelivery.completedDate).toLocaleDateString()}
                              </p>
                            </div>
                          )}
                        </div>
                      )}
                    </SheetContent>
                  </Sheet>
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-muted-foreground mb-1">Pickup</p>
                    <p className="font-medium">{delivery.pickupAddress}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground mb-1">Drop</p>
                    <p className="font-medium">{delivery.dropAddress}</p>
                  </div>
                </div>
                <div className="mt-3 flex items-center gap-2 text-sm text-muted-foreground">
                  <User className="h-4 w-4" />
                  <span>{delivery.assignedPartner}</span>
                  <span className="mx-2">•</span>
                  <span>Scheduled: {new Date(delivery.scheduledDate).toLocaleDateString()}</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
