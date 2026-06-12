"use client"

import { useCallback, useState, useEffect } from "react"
import SlideWrapper from "../../slide-wrapper"
import SlideHeader from "../../slide-header"
import FullscreenFlowWrapper from "../../fullscreen-flow-wrapper"
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
import {
  Search,
  Activity,
  Bell,
  Brain,
  Play,
  CheckCircle,
  Database,
  BookOpen,
  Zap,
  RotateCcw,
  FileText,
  Cloud,
  Server,
  ArrowRightLeft,
  LucideIcon,
  Lock,
  Unlock,
  Maximize2,
  Minimize2,
} from "lucide-react"

const STORAGE_KEY = "interactive-pipeline-nodes"
const LOCK_KEY = "interactive-pipeline-locked"

// Custom node for OpenStack infrastructure source
function InfrastructureNode({ data }: NodeProps) {
  const [isActive, setIsActive] = useState(false)
  const nodeData = data as {
    label: string
    description: string
    icon: LucideIcon
    bgColor: string
    borderColor: string
    iconColor: string
    ringColor: string
    pulseDelay?: number
    services?: string[]
  }
  const Icon = nodeData.icon

  useEffect(() => {
    const interval = setInterval(() => {
      setIsActive(true)
      setTimeout(() => setIsActive(false), 1200)
    }, nodeData.pulseDelay || 2500)
    return () => clearInterval(interval)
  }, [nodeData.pulseDelay])

  return (
    <div className={`relative transition-all duration-300 ${isActive ? "scale-105" : "scale-100"}`}>
      <div
        className={`p-4 rounded-2xl border-2 shadow-xl ${nodeData.bgColor} ${nodeData.borderColor} ${
          isActive ? "ring-4 ring-offset-2 " + nodeData.ringColor : ""
        }`}
      >
        <div className="flex items-center gap-2 mb-2">
          <Icon className={`h-6 w-6 ${nodeData.iconColor}`} />
          <span className="font-bold text-sm">{nodeData.label}</span>
        </div>
        <p className="text-xs text-muted-foreground">{nodeData.description}</p>
        {nodeData.services && (
          <div className="flex flex-wrap gap-1 mt-2">
            {nodeData.services.map((s: string, i: number) => (
              <span key={i} className="text-[10px] px-1.5 py-0.5 rounded bg-background/50 text-muted-foreground">
                {s}
              </span>
            ))}
          </div>
        )}
        {isActive && (
          <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full animate-ping" />
        )}
      </div>
      <Handle type="source" position={Position.Right} id="logs" className="w-3 h-3 !bg-cyan-500 !top-[35%]" />
      <Handle type="source" position={Position.Right} id="metrics" className="w-3 h-3 !bg-orange-500 !top-[65%]" />
    </div>
  )
}

// Custom node for data collectors/processors (Fluentd, Prometheus)
function CollectorNode({ data }: NodeProps) {
  const [isActive, setIsActive] = useState(false)
  const nodeData = data as {
    label: string
    description: string
    icon: LucideIcon
    bgColor: string
    borderColor: string
    iconColor: string
    ringColor: string
    handleColor?: string
    hasBottomHandle?: boolean
    pulseDelay?: number
  }
  const Icon = nodeData.icon

  useEffect(() => {
    const interval = setInterval(() => {
      setIsActive(true)
      setTimeout(() => setIsActive(false), 1000)
    }, nodeData.pulseDelay || 3000)
    return () => clearInterval(interval)
  }, [nodeData.pulseDelay])

  return (
    <div className={`relative transition-all duration-300 ${isActive ? "scale-108" : "scale-100"}`}>
      <Handle type="target" position={Position.Left} className={`w-3 h-3 ${nodeData.handleColor || "!bg-primary"}`} />
      <div
        className={`p-3 rounded-xl border-2 shadow-lg ${nodeData.bgColor} ${nodeData.borderColor} ${
          isActive ? "ring-4 ring-offset-2 " + nodeData.ringColor : ""
        }`}
      >
        <div className="flex items-center gap-2">
          <Icon className={`h-5 w-5 ${nodeData.iconColor}`} />
          <span className="font-semibold text-sm">{nodeData.label}</span>
        </div>
        <p className="text-xs text-muted-foreground mt-1">{nodeData.description}</p>
        {isActive && (
          <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full animate-ping" />
        )}
      </div>
      <Handle type="source" position={Position.Right} className={`w-3 h-3 ${nodeData.handleColor || "!bg-primary"}`} />
      {nodeData.hasBottomHandle && (
        <Handle type="source" position={Position.Bottom} id="alert" className="w-3 h-3 !bg-red-500" />
      )}
    </div>
  )
}

