"use client"

import { useEffect, useState, type ReactNode } from "react"
import {
  ReactFlow,
  Background,
  Controls,
  Handle,
  MarkerType,
  Position,
  type Edge,
  type Node,
  type NodeProps,
} from "@xyflow/react"
import "@xyflow/react/dist/style.css"
import {
  AlertTriangle,
  Activity,
  BookOpen,
  BrainCircuit,
  Calculator,
  CheckCircle2,
  Clock3,
  Code2,
  Database,
  FileSearch,
  Gauge,
  History,
  ListChecks,
  Maximize2,
  Search,
  ServerCog,
  ShieldCheck,
  Sparkles,
  TerminalSquare,
  X,
  type LucideIcon,
} from "lucide-react"
import SlideWrapper from "../../slide-wrapper"
import SlideHeader from "../../slide-header"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

type Tone = "blue" | "purple" | "cyan" | "green" | "orange" | "red"

interface DiagramNodeData extends Record<string, unknown> {
  title: string
  subtitle?: string
  icon: LucideIcon
  tone: Tone
  lines?: string[]
  pills?: string[]
  confidence?: string
  pulseDelay?: number
  handles?: { target?: boolean; source?: boolean; sourceTop?: boolean; sourceBottom?: boolean }
}

const toneStyles: Record<Tone, { gradient: string; border: string; icon: string; handle: string; glow: string }> = {
  blue: { gradient: "from-blue-900/90 to-cyan-900/90", border: "border-blue-500/50", icon: "text-blue-400", handle: "!bg-blue-500", glow: "rgba(59,130,246,.55)" },
  purple: { gradient: "from-purple-900/90 to-indigo-900/90", border: "border-purple-500/50", icon: "text-purple-400", handle: "!bg-purple-500", glow: "rgba(168,85,247,.55)" },
  cyan: { gradient: "from-cyan-900/90 to-teal-900/90", border: "border-cyan-500/50", icon: "text-cyan-400", handle: "!bg-cyan-500", glow: "rgba(6,182,212,.55)" },
  green: { gradient: "from-green-900/90 to-emerald-900/90", border: "border-green-500/50", icon: "text-green-400", handle: "!bg-green-500", glow: "rgba(34,197,94,.55)" },
  orange: { gradient: "from-orange-900/90 to-amber-900/90", border: "border-orange-500/50", icon: "text-orange-400", handle: "!bg-orange-500", glow: "rgba(249,115,22,.55)" },
  red: { gradient: "from-red-900/90 to-rose-900/90", border: "border-red-500/50", icon: "text-red-400", handle: "!bg-red-500", glow: "rgba(239,68,68,.55)" },
}

function DiagramNode({ data }: NodeProps<Node<DiagramNodeData>>) {
  const [pulse, setPulse] = useState(false)
  const style = toneStyles[data.tone]
  const Icon = data.icon

  useEffect(() => {
    const interval = setInterval(() => {
      setPulse(true)
      setTimeout(() => setPulse(false), 900)
    }, data.pulseDelay ?? 3500)
    return () => clearInterval(interval)
  }, [data.pulseDelay])

  return (
    <div className="relative">
      {data.handles?.target && <Handle type="target" position={Position.Left} className={`h-3 w-3 ${style.handle}`} />}
      <div
        className={`min-w-[180px] rounded-xl border-2 bg-gradient-to-br ${style.gradient} ${style.border} p-4 text-white shadow-xl backdrop-blur-sm transition-all duration-300 ${pulse ? "scale-105" : ""}`}
        style={{ boxShadow: pulse ? `0 0 30px ${style.glow}` : undefined }}
      >
        <div className="flex items-start gap-2.5">
          <Icon className={`mt-0.5 h-6 w-6 flex-shrink-0 ${style.icon} ${pulse ? "animate-pulse" : ""}`} />
          <div className="min-w-0">
            <div className="text-base font-bold leading-tight">{data.title}</div>
            {data.subtitle && <div className="mt-1 text-xs leading-snug text-white/70">{data.subtitle}</div>}
          </div>
        </div>
        {data.pills && (
          <div className="mt-3 flex max-w-[250px] flex-wrap gap-1.5">
            {data.pills.map((pill) => <Badge key={pill} className="bg-white/15 text-[10px] text-white hover:bg-white/15">{pill}</Badge>)}
          </div>
        )}
        {data.lines && (
          <div className="mt-3 space-y-1.5">
            {data.lines.map((line) => <div key={line} className="rounded-md border border-white/10 bg-black/20 px-2.5 py-1.5 font-mono text-[10px] text-white/85">{line}</div>)}
          </div>
        )}
        {data.confidence && (
          <div className="mt-3 flex items-center gap-2 rounded-lg bg-green-400/20 px-2.5 py-1.5 text-xs font-semibold text-green-100">
            <CheckCircle2 className="h-3.5 w-3.5" />{data.confidence}
          </div>
        )}
      </div>
      {data.handles?.source && <Handle type="source" position={Position.Right} className={`h-3 w-3 ${style.handle}`} />}
      {data.handles?.sourceTop && <Handle id="top" type="source" position={Position.Right} className={`h-3 w-3 ${style.handle} !top-[32%]`} />}
      {data.handles?.sourceBottom && <Handle id="bottom" type="source" position={Position.Right} className={`h-3 w-3 ${style.handle} !top-[68%]`} />}
    </div>
  )
}

