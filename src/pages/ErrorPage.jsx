import { useRouteError } from 'react-router'

/**
 * Shown if a page crashes. Rendered outside the providers, so it uses plain links
 * and a full reload to recover cleanly.
 */
export function ErrorPage() {
  const error = useRouteError()
  if (import.meta.env.DEV) console.error(error)

  return (
    <div className="flex min-h-dvh flex-col items-center justify-center bg-paper px-6 text-center">
      <img src="/brand/wordmark.png" alt="BowLifestyle" width={440} height={105} className="h-12 w-auto" />
      <h1 className="display mt-8 text-[32px] text-ink">Something went wrong</h1>
      <p className="mt-3 max-w-[40ch] text-[15px] text-ink-soft">
        Sorry, this page ran into a problem. Your bag and wishlist are safe. Please try again.
      </p>
      <div className="mt-8 flex gap-3">
        <button
          type="button"
          onClick={() => window.location.reload()}
          className="caps h-12 bg-ink px-7 text-[12px] text-paper hover:bg-ink-hover"
        >
          Try Again
        </button>
        <a href="/" className="caps grid h-12 place-items-center border border-ink px-7 text-[12px] text-ink">
          Go Home
        </a>
      </div>
    </div>
  )
}
