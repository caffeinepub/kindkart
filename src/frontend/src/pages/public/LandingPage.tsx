import { Link } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight, Heart, Shield, TrendingUp, Users } from 'lucide-react';
import TestimonialsSection from '../../components/public/TestimonialsSection';

export default function LandingPage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 bg-gradient-to-b from-primary/5 to-background">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
                Resell. Donate. Make an Impact.
              </h1>
              <p className="text-xl text-muted-foreground">
                KindKart connects people who want to give with those who need. Sell your pre-loved items or donate directly to verified NGOs.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link to="/signup">
                  <Button size="lg" className="gap-2">
                    Get Started <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
                <Link to="/browse">
                  <Button size="lg" variant="outline">
                    Browse Necessity Items
                  </Button>
                </Link>
              </div>
            </div>
            <div className="relative">
              <img
                src="/assets/generated/kindkart-hero.dim_1600x900.png"
                alt="KindKart Platform"
                className="rounded-lg shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-muted/50">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose KindKart?</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              A platform built on trust, transparency, and social impact
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <CardHeader>
                <TrendingUp className="h-10 w-10 text-primary mb-2" />
                <CardTitle>AI-Powered Pricing</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Get instant price estimates based on condition, age, and market trends
                </CardDescription>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <Shield className="h-10 w-10 text-primary mb-2" />
                <CardTitle>Verified NGOs</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  All NGOs are verified to ensure your donations reach the right hands
                </CardDescription>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <Heart className="h-10 w-10 text-primary mb-2" />
                <CardTitle>Impact Credits</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Earn rewards for every donation and see your impact grow
                </CardDescription>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <Users className="h-10 w-10 text-primary mb-2" />
                <CardTitle>Safe & Secure</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Masked contacts, OTP verification, and emergency support for your safety
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <TestimonialsSection />

      {/* CTA Section */}
      <section className="py-20">
        <div className="container">
          <Card className="bg-primary text-primary-foreground">
            <CardContent className="p-12 text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Make a Difference?</h2>
              <p className="text-lg mb-8 opacity-90">
                Join thousands of users who are creating positive change through KindKart
              </p>
              <Link to="/signup">
                <Button size="lg" variant="secondary">
                  Sign Up Now
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
