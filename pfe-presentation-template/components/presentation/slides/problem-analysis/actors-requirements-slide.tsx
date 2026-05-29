"use client"
import SlideWrapper from "../../slide-wrapper"
import SlideHeader from "../../slide-header"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, Shield, Zap, Lock, Server } from "lucide-react"

const objectives = [
  "Automate incident handling from alert ingestion to reporting.",
  "Reduce manual SRE intervention for repetitive incidents.",
  "Improve diagnosis using metrics, historical incidents, and runbook matching.",
  "Ensure safe remediation through policy checks, validation, and rollback.",
  "Preserve traceability through audit logs and reports.",
]

const scopeItems = [
  "Alert ingestion and normalization",
  "Smart routing and deduplication",
  "Parallel investigation agents",
  "LLM-based reasoning and proposal generation",
  "Policy decision and human approval when needed",
  "Execution, validation, rollback, and reporting",
]

const priorities = [
  { icon: Zap, label: "Performance" },
  { icon: Shield, label: "Reliability" },
  { icon: Lock, label: "Safety" },
  { icon: CheckCircle, label: "Traceability" },
  { icon: Server, label: "Scalability" },
]

export default function ActorsRequirementsSlide() {
  return (
    <SlideWrapper>
      <div className="h-full min-h-0 flex flex-col">
        <SlideHeader
          badge="4 - Objectives & Scope"
          title="Project Objectives & Scope"
          subtitle="Main objectives, system scope, and quality requirements"
          className="mb-4 [&>*:first-child]:mb-2 [&>*:first-child]:px-4 [&>*:first-child]:py-1.5 [&>*:first-child]:text-lg [&>h1]:mb-2 [&>h1]:text-5xl md:[&>h1]:text-6xl lg:[&>h1]:text-6xl [&>p]:max-w-3xl [&>p]:text-lg [&>p]:leading-snug md:[&>p]:text-xl"
        />

        <div className="flex-1 min-h-0 flex flex-col gap-3">
          <div className="grid flex-1 grid-cols-2 gap-3">
            <Card className="shadow-md h-full">
              <CardContent className="flex h-full flex-col p-4">
                <div className="mb-3 flex items-center gap-2">
                  <div className="rounded-lg bg-primary/10 p-2">
                    <CheckCircle className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold">Main Objectives</h3>
                </div>

                <div className="space-y-3">
                  {objectives.map((objective, index) => (
                    <div key={index} className="flex items-start gap-3 rounded-lg bg-muted/20 p-3">
                      <CheckCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary" />
                      <p className="text-base leading-snug">{objective}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-md h-full">
              <CardContent className="flex h-full flex-col p-4">
                <div className="mb-3 flex items-center gap-2">
                  <div className="rounded-lg bg-primary/10 p-2">
                    <Server className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold">System Scope</h3>
                </div>

                <div className="space-y-3">
                  {scopeItems.map((item, index) => (
                    <div key={index} className="flex items-start gap-3 rounded-lg bg-muted/20 p-3">
                      <Badge variant="secondary" className="mt-0.5 px-2 py-0 text-xs font-semibold">
                        {String(index + 1).padStart(2, "0")}
                      </Badge>
                      <p className="text-base leading-snug">{item}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-5 gap-2.5">
            {priorities.map((priority, index) => (
              <Card key={index} className="shadow-sm">
                <CardContent className="flex items-center justify-center gap-2 px-3 py-3">
                  <priority.icon className="h-4 w-4 text-primary flex-shrink-0" />
                  <span className="text-sm font-semibold">{priority.label}</span>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </SlideWrapper>
  )
}
