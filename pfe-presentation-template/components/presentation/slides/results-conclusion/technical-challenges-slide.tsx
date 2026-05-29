"use client"
import SlideWrapper from "../../slide-wrapper"
import SlideHeader from "../../slide-header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  AlertTriangle,
  CheckCircle,
  ArrowRight,
  Bug,
  Zap,
  Lightbulb,
  Code,
  Server,
} from "lucide-react"

const challenges = [
  {
    id: 1,
    problem: "Blocking I/O in Async Context",
    description: "LLM .invoke() blocked the event loop",
    solution: "asyncio.to_thread() wrapper for sync calls",
    codeBefore: "response = llm.invoke(prompt)",
    codeAfter: "response = await asyncio.to_thread(llm.invoke, prompt)",
    impact: "Non-blocking execution",
  },
  {
    id: 2,
    problem: "MCP Stdio Transport",
    description: "Grafana/Redmine MCP over stdio caused blocking reads",
    solution: "Thread-based execution with timeout handling",
    codeBefore: "result = mcp_client.call(tool)",
    codeAfter: "result = await run_in_thread(mcp_client.call, tool, timeout=30)",
    impact: "Reliable MCP communication",
  },
  {
    id: 3,
    problem: "Empty Metrics Investigation",
    description: "Prometheus queries returning [] with no explanation",
    solution: "Self-diagnosing metrics agent with diagnostic workflow",
    codeBefore: "metrics = query_prometheus(metric_name)",
    codeAfter: "metrics = query_with_diagnostics(metric_name)",
    impact: "Discovered disabled RabbitMQ plugin",
  },
  {
    id: 4,
    problem: "LLM Generating Placeholders",
    description: "LLM output contained <container>, <host> placeholders",
    solution: "Explicit prompt requirements + evidence grounding",
    codeBefore: "prompt = 'Generate command for {service}'",
    codeAfter: "prompt = 'Use ONLY values from evidence: {evidence}'",
    impact: "Concrete actionable outputs",
  },
]

const keyLearnings = [
  { icon: Lightbulb, text: "Mastra excels at complex multi-agent orchestration" },
  { icon: Zap, text: "Rule-based routing is faster than LLM classification" },
  { icon: Server, text: "Self-diagnosing agents are essential for production" },
  { icon: Code, text: "YAML-driven policies enable flexible governance" },
]

export default function TechnicalChallengesSlide() {
  return (
    <SlideWrapper>
      <div className="h-full flex flex-col">
        <SlideHeader
          badge="8 • Results"
          title="Technical Challenges Overcome"
          subtitle="Lessons learned during implementation"
        />

        <div className="flex-1 grid grid-cols-1 lg:grid-cols-3 gap-3">
          {/* Left: Challenges */}
          <div className="lg:col-span-2 space-y-2">
            {challenges.map((challenge) => (
              <Card key={challenge.id} className="shadow-md">
                <CardContent className="p-3">
                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-lg bg-orange-500/10">
                      <Bug className="h-4 w-4 text-orange-500" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <Badge variant="outline" className="text-xs font-mono">#{challenge.id}</Badge>
                        <span className="font-bold text-sm">{challenge.problem}</span>
                      </div>
                      <p className="text-xs text-muted-foreground mb-2">{challenge.description}</p>

                      <div className="grid grid-cols-2 gap-2 text-xs">
                        <div className="p-2 rounded bg-red-500/5 border border-red-500/20">
                          <div className="text-red-500 font-medium mb-1">Before</div>
                          <code className="text-xs bg-slate-800 text-red-400 px-1 rounded">{challenge.codeBefore}</code>
                        </div>
                        <div className="p-2 rounded bg-green-500/5 border border-green-500/20">
                          <div className="text-green-500 font-medium mb-1">After</div>
                          <code className="text-xs bg-slate-800 text-green-400 px-1 rounded">{challenge.codeAfter}</code>
                        </div>
                      </div>

                      <div className="flex items-center gap-1 mt-2">
                        <CheckCircle className="h-3 w-3 text-green-500" />
                        <span className="text-xs text-green-600">{challenge.impact}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Right: Key Learnings */}
          <div className="space-y-3">
            <Card className="shadow-lg bg-gradient-to-br from-primary/5 to-secondary/5">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center text-base">
                  <Lightbulb className="h-5 w-5 mr-2 text-primary" />
                  Key Learnings
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {keyLearnings.map((learning, index) => (
                  <div key={index} className="flex items-start gap-2 p-2 bg-background/50 rounded">
                    <learning.icon className="h-4 w-4 text-primary mt-0.5" />
                    <span className="text-xs">{learning.text}</span>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="shadow-md border-2 border-green-500/30 bg-green-500/5">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center text-sm text-green-600">
                  <Zap className="h-4 w-4 mr-2" />
                  Production Discovery
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-xs">
                  <p className="text-muted-foreground">
                    During debugging, our self-diagnosing agent discovered:
                  </p>
                  <div className="p-2 rounded bg-background/50 font-mono">
                    <div className="text-orange-500">RabbitMQ plugin disabled</div>
                    <div className="text-green-500 mt-1">→ Enabled rabbitmq_prometheus</div>
                  </div>
                  <div className="p-2 rounded bg-background/50">
                    <div className="text-sm font-bold text-primary">59,536 messages</div>
                    <div className="text-muted-foreground">backed up in cinder-scheduler_fanout</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-md">
              <CardContent className="p-3 text-center">
                <div className="text-3xl font-bold text-primary">125</div>
                <div className="text-xs text-muted-foreground">Tests passing</div>
                <div className="flex justify-center gap-2 mt-2">
                  <Badge variant="secondary" className="text-xs">Unit: 92</Badge>
                  <Badge variant="secondary" className="text-xs">Integration: 18</Badge>
                  <Badge variant="secondary" className="text-xs">E2E: 15</Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </SlideWrapper>
  )
}