// Custom node for alert/log stores
function StoreNode({ data }: NodeProps) {
  const [isActive, setIsActive] = useState(false)
  const nodeData = data as {
    label: string
    description: string
    icon: LucideIcon
    bgColor: string
    borderColor: string
    iconColor: string
    ringColor: string
    handleColor?: string
    hasTopHandle?: boolean
    pulseDelay?: number
  }
  const Icon = nodeData.icon

  useEffect(() => {
    const interval = setInterval(() => {
      setIsActive(true)
      setTimeout(() => setIsActive(false), 1000)
    }, nodeData.pulseDelay || 3500)
    return () => clearInterval(interval)
  }, [nodeData.pulseDelay])

  return (
    <div className={`relative transition-all duration-300 ${isActive ? "scale-105" : "scale-100"}`}>
      <Handle type="target" position={Position.Left} className={`w-3 h-3 ${nodeData.handleColor || "!bg-primary"}`} />
      {nodeData.hasTopHandle && (
        <Handle type="target" position={Position.Top} id="alert-in" className="w-3 h-3 !bg-red-500" />
      )}
      <div
        className={`p-3 rounded-xl border-2 shadow-lg ${nodeData.bgColor} ${nodeData.borderColor} ${
          isActive ? "ring-4 ring-offset-2 " + nodeData.ringColor : ""
        }`}
      >
        <div className="flex items-center gap-2">
          <Icon className={`h-5 w-5 ${nodeData.iconColor}`} />
          <span className="font-semibold text-sm">{nodeData.label}</span>
        </div>
        <p className="text-xs text-muted-foreground mt-1">{nodeData.description}</p>
        {isActive && (
          <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full animate-ping" />
        )}
      </div>
      <Handle type="source" position={Position.Right} className="w-3 h-3 !bg-purple-500" />
    </div>
  )
}

// Custom node for the core engine
function CoreEngineNode({ data }: NodeProps) {
  const [activeStep, setActiveStep] = useState(0)
  const steps = ["Ingest", "Dedup", "Route", "Investigate", "Reason", "Policy", "Execute"]

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % steps.length)
    }, 1500)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="relative">
      <Handle type="target" position={Position.Left} className="w-3 h-3 !bg-purple-500" />
      <div className="p-4 rounded-2xl bg-gradient-to-br from-purple-500/20 to-blue-500/20 border-2 border-purple-500/50 shadow-xl min-w-[260px]">
        <div className="flex items-center gap-2 mb-3">
          <Brain className="h-6 w-6 text-purple-500" />
          <span className="font-bold text-sm">Remedion Core Engine</span>
        </div>
        <div className="grid grid-cols-4 gap-1 mb-2">
          {steps.map((step, i) => (
            <div
              key={step}
              className={`text-[10px] p-1 rounded text-center transition-all duration-300 ${
                i === activeStep
                  ? "bg-purple-500 text-white scale-105 shadow-lg"
                  : i < activeStep
                  ? "bg-green-500/30 text-green-700 dark:text-green-400"
                  : "bg-muted/50 text-muted-foreground"
              }`}
            >
              {step}
            </div>
          ))}
        </div>
        <div className="text-[10px] text-muted-foreground text-center">
          Mastra State Machine
        </div>
      </div>
      <Handle type="source" position={Position.Right} className="w-3 h-3 !bg-primary" />
      <Handle type="source" position={Position.Bottom} id="mcp" className="w-3 h-3 !bg-orange-500" />
      <Handle type="source" position={Position.Top} id="agents" className="w-3 h-3 !bg-indigo-500" />
    </div>
  )
}

