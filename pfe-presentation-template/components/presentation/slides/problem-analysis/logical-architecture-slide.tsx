"use client"
import SlideWrapper from "../../slide-wrapper"
import SlideHeader from "../../slide-header"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Lock, Unlock, RotateCcw, Maximize2, X } from "lucide-react"
import { useState, useEffect, useCallback } from "react"
import {
  ReactFlow,
  Node,
  Edge,
  Background,
  Controls,
  MiniMap,
  useNodesState,
  useEdgesState,
  MarkerType,
  Handle,
  Position,
} from "@xyflow/react"
import "@xyflow/react/dist/style.css"

const STORAGE_KEY = "logical-architecture-nodes"
const LOCK_KEY = "logical-architecture-locked"

// Fixed positions for fullscreen mode (optimized layout)
const FULLSCREEN_POSITIONS: Record<string, { x: number; y: number }> = {
  "stage-ingestion": { x: 0, y: 15 },
  "start": { x: 150, y: 0 },
  "ingest": { x: 320, y: 0 },
  "correlate": { x: 490, y: 0 },
  "dedup": { x: 660, y: 0 },
  "preprocess": { x: 830, y: 0 },
  "stage-routing": { x: 0, y: 130 },
  "router": { x: 551.751216647082, y: 133.95877774752736 },
  "stage-investigation": { x: 0, y: 260 },
  "fastpath": { x: 202.7922903455646, y: 297.554880119361 },
  "investigation": { x: 988.8178135835223, y: 218.2906848518137 },
  "metrics_agent": { x: 730.5089343027879, y: 368.11752157926276 },
  "incident_agent": { x: 996.6130405635274, y: 370.24626901864406 },
  "runbook_agent": { x: 1230.7573114863894, y: 353.6471549782383 },
  "stage-reasoning": { x: 0, y: 510 },
  "retriever": { x: 1055.1638728828937, y: 533.12627644273 },
  "reasoner": { x: 465.5494726101123, y: 480.7562637285874 },
  "stage-execution": { x: 0, y: 640 },
  "policy": { x: 160.50546780072904, y: 499.5467800729041 },
  "backup": { x: 360.6172971837506, y: 651.975270596717 },
  "executor": { x: 534.135810739844, y: 644.9382434845301 },
  "validator": { x: 707.6543242959376, y: 648.4567570406235 },
  "reporter": { x: 34.629862863604046, y: 714.8148644390646 },
  "stage-completion": { x: 0, y: 890 },
  "rollback": { x: 963.3329760387342, y: 733.5802700715635 },
  "learner": { x: 725.3083806209261, y: 825.7408102146904 },
  "audit": { x: 370, y: 875 },
  "end": { x: 200, y: 875 }
}

// Custom Node Component with better styling
const CustomNode = ({ data }: { data: any }) => {
  return (
    <div
      className={`px-4 py-3 rounded-xl border-2 shadow-lg min-w-[130px] ${data.bgColor} ${data.borderColor} transition-all hover:shadow-xl hover:scale-105`}
      style={{ borderStyle: data.borderStyle || 'solid' }}
    >
      <Handle type="target" position={Position.Top} className="opacity-0" />
      <Handle type="target" position={Position.Left} className="opacity-0" id="left" />
      <div className="flex items-center gap-2 mb-1">
        <span className="text-lg">{data.icon}</span>
        <span className="font-bold text-sm tracking-tight">{data.label}</span>
      </div>
      {data.details && (
        <div className="space-y-1">
          {data.details.map((detail: string, i: number) => (
            <div key={i} className="text-[11px] text-muted-foreground bg-white/60 dark:bg-black/30 px-2 py-0.5 rounded">
              {detail}
            </div>
          ))}
        </div>
      )}
      {data.badge && (
        <Badge className={`mt-1.5 text-[10px] px-2 py-0.5 ${data.badgeColor}`}>{data.badge}</Badge>
      )}
      <Handle type="source" position={Position.Bottom} className="opacity-0" />
      <Handle type="source" position={Position.Right} className="opacity-0" id="right" />
    </div>
  )
}

