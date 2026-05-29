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
  Database,
  Cog,
  CheckCircle,
  XCircle,
  RotateCcw,
  Brain,
  Zap,
  Shield,
  Play,
  AlertTriangle,
  Lock,
  Unlock,
  Maximize2,
  X,
} from "lucide-react"

const STORAGE_KEY = "execution-pipeline-nodes"
const LOCK_KEY = "execution-pipeline-locked"

// Backup State Node
function BackupNode({ data }: NodeProps) {
  const [isActive, setIsActive] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      setIsActive(true)
      setTimeout(() => setIsActive(false), 1000)
    }, 4000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className={`relative transition-all duration-300 ${isActive ? "scale-110" : "scale-100"}`}>
      <Handle type="target" position={Position.Left} className="w-3 h-3 !bg-purple-500" />
      <div
        className={`p-3.5 rounded-2xl bg-gradient-to-br from-indigo-500/20 to-blue-500/20 border-2 border-indigo-500/50 shadow-xl transition-all duration-300 min-w-[140px] ${
          isActive ? "ring-4 ring-offset-2 ring-indigo-500/30" : ""
        }`}
        style={{ boxShadow: isActive ? "0 0 25px rgba(99,102,241,0.5)" : undefined }}
      >
        <div className="flex items-center gap-2 mb-2">
          <Database className={`h-6 w-6 text-indigo-500 ${isActive ? "animate-pulse" : ""}`} />
          <span className="font-bold text-sm">BACKUP</span>
        </div>
        <p className="text-xs text-muted-foreground">Capture config</p>
        {isActive && <div className="absolute -top-1 -right-1 w-3 h-3 bg-indigo-400 rounded-full animate-ping" />}
      </div>
      <Handle type="source" position={Position.Right} className="w-3 h-3 !bg-red-500" />
    </div>
  )
}

