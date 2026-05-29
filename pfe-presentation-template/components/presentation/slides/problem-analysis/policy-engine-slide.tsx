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
  Shield,
  CheckCircle,
  XCircle,
  Users,
  Zap,
  FileText,
  Play,
  Lock,
  Unlock,
  RotateCcw,
  Maximize2,
  X,
} from "lucide-react"

const STORAGE_KEY = "policy-engine-nodes"
const LOCK_KEY = "policy-engine-locked"

// Action Request Input Node
function RequestNode(_props: NodeProps) {
  const [pulse, setPulse] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      setPulse(true)
      setTimeout(() => setPulse(false), 1000)
    }, 4000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="relative">
      <div
        className={`p-3.5 rounded-xl bg-gradient-to-br from-blue-900/80 to-cyan-900/80 border-2 border-blue-500/50 shadow-lg backdrop-blur-sm transition-all duration-300 min-w-[138px] ${
          pulse ? "scale-105" : ""
        }`}
        style={{ boxShadow: pulse ? "0 0 25px rgba(59,130,246,0.5)" : undefined }}
      >
        <div className="flex items-center gap-2 mb-1">
          <FileText className={`h-5 w-5 text-blue-400 ${pulse ? "animate-pulse" : ""}`} />
          <span className="font-bold text-sm text-white">Request</span>
        </div>
        <p className="text-xs text-blue-300">From Reasoning</p>
        <Badge className="bg-blue-500/30 text-blue-200 text-xs mt-2">action_plan</Badge>
      </div>
      <Handle type="source" position={Position.Right} className="w-3 h-3 !bg-yellow-500" />
    </div>
  )
}

// Policy Engine Node - Main decision maker
function PolicyEngineNode(_props: NodeProps) {
  const [checking, setChecking] = useState(0)
  const [decision, setDecision] = useState<"auto" | "human" | "reject" | null>(null)
  const checks = ["confidence", "risk_level", "circuit_breaker", "rbac"]

  useEffect(() => {
    const interval = setInterval(() => {
      setChecking((prev) => (prev + 1) % (checks.length + 1))
      if (checking === checks.length - 1) {
        const decisions: ("auto" | "human" | "reject")[] = ["auto", "human", "reject"]
        setDecision(decisions[Math.floor(Math.random() * 3)])
        setTimeout(() => setDecision(null), 1500)
      }
    }, 800)
    return () => clearInterval(interval)
  }, [checking])

  return (
    <div className="relative">
      <Handle type="target" position={Position.Left} className="w-3 h-3 !bg-yellow-500" />
      <div
        className="p-4 rounded-2xl bg-gradient-to-br from-yellow-900/80 to-amber-900/80 border-2 border-yellow-500/50 shadow-xl backdrop-blur-sm min-w-[160px]"
        style={{ boxShadow: decision ? "0 0 35px rgba(234,179,8,0.6)" : "0 0 15px rgba(234,179,8,0.3)" }}
      >
        <div className="flex items-center gap-2 mb-2">
          <Shield className={`h-6 w-6 text-yellow-400 ${checking < checks.length ? "animate-pulse" : ""}`} />
          <span className="font-bold text-sm text-white">POLICY ENGINE</span>
        </div>
        <Badge className="bg-yellow-500/30 text-yellow-200 text-xs mb-2">YAML • RBAC</Badge>
        <div className="space-y-1.5">
          {checks.map((check, i) => (
            <div
              key={i}
              className={`px-2 py-1.5 rounded text-xs font-medium transition-all duration-200 ${
                i === checking
                  ? "bg-yellow-500 text-white scale-[1.02]"
                  : i < checking
                  ? "bg-green-500/30 text-green-300"
                  : "bg-yellow-900/50 text-yellow-300"
              }`}
            >
              {check}
            </div>
          ))}
        </div>
      </div>
      <Handle type="source" position={Position.Right} className="w-3 h-3 !bg-green-500" />
    </div>
  )
}

