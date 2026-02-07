import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useKindKartData } from '../../state/KindKartDataContext';
import { useDeliveries } from '../../state/DeliveriesContext';

export default function AdminDashboardPage() {
  const { products, donations, ngos } = useKindKartData();
  const { deliveries } = useDeliveries();

  const totalUsers = 247;
  const totalDonationAmount = donations.reduce((sum, d) => sum + d.amount, 0);
  const activeDeliveries = deliveries.filter((d) => d.status !== 'delivered' && d.status !== 'cancelled').length;

  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
      <div className="grid md:grid-cols-3 gap-6 mb-6">
        <Card>
          <CardHeader>
            <CardTitle>Total Users</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold">{totalUsers}</p>
            <p className="text-sm text-muted-foreground mt-1">Registered accounts</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Active Listings</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold">{products.length}</p>
            <p className="text-sm text-muted-foreground mt-1">Products available</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Total Donations</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold">₹{totalDonationAmount.toLocaleString()}</p>
            <p className="text-sm text-muted-foreground mt-1">{donations.length} donations</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Verified NGOs</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold">{ngos.filter((n) => n.verified).length}</p>
            <p className="text-sm text-muted-foreground mt-1">Active organizations</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Active Deliveries</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold">{activeDeliveries}</p>
            <p className="text-sm text-muted-foreground mt-1">In progress</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Platform Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold">₹{(totalDonationAmount * 0.05).toLocaleString()}</p>
            <p className="text-sm text-muted-foreground mt-1">5% platform fee</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
