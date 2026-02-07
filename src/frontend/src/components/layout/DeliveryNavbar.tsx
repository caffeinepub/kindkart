import { Link } from '@tanstack/react-router';

interface DeliveryNavbarProps {
  mobile?: boolean;
}

export default function DeliveryNavbar({ mobile }: DeliveryNavbarProps) {
  const navItems = [
    { label: 'Assigned Pickups', path: '/delivery/pickups' },
    { label: 'Ongoing Deliveries', path: '/delivery/ongoing' },
    { label: 'Completed Deliveries', path: '/delivery/completed' },
    { label: 'Route Map', path: '/delivery/map' },
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
