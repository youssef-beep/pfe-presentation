"use client"
import SlideWrapper from "../../slide-wrapper"
import SlideHeader from "../../slide-header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { motion, type Variants } from "framer-motion"
import {
  Boxes,
  Activity,
  Server,
  Shield,
  Network,
  Brain,
  Cloud,
  ArrowRight,
  CheckCircle2,
  Layers,
} from "lucide-react"

const namespaces = [
  {
    name: "monitoring",
    icon: Activity,
    role: "Observability and alerting layer",
    gradient: "from-blue-500 to-cyan-500",
    bgGradient: "from-blue-50 to-cyan-50 dark:from-blue-950/30 dark:to-cyan-950/30",
    borderColor: "border-blue-300 dark:border-blue-700",
    itemBorder: "border-blue-100 dark:border-blue-900",
    componentCols: "grid-cols-2",
    components: [
      { name: "Prometheus", detail: "metrics collection" },
      { name: "Grafana", detail: "dashboards and visualization" },
      { name: "Alertmanager", detail: "alert routing" },
      { name: "OpenSearch", detail: "log analysis" },
      { name: "Jaeger", detail: "tracing" },
    ],
  },
  {
    name: "awx",
    icon: Server,
    role: "Automation execution layer",
    gradient: "from-red-500 to-orange-500",
    bgGradient: "from-red-50 to-orange-50 dark:from-red-950/30 dark:to-orange-950/30",
    borderColor: "border-red-300 dark:border-red-700",
    itemBorder: "border-red-100 dark:border-red-900",
    componentCols: "grid-cols-2",
    components: [
      { name: "AWX Operator", detail: "deployment management" },
      { name: "AWX Web", detail: "UI/API access" },
      { name: "AWX Task", detail: "job execution" },
      { name: "PostgreSQL", detail: "AWX database" },
    ],
  },
  {
    name: "default",
    icon: Brain,
    role: "Remedion runtime layer",
    gradient: "from-indigo-500 to-violet-500",
    bgGradient: "from-indigo-50 to-violet-50 dark:from-indigo-950/30 dark:to-violet-950/30",
    borderColor: "border-indigo-300 dark:border-indigo-700",
    itemBorder: "border-indigo-100 dark:border-indigo-900",
    componentCols: "grid-cols-2",
    components: [
      { name: "Remedion Core", detail: "orchestration service" },
      { name: "Mastra", detail: "workflow engine" },
      { name: "Qdrant", detail: "incident memory" },
      { name: "Redis", detail: "deduplication/cache" },
      { name: "PostgreSQL", detail: "audit and traces" },
    ],
  },
  {
    name: "kube-system",
    icon: Layers,
    role: "Core cluster services",
    gradient: "from-purple-500 to-pink-500",
    bgGradient: "from-purple-50 to-pink-50 dark:from-purple-950/30 dark:to-pink-950/30",
    borderColor: "border-purple-300 dark:border-purple-700",
    itemBorder: "border-purple-100 dark:border-purple-900",
    componentCols: "grid-cols-1",
    components: [
      { name: "Traefik", detail: "ingress routing" },
      { name: "CoreDNS", detail: "service discovery" },
      { name: "metrics-server", detail: "resource metrics" },
    ],
  },
  {
    name: "cert-manager",
    icon: Shield,
    role: "TLS and certificate automation",
    gradient: "from-green-500 to-emerald-500",
    bgGradient: "from-green-50 to-emerald-50 dark:from-green-950/30 dark:to-emerald-950/30",
    borderColor: "border-green-300 dark:border-green-700",
    itemBorder: "border-green-100 dark:border-green-900",
    componentCols: "grid-cols-1",
    components: [
      { name: "cert-manager", detail: "certificate lifecycle" },
      { name: "cainjector", detail: "CA injection" },
      { name: "webhook", detail: "validation" },
    ],
  },
]

const stats = [
  { label: "Total Pods", value: "24+", icon: Boxes, color: "text-blue-600" },
  { label: "Namespaces", value: "5", icon: Layers, color: "text-purple-600" },
  { label: "Services", value: "18+", icon: Network, color: "text-green-600" },
  { label: "Status", value: "Running", icon: CheckCircle2, color: "text-emerald-600" },
]

const flowSteps = [
  { label: "monitoring", icon: Activity, tone: "bg-blue-100 text-blue-600 dark:bg-blue-900/30" },
  { label: "alerts", icon: Network, tone: "bg-slate-100 text-slate-600 dark:bg-slate-800" },
  { label: "Remedion runtime", icon: Brain, tone: "bg-indigo-100 text-indigo-600 dark:bg-indigo-900/30" },
  { label: "actions", icon: ArrowRight, tone: "bg-orange-100 text-orange-600 dark:bg-orange-900/30" },
  { label: "AWX", icon: Server, tone: "bg-red-100 text-red-600 dark:bg-red-900/30" },
  { label: "OpenStack", icon: Cloud, tone: "bg-green-100 text-green-600 dark:bg-green-900/30" },
]

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.06, delayChildren: 0.12 },
  },
}

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 14 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: "easeOut" },
  },
}

