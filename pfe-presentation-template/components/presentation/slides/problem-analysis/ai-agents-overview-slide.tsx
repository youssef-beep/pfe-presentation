"use client"

import SlideWrapper from "../../slide-wrapper"
import SlideHeader from "../../slide-header"
import {
  ReactFlow,
  Node,
  Edge,
  Background,
  useNodesState,
  useEdgesState,
  MarkerType,
  Handle,
  Position,
  NodeProps,
} from "@xyflow/react"
import "@xyflow/react/dist/style.css"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  AlertTriangle,
  Activity,
  Search,
  BookOpen,
  Brain,
  Zap,
  Maximize2,
  X,
} from "lucide-react"
import { useState } from "react"
import { Button } from "@/components/ui/button"

// Simple Alert Node
function AlertNode() {
  return (
    <div className="relative">
      <div className="p-4 rounded-xl bg-gradient-to-br from-red-500 to-rose-600 border-2 border-red-400 shadow-lg min-w-[140px]">
        <div className="flex items-center gap-2 mb-2">
          <AlertTriangle className="h-6 w-6 text-white" />
          <span className="font-bold text-base text-white">Alert Input</span>
        </div>
        <p className="text-sm text-red-100">Incoming incident</p>
      </div>
      <Handle type="source" position={Position.Right} className="w-3 h-3 !bg-white" />
    </div>
  )
}

// Agent Node (reusable for all 3 agents)
function AgentNode({ data }: NodeProps) {
  const nodeData = data as { 
    name: string
    subtitle: string
    tool: string
    icon: "metrics" | "incident" | "runbook"
    color: string
    stat: string
    statLabel: string
  }
  
  const icons = {
    metrics: Activity,
    incident: Search,
    runbook: BookOpen
  }
  const Icon = icons[nodeData.icon]

  return (
    <div className="relative">
      <Handle type="target" position={Position.Left} className="w-3 h-3 !bg-white" />
      <div 
        className={`p-4 rounded-xl bg-gradient-to-br ${nodeData.color} border-2 border-white/30 shadow-lg min-w-[188px]`}
      >
        <div className="flex items-center gap-2 mb-2">
          <Icon className="h-6 w-6 text-white" />
          <div>
            <span className="font-bold text-base text-white block">{nodeData.name}</span>
            <span className="text-sm text-white/80">{nodeData.subtitle}</span>
          </div>
        </div>
        <Badge className="bg-white/20 text-white text-sm mb-2">
          {nodeData.tool}
        </Badge>
        <div className="mt-1.5 pt-1.5 border-t border-white/20 flex justify-between items-center">
          <span className="text-sm text-white/70">{nodeData.statLabel}</span>
          <span className="font-bold text-base text-white">{nodeData.stat}</span>
        </div>
      </div>
      <Handle type="source" position={Position.Right} className="w-3 h-3 !bg-white" />
    </div>
  )
}

// Reasoner Node
function ReasonerNode() {
  return (
    <div className="relative">
      <Handle type="target" position={Position.Left} className="w-3 h-3 !bg-white" />
      <div className="p-4 rounded-xl bg-gradient-to-br from-green-500 to-emerald-600 border-2 border-green-400 shadow-lg min-w-[140px]">
        <div className="flex items-center gap-2 mb-2">
          <Brain className="h-6 w-6 text-white" />
          <span className="font-bold text-base text-white">Reasoner</span>
        </div>
        <p className="text-sm text-green-100">Evidence synthesis</p>
        <Badge className="bg-white/20 text-white text-sm mt-2">
          LLM Analysis
        </Badge>
      </div>
    </div>
  )
}

const nodeTypes = {
  alert: AlertNode,
  agent: AgentNode,
  reasoner: ReasonerNode,
}

