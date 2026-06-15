"use client"

import type React from "react"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { ChevronLeft, ChevronRight, Home, Menu, Maximize, Minimize } from "lucide-react"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { useEffect, useRef, useState } from "react"

type PresenterAction = "NEXT" | "PREVIOUS" | "FULLSCREEN" | "IGNORED"

interface PresenterKeyEvent {
  key: string
  code: string
  keyCode: number
  which: number
  location: number
  action: PresenterAction
}

interface PresentationLayoutProps {
  slides: React.ReactNode[]
  currentSlide: number
  setCurrentSlide: (slide: number) => void
  slideMetadata: Array<{ title: string; backup?: boolean }>
}

export default function PresentationLayout({
  slides,
  currentSlide,
  setCurrentSlide,
  slideMetadata,
}: PresentationLayoutProps) {
  const presentationRef = useRef<HTMLDivElement>(null)
  const [isFullScreen, setIsFullScreen] = useState(false)
  const [isMounted, setIsMounted] = useState(false)
  const [presenterDebug, setPresenterDebug] = useState(false)
  const [presenterEvents, setPresenterEvents] = useState<PresenterKeyEvent[]>([])
  const totalSlides = slides.length
  const officialSlides = slideMetadata.filter((slide) => !slide.backup)
  const isBackupSlide = Boolean(slideMetadata[currentSlide]?.backup)
  const officialSlideNumber = slideMetadata.slice(0, currentSlide + 1).filter((slide) => !slide.backup).length
  const progressValue = isBackupSlide ? 100 : (officialSlideNumber / officialSlides.length) * 100

  const goToNextSlide = () => {
    setCurrentSlide(Math.min(currentSlide + 1, totalSlides - 1))
  }

  const goToPrevSlide = () => {
    setCurrentSlide(Math.max(currentSlide - 1, 0))
  }

  const goToSlide = (index: number) => {
    setCurrentSlide(index)
  }

  const focusPresentation = () => {
    requestAnimationFrame(() => presentationRef.current?.focus({ preventScroll: true }))
  }

  // Full-screen toggle function
  const toggleFullScreen = async () => {
    if (!document.fullscreenElement) {
      try {
        await document.documentElement.requestFullscreen()
        setIsFullScreen(true)
        focusPresentation()
      } catch (err) {
        console.error(`Error attempting to enable full-screen mode: ${(err as Error).message} (${(err as Error).name})`)
      }
    } else {
      if (document.exitFullscreen) {
        try {
          await document.exitFullscreen()
          setIsFullScreen(false)
        } catch (err) {
          console.error(`Error attempting to exit full-screen mode: ${(err as Error).message} (${(err as Error).name})`)
        }
      }
    }
  }

  useEffect(() => {
    setIsMounted(true)
    setPresenterDebug(new URLSearchParams(window.location.search).get("presenterDebug") === "1")
    focusPresentation()
  }, [])

  // Capture phase keeps presenter navigation ahead of ReactFlow and other interactive slides.
  useEffect(() => {
    const recordPresenterEvent = (event: KeyboardEvent, action: PresenterAction) => {
      if (!presenterDebug) return

      const entry: PresenterKeyEvent = {
        key: event.key,
        code: event.code,
        keyCode: event.keyCode,
        which: event.which,
        location: event.location,
        action,
      }

      setPresenterEvents((events) => [entry, ...events].slice(0, 5))
      console.log("[presenter-key]", entry)
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null
      const isTyping =
        target?.matches("input, textarea, select") ||
        target?.isContentEditable ||
        Boolean(target?.closest("[contenteditable='true']"))

      const key = event.key
      const code = event.code
      const keyCode = event.keyCode
      const lowerKey = key.toLowerCase()
      const isSpace = key === " " || key === "Spacebar" || code === "Space" || keyCode === 32
      const isButtonActivation = Boolean(target?.closest("button")) && (isSpace || key === "Enter" || code === "Enter")

      const isNext =
        key === "PageDown" ||
        code === "PageDown" ||
        keyCode === 34 ||
        key === "ArrowRight" ||
        code === "ArrowRight" ||
        keyCode === 39 ||
        isSpace ||
        key === "Enter" ||
        code === "Enter" ||
        keyCode === 13 ||
        lowerKey === "n"

      const isPrevious =
        key === "PageUp" ||
        code === "PageUp" ||
        keyCode === 33 ||
        key === "ArrowLeft" ||
        code === "ArrowLeft" ||
        keyCode === 37 ||
        key === "Backspace" ||
        code === "Backspace" ||
        keyCode === 8 ||
        lowerKey === "p"

      const isF5 = key === "F5" || code === "F5" || keyCode === 116
      const isEscape = key === "Escape" || code === "Escape" || keyCode === 27

      if (isTyping || isButtonActivation || event.repeat || event.altKey || event.ctrlKey || event.metaKey) {
        recordPresenterEvent(event, "IGNORED")
        return
      }

      if (isNext) {
        event.preventDefault()
        event.stopPropagation()
        goToNextSlide()
        recordPresenterEvent(event, "NEXT")
      } else if (isPrevious) {
        event.preventDefault()
        event.stopPropagation()
        goToPrevSlide()
        recordPresenterEvent(event, "PREVIOUS")
      } else if (isF5) {
        event.preventDefault()
        event.stopPropagation()
        if (!document.fullscreenElement) {
          void document.documentElement.requestFullscreen().then(focusPresentation).catch((error: Error) => {
            console.error(`Error attempting to enable full-screen mode: ${error.message} (${error.name})`)
          })
        }
        recordPresenterEvent(event, "FULLSCREEN")
      } else if (isEscape && document.fullscreenElement) {
        void document.exitFullscreen()
        recordPresenterEvent(event, "FULLSCREEN")
      } else {
        recordPresenterEvent(event, "IGNORED")
      }
    }

    const handleFullScreenChange = () => {
      setIsFullScreen(!!document.fullscreenElement)
      focusPresentation()
    }

    window.addEventListener("keydown", handleKeyDown, { capture: true })
    document.addEventListener("fullscreenchange", handleFullScreenChange)

    return () => {
      window.removeEventListener("keydown", handleKeyDown, { capture: true })
      document.removeEventListener("fullscreenchange", handleFullScreenChange)
    }
  }, [currentSlide, totalSlides, presenterDebug])

  return (
    <div
      ref={presentationRef}
      tabIndex={0}
      className="flex flex-col h-screen bg-gradient-to-br from-background via-blue-50 to-secondary/10 dark:from-slate-900 dark:via-slate-800 dark:to-blue-900/30 outline-none"
    >
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 flex-shrink-0">
        <div className="container flex h-16 max-w-screen-2xl items-center justify-between px-4 md:px-6">
          <div className="flex items-center gap-1 md:gap-2">
            {isMounted && (
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" size="icon" className="md:hidden">
                    <Menu className="h-5 w-5" />
                    <span className="sr-only">Open navigation</span>
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-[300px] sm:w-[400px]">
                  <nav className="flex flex-col gap-4 p-4">
                    <h3 className="font-semibold text-lg">Slides</h3>
                    {slideMetadata.map((slide, index) => ({ ...slide, index })).filter((slide) => !slide.backup).map((slide) => (
                      <Button
                        key={slide.index}
                        variant={currentSlide === slide.index ? "secondary" : "ghost"}
                        onClick={() => {
                          goToSlide(slide.index)
                          // Consider closing the sheet after navigation on mobile
                          // This requires passing the sheet's open/setOpen state down or using a ref
                        }}
                        className="justify-start"
                      >
                        {slide.index + 1}. {slide.title}
                      </Button>
                    ))}
                  </nav>
                </SheetContent>
              </Sheet>
            )}
            {isMounted && (
              <Button variant="ghost" size="icon" onClick={() => goToSlide(0)} title="Go to Hero Slide">
                <Home className="h-5 w-5" />
              </Button>
            )}
            {isMounted && !isBackupSlide && (
              <span className="text-md font-bold text-muted-foreground hidden md:block">
                Slide {officialSlideNumber} of {officialSlides.length}
              </span>
            )}
            {isMounted && isBackupSlide && (
              <span className="text-sm font-semibold text-muted-foreground hidden md:block">Backup / Q&amp;A</span>
            )}
          </div>

          <div className="flex-1 max-w-md mx-2 md:mx-4 hidden md:block">
            {isMounted && <Progress value={progressValue} className="w-full h-2" />}
          </div>

          <div className="flex items-center gap-1 md:gap-2">
            {isMounted && (
              <>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={goToPrevSlide}
                  disabled={currentSlide === 0}
                  title="Previous Slide (Left Arrow)"
                >
                  <ChevronLeft className="h-5 w-5" />
                  <span className="sr-only">Previous slide</span>
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={goToNextSlide}
                  disabled={currentSlide === totalSlides - 1}
                  title="Next Slide (Right Arrow)"
                >
                  <ChevronRight className="h-5 w-5" />
                  <span className="sr-only">Next slide</span>
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={toggleFullScreen}
                  title={isFullScreen ? "Exit Full Screen" : "Enter Full Screen"}
                >
                  {isFullScreen ? <Minimize className="h-5 w-5" /> : <Maximize className="h-5 w-5" />}
                  <span className="sr-only">{isFullScreen ? "Exit full screen" : "Enter full screen"}</span>
                </Button>
              </>
            )}
          </div>
        </div>
        <div className="md:hidden p-2 border-t border-border/40">
          <div className="flex items-center justify-between">
            {isMounted && (
              <>
                <span className="text-xs font-medium text-muted-foreground">
                  {isBackupSlide ? "Backup / Q&A" : `Slide ${officialSlideNumber}/${officialSlides.length}`}
                </span>
                <Progress value={progressValue} className="w-1/2 h-1.5" />
              </>
            )}
          </div>
        </div>
      </header>

      <main className="flex-1 min-h-0">{isMounted ? slides[currentSlide] : <div className="p-8 h-full flex items-center justify-center">Loading...</div>}</main>

      {presenterDebug && (
        <aside className="fixed bottom-3 left-3 z-[100] w-80 rounded-md border border-slate-700 bg-slate-950/95 p-3 font-mono text-xs text-slate-100 shadow-xl pointer-events-none">
          <div className="mb-2 font-sans text-sm font-semibold text-cyan-300">Presenter Debug</div>
          {presenterEvents.length === 0 ? (
            <div className="text-slate-400">Press a presenter key...</div>
          ) : (
            <div className="space-y-2">
              {presenterEvents.map((event, index) => (
                <div key={`${event.key}-${event.code}-${index}`} className={index === 0 ? "text-white" : "text-slate-400"}>
                  <div className="font-semibold text-cyan-300">{event.action}</div>
                  <div>key: {JSON.stringify(event.key)} | code: {event.code || "-"}</div>
                  <div>keyCode: {event.keyCode} | which: {event.which} | location: {event.location}</div>
                </div>
              ))}
            </div>
          )}
        </aside>
      )}
    </div>
  )
}