const nodeTypes = { diagram: DiagramNode }

interface InfoBlock {
  icon: LucideIcon
  title: string
  text: string
  tone: string
}

function FlowSlide({
  title,
  subtitle,
  nodes,
  edges,
  info,
  stats,
}: {
  title: string
  subtitle: string
  nodes: Node<DiagramNodeData>[]
  edges: Edge[]
  info: InfoBlock[]
  stats: Array<{ value: string; label: string; color: string }>
}) {
  const [isFullscreen, setIsFullscreen] = useState(false)

  const flow = (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      nodeTypes={nodeTypes}
      nodesDraggable={false}
      nodesConnectable={false}
      elementsSelectable={false}
      fitView
      fitViewOptions={{ padding: 0.1 }}
      minZoom={0.35}
      maxZoom={1.5}
    >
      <Background color="#475569" gap={24} size={1} />
      <Controls showInteractive={false} className="bg-white rounded-lg shadow-lg" />
    </ReactFlow>
  )

  if (isFullscreen) {
    return (
      <div className="fixed inset-0 z-[9999] bg-slate-900">
        <div className="absolute left-0 right-0 top-0 z-50 flex items-center justify-between bg-gradient-to-b from-slate-950 to-transparent px-6 py-4 text-white">
          <div><h2 className="text-xl font-bold">{title}</h2><p className="text-sm text-slate-300">{subtitle}</p></div>
          <Button variant="outline" size="sm" className="bg-white text-slate-800" onClick={() => setIsFullscreen(false)}><X className="mr-2 h-4 w-4" />Exit Fullscreen</Button>
        </div>
        <div className="h-full w-full pt-16">{flow}</div>
      </div>
    )
  }

  return (
    <SlideWrapper>
      <div className="flex h-full min-h-0 flex-col">
        <SlideHeader
          badge="Backup / Q&A"
          title={title}
          subtitle={subtitle}
          className="mb-3 [&>*:first-child]:mb-2 [&>*:first-child]:px-4 [&>*:first-child]:py-1.5 [&>*:first-child]:text-base [&>h1]:mb-2 [&>h1]:text-4xl md:[&>h1]:text-5xl lg:[&>h1]:text-5xl [&>p]:text-lg"
        />
        <div className="grid flex-1 min-h-0 grid-cols-4 gap-3">
          <div className="relative col-span-3 min-h-0 overflow-hidden rounded-xl border bg-gradient-to-br from-slate-900 to-slate-800 shadow-lg">
            {flow}
            <Button size="sm" variant="outline" onClick={() => setIsFullscreen(true)} className="absolute right-2.5 top-2.5 z-50 h-8 bg-white px-2.5 text-xs text-slate-700 shadow-md">
              <Maximize2 className="mr-1 h-4 w-4" />Fullscreen
            </Button>
          </div>
          <div className="min-h-0 space-y-3">
            {info.map((item) => (
              <Card key={item.title} className="shadow-lg">
                <CardContent className="p-3.5">
                  <div className="mb-2 flex items-center gap-2"><item.icon className={`h-5 w-5 ${item.tone}`} /><h3 className="text-sm font-bold">{item.title}</h3></div>
                  <p className="text-xs leading-snug text-muted-foreground">{item.text}</p>
                </CardContent>
              </Card>
            ))}
            <Card className="bg-gradient-to-br from-primary/5 to-secondary/5 shadow-lg">
              <CardContent className="grid grid-cols-2 gap-2 p-3">
                {stats.map((stat) => <div key={stat.label} className="rounded-lg bg-white p-2 text-center"><div className={`text-lg font-bold ${stat.color}`}>{stat.value}</div><div className="text-[10px] text-muted-foreground">{stat.label}</div></div>)}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </SlideWrapper>
  )
}

