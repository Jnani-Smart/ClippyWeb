
export const getAccentColor = (accent: string) => {
  const colors = {
    blue: 'text-blue-400',
    purple: 'text-purple-400',
    indigo: 'text-indigo-400',
    green: 'text-green-400',
    yellow: 'text-yellow-400',
    pink: 'text-pink-400',
    emerald: 'text-emerald-400',
    orange: 'text-orange-400'
  };
  return colors[accent as keyof typeof colors] || 'text-blue-400';
};

export const getBorderColor = (accent: string) => {
  const colors = {
    blue: 'border-blue-500/30',
    purple: 'border-purple-500/30',
    indigo: 'border-indigo-500/30',
    green: 'border-green-500/30',
    yellow: 'border-yellow-500/30',
    pink: 'border-pink-500/30',
    emerald: 'border-emerald-500/30',
    orange: 'border-orange-500/30'
  };
  return colors[accent as keyof typeof colors] || 'border-blue-500/30';
};

export const cursorSizeMap: Record<string, string> = {
  button: 'clamp(2.2rem, 3vw, 2.8rem)', // 35-45px
  card: 'clamp(1.7rem, 2.5vw, 2.2rem)', // 27-35px
  link: 'clamp(1.3rem, 2vw, 1.7rem)', // 21-27px
  default: 'clamp(1rem, 1.5vw, 1.3rem)', // 16-21px
};
