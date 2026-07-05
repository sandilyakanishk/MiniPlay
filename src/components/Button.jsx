import { Link } from 'react-router-dom'

const baseClasses =
  'inline-flex min-h-11 items-center justify-center gap-2 rounded-2xl px-5 py-3 text-sm font-bold shadow-lg transition duration-200 ease-out hover:-translate-y-0.5 hover:scale-[1.02] active:translate-y-0 active:scale-95 focus:outline-none focus:ring-4 focus:ring-[#6aaecd]/30 disabled:pointer-events-none disabled:opacity-60'

const variants = {
  primary: 'bg-[#d97887] text-white shadow-[#d97887]/20 hover:bg-[#cc6b7b]',
  blue: 'bg-[#5caeca] text-white shadow-[#5caeca]/20 hover:bg-[#519fba]',
  yellow: 'bg-[#f0d48a] text-[#1F2937] shadow-[#e8c979]/20 hover:bg-[#e6c779]',
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