const edge = (id: string, source: string, target: string, color: string, label?: string, sourceHandle?: string): Edge => ({
  id, source, target, sourceHandle, animated: true,
  style: { stroke: color, strokeWidth: 2.5 },
  markerEnd: { type: MarkerType.ArrowClosed, color },
  label,
  labelStyle: { fill: color, fontSize: 11, fontWeight: 700 },
  labelBgStyle: { fill: "#0f172a", fillOpacity: 0.85 },
  labelBgPadding: [5, 3],
  labelBgBorderRadius: 5,
})

export function PrometheusDiagnosisBackupSlide() {
  const nodes: Node<DiagramNodeData>[] = [
    { id: "query", type: "diagram", position: { x: 0, y: 170 }, data: { title: "Query Prometheus", subtitle: "Request queue telemetry", icon: Search, tone: "blue", lines: ["rabbitmq_queue_messages{...}"], handles: { source: true }, pulseDelay: 2500 } },
    { id: "check", type: "diagram", position: { x: 260, y: 150 }, data: { title: "Check Result", subtitle: "Evaluate the response", icon: ListChecks, tone: "purple", pills: ["Has Data", "Empty / No data"], handles: { target: true, sourceTop: true, sourceBottom: true }, pulseDelay: 3100 } },
    { id: "found", type: "diagram", position: { x: 570, y: 315 }, data: { title: "DATA FOUND", subtitle: "Return to Reasoner", icon: CheckCircle2, tone: "green", confidence: "Evidence ready", handles: { target: true }, pulseDelay: 4200 } },
    { id: "exists", type: "diagram", position: { x: 540, y: 20 }, data: { title: "Metric Exists?", subtitle: "Verify metric metadata", icon: FileSearch, tone: "orange", handles: { target: true, source: true }, pulseDelay: 3500 } },
    { id: "health", type: "diagram", position: { x: 790, y: 20 }, data: { title: "Target Health", subtitle: "Check exporter health", icon: Gauge, tone: "orange", lines: ['up{job="rabbitmq"}'], handles: { target: true, source: true }, pulseDelay: 4000 } },
    { id: "window", type: "diagram", position: { x: 1040, y: 20 }, data: { title: "Time Window", subtitle: "Expand the query range", icon: Clock3, tone: "orange", lines: ["now-1h, now-24h"], handles: { target: true, source: true }, pulseDelay: 4500 } },
    { id: "down", type: "diagram", position: { x: 1040, y: 210 }, data: { title: "TARGET_DOWN", subtitle: "Exporter offline", icon: AlertTriangle, tone: "red", handles: { target: true }, pulseDelay: 5000 } },
  ]
  const edges = [
    edge("q-c", "query", "check", "#3b82f6"),
    edge("c-f", "check", "found", "#22c55e", "Has Data", "bottom"),
    edge("c-e", "check", "exists", "#f97316", "Empty / No data", "top"),
    edge("e-h", "exists", "health", "#f97316"),
    edge("h-w", "health", "window", "#f97316"),
    edge("w-d", "window", "down", "#ef4444", "Still empty"),
  ]
  return <FlowSlide title="Metrics Agent" subtitle="Smart diagnostics for empty or missing Prometheus telemetry" nodes={nodes} edges={edges} info={[
    { icon: CheckCircle2, title: "Healthy Path", text: "A valid series returns directly to the reasoner as usable evidence.", tone: "text-green-500" },
    { icon: AlertTriangle, title: "Diagnostic Path", text: "Missing data triggers metric existence, target health, and time-window checks.", tone: "text-orange-500" },
  ]} stats={[{ value: "2", label: "Decision Paths", color: "text-purple-500" }, { value: "4", label: "Diagnostic Checks", color: "text-orange-500" }]} />
}

