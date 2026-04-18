import { useContext } from 'react'
import { CursorHoverContext } from '../context/cursorHoverContext.js'

export function useCursorLetterLinkHover() {
  return useContext(CursorHoverContext)
}
