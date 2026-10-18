import { useEffect } from 'react'
import { site } from '../config/site'

/** Sets the tab title: "Page | BowLifestyle", or the brand line on the home page. */
export function useDocumentTitle(title) {
  useEffect(() => {
    document.title = title ? `${title} | ${site.name}` : `${site.name} | Men’s Kurtas, Bundis & Jacket Sets`
  }, [title])
}
