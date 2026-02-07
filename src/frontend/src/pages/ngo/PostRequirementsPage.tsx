import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function PostRequirementsPage() {
  return (
    <div className="container py-8 max-w-2xl">
      <h1 className="text-3xl font-bold mb-6">Post Requirements</h1>
      <Card>
        <CardHeader>
          <CardTitle>Add New Requirement</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="item">Item Name</Label>
            <Input id="item" placeholder="e.g., School Books" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="quantity">Quantity Needed</Label>
            <Input id="quantity" type="number" placeholder="e.g., 100" />
          </div>
          <Button>Post Requirement</Button>
        </CardContent>
      </Card>
    </div>
  );
}
