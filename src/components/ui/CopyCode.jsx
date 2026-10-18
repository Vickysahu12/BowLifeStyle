import { useState } from 'react'
import { Icon } from './Icon'
import { cn } from '../../lib/cn'

/** Dashed coupon chip that copies its code and flips to "Copied" for a moment. */
export function CopyCode({ code, light, className }) {
  const [copied, setCopied] = useState(false)

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(code)
    } catch {
      // Clipboard can be blocked; the code is still visible to type in.
    }
    setCopied(true)
    setTimeout(() => setCopied(false), 1600)
  }

  return (
    <button
      type="button"
      onClick={copy}
      aria-label={copied ? `${code} copied` : `Copy code ${code}`}
      className={cn(
        'press inline-flex h-8 items-center gap-2 border border-dashed px-3 text-[12px] font-medium tracking-[0.12em] transition-colors',
        light ? 'border-bronze-soft/70 text-bronze-soft hover:bg-paper/10' : 'border-ink/50 text-ink hover:bg-ink/5',
        className,
      )}
    >
      {copied ? (
        <span key="ok" className="anim-fade-in flex items-center gap-1.5">
          <Icon name="check" size={13} weight="bold" /> COPIED
        </span>
      ) : (
        <span key="code" className="anim-fade-in flex items-center gap-1.5">
          {code} <Icon name="tag" size={13} />
        </span>
      )}
    </button>
  )
}