// Stage Label Node for visual grouping
const StageLabelNode = ({ data }: { data: any }) => {
  return (
    <div className={`px-3 py-1.5 rounded-lg font-bold text-xs uppercase tracking-wider ${data.bgColor} ${data.textColor} border-l-4 ${data.borderColor}`}>
      {data.label}
    </div>
  )
}

const nodeTypes = {
  custom: CustomNode,
  stageLabel: StageLabelNode
}

// Reorganized nodes with clear vertical flow and stage groupings
const initialNodes: Node[] = [
  // ===== STAGE 1: INGESTION (Top Row - Horizontal) =====
  {
    id: "stage-ingestion",
    type: "stageLabel",
    position: { x: 0, y: 15 },
    data: {
      label: "1. Ingestion",
      bgColor: "bg-blue-100 dark:bg-blue-900/40",
      textColor: "text-blue-700 dark:text-blue-300",
      borderColor: "border-blue-500"
    },
    draggable: false,
  },
  {
    id: "start",
    type: "custom",
    position: { x: 150, y: 0 },
    data: {
      label: "START",
      icon: "🚀",
      bgColor: "bg-green-100 dark:bg-green-900/30",
      borderColor: "border-green-500",
      details: ["Alert In"]
    },
  },
  {
    id: "ingest",
    type: "custom",
    position: { x: 320, y: 0 },
    data: {
      label: "INGEST",
      icon: "📥",
      bgColor: "bg-blue-100 dark:bg-blue-900/30",
      borderColor: "border-blue-500",
      details: ["Normalize", "Validate"]
    },
  },
  {
    id: "correlate",
    type: "custom",
    position: { x: 490, y: 0 },
    data: {
      label: "CORRELATE",
      icon: "🔗",
      bgColor: "bg-blue-100 dark:bg-blue-900/30",
      borderColor: "border-blue-500",
      details: ["Group Service", "Merge"]
    },
  },
  {
    id: "dedup",
    type: "custom",
    position: { x: 660, y: 0 },
    data: {
      label: "DEDUP",
      icon: "🔄",
      bgColor: "bg-blue-100 dark:bg-blue-900/30",
      borderColor: "border-blue-500",
      details: ["Redis 5min", "Fingerprint"]
    },
  },
  {
    id: "preprocess",
    type: "custom",
    position: { x: 830, y: 0 },
    data: {
      label: "PREPROCESS",
      icon: "⚙️",
      bgColor: "bg-blue-100 dark:bg-blue-900/30",
      borderColor: "border-blue-500",
      details: ["Features", "Enrich"]
    },
  },

  // ===== STAGE 2: ROUTING (Decision Point) =====
  {
    id: "stage-routing",
    type: "stageLabel",
    position: { x: 0, y: 130 },
    data: {
      label: "2. Routing",
      bgColor: "bg-purple-100 dark:bg-purple-900/40",
      textColor: "text-purple-700 dark:text-purple-300",
      borderColor: "border-purple-500"
    },
    draggable: false,
  },
  {
    id: "router",
    type: "custom",
    position: { x: 490, y: 115 },
    data: {
      label: "SMART ROUTER",
      icon: "🧭",
      bgColor: "bg-purple-100 dark:bg-purple-900/30",
      borderColor: "border-purple-500",
      details: ["Rule-Based", "No LLM"],
      badge: "<10ms",
      badgeColor: "bg-purple-500"
    },
  },

  // ===== STAGE 3: INVESTIGATION (Two Parallel Paths) =====
  {
    id: "stage-investigation",
    type: "stageLabel",
    position: { x: 0, y: 260 },
    data: {
      label: "3. Investigation",
      bgColor: "bg-orange-100 dark:bg-orange-900/40",
      textColor: "text-orange-700 dark:text-orange-300",
      borderColor: "border-orange-500"
    },
    draggable: false,
  },
  // Left branch - Fast Path
  {
    id: "fastpath",
    type: "custom",
    position: { x: 200, y: 245 },
    data: {
      label: "FAST PATH",
      icon: "⚡",
      bgColor: "bg-green-100 dark:bg-green-900/30",
      borderColor: "border-green-500",
      borderStyle: "dashed",
      details: ["Skip Agents"],
      badge: "≥95%",
      badgeColor: "bg-green-500"
    },
  },
  // Right branch - Full Investigation
  {
    id: "investigation",
    type: "custom",
    position: { x: 620, y: 245 },
    data: {
      label: "INVESTIGATION",
      icon: "🔍",
      bgColor: "bg-orange-100 dark:bg-orange-900/30",
      borderColor: "border-orange-500",
      details: ["Spawn Agents"],
      badge: "<95%",
      badgeColor: "bg-orange-500"
    },
  },

  // ===== Parallel Agents (Under Investigation) =====
  {
    id: "metrics_agent",
    type: "custom",
    position: { x: 480, y: 370 },
    data: {
      label: "METRICS",
      icon: "📊",
      bgColor: "bg-orange-50 dark:bg-orange-900/20",
      borderColor: "border-orange-400",
      details: ["Grafana MCP"]
    },
  },
  {
    id: "incident_agent",
    type: "custom",
    position: { x: 640, y: 370 },
    data: {
      label: "INCIDENT",
      icon: "📋",
      bgColor: "bg-orange-50 dark:bg-orange-900/20",
      borderColor: "border-orange-400",
      details: ["Qdrant RAG"]
    },
  },
  {
    id: "runbook_agent",
    type: "custom",
    position: { x: 800, y: 370 },
    data: {
      label: "RUNBOOK",
      icon: "📖",
      bgColor: "bg-orange-50 dark:bg-orange-900/20",
      borderColor: "border-orange-400",
      details: ["AWX Catalog"]
    },
  },

  // ===== STAGE 4: REASONING =====
  {
    id: "stage-reasoning",
    type: "stageLabel",
    position: { x: 0, y: 510 },
    data: {
      label: "4. Reasoning",
      bgColor: "bg-cyan-100 dark:bg-cyan-900/40",
      textColor: "text-cyan-700 dark:text-cyan-300",
      borderColor: "border-cyan-500"
    },
    draggable: false,
  },
  {
    id: "retriever",
    type: "custom",
    position: { x: 620, y: 495 },
    data: {
      label: "RETRIEVER",
      icon: "📦",
      bgColor: "bg-cyan-100 dark:bg-cyan-900/30",
      borderColor: "border-cyan-500",
      details: ["Merge Results"]
    },
  },
  {
    id: "reasoner",
    type: "custom",
    position: { x: 400, y: 495 },
    data: {
      label: "REASONER",
      icon: "🧠",
      bgColor: "bg-emerald-100 dark:bg-emerald-900/30",
      borderColor: "border-emerald-500",
      details: ["LLM + RCA"],
      badge: "Claude",
      badgeColor: "bg-emerald-500"
    },
  },

  // ===== STAGE 5: EXECUTION =====
  {
    id: "stage-execution",
    type: "stageLabel",
    position: { x: 0, y: 640 },
    data: {
      label: "5. Execution",
      bgColor: "bg-red-100 dark:bg-red-900/40",
      textColor: "text-red-700 dark:text-red-300",
      borderColor: "border-red-500"
    },
    draggable: false,
  },
  {
    id: "policy",
    type: "custom",
    position: { x: 200, y: 625 },
    data: {
      label: "POLICY",
      icon: "🛡️",
      bgColor: "bg-yellow-100 dark:bg-yellow-900/30",
      borderColor: "border-yellow-500",
      details: ["RBAC", "Circuit Break"]
    },
  },
  {
    id: "backup",
    type: "custom",
    position: { x: 370, y: 625 },
    data: {
      label: "BACKUP",
      icon: "💾",
      bgColor: "bg-indigo-100 dark:bg-indigo-900/30",
      borderColor: "border-indigo-500",
      details: ["Save State"]
    },
  },
  {
    id: "executor",
    type: "custom",
    position: { x: 540, y: 625 },
    data: {
      label: "EXECUTOR",
      icon: "▶️",
      bgColor: "bg-red-100 dark:bg-red-900/30",
      borderColor: "border-red-500",
      details: ["AWX MCP"],
      badge: "Canary",
      badgeColor: "bg-red-500"
    },
  },
  {
    id: "validator",
    type: "custom",
    position: { x: 710, y: 625 },
    data: {
      label: "VALIDATOR",
      icon: "✅",
      bgColor: "bg-emerald-100 dark:bg-emerald-900/30",
      borderColor: "border-emerald-500",
      details: ["Verify Fix"]
    },
  },
  {
    id: "reporter",
    type: "custom",
    position: { x: 200, y: 750 },
    data: {
      label: "REPORTER",
      icon: "🎫",
      bgColor: "bg-slate-100 dark:bg-slate-900/30",
      borderColor: "border-slate-500",
      details: ["Redmine"]
    },
  },

  // ===== STAGE 6: COMPLETION =====
  {
    id: "stage-completion",
    type: "stageLabel",
    position: { x: 0, y: 890 },
    data: {
      label: "6. Completion",
      bgColor: "bg-slate-100 dark:bg-slate-900/40",
      textColor: "text-slate-700 dark:text-slate-300",
      borderColor: "border-slate-500"
    },
    draggable: false,
  },
  {
    id: "rollback",
    type: "custom",
    position: { x: 710, y: 750 },
    data: {
      label: "ROLLBACK",
      icon: "↩️",
      bgColor: "bg-red-100 dark:bg-red-900/30",
      borderColor: "border-red-500",
      borderStyle: "dashed",
      details: ["Undo"]
    },
  },
  {
    id: "learner",
    type: "custom",
    position: { x: 540, y: 875 },
    data: {
      label: "LEARNER",
      icon: "📚",
      bgColor: "bg-violet-100 dark:bg-violet-900/30",
      borderColor: "border-violet-500",
      details: ["Update KB"]
    },
  },
  {
    id: "audit",
    type: "custom",
    position: { x: 370, y: 875 },
    data: {
      label: "AUDIT",
      icon: "📝",
      bgColor: "bg-slate-100 dark:bg-slate-900/30",
      borderColor: "border-slate-500",
      details: ["PostgreSQL"]
    },
  },
  {
    id: "end",
    type: "custom",
    position: { x: 200, y: 875 },
    data: {
      label: "END",
      icon: "🏁",
      bgColor: "bg-slate-200 dark:bg-slate-800",
      borderColor: "border-slate-600",
      details: ["Done"]
    },
  },
]

