import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from '@tanstack/react-router';
import { Package, ShoppingCart, Heart, TrendingUp, Award } from 'lucide-react';
import { useRewards } from '../../state/RewardsContext';

export default function UserHomePage() {
  const { impactCredits } = useRewards();

  return (
    <div className="container py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Welcome Back!</h1>
        <p className="text-muted-foreground">What would you like to do today?</p>
      </div>

      {/* Quick Actions */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        <Link to="/user/sell">
          <Card className="cursor-pointer hover:shadow-lg transition-shadow">
            <CardHeader>
              <Package className="h-10 w-10 text-primary mb-2" />
              <CardTitle>Sell Product</CardTitle>
              <CardDescription>List your items with AI pricing</CardDescription>
            </CardHeader>
          </Card>
        </Link>

        <Link to="/user/marketplace">
          <Card className="cursor-pointer hover:shadow-lg transition-shadow">
            <CardHeader>
              <ShoppingCart className="h-10 w-10 text-primary mb-2" />
              <CardTitle>Browse Marketplace</CardTitle>
              <CardDescription>Find great deals on pre-loved items</CardDescription>
            </CardHeader>
          </Card>
        </Link>

        <Link to="/user/donate">
          <Card className="cursor-pointer hover:shadow-lg transition-shadow">
            <CardHeader>
              <Heart className="h-10 w-10 text-primary mb-2" />
              <CardTitle>Donate to NGO</CardTitle>
              <CardDescription>Support verified NGOs in need</CardDescription>
            </CardHeader>
          </Card>
        </Link>

        <Link to="/user/dashboard">
          <Card className="cursor-pointer hover:shadow-lg transition-shadow">
            <CardHeader>
              <TrendingUp className="h-10 w-10 text-primary mb-2" />
              <CardTitle>My Dashboard</CardTitle>
              <CardDescription>Track your activity and impact</CardDescription>
            </CardHeader>
          </Card>
        </Link>
      </div>

      {/* Impact Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Award className="h-5 w-5 text-primary" />
            Your Impact
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <p className="text-3xl font-bold text-primary">{impactCredits}</p>
              <p className="text-sm text-muted-foreground">Impact Credits</p>
            </div>
            <div>
              <p className="text-3xl font-bold">0</p>
              <p className="text-sm text-muted-foreground">Active Listings</p>
            </div>
            <div>
              <p className="text-3xl font-bold">0</p>
              <p className="text-sm text-muted-foreground">Total Donations</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
