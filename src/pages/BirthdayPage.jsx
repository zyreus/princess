import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion as Motion } from 'framer-motion'
import princessPhoto from '../assets/princess.jpg'
import princessAngelPhoto from '../assets/princessang.jpg'
import { useCursorLetterLinkHover } from '../hooks/useCursorLetterLinkHover.js'

const LETTER_UNLOCK_KEY = 'letterUnlocked'
/** Set in code to the password she should type (lowercased when checked). */
const SURPRISE_LETTER_PASSWORD = 'paslot'
const LETTER_PASSWORD_OK_KEY = 'surpriseLetterPasswordOk'

export default function BirthdayPage() {
  const navigate = useNavigate()
  const { setLetterLinkHover } = useCursorLetterLinkHover()

  const reasons = [
    {
      title: 'The Kindest Soul',
      text: 'Your heart is like a rare amethyst-beautiful, deep, and incredibly precious. Thank you for always being the light in my darkest rooms.',
    },
    {
      title: 'A Real Princess',
      text: "You don't need a castle to be a royalty. The way you carry yourself with such grace and kindness proves you are a Princess in every sense of the word.",
    },
    {
      title: 'My Safe Space',
      text: 'Whenever the world feels too loud, your voice is my favorite violet sunset-peaceful, calming, and exactly what I need.',
    },
    {
      title: 'Pure Magic',
      text: 'They say angels live in heaven, but I know one named Angel who lives right here and makes every day feel like a dream.',
    },
  ]
  const quotes = [
    'Happy Birthday to the girl who wears her crown with so much kindness.',
    'Wishing you a year as beautiful and vibrant as the color violet.',
    'May your day be filled with as much joy as you give to everyone around you, Princess.',
    'Cheers to more memories, more laughs, and more years of you being exactly who you are.',
  ]
  const affirmations = [
    'You are loved more than you know.',
    'You are the brightest star in my sky.',
    'Today is all about you, Angel!',
    'Keep being your amazing, sweet self.',
  ]

  const heroPages = [
    {
      eyebrow: 'Celebration Time',
      title: 'welcome',
      body: 'Wishing you a magical birthday filled with sweet moments, bright smiles, and all the love your heart can hold. Today is your fairy-tale day - and this little corner of the internet is made just for you.',
    },
    {
      eyebrow: 'A royal note',
      title: 'Grace of a Princess, heart of an Angel',
      body: "They say names define a person, and yours couldn't be more perfect. Today the world celebrates the day you were born - and I celebrate that I get to have you in my life.",
    },
    {
      eyebrow: 'Sparkle quotes',
      title: 'For you, Princess',
      body: `${quotes[0]}\n\n${quotes[1]}`,
    },
    {
      eyebrow: 'What is next',
      title: 'Your surprises await',
      body: 'Scroll down for photos, sweet reasons, a little puzzle, and your surprise letter. Tap a dot anytime to come back to this welcome page. 💜',
    },
  ]

  const [heroSlideIndex, setHeroSlideIndex] = useState(0)
  const [showFireworks, setShowFireworks] = useState(false)
  const [showPuzzle, setShowPuzzle] = useState(false)
  const [puzzleAnswer, setPuzzleAnswer] = useState('')
  const [puzzleError, setPuzzleError] = useState('')
  const [isPuzzleSolved, setIsPuzzleSolved] = useState(
    () => typeof window !== 'undefined' && sessionStorage.getItem(LETTER_UNLOCK_KEY) === '1',
  )
  const [quoteIndex, setQuoteIndex] = useState(0)
  const [affirmationIndex, setAffirmationIndex] = useState(0)
  const [showLetterPasswordGate, setShowLetterPasswordGate] = useState(false)
  const [letterPasswordInput, setLetterPasswordInput] = useState('')
  const [letterPasswordError, setLetterPasswordError] = useState('')

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setQuoteIndex((current) => (current + 1) % quotes.length)
    }, 4200)
    return () => window.clearInterval(intervalId)
  }, [quotes.length])

  const handleSurpriseClick = () => {
    setShowPuzzle(true)
    setPuzzleError('')
  }

  const handlePuzzleSubmit = (event) => {
    event.preventDefault()
    const normalizedAnswer = puzzleAnswer.trim().toLowerCase()
    const acceptedAnswers = ['violet']

    if (!acceptedAnswers.includes(normalizedAnswer)) {
      setPuzzleError('Try again, princess! Hint: it is your theme color.')
      return
    }

    sessionStorage.setItem(LETTER_UNLOCK_KEY, '1')
    setIsPuzzleSolved(true)
    setShowPuzzle(false)
    setPuzzleError('')
    setPuzzleAnswer('')
    setShowFireworks(true)

    window.setTimeout(() => {
      setShowFireworks(false)
    }, 1000)
  }

  const goToLetterPage = () => {
    navigate('/letter')
  }

  const handleOpenSurpriseLetterClick = () => {
    if (typeof window !== 'undefined' && sessionStorage.getItem(LETTER_PASSWORD_OK_KEY) === '1') {
      goToLetterPage()
      return
    }
    setShowLetterPasswordGate(true)
    setLetterPasswordError('')
    setLetterPasswordInput('')
  }

  const handleLetterPasswordSubmit = (event) => {
    event.preventDefault()
    const attempt = letterPasswordInput.trim().toLowerCase()
    if (attempt !== SURPRISE_LETTER_PASSWORD.toLowerCase()) {
      setLetterPasswordError('Not quite, princess. Hint: her royal last name.')
      return
    }
    sessionStorage.setItem(LETTER_PASSWORD_OK_KEY, '1')
    setShowLetterPasswordGate(false)
    setLetterPasswordError('')
    setLetterPasswordInput('')
    goToLetterPage()
  }

  const handleLetterPasswordCancel = () => {
    setShowLetterPasswordGate(false)
    setLetterPasswordError('')
    setLetterPasswordInput('')
  }

  const handleAffirmationClick = () => {
    setAffirmationIndex((current) => (current + 1) % affirmations.length)
  }

  return (
    <Motion.div
      className="relative"
      initial={{ opacity: 0, scale: 0.94, filter: 'brightness(0.35)' }}
      animate={{ opacity: 1, scale: 1, filter: 'brightness(1)' }}
      exit={{ opacity: 0, scale: 0.98, filter: 'brightness(0.4)' }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
    >
      <section className="flex min-h-screen flex-col items-center justify-center px-4 py-12 text-center sm:px-6">
        <div className="w-full max-w-3xl rounded-2xl bg-gradient-to-br from-violet-500 via-fuchsia-500 to-purple-600 p-[1px] shadow-[0_0_48px_rgba(139,92,246,0.32)]">
          <div className="relative rounded-2xl border border-violet-500/30 bg-violet-950/40 px-6 py-10 pr-14 backdrop-blur-md sm:px-10 sm:py-12 sm:pr-16">
            <nav
              className="absolute right-3 top-1/2 z-10 flex -translate-y-1/2 flex-col items-center gap-3 sm:right-4"
              aria-label="Hero pages"
            >
              {heroPages.map((_, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => setHeroSlideIndex(index)}
                  aria-label={`Show page ${index + 1} of ${heroPages.length}`}
                  aria-current={heroSlideIndex === index ? 'true' : undefined}
                  className={
                    heroSlideIndex === index
                      ? 'h-3 w-3 shrink-0 rounded-full bg-white shadow-[0_0_14px_rgba(255,255,255,0.95)] ring-2 ring-violet-300/80 transition-all duration-200'
                      : 'h-2 w-2 shrink-0 rounded-full bg-white/35 transition-all duration-200 hover:bg-white/70 hover:ring-1 hover:ring-white/40'
                  }
                />
              ))}
            </nav>

            <div key={heroSlideIndex} className="hero-slide-enter">
              <p className="text-xs font-semibold uppercase tracking-[0.35em] text-violet-300/80">
                {heroPages[heroSlideIndex].eyebrow}
              </p>
              {heroPages[heroSlideIndex].title === 'welcome' ? (
                <h1 className="mt-5 font-serif text-4xl font-light tracking-tighter text-violet-100 sm:text-5xl md:text-6xl xl:text-7xl">
                  Princess Angel{' '}
                  <span className="bg-gradient-to-r from-fuchsia-200 to-violet-200 bg-clip-text font-normal text-transparent">
                    Paslot
                  </span>
                </h1>
              ) : (
                <h1 className="mx-auto mt-5 max-w-xl font-serif text-2xl font-light leading-snug tracking-tighter text-violet-100 sm:text-3xl md:text-4xl">
                  {heroPages[heroSlideIndex].title}
                </h1>
              )}
              <p className="mx-auto mt-6 max-w-xl whitespace-pre-line text-base leading-relaxed text-violet-300/80 sm:text-lg">
                {heroPages[heroSlideIndex].body}
              </p>
            </div>
          </div>
        </div>
      </section>

      <main className="relative px-3 pb-16 text-center text-purple-100 sm:px-6">
        <section className="relative mx-auto w-full max-w-5xl rounded-3xl border border-violet-500/30 bg-violet-950/40 p-4 shadow-2xl shadow-violet-900/40 backdrop-blur-md sm:p-8 lg:p-10">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-violet-300/80 sm:text-sm sm:tracking-[0.35em]">
            Happy Birthday
          </p>
          <h2 className="mt-4 bg-gradient-to-r from-violet-200 via-fuchsia-200 to-purple-200 bg-clip-text text-3xl font-black leading-tight text-transparent sm:text-4xl lg:text-5xl">
            Princess Angel! 💜
          </h2>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <span className="sparkle-pill rounded-full bg-violet-600/80 px-4 py-2 text-xs font-semibold text-white shadow-lg shadow-violet-900/50 sm:px-5 sm:text-sm">
              #PrincessAngelDay
            </span>
            <span className="sparkle-pill rounded-full bg-purple-600/80 px-4 py-2 text-xs font-semibold text-white shadow-lg shadow-purple-900/50 sm:px-5 sm:text-sm">
              Sweetest Star
            </span>
            <span className="sparkle-pill rounded-full bg-fuchsia-600/80 px-4 py-2 text-xs font-semibold text-white shadow-lg shadow-fuchsia-900/50 sm:px-5 sm:text-sm">
              Birthday Queen
            </span>
          </div>

          <div className="mt-10 grid gap-5 sm:grid-cols-2">
            <figure className="cute-photo-card rounded-3xl border border-violet-500/30 bg-violet-950/40 p-3 shadow-xl shadow-violet-900/30 backdrop-blur-md">
              <img
                src={princessPhoto}
                alt="Princess Angel smiling beautifully"
                className="h-56 w-full rounded-2xl object-cover sm:h-72"
              />
              <figcaption className="mt-3 text-sm font-semibold text-violet-300/80">
                Princess magic in every smile 🔮
              </figcaption>
            </figure>
            <figure className="cute-photo-card rounded-3xl border border-violet-500/30 bg-violet-950/40 p-3 shadow-xl shadow-fuchsia-900/25 backdrop-blur-md">
              <img
                src={princessAngelPhoto}
                alt="Princess Angel birthday moment"
                className="h-56 w-full rounded-2xl object-cover sm:h-72"
              />
              <figcaption className="mt-3 text-sm font-semibold text-violet-300/80">
                Birthday queen shining bright 🦄
              </figcaption>
            </figure>
          </div>

          <div className="mt-10">
            <h3 className="text-left text-lg font-bold text-violet-100 sm:text-xl">
              Reasons Why You&apos;re My Favorite Angel
            </h3>
          </div>

          <div className="mt-4 grid gap-4 text-left sm:grid-cols-2">
            {reasons.map((reason) => (
              <article
                key={reason.title}
                className="rounded-2xl border border-violet-500/30 bg-violet-950/40 p-4 shadow-lg shadow-violet-900/25 backdrop-blur-md"
              >
                <h4 className="text-base font-bold text-violet-100">💜 {reason.title}</h4>
                <p className="mt-2 text-sm leading-relaxed text-violet-300/80">{reason.text}</p>
              </article>
            ))}
          </div>

          <article className="mt-8 rounded-2xl border border-violet-500/30 bg-violet-950/40 p-5 shadow-lg shadow-violet-900/30 backdrop-blur-md">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-violet-300/80">
              Birthday Quote
            </p>
            <p className="mt-3 text-base leading-relaxed text-violet-300/80 sm:text-lg">
              &ldquo;{quotes[quoteIndex]}&rdquo;
            </p>
          </article>

          <article className="mt-6 rounded-2xl border border-violet-500/30 bg-violet-950/40 p-5 shadow-lg shadow-fuchsia-900/25 backdrop-blur-md">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-violet-300/80">
              Princess Affirmation
            </p>
            <p className="mt-3 text-lg font-semibold text-violet-100">
              {affirmations[affirmationIndex]}
            </p>
            <button
              type="button"
              onClick={handleAffirmationClick}
              className="mt-4 rounded-full bg-violet-600 px-5 py-2 text-xs font-bold uppercase tracking-[0.14em] text-white shadow-[0_0_20px_rgba(255,255,255,0.28)] transition-colors hover:bg-fuchsia-600 sm:text-sm"
            >
              New Affirmation 🔮
            </button>
          </article>

          <div className="mt-8 flex flex-col items-center gap-3">
            {isPuzzleSolved ? (
              <button
                type="button"
                onClick={handleOpenSurpriseLetterClick}
                onMouseEnter={() => setLetterLinkHover(true)}
                onMouseLeave={() => setLetterLinkHover(false)}
                onFocus={() => setLetterLinkHover(true)}
                onBlur={() => setLetterLinkHover(false)}
                className="inline-flex w-full animate-pulse items-center justify-center rounded-full bg-gradient-to-r from-violet-600 via-purple-500 to-fuchsia-500 px-5 py-3 text-xs font-bold uppercase tracking-[0.14em] text-white shadow-[0_0_25px_rgba(168,85,247,0.6)] transition-transform duration-300 hover:scale-105 hover:brightness-110 sm:w-auto sm:px-7 sm:text-sm sm:tracking-[0.2em]"
              >
                Open Surprise Letter 🎆
              </button>
            ) : (
              <button
                type="button"
                onClick={handleSurpriseClick}
                className="w-full animate-pulse rounded-full bg-gradient-to-r from-violet-600 via-purple-500 to-fuchsia-500 px-5 py-3 text-xs font-bold uppercase tracking-[0.14em] text-white shadow-[0_0_25px_rgba(168,85,247,0.6)] transition-transform duration-300 hover:scale-105 hover:brightness-110 sm:w-auto sm:px-7 sm:text-sm sm:tracking-[0.2em]"
              >
                Unlock Surprise Letter 🎆
              </button>
            )}
          </div>

          {isPuzzleSolved && showLetterPasswordGate && (
            <form
              onSubmit={handleLetterPasswordSubmit}
              className="puzzle-card mx-auto mt-6 max-w-xl rounded-2xl border border-fuchsia-500/35 bg-violet-950/50 p-4 text-left shadow-xl shadow-fuchsia-900/25 backdrop-blur-md sm:p-5"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-fuchsia-300/90 sm:text-sm">
                Secret lock
              </p>
              <h3 className="mt-2 text-base font-bold text-violet-100 sm:text-lg">
                Enter the password to open your letter
              </h3>
              <p className="mt-2 text-sm text-violet-300/80">
                Hint: her royal last name (one word, lowercase).
              </p>
              <input
                type="password"
                autoComplete="off"
                value={letterPasswordInput}
                onChange={(event) => setLetterPasswordInput(event.target.value)}
                placeholder="Password..."
                className="mt-4 w-full rounded-xl border border-violet-500/30 bg-black/30 px-4 py-3 text-violet-100 outline-none ring-violet-400/40 placeholder:text-violet-300/55 focus:ring-2"
              />
              {letterPasswordError && (
                <p className="mt-2 text-sm font-medium text-fuchsia-300">{letterPasswordError}</p>
              )}
              <div className="mt-4 flex flex-wrap gap-3">
                <button
                  type="submit"
                  className="rounded-full bg-violet-600 px-6 py-2 text-xs font-bold uppercase tracking-[0.14em] text-white shadow-[0_0_20px_rgba(255,255,255,0.28)] transition-colors hover:bg-fuchsia-600 sm:text-sm"
                >
                  Unlock letter
                </button>
                <button
                  type="button"
                  onClick={handleLetterPasswordCancel}
                  className="rounded-full border border-violet-500/40 bg-transparent px-5 py-2 text-xs font-semibold text-violet-200 hover:bg-violet-950/60 sm:text-sm"
                >
                  Cancel
                </button>
              </div>
            </form>
          )}

          {showPuzzle && !isPuzzleSolved && (
            <form
              onSubmit={handlePuzzleSubmit}
              className="puzzle-card mx-auto mt-6 max-w-xl rounded-2xl border border-violet-500/30 bg-violet-950/40 p-4 text-left shadow-xl shadow-violet-900/35 backdrop-blur-md sm:p-5"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-violet-300/80 sm:text-sm">
                Puzzle Lock
              </p>
              <h3 className="mt-2 text-base font-bold text-violet-100 sm:text-lg">
                What is her favorite color?
              </h3>
              <p className="mt-2 text-sm text-violet-300/80">
                Hint: it matches this website&apos;s theme.
              </p>

              <input
                type="text"
                value={puzzleAnswer}
                onChange={(event) => setPuzzleAnswer(event.target.value)}
                placeholder="Type the answer here..."
                className="mt-4 w-full rounded-xl border border-violet-500/30 bg-black/30 px-4 py-3 text-violet-100 outline-none ring-violet-400/40 placeholder:text-violet-300/55 focus:ring-2"
              />

              {puzzleError && (
                <p className="mt-2 text-sm font-medium text-violet-300">{puzzleError}</p>
              )}

              <button
                type="submit"
                className="mt-4 w-full rounded-full bg-violet-600 px-6 py-2 text-xs font-bold uppercase tracking-[0.14em] text-white shadow-[0_0_20px_rgba(255,255,255,0.28)] transition-colors hover:bg-fuchsia-600 sm:w-auto sm:text-sm sm:tracking-[0.16em]"
              >
                Unlock Letter
              </button>
            </form>
          )}

          <footer className="mt-10 rounded-2xl bg-violet-700 px-5 py-4 text-white shadow-xl shadow-violet-900/50 sm:px-6">
            <p className="text-base font-bold sm:text-lg">You deserve every sparkle in the world!</p>
          </footer>
        </section>

        {showFireworks && (
          <div className="fireworks pointer-events-none">
            {[...Array(18)].map((_, index) => (
              <span
                key={index}
                className="firework-dot"
                style={{ '--i': index }}
              />
            ))}
          </div>
        )}
      </main>
    </Motion.div>
  )
}
