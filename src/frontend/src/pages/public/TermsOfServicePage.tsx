import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function TermsOfServicePage() {
  return (
    <div className="container py-12 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4">Terms of Service</h1>
        <p className="text-muted-foreground">Last updated: February 7, 2026</p>
      </div>

      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>1. Acceptance of Terms</CardTitle>
          </CardHeader>
          <CardContent className="prose prose-sm max-w-none">
            <p>
              By accessing and using KindKart, you accept and agree to be bound by these Terms of Service.
              If you do not agree to these terms, please do not use our platform.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>2. User Accounts</CardTitle>
          </CardHeader>
          <CardContent className="prose prose-sm max-w-none space-y-2">
            <p>
              You are responsible for maintaining the confidentiality of your account credentials and for all
              activities that occur under your account.
            </p>
            <p>
              You must provide accurate and complete information when creating your account and keep it updated.
            </p>
            <p>
              You must be at least 18 years old to create an account and use KindKart services.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>3. Marketplace Rules</CardTitle>
          </CardHeader>
          <CardContent className="prose prose-sm max-w-none space-y-2">
            <p>
              <strong>Prohibited Items:</strong> You may not list illegal items, counterfeit goods, weapons,
              hazardous materials, or items that violate intellectual property rights.
            </p>
            <p>
              <strong>Accurate Listings:</strong> All product listings must include accurate descriptions,
              honest condition assessments, and real photos of the actual item.
            </p>
            <p>
              <strong>Pricing:</strong> Sellers are responsible for setting fair prices. KindKart provides
              AI-powered price suggestions but does not guarantee sales.
            </p>
            <p>
              <strong>Transaction Completion:</strong> Once a buyer commits to purchase, sellers must honor
              the transaction or face account penalties.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>4. Donations and NGO Verification</CardTitle>
          </CardHeader>
          <CardContent className="prose prose-sm max-w-none space-y-2">
            <p>
              <strong>Verified NGOs:</strong> KindKart verifies NGO credentials, but donors should conduct
              their own due diligence before making donations.
            </p>
            <p>
              <strong>Donation Receipts:</strong> Donation certificates are provided for record-keeping.
              Consult a tax professional regarding tax deductibility.
            </p>
            <p>
              <strong>No Refunds:</strong> Donations are final and non-refundable once processed.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>5. Delivery Services</CardTitle>
          </CardHeader>
          <CardContent className="prose prose-sm max-w-none space-y-2">
            <p>
              KindKart facilitates connections with delivery partners but is not responsible for delivery
              delays, damages, or losses during transit.
            </p>
            <p>
              Users must verify delivery partner identity using the OTP system before handing over items.
            </p>
            <p>
              Report any delivery issues within 24 hours of delivery completion.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>6. User Conduct</CardTitle>
          </CardHeader>
          <CardContent className="prose prose-sm max-w-none space-y-2">
            <p>Users must not:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Harass, threaten, or abuse other users</li>
              <li>Post false or misleading information</li>
              <li>Attempt to circumvent platform fees or policies</li>
              <li>Use automated systems to scrape or collect data</li>
              <li>Impersonate other users or entities</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>7. Intellectual Property</CardTitle>
          </CardHeader>
          <CardContent className="prose prose-sm max-w-none">
            <p>
              All content on KindKart, including logos, text, graphics, and software, is the property of
              KindKart or its licensors and is protected by copyright and trademark laws.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>8. Limitation of Liability</CardTitle>
          </CardHeader>
          <CardContent className="prose prose-sm max-w-none">
            <p>
              KindKart is provided "as is" without warranties of any kind. We are not liable for any
              indirect, incidental, or consequential damages arising from your use of the platform.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>9. Termination</CardTitle>
          </CardHeader>
          <CardContent className="prose prose-sm max-w-none">
            <p>
              We reserve the right to suspend or terminate accounts that violate these terms or engage in
              fraudulent or harmful behavior.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>10. Changes to Terms</CardTitle>
          </CardHeader>
          <CardContent className="prose prose-sm max-w-none">
            <p>
              We may update these Terms of Service from time to time. Continued use of KindKart after
              changes constitutes acceptance of the updated terms.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>11. Contact Information</CardTitle>
          </CardHeader>
          <CardContent className="prose prose-sm max-w-none">
            <p>
              For questions about these Terms of Service, please contact us through our Contact Us page
              or email support@kindkart.com.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
