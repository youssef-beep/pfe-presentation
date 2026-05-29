"use client"

import { useState, useEffect, useCallback } from "react"
import SlideWrapper from "../../slide-wrapper"
import SlideHeader from "../../slide-header"
import {
  ReactFlow,
  Node,
  Edge,
  Background,
  Controls,
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
import { Button } from "@/components/ui/button"
import {
  GitBranch,
  Zap,
  Bot,
  CheckCircle,
  Clock,
  AlertTriangle,
  Activity,
  Timer,
  LucideIcon,
  Lock,
  Unlock,
  RotateCcw,
  Maximize2,
  X,
} from "lucide-react"

const STORAGE_KEY = "smart-router-nodes"
const LOCK_KEY = "smart-router-locked"

// Input Alert Node
function AlertInputNode({ data }: NodeProps) {
  const [pulse, setPulse] = useState(false)
  const nodeData = data as { label: string; alertType: string }

  useEffect(() => {
    const interval = setInterval(() => {
      setPulse(true)
      setTimeout(() => setPulse(false), 800)
    }, 2500)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="relative">
      <div
        className={`p-4 rounded-xl bg-gradient-to-br from-red-900/80 to-rose-900/80 border-2 border-red-500/50 shadow-lg backdrop-blur-sm transition-all duration-300 ${
          pulse ? "scale-105" : ""
        }`}
        style={{ boxShadow: pulse ? "0 0 25px rgba(239,68,68,0.5)" : undefined }}
      >
        <div className="flex items-center gap-2">
          <AlertTriangle className={`h-6 w-6 text-red-400 ${pulse ? "animate-pulse" : ""}`} />
          <span className="font-bold text-base text-white">{nodeData.label}</span>
        </div>
        <p className="text-sm text-red-300 mt-1">{nodeData.alertType}</p>
        {pulse && <div className="absolute -top-1 -right-1 w-2 h-2 bg-red-400 rounded-full animate-ping" />}
      </div>
      <Handle type="source" position={Position.Right} className="w-3 h-3 !bg-red-500" />
    </div>
  )
}

// Router Decision Node
function RouterNode({ data }: NodeProps) {
  const [activeRule, setActiveRule] = useState(0)
  const [decision, setDecision] = useState<"fast" | "investigate" | null>(null)
  const rules = [
    { condition: "confidence ≥ 95%", result: "fast" as const },
    { condition: "is_predictive", result: "investigate" as const },
    { condition: "severity = CRITICAL", result: "investigate" as const },
    { condition: "is_recurring", result: "investigate" as const },
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      const rule = rules[activeRule]
      setDecision(rule.result)
      setTimeout(() => {
        setDecision(null)
        setActiveRule((prev) => (prev + 1) % rules.length)
      }, 2000)
    }, 3000)
    return () => clearInterval(interval)
  }, [activeRule])

  return (
    <div className="relative">
      <Handle type="target" position={Position.Left} className="w-3 h-3 !bg-red-500" />
      <div
        className="p-5 rounded-2xl bg-gradient-to-br from-purple-900/90 to-indigo-900/90 border-2 border-purple-500/50 shadow-2xl backdrop-blur-sm min-w-[210px]"
        style={{ boxShadow: decision ? "0 0 40px rgba(168,85,247,0.6)" : "0 0 20px rgba(168,85,247,0.3)" }}
      >
        <div className="flex items-center gap-2 mb-3">
          <GitBranch className={`h-7 w-7 text-purple-400 ${decision ? "animate-pulse" : ""}`} />
          <span className="font-bold text-lg text-white">SMART ROUTER</span>
        </div>
        <Badge className="bg-purple-500/30 text-purple-200 text-xs mb-3">Rule-Based • No LLM • &lt;10ms</Badge>
        <div className="space-y-1.5">
          {rules.map((rule, i) => (
            <div
              key={i}
              className={`px-2 py-1.5 rounded text-xs font-mono transition-all duration-300 ${
                i === activeRule
                  ? decision === "fast"
                    ? "bg-green-500 text-white scale-[1.02]"
                    : "bg-orange-500 text-white scale-[1.02]"
                  : "bg-purple-900/50 text-purple-300"
              }`}
            >
              if ({rule.condition}) → {rule.result.toUpperCase()}
            </div>
          ))}
        </div>
      </div>
      <Handle type="source" position={Position.Right} id="fast" className="w-3 h-3 !bg-green-500 !top-[35%]" />
      <Handle type="source" position={Position.Right} id="investigate" className="w-3 h-3 !bg-orange-500 !top-[65%]" />
    </div>
  )
}

