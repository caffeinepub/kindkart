import { useState } from 'react';
import { useParams, useNavigate } from '@tanstack/react-router';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { useKindKartData } from '../../state/KindKartDataContext';
import SellerRating from '../../components/marketplace/SellerRating';
import SellerReviewSummary from '../../components/marketplace/SellerReviewSummary';
import CheckoutIntentDialog from '../../components/checkout/CheckoutIntentDialog';

export default function ProductDetailPage() {
  const { productId } = useParams({ from: '/authenticated/user/product/$productId' });
  const navigate = useNavigate();
  const { products } = useKindKartData();
  const [checkoutDialogOpen, setCheckoutDialogOpen] = useState(false);

  const product = products.find((p) => p.id.toString() === productId);

  const getConditionLabel = (condition: string): string => {
    const labels: Record<string, string> = {
      new: 'New',
      likeNew: 'Like New',
      good: 'Good',
      fair: 'Fair',
      poor: 'Poor',
    };
    return labels[condition] || condition;
  };

  if (!product) {
    return (
      <div className="container py-8">
        <Card>
          <CardContent className="p-8 text-center">
            <h2 className="text-2xl font-bold mb-4">Necessity Item Not Found</h2>
            <p className="text-muted-foreground mb-6">The necessity item you're looking for doesn't exist or has been removed.</p>
            <Button onClick={() => navigate({ to: '/user/marketplace' })}>
              Back to Marketplace
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const description = product.description || 'This is a quality necessity item available for purchase or donation. Contact the seller for more details about condition, usage, and availability.';

  return (
    <div className="container py-8">
      <div className="grid lg:grid-cols-2 gap-8">
        <div>
          <img
            src={product.imageUrls[0] || 'https://images.unsplash.com/photo-1560393464-5c69a73c5770?w=600'}
            alt={product.title}
            className="w-full rounded-lg"
          />
        </div>
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold mb-2">{product.title}</h1>
            <Badge>{getConditionLabel(product.condition)}</Badge>
          </div>
          <p className="text-4xl font-bold">₹{product.price.toString()}</p>
          
          <Separator />
          
          <div>
            <h2 className="text-lg font-semibold mb-2">Description</h2>
            <p className="text-muted-foreground">{description}</p>
          </div>

          <Separator />

          <div>
            <h2 className="text-lg font-semibold mb-3">Seller Information</h2>
            <SellerRating sellerId={product.seller.toString()} productId={product.id.toString()} />
            <div className="mt-4">
              <SellerReviewSummary sellerId={product.seller.toString()} />
            </div>
          </div>

          <div className="flex gap-4">
            <Button size="lg" className="flex-1" onClick={() => setCheckoutDialogOpen(true)}>
              Buy / Donate
            </Button>
          </div>
        </div>
      </div>

      <CheckoutIntentDialog 
        open={checkoutDialogOpen}
        onOpenChange={setCheckoutDialogOpen}
        product={product}
      />
    </div>
  );
}
