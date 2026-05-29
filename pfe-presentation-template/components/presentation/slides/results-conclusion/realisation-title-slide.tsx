"use client"
import SlideWrapper from "../../slide-wrapper"

export default function RealisationTitleSlide() {
  return (
    <SlideWrapper>
      <div className="h-full w-full flex items-center justify-center bg-gradient-to-br from-emerald-50 via-white to-green-50 dark:from-slate-900 dark:via-slate-800 dark:to-emerald-900">
        <div className="text-center">
          <h1 className="text-7xl md:text-8xl font-bold text-primary tracking-tight">Implementation</h1>
          <p className="text-2xl text-muted-foreground mt-4">& Validation</p>
        </div>
      </div>
    </SlideWrapper>
  )
}
