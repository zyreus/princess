/** Same tab: once she has opened the letter, home will not ask for the password again. */
export const LETTER_PASSWORD_OK_KEY = 'surpriseLetterPasswordOk'

export function markSurpriseLetterUnlocked() {
  try {
    sessionStorage.setItem(LETTER_PASSWORD_OK_KEY, '1')
  } catch {
    /* private mode / storage blocked */
  }
}

export function isSurpriseLetterUnlocked() {
  try {
    return sessionStorage.getItem(LETTER_PASSWORD_OK_KEY) === '1'
  } catch {
    return false
  }
}
