import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Loader2, Mail, Phone, Info } from 'lucide-react';
import { toast } from 'sonner';
import { Alert, AlertDescription } from '@/components/ui/alert';

type IdentifierType = 'phone' | 'email';

interface PhoneEmailOtpFlowProps {
  onSuccess: () => void;
  submitButtonText?: string;
}

export default function PhoneEmailOtpFlow({ onSuccess, submitButtonText = 'Continue' }: PhoneEmailOtpFlowProps) {
  const [step, setStep] = useState<'identifier' | 'otp'>('identifier');
  const [identifierType, setIdentifierType] = useState<IdentifierType>('email');
  const [identifier, setIdentifier] = useState('');
  const [otp, setOtp] = useState('');
  const [isSendingOtp, setIsSendingOtp] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [otpError, setOtpError] = useState('');

  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!identifier.trim()) {
      toast.error(`Please enter your ${identifierType}`);
      return;
    }

    // Basic validation
    if (identifierType === 'email' && !identifier.includes('@')) {
      toast.error('Please enter a valid email address');
      return;
    }

    if (identifierType === 'phone' && identifier.length < 10) {
      toast.error('Please enter a valid phone number');
      return;
    }

    setIsSendingOtp(true);
    
    // Simulate sending OTP
    await new Promise(resolve => setTimeout(resolve, 800));
    
    setIsSendingOtp(false);
    setStep('otp');
    toast.success('OTP sent successfully!');
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setOtpError('');

    if (otp !== '123456') {
      setOtpError('Invalid OTP. Please try again.');
      return;
    }

    setIsVerifying(true);
    
    // Simulate verification
    await new Promise(resolve => setTimeout(resolve, 600));
    
    setIsVerifying(false);
    toast.success('Verification successful!');
    onSuccess();
  };

  if (step === 'otp') {
    return (
      <form onSubmit={handleVerifyOtp} className="space-y-4">
        <Alert>
          <Info className="h-4 w-4" />
          <AlertDescription>
            <strong>Test OTP: 123456</strong>
            <br />
            <span className="text-xs">Use this OTP to verify your account</span>
          </AlertDescription>
        </Alert>

        <div className="space-y-2">
          <Label htmlFor="otp">Enter OTP</Label>
          <Input
            id="otp"
            type="text"
            placeholder="Enter 6-digit OTP"
            value={otp}
            onChange={(e) => {
              setOtp(e.target.value);
              setOtpError('');
            }}
            maxLength={6}
            required
            className={otpError ? 'border-destructive' : ''}
          />
          {otpError && (
            <p className="text-sm text-destructive">{otpError}</p>
          )}
          <p className="text-xs text-muted-foreground">
            OTP sent to {identifierType === 'email' ? identifier : `+${identifier}`}
          </p>
        </div>

        <div className="flex gap-2">
          <Button
            type="button"
            variant="outline"
            onClick={() => {
              setStep('identifier');
              setOtp('');
              setOtpError('');
            }}
            className="flex-1"
          >
            Back
          </Button>
          <Button type="submit" disabled={isVerifying || otp.length !== 6} className="flex-1">
            {isVerifying ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Verifying...
              </>
            ) : (
              'Verify OTP'
            )}
          </Button>
        </div>
      </form>
    );
  }

  return (
    <form onSubmit={handleSendOtp} className="space-y-4">
      <div className="space-y-3">
        <Label>Login with</Label>
        <RadioGroup value={identifierType} onValueChange={(value) => setIdentifierType(value as IdentifierType)}>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="email" id="email" />
            <Label htmlFor="email" className="flex items-center gap-2 cursor-pointer font-normal">
              <Mail className="h-4 w-4" />
              Email
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="phone" id="phone" />
            <Label htmlFor="phone" className="flex items-center gap-2 cursor-pointer font-normal">
              <Phone className="h-4 w-4" />
              Phone
            </Label>
          </div>
        </RadioGroup>
      </div>

      <div className="space-y-2">
        <Label htmlFor="identifier">
          {identifierType === 'email' ? 'Email Address' : 'Phone Number'}
        </Label>
        <Input
          id="identifier"
          type={identifierType === 'email' ? 'email' : 'tel'}
          placeholder={identifierType === 'email' ? 'Enter your email' : 'Enter your phone number'}
          value={identifier}
          onChange={(e) => setIdentifier(e.target.value)}
          required
        />
      </div>

      <Button type="submit" disabled={isSendingOtp} className="w-full" size="lg">
        {isSendingOtp ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Sending OTP...
          </>
        ) : (
          submitButtonText
        )}
      </Button>
    </form>
  );
}