const initialNodes: Node[] = [
  {
    id: "alert",
    type: "alert",
    position: { x: 0, y: 180 },
    data: {},
  },
  {
    id: "metrics",
    type: "agent",
    position: { x: 330, y: 10 },
    data: {
      name: "Metrics Agent",
      subtitle: "Self-Diagnostics",
      tool: "Prometheus",
      icon: "metrics",
      color: "from-blue-500 to-cyan-600",
      stat: "5 states",
      statLabel: "Diagnostics"
    },
  },
  {
    id: "incident",
    type: "agent",
    position: { x: 330, y: 170 },
    data: {
      name: "Incident Agent",
      subtitle: "RAG Pipeline",
      tool: "Qdrant",
      icon: "incident",
      color: "from-purple-500 to-violet-600",
      stat: "History",
      statLabel: "Retrieval",
    },
  },
  {
    id: "runbook",
    type: "agent",
    position: { x: 330, y: 330 },
    data: {
      name: "Runbook Agent",
      subtitle: "AWX Automation",
      tool: "Ansible",
      icon: "runbook",
      color: "from-orange-500 to-amber-600",
      stat: "Catalog",
      statLabel: "Matching",
    },
  },
  {
    id: "reasoner",
    type: "reasoner",
    position: { x: 660, y: 175 },
    data: {},
  },
]

const initialEdges: Edge[] = [
  {
    id: "e-alert-metrics",
    source: "alert",
    target: "metrics",
    animated: true,
    style: { stroke: "#3b82f6", strokeWidth: 2 },
    markerEnd: { type: MarkerType.ArrowClosed, color: "#3b82f6" },
  },
  {
    id: "e-alert-incident",
    source: "alert",
    target: "incident",
    animated: true,
    style: { stroke: "#8b5cf6", strokeWidth: 2 },
    markerEnd: { type: MarkerType.ArrowClosed, color: "#8b5cf6" },
  },
  {
    id: "e-alert-runbook",
    source: "alert",
    target: "runbook",
    animated: true,
    style: { stroke: "#f97316", strokeWidth: 2 },
    markerEnd: { type: MarkerType.ArrowClosed, color: "#f97316" },
  },
  {
    id: "e-metrics-reasoner",
    source: "metrics",
    target: "reasoner",
    animated: true,
    style: { stroke: "#22c55e", strokeWidth: 2 },
    markerEnd: { type: MarkerType.ArrowClosed, color: "#22c55e" },
  },
  {
    id: "e-incident-reasoner",
    source: "incident",
    target: "reasoner",
    animated: true,
    style: { stroke: "#22c55e", strokeWidth: 2 },
    markerEnd: { type: MarkerType.ArrowClosed, color: "#22c55e" },
  },
  {
    id: "e-runbook-reasoner",
    source: "runbook",
    target: "reasoner",
    animated: true,
    style: { stroke: "#22c55e", strokeWidth: 2 },
    markerEnd: { type: MarkerType.ArrowClosed, color: "#22c55e" },
  },
]

