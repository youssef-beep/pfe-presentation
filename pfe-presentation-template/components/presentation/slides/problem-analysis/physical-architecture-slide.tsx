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
  Server,
  Database,
  Cloud,
  Activity,
  Brain,
  Network,
  Cpu,
  Lock,
  Unlock,
  RotateCcw,
  Maximize2,
  X,
} from "lucide-react"

const STORAGE_KEY = "physical-architecture-nodes"
const LOCK_KEY = "physical-architecture-locked"

// Infrastructure Layer Node - Light Theme
function InfraLayerNode({ data }: NodeProps) {
  const [isActive, setIsActive] = useState(false)
  const nodeData = data as {
    label: string
    icon: string
    color: string
    components: { name: string; port: string }[]
  }

  useEffect(() => {
    const interval = setInterval(() => {
      setIsActive(true)
      setTimeout(() => setIsActive(false), 1200)
    }, 2500 + Math.random() * 1500)
    return () => clearInterval(interval)
  }, [])

  const icons: Record<string, React.ReactNode> = {
    activity: <Activity className="h-5 w-5" />,
    brain: <Brain className="h-5 w-5" />,
    server: <Server className="h-5 w-5" />,
    cloud: <Cloud className="h-5 w-5" />,
  }

  const colorMap: Record<string, { bg: string; border: string; text: string; ring: string }> = {
    blue: { bg: "bg-blue-500/10", border: "border-blue-500/50", text: "text-blue-500", ring: "ring-blue-500/30" },
    purple: { bg: "bg-purple-500/10", border: "border-purple-500/50", text: "text-purple-500", ring: "ring-purple-500/30" },
    orange: { bg: "bg-orange-500/10", border: "border-orange-500/50", text: "text-orange-500", ring: "ring-orange-500/30" },
    green: { bg: "bg-green-500/10", border: "border-green-500/50", text: "text-green-500", ring: "ring-green-500/30" },
  }

  const colors = colorMap[nodeData.color] || colorMap.blue

  return (
    <div className={`relative transition-all duration-300 ${isActive ? "scale-105" : "scale-100"}`}>
      <Handle type="target" position={Position.Top} className="w-3 h-3 !bg-primary" />
      <div
        className={`p-3 rounded-xl ${colors.bg} border-2 ${colors.border} shadow-lg transition-all duration-300 min-w-[160px] ${
          isActive ? `ring-4 ring-offset-2 ${colors.ring}` : ""
        }`}
      >
        <div className="flex items-center gap-2 mb-2">
          <div className={colors.text}>{icons[nodeData.icon]}</div>
          <span className="font-bold text-sm">{nodeData.label}</span>
        </div>
        <div className="space-y-1">
          {nodeData.components.map((comp, i) => (
            <div key={i} className="flex items-center justify-between text-[9px] px-1.5 py-1 bg-background/50 rounded">
              <span className="text-foreground">{comp.name}</span>
              <Badge variant="outline" className="text-[8px] py-0 px-1">{comp.port}</Badge>
            </div>
          ))}
        </div>
      </div>
      <Handle type="source" position={Position.Bottom} className="w-3 h-3 !bg-primary" />
    </div>
  )
}

// Network Traffic Node - Light Theme
function TrafficNode({ data }: NodeProps) {
  const [trafficLevel, setTrafficLevel] = useState(0)
  const nodeData = data as { direction: string }

  useEffect(() => {
    const interval = setInterval(() => {
      setTrafficLevel((prev) => (prev + 1) % 5)
    }, 300)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="relative">
      <Handle type="target" position={Position.Left} className="w-2 h-2 !bg-cyan-500" />
      <div className="p-2 rounded-lg bg-cyan-500/10 border border-cyan-500/50 shadow-md">
        <div className="flex items-center gap-1.5">
          <Network className="h-3 w-3 text-cyan-500" />
          <span className="text-[9px] text-cyan-600 font-medium">{nodeData.direction}</span>
        </div>
        <div className="flex gap-0.5 mt-1">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className={`w-2 h-3 rounded-sm transition-all duration-150 ${
                i <= trafficLevel ? "bg-cyan-500" : "bg-cyan-200"
              }`}
            />
          ))}
        </div>
      </div>
      <Handle type="source" position={Position.Right} className="w-2 h-2 !bg-cyan-500" />
    </div>
  )
}