// Edges with better routing and clearer flow
const initialEdges: Edge[] = [
  // ===== INGESTION PIPELINE (Horizontal flow) =====
  { id: "e-start-ingest", source: "start", target: "ingest", animated: true, style: { stroke: "#3b82f6", strokeWidth: 2.5 }, markerEnd: { type: MarkerType.ArrowClosed, color: "#3b82f6" } },
  { id: "e-ingest-correlate", source: "ingest", target: "correlate", style: { stroke: "#3b82f6", strokeWidth: 2.5 }, markerEnd: { type: MarkerType.ArrowClosed, color: "#3b82f6" } },
  { id: "e-correlate-dedup", source: "correlate", target: "dedup", style: { stroke: "#3b82f6", strokeWidth: 2.5 }, markerEnd: { type: MarkerType.ArrowClosed, color: "#3b82f6" } },
  { id: "e-dedup-preprocess", source: "dedup", target: "preprocess", style: { stroke: "#3b82f6", strokeWidth: 2.5 }, markerEnd: { type: MarkerType.ArrowClosed, color: "#3b82f6" } },

  // ===== TO ROUTER =====
  { id: "e-preprocess-router", source: "preprocess", target: "router", style: { stroke: "#a855f7", strokeWidth: 2.5 }, markerEnd: { type: MarkerType.ArrowClosed, color: "#a855f7" } },

  // ===== ROUTER DECISION SPLIT =====
  { id: "e-router-fastpath", source: "router", target: "fastpath", label: "≥95% confidence", labelStyle: { fill: "#22c55e", fontWeight: 700, fontSize: 11 }, labelBgStyle: { fill: "white", fillOpacity: 0.9 }, style: { stroke: "#22c55e", strokeWidth: 2.5, strokeDasharray: "8,4" }, markerEnd: { type: MarkerType.ArrowClosed, color: "#22c55e" } },
  { id: "e-router-investigation", source: "router", target: "investigation", label: "<95% confidence", labelStyle: { fill: "#f97316", fontWeight: 700, fontSize: 11 }, labelBgStyle: { fill: "white", fillOpacity: 0.9 }, style: { stroke: "#f97316", strokeWidth: 2.5 }, markerEnd: { type: MarkerType.ArrowClosed, color: "#f97316" } },

  // ===== PARALLEL AGENT DISPATCH =====
  { id: "e-inv-metrics", source: "investigation", target: "metrics_agent", label: "Send()", labelStyle: { fill: "#f97316", fontSize: 10, fontWeight: 600 }, labelBgStyle: { fill: "white", fillOpacity: 0.9 }, style: { stroke: "#f97316", strokeWidth: 2 }, markerEnd: { type: MarkerType.ArrowClosed, color: "#f97316" } },
  { id: "e-inv-incident", source: "investigation", target: "incident_agent", style: { stroke: "#f97316", strokeWidth: 2 }, markerEnd: { type: MarkerType.ArrowClosed, color: "#f97316" } },
  { id: "e-inv-runbook", source: "investigation", target: "runbook_agent", style: { stroke: "#f97316", strokeWidth: 2 }, markerEnd: { type: MarkerType.ArrowClosed, color: "#f97316" } },

  // ===== AGENT RESULTS MERGE =====
  { id: "e-metrics-retriever", source: "metrics_agent", target: "retriever", style: { stroke: "#06b6d4", strokeWidth: 2 }, markerEnd: { type: MarkerType.ArrowClosed, color: "#06b6d4" } },
  { id: "e-incident-retriever", source: "incident_agent", target: "retriever", style: { stroke: "#06b6d4", strokeWidth: 2 }, markerEnd: { type: MarkerType.ArrowClosed, color: "#06b6d4" } },
  { id: "e-runbook-retriever", source: "runbook_agent", target: "retriever", style: { stroke: "#06b6d4", strokeWidth: 2 }, markerEnd: { type: MarkerType.ArrowClosed, color: "#06b6d4" } },

  // ===== FAST PATH BYPASS =====
  { id: "e-fastpath-reasoner", source: "fastpath", target: "reasoner", style: { stroke: "#22c55e", strokeWidth: 2.5, strokeDasharray: "8,4" }, markerEnd: { type: MarkerType.ArrowClosed, color: "#22c55e" } },

  // ===== RETRIEVER TO REASONER =====
  { id: "e-retriever-reasoner", source: "retriever", target: "reasoner", style: { stroke: "#06b6d4", strokeWidth: 2.5 }, markerEnd: { type: MarkerType.ArrowClosed, color: "#06b6d4" } },

  // ===== REASONER TO POLICY =====
  { id: "e-reasoner-policy", source: "reasoner", target: "policy", style: { stroke: "#eab308", strokeWidth: 2.5 }, markerEnd: { type: MarkerType.ArrowClosed, color: "#eab308" } },

  // ===== POLICY DECISION =====
  { id: "e-policy-reporter", source: "policy", target: "reporter", label: "HUMAN", labelStyle: { fill: "#64748b", fontWeight: 700, fontSize: 10 }, labelBgStyle: { fill: "white", fillOpacity: 0.9 }, style: { stroke: "#64748b", strokeWidth: 2, strokeDasharray: "8,4" }, markerEnd: { type: MarkerType.ArrowClosed, color: "#64748b" } },
  { id: "e-policy-backup", source: "policy", target: "backup", label: "AUTO", labelStyle: { fill: "#22c55e", fontWeight: 700, fontSize: 10 }, labelBgStyle: { fill: "white", fillOpacity: 0.9 }, style: { stroke: "#22c55e", strokeWidth: 2.5 }, markerEnd: { type: MarkerType.ArrowClosed, color: "#22c55e" } },

  // ===== EXECUTION PIPELINE =====
  { id: "e-backup-executor", source: "backup", target: "executor", style: { stroke: "#6366f1", strokeWidth: 2.5 }, markerEnd: { type: MarkerType.ArrowClosed, color: "#6366f1" } },
  { id: "e-executor-validator", source: "executor", target: "validator", style: { stroke: "#ef4444", strokeWidth: 2.5 }, markerEnd: { type: MarkerType.ArrowClosed, color: "#ef4444" } },

  // ===== VALIDATION RESULTS =====
  { id: "e-validator-learner", source: "validator", target: "learner", label: "PASS", labelStyle: { fill: "#22c55e", fontWeight: 700, fontSize: 10 }, labelBgStyle: { fill: "white", fillOpacity: 0.9 }, style: { stroke: "#22c55e", strokeWidth: 2.5 }, markerEnd: { type: MarkerType.ArrowClosed, color: "#22c55e" } },
  { id: "e-validator-rollback", source: "validator", target: "rollback", label: "FAIL", labelStyle: { fill: "#ef4444", fontWeight: 700, fontSize: 10 }, labelBgStyle: { fill: "white", fillOpacity: 0.9 }, style: { stroke: "#ef4444", strokeWidth: 2, strokeDasharray: "8,4" }, markerEnd: { type: MarkerType.ArrowClosed, color: "#ef4444" } },

  // ===== ROLLBACK RECOVERY =====
  { id: "e-rollback-learner", source: "rollback", target: "learner", style: { stroke: "#8b5cf6", strokeWidth: 2 }, markerEnd: { type: MarkerType.ArrowClosed, color: "#8b5cf6" } },

  // ===== COMPLETION =====
  { id: "e-learner-audit", source: "learner", target: "audit", style: { stroke: "#64748b", strokeWidth: 2.5 }, markerEnd: { type: MarkerType.ArrowClosed, color: "#64748b" } },
  { id: "e-reporter-audit", source: "reporter", target: "audit", style: { stroke: "#64748b", strokeWidth: 2, strokeDasharray: "8,4" }, markerEnd: { type: MarkerType.ArrowClosed, color: "#64748b" } },
  { id: "e-audit-end", source: "audit", target: "end", style: { stroke: "#64748b", strokeWidth: 2.5 }, markerEnd: { type: MarkerType.ArrowClosed, color: "#64748b" } },
]