// Fast Path Node
function FastPathNode({ data }: NodeProps) {
  const [active, setActive] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      setActive(true)
      setTimeout(() => setActive(false), 1500)
    }, 4000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="relative">
      <Handle type="target" position={Position.Left} className="w-3 h-3 !bg-green-500" />
      <div
        className={`p-4 rounded-xl bg-gradient-to-br from-green-900/80 to-emerald-900/80 border-2 border-green-500/50 shadow-lg backdrop-blur-sm transition-all duration-300 ${
          active ? "scale-105" : ""
        }`}
        style={{ boxShadow: active ? "0 0 30px rgba(34,197,94,0.6)" : undefined }}
      >
        <div className="flex items-center gap-2 mb-2">
          <Zap className={`h-6 w-6 text-green-400 ${active ? "animate-pulse" : ""}`} />
          <span className="font-bold text-base text-white">FAST PATH</span>
        </div>
        <div className="space-y-1.5 text-sm">
          <div className="flex items-center gap-2 text-green-300">
            <Timer className="h-4 w-4" />
            <span>30-60s MTTR</span>
          </div>
          <div className="flex items-center gap-2 text-green-300">
            <CheckCircle className="h-4 w-4" />
            <span>Skip investigation</span>
          </div>
        </div>
      </div>
      <Handle type="source" position={Position.Right} className="w-3 h-3 !bg-cyan-500" />
    </div>
  )
}

// Investigation Path Node
function InvestigationNode({ data }: NodeProps) {
  const [activeAgent, setActiveAgent] = useState(0)
  const agents = ["Metrics Agent", "Incident Agent", "Runbook Agent"]

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveAgent((prev) => (prev + 1) % agents.length)
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="relative">
      <Handle type="target" position={Position.Left} className="w-3 h-3 !bg-orange-500" />
      <div className="p-4 rounded-xl bg-gradient-to-br from-orange-900/80 to-amber-900/80 border-2 border-orange-500/50 shadow-lg backdrop-blur-sm">
        <div className="flex items-center gap-2 mb-2">
          <Bot className="h-6 w-6 text-orange-400" />
          <span className="font-bold text-base text-white">INVESTIGATION</span>
          <Badge className="bg-orange-500/30 text-orange-200 text-xs">Parallel</Badge>
        </div>
        <div className="space-y-1.5">
          {agents.map((agent, i) => (
            <div
              key={i}
              className={`px-2 py-1.5 rounded text-sm transition-all duration-300 ${
                i === activeAgent ? "bg-orange-500 text-white scale-[1.02]" : "bg-orange-900/50 text-orange-300"
              }`}
            >
              {agent}
            </div>
          ))}
        </div>
        <div className="mt-2 flex items-center gap-2 text-sm text-orange-300">
          <Clock className="h-4 w-4" />
          <span>2-5 min MTTR</span>
        </div>
      </div>
      <Handle type="source" position={Position.Right} className="w-3 h-3 !bg-cyan-500" />
    </div>
  )
}

