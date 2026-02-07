import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { useKindKartData } from '../../state/KindKartDataContext';
import { useDeliveries } from '../../state/DeliveriesContext';

export default function NGODashboardPage() {
  const { requirements, donations } = useKindKartData();
  const { deliveries } = useDeliveries();

  const activeRequirements = requirements.filter((r) => r.status === 'active');
  const fulfilledRequirements = requirements.filter((r) => r.status === 'fulfilled');
  const pendingDeliveries = deliveries.filter((d) => d.status === 'scheduled' || d.status === 'picked-up' || d.status === 'in-transit');

  const totalDonationAmount = donations.reduce((sum, d) => sum + d.amount, 0);

  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold mb-6">NGO Dashboard</h1>
      <Tabs defaultValue="overview">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="requirements">Active Requirements</TabsTrigger>
          <TabsTrigger value="fulfilled">Fulfilled Requests</TabsTrigger>
          <TabsTrigger value="deliveries">Pending Deliveries</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="space-y-6">
          <div className="grid md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Total Donations</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-4xl font-bold">₹{totalDonationAmount.toLocaleString()}</p>
                <p className="text-sm text-muted-foreground mt-1">{donations.length} donations received</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Active Requirements</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-4xl font-bold">{activeRequirements.length}</p>
                <p className="text-sm text-muted-foreground mt-1">Items needed</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Pending Deliveries</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-4xl font-bold">{pendingDeliveries.length}</p>
                <p className="text-sm text-muted-foreground mt-1">In progress</p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {activeRequirements.slice(0, 3).map((req) => (
                  <div key={req.id} className="flex items-center justify-between border-b pb-3">
                    <div>
                      <p className="font-medium">{req.itemName}</p>
                      <p className="text-sm text-muted-foreground">
                        {req.fulfilled} of {req.quantity} fulfilled
                      </p>
                    </div>
                    <Badge variant={req.urgency === 'high' ? 'destructive' : 'secondary'}>
                      {req.urgency}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="requirements">
          <Card>
            <CardHeader>
              <CardTitle>Active Requirements</CardTitle>
            </CardHeader>
            <CardContent>
              {activeRequirements.length === 0 ? (
                <p className="text-center text-muted-foreground py-8">No active requirements</p>
              ) : (
                <div className="space-y-4">
                  {activeRequirements.map((req) => (
                    <div key={req.id} className="border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-semibold">{req.itemName}</h3>
                        <Badge variant={req.urgency === 'high' ? 'destructive' : 'secondary'}>
                          {req.urgency}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Progress: {req.fulfilled} / {req.quantity} items
                      </p>
                      <div className="w-full bg-muted rounded-full h-2 mt-2">
                        <div
                          className="bg-primary h-2 rounded-full"
                          style={{ width: `${(req.fulfilled / req.quantity) * 100}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="fulfilled">
          <Card>
            <CardHeader>
              <CardTitle>Fulfilled Requests</CardTitle>
            </CardHeader>
            <CardContent>
              {fulfilledRequirements.length === 0 ? (
                <p className="text-center text-muted-foreground py-8">No fulfilled requests yet</p>
              ) : (
                <div className="space-y-4">
                  {fulfilledRequirements.map((req) => (
                    <div key={req.id} className="border rounded-lg p-4">
                      <h3 className="font-semibold">{req.itemName}</h3>
                      <p className="text-sm text-muted-foreground">
                        Completed: {req.quantity} items
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="deliveries">
          <Card>
            <CardHeader>
              <CardTitle>Pending Deliveries</CardTitle>
            </CardHeader>
            <CardContent>
              {pendingDeliveries.length === 0 ? (
                <p className="text-center text-muted-foreground py-8">No pending deliveries</p>
              ) : (
                <div className="space-y-4">
                  {pendingDeliveries.map((delivery) => (
                    <div key={delivery.id} className="border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-semibold">{delivery.productName}</h3>
                        <Badge>{delivery.status}</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        From: {delivery.pickupAddress}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Scheduled: {new Date(delivery.scheduledDate).toLocaleDateString()}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
