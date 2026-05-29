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
import { Button } from "@/components/ui/button"
import { Brain, Maximize2, Minimize2, Lock, Unlock, RotateCcw } from "lucide-react"

const STORAGE_KEY = "langgraph-workflow-nodes"
const LOCK_KEY = "langgraph-workflow-locked"

// Color mapping for solid backgrounds
const colorStyles: Record<string, { bg: string; border: string }> = {
  orange: { bg: "#ea580c", border: "#fb923c" },
  green: { bg: "#16a34a", border: "#4ade80" },
  blue: { bg: "#2563eb", border: "#60a5fa" },
  yellow: { bg: "#ca8a04", border: "#facc15" },
  purple: { bg: "#9333ea", border: "#c084fc" },
  teal: { bg: "#0d9488", border: "#2dd4bf" },
  red: { bg: "#dc2626", border: "#f87171" },
}

// Generic State Node - matches LangSmith style
function StateNode({ data }: NodeProps) {
  const [isActive, setIsActive] = useState(false)
  const nodeData = data as {
    label: string
    color: string
    pulseDelay?: number
  }

  const colors = colorStyles[nodeData.color] || colorStyles.blue

  useEffect(() => {
    const delay = nodeData.pulseDelay || Math.random() * 3000 + 2000
    const interval = setInterval(() => {
      setIsActive(true)
      setTimeout(() => setIsActive(false), 600)
    }, delay)
    return () => clearInterval(interval)
  }, [nodeData.pulseDelay])

  return (
    <div className={`relative transition-all duration-300 ${isActive ? "scale-110" : "scale-100"}`}>
      <Handle type="target" position={Position.Top} className="w-3 h-3 !bg-slate-500" />
      <Handle type="target" position={Position.Left} className="w-3 h-3 !bg-slate-500" />
      <div
        className="px-5 py-3 rounded-xl border-2 shadow-lg transition-all duration-300 min-w-[130px] text-center"
        style={{
          backgroundColor: colors.bg,
          borderColor: colors.border,
          boxShadow: isActive ? `0 0 20px ${colors.bg}80` : undefined
        }}
      >
        <span className="font-mono text-sm font-bold" style={{ color: "#ffffff", textShadow: "0 1px 2px rgba(0,0,0,0.5)" }}>{nodeData.label}</span>
      </div>
      <Handle type="source" position={Position.Bottom} className="w-3 h-3 !bg-slate-500" />
      <Handle type="source" position={Position.Right} className="w-3 h-3 !bg-slate-500" />
    </div>
  )
}

// Start/End Node
function TerminalNode({ data }: NodeProps) {
  const nodeData = data as { label: string; isStart?: boolean }

  return (
    <div className="relative">
      {!nodeData.isStart && <Handle type="target" position={Position.Top} className="w-3 h-3 !bg-slate-500" />}
      <div
        className="px-5 py-3 rounded-full border-2 shadow-lg"
        style={{ backgroundColor: "#1e293b", borderColor: "#64748b" }}
      >
        <span className="font-mono text-sm font-bold" style={{ color: "#ffffff" }}>{nodeData.label}</span>
      </div>
      {nodeData.isStart && <Handle type="source" position={Position.Bottom} className="w-3 h-3 !bg-slate-500" />}
    </div>
  )
}

