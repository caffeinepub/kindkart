import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useRewards } from '../../state/RewardsContext';
import { useKindKartData } from '../../state/KindKartDataContext';

export default function UserDashboardPage() {
  const { impactCredits, badges } = useRewards();
  const { products, donations, savedProducts, purchases } = useKindKartData();

  const getSavedProductDetails = (productId: string) => {
    return products.find((p) => p.id.toString() === productId);
  };

  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold mb-6">My Dashboard</h1>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="listings">My Listings</TabsTrigger>
          <TabsTrigger value="purchases">My Purchases</TabsTrigger>
          <TabsTrigger value="donations">My Donations</TabsTrigger>
          <TabsTrigger value="credits">Impact Credits</TabsTrigger>
          <TabsTrigger value="saved">Saved Products</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Impact Credits</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-4xl font-bold text-primary">{impactCredits}</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Active Listings</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-4xl font-bold">{products.length}</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Total Donations</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-4xl font-bold">{donations.length}</p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="listings">
          <Card>
            <CardHeader>
              <CardTitle>My Listings</CardTitle>
              <CardDescription>Products you've listed for sale</CardDescription>
            </CardHeader>
            <CardContent>
              {products.length === 0 ? (
                <p className="text-center text-muted-foreground py-8">No listings yet</p>
              ) : (
                <div className="space-y-4">
                  {products.map((product) => (
                    <div key={product.id.toString()} className="border rounded-lg p-4">
                      <h3 className="font-semibold">{product.title}</h3>
                      <p className="text-sm text-muted-foreground">{product.description}</p>
                      <p className="text-lg font-bold mt-2">₹{product.price.toString()}</p>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="purchases">
          <Card>
            <CardHeader>
              <CardTitle>My Purchases</CardTitle>
              <CardDescription>Items you've purchased</CardDescription>
            </CardHeader>
            <CardContent>
              {purchases.length === 0 ? (
                <p className="text-center text-muted-foreground py-8">No purchases yet</p>
              ) : (
                <div className="space-y-4">
                  {purchases.map((purchase) => (
                    <div key={purchase.id} className="border rounded-lg p-4 flex items-center justify-between">
                      <div>
                        <h3 className="font-semibold">{purchase.productName}</h3>
                        <p className="text-sm text-muted-foreground">
                          {new Date(purchase.timestamp).toLocaleDateString()}
                        </p>
                        <p className="text-lg font-bold mt-1">₹{purchase.amount}</p>
                      </div>
                      <Badge variant={purchase.status === 'completed' ? 'default' : 'secondary'}>
                        {purchase.status}
                      </Badge>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="donations">
          <Card>
            <CardHeader>
              <CardTitle>My Donations</CardTitle>
              <CardDescription>Your contribution history</CardDescription>
            </CardHeader>
            <CardContent>
              {donations.length === 0 ? (
                <p className="text-center text-muted-foreground py-8">No donations yet</p>
              ) : (
                <div className="space-y-4">
                  {donations.map((donation) => (
                    <div key={donation.id} className="border rounded-lg p-4">
                      <h3 className="font-semibold">{donation.ngoName}</h3>
                      <p className="text-sm text-muted-foreground">{donation.itemName}</p>
                      <p className="text-lg font-bold mt-2">₹{donation.amount}</p>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="credits">
          <Card>
            <CardHeader>
              <CardTitle>Impact Credits & Badges</CardTitle>
              <CardDescription>Your rewards and achievements</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <p className="text-5xl font-bold text-primary mb-2">{impactCredits}</p>
                  <p className="text-muted-foreground">Total Impact Credits</p>
                </div>
                <div>
                  <h3 className="font-semibold mb-4">Badges Earned</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {badges.map((badge) => (
                      <div key={badge.id} className="text-center p-4 border rounded-lg">
                        <div className="text-4xl mb-2">{badge.icon}</div>
                        <p className="font-medium text-sm">{badge.name}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="saved">
          <Card>
            <CardHeader>
              <CardTitle>Saved Products</CardTitle>
              <CardDescription>Products you've bookmarked</CardDescription>
            </CardHeader>
            <CardContent>
              {savedProducts.length === 0 ? (
                <p className="text-center text-muted-foreground py-8">No saved products</p>
              ) : (
                <div className="space-y-4">
                  {savedProducts.map((saved) => {
                    const product = getSavedProductDetails(saved.productId);
                    if (!product) return null;
                    return (
                      <div key={saved.productId} className="border rounded-lg p-4">
                        <h3 className="font-semibold">{product.title}</h3>
                        <p className="text-sm text-muted-foreground line-clamp-2">{product.description}</p>
                        <p className="text-lg font-bold mt-2">₹{product.price.toString()}</p>
                      </div>
                    );
                  })}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
