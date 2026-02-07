import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Search } from 'lucide-react';
import { Link } from '@tanstack/react-router';

export default function BrowseProductsPublicPage() {
  const mockProducts = [
    {
      id: '1',
      title: 'iPhone 12 Pro',
      price: 45000,
      condition: 'Like New',
      category: 'Electronics',
      image: 'https://images.unsplash.com/photo-1591337676887-a217a6970a8a?w=400',
    },
    {
      id: '2',
      title: 'Wooden Study Table',
      price: 3500,
      condition: 'Good',
      category: 'Furniture',
      image: 'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?w=400',
    },
    {
      id: '3',
      title: 'Nike Running Shoes',
      price: 2800,
      condition: 'Good',
      category: 'Sports',
      image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400',
    },
  ];

  return (
    <div className="container py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">Browse Necessity Items</h1>
        <div className="flex gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search necessity items..." className="pl-10" />
          </div>
          <Button variant="outline">Filters</Button>
        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockProducts.map((product) => (
          <Card key={product.id}>
            <CardHeader className="p-0">
              <img
                src={product.image}
                alt={product.title}
                className="w-full h-48 object-cover rounded-t-lg"
              />
            </CardHeader>
            <CardContent className="p-4">
              <div className="flex items-start justify-between mb-2">
                <CardTitle className="text-lg">{product.title}</CardTitle>
                <Badge variant="secondary">{product.condition}</Badge>
              </div>
              <CardDescription>{product.category}</CardDescription>
              <p className="text-2xl font-bold mt-2">₹{product.price.toLocaleString()}</p>
            </CardContent>
            <CardFooter className="p-4 pt-0">
              <Link to="/login" className="w-full">
                <Button className="w-full">Login to View</Button>
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>

      <div className="mt-12 text-center">
        <p className="text-muted-foreground mb-4">Want to see more necessity items?</p>
        <Link to="/signup">
          <Button size="lg">Sign Up to Browse All</Button>
        </Link>
      </div>
    </div>
  );
}
