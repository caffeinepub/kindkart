import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Search } from 'lucide-react';
import { useNavigate } from '@tanstack/react-router';
import { useKindKartData } from '../../state/KindKartDataContext';
import SellerRating from '../../components/marketplace/SellerRating';

export default function MarketplacePage() {
  const navigate = useNavigate();
  const { products } = useKindKartData();

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

  const getCategoryLabel = (category: string): string => {
    const labels: Record<string, string> = {
      books: 'Books',
      electronics: 'Electronics',
      clothing: 'Clothing',
      furniture: 'Furniture',
      sports: 'Sports',
      homeAppliances: 'Home Appliances',
      toys: 'Toys',
      tools: 'Tools',
      automotive: 'Automotive',
      beauty: 'Beauty',
      other: 'Other',
    };
    return labels[category] || category;
  };

  return (
    <div className="container py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">Necessity Items Marketplace</h1>
        <div className="flex gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search necessity items..." className="pl-10" />
          </div>
          <Button variant="outline">Filters</Button>
        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <Card key={product.id.toString()}>
            <CardHeader className="p-0">
              <img
                src={product.imageUrls[0] || 'https://images.unsplash.com/photo-1560393464-5c69a73c5770?w=400'}
                alt={product.title}
                className="w-full h-48 object-cover rounded-t-lg"
              />
            </CardHeader>
            <CardContent className="p-4">
              <div className="flex items-start justify-between mb-2">
                <CardTitle className="text-lg">{product.title}</CardTitle>
                <Badge variant="secondary">{getConditionLabel(product.condition)}</Badge>
              </div>
              <CardDescription>{getCategoryLabel(product.category)}</CardDescription>
              <p className="text-2xl font-bold mt-2">₹{product.price.toString()}</p>
              <div className="mt-3">
                <SellerRating sellerId={product.seller.toString()} productId={product.id.toString()} />
              </div>
            </CardContent>
            <CardFooter className="p-4 pt-0">
              <Button 
                className="w-full"
                onClick={() => navigate({ to: '/user/product/$productId', params: { productId: product.id.toString() } })}
              >
                View Details
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
