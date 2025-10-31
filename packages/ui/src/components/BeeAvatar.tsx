interface BeeAvatarProps {
  imageUrl?: string
  name?: string
  size?: 'sm' | 'md' | 'lg' | 'xl'
  beeRank?: string
}

export function BeeAvatar({ 
  imageUrl, 
  name = 'User', 
  size = 'md',
  beeRank 
}: BeeAvatarProps) {
  const sizeStyles = {
    sm: 'w-8 h-8 text-sm',
    md: 'w-12 h-12 text-base',
    lg: 'w-16 h-16 text-xl',
    xl: 'w-24 h-24 text-3xl'
  }
  
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2)
  }
  
  return (
    <div className="relative inline-block">
      <div 
        className={`${sizeStyles[size]} rounded-full bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center font-bold text-white border-2 border-white shadow-md overflow-hidden`}
      >
        {imageUrl ? (
          <img src={imageUrl} alt={name} className="w-full h-full object-cover" />
        ) : (
          getInitials(name)
        )}
      </div>
      {beeRank && size !== 'sm' && (
        <div className="absolute -bottom-1 -right-1 bg-secondary-500 text-white text-xs px-2 py-0.5 rounded-full border-2 border-white shadow">
          🐝
        </div>
      )}
    </div>
  )
}
