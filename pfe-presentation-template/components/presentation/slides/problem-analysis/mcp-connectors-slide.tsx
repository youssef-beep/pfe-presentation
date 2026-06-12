"use client"
import SlideWrapper from "../../slide-wrapper"
import SlideHeader from "../../slide-header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Network, ArrowRight, Brain, Activity, FileText, Wrench, CheckCircle, Zap } from "lucide-react"

const mcpServers = [
  {
    name: "Grafana MCP",
    icon: Activity,
    color: "orange",
    description: "Query metrics and dashboards for investigation and validation.",
    tools: ["list_metric_names", "query_prometheus", "get_dashboard"],
    useCases: ["Metrics investigation", "Post-action validation"],
  },
  {
    name: "AWX MCP",
    icon: Wrench,
    color: "red",
    description: "Execute and monitor remediation playbooks.",
    tools: ["list_job_templates", "launch_job", "get_job_status"],
    useCases: ["Service restart", "Config rollback"],
  },
  {
    name: "Redmine MCP",
    icon: FileText,
    color: "green",
    description: "Track escalated incidents and audit actions.",
    tools: ["create_issue", "update_issue", "search_issues"],
    useCases: ["Incident tracking", "Human escalation"],
  },
]

export default function McpConnectorsSlide() {
  return (
    <SlideWrapper>
      <div className="h-full min-h-0 flex flex-col">
        <SlideHeader
          badge="6 - Architecture"
          title="MCP Connectors"
          subtitle="Connecting Remedion to external operational tools"
          className="mb-4 [&>*:first-child]:mb-2 [&>*:first-child]:px-4 [&>*:first-child]:py-1.5 [&>*:first-child]:text-lg [&>h1]:mb-2 [&>h1]:text-4xl md:[&>h1]:text-5xl lg:[&>h1]:text-5xl xl:[&>h1]:text-6xl [&>p]:text-lg [&>p]:leading-snug md:[&>p]:text-xl"
        />

        <div className="flex-1 min-h-0 grid grid-cols-1 gap-3 lg:grid-cols-3" style={{ minHeight: 0 }}>
          {mcpServers.map((mcp, index) => (
            <Card
              key={index}
              className={`shadow-lg border-t-4 flex flex-col ${
                mcp.color === "orange"
                  ? "border-t-orange-500"
                  : mcp.color === "red"
                    ? "border-t-red-500"
                    : "border-t-green-500"
              }`}
            >
              <CardHeader className="px-4 pt-4 pb-2">
                <CardTitle className="flex items-center text-xl">
                  <mcp.icon
                    className={`h-6 w-6 mr-2.5 shrink-0 ${
                      mcp.color === "orange"
                        ? "text-orange-500"
                        : mcp.color === "red"
                          ? "text-red-500"
                          : "text-green-500"
                    }`}
                  />
                  {mcp.name}
                </CardTitle>
                <p className="mt-1.5 text-base leading-snug text-muted-foreground">{mcp.description}</p>
              </CardHeader>
              <CardContent className="px-4 pb-4 space-y-3">
                <div>
                  <h4 className="mb-2 flex items-center text-base font-semibold">
                    <Wrench className="mr-1.5 h-4 w-4" />
                    Tools
                  </h4>
                  <div className="space-y-1.5">
                    {mcp.tools.map((tool, idx) => (
                      <div key={idx} className="rounded-md bg-muted/30 px-2.5 py-1.5">
                        <code className="font-mono text-sm text-primary md:text-base">{tool}</code>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="mb-2 flex items-center text-base font-semibold">
                    <Zap className="mr-1.5 h-4 w-4" />
                    Use Cases
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {mcp.useCases.map((useCase, idx) => (
                      <Badge key={idx} variant="secondary" className="px-2.5 py-1 text-sm">
                        {useCase}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="mt-3 shadow-md bg-gradient-to-r from-primary/5 to-secondary/5">
          <CardContent className="p-3.5">
            <div className="flex flex-wrap items-center justify-center gap-2.5 space-x-3">
              <div className="flex items-center space-x-2">
                <Brain className="h-5 w-5 text-purple-500" />
                <span className="text-base font-medium">LLM Agent</span>
              </div>
              <ArrowRight className="h-4 w-4 text-muted-foreground" />
              <div className="flex items-center space-x-2">
                <Network className="h-5 w-5 text-blue-500" />
                <span className="text-base font-medium">MCP Protocol</span>
              </div>
              <ArrowRight className="h-4 w-4 text-muted-foreground" />
              <div className="flex items-center space-x-2">
                <Badge className="bg-orange-500 px-2.5 py-1 text-sm">Grafana</Badge>
                <Badge className="bg-red-500 px-2.5 py-1 text-sm">AWX</Badge>
                <Badge className="bg-green-500 px-2.5 py-1 text-sm">Redmine</Badge>
              </div>
              <ArrowRight className="h-4 w-4 text-muted-foreground" />
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-5 w-5 text-green-500" />
                <span className="text-base font-medium">Auto-Remediation</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </SlideWrapper>
  )
}
