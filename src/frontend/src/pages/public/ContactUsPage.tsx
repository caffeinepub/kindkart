import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Mail, Phone, Clock, MessageCircle } from 'lucide-react';

export default function ContactUsPage() {
  return (
    <div className="container py-12 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4">Contact Us</h1>
        <p className="text-lg text-muted-foreground">
          We're here to help! Reach out to us through any of the following channels.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <Mail className="h-6 w-6 text-primary" />
              <CardTitle>Email Support</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            <div>
              <p className="text-sm font-medium">General Inquiries</p>
              <a
                href="mailto:support@kindkart.com"
                className="text-sm text-primary hover:underline"
              >
                support@kindkart.com
              </a>
            </div>
            <div>
              <p className="text-sm font-medium">NGO Verification</p>
              <a
                href="mailto:ngo@kindkart.com"
                className="text-sm text-primary hover:underline"
              >
                ngo@kindkart.com
              </a>
            </div>
            <div>
              <p className="text-sm font-medium">Partnership Inquiries</p>
              <a
                href="mailto:partnerships@kindkart.com"
                className="text-sm text-primary hover:underline"
              >
                partnerships@kindkart.com
              </a>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <Phone className="h-6 w-6 text-primary" />
              <CardTitle>Phone Support</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            <div>
              <p className="text-sm font-medium">Customer Support</p>
              <a
                href="tel:+911800123456"
                className="text-sm text-primary hover:underline"
              >
                +91 1800 123 456
              </a>
            </div>
            <div>
              <p className="text-sm font-medium">Emergency Support (24/7)</p>
              <a
                href="tel:+911800911911"
                className="text-sm text-primary hover:underline"
              >
                +91 1800 911 911
              </a>
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              Toll-free within India
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <Clock className="h-6 w-6 text-primary" />
              <CardTitle>Support Hours</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-2">
            <div>
              <p className="text-sm font-medium">Regular Support</p>
              <p className="text-sm text-muted-foreground">
                Monday - Friday: 9:00 AM - 6:00 PM IST
              </p>
              <p className="text-sm text-muted-foreground">
                Saturday: 10:00 AM - 4:00 PM IST
              </p>
              <p className="text-sm text-muted-foreground">
                Sunday: Closed
              </p>
            </div>
            <div className="pt-2">
              <p className="text-sm font-medium">Emergency Support</p>
              <p className="text-sm text-muted-foreground">
                Available 24/7 for urgent safety issues
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <MessageCircle className="h-6 w-6 text-primary" />
              <CardTitle>In-App Support</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            <p className="text-sm">
              For the fastest response, use our in-app support features:
            </p>
            <ul className="text-sm space-y-2 list-disc pl-5">
              <li>Live chat with support agents (when logged in)</li>
              <li>Help Center with FAQs and guides</li>
              <li>Report issues directly from listings or profiles</li>
              <li>Emergency support button in your profile</li>
            </ul>
          </CardContent>
        </Card>
      </div>

      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Frequently Asked Questions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <p className="font-medium text-sm">How do I report a suspicious listing?</p>
            <p className="text-sm text-muted-foreground">
              Click the "Report" button on any listing page, or contact our support team directly.
            </p>
          </div>
          <div>
            <p className="font-medium text-sm">How long does NGO verification take?</p>
            <p className="text-sm text-muted-foreground">
              NGO verification typically takes 3-5 business days. You'll receive email updates on your
              application status.
            </p>
          </div>
          <div>
            <p className="font-medium text-sm">What should I do if I feel unsafe during a transaction?</p>
            <p className="text-sm text-muted-foreground">
              Immediately contact our emergency support line at +91 1800 911 911 or use the emergency
              button in your profile.
            </p>
          </div>
          <div>
            <p className="font-medium text-sm">How can I become a delivery partner?</p>
            <p className="text-sm text-muted-foreground">
              Email partnerships@kindkart.com with your details, and our team will guide you through
              the onboarding process.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
