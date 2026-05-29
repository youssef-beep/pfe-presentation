"use client"
import SlideWrapper from "../../slide-wrapper"
import SlideHeader from "../../slide-header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Zap,
  Brain,
  ArrowRight,
  Clock,
  Activity,
  Database,
  BookOpen,
} from "lucide-react"

const agents = [
  {
    name: "Metrics Agent",
    icon: Activity,
    color: "bg-blue-500",
    source: "Grafana MCP",
    capabilities: ["Query Prometheus patterns", "Auto-diagnose empty results", "Compare vs thresholds"]
  },
  {
    name: "Incident Agent",
    icon: Database,
    color: "bg-purple-500",
    source: "Qdrant RAG",
    capabilities: ["Semantic similarity search", "Extract past resolutions", "Calculate confidence"]
  },
  {
    name: "Runbook Agent",
    icon: BookOpen,
    color: "bg-orange-500",
    source: "Catalog + AWX",
    capabilities: ["Match alert patterns", "Retrieve job templates", "Extract parameters"]
  },
]

export default function ParallelAgentsSlide() {
  return (
    <SlideWrapper>
      <div className="h-full flex flex-col">
        <SlideHeader
          badge="7 • Implementation"
          title="Parallel Agent Execution"
          subtitle="Send API for 3x performance improvement"
        />

        <div className="flex-1 space-y-4">
          {/* Performance Comparison */}
          <div className="flex justify-center items-center space-x-8">
            <Card className="shadow-md bg-red-500/10 border-red-500/30">
              <CardContent className="p-5 text-center">
                <Clock className="h-10 w-10 text-red-500 mx-auto mb-2" />
                <div className="text-4xl font-bold text-red-500">~6s</div>
                <div className="text-xl text-muted-foreground">Sequential</div>
              </CardContent>
            </Card>
            <ArrowRight className="h-10 w-10 text-muted-foreground" />
            <Card className="shadow-md bg-green-500/10 border-green-500/30">
              <CardContent className="p-5 text-center">
                <Zap className="h-10 w-10 text-green-500 mx-auto mb-2" />
                <div className="text-4xl font-bold text-green-500">~2s</div>
                <div className="text-xl text-muted-foreground">Parallel (Send API)</div>
              </CardContent>
            </Card>
          </div>

          {/* Code Example */}
          <Card className="shadow-lg">
            <CardHeader className="pb-2">
              <CardTitle className="text-xl">Mastra Send() API Usage</CardTitle>
            </CardHeader>
            <CardContent>
              <pre className="text-sm bg-slate-900 text-green-400 p-4 rounded-lg overflow-x-auto">
{`def route_to_investigation(state: AgentState) -> list[Send] | str:
    """Send API for parallel agent spawning"""
    agents_to_spawn = state.get("agents_to_spawn", [])
    
    if not agents_to_spawn:
        return "retriever"  # Skip directly
    
    # Create Send() for each agent - PARALLEL EXECUTION
    return [Send(agent_name, state) for agent_name in agents_to_spawn]

# Mastra handles parallel execution automatically
workflow.add_conditional_edges(
    "smart_router",
    route_to_investigation,
    ["metrics_agent", "incident_agent", "runbook_agent", "retriever"]
)`}
              </pre>
            </CardContent>
          </Card>

          {/* Agent Cards */}
          <div className="grid grid-cols-3 gap-4">
            {agents.map((agent, index) => (
              <Card key={index} className="shadow-md">
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center text-lg">
                    <div className={`p-3 rounded ${agent.color} text-white mr-3`}>
                      <agent.icon className="h-6 w-6" />
                    </div>
                    {agent.name}
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <Badge variant="outline" className="text-base mb-3">{agent.source}</Badge>
                  <ul className="space-y-2">
                    {agent.capabilities.map((cap, i) => (
                      <li key={i} className="text-lg text-muted-foreground flex items-center">
                        <span className="w-2 h-2 rounded-full bg-primary mr-3" />
                        {cap}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </SlideWrapper>
  )
}
