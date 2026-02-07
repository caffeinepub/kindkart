import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Shield, AlertTriangle, CheckCircle, Phone } from 'lucide-react';

export default function SafetyGuidelinesPage() {
  return (
    <div className="container py-12 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4">Safety Guidelines</h1>
        <p className="text-lg text-muted-foreground">
          Your safety is our priority. Please read and follow these guidelines when using KindKart.
        </p>
      </div>

      <div className="space-y-6">
        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <Shield className="h-6 w-6 text-primary" />
              <CardTitle>Marketplace Safety</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex gap-2">
              <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
              <p className="text-sm">Always meet in public, well-lit places for product exchanges</p>
            </div>
            <div className="flex gap-2">
              <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
              <p className="text-sm">Verify product condition before completing the transaction</p>
            </div>
            <div className="flex gap-2">
              <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
              <p className="text-sm">Use our in-app messaging to keep communication secure</p>
            </div>
            <div className="flex gap-2">
              <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
              <p className="text-sm">Never share personal banking details outside the platform</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <AlertTriangle className="h-6 w-6 text-amber-600" />
              <CardTitle>Donation Safety</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex gap-2">
              <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
              <p className="text-sm">Only donate to verified NGOs with the verified badge</p>
            </div>
            <div className="flex gap-2">
              <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
              <p className="text-sm">Review NGO profiles and their requirements before donating</p>
            </div>
            <div className="flex gap-2">
              <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
              <p className="text-sm">Keep your donation certificates for tax purposes</p>
            </div>
            <div className="flex gap-2">
              <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
              <p className="text-sm">Report any suspicious NGO activity to our support team</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <Phone className="h-6 w-6 text-primary" />
              <CardTitle>Delivery Safety</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex gap-2">
              <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
              <p className="text-sm">Verify delivery partner identity using the OTP system</p>
            </div>
            <div className="flex gap-2">
              <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
              <p className="text-sm">Inspect items before accepting delivery</p>
            </div>
            <div className="flex gap-2">
              <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
              <p className="text-sm">Track your delivery in real-time through the app</p>
            </div>
            <div className="flex gap-2">
              <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
              <p className="text-sm">Contact support immediately if you feel unsafe during delivery</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Reporting Issues</CardTitle>
            <CardDescription>
              If you encounter any safety concerns or suspicious activity, please report it immediately
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <p className="text-sm">
              <strong>Emergency Support:</strong> Available 24/7 through your profile
            </p>
            <p className="text-sm">
              <strong>Report User:</strong> Use the report button on user profiles or listings
            </p>
            <p className="text-sm">
              <strong>Contact Support:</strong> Reach out via our contact page for non-urgent issues
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
