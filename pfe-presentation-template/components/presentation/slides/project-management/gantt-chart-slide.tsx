"use client"
import SlideWrapper from "../../slide-wrapper"
import SlideHeader from "../../slide-header"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Brain,
  Route,
  Plug,
  ClipboardCheck,
  KanbanSquare,
  CheckCircle2,
  Shield,
  FileText,
  ArrowRight,
} from "lucide-react"

const months = [
  {
    month: "Month 1",
    phase: "Analysis & Architecture",
    short: "Analysis",
    icon: Brain,
    accent: "bg-blue-100 text-blue-700 border-blue-200",
    panel: "bg-blue-50/70",
    items: [
      "Requirements analysis",
      "System scoping",
      "Use cases",
      "Workflow architecture",
      "Initial Mastra setup",
    ],
  },
  {
    month: "Month 2",
    phase: "Core Workflow",
    short: "Core Workflow",
    icon: Route,
    accent: "bg-amber-100 text-amber-700 border-amber-200",
    panel: "bg-amber-50/70",
    items: [
      "Alert ingestion",
      "Normalization and correlation",
      "Deduplication",
      "Smart router",
      "Reasoning-support flow",
    ],
  },
  {
    month: "Month 3",
    phase: "Integration & Control",
    short: "Integration & Control",
    icon: Plug,
    accent: "bg-violet-100 text-violet-700 border-violet-200",
    panel: "bg-violet-50/70",
    items: [
      "Grafana MCP integration",
      "Qdrant retrieval",
      "Runbook matching",
      "Policy engine",
      "Execution supervision",
      "Validation and rollback",
    ],
  },
  {
    month: "Month 4",
    phase: "Validation & Documentation",
    short: "Validation",
    icon: ClipboardCheck,
    accent: "bg-emerald-100 text-emerald-700 border-emerald-200",
    panel: "bg-emerald-50/70",
    items: [
      "Unit and integration testing",
      "End-to-end workflow validation",
      "Reporting and traceability checks",
      "Documentation",
      "Final review and defense preparation",
    ],
  },
]

const methodologyPoints = [
  "Visual task flow",
  "Progressive prioritization",
  "Continuous adaptation",
  "Incremental validation",
  "Documentation and traceability",
]

const qaPoints = [
  { icon: CheckCircle2, label: "Component validation" },
  { icon: Shield, label: "Integration checks" },
  { icon: ClipboardCheck, label: "Workflow consistency" },
  { icon: FileText, label: "Documentation traceability" },
]

export default function GanttChartSlide() {
  return (
    <SlideWrapper>
      <div className="h-full min-h-0 flex flex-col">
        <SlideHeader
          badge="5 - Project Planning"
          title="REMEdion 4-Month Agile/Kanban Methodology"
          subtitle="Iterative task flow from foundation to validation"
          className="mb-4 [&>*:first-child]:mb-2 [&>*:first-child]:px-4 [&>*:first-child]:py-1.5 [&>*:first-child]:text-lg [&>h1]:mb-2 [&>h1]:text-4xl md:[&>h1]:text-5xl lg:[&>h1]:text-5xl xl:[&>h1]:text-6xl [&>p]:text-lg [&>p]:leading-snug md:[&>p]:text-xl"
        />

        <div className="flex-1 min-h-0 grid grid-cols-12 gap-3">
          <div className="col-span-8 flex flex-col gap-3">
            <Card className="shadow-md">
              <CardContent className="p-3">
                <div className="grid grid-cols-[1fr_auto_1fr_auto_1fr_auto_1fr] items-center gap-2">
                  {months.map((month, index) => (
                    <div key={month.month} className="contents">
                      <div className={`rounded-xl border px-3 py-2 ${month.accent}`}>
                        <div className="text-[10px] font-semibold uppercase tracking-wide opacity-80">{month.month}</div>
                        <div className="text-sm font-bold leading-tight">{month.short}</div>
                      </div>
                      {index < months.length - 1 && <ArrowRight className="h-4 w-4 text-muted-foreground" />}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-2 gap-3">
              {months.map((month) => (
                <Card key={month.month} className="shadow-md">
                  <CardContent className="p-3.5">
                    <div className="flex items-start justify-between gap-3 mb-2.5">
                      <div>
                        <Badge className={`mb-2 border ${month.accent}`}>{month.month}</Badge>
                        <h3 className="text-lg font-bold leading-tight xl:text-xl">{month.phase}</h3>
                      </div>
                      <div className={`rounded-xl border p-2.5 ${month.accent}`}>
                        <month.icon className="h-5 w-5" />
                      </div>
                    </div>

                    <div className={`rounded-xl border p-3 ${month.accent} ${month.panel}`}>
                      <div className="space-y-1.5">
                        {month.items.map((item) => (
                          <div
                            key={item}
                            className="flex items-start gap-2.5 rounded-md bg-white/75 px-2.5 py-1.5 dark:bg-slate-900/40"
                          >
                            <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-current opacity-70" />
                            <p className="text-sm font-medium leading-snug">{item}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <div className="col-span-4 flex flex-col gap-3">
            <Card className="shadow-md">
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-3">
                  <div className="rounded-xl bg-primary/10 p-2">
                    <KanbanSquare className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold leading-tight">Agile/Kanban Approach</h3>
                    <p className="text-sm text-muted-foreground">Iterative delivery guided by visual progress</p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-1.5">
                  {methodologyPoints.map((point) => (
                    <Badge key={point} variant="secondary" className="px-2.5 py-1 text-xs font-medium">
                      {point}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-md">
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-3">
                  <div className="rounded-xl bg-emerald-100 p-2 text-emerald-700">
                    <ClipboardCheck className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold leading-tight">Quality Assurance</h3>
                    <p className="text-sm text-muted-foreground">Checks carried throughout implementation</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  {qaPoints.map((point) => (
                    <div key={point.label} className="rounded-xl border bg-emerald-50/70 px-3 py-3">
                      <div className="flex items-start gap-2">
                        <point.icon className="mt-0.5 h-4 w-4 flex-shrink-0 text-emerald-700" />
                        <span className="text-sm font-semibold leading-snug text-emerald-900">{point.label}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </SlideWrapper>
  )
}
