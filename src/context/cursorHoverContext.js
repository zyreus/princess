import { createContext } from 'react'

export const CursorHoverContext = createContext({
  letterLinkHover: false,
  setLetterLinkHover: () => {},
})
