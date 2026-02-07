interface KindKartLogoProps {
  size?: 'sm' | 'md' | 'lg';
}

export default function KindKartLogo({ size = 'md' }: KindKartLogoProps) {
  const dimensions = {
    sm: 'h-8 w-8',
    md: 'h-12 w-12',
    lg: 'h-16 w-16',
  };

  return (
    <div className="flex items-center gap-2">
      <img
        src="/assets/generated/kindkart-logo.dim_512x512.png"
        alt="KindKart Logo"
        className={dimensions[size]}
      />
      <span className="font-bold text-xl">KindKart</span>
    </div>
  );
}
