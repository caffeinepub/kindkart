import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Mail, Phone, MapPin, Briefcase, Clock } from 'lucide-react';

export default function AdminProfilePage() {
  const adminProfile = {
    name: 'Priya Sharma',
    email: 'priya.sharma@kindkart.com',
    phone: '+91 98765 00001',
    department: 'Platform Operations',
    officeLocation: 'KindKart HQ, Bangalore',
    workingHours: 'Monday - Friday, 9:00 AM - 6:00 PM IST',
    role: 'Senior Administrator',
  };

  return (
    <div className="container py-8 max-w-2xl">
      <h1 className="text-3xl font-bold mb-6">Admin Profile</h1>
      <Card>
        <CardHeader>
          <CardTitle>Administrator Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <p className="text-sm text-muted-foreground mb-1">Name</p>
            <p className="font-medium">{adminProfile.name}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground mb-1">Role</p>
            <p className="font-medium">{adminProfile.role}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground mb-1 flex items-center gap-2">
              <Mail className="h-4 w-4" />
              Email
            </p>
            <p className="font-medium">{adminProfile.email}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground mb-1 flex items-center gap-2">
              <Phone className="h-4 w-4" />
              Phone
            </p>
            <p className="font-medium">{adminProfile.phone}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground mb-1 flex items-center gap-2">
              <Briefcase className="h-4 w-4" />
              Department
            </p>
            <p className="font-medium">{adminProfile.department}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground mb-1 flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              Office Location
            </p>
            <p className="font-medium">{adminProfile.officeLocation}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground mb-1 flex items-center gap-2">
              <Clock className="h-4 w-4" />
              Working Hours
            </p>
            <p className="font-medium">{adminProfile.workingHours}</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
