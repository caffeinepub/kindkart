import { Link } from '@tanstack/react-router';

interface NGONavbarProps {
  mobile?: boolean;
}

export default function NGONavbar({ mobile }: NGONavbarProps) {
  const navItems = [
    { label: 'Dashboard', path: '/ngo/dashboard' },
    { label: 'Post Requirements', path: '/ngo/requirements/post' },
    { label: 'Received Donations', path: '/ngo/donations' },
    { label: 'Delivery Tracking', path: '/ngo/deliveries' },
    { label: 'Impact Analytics', path: '/ngo/analytics' },
    { label: 'Help', path: '/help' },
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