// Custom node for agents
function AgentNode({ data }: NodeProps) {
  const [isProcessing, setIsProcessing] = useState(false)
  const nodeData = data as {
    label: string
    source: string
    icon: LucideIcon
    bgColor: string
    borderColor: string
    iconColor: string
    ringColor: string
    processDelay?: number
  }
  const Icon = nodeData.icon

  useEffect(() => {
    const interval = setInterval(() => {
      setIsProcessing(true)
      setTimeout(() => setIsProcessing(false), 2000)
    }, nodeData.processDelay || 4000)
    return () => clearInterval(interval)
  }, [nodeData.processDelay])

  return (
    <div className="relative">
      <Handle type="target" position={Position.Bottom} className="w-3 h-3 !bg-indigo-500" />
      <div
        className={`p-2.5 rounded-xl border-2 shadow-lg transition-all duration-300 ${nodeData.bgColor} ${nodeData.borderColor} ${
          isProcessing ? "scale-105 ring-2 ring-offset-1 " + nodeData.ringColor : ""
        }`}
      >
        <div className="flex items-center gap-2">
          <Icon className={`h-4 w-4 ${nodeData.iconColor} ${isProcessing ? "animate-pulse" : ""}`} />
          <span className="font-semibold text-xs">{nodeData.label}</span>
        </div>
        <p className="text-[10px] text-muted-foreground mt-0.5">{nodeData.source}</p>
      </div>
    </div>
  )
}

// Custom node for MCP connectors
function McpNode({ data }: NodeProps) {
  const [isActive, setIsActive] = useState(false)
  const nodeData = data as {
    label: string
    icon: LucideIcon
    activeDelay?: number
  }
  const Icon = nodeData.icon

  useEffect(() => {
    const interval = setInterval(() => {
      setIsActive(true)
      setTimeout(() => setIsActive(false), 1500)
    }, nodeData.activeDelay || 5000)
    return () => clearInterval(interval)
  }, [nodeData.activeDelay])

  return (
    <div className="relative">
      <Handle type="target" position={Position.Top} className="w-3 h-3 !bg-orange-500" />
      <div
        className={`p-2 rounded-lg border shadow-md transition-all duration-300 ${
          isActive ? "bg-orange-500/20 border-orange-500 scale-105" : "bg-muted/30 border-border"
        }`}
      >
        <div className="flex items-center gap-1">
          <Icon className={`h-3 w-3 ${isActive ? "text-orange-500" : "text-muted-foreground"}`} />
          <span className="text-[10px] font-medium">{nodeData.label}</span>
        </div>
      </div>
    </div>
  )
}