const nodeTypes = {
  infraLayer: InfraLayerNode,
  traffic: TrafficNode,
}

const initialNodes: Node[] = [
  // Monitoring Layer
  { id: "monitoring", type: "infraLayer", position: { x: 0, y: 0 }, data: { label: "Monitoring", icon: "activity", color: "blue", components: [{ name: "Prometheus", port: "9090" }, { name: "AlertManager", port: "9093" }, { name: "OpenSearch", port: "9200" }] } },
  // REMEdion Core
  { id: "autosphere", type: "infraLayer", position: { x: 220, y: 0 }, data: { label: "REMEdion Core", icon: "brain", color: "purple", components: [{ name: "Mastra Engine", port: "8000" }, { name: "Qdrant", port: "6333" }, { name: "Redis", port: "6379" }, { name: "PostgreSQL", port: "5432" }] } },
  // Execution Layer
  { id: "execution", type: "infraLayer", position: { x: 440, y: 0 }, data: { label: "Execution Layer", icon: "server", color: "orange", components: [{ name: "AWX", port: "443" }, { name: "Grafana MCP", port: "stdio" }, { name: "Redmine", port: "3000" }] } },
  // Target Platform
  { id: "openstack", type: "infraLayer", position: { x: 660, y: 0 }, data: { label: "OpenStack", icon: "cloud", color: "green", components: [{ name: "Nova/Neutron", port: "-" }, { name: "RabbitMQ", port: "5672" }, { name: "MariaDB Galera", port: "3306" }] } },
  // Traffic indicators
  { id: "traffic1", type: "traffic", position: { x: 165, y: 200 }, data: { direction: "alerts" } },
  { id: "traffic2", type: "traffic", position: { x: 385, y: 200 }, data: { direction: "actions" } },
  { id: "traffic3", type: "traffic", position: { x: 605, y: 200 }, data: { direction: "remediate" } },
]

const initialEdges: Edge[] = [
  // Layer connections
  { id: "e1", source: "monitoring", target: "autosphere", animated: true, style: { stroke: "#3b82f6", strokeWidth: 2 }, markerEnd: { type: MarkerType.ArrowClosed, color: "#3b82f6" } },
  { id: "e2", source: "autosphere", target: "execution", animated: true, style: { stroke: "#8b5cf6", strokeWidth: 2 }, markerEnd: { type: MarkerType.ArrowClosed, color: "#8b5cf6" } },
  { id: "e3", source: "execution", target: "openstack", animated: true, style: { stroke: "#f97316", strokeWidth: 2 }, markerEnd: { type: MarkerType.ArrowClosed, color: "#f97316" } },
  // Traffic flows
  { id: "e-t1", source: "monitoring", target: "traffic1", animated: true, style: { stroke: "#06b6d4", strokeWidth: 1.5 } },
  { id: "e-t1b", source: "traffic1", target: "autosphere", animated: true, style: { stroke: "#06b6d4", strokeWidth: 1.5 } },
  { id: "e-t2", source: "autosphere", target: "traffic2", animated: true, style: { stroke: "#06b6d4", strokeWidth: 1.5 } },
  { id: "e-t2b", source: "traffic2", target: "execution", animated: true, style: { stroke: "#06b6d4", strokeWidth: 1.5 } },
  { id: "e-t3", source: "execution", target: "traffic3", animated: true, style: { stroke: "#06b6d4", strokeWidth: 1.5 } },
  { id: "e-t3b", source: "traffic3", target: "openstack", animated: true, style: { stroke: "#06b6d4", strokeWidth: 1.5 } },
]

