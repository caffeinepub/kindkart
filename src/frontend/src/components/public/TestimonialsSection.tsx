import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Star } from 'lucide-react';

export default function TestimonialsSection() {
  const testimonials = [
    {
      name: 'Priya Sharma',
      role: 'Regular Donor',
      quote: 'KindKart made it so easy to donate my old books to children who need them. The transparency and impact tracking keep me motivated to give more.',
      rating: 5,
    },
    {
      name: 'Rajesh Kumar',
      role: 'Marketplace Seller',
      quote: 'I sold my old furniture through KindKart and the process was seamless. The AI pricing helped me set a fair price, and I found a buyer within days.',
      rating: 5,
    },
    {
      name: 'Anita Desai',
      role: 'NGO Director',
      quote: 'As an NGO, KindKart has been a game-changer. We receive exactly what we need, when we need it. The platform connects us directly with generous donors.',
      rating: 5,
    },
    {
      name: 'Vikram Singh',
      role: 'Community Member',
      quote: 'The impact credits system is brilliant! It gamifies giving and makes me feel like part of a larger community working towards positive change.',
      rating: 5,
    },
  ];

  const renderStars = (rating: number) => {
    return (
      <div className="flex gap-1">
        {Array.from({ length: rating }).map((_, i) => (
          <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
        ))}
      </div>
    );
  };

  return (
    <section className="py-20">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">What Our Community Says</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Real stories from people making a difference through KindKart
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {testimonials.map((testimonial, index) => (
            <Card key={index}>
              <CardHeader>
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3 className="font-semibold">{testimonial.name}</h3>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                  </div>
                  {renderStars(testimonial.rating)}
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground italic">"{testimonial.quote}"</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
