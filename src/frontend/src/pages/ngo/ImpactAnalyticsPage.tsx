import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp, Users, Package } from 'lucide-react';

export default function ImpactAnalyticsPage() {
  // Dummy data for NGO impact
  const monthlyImpact = [
    { month: 'Jan', beneficiaries: 45 },
    { month: 'Feb', beneficiaries: 62 },
    { month: 'Mar', beneficiaries: 78 },
    { month: 'Apr', beneficiaries: 95 },
    { month: 'May', beneficiaries: 112 },
    { month: 'Jun', beneficiaries: 134 },
  ];

  const totalBeneficiaries = 526;
  const totalDonationsValue = 245680;
  const activePrograms = 8;

  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold mb-6">Impact Analytics</h1>
      
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Lives Impacted</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold">{totalBeneficiaries}</p>
            <p className="text-sm text-muted-foreground mt-1">+22 this month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Donations Received</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold">₹{totalDonationsValue.toLocaleString()}</p>
            <p className="text-sm text-muted-foreground mt-1">Total Value</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Active Programs</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold">{activePrograms}</p>
            <p className="text-sm text-muted-foreground mt-1">Running initiatives</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Monthly Beneficiaries</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64 flex items-end justify-between gap-2">
            {monthlyImpact.map((data, index) => {
              const maxBeneficiaries = Math.max(...monthlyImpact.map(d => d.beneficiaries));
              const height = (data.beneficiaries / maxBeneficiaries) * 100;
              return (
                <div key={index} className="flex-1 flex flex-col items-center gap-2">
                  <div className="w-full bg-primary rounded-t" style={{ height: `${height}%` }} />
                  <div className="text-xs text-muted-foreground">{data.month}</div>
                  <div className="text-xs font-medium">{data.beneficiaries}</div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
