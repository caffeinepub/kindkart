import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CheckCircle2 } from 'lucide-react';
import { Link } from '@tanstack/react-router';

export default function NGODirectoryPublicPage() {
  const mockNGOs = [
    {
      id: '1',
      name: 'Hope Foundation',
      description: 'Supporting underprivileged children with education and basic needs',
      category: 'Education',
      verified: true,
      needs: ['School Books', 'Laptops'],
    },
    {
      id: '2',
      name: 'Green Earth Initiative',
      description: 'Environmental conservation and sustainability programs',
      category: 'Environment',
      verified: true,
      needs: ['Recycling Equipment'],
    },
    {
      id: '3',
      name: 'Shelter for All',
      description: 'Providing housing and support for homeless families',
      category: 'Housing',
      verified: true,
      needs: ['Beds', 'Blankets', 'Kitchen Appliances'],
    },
  ];

  return (
    <div className="container py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">NGO Directory</h1>
        <p className="text-muted-foreground">
          Discover verified NGOs and see how you can help make a difference
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockNGOs.map((ngo) => (
          <Card key={ngo.id}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <CardTitle className="text-xl">{ngo.name}</CardTitle>
                {ngo.verified && (
                  <Badge variant="secondary" className="gap-1">
                    <CheckCircle2 className="h-3 w-3" />
                    Verified
                  </Badge>
                )}
              </div>
              <CardDescription>{ngo.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div>
                  <p className="text-sm font-medium mb-2">Category</p>
                  <Badge>{ngo.category}</Badge>
                </div>
                <div>
                  <p className="text-sm font-medium mb-2">Current Needs</p>
                  <div className="flex flex-wrap gap-2">
                    {ngo.needs.map((need) => (
                      <Badge key={need} variant="outline">
                        {need}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-12 text-center">
        <p className="text-muted-foreground mb-4">Ready to make a donation?</p>
        <Link to="/signup">
          <Button size="lg">Sign Up to Donate</Button>
        </Link>
      </div>
    </div>
  );
}
