"use client"
import SlideWrapper from "../../slide-wrapper"
import SlideHeader from "../../slide-header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Brain, Eye, Folder, Terminal } from "lucide-react"

const developmentTools = [
  { name: "VS Code", description: "Main IDE for implementation and debugging" },
  { name: "Git + GitHub", description: "Version control and collaboration" },
  { name: "TypeScript", description: "Main development language for Remedion" },
  { name: "Pytest", description: "Automated validation for core components" },
]

const frameworks = [
  { name: "Mastra", description: "Workflow orchestration engine" },
  { name: "Mastra Agents", description: "Reasoner and reporter agent roles" },
  { name: "Node.js HTTP Server", description: "API endpoints and integration layer" },
  { name: "Zod", description: "Schema validation and typed models" },
]

const projectStructure = [
  { name: "healer/", description: "Core workflow and nodes" },
  { name: "config/", description: "YAML policies" },
  { name: "mcp-server/", description: "MCP connectors" },
  { name: "tests/", description: "Validation suite" },
]

const observabilityAndValidation = [
  { name: "Prometheus", description: "Metrics collection" },
  { name: "Grafana", description: "Dashboards and inspection" },
  { name: "Structured logs", description: "Traceable runtime events" },
  { name: "Unit, integration, and E2E tests", description: "Validation coverage" },
]

function SummaryCard({
  title,
  icon: Icon,
  items,
}: {
  title: string
  icon: typeof Terminal
  items: { name: string; description: string }[]
}) {
  return (
    <Card className="shadow-lg h-full">
      <CardHeader className="px-4 pt-4 pb-2">
        <CardTitle className="text-xl flex items-center">
          <Icon className="h-6 w-6 mr-2.5 text-primary" />
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="px-4 pb-4 space-y-2.5">
        {items.map((item) => (
          <div key={item.name} className="rounded-xl bg-muted/30 px-3 py-2.5">
            <span className="block font-bold text-sm md:text-base">{item.name}</span>
            <p className="text-sm text-muted-foreground leading-snug">{item.description}</p>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}

export default function EnvironmentToolsSlide() {
  return (
    <SlideWrapper>
      <div className="h-full min-h-0 flex flex-col">
        <SlideHeader
          badge="8 - Implementation"
          title="Development Environment"
          subtitle="Tools, frameworks, and project structure"
          className="mb-4 [&>*:first-child]:mb-2 [&>*:first-child]:px-4 [&>*:first-child]:py-1.5 [&>*:first-child]:text-lg [&>h1]:mb-2 [&>h1]:text-4xl md:[&>h1]:text-5xl lg:[&>h1]:text-5xl xl:[&>h1]:text-6xl [&>p]:text-lg [&>p]:leading-snug md:[&>p]:text-xl"
        />

        <div className="flex-1 min-h-0 grid grid-cols-2 gap-4" style={{ minHeight: 0 }}>
          <SummaryCard title="Development Tools" icon={Terminal} items={developmentTools} />
          <SummaryCard title="Core Frameworks" icon={Brain} items={frameworks} />
          <SummaryCard title="Project Structure" icon={Folder} items={projectStructure} />
          <SummaryCard title="Observability & Validation" icon={Eye} items={observabilityAndValidation} />
        </div>
      </div>
    </SlideWrapper>
  )
}
