"use client"
import SlideWrapper from "../../slide-wrapper"
import SlideHeader from "../../slide-header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Activity, Database, BookOpenCheck, Users, CheckCircle2, UserCheck, XCircle } from "lucide-react"

const confidenceInputs = [
  { icon: Activity, label: "Metrics evidence" },
  { icon: Database, label: "Historical similarity" },
  { icon: BookOpenCheck, label: "Runbook match" },
  { icon: Users, label: "Agent agreement" },
]

const decisions = [
  {
    icon: CheckCircle2,
    title: "Auto-approve",
    condition: "High confidence + low risk",
    tone: "bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-300",
  },
  {
    icon: UserCheck,
    title: "Human validation",
    condition: "Medium confidence or sensitive action",
    tone: "bg-amber-50 text-amber-700 dark:bg-amber-900/20 dark:text-amber-300",
  },
  {
    icon: XCircle,
    title: "Reject",
    condition: "Low confidence or policy violation",
    tone: "bg-red-50 text-red-700 dark:bg-red-900/20 dark:text-red-300",
  },
]

export default function EvidenceConfidenceSlide() {
  return (
    <SlideWrapper>
      <div className="h-full min-h-0 flex flex-col">
        <SlideHeader
          badge="6 - Architecture"
          title="From Evidence to Confidence"
          subtitle="How investigation results become a safe decision"
          className="mb-4 [&>*:first-child]:mb-2 [&>*:first-child]:px-4 [&>*:first-child]:py-1.5 [&>*:first-child]:text-lg [&>h1]:mb-2 [&>h1]:text-4xl md:[&>h1]:text-5xl lg:[&>h1]:text-5xl xl:[&>h1]:text-6xl [&>p]:text-lg [&>p]:leading-snug md:[&>p]:text-xl"
        />

        <div className="flex-1 min-h-0 grid grid-cols-2 gap-5">
          <Card className="shadow-lg">
            <CardHeader className="px-5 pt-5 pb-3">
              <CardTitle className="text-2xl text-primary">Confidence Formula</CardTitle>
            </CardHeader>
            <CardContent className="px-5 pb-5 space-y-4">
              <div className="rounded-xl border-2 border-primary/20 bg-primary/5 p-4 text-center">
                <p className="text-xl font-bold text-primary">
                  Confidence = Evidence + Similarity + Runbook + Agreement
                </p>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {confidenceInputs.map((input) => (
                  <div key={input.label} className="rounded-xl bg-muted/40 p-3">
                    <input.icon className="mb-2 h-6 w-6 text-primary" />
                    <p className="text-base font-semibold leading-snug">{input.label}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-lg">
            <CardHeader className="px-5 pt-5 pb-3">
              <CardTitle className="text-2xl text-primary">Decision Logic</CardTitle>
            </CardHeader>
            <CardContent className="px-5 pb-5 space-y-3">
              {decisions.map((decision) => (
                <div key={decision.title} className={`rounded-xl p-4 ${decision.tone}`}>
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <decision.icon className="h-7 w-7" />
                      <div>
                        <h3 className="text-lg font-bold">{decision.title}</h3>
                        <p className="text-sm leading-snug opacity-80">{decision.condition}</p>
                      </div>
                    </div>
                    <Badge variant="secondary" className="shrink-0">
                      Policy
                    </Badge>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </SlideWrapper>
  )
}
