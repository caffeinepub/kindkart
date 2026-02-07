import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Package, Heart, Truck, Shield } from 'lucide-react';

export default function HowItWorksPage() {
  return (
    <div className="container py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">How KindKart Works</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          A simple, secure platform for reselling and donating
        </p>
      </div>

      {/* Steps */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
        <Card>
          <CardHeader>
            <Package className="h-12 w-12 text-primary mb-4" />
            <CardTitle>1. List Your Item</CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription>
              Upload photos, and our AI will detect the category and suggest a price range based on condition and market trends.
            </CardDescription>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <Heart className="h-12 w-12 text-primary mb-4" />
            <CardTitle>2. Sell or Donate</CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription>
              Choose to sell your item or donate it directly to a verified NGO. You can also buy products to donate.
            </CardDescription>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <Truck className="h-12 w-12 text-primary mb-4" />
            <CardTitle>3. Safe Delivery</CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription>
              Our verified delivery partners handle pickup and delivery with OTP confirmation and real-time tracking.
            </CardDescription>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <Shield className="h-12 w-12 text-primary mb-4" />
            <CardTitle>4. Earn Impact Credits</CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription>
              Every donation earns you impact credits and badges. Track your contribution on the leaderboard.
            </CardDescription>
          </CardContent>
        </Card>
      </div>

      {/* FAQ */}
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl font-bold mb-6 text-center">Frequently Asked Questions</h2>
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger>How does AI pricing work?</AccordionTrigger>
            <AccordionContent>
              Our AI analyzes your product images, condition, age, and current market trends to suggest an optimal price range. You can set your final price within this range.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-2">
            <AccordionTrigger>Are NGOs verified?</AccordionTrigger>
            <AccordionContent>
              Yes, all NGOs on KindKart go through a rigorous verification process. We verify their registration documents, bank details, and track record before listing them on the platform.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-3">
            <AccordionTrigger>How does delivery work?</AccordionTrigger>
            <AccordionContent>
              Once a sale or donation is confirmed, our verified delivery partners schedule a pickup. You can track the delivery in real-time, and final delivery requires OTP confirmation for security.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-4">
            <AccordionTrigger>What are impact credits?</AccordionTrigger>
            <AccordionContent>
              Impact credits are rewards you earn for every donation you make. They reflect your contribution to the community and help you climb the leaderboard. You also earn badges for milestones!
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-5">
            <AccordionTrigger>Is my personal information safe?</AccordionTrigger>
            <AccordionContent>
              Absolutely. We use masked phone numbers for all communications, OTP verification for deliveries, and have emergency support features. Your safety is our priority.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
}
