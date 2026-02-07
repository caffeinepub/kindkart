import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Star } from 'lucide-react';

interface SellerReviewSummaryProps {
  sellerId: string;
}

export default function SellerReviewSummary({ sellerId }: SellerReviewSummaryProps) {
  // Generate deterministic dummy reviews based on seller ID
  const hash = sellerId.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  
  const reviews = [
    {
      author: 'Amit P.',
      rating: 5,
      comment: 'Great seller! Item was exactly as described and delivery was prompt.',
      date: '2 weeks ago',
    },
    {
      author: 'Sneha M.',
      rating: 4,
      comment: 'Good quality product. Seller was responsive to my questions.',
      date: '1 month ago',
    },
    {
      author: 'Rahul K.',
      rating: 5,
      comment: 'Highly recommend! Very trustworthy and professional.',
      date: '1 month ago',
    },
  ];

  // Rotate reviews based on seller hash
  const rotatedReviews = [...reviews.slice(hash % 3), ...reviews.slice(0, hash % 3)].slice(0, 2);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Recent Reviews</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {rotatedReviews.map((review, index) => (
          <div key={index} className="space-y-1">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">{review.author}</span>
              <div className="flex gap-0.5">
                {Array.from({ length: review.rating }).map((_, i) => (
                  <Star key={i} className="h-3 w-3 fill-amber-400 text-amber-400" />
                ))}
              </div>
            </div>
            <p className="text-sm text-muted-foreground">{review.comment}</p>
            <p className="text-xs text-muted-foreground">{review.date}</p>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