// Decision Node - Shows AUTO/HUMAN/REJECT
function DecisionNode(_props: NodeProps) {
  const [activeDecision, setActiveDecision] = useState<"auto" | "human" | "reject">("auto")

  useEffect(() => {
    const decisions: ("auto" | "human" | "reject")[] = ["auto", "human", "reject"]
    let index = 0
    const interval = setInterval(() => {
      setActiveDecision(decisions[index])
      index = (index + 1) % decisions.length
    }, 2500)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="relative">
      <Handle type="target" position={Position.Left} className="w-3 h-3 !bg-green-500" />
      <div
        className={`p-3.5 rounded-xl border-2 shadow-lg backdrop-blur-sm transition-all duration-300 min-w-[138px] ${
          activeDecision === "auto"
            ? "bg-gradient-to-br from-green-900/80 to-emerald-900/80 border-green-500/50"
            : activeDecision === "human"
            ? "bg-gradient-to-br from-yellow-900/80 to-amber-900/80 border-yellow-500/50"
            : "bg-gradient-to-br from-red-900/80 to-rose-900/80 border-red-500/50"
        }`}
        style={{
          boxShadow:
            activeDecision === "auto"
              ? "0 0 25px rgba(34,197,94,0.5)"
              : activeDecision === "human"
              ? "0 0 25px rgba(234,179,8,0.5)"
              : "0 0 25px rgba(239,68,68,0.5)",
        }}
      >
        <div className="flex items-center gap-2 mb-2">
          {activeDecision === "auto" ? (
            <CheckCircle className="h-5 w-5 text-green-400 animate-pulse" />
          ) : activeDecision === "human" ? (
            <Users className="h-5 w-5 text-yellow-400 animate-pulse" />
          ) : (
            <XCircle className="h-5 w-5 text-red-400 animate-pulse" />
          )}
          <span className="font-bold text-sm text-white">Decision</span>
        </div>
        <div className="flex gap-1.5">
          {[
            { key: "auto", label: "AUTO", color: "green" },
            { key: "human", label: "HUMAN", color: "yellow" },
            { key: "reject", label: "REJECT", color: "red" },
          ].map((d) => (
            <Badge
              key={d.key}
              className={`text-xs transition-all duration-300 ${
                activeDecision === d.key
                  ? d.color === "green"
                    ? "bg-green-500 text-white scale-110"
                    : d.color === "yellow"
                    ? "bg-yellow-500 text-white scale-110"
                    : "bg-red-500 text-white scale-110"
                  : "bg-slate-700/50 text-slate-400"
              }`}
            >
              {d.label}
            </Badge>
          ))}
        </div>
      </div>
      <Handle type="source" position={Position.Right} className="w-3 h-3 !bg-purple-500" />
    </div>
  )
}

// Circuit Breaker Node
function CircuitBreakerNode(_props: NodeProps) {
  const [state, setState] = useState<"closed" | "open" | "half">("closed")

  useEffect(() => {
    const states: ("closed" | "open" | "half")[] = ["closed", "open", "half"]
    let index = 0
    const interval = setInterval(() => {
      setState(states[index])
      index = (index + 1) % states.length
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="relative">
      <Handle type="target" position={Position.Left} className="w-3 h-3 !bg-orange-500" />
      <div
        className={`p-3.5 rounded-xl border-2 shadow-lg backdrop-blur-sm transition-all duration-300 ${
          state === "closed"
            ? "bg-gradient-to-br from-green-900/80 to-emerald-900/80 border-green-500/50"
            : state === "open"
            ? "bg-gradient-to-br from-red-900/80 to-rose-900/80 border-red-500/50"
            : "bg-gradient-to-br from-yellow-900/80 to-amber-900/80 border-yellow-500/50"
        }`}
        style={{
          boxShadow:
            state === "closed"
              ? "0 0 20px rgba(34,197,94,0.4)"
              : state === "open"
              ? "0 0 20px rgba(239,68,68,0.4)"
              : "0 0 20px rgba(234,179,8,0.4)",
        }}
      >
        <div className="flex items-center gap-2 mb-2">
          <Zap className={`h-5 w-5 ${state === "closed" ? "text-green-400" : state === "open" ? "text-red-400" : "text-yellow-400"}`} />
          <span className="font-bold text-sm text-white">Circuit Breaker</span>
        </div>
        <div className="flex gap-1.5">
          {[
            { key: "closed", label: "CLOSED" },
            { key: "open", label: "OPEN" },
            { key: "half", label: "HALF" },
          ].map((s) => (
            <Badge
              key={s.key}
              className={`text-xs transition-all duration-300 ${
                state === s.key
                  ? s.key === "closed"
                    ? "bg-green-500 text-white scale-105"
                    : s.key === "open"
                    ? "bg-red-500 text-white scale-105"
                    : "bg-yellow-500 text-white scale-105"
                  : "bg-slate-700/50 text-slate-400"
              }`}
            >
              {s.label}
            </Badge>
          ))}
        </div>
        <p className="text-[11px] text-slate-400 mt-1.5">3 fails / 30min</p>
      </div>
      <Handle type="source" position={Position.Right} className="w-3 h-3 !bg-yellow-500" />
    </div>
  )
}

// Executor Output Node
function ExecutorNode(_props: NodeProps) {
  const [running, setRunning] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      setRunning(true)
      setTimeout(() => setRunning(false), 1500)
    }, 4000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className={`relative transition-all duration-300 ${running ? "scale-105" : "scale-100"}`}>
      <Handle type="target" position={Position.Left} className="w-3 h-3 !bg-purple-500" />
      <div
        className={`p-3.5 rounded-xl bg-gradient-to-br from-purple-900/80 to-indigo-900/80 border-2 border-purple-500/50 shadow-lg backdrop-blur-sm ${
          running ? "ring-4 ring-offset-2 ring-purple-500/30" : ""
        }`}
        style={{ boxShadow: running ? "0 0 30px rgba(168,85,247,0.6)" : undefined }}
      >
        <div className="flex items-center gap-2 mb-1">
          <Play className={`h-5 w-5 text-purple-400 ${running ? "animate-pulse" : ""}`} />
          <span className="font-bold text-sm text-white">Executor</span>
        </div>
        <p className="text-xs text-purple-300">AWX Playbooks</p>
        <Badge className="bg-purple-500/30 text-purple-200 text-xs mt-2">safe execution</Badge>
      </div>
    </div>
  )
}

// Audit Log Node
function AuditNode(_props: NodeProps) {
  const [logging, setLogging] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      setLogging(true)
      setTimeout(() => setLogging(false), 800)
    }, 2500)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="relative">
      <Handle type="target" position={Position.Left} className="w-3 h-3 !bg-slate-500" />
      <div
        className={`p-3.5 rounded-xl bg-gradient-to-br from-slate-800/80 to-gray-900/80 border-2 border-slate-500/50 shadow-lg backdrop-blur-sm transition-all duration-300 ${
          logging ? "scale-105" : ""
        }`}
        style={{ boxShadow: logging ? "0 0 20px rgba(100,116,139,0.5)" : undefined }}
      >
        <div className="flex items-center gap-2 mb-1">
          <Lock className={`h-5 w-5 text-slate-400 ${logging ? "animate-pulse" : ""}`} />
          <span className="font-bold text-sm text-white">Audit Log</span>
        </div>
        <p className="text-xs text-slate-400">PostgreSQL</p>
        <Badge className="bg-slate-500/30 text-slate-300 text-xs mt-2">immutable</Badge>
      </div>
    </div>
  )
}

