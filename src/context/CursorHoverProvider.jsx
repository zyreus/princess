import { useMemo, useState } from 'react'
import { CursorHoverContext } from './cursorHoverContext.js'

export function CursorHoverProvider({ children }) {
  const [letterLinkHover, setLetterLinkHover] = useState(false)
  const value = useMemo(
    () => ({ letterLinkHover, setLetterLinkHover }),
    [letterLinkHover],
  )
  return <CursorHoverContext.Provider value={value}>{children}</CursorHoverContext.Provider>
}