export default function LogicalArchitectureSlide() {
  const [isLocked, setIsLocked] = useState(false)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes)
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges)

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
      // Save to localStorage after position changes
      const hasPositionChange = changes.some((c: any) => c.type === 'position' && c.dragging === false)
      if (hasPositionChange) {
        // Use setTimeout to get updated nodes after state change
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
      // Save positions when locking
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

  // Generate fullscreen nodes with fixed positions
  const fullscreenNodes = initialNodes.map((node) => ({
    ...node,
    position: FULLSCREEN_POSITIONS[node.id] || node.position
  }))

  // Fullscreen modal with fixed layout
  if (isFullscreen) {
    return (
      <div className="fixed inset-0 z-[9999] bg-white">
        <div className="absolute top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 bg-gradient-to-b from-white to-transparent">
          <div>
            <h2 className="text-xl font-bold text-slate-800">Core Workflow Architecture</h2>
            <p className="text-sm text-slate-500">Mastra orchestration workflow for incident handling</p>
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
            nodes={fullscreenNodes}
            edges={initialEdges}
            nodeTypes={nodeTypes}
            nodesDraggable={false}
            nodesConnectable={false}
            fitView
            fitViewOptions={{ padding: 0.05 }}
            minZoom={0.3}
            maxZoom={2}
          >
            <Background color="#cbd5e1" gap={20} size={1} />
            <Controls className="bg-white rounded-lg shadow-lg border border-slate-200" />
            <MiniMap
              nodeColor={(node: Node) => {
                const border = (node.data?.borderColor as string) || ''
                if (border.includes('blue')) return '#3b82f6'
                if (border.includes('purple')) return '#a855f7'
                if (border.includes('orange')) return '#f97316'
                if (border.includes('green') || border.includes('emerald')) return '#22c55e'
                if (border.includes('yellow')) return '#eab308'
                if (border.includes('red')) return '#ef4444'
                if (border.includes('cyan')) return '#06b6d4'
                if (border.includes('violet')) return '#8b5cf6'
                if (border.includes('indigo')) return '#6366f1'
                return '#64748b'
              }}
              className="bg-white rounded-lg shadow-lg border border-slate-200"
              style={{ height: 120, width: 180 }}
            />
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
          title="Core Workflow Architecture" 
          subtitle="Mastra orchestration workflow for incident handling"
          className="mb-3 [&>*:first-child]:mb-2 [&>*:first-child]:px-4 [&>*:first-child]:py-1.5 [&>*:first-child]:text-lg [&>h1]:mb-2 [&>h1]:text-4xl md:[&>h1]:text-5xl lg:[&>h1]:text-5xl xl:[&>h1]:text-6xl [&>p]:text-lg [&>p]:leading-snug md:[&>p]:text-xl"
        />
        
        <div className="flex-1 min-h-0 flex gap-2.5">
          {/* Main Flow Diagram */}
          <div className="flex-1 min-h-0 rounded-xl overflow-hidden border shadow-lg bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-blue-900/20">
            <ReactFlow
              nodes={nodes}
              edges={edges}
              onNodesChange={handleNodesChange}
              onEdgesChange={onEdgesChange}
              nodeTypes={nodeTypes}
              nodesDraggable={!isLocked}
              nodesConnectable={false}
              fitView
              fitViewOptions={{ padding: 0.1 }}
              minZoom={0.4}
              maxZoom={1.5}
              attributionPosition="bottom-right"
            >
              <Background color="#94a3b8" gap={16} size={1} />
              <Controls className="bg-white dark:bg-slate-800 rounded-lg shadow-lg" />

              {/* Lock/Reset/Fullscreen Controls */}
              <div className="absolute top-3 right-3 flex gap-2 z-50">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setIsFullscreen(true)}
                  className="h-9 px-3 gap-1.5 text-xs font-medium shadow-md bg-white hover:bg-gray-100 border border-gray-300"
                  title="View in fullscreen"
                >
                  <Maximize2 className="h-4 w-4" />
                  Fullscreen
                </Button>
                <Button
                  size="sm"
                  variant={isLocked ? "default" : "secondary"}
                  onClick={toggleLock}
                  className={`h-9 px-3 gap-1.5 text-xs font-medium shadow-md ${
                    isLocked
                      ? "bg-green-600 hover:bg-green-700 text-white"
                      : "bg-white hover:bg-gray-100 text-gray-700 border border-gray-300"
                  }`}
                  title={isLocked ? "Unlock diagram (enable dragging)" : "Lock diagram (save positions)"}
                >
                  {isLocked ? <Lock className="h-4 w-4" /> : <Unlock className="h-4 w-4" />}
                  {isLocked ? "Locked" : "Drag to arrange"}
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={resetPositions}
                  className="h-9 px-3 gap-1.5 text-xs font-medium shadow-md bg-white hover:bg-gray-100 border border-gray-300"
                  title="Reset to default positions"
                >
                  <RotateCcw className="h-4 w-4" />
                  Reset
                </Button>
              </div>
              <MiniMap
                nodeColor={(node: Node) => {
                  const border = (node.data?.borderColor as string) || ''
                  if (border.includes('blue')) return '#3b82f6'
                  if (border.includes('purple')) return '#a855f7'
                  if (border.includes('orange')) return '#f97316'
                  if (border.includes('green') || border.includes('emerald')) return '#22c55e'
                  if (border.includes('yellow')) return '#eab308'
                  if (border.includes('red')) return '#ef4444'
                  if (border.includes('cyan')) return '#06b6d4'
                  if (border.includes('violet')) return '#8b5cf6'
                  if (border.includes('indigo')) return '#6366f1'
                  return '#64748b'
                }}
                className="bg-white dark:bg-slate-800 rounded-lg shadow-lg"
                style={{ height: 100, width: 150 }}
              />
            </ReactFlow>
          </div>

          {/* Legend Sidebar */}
          <Card className="w-56 min-h-0 shadow-lg flex-shrink-0">
            <CardContent className="p-2.5 space-y-2">
              <div>
                <h4 className="font-bold text-xs mb-1.5 flex items-center gap-1">
                  🔀 Mastra Patterns
                </h4>
                <div className="space-y-1 text-[10px]">
                  <div className="flex items-center gap-1.5 p-1 bg-purple-50 dark:bg-purple-900/20 rounded">
                    <div className="w-2 h-2 rounded bg-purple-500"></div>
                    <span><strong>Orchestrator-Worker</strong></span>
                  </div>
                  <div className="text-muted-foreground pl-3.5">Dynamic agent spawn</div>
                  
                  <div className="flex items-center gap-1.5 p-1 bg-orange-50 dark:bg-orange-900/20 rounded">
                    <div className="w-2 h-2 rounded bg-orange-500"></div>
                    <span><strong>Send() API</strong></span>
                  </div>
                  <div className="text-muted-foreground pl-3.5">3x parallel speedup</div>
                  
                  <div className="flex items-center gap-1.5 p-1 bg-cyan-50 dark:bg-cyan-900/20 rounded">
                    <div className="w-2 h-2 rounded bg-cyan-500"></div>
                    <span><strong>Custom Reducers</strong></span>
                  </div>
                  <div className="text-muted-foreground pl-3.5">merge_dicts results</div>
                  
                  <div className="flex items-center gap-1.5 p-1 bg-green-50 dark:bg-green-900/20 rounded">
                    <div className="w-2 h-2 rounded bg-green-500"></div>
                    <span><strong>Conditional Edges</strong></span>
                  </div>
                  <div className="text-muted-foreground pl-3.5">Fast vs full path</div>
                </div>
              </div>

              <div className="border-t pt-1.5">
                <h4 className="font-bold text-xs mb-1 flex items-center gap-1">
                  ✅ Test Coverage
                </h4>
                <div className="grid grid-cols-2 gap-1 text-[10px]">
                  <div className="p-1 bg-green-100 dark:bg-green-900/30 rounded text-center">
                    <div className="font-bold text-green-600">125</div>
                    <div className="text-muted-foreground">Tests</div>
                  </div>
                  <div className="p-1 bg-green-100 dark:bg-green-900/30 rounded text-center">
                    <div className="font-bold text-green-600">~85%</div>
                    <div className="text-muted-foreground">Coverage</div>
                  </div>
                </div>
              </div>

              <div className="border-t pt-1.5">
                <h4 className="font-bold text-xs mb-1">📍 Legend</h4>
                <div className="space-y-0.5 text-[10px]">
                  <div className="flex items-center gap-1.5">
                    <div className="w-6 h-0.5 bg-blue-500"></div>
                    <span>Ingestion</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <div className="w-6 h-0.5 bg-orange-500"></div>
                    <span>Investigation</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <div className="w-6 h-0.5" style={{background: 'repeating-linear-gradient(90deg, #22c55e, #22c55e 3px, transparent 3px, transparent 6px)'}}></div>
                    <span>Fast Path</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <div className="w-6 h-0.5" style={{background: 'repeating-linear-gradient(90deg, #ef4444, #ef4444 3px, transparent 3px, transparent 6px)'}}></div>
                    <span>Rollback</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </SlideWrapper>
  )
}
