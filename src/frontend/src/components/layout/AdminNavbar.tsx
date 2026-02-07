import { Link } from '@tanstack/react-router';

interface AdminNavbarProps {
  mobile?: boolean;
}

export default function AdminNavbar({ mobile }: AdminNavbarProps) {
  const navItems = [
    { label: 'Dashboard', path: '/admin/dashboard' },
    { label: 'User Management', path: '/admin/users' },
    { label: 'NGO Verification', path: '/admin/ngo-verification' },
    { label: 'Listings', path: '/admin/listings' },
    { label: 'Deliveries', path: '/admin/deliveries' },
    { label: 'Reports', path: '/admin/reports' },
  ];

  if (mobile) {
    return (
      <>
        {navItems.map((item) => (
          <Link key={item.path} to={item.path} className="text-lg font-medium">
            {item.label}
          </Link>
        ))}
      </>
    );
  }

  return (
    <nav className="flex items-center space-x-6">
      {navItems.map((item) => (
        <Link
          key={item.path}
          to={item.path}
          className="text-sm font-medium transition-colors hover:text-primary"
        >
          {item.label}
        </Link>
      ))}
    </nav>
  );
}