const nodeTypes = {
  request: RequestNode,
  policyEngine: PolicyEngineNode,
  decision: DecisionNode,
  circuitBreaker: CircuitBreakerNode,
  executor: ExecutorNode,
  audit: AuditNode,
}

const initialNodes: Node[] = [
  { id: "request", type: "request", position: { x: 0, y: 84 }, data: {} },
  { id: "policy", type: "policyEngine", position: { x: 185, y: 56 }, data: {} },
  { id: "decision", type: "decision", position: { x: 410, y: 84 }, data: {} },
  { id: "executor", type: "executor", position: { x: 600, y: 84 }, data: {} },
  { id: "circuit", type: "circuitBreaker", position: { x: 185, y: 225 }, data: {} },
  { id: "audit", type: "audit", position: { x: 600, y: 225 }, data: {} },
]

const initialEdges: Edge[] = [
  {
    id: "e-req-policy",
    source: "request",
    target: "policy",
    animated: true,
    style: { stroke: "#eab308", strokeWidth: 2 },
    markerEnd: { type: MarkerType.ArrowClosed, color: "#eab308" },
  },
  {
    id: "e-policy-decision",
    source: "policy",
    target: "decision",
    animated: true,
    style: { stroke: "#22c55e", strokeWidth: 2 },
    markerEnd: { type: MarkerType.ArrowClosed, color: "#22c55e" },
    label: "evaluate",
    labelStyle: { fill: "#22c55e", fontSize: 11 },
    labelBgStyle: { fill: "transparent" },
  },
  {
    id: "e-decision-executor",
    source: "decision",
    target: "executor",
    animated: true,
    style: { stroke: "#8b5cf6", strokeWidth: 2 },
    markerEnd: { type: MarkerType.ArrowClosed, color: "#8b5cf6" },
    label: "approved",
    labelStyle: { fill: "#8b5cf6", fontSize: 11 },
    labelBgStyle: { fill: "transparent" },
  },
  {
    id: "e-policy-circuit",
    source: "policy",
    target: "circuit",
    animated: true,
    style: { stroke: "#f97316", strokeWidth: 2, strokeDasharray: "5,5" },
    markerEnd: { type: MarkerType.ArrowClosed, color: "#f97316" },
    label: "check",
    labelStyle: { fill: "#f97316", fontSize: 10 },
    labelBgStyle: { fill: "transparent" },
  },
  {
    id: "e-circuit-policy",
    source: "circuit",
    target: "policy",
    animated: true,
    style: { stroke: "#eab308", strokeWidth: 2, strokeDasharray: "5,5" },
    markerEnd: { type: MarkerType.ArrowClosed, color: "#eab308" },
  },
  {
    id: "e-decision-audit",
    source: "decision",
    target: "audit",
    animated: true,
    style: { stroke: "#64748b", strokeWidth: 2, strokeDasharray: "4,4" },
    markerEnd: { type: MarkerType.ArrowClosed, color: "#64748b" },
    label: "log",
    labelStyle: { fill: "#64748b", fontSize: 10 },
    labelBgStyle: { fill: "transparent" },
  },
]

