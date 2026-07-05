import { Link } from 'react-router-dom'

const baseClasses =
  'inline-flex min-h-11 items-center justify-center gap-2 rounded-2xl px-5 py-3 text-sm font-bold shadow-lg transition duration-200 ease-out hover:-translate-y-0.5 hover:scale-[1.02] active:translate-y-0 active:scale-95 focus:outline-none focus:ring-4 focus:ring-[#5DC1F0]/35'

const variants = {
  primary: 'bg-[#FF6B9D] text-white shadow-[#FF6B9D]/25 hover:bg-[#f75c91]',
  blue: 'bg-[#5DC1F0] text-white shadow-[#5DC1F0]/25 hover:bg-[#49b7eb]',
  yellow: 'bg-[#FFD93D] text-[#1F2937] shadow-[#FFD93D]/25 hover:bg-[#ffcf24]',
  ghost: 'bg-white/85 text-[#1F2937] shadow-slate-200/80 ring-1 ring-slate-200 hover:bg-white',
}

export default function Button({
  children,
  to,
  className = '',
  variant = 'primary',
  type = 'button',
  ...props
}) {
  const classes = `${baseClasses} ${variants[variant]} ${className}`

  if (to) {
    return (
      <Link className={classes} to={to} {...props}>
        {children}
      </Link>
    )
  }

  return (
    <button className={classes} type={type} {...props}>
      {children}
    </button>
  )
}
