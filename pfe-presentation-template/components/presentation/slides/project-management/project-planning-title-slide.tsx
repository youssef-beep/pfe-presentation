"use client"
import SlideWrapper from "../../slide-wrapper"

export default function ProjectPlanningTitleSlide() {
  return (
    <SlideWrapper>
      <div className="h-full w-full flex items-center justify-center bg-gradient-to-br from-amber-50 via-white to-orange-50 dark:from-slate-900 dark:via-slate-800 dark:to-amber-900">
        <div className="text-center">
          <h1 className="text-7xl md:text-8xl font-bold text-primary tracking-tight">Project Planning</h1>
          <p className="text-3xl text-muted-foreground mt-4">Methodology and Timeline</p>
        </div>
      </div>
    </SlideWrapper>
  )
}