// Executor Node with phases
function ExecutorNode({ data }: NodeProps) {
  const [phase, setPhase] = useState(0)
  const phases = ["SIMULATE", "CANARY", "EXPAND"]

  useEffect(() => {
    const interval = setInterval(() => {
      setPhase((prev) => (prev + 1) % phases.length)
    }, 1500)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="relative">
      <Handle type="target" position={Position.Left} className="w-3 h-3 !bg-red-500" />
      <div
        className="p-3.5 rounded-2xl bg-gradient-to-br from-red-500/20 to-orange-500/20 border-2 border-red-500/50 shadow-xl min-w-[160px]"
        style={{ boxShadow: phase === 2 ? "0 0 30px rgba(239,68,68,0.5)" : undefined }}
      >
        <div className="flex items-center gap-2 mb-2">
          <Cog className={`h-6 w-6 text-red-500 ${phase >= 0 ? "animate-spin" : ""}`} style={{ animationDuration: "3s" }} />
          <span className="font-bold text-sm">EXECUTOR</span>
        </div>
        <p className="text-xs text-muted-foreground mb-2">AWX MCP</p>
        <div className="flex gap-1.5">
          {phases.map((p, i) => (
            <Badge
              key={i}
              className={`text-xs transition-all duration-300 ${
                i === phase
                  ? i === 0
                    ? "bg-blue-500 text-white scale-110"
                    : i === 1
                    ? "bg-yellow-500 text-white scale-110"
                    : "bg-green-500 text-white scale-110"
                  : "bg-muted text-muted-foreground"
              }`}
            >
              {p}
            </Badge>
          ))}
        </div>
      </div>
      <Handle type="source" position={Position.Right} className="w-3 h-3 !bg-emerald-500" />
      <Handle type="source" position={Position.Bottom} id="rollback" className="w-3 h-3 !bg-red-500" />
    </div>
  )
}

// Validator Node
function ValidatorNode({ data }: NodeProps) {
  const [result, setResult] = useState<"checking" | "pass" | "fail">("checking")

  useEffect(() => {
    const interval = setInterval(() => {
      setResult("checking")
      setTimeout(() => setResult(Math.random() > 0.3 ? "pass" : "fail"), 1500)
    }, 4000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="relative">
      <Handle type="target" position={Position.Left} className="w-3 h-3 !bg-emerald-500" />
      <div
        className={`p-3.5 rounded-2xl border-2 shadow-xl min-w-[145px] transition-all duration-300 ${
          result === "pass"
            ? "bg-gradient-to-br from-emerald-500/20 to-green-500/20 border-emerald-500/50 ring-2 ring-offset-1 ring-emerald-500/30"
          : result === "fail"
            ? "bg-gradient-to-br from-red-500/20 to-rose-500/20 border-red-500/50 ring-2 ring-offset-1 ring-red-500/30"
            : "bg-gradient-to-br from-emerald-500/20 to-green-500/20 border-emerald-500/50"
        }`}
      >
        <div className="flex items-center gap-2 mb-2">
          {result === "pass" ? (
            <CheckCircle className="h-6 w-6 text-emerald-500 animate-pulse" />
          ) : result === "fail" ? (
            <XCircle className="h-6 w-6 text-red-500 animate-pulse" />
          ) : (
            <CheckCircle className="h-6 w-6 text-emerald-500" />
          )}
          <span className="font-bold text-sm">VALIDATOR</span>
        </div>
        <p className="text-xs text-muted-foreground mb-2">Grafana MCP</p>
        <Badge className={`text-xs ${result === "pass" ? "bg-emerald-500" : result === "fail" ? "bg-red-500" : "bg-muted"}`}>
          {result === "checking" ? "Checking..." : result.toUpperCase()}
        </Badge>
      </div>
      <Handle type="source" position={Position.Right} id="learn" className="w-3 h-3 !bg-violet-500" />
      <Handle type="source" position={Position.Bottom} id="rollback" className="w-3 h-3 !bg-red-500" />
    </div>
  )
}

// Learner Node
function LearnerNode({ data }: NodeProps) {
  const [isLearning, setIsLearning] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      setIsLearning(true)
      setTimeout(() => setIsLearning(false), 2000)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className={`relative transition-all duration-300 ${isLearning ? "scale-110" : "scale-100"}`}>
      <Handle type="target" position={Position.Left} className="w-3 h-3 !bg-violet-500" />
      <div
        className={`p-3.5 rounded-2xl bg-gradient-to-br from-violet-500/20 to-purple-500/20 border-2 border-violet-500/50 shadow-xl min-w-[140px] ${
          isLearning ? "ring-4 ring-offset-2 ring-violet-500/30" : ""
        }`}
        style={{ boxShadow: isLearning ? "0 0 25px rgba(139,92,246,0.5)" : undefined }}
      >
        <div className="flex items-center gap-2 mb-2">
          <Brain className={`h-6 w-6 text-violet-500 ${isLearning ? "animate-pulse" : ""}`} />
          <span className="font-bold text-sm">LEARNER</span>
        </div>
        <p className="text-xs text-muted-foreground">Update KB</p>
        {isLearning && <div className="absolute -top-1 -right-1 w-3 h-3 bg-violet-400 rounded-full animate-ping" />}
      </div>
    </div>
  )
}

// Rollback Node
function RollbackNode({ data }: NodeProps) {
  const [isRolling, setIsRolling] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      setIsRolling(true)
      setTimeout(() => setIsRolling(false), 1500)
    }, 6000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className={`relative transition-all duration-300 ${isRolling ? "scale-110" : "scale-100"}`}>
      <Handle type="target" position={Position.Top} className="w-3 h-3 !bg-red-500" />
      <div
        className={`p-3.5 rounded-xl bg-gradient-to-br from-red-500/20 to-rose-500/20 border-2 border-red-500/50 shadow-lg ${
          isRolling ? "ring-4 ring-offset-2 ring-red-500/30" : ""
        }`}
      >
        <div className="flex items-center gap-2">
          <RotateCcw className={`h-5 w-5 text-red-500 ${isRolling ? "animate-spin" : ""}`} />
          <span className="font-bold text-sm">ROLLBACK</span>
        </div>
        <p className="text-xs text-muted-foreground mt-1">Restore backup</p>
      </div>
      <Handle type="source" position={Position.Left} className="w-3 h-3 !bg-indigo-500" />
    </div>
  )
}

// Start Node
function StartNode({ data }: NodeProps) {
  const [pulse, setPulse] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      setPulse(true)
      setTimeout(() => setPulse(false), 800)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="relative">
      <div
        className={`p-3.5 rounded-xl bg-gradient-to-br from-green-500/20 to-emerald-500/20 border-2 border-green-500/50 shadow-lg transition-all duration-300 ${
          pulse ? "scale-110 ring-4 ring-offset-2 ring-green-500/30" : ""
        }`}
      >
        <div className="flex items-center gap-2">
          <Play className={`h-5 w-5 text-green-500 ${pulse ? "animate-pulse" : ""}`} />
          <span className="font-bold text-sm">START</span>
        </div>
        <p className="text-xs text-muted-foreground">Approved</p>
      </div>
      <Handle type="source" position={Position.Right} className="w-3 h-3 !bg-indigo-500" />
    </div>
  )
}

const nodeTypes = {
  start: StartNode,
  backup: BackupNode,
  executor: ExecutorNode,
  validator: ValidatorNode,
  learner: LearnerNode,
  rollback: RollbackNode,
}

const initialNodes: Node[] = [
  { id: "start", type: "start", position: { x: 0, y: 92 }, data: {} },
  { id: "backup", type: "backup", position: { x: 150, y: 78 }, data: {} },
  { id: "executor", type: "executor", position: { x: 340, y: 78 }, data: {} },
  { id: "validator", type: "validator", position: { x: 570, y: 78 }, data: {} },
  { id: "learner", type: "learner", position: { x: 765, y: 78 }, data: {} },
  { id: "rollback", type: "rollback", position: { x: 450, y: 225 }, data: {} },
]

