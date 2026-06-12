"use client"
import SlideWrapper from "../../slide-wrapper"
import SlideHeader from "../../slide-header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"
import {
  Network,
  Server,
  Database,
  Shield,
  ArrowRight,
  ArrowDown,
  Brain,
  Zap,
  Activity,
} from "lucide-react"

export default function TargetArchitectureSlide() {
  return (
    <SlideWrapper>
      <div className="h-full flex flex-col">
        <SlideHeader
          badge="6 • System Architecture"
          title="Target Architecture Diagram"
          subtitle="Complete system overview with all integration points"
        />

        <div className="flex-1 flex items-center justify-center">
          <Card className="shadow-lg w-full max-w-6xl">
            <CardContent className="p-6">
              {/* ASCII-style Architecture Diagram */}
              <div className="font-mono text-xs bg-slate-900 text-green-400 p-4 rounded-lg overflow-x-auto">
                <pre>{`
┌─────────────────────────────────────────────────────────────────────────────────┐
│                              MONITORING LAYER                                    │
│  ┌─────────────┐    ┌─────────────┐    ┌─────────────┐    ┌─────────────┐       │
│  │ Prometheus  │    │ AlertManager│    │ OpenSearch  │    │  Grafana    │       │
│  │  (metrics)  │───▶│  (routing)  │───▶│   (logs)    │    │  (visual)   │       │
│  └─────────────┘    └──────┬──────┘    └─────────────┘    └─────────────┘       │
└────────────────────────────┼────────────────────────────────────────────────────┘
                             │ Webhook
                             ▼
┌─────────────────────────────────────────────────────────────────────────────────┐
│                              Remedion CORE                                      │
│  ┌─────────┐  ┌─────────┐  ┌─────────┐  ┌─────────────────────────────────────┐ │
│  │ INGEST  │─▶│  DEDUP  │─▶│ ROUTER  │─▶│         INVESTIGATION               │ │
│  │         │  │ (Redis) │  │ (Smart) │  │  ┌─────────┬─────────┬─────────┐    │ │
│  └─────────┘  └─────────┘  └────┬────┘  │  │ Metrics │Incident │ Runbook │    │ │
│                                 │       │  │  Agent  │  Agent  │  Agent  │    │ │
│                                 │       │  └────┬────┴────┬────┴────┬────┘    │ │
│                                 │       └───────┴─────────┴─────────┴─────────┘ │
│                                 ▼                         │                      │
│  ┌─────────────────────────────────────────────────────────────────────────────┐│
│  │                         REASONING PIPELINE                                   ││
│  │   RETRIEVER ──▶ REASONER (LLM) ──▶ POLICY ──▶ EXECUTOR ──▶ VALIDATOR        ││
│  └─────────────────────────────────────────────────────────────────────────────┘│
└─────────────────────────────────────────────────────────────────────────────────┘
                             │
                             ▼
┌─────────────────────────────────────────────────────────────────────────────────┐
│                              EXECUTION LAYER                                     │
│  ┌─────────────┐    ┌─────────────┐    ┌─────────────┐    ┌─────────────┐       │
│  │     AWX     │    │   Redmine   │    │   Grafana   │    │   Qdrant    │       │
│  │ (automation)│    │ (ticketing) │    │(validation) │    │   (RAG)     │       │
│  └─────────────┘    └─────────────┘    └─────────────┘    └─────────────┘       │
└─────────────────────────────────────────────────────────────────────────────────┘
                             │
                             ▼
┌─────────────────────────────────────────────────────────────────────────────────┐
│                           TARGET PLATFORM (OpenStack)                            │
│  ┌─────────────┐    ┌─────────────┐    ┌─────────────┐    ┌─────────────┐       │
│  │    Nova     │    │   Neutron   │    │   Cinder    │    │  RabbitMQ   │       │
│  │  (compute)  │    │  (network)  │    │  (storage)  │    │  (message)  │       │
│  └─────────────┘    └─────────────┘    └─────────────┘    └─────────────┘       │
└─────────────────────────────────────────────────────────────────────────────────┘
                `}</pre>
              </div>

              <div className="mt-4 grid grid-cols-4 gap-2 text-center">
                <div className="p-2 rounded bg-blue-500/10">
                  <Badge variant="secondary" className="text-xs">Monitoring</Badge>
                  <p className="text-xs text-muted-foreground mt-1">Data sources</p>
                </div>
                <div className="p-2 rounded bg-purple-500/10">
                  <Badge variant="secondary" className="text-xs">Remedion</Badge>
                  <p className="text-xs text-muted-foreground mt-1">AI processing</p>
                </div>
                <div className="p-2 rounded bg-green-500/10">
                  <Badge variant="secondary" className="text-xs">Execution</Badge>
                  <p className="text-xs text-muted-foreground mt-1">Actions</p>
                </div>
                <div className="p-2 rounded bg-orange-500/10">
                  <Badge variant="secondary" className="text-xs">Target</Badge>
                  <p className="text-xs text-muted-foreground mt-1">Infrastructure</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </SlideWrapper>
  )
}
