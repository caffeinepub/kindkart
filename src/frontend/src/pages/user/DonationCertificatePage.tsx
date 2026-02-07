import { useParams } from '@tanstack/react-router';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useKindKartData } from '../../state/KindKartDataContext';

export default function DonationCertificatePage() {
  const { donationId } = useParams({ from: '/authenticated/user/certificate/$donationId' });
  const { donations } = useKindKartData();
  
  const donation = donations.find((d) => d.id === donationId);

  return (
    <div className="container py-8 max-w-3xl">
      <Card className="border-4 border-primary">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl">Certificate of Donation</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6 p-8">
          <div className="text-center space-y-4">
            <p className="text-lg">This certifies that</p>
            <p className="text-2xl font-bold">{donation?.anonymous ? 'Anonymous Donor' : 'You'}</p>
            <p className="text-lg">has generously donated</p>
            <p className="text-3xl font-bold text-primary">₹{donation?.amount}</p>
            <p className="text-lg">to</p>
            <p className="text-2xl font-bold">{donation?.ngoName}</p>
            <Badge className="mt-4">Certificate ID: {donation?.certificateId}</Badge>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
