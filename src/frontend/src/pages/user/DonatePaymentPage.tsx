import { useState } from 'react';
import { useParams, useNavigate } from '@tanstack/react-router';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { useKindKartData } from '../../state/KindKartDataContext';
import { useRewards } from '../../state/RewardsContext';
import PaymentDetailsPanel from '../../components/checkout/PaymentDetailsPanel';

export default function DonatePaymentPage() {
  const { ngoId } = useParams({ from: '/authenticated/user/donate/payment/$ngoId' });
  const navigate = useNavigate();
  const { ngos, addDonation } = useKindKartData();
  const { addCredits } = useRewards();
  const [amount, setAmount] = useState('');
  const [anonymous, setAnonymous] = useState(false);
  const [loading, setLoading] = useState(false);

  const ngo = ngos.find((n) => n.id === ngoId);

  const handleDonate = async () => {
    if (!amount || parseFloat(amount) <= 0) {
      toast.error('Please enter a valid amount');
      return;
    }

    setLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      
      const donationId = `donation-${Date.now()}`;
      const donation = {
        id: donationId,
        ngoId: ngoId!,
        ngoName: ngo?.name || 'NGO',
        amount: parseFloat(amount),
        itemName: 'General Donation',
        anonymous,
        timestamp: Date.now(),
        certificateId: `cert-${Date.now()}`,
      };
      
      addDonation(donation);
      addCredits(Math.floor(parseFloat(amount) / 10));
      toast.success('Donation successful!');
      navigate({ to: '/user/donate/success/$donationId', params: { donationId } });
    } catch (error) {
      toast.error('Donation failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container py-8 max-w-2xl">
      <Card>
        <CardHeader>
          <CardTitle>Donate to {ngo?.name}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="amount">Donation Amount (₹)</Label>
            <Input
              id="amount"
              type="number"
              placeholder="Enter amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>

          <div className="flex items-center justify-between">
            <Label htmlFor="anonymous">Donate Anonymously</Label>
            <Switch id="anonymous" checked={anonymous} onCheckedChange={setAnonymous} />
          </div>

          {amount && parseFloat(amount) > 0 && (
            <>
              <Separator />
              <PaymentDetailsPanel 
                amount={parseFloat(amount)}
                intent="donate"
                anonymity={anonymous ? 'anonymous' : 'show-name'}
              />
            </>
          )}

          <Button onClick={handleDonate} disabled={loading || !amount || parseFloat(amount) <= 0} className="w-full" size="lg">
            {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
            Complete Donation
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
