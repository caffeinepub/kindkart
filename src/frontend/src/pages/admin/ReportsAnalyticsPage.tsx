import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp, Users, Package, DollarSign } from 'lucide-react';

export default function ReportsAnalyticsPage() {
  // Dummy data for charts
  const monthlyUsers = [
    { month: 'Jan', users: 45 },
    { month: 'Feb', users: 52 },
    { month: 'Mar', users: 61 },
    { month: 'Apr', users: 73 },
    { month: 'May', users: 89 },
    { month: 'Jun', users: 105 },
  ];

  const categoryData = [
    { category: 'Listings', count: 156 },
    { category: 'Donations', count: 89 },
    { category: 'Deliveries', count: 134 },
  ];

  const totalRevenue = 45680;
  const totalUsers = 247;
  const totalListings = 156;
  const totalDonations = 89;

  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold mb-6">Reports & Analytics</h1>
      
      {/* KPI Cards */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Platform Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹{totalRevenue.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground mt-1">+12.5% from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalUsers}</div>
            <p className="text-xs text-muted-foreground mt-1">+18 new this month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Active Listings</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalListings}</div>
            <p className="text-xs text-muted-foreground mt-1">+23 this week</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Donations</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalDonations}</div>
            <p className="text-xs text-muted-foreground mt-1">+7 this week</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>User Growth</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-end justify-between gap-2">
              {monthlyUsers.map((data, index) => {
                const maxUsers = Math.max(...monthlyUsers.map(d => d.users));
                const height = (data.users / maxUsers) * 100;
                return (
                  <div key={index} className="flex-1 flex flex-col items-center gap-2">
                    <div className="w-full bg-amber-500 rounded-t" style={{ height: `${height}%` }} />
                    <div className="text-xs text-muted-foreground">{data.month}</div>
                    <div className="text-xs font-medium">{data.users}</div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Platform Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-end justify-between gap-4">
              {categoryData.map((data, index) => {
                const maxCount = Math.max(...categoryData.map(d => d.count));
                const height = (data.count / maxCount) * 100;
                const colors = ['bg-amber-500', 'bg-emerald-500', 'bg-orange-500'];
                return (
                  <div key={index} className="flex-1 flex flex-col items-center gap-2">
                    <div className={`w-full ${colors[index]} rounded-t`} style={{ height: `${height}%` }} />
                    <div className="text-xs text-muted-foreground text-center">{data.category}</div>
                    <div className="text-xs font-medium">{data.count}</div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
