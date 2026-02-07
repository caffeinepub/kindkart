import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from '@tanstack/react-router';
import { useUserProfileDraft } from '@/hooks/useUserProfileDraft';
import { Mail, Phone, MapPin, Calendar } from 'lucide-react';

export default function UserProfileViewPage() {
  const { profile } = useUserProfileDraft();

  return (
    <div className="container py-8 max-w-2xl">
      <h1 className="text-3xl font-bold mb-6">My Profile</h1>
      <Card>
        <CardHeader>
          <CardTitle>Profile Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <p className="text-sm text-muted-foreground mb-1">Name</p>
            <p className="font-medium">{profile.name}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground mb-1 flex items-center gap-2">
              <Mail className="h-4 w-4" />
              Email
            </p>
            <p className="font-medium">{profile.email}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground mb-1 flex items-center gap-2">
              <Phone className="h-4 w-4" />
              Phone
            </p>
            <p className="font-medium">{profile.phone}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground mb-1 flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              Address
            </p>
            <p className="font-medium">{profile.address}</p>
            <p className="text-sm text-muted-foreground">{profile.area}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground mb-1 flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              Member Since
            </p>
            <p className="font-medium">January 2026</p>
          </div>
          <Link to="/user/profile/edit">
            <Button>Edit Profile</Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}