export default function KubernetesArchitectureSlide() {
  return (
    <SlideWrapper>
      <div className="h-full min-h-0 flex flex-col">
        <SlideHeader
          badge="6 - Architecture"
          title="Kubernetes Deployment Architecture"
          subtitle="Namespace structure and runtime components"
          className="mb-3 [&>*:first-child]:mb-2 [&>*:first-child]:px-4 [&>*:first-child]:py-1.5 [&>*:first-child]:text-lg [&>h1]:mb-2 [&>h1]:text-4xl md:[&>h1]:text-5xl lg:[&>h1]:text-5xl xl:[&>h1]:text-6xl [&>p]:text-lg [&>p]:leading-snug md:[&>p]:text-xl"
        />

        <motion.div
          className="flex-1 min-h-0 flex flex-col gap-2.5"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={itemVariants}>
            <Card className="shadow-lg border-0 bg-gradient-to-r from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
              <CardContent className="p-2.5">
                <div className="grid grid-cols-4 gap-2">
                  {stats.map((stat) => (
                    <div key={stat.label} className="flex items-center gap-2 rounded-lg bg-white/80 px-2.5 py-2 shadow-sm dark:bg-slate-800/80">
                      <div className="rounded-lg bg-background p-1.5 shadow-sm">
                        <stat.icon className={`h-4 w-4 ${stat.color}`} />
                      </div>
                      <div>
                        <div className="text-base font-bold text-foreground">{stat.value}</div>
                        <div className="text-[10px] text-muted-foreground">{stat.label}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <div className="grid flex-1 min-h-0 grid-cols-3 auto-rows-fr gap-2.5">
            {namespaces.map((ns) => {
              const NsIcon = ns.icon
              return (
                <motion.div key={ns.name} variants={itemVariants} className="h-full">
                  <Card className={`h-full shadow-xl border-2 ${ns.borderColor} bg-gradient-to-br ${ns.bgGradient}`}>
                    <CardHeader className="space-y-0 pb-2 pt-3 px-3">
                      <CardTitle className="flex items-start justify-between gap-2">
                        <div className="flex items-start gap-2 min-w-0">
                          <div className={`rounded-lg bg-gradient-to-br ${ns.gradient} p-2 shadow-lg`}>
                            <NsIcon className="h-4 w-4 text-white" />
                          </div>
                          <div className="min-w-0">
                            <div className="text-sm font-bold truncate">{ns.name}</div>
                            <div className="text-[10px] leading-snug text-muted-foreground">{ns.role}</div>
                          </div>
                        </div>
                        <Badge variant="outline" className="text-[9px] px-1.5 py-0 flex-shrink-0">
                          {ns.components.length} key
                        </Badge>
                      </CardTitle>
                    </CardHeader>

                    <CardContent className="px-3 pb-3 pt-0">
                      <div className={`grid ${ns.componentCols} gap-1.5`}>
                        {ns.components.map((component) => (
                          <div
                            key={component.name}
                            className={`rounded-lg border bg-white/90 px-2.5 py-2 shadow-sm dark:bg-slate-800/90 ${ns.itemBorder}`}
                          >
                            <div className="text-[10px] font-semibold leading-tight">{component.name}</div>
                            <div className="mt-0.5 text-[9px] leading-snug text-muted-foreground">{component.detail}</div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              )
            })}

            <motion.div variants={itemVariants} className="h-full">
              <Card className="h-full shadow-xl border-2 border-slate-300 dark:border-slate-700 bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
                <CardHeader className="space-y-0 pb-2 pt-3 px-3">
                  <CardTitle className="flex items-start justify-between gap-2">
                    <div className="flex items-start gap-2 min-w-0">
                      <div className="rounded-lg bg-gradient-to-br from-slate-700 to-slate-500 p-2 shadow-lg">
                        <Network className="h-4 w-4 text-white" />
                      </div>
                      <div className="min-w-0">
                        <div className="text-sm font-bold">Deployment Flow</div>
                        <div className="text-[10px] leading-snug text-muted-foreground">
                          Observability to controlled automation
                        </div>
                      </div>
                    </div>
                  </CardTitle>
                </CardHeader>

                <CardContent className="px-3 pb-3 pt-0 flex h-full flex-col justify-between">
                  <div className="flex flex-wrap items-center gap-1.5">
                    {flowSteps.map((step, index) => (
                      <div key={step.label} className="contents">
                        <div className={`flex items-center gap-1 rounded-md px-2 py-1 text-[10px] font-semibold ${step.tone}`}>
                          <step.icon className="h-3 w-3" />
                          <span>{step.label}</span>
                        </div>
                        {index < flowSteps.length - 1 && <ArrowRight className="h-3.5 w-3.5 text-muted-foreground" />}
                      </div>
                    ))}
                  </div>

                  <div className="mt-3 rounded-lg border border-slate-200 bg-white/80 px-3 py-2 text-[10px] leading-snug text-muted-foreground dark:border-slate-700 dark:bg-slate-800/80">
                    Observability signals are collected in monitoring, processed by Remedion, then converted into
                    controlled automation actions through AWX.
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </SlideWrapper>
  )
}