export default function PolicyEngineSlide() {
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

  // Fullscreen modal with white background
  if (isFullscreen) {
    return (
      <div className="fixed inset-0 z-[9999] bg-white">
        <div className="absolute top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 bg-gradient-to-b from-white to-transparent">
          <div>
            <h2 className="text-xl font-bold text-slate-800">Policy Engine: YAML-Driven RBAC</h2>
            <p className="text-sm text-slate-500">Confidence check → Circuit breaker → Execute or Reject</p>
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
          title="Policy Engine: YAML-Driven RBAC"
          subtitle="Confidence check → Circuit breaker → Execute or Reject"
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
              defaultViewport={{ x: 28, y: 24, zoom: 0.84 }}
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
                  {isLocked ? "Locked" : "Drag to arrange"}
                </Button>
                <Button size="sm" variant="outline" onClick={resetPositions} className="h-8 px-2.5 gap-1 text-xs font-medium shadow-md bg-white hover:bg-gray-100 border border-gray-300">
                  <RotateCcw className="h-4 w-4" />
                  Reset
                </Button>
              </div>
            </ReactFlow>
          </div>

          <div className="min-h-0 space-y-3">
            <Card className="shadow-lg">
              <CardContent className="p-3">
                <h3 className="font-bold text-sm mb-2 flex items-center gap-2">
                  <Shield className="h-4 w-4 text-yellow-500" />
                  Policy Decisions
                </h3>
                <div className="space-y-2">
                  {[
                    { decision: "AUTO_APPROVE", desc: "confidence ≥ 90%", color: "green", icon: CheckCircle },
                    { decision: "REQUIRE_HUMAN", desc: "risk = high", color: "yellow", icon: Users },
                    { decision: "REJECT", desc: "policy violation", color: "red", icon: XCircle },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-2.5 p-1.5 bg-muted/50 rounded-lg">
                      <item.icon className={`h-4 w-4 text-${item.color}-500`} />
                      <div className="flex-1">
                        <span className={`text-sm font-bold text-${item.color}-500`}>{item.decision}</span>
                        <p className="text-xs text-muted-foreground">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-lg border-2 border-orange-500/30">
              <CardContent className="p-3">
                <h4 className="font-bold text-sm mb-2 flex items-center gap-2 text-orange-600">
                  <Zap className="h-4 w-4" />
                  Circuit Breaker
                </h4>
                <div className="space-y-1.5 text-xs">
                  {[
                    { label: "Threshold", value: "3 failures" },
                    { label: "Window", value: "30 min" },
                    { label: "Cooldown", value: "60 min" },
                  ].map((item, i) => (
                    <div key={i} className="flex justify-between items-center">
                      <span className="text-muted-foreground">{item.label}</span>
                      <Badge variant="outline" className="text-xs">{item.value}</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-lg bg-gradient-to-br from-primary/5 to-secondary/5">
              <CardContent className="p-3">
                <div className="grid grid-cols-2 gap-2 text-center">
                  <div>
                    <div className="text-xl font-bold text-green-500">3</div>
                    <div className="text-xs text-muted-foreground">Decisions</div>
                  </div>
                  <div>
                    <div className="text-xl font-bold text-orange-500">3</div>
                    <div className="text-xs text-muted-foreground">CB States</div>
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
