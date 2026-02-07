import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Separator } from '@/components/ui/separator';
import { toast } from 'sonner';
import PaymentDetailsPanel from './PaymentDetailsPanel';

interface CheckoutIntentDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  product: {
    id: bigint;
    title: string;
    price: bigint;
    imageUrls: string[];
  };
}

export default function CheckoutIntentDialog({ open, onOpenChange, product }: CheckoutIntentDialogProps) {
  const [step, setStep] = useState<'intent' | 'anonymity' | 'confirm'>('intent');
  const [intent, setIntent] = useState<'buy' | 'donate' | null>(null);
  const [anonymity, setAnonymity] = useState<'anonymous' | 'show-name' | null>(null);

  const handleIntentSelect = (value: 'buy' | 'donate') => {
    setIntent(value);
    if (value === 'donate') {
      setStep('anonymity');
    } else {
      setAnonymity(null);
      setStep('confirm');
    }
  };

  const handleAnonymitySelect = (value: 'anonymous' | 'show-name') => {
    setAnonymity(value);
    setStep('confirm');
  };

  const handleConfirm = () => {
    toast.success(intent === 'buy' ? 'Purchase initiated!' : 'Donation initiated!');
    onOpenChange(false);
    // Reset state
    setTimeout(() => {
      setStep('intent');
      setIntent(null);
      setAnonymity(null);
    }, 300);
  };

  const handleBack = () => {
    if (step === 'confirm' && intent === 'donate') {
      setStep('anonymity');
    } else if (step === 'anonymity' || step === 'confirm') {
      setStep('intent');
      setIntent(null);
      setAnonymity(null);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>
            {step === 'intent' && 'Choose Your Action'}
            {step === 'anonymity' && 'Donation Preference'}
            {step === 'confirm' && 'Confirm Details'}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {step === 'intent' && (
            <RadioGroup value={intent || ''} onValueChange={(v) => handleIntentSelect(v as 'buy' | 'donate')}>
              <div className="flex items-center space-x-2 border rounded-lg p-4 cursor-pointer hover:bg-muted/50">
                <RadioGroupItem value="buy" id="buy" />
                <Label htmlFor="buy" className="flex-1 cursor-pointer">
                  <div className="font-medium">Buy for Yourself</div>
                  <div className="text-sm text-muted-foreground">Purchase this item for personal use</div>
                </Label>
              </div>
              <div className="flex items-center space-x-2 border rounded-lg p-4 cursor-pointer hover:bg-muted/50">
                <RadioGroupItem value="donate" id="donate" />
                <Label htmlFor="donate" className="flex-1 cursor-pointer">
                  <div className="font-medium">Donate to NGO</div>
                  <div className="text-sm text-muted-foreground">Purchase and donate to someone in need</div>
                </Label>
              </div>
            </RadioGroup>
          )}

          {step === 'anonymity' && (
            <RadioGroup value={anonymity || ''} onValueChange={(v) => handleAnonymitySelect(v as 'anonymous' | 'show-name')}>
              <div className="flex items-center space-x-2 border rounded-lg p-4 cursor-pointer hover:bg-muted/50">
                <RadioGroupItem value="anonymous" id="anonymous" />
                <Label htmlFor="anonymous" className="flex-1 cursor-pointer">
                  <div className="font-medium">Donate Anonymously</div>
                  <div className="text-sm text-muted-foreground">Your name will not be shown</div>
                </Label>
              </div>
              <div className="flex items-center space-x-2 border rounded-lg p-4 cursor-pointer hover:bg-muted/50">
                <RadioGroupItem value="show-name" id="show-name" />
                <Label htmlFor="show-name" className="flex-1 cursor-pointer">
                  <div className="font-medium">Show My Name</div>
                  <div className="text-sm text-muted-foreground">Your donation will be publicly acknowledged</div>
                </Label>
              </div>
            </RadioGroup>
          )}

          {step === 'confirm' && (
            <div className="space-y-4">
              <div className="flex gap-4">
                <img 
                  src={product.imageUrls[0] || 'https://images.unsplash.com/photo-1560393464-5c69a73c5770?w=100'} 
                  alt={product.title}
                  className="w-20 h-20 object-cover rounded"
                />
                <div className="flex-1">
                  <h3 className="font-medium">{product.title}</h3>
                  <p className="text-sm text-muted-foreground">
                    {intent === 'buy' ? 'Purchase' : 'Donation'}
                  </p>
                  {intent === 'donate' && (
                    <p className="text-sm text-muted-foreground">
                      {anonymity === 'anonymous' ? 'Anonymous Donor' : 'Public Donor'}
                    </p>
                  )}
                </div>
              </div>

              <Separator />

              <PaymentDetailsPanel 
                amount={Number(product.price)}
                intent={intent!}
                anonymity={anonymity}
              />
            </div>
          )}
        </div>

        <DialogFooter>
          {step !== 'intent' && (
            <Button variant="outline" onClick={handleBack}>
              Back
            </Button>
          )}
          {step === 'confirm' && (
            <Button onClick={handleConfirm}>
              Confirm {intent === 'buy' ? 'Purchase' : 'Donation'}
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
