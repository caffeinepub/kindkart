import { useParams, Link } from '@tanstack/react-router';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle2 } from 'lucide-react';

export default function SellConfirmationPage() {
  const { listingId } = useParams({ from: '/authenticated/user/sell/confirmation/$listingId' });

  return (
    <div className="container py-12 max-w-2xl">
      <Card>
        <CardHeader className="text-center">
          <CheckCircle2 className="h-16 w-16 text-green-500 mx-auto mb-4" />
          <CardTitle className="text-2xl">Product Listed Successfully!</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6 text-center">
          <p className="text-muted-foreground">
            Your product has been listed on the marketplace. Buyers can now view and purchase it.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/user/dashboard">
              <Button variant="outline">View My Listings</Button>
            </Link>
            <Link to="/user/marketplace">
              <Button>Browse Marketplace</Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
