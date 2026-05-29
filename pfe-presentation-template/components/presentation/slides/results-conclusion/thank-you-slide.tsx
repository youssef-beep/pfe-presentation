"use client"
import SlideWrapper from "../../slide-wrapper"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Brain, MessageCircle } from "lucide-react"

export default function ThankYouSlide() {
  return (
    <SlideWrapper className="bg-gradient-to-br from-primary/10 via-background to-secondary/10 dark:from-primary/20 dark:via-slate-900 dark:to-secondary/20">
      <div className="h-full flex flex-col justify-center items-center text-center space-y-10">
        <Brain className="h-24 w-24 text-primary animate-pulse" />

        <h1 className="text-6xl md:text-7xl font-extrabold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
          Thank You
        </h1>

        <h2 className="text-3xl md:text-4xl text-muted-foreground">
          Questions & Discussion
        </h2>

        <Card className="shadow-xl max-w-3xl">
          <CardContent className="p-8">
            <h3 className="font-bold text-xl text-primary mb-5 flex items-center justify-center">
              <MessageCircle className="h-6 w-6 mr-3" />
              Project Summary
            </h3>
            <p className="text-lg text-muted-foreground leading-relaxed">
              <span className="font-bold text-primary">REMEdion</span> is an AI-driven self-healing automation system
              that reduces manual SRE work by <span className="text-green-500 font-bold">85%</span>,
              MTTR by <span className="text-green-500 font-bold">93%</span>,
              and alert volume by <span className="text-green-500 font-bold">70%</span> through
              intelligent multi-agent investigation and automated remediation.
            </p>
          </CardContent>
        </Card>

        <div className="flex flex-wrap justify-center gap-4">
          <Badge variant="secondary" className="text-base px-5 py-2.5">
            Mastra
          </Badge>
          <Badge variant="secondary" className="text-base px-5 py-2.5">
            Multi-Agent AI
          </Badge>
          <Badge variant="secondary" className="text-base px-5 py-2.5">
            Self-Healing
          </Badge>
          <Badge variant="secondary" className="text-base px-5 py-2.5">
            OpenStack
          </Badge>
          <Badge variant="secondary" className="text-base px-5 py-2.5">
            SRE Automation
          </Badge>
        </div>

        <div className="text-lg text-muted-foreground mt-6">
          <p className="font-bold text-xl">Youssef Hassine</p>
          <p className="mt-2 text-base">Academic Year 2025-2026</p>
        </div>
      </div>
    </SlideWrapper>
  )
}
