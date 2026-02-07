import { Star } from 'lucide-react';

interface SellerRatingProps {
  sellerId: string;
  productId: string;
}

export default function SellerRating({ sellerId, productId }: SellerRatingProps) {
  // Generate deterministic dummy rating based on seller and product IDs
  const hash = (sellerId + productId).split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const rating = 3.5 + (hash % 15) / 10; // Rating between 3.5 and 5.0
  const reviewCount = 10 + (hash % 90); // Review count between 10 and 100

  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;

  return (
    <div className="flex items-center gap-2">
      <div className="flex gap-0.5">
        {Array.from({ length: fullStars }).map((_, i) => (
          <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
        ))}
        {hasHalfStar && (
          <Star className="h-4 w-4 fill-amber-400 text-amber-400" style={{ clipPath: 'inset(0 50% 0 0)' }} />
        )}
        {Array.from({ length: 5 - fullStars - (hasHalfStar ? 1 : 0) }).map((_, i) => (
          <Star key={`empty-${i}`} className="h-4 w-4 text-muted-foreground" />
        ))}
      </div>
      <span className="text-sm text-muted-foreground">
        {rating.toFixed(1)} ({reviewCount} reviews)
      </span>
    </div>
  );
}
