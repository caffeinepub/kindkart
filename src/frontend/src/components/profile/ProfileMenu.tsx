import { User, Settings, HelpCircle, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { useSession } from '../../state/SessionContext';
import { useNavigate } from '@tanstack/react-router';
import { useState } from 'react';
import LogoutConfirmDialog from './LogoutConfirmDialog';

export default function ProfileMenu() {
  const { role } = useSession();
  const navigate = useNavigate();
  const [logoutDialogOpen, setLogoutDialogOpen] = useState(false);

  const getProfilePath = () => {
    switch (role) {
      case 'User':
        return '/user/profile';
      case 'NGO':
        return '/ngo/profile';
      case 'DeliveryPartner':
        return '/delivery/profile';
      case 'Admin':
        return '/admin/profile';
      default:
        return '/user/profile';
    }
  };

  const getSettingsPath = () => {
    switch (role) {
      case 'User':
        return '/user/profile/settings';
      case 'NGO':
        return '/ngo/profile/settings';
      case 'DeliveryPartner':
        return '/delivery/profile/settings';
      case 'Admin':
        return '/admin/settings';
      default:
        return '/user/profile/settings';
    }
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className="rounded-full">
            <Avatar className="h-8 w-8">
              <AvatarFallback>{role?.[0] || 'U'}</AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56">
          <DropdownMenuItem onClick={() => navigate({ to: getProfilePath() })}>
            <User className="mr-2 h-4 w-4" />
            My Profile
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => navigate({ to: getSettingsPath() })}>
            <Settings className="mr-2 h-4 w-4" />
            Settings
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => navigate({ to: '/help' })}>
            <HelpCircle className="mr-2 h-4 w-4" />
            Help & Support
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => setLogoutDialogOpen(true)} className="text-destructive">
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <LogoutConfirmDialog open={logoutDialogOpen} onOpenChange={setLogoutDialogOpen} />
    </>
  );
}
