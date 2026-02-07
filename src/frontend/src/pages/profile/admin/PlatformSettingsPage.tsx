import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function PlatformSettingsPage() {
  return (
    <div className="container py-8 max-w-2xl">
      <h1 className="text-3xl font-bold mb-6">Platform Settings</h1>
      <Card>
        <CardHeader>
          <CardTitle>Global Configuration</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Platform-wide settings</p>
        </CardContent>
      </Card>
    </div>
  );
}