const initialEdges: Edge[] = [
  {
    id: "e-start-backup",
    source: "start",
    target: "backup",
    animated: true,
    style: { stroke: "#6366f1", strokeWidth: 2 },
    markerEnd: { type: MarkerType.ArrowClosed, color: "#6366f1" },
  },
  {
    id: "e-backup-exec",
    source: "backup",
    target: "executor",
    animated: true,
    style: { stroke: "#ef4444", strokeWidth: 2 },
    markerEnd: { type: MarkerType.ArrowClosed, color: "#ef4444" },
  },
  {
    id: "e-exec-valid",
    source: "executor",
    target: "validator",
    animated: true,
    style: { stroke: "#10b981", strokeWidth: 2 },
    markerEnd: { type: MarkerType.ArrowClosed, color: "#10b981" },
  },
  {
    id: "e-valid-learn",
    source: "validator",
    sourceHandle: "learn",
    target: "learner",
    animated: true,
    style: { stroke: "#8b5cf6", strokeWidth: 2 },
    markerEnd: { type: MarkerType.ArrowClosed, color: "#8b5cf6" },
    label: "PASS",
    labelStyle: { fill: "#10b981", fontSize: 11, fontWeight: "bold" },
    labelBgStyle: { fill: "transparent" },
  },
  {
    id: "e-exec-rollback",
    source: "executor",
    sourceHandle: "rollback",
    target: "rollback",
    animated: true,
    style: { stroke: "#ef4444", strokeWidth: 2, strokeDasharray: "5,5" },
    markerEnd: { type: MarkerType.ArrowClosed, color: "#ef4444" },
    label: "ERROR",
    labelStyle: { fill: "#ef4444", fontSize: 10 },
    labelBgStyle: { fill: "transparent" },
  },
  {
    id: "e-valid-rollback",
    source: "validator",
    sourceHandle: "rollback",
    target: "rollback",
    animated: true,
    style: { stroke: "#ef4444", strokeWidth: 2, strokeDasharray: "5,5" },
    markerEnd: { type: MarkerType.ArrowClosed, color: "#ef4444" },
    label: "FAIL",
    labelStyle: { fill: "#ef4444", fontSize: 10 },
    labelBgStyle: { fill: "transparent" },
  },
  {
    id: "e-rollback-backup",
    source: "rollback",
    target: "backup",
    animated: true,
    style: { stroke: "#6366f1", strokeWidth: 2, strokeDasharray: "5,5" },
    markerEnd: { type: MarkerType.ArrowClosed, color: "#6366f1" },
    label: "restore",
    labelStyle: { fill: "#6366f1", fontSize: 10 },
    labelBgStyle: { fill: "transparent" },
  },
]

export default function ExecutionPipelineSlide() {
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
            <h2 className="text-xl font-bold text-slate-800">Safe Remediation Pipeline</h2>
            <p className="text-sm text-slate-500">Backup → Execute → Validate → Learn or Rollback</p>
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
          title="Safe Remediation Pipeline"
          subtitle="Backup → Execute → Validate → Learn or Rollback"
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
              defaultViewport={{ x: 20, y: 12, zoom: 0.84 }}
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
                  <Zap className="h-4 w-4 text-primary" />
                  Execution Phases
                </h3>
                <div className="space-y-2">
                  {[
                    { phase: "SIMULATE", desc: "Dry-run first", color: "text-blue-500" },
                    { phase: "CANARY", desc: "Single target test", color: "text-yellow-500" },
                    { phase: "EXPAND", desc: "Full rollout", color: "text-green-500" },
                  ].map((item, i) => (
                    <div key={i} className="p-1.5 bg-muted/50 rounded-lg flex items-center gap-2.5">
                      <span className={`font-bold text-sm ${item.color}`}>{item.phase}</span>
                      <span className="text-xs text-muted-foreground">{item.desc}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-lg border-2 border-red-500/30">
              <CardContent className="p-3">
                <h4 className="font-bold text-sm mb-2 flex items-center gap-2">
                  <RotateCcw className="h-4 w-4 text-red-500" />
                  Rollback Triggers
                </h4>
                <div className="space-y-1.5">
                  {[
                    "Validation metrics fail",
                    "AWX job non-zero exit",
                    "Health check fails",
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <AlertTriangle className="h-3.5 w-3.5 text-red-500" />
                      <span className="text-xs text-muted-foreground">{item}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-lg bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20">
              <CardContent className="p-3">
                <h4 className="font-bold text-sm mb-2 flex items-center gap-2 text-green-700 dark:text-green-400">
                  <Shield className="h-4 w-4" />
                  Safety Guarantees
                </h4>
                <div className="space-y-1.5">
                  {[
                    "Always backup first",
                    "Progressive rollout",
                    "Auto-rollback on failure",
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <CheckCircle className="h-3.5 w-3.5 text-green-500" />
                      <span className="text-xs">{item}</span>
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
