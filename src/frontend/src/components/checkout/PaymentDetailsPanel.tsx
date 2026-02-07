import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';

interface PaymentDetailsPanelProps {
  amount: number;
  intent: 'buy' | 'donate';
  anonymity?: 'anonymous' | 'show-name' | null;
}

export default function PaymentDetailsPanel({ amount, intent, anonymity }: PaymentDetailsPanelProps) {
  const platformFee = Math.round(amount * 0.05); // 5% platform fee
  const deliveryFee = intent === 'buy' ? 50 : 0; // ₹50 delivery for purchases
  const total = amount + platformFee + deliveryFee;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Payment Details</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex justify-between text-sm">
          <span>Item Amount</span>
          <span className="font-medium">₹{amount.toLocaleString()}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span>Platform Fee</span>
          <span className="font-medium">₹{platformFee.toLocaleString()}</span>
        </div>
        {deliveryFee > 0 && (
          <div className="flex justify-between text-sm">
            <span>Delivery Fee</span>
            <span className="font-medium">₹{deliveryFee.toLocaleString()}</span>
          </div>
        )}
        <Separator />
        <div className="flex justify-between font-semibold">
          <span>Total</span>
          <span>₹{total.toLocaleString()}</span>
        </div>
        <Separator />
        <div className="space-y-2 pt-2">
          <div className="text-sm font-medium">
            {intent === 'buy' ? 'Buyer Information' : 'Donor Information'}
          </div>
          <div className="text-sm text-muted-foreground">
            {intent === 'buy' ? (
              <>
                <p>Delivery to: Default Address</p>
                <p>Payment Method: Cash on Delivery</p>
              </>
            ) : (
              <>
                <p>Donation Type: {anonymity === 'anonymous' ? 'Anonymous' : 'Public'}</p>
                <p>Recipient: Verified NGO Partner</p>
                {anonymity === 'show-name' && (
                  <Badge variant="secondary" className="mt-1">Your name will be shown</Badge>
                )}
              </>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
