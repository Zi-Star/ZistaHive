interface HoneyPotProps {
  balance: number
  size?: 'sm' | 'md' | 'lg'
  showLabel?: boolean
}

export function HoneyPot({ balance, size = 'md', showLabel = true }: HoneyPotProps) {
  const sizeStyles = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-xl'
  }
  
  const iconSize = {
    sm: 'text-2xl',
    md: 'text-3xl',
    lg: 'text-5xl'
  }
  
  return (
    <div className={`flex items-center gap-2 ${sizeStyles[size]}`}>
      <span className={iconSize[size]}>🍯</span>
      <div>
        <div className="font-bold text-primary-600">{balance.toLocaleString()}</div>
        {showLabel && <div className="text-xs text-dark-500">Honey</div>}
      </div>
    </div>
  )
}
