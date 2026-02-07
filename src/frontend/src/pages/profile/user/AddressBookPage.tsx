import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default function AddressBookPage() {
  return (
    <div className="container py-8 max-w-2xl">
      <h1 className="text-3xl font-bold mb-6">Address Book</h1>
      <Card>
        <CardHeader>
          <CardTitle>Saved Addresses</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground mb-4">No addresses saved yet.</p>
          <Button>Add Address</Button>
        </CardContent>
      </Card>
    </div>
  );
}
