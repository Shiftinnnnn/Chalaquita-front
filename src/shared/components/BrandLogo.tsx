import chalaquitaLogo from '../../assets/chalaquita-logo.jpeg'

type BrandLogoProps = {
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

const sizeClasses = {
  sm: 'size-11 p-1',
  md: 'size-12 p-1',
  lg: 'size-16 p-1.5',
}

export function BrandLogo({ size = 'sm', className = '' }: BrandLogoProps) {
  return (
    <span
      className={`flex shrink-0 items-center justify-center rounded-lg bg-white ring-1 ring-brand-navy/10 ${sizeClasses[size]} ${className}`}
    >
      <img src={chalaquitaLogo} alt="Chalaquita Express" className="size-full object-contain" />
    </span>
  )
}
