import { useDocumentTitle } from '../hooks/useDocumentTitle'
import { Button } from '../components/ui/Button'
import { Sun } from '../components/layout/Logo'

export function NotFoundPage() {
  useDocumentTitle('Page not found')
  return (
    <div className="shell flex flex-col items-center py-24 text-center">
      <Sun className="h-12 w-auto opacity-80" />
      <h1 className="display mt-6 text-[40px] text-ink sm:text-[52px]">This page is not here</h1>
      <p className="mt-4 max-w-[40ch] text-[15px] text-ink-soft">The link may be old, or the piece may have sold out. The rest of the collection is one tap away.</p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Button to="/">Go home</Button>
        <Button to="/shop" variant="outline">
          Shop all
        </Button>
      </div>
    </div>
  )
}
