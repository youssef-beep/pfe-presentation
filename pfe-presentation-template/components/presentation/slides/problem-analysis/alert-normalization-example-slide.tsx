"use client"

import SlideWrapper from "../../slide-wrapper"
import SlideHeader from "../../slide-header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, FileJson, ShieldCheck } from "lucide-react"

const rawAlert = `{
  "receiver": "openstack-alerts",
  "status": "firing",
  "labels": {
    "alertname": "RabbitMQExporterDown",
    "service": "rabbitmq",
    "severity": "critical",
    "instance": "rabbitmq-01:9090"
  },
  "annotations": {
    "summary": "RabbitMQ exporter is down",
    "description": "No metrics from rabbitmq-01"
  },
  "startsAt": "2026-04-20T10:15:30Z"
}`

const normalizedIncident = `{
  "incident_id": "inc_20260420_101530",
  "source": "alertmanager",
  "type": "service_unavailable",
  "service": "rabbitmq",
  "component": "exporter",
  "severity": "critical",
  "status": "active",
  "started_at": "2026-04-20T10:15:30Z",
  "fingerprint": "rabbitmq_exporter_down_rabbitmq_01",
  "routing_hint": "investigation_required"
}`

const steps = ["Deduplication", "Routing", "Investigation", "Policy checks"]

export default function AlertNormalizationExampleSlide() {
  return (
    <SlideWrapper>
      <div className="h-full min-h-0 flex flex-col">
        <SlideHeader
          badge="6 - Architecture"
          title="Alert Normalization Example"
          subtitle="From raw monitoring payload to unified incident format"
          className="mb-4 [&>*:first-child]:mb-2 [&>*:first-child]:px-4 [&>*:first-child]:py-1.5 [&>*:first-child]:text-lg [&>h1]:mb-2 [&>h1]:text-5xl md:[&>h1]:text-6xl lg:[&>h1]:text-6xl [&>p]:text-lg [&>p]:leading-snug md:[&>p]:text-xl"
        />

        <div className="grid grid-cols-[1fr_auto_1fr] gap-4 flex-1 min-h-0 items-stretch">
          <Card className="shadow-lg border-orange-200 bg-orange-50/40 dark:bg-orange-950/10">
            <CardHeader className="pb-2 px-4 pt-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-orange-100 dark:bg-orange-900/30">
                  <FileJson className="h-6 w-6 text-orange-600" />
                </div>
                <div>
                  <Badge variant="secondary" className="mb-1 bg-orange-100 text-orange-700">
                    Before
                  </Badge>
                  <CardTitle className="text-2xl text-primary leading-tight">
                    Before Normalization - Raw Alert
                  </CardTitle>
                </div>
              </div>
            </CardHeader>
            <CardContent className="px-4 pb-4">
              <pre className="h-full max-h-[440px] overflow-hidden rounded-lg bg-slate-950 p-4 text-[12px] leading-[1.35] text-slate-100 shadow-inner">
                <code>{rawAlert}</code>
              </pre>
            </CardContent>
          </Card>

          <div className="flex items-center justify-center">
            <div className="rounded-full bg-primary p-3 shadow-lg">
              <ArrowRight className="h-8 w-8 text-primary-foreground" />
            </div>
          </div>

          <Card className="shadow-lg border-emerald-200 bg-emerald-50/40 dark:bg-emerald-950/10">
            <CardHeader className="pb-2 px-4 pt-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-emerald-100 dark:bg-emerald-900/30">
                  <ShieldCheck className="h-6 w-6 text-emerald-600" />
                </div>
                <div>
                  <Badge variant="secondary" className="mb-1 bg-emerald-100 text-emerald-700">
                    After
                  </Badge>
                  <CardTitle className="text-2xl text-primary leading-tight">
                    After Normalization - Incident Object
                  </CardTitle>
                </div>
              </div>
            </CardHeader>
            <CardContent className="px-4 pb-4">
              <pre className="h-full max-h-[440px] overflow-hidden rounded-lg bg-slate-950 p-4 text-[12px] leading-[1.35] text-slate-100 shadow-inner">
                <code>{normalizedIncident}</code>
              </pre>
            </CardContent>
          </Card>
        </div>

        <Card className="mt-4 border-primary/20 bg-primary/5 shadow-md">
          <CardContent className="flex items-center justify-between gap-4 p-4">
            <p className="text-lg font-medium leading-snug text-primary">
              Normalization converts heterogeneous alerts into a common schema used by deduplication, routing,
              investigation agents, and policy checks.
            </p>
            <div className="hidden lg:flex gap-2">
              {steps.map((step) => (
                <Badge key={step} variant="secondary" className="px-3 py-1.5 text-sm font-semibold">
                  {step}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </SlideWrapper>
  )
}
