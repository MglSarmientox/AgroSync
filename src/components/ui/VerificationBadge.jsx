import { ShieldCheck, Clock, AlertCircle } from 'lucide-react';

const configs = {
  verified: {
    label: 'Verificada',
    icon: ShieldCheck,
    classes: 'bg-green-100 text-green-700 border border-green-200',
    iconClass: 'text-green-500',
  },
  pending: {
    label: 'En Proceso',
    icon: Clock,
    classes: 'bg-amber-100 text-amber-700 border border-amber-200',
    iconClass: 'text-amber-500',
  },
  unverified: {
    label: 'No Verificada',
    icon: AlertCircle,
    classes: 'bg-stone-100 text-stone-500 border border-stone-200',
    iconClass: 'text-stone-400',
  },
};

export default function VerificationBadge({ status = 'unverified', size = 'sm' }) {
  const config = configs[status] || configs.unverified;
  const Icon = config.icon;

  const sizes = {
    xs: 'px-2 py-0.5 text-[10px] gap-1',
    sm: 'px-2.5 py-1 text-xs gap-1.5',
    md: 'px-3 py-1.5 text-sm gap-2',
  };

  const iconSizes = {
    xs: 'w-3 h-3',
    sm: 'w-3.5 h-3.5',
    md: 'w-4 h-4',
  };

  return (
    <span className={`inline-flex items-center font-medium rounded-full ${config.classes} ${sizes[size]}`}>
      <Icon className={`${iconSizes[size]} ${config.iconClass}`} strokeWidth={2.5} />
      {config.label}
    </span>
  );
}
