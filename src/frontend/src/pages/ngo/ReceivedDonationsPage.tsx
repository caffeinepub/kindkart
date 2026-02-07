import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useKindKartData } from '../../state/KindKartDataContext';

export default function ReceivedDonationsPage() {
  const { donations } = useKindKartData();

  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold mb-6">Received Donations</h1>
      <Card>
        <CardHeader>
          <CardTitle>Donation History</CardTitle>
        </CardHeader>
        <CardContent>
          {donations.length === 0 ? (
            <p className="text-center text-muted-foreground py-8">No donations received yet</p>
          ) : (
            <div className="space-y-4">
              {donations.map((donation) => (
                <div key={donation.id} className="border rounded-lg p-4">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="font-semibold">{donation.itemName}</h3>
                      <p className="text-sm text-muted-foreground">
                        {donation.anonymous ? 'Anonymous Donor' : donation.donorName || 'Anonymous'}
                      </p>
                    </div>
                    <Badge variant="secondary">₹{donation.amount.toLocaleString()}</Badge>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {new Date(donation.timestamp).toLocaleDateString()} • Certificate: {donation.certificateId}
                  </p>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