export function QdrantSearchBackupSlide() {
  const nodes: Node<DiagramNodeData>[] = [
    { id: "alert", type: "diagram", position: { x: 0, y: 150 }, data: { title: "Alert", subtitle: "Nova Instance Boot Failure", icon: AlertTriangle, tone: "red", handles: { source: true }, pulseDelay: 2500 } },
    { id: "embed", type: "diagram", position: { x: 220, y: 150 }, data: { title: "Embedding", subtitle: "Vectorize incident context", icon: Sparkles, tone: "blue", pills: ["1536 dimensions"], handles: { target: true, source: true }, pulseDelay: 3100 } },
    { id: "qdrant", type: "diagram", position: { x: 460, y: 135 }, data: { title: "Qdrant Search", subtitle: "1,247 incidents indexed", icon: Database, tone: "purple", pills: ["cosine similarity", "top-k retrieval"], handles: { target: true, source: true }, pulseDelay: 3600 } },
    { id: "matches", type: "diagram", position: { x: 720, y: 65 }, data: { title: "Matches", subtitle: "Ranked historical incidents", icon: FileSearch, tone: "cyan", lines: ["94%  Nova hypervisor memory", "87%  KVM connection timeout", "81%  Instance stuck BUILDING"], handles: { target: true, source: true }, pulseDelay: 4200 } },
    { id: "evidence", type: "diagram", position: { x: 1030, y: 145 }, data: { title: "Evidence", subtitle: "Retrieved incident evidence", icon: BrainCircuit, tone: "green", confidence: "confidence score: 0.87", handles: { target: true }, pulseDelay: 4800 } },
  ]
  const edges = [edge("a-e", "alert", "embed", "#3b82f6"), edge("e-q", "embed", "qdrant", "#8b5cf6"), edge("q-m", "qdrant", "matches", "#06b6d4"), edge("m-v", "matches", "evidence", "#22c55e")]
  return <FlowSlide title="Incident Agent" subtitle="Semantic retrieval pipeline for evidence-backed incident reasoning" nodes={nodes} edges={edges} info={[
    { icon: Database, title: "Semantic Retrieval", text: "The alert is embedded and compared with resolved incidents using cosine similarity.", tone: "text-purple-500" },
    { icon: BrainCircuit, title: "Evidence Output", text: "Ranked matches and confidence are delivered to the reasoner.", tone: "text-green-500" },
  ]} stats={[{ value: "1,247", label: "Indexed Incidents", color: "text-purple-500" }, { value: "94%", label: "Best Match", color: "text-green-500" }]} />
}

export function RunbookMatchingBackupSlide() {
  const nodes: Node<DiagramNodeData>[] = [
    { id: "alert", type: "diagram", position: { x: 0, y: 150 }, data: { title: "Alert", subtitle: "Backend Queue Backlog", icon: AlertTriangle, tone: "red", pills: ["cinder-scheduler"], handles: { source: true }, pulseDelay: 2500 } },
    { id: "patterns", type: "diagram", position: { x: 220, y: 130 }, data: { title: "Pattern Extract", subtitle: "Normalize alert signature", icon: Search, tone: "blue", pills: ["queue_backlog", "rabbitmq", "cinder-scheduler"], handles: { target: true, source: true }, pulseDelay: 3100 } },
    { id: "catalog", type: "diagram", position: { x: 480, y: 75 }, data: { title: "AWS/AWX Catalog", subtitle: "Map patterns to templates", icon: BookOpen, tone: "purple", lines: ["restart_compute_service", "clear_rabbitmq_queue", "restart_libvirtd"], handles: { target: true, source: true }, pulseDelay: 3700 } },
    { id: "params", type: "diagram", position: { x: 780, y: 130 }, data: { title: "Parameters", subtitle: "Generate execution inputs", icon: ServerCog, tone: "orange", lines: ["start_time: {{now-10d}}", "end: {{now}}"], handles: { target: true, source: true }, pulseDelay: 4300 } },
    { id: "generated", type: "diagram", position: { x: 1050, y: 125 }, data: { title: "Generated", subtitle: "Automation artifact ready", icon: TerminalSquare, tone: "green", lines: ["awx_sts_template {work}"], confidence: "~90% confidence", handles: { target: true }, pulseDelay: 4900 } },
  ]
  const edges = [edge("a-p", "alert", "patterns", "#3b82f6"), edge("p-c", "patterns", "catalog", "#8b5cf6", "Pattern map"), edge("c-r", "catalog", "params", "#f97316"), edge("r-g", "params", "generated", "#22c55e")]
  return <FlowSlide title="Runbook Agent" subtitle="From incident pattern extraction to a ready-to-run AWX artifact" nodes={nodes} edges={edges} info={[
    { icon: BookOpen, title: "Catalog Matching", text: "Extracted patterns identify the most relevant remediation templates.", tone: "text-purple-500" },
    { icon: Code2, title: "Generated Artifact", text: "Template parameters and confidence produce an auditable automation output.", tone: "text-green-500" },
  ]} stats={[{ value: "3", label: "Candidate Runbooks", color: "text-purple-500" }, { value: "~90%", label: "Confidence", color: "text-green-500" }]} />
}