// Custom node for output/learning
function OutputNode({ data }: NodeProps) {
  const [pulse, setPulse] = useState(false)
  const nodeData = data as {
    label: string
    description: string
    icon: LucideIcon
    bgColor: string
    borderColor: string
    iconColor: string
    ringColor: string
  }
  const Icon = nodeData.icon

  useEffect(() => {
    const interval = setInterval(() => {
      setPulse(true)
      setTimeout(() => setPulse(false), 1000)
    }, 6000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="relative">
      <Handle type="target" position={Position.Left} className="w-3 h-3 !bg-primary" />
      <div
        className={`p-3 rounded-xl border-2 shadow-lg transition-all duration-500 ${nodeData.bgColor} ${nodeData.borderColor} ${
          pulse ? "scale-110 ring-4 ring-offset-2 " + nodeData.ringColor : ""
        }`}
      >
        <div className="flex items-center gap-2">
          <Icon className={`h-5 w-5 ${nodeData.iconColor}`} />
          <span className="font-semibold text-sm">{nodeData.label}</span>
        </div>
        <p className="text-xs text-muted-foreground mt-1">{nodeData.description}</p>
      </div>
    </div>
  )
}

// Section boundary node for visual grouping
function SectionNode({ data }: NodeProps) {
  const nodeData = data as {
    label: string
    width: number
    height: number
    borderColor: string
    labelColor: string
    labelBg: string
  }

  return (
    <div
      className="relative pointer-events-none"
      style={{
        width: nodeData.width,
        height: nodeData.height,
      }}
    >
      <div
        className="absolute inset-0 rounded-2xl"
        style={{
          border: `2px dashed ${nodeData.borderColor}`,
          backgroundColor: "transparent",
        }}
      />
      <div
        className="absolute -top-3 left-4 px-3 py-1 rounded-md text-xs font-semibold"
        style={{
          backgroundColor: nodeData.labelBg,
          color: nodeData.labelColor,
        }}
      >
        {nodeData.label}
      </div>
    </div>
  )
}

const nodeTypes = {
  infrastructure: InfrastructureNode,
  collector: CollectorNode,
  store: StoreNode,
  coreEngine: CoreEngineNode,
  agent: AgentNode,
  mcp: McpNode,
  output: OutputNode,
  section: SectionNode,
}

const initialNodes: Node[] = [
  // ===== SECTION BOUNDARIES (rendered first, behind other nodes) =====
  {
    id: "section-observability",
    type: "section",
    position: { x: -20, y: -20 },
    draggable: false,
    selectable: false,
    data: {
      label: "Observability Stack",
      width: 590,
      height: 420,
      borderColor: "#06b6d4",
      labelColor: "#0891b2",
      labelBg: "#ecfeff",
    },
  },
  {
    id: "section-autosphere",
    type: "section",
    position: { x: 560, y: -80 },
    draggable: false,
    selectable: false,
    data: {
      label: "Remedion Orchestration Layer",
      width: 500,
      height: 500,
      borderColor: "#8b5cf6",
      labelColor: "#7c3aed",
      labelBg: "#f5f3ff",
    },
  },

  // ===== LEFT: OPENSTACK INFRASTRUCTURE =====
  {
    id: "openstack",
    type: "infrastructure",
    position: { x: 0, y: 100 },
    data: {
      label: "OpenStack",
      description: "Cloud Infrastructure",
      icon: Cloud,
      bgColor: "bg-red-500/10",
      borderColor: "border-red-500/50",
      iconColor: "text-red-500",
      ringColor: "ring-red-500/30",
      pulseDelay: 2500,
      services: ["Nova", "Neutron", "Cinder", "RabbitMQ"],
    },
  },

  // ===== LOG PIPELINE (TOP) =====
  {
    id: "fluentd",
    type: "collector",
    position: { x: 200, y: 30 },
    data: {
      label: "Fluentd",
      description: "Log Collection & Forwarding",
      icon: ArrowRightLeft,
      bgColor: "bg-cyan-500/10",
      borderColor: "border-cyan-500/50",
      iconColor: "text-cyan-500",
      ringColor: "ring-cyan-500/30",
      handleColor: "!bg-cyan-500",
      pulseDelay: 3000,
    },
  },
  {
    id: "opensearch",
    type: "store",
    position: { x: 400, y: 30 },
    data: {
      label: "OpenSearch",
      description: "Logs + RCF Anomaly Detection",
      icon: Search,
      bgColor: "bg-blue-500/10",
      borderColor: "border-blue-500/50",
      iconColor: "text-blue-500",
      ringColor: "ring-blue-500/30",
      handleColor: "!bg-cyan-500",
      pulseDelay: 3500,
    },
  },

  // ===== METRICS PIPELINE (BOTTOM) =====
  {
    id: "exporters",
    type: "collector",
    position: { x: 200, y: 200 },
    data: {
      label: "Exporters",
      description: "Node, RabbitMQ, MySQL, etc.",
      icon: Server,
      bgColor: "bg-orange-500/10",
      borderColor: "border-orange-500/50",
      iconColor: "text-orange-500",
      ringColor: "ring-orange-500/30",
      handleColor: "!bg-orange-500",
      pulseDelay: 3200,
    },
  },
  {
    id: "prometheus",
    type: "collector",
    position: { x: 400, y: 200 },
    data: {
      label: "Prometheus",
      description: "Metrics TSDB + PromQL",
      icon: Activity,
      bgColor: "bg-orange-500/10",
      borderColor: "border-orange-500/50",
      iconColor: "text-orange-500",
      ringColor: "ring-orange-500/30",
      handleColor: "!bg-orange-500",
      hasBottomHandle: true,
      pulseDelay: 3800,
    },
  },
  {
    id: "alertmanager",
    type: "store",
    position: { x: 400, y: 310 },
    data: {
      label: "Alertmanager",
      description: "Alert Routing & Grouping",
      icon: Bell,
      bgColor: "bg-red-500/10",
      borderColor: "border-red-500/50",
      iconColor: "text-red-500",
      ringColor: "ring-red-500/30",
      hasTopHandle: true,
      pulseDelay: 4000,
    },
  },

  // ===== CENTER: CORE ENGINE =====
  {
    id: "core",
    type: "coreEngine",
    position: { x: 620, y: 140 },
    data: {},
  },

  // ===== TOP: INVESTIGATION AGENTS =====
  {
    id: "metrics-agent",
    type: "agent",
    position: { x: 580, y: -30 },
    data: {
      label: "Metrics Agent",
      source: "Grafana MCP",
      icon: Activity,
      bgColor: "bg-blue-500/10",
      borderColor: "border-blue-500/50",
      iconColor: "text-blue-500",
      ringColor: "ring-blue-500/30",
      processDelay: 4000,
    },
  },
  {
    id: "incident-agent",
    type: "agent",
    position: { x: 710, y: -30 },
    data: {
      label: "Incident Agent",
      source: "Qdrant RAG",
      icon: Database,
      bgColor: "bg-purple-500/10",
      borderColor: "border-purple-500/50",
      iconColor: "text-purple-500",
      ringColor: "ring-purple-500/30",
      processDelay: 4500,
    },
  },
  {
    id: "runbook-agent",
    type: "agent",
    position: { x: 840, y: -30 },
    data: {
      label: "Runbook Agent",
      source: "Catalog + AWX",
      icon: BookOpen,
      bgColor: "bg-green-500/10",
      borderColor: "border-green-500/50",
      iconColor: "text-green-500",
      ringColor: "ring-green-500/30",
      processDelay: 5000,
    },
  },

  // ===== BOTTOM: MCP CONNECTORS =====
  {
    id: "grafana-mcp",
    type: "mcp",
    position: { x: 590, y: 330 },
    data: { label: "Grafana MCP", icon: Activity, activeDelay: 5000 },
  },
  {
    id: "awx-mcp",
    type: "mcp",
    position: { x: 690, y: 330 },
    data: { label: "AWX MCP", icon: Play, activeDelay: 6000 },
  },
  {
    id: "redmine-mcp",
    type: "mcp",
    position: { x: 790, y: 330 },
    data: { label: "Redmine MCP", icon: FileText, activeDelay: 7000 },
  },

  // ===== RIGHT: OUTPUTS =====
  {
    id: "execution",
    type: "output",
    position: { x: 920, y: 110 },
    data: {
      label: "Safe Execution",
      description: "AWX Playbooks",
      icon: Play,
      bgColor: "bg-green-500/10",
      borderColor: "border-green-500/50",
      iconColor: "text-green-500",
      ringColor: "ring-green-500/30",
    },
  },
  {
    id: "learning",
    type: "output",
    position: { x: 920, y: 220 },
    data: {
      label: "Learning Loop",
      description: "Pattern KB Update",
      icon: RotateCcw,
      bgColor: "bg-amber-500/10",
      borderColor: "border-amber-500/50",
      iconColor: "text-amber-500",
      ringColor: "ring-amber-500/30",
    },
  },
]

const initialEdges: Edge[] = [
  // ===== LOG PIPELINE: OpenStack → Fluentd → OpenSearch =====
  {
    id: "e-os-fluentd",
    source: "openstack",
    sourceHandle: "logs",
    target: "fluentd",
    animated: true,
    style: { stroke: "#06b6d4", strokeWidth: 2 },
    markerEnd: { type: MarkerType.ArrowClosed, color: "#06b6d4" },
    label: "logs",
    labelStyle: { fontSize: 10, fill: "#06b6d4" },
    labelBgStyle: { fill: "transparent" },
  },
  {
    id: "e-fluentd-os",
    source: "fluentd",
    target: "opensearch",
    animated: true,
    style: { stroke: "#06b6d4", strokeWidth: 2 },
    markerEnd: { type: MarkerType.ArrowClosed, color: "#06b6d4" },
  },

  // ===== METRICS PIPELINE: OpenStack → Exporters → Prometheus → Alertmanager =====
  {
    id: "e-os-exporters",
    source: "openstack",
    sourceHandle: "metrics",
    target: "exporters",
    animated: true,
    style: { stroke: "#f97316", strokeWidth: 2 },
    markerEnd: { type: MarkerType.ArrowClosed, color: "#f97316" },
    label: "metrics",
    labelStyle: { fontSize: 10, fill: "#f97316" },
    labelBgStyle: { fill: "transparent" },
  },
  {
    id: "e-exporters-prom",
    source: "exporters",
    target: "prometheus",
    animated: true,
    style: { stroke: "#f97316", strokeWidth: 2 },
    markerEnd: { type: MarkerType.ArrowClosed, color: "#f97316" },
  },
  {
    id: "e-prom-am",
    source: "prometheus",
    sourceHandle: "alert",
    target: "alertmanager",
    targetHandle: "alert-in",
    animated: true,
    style: { stroke: "#ef4444", strokeWidth: 2 },
    markerEnd: { type: MarkerType.ArrowClosed, color: "#ef4444" },
    label: "alerts",
    labelStyle: { fontSize: 10, fill: "#ef4444" },
    labelBgStyle: { fill: "transparent" },
  },

  // ===== ALERT SOURCES → CORE ENGINE =====
  {
    id: "e-os-core",
    source: "opensearch",
    target: "core",
    animated: true,
    style: { stroke: "#8b5cf6", strokeWidth: 2 },
    markerEnd: { type: MarkerType.ArrowClosed, color: "#8b5cf6" },
    label: "anomalies",
    labelStyle: { fontSize: 10, fill: "#8b5cf6" },
    labelBgStyle: { fill: "transparent" },
  },
  {
    id: "e-am-core",
    source: "alertmanager",
    target: "core",
    animated: true,
    style: { stroke: "#8b5cf6", strokeWidth: 2 },
    markerEnd: { type: MarkerType.ArrowClosed, color: "#8b5cf6" },
    label: "alerts",
    labelStyle: { fontSize: 10, fill: "#8b5cf6" },
    labelBgStyle: { fill: "transparent" },
  },

  // ===== CORE → AGENTS =====
  {
    id: "e-core-ma",
    source: "core",
    sourceHandle: "agents",
    target: "metrics-agent",
    animated: true,
    style: { stroke: "#6366f1", strokeWidth: 1.5 },
    markerEnd: { type: MarkerType.ArrowClosed, color: "#6366f1" },
  },
  {
    id: "e-core-ia",
    source: "core",
    sourceHandle: "agents",
    target: "incident-agent",
    animated: true,
    style: { stroke: "#6366f1", strokeWidth: 1.5 },
    markerEnd: { type: MarkerType.ArrowClosed, color: "#6366f1" },
  },
  {
    id: "e-core-ra",
    source: "core",
    sourceHandle: "agents",
    target: "runbook-agent",
    animated: true,
    style: { stroke: "#6366f1", strokeWidth: 1.5 },
    markerEnd: { type: MarkerType.ArrowClosed, color: "#6366f1" },
  },

  // ===== CORE → OUTPUTS =====
  {
    id: "e-core-exec",
    source: "core",
    target: "execution",
    animated: true,
    style: { stroke: "#22c55e", strokeWidth: 2 },
    markerEnd: { type: MarkerType.ArrowClosed, color: "#22c55e" },
  },
  {
    id: "e-core-learn",
    source: "core",
    target: "learning",
    animated: true,
    style: { stroke: "#f59e0b", strokeWidth: 2 },
    markerEnd: { type: MarkerType.ArrowClosed, color: "#f59e0b" },
  },

  // ===== CORE → MCPs =====
  {
    id: "e-core-gmcp",
    source: "core",
    sourceHandle: "mcp",
    target: "grafana-mcp",
    animated: true,
    style: { stroke: "#f97316", strokeWidth: 1.5, strokeDasharray: "4,4" },
  },
  {
    id: "e-core-amcp",
    source: "core",
    sourceHandle: "mcp",
    target: "awx-mcp",
    animated: true,
    style: { stroke: "#f97316", strokeWidth: 1.5, strokeDasharray: "4,4" },
  },
  {
    id: "e-core-rmcp",
    source: "core",
    sourceHandle: "mcp",
    target: "redmine-mcp",
    animated: true,
    style: { stroke: "#f97316", strokeWidth: 1.5, strokeDasharray: "4,4" },
  },
]

export default function InteractivePipelineSlide() {
  const [isLocked, setIsLocked] = useState(false)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes)
  const [edges, , onEdgesChange] = useEdgesState(initialEdges)
  const [selectedNode, setSelectedNode] = useState<string | null>(null)

  useEffect(() => {
    const savedPositions = localStorage.getItem(STORAGE_KEY)
    const savedLock = localStorage.getItem(LOCK_KEY)
    if (savedPositions) {
      try {
        const positions = JSON.parse(savedPositions) as Record<string, { x: number; y: number }>
        setNodes((nds) =>
          nds.map((node) => ({
            ...node,
            position: positions[node.id] || node.position,
          }))
        )
      } catch (e) {
        console.error("Failed to parse saved positions:", e)
      }
    }
    if (savedLock) {
      setIsLocked(savedLock === "true")
    }
  }, [setNodes])

  const handleNodesChange = useCallback(
    (changes: any) => {
      if (!isLocked) {
        onNodesChange(changes)
        if (changes.some((c: any) => c.type === "position" && c.dragging === false)) {
          setTimeout(() => {
            const positions: Record<string, { x: number; y: number }> = {}
            nodes.forEach((node) => {
              positions[node.id] = node.position
            })
            localStorage.setItem(STORAGE_KEY, JSON.stringify(positions))
          }, 50)
        }
      }
    },
    [isLocked, onNodesChange, nodes]
  )

  const toggleLock = useCallback(() => {
    const newLockState = !isLocked
    setIsLocked(newLockState)
    localStorage.setItem(LOCK_KEY, String(newLockState))
    if (newLockState) {
      const positions: Record<string, { x: number; y: number }> = {}
      nodes.forEach((node) => {
        positions[node.id] = node.position
      })
      localStorage.setItem(STORAGE_KEY, JSON.stringify(positions))
    }
  }, [isLocked, nodes])

  const resetPositions = useCallback(() => {
    setNodes(initialNodes)
    localStorage.removeItem(STORAGE_KEY)
  }, [setNodes])

  const onNodeClick = useCallback((_event: React.MouseEvent, node: Node) => {
    setSelectedNode(node.id)
  }, [])

  const nodeDetails: Record<string, { title: string; description: string; features: string[] }> = {
    openstack: {
      title: "OpenStack Platform",
      description: "Cloud infrastructure generating logs and metrics from all services",
      features: ["Nova (Compute)", "Neutron (Network)", "Cinder (Storage)", "RabbitMQ (Messaging)"],
    },
    fluentd: {
      title: "Fluentd",
      description: "Unified log collector aggregating logs from all OpenStack services",
      features: ["Log aggregation", "Parsing & filtering", "Forward to OpenSearch", "Buffer management"],
    },
    opensearch: {
      title: "OpenSearch + RCF",
      description: "Log storage with Random Cut Forest anomaly detection",
      features: ["Full-text search", "ML anomaly detection", "Predictive alerts", "Log correlation"],
    },
    exporters: {
      title: "Prometheus Exporters",
      description: "Expose metrics from OpenStack services in Prometheus format",
      features: ["Node Exporter", "RabbitMQ Exporter", "MySQL Exporter", "OpenStack Exporter"],
    },
    prometheus: {
      title: "Prometheus",
      description: "Time-series metrics collection with PromQL queries",
      features: ["Metrics scraping", "PromQL queries", "Alert rules", "Service discovery"],
    },
    alertmanager: {
      title: "Alertmanager",
      description: "Alert routing, grouping, deduplication, and silencing",
      features: ["Alert grouping", "Route matching", "Inhibition rules", "Notification channels"],
    },
    core: {
      title: "Remedion Core",
      description: "Mastra-based agentic workflow for self-healing automation",
      features: ["20+ nodes", "Parallel agents", "Policy engine", "Safe execution"],
    },
    "metrics-agent": {
      title: "Metrics Agent",
      description: "Query real-time metrics via Grafana MCP for investigation",
      features: ["Pattern queries", "Auto-diagnostics", "Threshold comparison"],
    },
    "incident-agent": {
      title: "Incident Agent",
      description: "Search similar past incidents via Qdrant vector DB",
      features: ["Semantic similarity", "Resolution history", "Confidence scoring"],
    },
    "runbook-agent": {
      title: "Runbook Agent",
      description: "Match alerts to remediation playbooks from catalog",
      features: ["Pattern matching", "AWX templates", "Parameter extraction"],
    },
    execution: {
      title: "Safe Execution",
      description: "Execute remediation via AWX with safety gates",
      features: ["Dry-run first", "Canary deploy", "Auto-rollback"],
    },
    learning: {
      title: "Learning Loop",
      description: "Continuous improvement from execution outcomes",
      features: ["Pattern confidence", "KB updates", "Feedback loop"],
    },
  }

  return (
    <SlideWrapper>
      <div className="h-full min-h-0 flex flex-col">
        <SlideHeader
          badge="6 - Architecture"
          title="Global Architecture and Data Flow"
          subtitle="From observability signals to assisted remediation"
          className="mb-3 [&>*:first-child]:mb-2 [&>*:first-child]:px-4 [&>*:first-child]:py-1.5 [&>*:first-child]:text-lg [&>h1]:mb-2 [&>h1]:text-4xl md:[&>h1]:text-5xl lg:[&>h1]:text-5xl xl:[&>h1]:text-6xl [&>p]:max-w-4xl [&>p]:text-lg [&>p]:leading-snug md:[&>p]:text-xl"
        />

        <div className="flex-1 min-h-0 grid grid-cols-4 gap-2.5">
          {/* Flow Diagram */}
          <div className="col-span-3 min-h-0 rounded-xl overflow-hidden border shadow-lg bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
            <FullscreenFlowWrapper
              title="Global Architecture and Data Flow"
              subtitle="From observability signals to assisted remediation"
            >
              <ReactFlow
              nodes={nodes}
              edges={edges}
              onNodesChange={handleNodesChange}
              onEdgesChange={onEdgesChange}
              onNodeClick={onNodeClick}
              nodeTypes={nodeTypes}
              nodesDraggable={!isLocked}
              nodesConnectable={false}
              fitView
              fitViewOptions={{ padding: 0.06 }}
              minZoom={0.4}
              maxZoom={1.5}
              defaultViewport={{ x: 12, y: 36, zoom: 0.78 }}
            >
              <Background color="#94a3b8" gap={20} size={1} />
              <Controls showInteractive={false} />
              <div className="absolute top-2 right-2 z-10 flex gap-1.5">
                <Button
                  size="sm"
                  variant={isLocked ? "default" : "outline"}
                  onClick={toggleLock}
                  className="h-7 px-2.5 text-xs"
                >
                  {isLocked ? <Lock className="h-3.5 w-3.5 mr-1" /> : <Unlock className="h-3.5 w-3.5 mr-1" />}
                  {isLocked ? "Locked" : "Unlocked"}
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={resetPositions}
                  className="h-7 px-2.5 text-xs"
                >
                  <RotateCcw className="h-3.5 w-3.5 mr-1" />
                  Reset
                </Button>
              </div>
              </ReactFlow>
            </FullscreenFlowWrapper>
          </div>

          {/* Info Panel */}
          <div className="min-h-0 space-y-2.5">
            <Card className="shadow-lg">
              <CardContent className="p-2.5">
                <h3 className="font-bold text-sm mb-1.5 flex items-center gap-2">
                  <Zap className="h-3.5 w-3.5 text-primary" />
                  {selectedNode && nodeDetails[selectedNode]
                    ? nodeDetails[selectedNode].title
                    : "Pipeline Overview"}
                </h3>
                <p className="text-xs leading-snug text-muted-foreground mb-2">
                  {selectedNode && nodeDetails[selectedNode]
                    ? nodeDetails[selectedNode].description
                    : "Two data paths: Logs via Fluentd -> OpenSearch, Metrics via Exporters -> Prometheus -> Alertmanager"}
                </p>
                {selectedNode && nodeDetails[selectedNode] && (
                  <div className="space-y-1">
                    {nodeDetails[selectedNode].features.map((f, i) => (
                      <div key={i} className="flex items-center gap-1 text-xs">
                        <CheckCircle className="h-3 w-3 text-green-500" />
                        <span>{f}</span>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            <Card className="shadow-md">
              <CardContent className="p-2.5">
                <h4 className="font-semibold text-xs mb-1.5">Data Flow Legend</h4>
                <div className="space-y-1.5 text-xs">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-0.5 bg-cyan-500" />
                    <span>Log Pipeline</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-0.5 bg-orange-500" />
                    <span>Metrics Pipeline</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-0.5 bg-purple-500" />
                    <span>{"Alert -> Core Engine"}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-0.5 bg-green-500" />
                    <span>Execution Output</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-0.5 bg-orange-500 opacity-50" style={{ strokeDasharray: "4,4" }} />
                    <span>MCP Connections</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-md bg-gradient-to-br from-primary/5 to-secondary/5">
              <CardContent className="p-2.5">
                <div className="grid grid-cols-2 gap-1.5 text-center">
                  <div>
                    <div className="text-lg font-bold text-cyan-500">2</div>
                    <div className="text-[10px] text-muted-foreground">Data Pipelines</div>
                  </div>
                  <div>
                    <div className="text-lg font-bold text-purple-500">3</div>
                    <div className="text-[10px] text-muted-foreground">AI Agents</div>
                  </div>
                  <div>
                    <div className="text-lg font-bold text-orange-500">3</div>
                    <div className="text-[10px] text-muted-foreground">MCP Servers</div>
                  </div>
                  <div>
                    <div className="text-lg font-bold text-green-500">20+</div>
                    <div className="text-[10px] text-muted-foreground">Graph Nodes</div>
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
