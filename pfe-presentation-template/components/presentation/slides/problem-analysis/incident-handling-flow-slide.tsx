"use client"
import SlideWrapper from "../../slide-wrapper"
import SlideHeader from "../../slide-header"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Bell, Filter, Route, Search, Brain, ShieldCheck, Wrench, BarChart3, FileText } from "lucide-react"

const flowSteps = [
  { icon: Bell, title: "Alert", detail: "Alertmanager / OpenSearch" },
  { icon: Filter, title: "Normalize", detail: "Deduplication" },
  { icon: Route, title: "Route", detail: "Smart Router" },
  { icon: Search, title: "Investigate", detail: "Agents" },
  { icon: Brain, title: "Reason", detail: "LLM proposal" },
  { icon: ShieldCheck, title: "Decide", detail: "Policy Engine" },
  { icon: Wrench, title: "Execute", detail: "AWX" },
  { icon: BarChart3, title: "Validate", detail: "Grafana" },
  { icon: FileText, title: "Report", detail: "Redmine / audit" },
]

export default function IncidentHandlingFlowSlide() {
  return (
    <SlideWrapper>
      <div className="h-full min-h-0 flex flex-col">
        <SlideHeader
          badge="3 - Proposed Solution"
          title="How Remedion Handles One Incident"
          subtitle="From alert intake to controlled remediation and traceability"
          className="mb-4 [&>*:first-child]:mb-2 [&>*:first-child]:px-4 [&>*:first-child]:py-1.5 [&>*:first-child]:text-lg [&>h1]:mb-2 [&>h1]:text-4xl md:[&>h1]:text-5xl lg:[&>h1]:text-5xl xl:[&>h1]:text-6xl [&>p]:text-lg [&>p]:leading-snug md:[&>p]:text-xl"
        />

        <div className="flex-1 min-h-0 flex flex-col justify-center gap-5">
          <div className="grid grid-cols-3 gap-4">
            {flowSteps.map((step, index) => (
              <Card key={step.title} className="shadow-md border-l-4 border-l-primary">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10">
                      <step.icon className="h-6 w-6 text-primary" />
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <Badge variant="secondary" className="px-2 py-0.5 text-xs">
                          {index + 1}
                        </Badge>
                        <h3 className="text-lg font-bold">{step.title}</h3>
                      </div>
                      <p className="text-sm leading-snug text-muted-foreground">{step.detail}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card className="shadow-lg bg-gradient-to-r from-primary/5 via-background to-secondary/5">
            <CardContent className="p-4">
              <div className="flex flex-wrap items-center justify-center gap-2 text-sm font-semibold text-muted-foreground">
                {[
                  "Alertmanager/OpenSearch",
                  "Normalization + deduplication",
                  "Smart Router",
                  "Investigation agents",
                  "LLM reasoning",
                  "Policy decision",
                  "AWX execution",
                  "Grafana validation",
                  "Redmine/audit/reporting",
                ].map((item, index, items) => (
                  <div key={item} className="flex items-center gap-2">
                    <span>{item}</span>
                    {index < items.length - 1 && <span className="text-primary">-&gt;</span>}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </SlideWrapper>
  )
}