// Agent Node (for parallel agents)
function AgentNode({ data }: NodeProps) {
  const [isActive, setIsActive] = useState(false)
  const nodeData = data as {
    label: string
    color: string
  }

  const colors = colorStyles[nodeData.color] || colorStyles.blue

  useEffect(() => {
    const interval = setInterval(() => {
      setIsActive(true)
      setTimeout(() => setIsActive(false), 800)
    }, 3000 + Math.random() * 1000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className={`relative transition-all duration-300 ${isActive ? "scale-105" : "scale-100"}`}>
      <Handle type="target" position={Position.Top} className="w-3 h-3 !bg-slate-500" />
      <Handle type="target" position={Position.Left} className="w-3 h-3 !bg-slate-500" />
      <div
        className="px-4 py-2 rounded-lg border-2 shadow-lg transition-all duration-300"
        style={{
          backgroundColor: colors.bg,
          borderColor: colors.border,
          boxShadow: isActive ? `0 0 15px ${colors.bg}80` : undefined
        }}
      >
        <span className="font-mono text-xs font-bold" style={{ color: "#ffffff", textShadow: "0 1px 2px rgba(0,0,0,0.5)" }}>{nodeData.label}</span>
      </div>
      <Handle type="source" position={Position.Bottom} className="w-3 h-3 !bg-slate-500" />
      <Handle type="source" position={Position.Right} className="w-3 h-3 !bg-slate-500" />
    </div>
  )
}

const nodeTypes = {
  state: StateNode,
  terminal: TerminalNode,
  agent: AgentNode,
}

// Node positions matching LangSmith vertical layout
const initialNodes: Node[] = [
  // === TOP: Start ===
  { id: "__start__", type: "terminal", position: { x: 250, y: 0 }, data: { label: "__start__", isStart: true } },

  // === INGESTION LAYER ===
  { id: "ingest", type: "state", position: { x: 250, y: 70 }, data: { label: "ingest", color: "orange" } },
  { id: "correlation", type: "state", position: { x: 250, y: 140 }, data: { label: "correlation", color: "green" } },

  // === DEDUP (left branch) ===
  { id: "dedup", type: "state", position: { x: 150, y: 220 }, data: { label: "dedup", color: "blue" } },

  // === PREPROCESSING ===
  { id: "preprocess", type: "state", position: { x: 350, y: 220 }, data: { label: "preprocess", color: "green" } },

  // === SMART ROUTER ===
  { id: "smart_router", type: "state", position: { x: 350, y: 290 }, data: { label: "smart_router", color: "yellow" } },

  // === PARALLEL AGENTS ===
  { id: "metrics_agent", type: "agent", position: { x: 250, y: 370 }, data: { label: "metrics_agent", color: "blue" } },
  { id: "incident_agent", type: "agent", position: { x: 380, y: 370 }, data: { label: "incident_agent", color: "purple" } },
  { id: "runbook_agent", type: "agent", position: { x: 520, y: 340 }, data: { label: "runbook_agent", color: "green" } },

  // === RETRIEVER ===
  { id: "retriever", type: "state", position: { x: 350, y: 450 }, data: { label: "retriever", color: "purple" } },

  // === CONTEXT PREP ===
  { id: "context_prep", type: "state", position: { x: 350, y: 520 }, data: { label: "context_prep", color: "purple" } },

  // === REASONER ===
  { id: "reasoner", type: "state", position: { x: 350, y: 590 }, data: { label: "reasoner", color: "teal" } },

  // === POLICY ===
  { id: "policy", type: "state", position: { x: 350, y: 660 }, data: { label: "policy", color: "yellow" } },

  // === REPORTER (left branch from policy) ===
  { id: "reporter", type: "state", position: { x: 200, y: 730 }, data: { label: "reporter", color: "blue" } },

  // === EXECUTION BRANCH (right) ===
  { id: "backup_state", type: "state", position: { x: 480, y: 730 }, data: { label: "backup_state", color: "purple" } },
  { id: "executor", type: "state", position: { x: 480, y: 800 }, data: { label: "executor", color: "orange" } },
  { id: "validator", type: "state", position: { x: 480, y: 870 }, data: { label: "validator", color: "orange" } },
  { id: "rollback", type: "state", position: { x: 550, y: 940 }, data: { label: "rollback", color: "red" } },
  { id: "learner", type: "state", position: { x: 480, y: 1010 }, data: { label: "learner", color: "purple" } },

  // === AUDIT ===
  { id: "audit", type: "state", position: { x: 250, y: 1010 }, data: { label: "audit", color: "blue" } },

  // === END ===
  { id: "__end__", type: "terminal", position: { x: 250, y: 1100 }, data: { label: "__end__", isStart: false } },
]

const initialEdges: Edge[] = [
  // Start -> Ingest
  { id: "e1", source: "__start__", target: "ingest", animated: true, style: { stroke: "#f97316", strokeWidth: 1.5 }, markerEnd: { type: MarkerType.ArrowClosed, color: "#f97316", width: 15, height: 15 } },

  // Ingest -> Correlation
  { id: "e2", source: "ingest", target: "correlation", animated: true, style: { stroke: "#22c55e", strokeWidth: 1.5 }, markerEnd: { type: MarkerType.ArrowClosed, color: "#22c55e", width: 15, height: 15 } },

  // Correlation -> Dedup & Preprocess
  { id: "e3a", source: "correlation", target: "dedup", animated: true, style: { stroke: "#3b82f6", strokeWidth: 1.5 }, markerEnd: { type: MarkerType.ArrowClosed, color: "#3b82f6", width: 15, height: 15 } },
  { id: "e3b", source: "correlation", target: "preprocess", animated: true, style: { stroke: "#22c55e", strokeWidth: 1.5 }, markerEnd: { type: MarkerType.ArrowClosed, color: "#22c55e", width: 15, height: 15 } },

  // Dedup -> Preprocess
  { id: "e4", source: "dedup", target: "preprocess", animated: true, style: { stroke: "#22c55e", strokeWidth: 1.5 }, markerEnd: { type: MarkerType.ArrowClosed, color: "#22c55e", width: 15, height: 15 } },

  // Preprocess -> Smart Router
  { id: "e5", source: "preprocess", target: "smart_router", animated: true, style: { stroke: "#eab308", strokeWidth: 1.5 }, markerEnd: { type: MarkerType.ArrowClosed, color: "#eab308", width: 15, height: 15 } },

  // Smart Router -> Agents (parallel)
  { id: "e6a", source: "smart_router", target: "metrics_agent", animated: true, style: { stroke: "#3b82f6", strokeWidth: 1.5 }, markerEnd: { type: MarkerType.ArrowClosed, color: "#3b82f6", width: 15, height: 15 } },
  { id: "e6b", source: "smart_router", target: "incident_agent", animated: true, style: { stroke: "#a855f7", strokeWidth: 1.5 }, markerEnd: { type: MarkerType.ArrowClosed, color: "#a855f7", width: 15, height: 15 } },
  { id: "e6c", source: "smart_router", target: "runbook_agent", animated: true, style: { stroke: "#22c55e", strokeWidth: 1.5, strokeDasharray: "4,4" }, markerEnd: { type: MarkerType.ArrowClosed, color: "#22c55e", width: 15, height: 15 } },

  // Agents -> Retriever
  { id: "e7a", source: "metrics_agent", target: "retriever", animated: true, style: { stroke: "#a855f7", strokeWidth: 1.5 }, markerEnd: { type: MarkerType.ArrowClosed, color: "#a855f7", width: 15, height: 15 } },
  { id: "e7b", source: "incident_agent", target: "retriever", animated: true, style: { stroke: "#a855f7", strokeWidth: 1.5 }, markerEnd: { type: MarkerType.ArrowClosed, color: "#a855f7", width: 15, height: 15 } },
  { id: "e7c", source: "runbook_agent", target: "retriever", animated: true, style: { stroke: "#a855f7", strokeWidth: 1.5, strokeDasharray: "4,4" }, markerEnd: { type: MarkerType.ArrowClosed, color: "#a855f7", width: 15, height: 15 } },

  // Retriever -> Context Prep
  { id: "e8", source: "retriever", target: "context_prep", animated: true, style: { stroke: "#a855f7", strokeWidth: 1.5 }, markerEnd: { type: MarkerType.ArrowClosed, color: "#a855f7", width: 15, height: 15 } },

  // Context Prep -> Reasoner
  { id: "e9", source: "context_prep", target: "reasoner", animated: true, style: { stroke: "#14b8a6", strokeWidth: 1.5 }, markerEnd: { type: MarkerType.ArrowClosed, color: "#14b8a6", width: 15, height: 15 } },

  // Reasoner -> Policy
  { id: "e10", source: "reasoner", target: "policy", animated: true, style: { stroke: "#eab308", strokeWidth: 1.5 }, markerEnd: { type: MarkerType.ArrowClosed, color: "#eab308", width: 15, height: 15 } },

  // Policy -> Reporter (HUMAN/REJECT)
  { id: "e11a", source: "policy", target: "reporter", animated: true, style: { stroke: "#3b82f6", strokeWidth: 1.5 }, markerEnd: { type: MarkerType.ArrowClosed, color: "#3b82f6", width: 15, height: 15 } },

  // Policy -> Backup State (AUTO)
  { id: "e11b", source: "policy", target: "backup_state", animated: true, style: { stroke: "#a855f7", strokeWidth: 1.5 }, markerEnd: { type: MarkerType.ArrowClosed, color: "#a855f7", width: 15, height: 15 } },

  // Backup -> Executor
  { id: "e12", source: "backup_state", target: "executor", animated: true, style: { stroke: "#f97316", strokeWidth: 1.5 }, markerEnd: { type: MarkerType.ArrowClosed, color: "#f97316", width: 15, height: 15 } },

  // Executor -> Validator
  { id: "e13", source: "executor", target: "validator", animated: true, style: { stroke: "#f97316", strokeWidth: 1.5 }, markerEnd: { type: MarkerType.ArrowClosed, color: "#f97316", width: 15, height: 15 } },

  // Validator -> Rollback (on failure)
  { id: "e14a", source: "validator", target: "rollback", animated: true, style: { stroke: "#ef4444", strokeWidth: 1.5 }, markerEnd: { type: MarkerType.ArrowClosed, color: "#ef4444", width: 15, height: 15 } },

  // Validator -> Learner (on success)
  { id: "e14b", source: "validator", target: "learner", animated: true, style: { stroke: "#a855f7", strokeWidth: 1.5 }, markerEnd: { type: MarkerType.ArrowClosed, color: "#a855f7", width: 15, height: 15 } },

  // Rollback -> Learner
  { id: "e15", source: "rollback", target: "learner", animated: true, style: { stroke: "#a855f7", strokeWidth: 1.5 }, markerEnd: { type: MarkerType.ArrowClosed, color: "#a855f7", width: 15, height: 15 } },

  // Reporter -> Audit
  { id: "e16a", source: "reporter", target: "audit", animated: true, style: { stroke: "#3b82f6", strokeWidth: 1.5 }, markerEnd: { type: MarkerType.ArrowClosed, color: "#3b82f6", width: 15, height: 15 } },

  // Learner -> Audit
  { id: "e16b", source: "learner", target: "audit", animated: true, style: { stroke: "#3b82f6", strokeWidth: 1.5 }, markerEnd: { type: MarkerType.ArrowClosed, color: "#3b82f6", width: 15, height: 15 } },

  // Dedup -> Audit (direct path for known alerts)
  { id: "e17", source: "dedup", target: "audit", animated: true, style: { stroke: "#3b82f6", strokeWidth: 1.5, strokeDasharray: "4,4" }, markerEnd: { type: MarkerType.ArrowClosed, color: "#3b82f6", width: 15, height: 15 } },

  // Audit -> End
  { id: "e18", source: "audit", target: "__end__", animated: true, style: { stroke: "#64748b", strokeWidth: 1.5 }, markerEnd: { type: MarkerType.ArrowClosed, color: "#64748b", width: 15, height: 15 } },
]

export default function LangGraphWorkflowSlide() {
  const [isLocked, setIsLocked] = useState(false)
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes)
  const [edges, , onEdgesChange] = useEdgesState(initialEdges)
  const [isFullscreen, setIsFullscreen] = useState(false)

  // Load saved positions and lock state from localStorage on mount
  useEffect(() => {
    const savedPositions = localStorage.getItem(STORAGE_KEY)
    const savedLock = localStorage.getItem(LOCK_KEY)

    if (savedPositions) {
      try {
        const positions = JSON.parse(savedPositions) as Record<string, { x: number; y: number }>
        setNodes((nds) => nds.map((node) => ({ ...node, position: positions[node.id] || node.position })))
      } catch (e) {
        console.error("Failed to parse saved positions:", e)
      }
    }

    if (savedLock) {
      setIsLocked(savedLock === "true")
    }
  }, [setNodes])

  // Save nodes to localStorage whenever they change
  const handleNodesChange = useCallback((changes: any) => {
    if (!isLocked) {
      onNodesChange(changes)
      const hasPositionChange = changes.some((c: any) => c.type === 'position' && c.dragging === false)
      if (hasPositionChange) {
        setTimeout(() => {
          const positions: Record<string, { x: number; y: number }> = {}
          nodes.forEach((node) => { positions[node.id] = node.position })
          localStorage.setItem(STORAGE_KEY, JSON.stringify(positions))
        }, 50)
      }
    }
  }, [isLocked, onNodesChange, nodes])

  // Toggle lock state
  const toggleLock = useCallback(() => {
    const newLockState = !isLocked
    setIsLocked(newLockState)
    localStorage.setItem(LOCK_KEY, String(newLockState))
    if (newLockState) {
      const positions: Record<string, { x: number; y: number }> = {}
      nodes.forEach((node) => { positions[node.id] = node.position })
      localStorage.setItem(STORAGE_KEY, JSON.stringify(positions))
    }
  }, [isLocked, nodes])

  // Reset to default positions
  const resetPositions = useCallback(() => {
    setNodes(initialNodes)
    localStorage.removeItem(STORAGE_KEY)
  }, [setNodes])

  // Fullscreen ReactFlow component
  const FlowDiagram = (
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
      maxZoom={1.5}
      defaultViewport={{ x: 100, y: 20, zoom: isFullscreen ? 0.7 : 0.55 }}
    >
      <Background color="#94a3b8" gap={20} size={1} />
      <Controls showInteractive={false} />

      {/* Lock/Reset Controls */}
      <div className="absolute top-3 right-3 flex gap-2 z-50">
        <Button
          size="sm"
          variant={isLocked ? "default" : "outline"}
          onClick={toggleLock}
          className="h-8 px-3"
          title={isLocked ? "Unlock diagram (enable dragging)" : "Lock diagram (save positions)"}
        >
          {isLocked ? <Lock className="h-4 w-4 mr-1" /> : <Unlock className="h-4 w-4 mr-1" />}
          {isLocked ? "Locked" : "Unlocked"}
        </Button>
        <Button
          size="sm"
          variant="outline"
          onClick={resetPositions}
          className="h-8 px-3"
          title="Reset to default positions"
        >
          <RotateCcw className="h-4 w-4 mr-1" />
          Reset
        </Button>
      </div>
    </ReactFlow>
  )

  // Fullscreen modal
  if (isFullscreen) {
    return (
      <div className="fixed inset-0 z-50 bg-slate-950">
        {/* Close button */}
        <Button
          variant="outline"
          size="sm"
          className="absolute top-4 right-4 z-50 bg-slate-800 border-slate-600 hover:bg-slate-700"
          onClick={() => setIsFullscreen(false)}
        >
          <Minimize2 className="h-4 w-4 mr-2" />
          Exit Fullscreen
        </Button>

        {/* Title */}
        <div className="absolute top-4 left-4 z-50">
          <h2 className="text-xl font-bold text-white">Mastra State Machine</h2>
          <p className="text-sm text-slate-400">Complete workflow — 20+ nodes with parallel agents</p>
        </div>

        {/* Flow diagram */}
        <div className="w-full h-full">
          {FlowDiagram}
        </div>
      </div>
    )
  }

  return (
    <SlideWrapper>
      <div className="h-full flex flex-col">
        <SlideHeader
          badge="6 • Architecture"
          title="Mastra State Machine"
          subtitle="Complete workflow — 20+ nodes with parallel agents"
        />

        <div className="flex-1 grid grid-cols-4 gap-3">
          <div className="col-span-3 rounded-xl overflow-hidden border shadow-lg bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 relative">
            {/* Fullscreen button */}
            <Button
              variant="outline"
              size="sm"
              className="absolute top-2 left-2 z-10 h-8 px-3"
              onClick={() => setIsFullscreen(true)}
            >
              <Maximize2 className="h-4 w-4 mr-1" />
              Fullscreen
            </Button>

            {FlowDiagram}
          </div>

          <div className="space-y-2 overflow-y-auto">
            <Card className="shadow-lg">
              <CardContent className="p-2">
                <h3 className="font-bold text-xs mb-2 flex items-center gap-2">
                  <Brain className="h-3 w-3 text-purple-500" />
                  Node Legend
                </h3>
                <div className="space-y-1 text-[10px]">
                  {[
                    { color: "bg-orange-500", label: "Ingestion (ingest, executor)" },
                    { color: "bg-green-500", label: "Processing (correlation, preprocess)" },
                    { color: "bg-blue-500", label: "Storage (dedup, reporter, audit)" },
                    { color: "bg-yellow-500", label: "Routing (smart_router, policy)" },
                    { color: "bg-purple-500", label: "Investigation (agents, retriever)" },
                    { color: "bg-teal-500", label: "Reasoning (reasoner, context)" },
                    { color: "bg-red-500", label: "Recovery (rollback)" },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded ${item.color}`} />
                      <span className="text-muted-foreground">{item.label}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-lg">
              <CardContent className="p-2">
                <h4 className="font-semibold text-xs mb-1">Key Paths</h4>
                <div className="space-y-1 text-[10px]">
                  <div className="p-1 bg-green-500/10 rounded border-l-2 border-green-500">
                    <span className="font-medium text-green-500">AUTO_APPROVE</span>
                    <p className="text-muted-foreground">policy → backup → exec → validate → learn</p>
                  </div>
                  <div className="p-1 bg-yellow-500/10 rounded border-l-2 border-yellow-500">
                    <span className="font-medium text-yellow-500">REQUIRE_HUMAN</span>
                    <p className="text-muted-foreground">policy → reporter → audit</p>
                  </div>
                  <div className="p-1 bg-red-500/10 rounded border-l-2 border-red-500">
                    <span className="font-medium text-red-500">ROLLBACK</span>
                    <p className="text-muted-foreground">validator → rollback → learner</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-lg bg-gradient-to-br from-primary/5 to-secondary/5">
              <CardContent className="p-2">
                <div className="grid grid-cols-2 gap-1 text-center">
                  <div>
                    <div className="text-lg font-bold text-purple-500">20+</div>
                    <div className="text-[9px] text-muted-foreground">Nodes</div>
                  </div>
                  <div>
                    <div className="text-lg font-bold text-orange-500">3</div>
                    <div className="text-[9px] text-muted-foreground">Agents</div>
                  </div>
                  <div>
                    <div className="text-lg font-bold text-green-500">7</div>
                    <div className="text-[9px] text-muted-foreground">Phases</div>
                  </div>
                  <div>
                    <div className="text-lg font-bold text-cyan-500">3</div>
                    <div className="text-[9px] text-muted-foreground">Decisions</div>
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
