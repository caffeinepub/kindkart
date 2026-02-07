import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function NGOProfilePage() {
  return (
    <div className="container py-8 max-w-2xl">
      <h1 className="text-3xl font-bold mb-6">NGO Profile</h1>
      <Card>
        <CardHeader>
          <CardTitle>Organization Information</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">NGO profile details</p>
        </CardContent>
      </Card>
    </div>
  );
}
