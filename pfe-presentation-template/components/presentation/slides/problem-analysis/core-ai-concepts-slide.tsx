"use client"
import SlideWrapper from "../../slide-wrapper"
import SlideHeader from "../../slide-header"
import { Card, CardContent } from "@/components/ui/card"
import { Workflow, Brain, Plug, Database, ShieldCheck } from "lucide-react"

const concepts = [
  {
    icon: Workflow,
    title: "Mastra",
    text: "Workflow orchestration for multi-step incident handling.",
    tone: "from-blue-500 to-cyan-500",
  },
  {
    icon: Brain,
    title: "LLM",
    text: "Synthesizes evidence and proposes remediation actions.",
    tone: "from-purple-500 to-fuchsia-500",
  },
  {
    icon: Plug,
    title: "MCP",
    text: "Bridge to Grafana, AWX, and Redmine operational tools.",
    tone: "from-emerald-500 to-teal-500",
  },
  {
    icon: Database,
    title: "RAG / Qdrant",
    text: "Retrieves similar incidents and historical context.",
    tone: "from-amber-500 to-orange-500",
  },
  {
    icon: ShieldCheck,
    title: "Policy Engine",
    text: "Controls safe decisions before execution.",
    tone: "from-red-500 to-rose-500",
  },
]

export default function CoreAiConceptsSlide() {
  return (
    <SlideWrapper>
      <div className="h-full min-h-0 flex flex-col">
        <SlideHeader
          badge="6 - Architecture"
          title="Core AI Concepts Behind Remedion"
          subtitle="The building blocks used by the workflow before any action is executed"
          className="mb-4 [&>*:first-child]:mb-2 [&>*:first-child]:px-4 [&>*:first-child]:py-1.5 [&>*:first-child]:text-lg [&>h1]:mb-2 [&>h1]:text-4xl md:[&>h1]:text-5xl lg:[&>h1]:text-5xl xl:[&>h1]:text-6xl [&>p]:text-lg [&>p]:leading-snug md:[&>p]:text-xl"
        />

        <div className="flex-1 min-h-0 grid grid-cols-5 gap-3 content-center">
          {concepts.map((concept) => (
            <Card key={concept.title} className="shadow-lg h-full">
              <CardContent className="p-4 text-center">
                <div className={`mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${concept.tone} shadow-md`}>
                  <concept.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="mb-2 text-xl font-bold text-primary">{concept.title}</h3>
                <p className="text-sm leading-snug text-muted-foreground">{concept.text}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="mt-4 shadow-md border-primary/20 bg-primary/5">
          <CardContent className="p-4 text-center">
            <p className="text-lg font-semibold text-primary">
              Remedion combines orchestration, reasoning, memory, tool access, and policy control in one incident workflow.
            </p>
          </CardContent>
        </Card>
      </div>
    </SlideWrapper>
  )
}