export default function AiAgentsOverviewSlide() {
  const [nodes] = useNodesState(initialNodes)
  const [edges] = useEdgesState(initialEdges)
  const [isFullscreen, setIsFullscreen] = useState(false)

  // Fullscreen modal
  if (isFullscreen) {
    return (
      <div className="fixed inset-0 z-[9999] bg-white">
        <div className="absolute top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 bg-gradient-to-b from-white to-transparent">
          <div>
            <h2 className="text-xl font-bold text-slate-800">AI Investigation Agents</h2>
            <p className="text-sm text-slate-500">Parallel specialized agents for comprehensive incident analysis</p>
          </div>
          <Button
            variant="outline"
            size="sm"
            className="bg-white border-slate-300 hover:bg-slate-100 text-slate-700 shadow-md"
            onClick={() => setIsFullscreen(false)}
          >
            <X className="h-4 w-4 mr-2" />
            Exit Fullscreen
          </Button>
        </div>
        <div className="w-full h-full pt-16">
          <ReactFlow
            nodes={nodes}
            edges={edges}
            nodeTypes={nodeTypes}
            nodesDraggable={false}
            nodesConnectable={false}
            elementsSelectable={false}
            fitView
            fitViewOptions={{ padding: 0.15 }}
            minZoom={0.3}
            maxZoom={2}
          >
            <Background color="#cbd5e1" gap={20} size={1} />
          </ReactFlow>
        </div>
      </div>
    )
  }

  return (
    <SlideWrapper>
      <div className="h-full min-h-0 flex flex-col">
        <SlideHeader
          badge="6 - Architecture"
          title="AI Investigation Agents"
          subtitle="Parallel specialized agents for comprehensive incident analysis"
          className="mb-3 [&>*:first-child]:mb-2 [&>*:first-child]:px-4 [&>*:first-child]:py-1.5 [&>*:first-child]:text-lg [&>h1]:mb-2 [&>h1]:text-4xl md:[&>h1]:text-5xl lg:[&>h1]:text-5xl xl:[&>h1]:text-6xl [&>p]:text-lg [&>p]:leading-snug md:[&>p]:text-xl"
        />

        <div className="flex-1 min-h-0 grid grid-cols-4 gap-3">
          {/* ReactFlow Diagram - Takes 3/4 */}
          <div className="col-span-3 min-h-0 rounded-xl overflow-hidden border shadow-lg bg-gradient-to-br from-slate-900 to-slate-800 relative">
            <ReactFlow
              nodes={nodes}
              edges={edges}
              nodeTypes={nodeTypes}
              nodesDraggable={false}
              nodesConnectable={false}
              elementsSelectable={false}
              fitView
              fitViewOptions={{ padding: 0.12 }}
              minZoom={0.5}
              maxZoom={1.2}
            >
              <Background color="#475569" gap={20} size={1} />
            </ReactFlow>
            <div className="absolute top-2.5 right-2.5 z-50">
              <Button
                size="sm"
                variant="outline"
                onClick={() => setIsFullscreen(true)}
                className="h-8 px-2.5 gap-1 text-xs font-medium shadow-md bg-white hover:bg-gray-100 border border-gray-300"
              >
                <Maximize2 className="h-4 w-4" />
                Fullscreen
              </Button>
            </div>
          </div>

          {/* Side Panel - Stats & Info */}
          <div className="min-h-0 space-y-3">
            <Card className="shadow-lg border-2 border-primary/20">
              <CardContent className="p-3.5">
                <div className="flex items-center gap-2 mb-2">
                  <Zap className="h-5 w-5 text-yellow-500" />
                  <h3 className="font-bold text-base">Parallel Execution</h3>
                </div>
                <p className="text-sm leading-snug text-muted-foreground">
                  All 3 agents run simultaneously via Mastra <code className="text-primary">Send()</code> API
                </p>
                <Badge className="mt-2 bg-green-500/20 text-green-600 text-sm">
                  3x faster than sequential
                </Badge>
              </CardContent>
            </Card>

            <Card className="shadow-lg">
              <CardContent className="p-3.5">
                <h4 className="font-bold text-base mb-2">Agent Capabilities</h4>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Activity className="h-4 w-4 text-blue-500" />
                    <span className="text-sm">Diagnoses empty metrics</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Search className="h-4 w-4 text-purple-500" />
                    <span className="text-sm">Searches incident history</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <BookOpen className="h-4 w-4 text-orange-500" />
                    <span className="text-sm">Matches remediation playbooks</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-lg bg-gradient-to-br from-primary/5 to-secondary/5">
              <CardContent className="p-3.5">
                <div className="flex items-center justify-between gap-2 mb-2">
                  <h4 className="font-bold text-base">Combined Stats</h4>
                  <Badge variant="secondary" className="text-[10px] px-2 py-0.5">
                    Demo dataset
                  </Badge>
                </div>
                <div className="grid grid-cols-1 gap-2 text-center">
                  <div className="p-2.5 bg-white dark:bg-slate-800 rounded-lg">
                    <div className="text-lg font-bold text-purple-500">Incident history</div>
                    <div className="text-xs text-muted-foreground">Historical incident retrieval</div>
                  </div>
                  <div className="p-2.5 bg-white dark:bg-slate-800 rounded-lg">
                    <div className="text-lg font-bold text-orange-500">Runbook catalog</div>
                    <div className="text-xs text-muted-foreground">AWX template matching</div>
                  </div>
                  <div className="p-2.5 bg-white dark:bg-slate-800 rounded-lg">
                    <div className="text-lg font-bold text-green-500">Fast search</div>
                    <div className="text-xs text-muted-foreground">Low-latency semantic retrieval</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </SlideWrapper>
  )
}
