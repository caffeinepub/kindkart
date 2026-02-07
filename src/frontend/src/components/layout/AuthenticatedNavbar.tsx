import { Link, useNavigate } from '@tanstack/react-router';
import { Bell, MessageSquare, Search, Menu } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Badge } from '@/components/ui/badge';
import KindKartLogo from '../brand/KindKartLogo';
import NotificationsDropdown from '../notifications/NotificationsDropdown';
import ProfileMenu from '../profile/ProfileMenu';
import ChatLauncher from '../chat/ChatLauncher';
import { useSession } from '../../state/SessionContext';
import UserNavbar from './UserNavbar';
import NGONavbar from './NGONavbar';
import DeliveryNavbar from './DeliveryNavbar';
import AdminNavbar from './AdminNavbar';

export default function AuthenticatedNavbar() {
  const { role } = useSession();
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate({ to: '/user/marketplace', search: { q: searchQuery } });
      setSearchOpen(false);
    }
  };

  const getHomeLink = () => {
    switch (role) {
      case 'User':
        return '/user/home';
      case 'NGO':
        return '/ngo/dashboard';
      case 'DeliveryPartner':
        return '/delivery/pickups';
      case 'Admin':
        return '/admin/dashboard';
      default:
        return '/';
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between gap-4">
        <Link to={getHomeLink()} className="flex items-center space-x-2">
          <KindKartLogo size="sm" />
        </Link>

        {/* Desktop Role Navigation */}
        <div className="hidden lg:flex flex-1 justify-center">
          {role === 'User' && <UserNavbar />}
          {role === 'NGO' && <NGONavbar />}
          {role === 'DeliveryPartner' && <DeliveryNavbar />}
          {role === 'Admin' && <AdminNavbar />}
        </div>

        {/* Search, Notifications, Chat, Profile */}
        <div className="flex items-center gap-2">
          <Sheet open={searchOpen} onOpenChange={setSearchOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="hidden md:flex">
                <Search className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="top" className="h-auto">
              <form onSubmit={handleSearch} className="mt-4">
                <Input
                  placeholder="Search necessity items or NGOs..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full"
                  autoFocus
                />
              </form>
            </SheetContent>
          </Sheet>

          <NotificationsDropdown />
          <ChatLauncher />
          <ProfileMenu />

          {/* Mobile Menu */}
          <Sheet>
            <SheetTrigger asChild className="lg:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <div className="flex flex-col space-y-4 mt-8">
                {role === 'User' && <UserNavbar mobile />}
                {role === 'NGO' && <NGONavbar mobile />}
                {role === 'DeliveryPartner' && <DeliveryNavbar mobile />}
                {role === 'Admin' && <AdminNavbar mobile />}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
