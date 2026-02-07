import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

export default function ListingsModerationPage() {
  const mockFlaggedListings = [
    {
      id: '1',
      title: 'Suspicious Electronics Bundle',
      reason: 'Potential counterfeit',
      severity: 'High',
      reportedDate: '2026-02-04',
      reportedBy: 'User #1234',
    },
    {
      id: '2',
      title: 'Damaged Furniture Set',
      reason: 'Misleading condition description',
      severity: 'Medium',
      reportedDate: '2026-02-05',
      reportedBy: 'User #5678',
    },
    {
      id: '3',
      title: 'Incomplete Tool Kit',
      reason: 'Missing items from description',
      severity: 'Low',
      reportedDate: '2026-02-06',
      reportedBy: 'User #9012',
    },
  ];

  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold mb-6">Listings Moderation</h1>
      <Card>
        <CardHeader>
          <CardTitle>Flagged Listings</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockFlaggedListings.map((listing) => (
              <div key={listing.id} className="border rounded-lg p-4">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="font-semibold">{listing.title}</h3>
                    <p className="text-sm text-muted-foreground">{listing.reason}</p>
                  </div>
                  <Badge
                    variant={
                      listing.severity === 'High'
                        ? 'destructive'
                        : listing.severity === 'Medium'
                        ? 'default'
                        : 'secondary'
                    }
                  >
                    {listing.severity}
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground mb-3">
                  Reported by {listing.reportedBy} on {new Date(listing.reportedDate).toLocaleDateString()}
                </p>
                <div className="flex gap-2">
                  <Button size="sm" variant="default">Review Listing</Button>
                  <Button size="sm" variant="outline">Contact Seller</Button>
                  <Button size="sm" variant="destructive">Remove Listing</Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
