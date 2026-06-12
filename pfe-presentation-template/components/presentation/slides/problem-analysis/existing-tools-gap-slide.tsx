"use client"
import SlideWrapper from "../../slide-wrapper"
import SlideHeader from "../../slide-header"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Activity, BrainCircuit, Wrench, GitBranch, ArrowRight } from "lucide-react"

const toolLimits = [
  {
    icon: Activity,
    title: "Traditional Monitoring",
    text: "Detects issues but does not remediate.",
    tone: "from-blue-500 to-cyan-500",
  },
  {
    icon: BrainCircuit,
    title: "AIOps Platforms",
    text: "Correlate and analyze, but may be opaque or proprietary.",
    tone: "from-purple-500 to-indigo-500",
  },
  {
    icon: Wrench,
    title: "Automation Tools",
    text: "Execute playbooks but do not reason over evidence.",
    tone: "from-orange-500 to-amber-500",
  },
]

export default function ExistingToolsGapSlide() {
  return (
    <SlideWrapper>
      <div className="h-full min-h-0 flex flex-col">
        <SlideHeader
          badge="2 - General Context"
          title="Why Existing Tools Are Not Enough"
          subtitle="Monitoring, AIOps, and automation each solve only part of the incident lifecycle"
          className="mb-4 [&>*:first-child]:mb-2 [&>*:first-child]:px-4 [&>*:first-child]:py-1.5 [&>*:first-child]:text-lg [&>h1]:mb-2 [&>h1]:text-4xl md:[&>h1]:text-5xl lg:[&>h1]:text-5xl xl:[&>h1]:text-6xl [&>p]:text-lg [&>p]:leading-snug md:[&>p]:text-xl"
        />

        <div className="flex-1 min-h-0 flex flex-col gap-4">
          <div className="grid grid-cols-3 gap-4">
            {toolLimits.map((item) => (
              <Card key={item.title} className="shadow-lg border-0 overflow-hidden">
                <CardContent className="p-5">
                  <div className={`mb-4 inline-flex rounded-xl bg-gradient-to-br ${item.tone} p-3 shadow-md`}>
                    <item.icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="mb-2 text-xl font-bold">{item.title}</h3>
                  <p className="text-base leading-snug text-muted-foreground">{item.text}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card className="shadow-xl border-2 border-primary/20 bg-gradient-to-r from-primary/5 to-secondary/5">
            <CardContent className="p-5">
              <div className="flex items-center justify-center gap-3 text-center">
                <Badge className="px-4 py-2 text-base">Gap</Badge>
                <ArrowRight className="h-6 w-6 text-muted-foreground" />
                <p className="max-w-4xl text-xl font-semibold leading-snug text-primary">
                  A unified workflow is needed for investigation, reasoning, policy control, execution, validation,
                  and traceability.
                </p>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-6 gap-2 text-center">
            {["Investigate", "Reason", "Control", "Execute", "Validate", "Trace"].map((step) => (
              <div key={step} className="rounded-lg bg-muted/40 px-3 py-2 text-sm font-semibold text-muted-foreground">
                {step}
              </div>
            ))}
          </div>
        </div>
      </div>
    </SlideWrapper>
  )
}
