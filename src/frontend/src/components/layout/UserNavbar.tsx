import { Link } from '@tanstack/react-router';

interface UserNavbarProps {
  mobile?: boolean;
}

export default function UserNavbar({ mobile }: UserNavbarProps) {
  const navItems = [
    { label: 'Home', path: '/user/home' },
    { label: 'List Necessity Item', path: '/user/sell' },
    { label: 'Marketplace', path: '/user/marketplace' },
    { label: 'Donate to NGO', path: '/user/donate' },
    { label: 'Deliveries', path: '/user/deliveries' },
    { label: 'My Dashboard', path: '/user/dashboard' },
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