export function ConfidenceScoreBackupSlide() {
  const sections = [
    {
      symbol: "Smetrics",
      title: "Metrics Evidence",
      icon: Activity,
      color: "border-blue-200 bg-blue-50 text-blue-700",
      iconColor: "bg-blue-100 text-blue-600",
      items: [
        "0 = metrics do not confirm the alert",
        "0.5 = metrics partially confirm the alert",
        "1 = metrics clearly confirm the alert",
      ],
    },
    {
      symbol: "Shistory",
      title: "Historical Evidence",
      icon: History,
      color: "border-violet-200 bg-violet-50 text-violet-700",
      iconColor: "bg-violet-100 text-violet-600",
      items: [
        "Directly taken from Qdrant cosine similarity.",
        "Example: similarity = 0.82 -> Shistory = 0.82",
      ],
    },
    {
      symbol: "Srunbook",
      title: "Runbook Evidence",
      icon: BookOpen,
      color: "border-orange-200 bg-orange-50 text-orange-700",
      iconColor: "bg-orange-100 text-orange-600",
      items: [
        "0 = no runbook found",
        "0.5 = related or generic runbook found",
        "1 = exact runbook found",
      ],
    },
    {
      symbol: "Sagreement",
      title: "Evidence Agreement",
      icon: ShieldCheck,
      color: "border-cyan-200 bg-cyan-50 text-cyan-700",
      iconColor: "bg-cyan-100 text-cyan-600",
      items: [
        "0 = evidence sources disagree",
        "0.5 = some sources agree",
        "1 = all sources agree",
      ],
    },
  ]

  return (
    <SlideWrapper>
      <div className="flex h-full min-h-0 flex-col">
        <SlideHeader
          badge="Backup / Q&A"
          title="How is the Confidence Score Calculated?"
          subtitle="A deterministic weighted score based on structured evidence"
          className="mb-3 [&>*:first-child]:mb-2 [&>*:first-child]:px-4 [&>*:first-child]:py-1.5 [&>*:first-child]:text-base [&>h1]:mb-2 [&>h1]:text-4xl md:[&>h1]:text-5xl lg:[&>h1]:text-5xl [&>p]:text-lg"
        />

        <div className="flex flex-1 min-h-0 flex-col gap-3">
          <Card className="border-2 border-purple-200 bg-gradient-to-r from-purple-50 via-white to-blue-50 shadow-lg">
            <CardContent className="flex items-center justify-center gap-4 px-5 py-4">
              <div className="rounded-xl bg-purple-100 p-2.5 text-purple-600">
                <Calculator className="h-7 w-7" />
              </div>
              <div className="font-mono text-xl font-bold tracking-tight text-slate-800 md:text-2xl xl:text-3xl">
                C = w1*Smetrics + w2*Shistory + w3*Srunbook + w4*Sagreement
              </div>
            </CardContent>
          </Card>

          <div className="grid flex-1 min-h-0 grid-cols-2 gap-3">
            {sections.map((section) => (
              <Card key={section.symbol} className={`border-2 shadow-md ${section.color}`}>
                <CardContent className="h-full p-4">
                  <div className="mb-3 flex items-center gap-3">
                    <div className={`rounded-xl p-2.5 ${section.iconColor}`}>
                      <section.icon className="h-5 w-5" />
                    </div>
                    <div>
                      <div className="font-mono text-xl font-black">{section.symbol}</div>
                      <div className="text-sm font-semibold opacity-75">{section.title}</div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    {section.items.map((item) => (
                      <div key={item} className="flex items-start gap-2 rounded-lg bg-white/80 px-3 py-2 text-sm font-medium leading-snug text-slate-700">
                        <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-current opacity-70" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card className="border-2 border-emerald-200 bg-emerald-50 shadow-md">
            <CardContent className="flex items-center gap-3 px-5 py-3">
              <div className="rounded-full bg-emerald-100 p-2 text-emerald-600">
                <ShieldCheck className="h-5 w-5" />
              </div>
              <p className="text-base font-semibold leading-snug text-emerald-900">
                The LLM does not invent the confidence score. The Policy Engine calculates it deterministically from structured evidence.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </SlideWrapper>
  )
}