export default function PhysicalArchitectureSlide() {
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
            nodes.forEach((node) => { positions[node.id] = node.position })
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
            <h2 className="text-xl font-bold text-slate-800">Physical Architecture</h2>
            <p className="text-sm text-slate-500">Deployment topology and infrastructure layers</p>
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
          title="Physical Architecture"
          subtitle="Deployment topology and infrastructure layers"
          className="mb-3 [&>*:first-child]:mb-2 [&>*:first-child]:px-4 [&>*:first-child]:py-1.5 [&>*:first-child]:text-lg [&>h1]:mb-2 [&>h1]:text-4xl md:[&>h1]:text-5xl lg:[&>h1]:text-5xl xl:[&>h1]:text-6xl [&>p]:text-lg [&>p]:leading-snug md:[&>p]:text-xl"
        />

        <div className="flex-1 min-h-0 grid grid-cols-4 gap-2.5">
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
              minZoom={0.5}
              maxZoom={1.5}
              defaultViewport={{ x: 30, y: 50, zoom: 0.75 }}
            >
              <Background color="#94a3b8" gap={30} size={1} />
              <Controls showInteractive={false} />
              <div className="absolute top-2 right-2 z-10 flex gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setIsFullscreen(true)}
                  className="h-8 px-3"
                >
                  <Maximize2 className="h-4 w-4 mr-1" />
                  Fullscreen
                </Button>
                <Button
                  size="sm"
                  variant={isLocked ? "default" : "outline"}
                  onClick={toggleLock}
                  className="h-8 px-3"
                >
                  {isLocked ? <Lock className="h-4 w-4 mr-1" /> : <Unlock className="h-4 w-4 mr-1" />}
                  {isLocked ? "Locked" : "Unlocked"}
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={resetPositions}
                  className="h-8 px-3"
                >
                  <RotateCcw className="h-4 w-4 mr-1" />
                  Reset
                </Button>
              </div>
            </ReactFlow>
          </div>

          <div className="min-h-0 space-y-2.5">
            <Card className="shadow-lg">
              <CardContent className="p-3">
                <h3 className="font-bold text-sm mb-2 flex items-center gap-2">
                  <Network className="h-4 w-4 text-primary" />
                  MCP Connectors
                </h3>
                <div className="space-y-1.5">
                  {[
                    { name: "Grafana MCP", lang: "Go", color: "text-orange-500" },
                    { name: "AWX MCP", lang: "Python", color: "text-red-500" },
                    { name: "Redmine MCP", lang: "Python", color: "text-green-500" },
                  ].map((mcp, i) => (
                    <div key={i} className="flex items-center justify-between text-[10px] px-2 py-1.5 bg-muted/50 rounded">
                      <span className={mcp.color}>{mcp.name}</span>
                      <Badge variant="outline" className="text-[8px]">{mcp.lang}</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-lg bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-950/30 dark:to-cyan-950/30 border-blue-200 dark:border-blue-800">
              <CardContent className="p-3">
                <h4 className="font-semibold text-xs mb-2 flex items-center gap-2">
                  <Cpu className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                  Kubernetes Cluster
                </h4>
                <div className="space-y-1 text-[10px]">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Platform</span>
                    <span className="text-blue-600 dark:text-blue-400 font-semibold">Kubernetes</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Ingress</span>
                    <span className="text-blue-600 dark:text-blue-400 font-semibold">Traefik</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Namespaces</span>
                    <span className="text-blue-600 dark:text-blue-400 font-semibold">5 active</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">TLS</span>
                    <span className="text-blue-600 dark:text-blue-400 font-semibold">cert-manager</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-lg bg-gradient-to-br from-primary/5 to-secondary/5">
              <CardContent className="p-3">
                <div className="grid grid-cols-2 gap-2 text-center">
                  <div>
                    <div className="text-2xl font-bold text-primary">24+</div>
                    <div className="text-[10px] text-muted-foreground">Pods Running</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-green-500">3</div>
                    <div className="text-[10px] text-muted-foreground">MCP Servers</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-lg">
              <CardContent className="p-3">
                <h4 className="font-semibold text-xs mb-2 flex items-center gap-2">
                  <Database className="h-4 w-4 text-purple-500" />
                  Data Stores
                </h4>
                <div className="flex flex-wrap gap-1">
                  {["PostgreSQL", "Redis", "Qdrant", "OpenSearch"].map((db, i) => (
                    <Badge key={i} variant="secondary" className="text-[9px]">{db}</Badge>
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