// Output Node
function OutputNode({ data }: NodeProps) {
  const [pulse, setPulse] = useState(false)
  const nodeData = data as { label: string; description: string; icon: LucideIcon; color: string }
  const Icon = nodeData.icon

  useEffect(() => {
    const interval = setInterval(() => {
      setPulse(true)
      setTimeout(() => setPulse(false), 800)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="relative">
      <Handle type="target" position={Position.Left} className="w-3 h-3 !bg-cyan-500" />
      <div
        className={`p-4 rounded-xl bg-gradient-to-br from-cyan-900/80 to-teal-900/80 border-2 border-cyan-500/50 shadow-lg backdrop-blur-sm transition-all duration-300 ${
          pulse ? "scale-105" : ""
        }`}
        style={{ boxShadow: pulse ? "0 0 25px rgba(6,182,212,0.5)" : undefined }}
      >
        <div className="flex items-center gap-2">
          <Icon className={`h-6 w-6 text-cyan-400 ${pulse ? "animate-pulse" : ""}`} />
          <span className="font-bold text-base text-white">{nodeData.label}</span>
        </div>
        <p className="text-sm text-cyan-300 mt-1">{nodeData.description}</p>
      </div>
    </div>
  )
}

const nodeTypes = {
  alertInput: AlertInputNode,
  router: RouterNode,
  fastPath: FastPathNode,
  investigation: InvestigationNode,
  output: OutputNode,
}

const initialNodes: Node[] = [
  {
    id: "alert",
    type: "alertInput",
    position: { x: 0, y: 140 },
    data: { label: "Incoming Alert", alertType: "OpenStack • Prometheus" },
  },
  {
    id: "router",
    type: "router",
    position: { x: 200, y: 90 },
    data: {},
  },
  {
    id: "fast",
    type: "fastPath",
    position: { x: 500, y: 40 },
    data: {},
  },
  {
    id: "investigate",
    type: "investigation",
    position: { x: 500, y: 190 },
    data: {},
  },
  {
    id: "reasoning",
    type: "output",
    position: { x: 740, y: 120 },
    data: { label: "REASONING", description: "LLM + Pydantic", icon: Activity, color: "cyan" },
  },
]

const initialEdges: Edge[] = [
  {
    id: "e1",
    source: "alert",
    target: "router",
    animated: true,
    style: { stroke: "#ef4444", strokeWidth: 2 },
    markerEnd: { type: MarkerType.ArrowClosed, color: "#ef4444" },
  },
  {
    id: "e2",
    source: "router",
    sourceHandle: "fast",
    target: "fast",
    animated: true,
    style: { stroke: "#22c55e", strokeWidth: 3 },
    markerEnd: { type: MarkerType.ArrowClosed, color: "#22c55e" },
    label: "≥95%",
    labelStyle: { fill: "#22c55e", fontSize: 12, fontWeight: "bold" },
    labelBgStyle: { fill: "transparent" },
  },
  {
    id: "e3",
    source: "router",
    sourceHandle: "investigate",
    target: "investigate",
    animated: true,
    style: { stroke: "#f97316", strokeWidth: 3 },
    markerEnd: { type: MarkerType.ArrowClosed, color: "#f97316" },
    label: "<95%",
    labelStyle: { fill: "#f97316", fontSize: 12, fontWeight: "bold" },
    labelBgStyle: { fill: "transparent" },
  },
  {
    id: "e4",
    source: "fast",
    target: "reasoning",
    animated: true,
    style: { stroke: "#06b6d4", strokeWidth: 2 },
    markerEnd: { type: MarkerType.ArrowClosed, color: "#06b6d4" },
  },
  {
    id: "e5",
    source: "investigate",
    target: "reasoning",
    animated: true,
    style: { stroke: "#06b6d4", strokeWidth: 2 },
    markerEnd: { type: MarkerType.ArrowClosed, color: "#06b6d4" },
  },
]

export default function SmartRouterSlide() {
  const [isLocked, setIsLocked] = useState(false)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes)
  const [edges, , onEdgesChange] = useEdgesState(initialEdges)

  useEffect(() => {
    const savedPositions = localStorage.getItem(STORAGE_KEY)
    const savedLock = localStorage.getItem(LOCK_KEY)
    if (savedPositions) {
      try {
        const positions = JSON.parse(savedPositions) as Record<string, { x: number; y: number }>
        setNodes((nds) => nds.map((node) => ({ ...node, position: positions[node.id] || node.position })))
      } catch (e) { console.error(e) }
    }
    if (savedLock) setIsLocked(savedLock === "true")
  }, [setNodes])

  const handleNodesChange = useCallback((changes: any) => {
    if (!isLocked) {
      onNodesChange(changes)
      if (changes.some((c: any) => c.type === 'position' && c.dragging === false)) {
        setTimeout(() => {
          const positions: Record<string, { x: number; y: number }> = {}
          nodes.forEach((node) => { positions[node.id] = node.position })
          localStorage.setItem(STORAGE_KEY, JSON.stringify(positions))
        }, 50)
      }
    }
  }, [isLocked, onNodesChange, nodes])

  const toggleLock = useCallback(() => {
    const newState = !isLocked
    setIsLocked(newState)
    localStorage.setItem(LOCK_KEY, String(newState))
    if (newState) {
      const positions: Record<string, { x: number; y: number }> = {}
      nodes.forEach((node) => { positions[node.id] = node.position })
      localStorage.setItem(STORAGE_KEY, JSON.stringify(positions))
    }
  }, [isLocked, nodes])

  const resetPositions = useCallback(() => {
    setNodes(initialNodes)
    localStorage.removeItem(STORAGE_KEY)
  }, [setNodes])

  // Fullscreen modal
  if (isFullscreen) {
    return (
      <div className="fixed inset-0 z-[9999] bg-white">
        <div className="absolute top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 bg-gradient-to-b from-white to-transparent">
          <div>
            <h2 className="text-xl font-bold text-slate-800">Smart Router: Rule-Based Routing</h2>
            <p className="text-sm text-slate-500">No LLM latency, deterministic routing in &lt;10ms</p>
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
            onNodesChange={handleNodesChange}
            onEdgesChange={onEdgesChange}
            nodeTypes={nodeTypes}
            nodesDraggable={!isLocked}
            nodesConnectable={false}
            fitView
            minZoom={0.3}
            maxZoom={2}
          >
            <Background color="#cbd5e1" gap={30} size={1} />
            <Controls className="bg-white rounded-lg shadow-lg border border-slate-200" />
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
          title="Smart Router: Rule-Based Routing"
          subtitle="No LLM latency, deterministic routing in <10ms"
          className="mb-3 [&>*:first-child]:mb-2 [&>*:first-child]:px-4 [&>*:first-child]:py-1.5 [&>*:first-child]:text-lg [&>h1]:mb-2 [&>h1]:text-4xl md:[&>h1]:text-5xl lg:[&>h1]:text-5xl xl:[&>h1]:text-6xl [&>p]:text-lg [&>p]:leading-snug md:[&>p]:text-xl"
        />

        <div className="flex-1 min-h-0 grid grid-cols-4 gap-3">
          <div className="col-span-3 min-h-0 rounded-xl overflow-hidden border shadow-lg bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
            <ReactFlow
              nodes={nodes}
              edges={edges}
              onNodesChange={handleNodesChange}
              onEdgesChange={onEdgesChange}
              nodeTypes={nodeTypes}
              nodesDraggable={!isLocked}
              nodesConnectable={false}
              fitView
              fitViewOptions={{ padding: 0.08 }}
              minZoom={0.5}
              maxZoom={1.5}
              defaultViewport={{ x: 48, y: 34, zoom: 0.82 }}
            >
              <Background color="#94a3b8" gap={30} size={1} />
              <Controls showInteractive={false} />
              <div className="absolute top-2.5 right-2.5 flex gap-1.5 z-50">
                <Button size="sm" variant="outline" onClick={() => setIsFullscreen(true)} className="h-8 px-2.5 gap-1 text-xs font-medium shadow-md bg-white hover:bg-gray-100 border border-gray-300">
                  <Maximize2 className="h-4 w-4" />
                  Fullscreen
                </Button>
                <Button size="sm" onClick={toggleLock} className={`h-8 px-2.5 gap-1 text-xs font-medium shadow-md ${isLocked ? "bg-green-600 hover:bg-green-700 text-white" : "bg-white hover:bg-gray-100 text-gray-700 border border-gray-300"}`}>
                  {isLocked ? <Lock className="h-4 w-4" /> : <Unlock className="h-4 w-4" />}
                  {isLocked ? "Locked" : "Drag"}
                </Button>
                <Button size="sm" variant="outline" onClick={resetPositions} className="h-8 px-2.5 gap-1 text-xs font-medium shadow-md bg-white hover:bg-gray-100 border border-gray-300">
                  <RotateCcw className="h-4 w-4" />
                </Button>
              </div>
            </ReactFlow>
          </div>

          <div className="min-h-0 space-y-3">
            <Card className="shadow-lg">
              <CardContent className="p-3">
                <h3 className="font-bold text-sm mb-2 flex items-center gap-2">
                  <GitBranch className="h-5 w-5 text-purple-500" />
                  Routing Logic
                </h3>
                <div className="space-y-2">
                  <div className="p-2.5 rounded-lg bg-green-500/10 border border-green-500/30">
                    <div className="flex items-center gap-2 text-green-600 font-bold">
                      <Zap className="h-4 w-4" />
                      FAST PATH
                    </div>
                    <p className="text-green-600/70 text-xs mt-1 leading-snug">confidence ≥ 95% → Skip agents</p>
                  </div>
                  <div className="p-2.5 rounded-lg bg-orange-500/10 border border-orange-500/30">
                    <div className="flex items-center gap-2 text-orange-600 font-bold">
                      <Bot className="h-4 w-4" />
                      INVESTIGATION
                    </div>
                    <p className="text-orange-600/70 text-xs mt-1 leading-snug">Spawn 1-3 agents in parallel</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-lg">
              <CardContent className="p-3">
                <h4 className="font-bold text-sm mb-2">Performance Impact</h4>
                <div className="space-y-2.5">
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground text-xs">Fast Path MTTR</span>
                    <span className="text-green-500 font-bold text-sm">30-60s</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground text-xs">Investigation MTTR</span>
                    <span className="text-orange-500 font-bold text-sm">2-5min</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground text-xs">Routing Decision</span>
                    <span className="text-purple-500 font-bold text-sm">&lt;10ms</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-lg bg-gradient-to-br from-primary/5 to-secondary/5">
              <CardContent className="p-3">
                <div className="grid grid-cols-2 gap-2 text-center">
                  <div>
                    <div className="text-xl font-bold text-green-500">93%</div>
                    <div className="text-xs text-muted-foreground">MTTR Reduction</div>
                  </div>
                  <div>
                    <div className="text-xl font-bold text-purple-500">0</div>
                    <div className="text-xs text-muted-foreground">LLM Calls</div>
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
