import { useParams, useNavigate } from '@tanstack/react-router';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle2 } from 'lucide-react';

export default function DonationSuccessPage() {
  const { donationId } = useParams({ from: '/authenticated/user/donate/success/$donationId' });
  const navigate = useNavigate();

  return (
    <div className="container py-12 max-w-2xl">
      <Card>
        <CardHeader className="text-center">
          <CheckCircle2 className="h-16 w-16 text-green-500 mx-auto mb-4" />
          <CardTitle className="text-2xl">Donation Successful!</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6 text-center">
          <p className="text-muted-foreground">
            Thank you for your generous donation. You've earned impact credits!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              variant="outline"
              onClick={() => navigate({ to: '/user/certificate/$donationId', params: { donationId } })}
            >
              View Certificate
            </Button>
            <Button onClick={() => navigate({ to: '/user/dashboard' })}>
              Go to Dashboard
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
