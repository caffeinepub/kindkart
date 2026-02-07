import { useState } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useSession, UserRole } from '../../state/SessionContext';
import { Link } from '@tanstack/react-router';
import PhoneEmailOtpFlow from '../../components/auth/PhoneEmailOtpFlow';

export default function SignUpPage() {
  const { startSession, setRole } = useSession();
  const navigate = useNavigate();
  const [showOtpFlow, setShowOtpFlow] = useState(false);
  const [selectedRole, setSelectedRole] = useState<UserRole>('User');

  const handleContinueToOtp = () => {
    setShowOtpFlow(true);
  };

  const handleOtpSuccess = () => {
    startSession();
    setRole(selectedRole);
    
    // Navigate based on role
    switch (selectedRole) {
      case 'User':
        navigate({ to: '/user/home' });
        break;
      case 'NGO':
        navigate({ to: '/ngo/dashboard' });
        break;
      case 'DeliveryPartner':
        navigate({ to: '/delivery/pickups' });
        break;
      case 'Admin':
        navigate({ to: '/admin/dashboard' });
        break;
    }
  };

  if (showOtpFlow) {
    return (
      <div className="container flex items-center justify-center min-h-[calc(100vh-4rem)] py-12">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Verify Your Identity</CardTitle>
            <CardDescription>Enter your phone or email to receive an OTP</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <PhoneEmailOtpFlow onSuccess={handleOtpSuccess} submitButtonText="Send OTP" />

            <Button
              variant="outline"
              onClick={() => setShowOtpFlow(false)}
              className="w-full"
            >
              Back to Role Selection
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container flex items-center justify-center min-h-[calc(100vh-4rem)] py-12">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Join KindKart</CardTitle>
          <CardDescription>Create your account and start making an impact</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="role">I want to join as</Label>
            <Select value={selectedRole} onValueChange={(value) => setSelectedRole(value as UserRole)}>
              <SelectTrigger id="role">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="User">User (Buyer/Seller/Donor)</SelectItem>
                <SelectItem value="NGO">NGO</SelectItem>
                <SelectItem value="DeliveryPartner">Delivery Partner</SelectItem>
                <SelectItem value="Admin">Admin</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button onClick={handleContinueToOtp} className="w-full" size="lg">
            Continue
          </Button>

          <div className="text-center text-sm text-muted-foreground">
            Already have an account?{' '}
            <Link to="/login" className="text-primary hover:underline">
              Login
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
