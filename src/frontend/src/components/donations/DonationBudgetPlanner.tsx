import { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { IndianRupee } from 'lucide-react';
import { useKindKartData } from '../../state/KindKartDataContext';

export default function DonationBudgetPlanner() {
  const [budget, setBudget] = useState<string>('');
  const { products } = useKindKartData();

  const recommendedItems = useMemo(() => {
    if (!budget || parseFloat(budget) <= 0) return [];

    const budgetAmount = parseFloat(budget);
    
    // Filter and sort products that fit within budget
    return products
      .filter((p) => Number(p.price) <= budgetAmount)
      .sort((a, b) => Number(b.price) - Number(a.price))
      .slice(0, 6);
  }, [budget, products]);

  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle>Set Your Donation Budget</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="budget">Budget Amount (₹)</Label>
          <div className="relative">
            <IndianRupee className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              id="budget"
              type="number"
              placeholder="Enter your budget"
              value={budget}
              onChange={(e) => setBudget(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {recommendedItems.length > 0 && (
          <div className="space-y-3 pt-4">
            <div className="flex items-center justify-between">
              <h3 className="font-medium">Recommended Necessity Items</h3>
              <Badge variant="secondary">{recommendedItems.length} items</Badge>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {recommendedItems.map((item) => (
                <div key={item.id.toString()} className="border rounded-lg p-3 space-y-1">
                  <p className="text-sm font-medium truncate">{item.title}</p>
                  <p className="text-lg font-bold text-primary">₹{item.price.toString()}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {budget && parseFloat(budget) > 0 && recommendedItems.length === 0 && (
          <p className="text-sm text-muted-foreground text-center py-4">
            No items found within your budget. Try increasing the amount.
          </p>
        )}
      </CardContent>
    </Card>
  );
}
