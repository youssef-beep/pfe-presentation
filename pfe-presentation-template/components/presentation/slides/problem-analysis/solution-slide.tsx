"use client"
import SlideWrapper from "../../slide-wrapper"
import SlideHeader from "../../slide-header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Brain, Zap, CheckCircle, ArrowRight, TrendingUp, Workflow, Search, Bot, Cog, Lightbulb } from "lucide-react"

const solutionPillars = [
  { icon: Search, title: "Smart Detection", description: "Reactive + predictive alerts with deduplication", features: ["Redis Dedup", "ML Prediction", "Cross-correlation"], color: "blue" },
  { icon: Bot, title: "Multi-Agent Investigation", description: "Specialized parallel agents for deep analysis", features: ["Metrics Agent", "Incident Agent", "Runbook Agent"], color: "purple" },
  { icon: Brain, title: "LLM Reasoning", description: "Contextual analysis and action plan generation", features: ["Evidence Synthesis", "Action Plan", "Validation"], color: "green" },
  { icon: Cog, title: "Safe Execution", description: "Automatic remediation with policies and rollback", features: ["Policy Engine", "Circuit Breaker", "Post-validation"], color: "orange" },
]

const kpiImprovements = [
  { metric: "MTTD", before: "~5 min", after: "-15 min", improvement: "↓ 20 min" },
  { metric: "MTTR", before: "~30 min", after: "~30 sec", improvement: "↓ 93%" },
  { metric: "Volume", before: "1000/day", after: "300/day", improvement: "↓ 70%" },
  { metric: "Manual", before: "100%", after: "15%", improvement: "↓ 85%" },
]

export default function SolutionSlide() {
  return (
    <SlideWrapper>
      <div className="h-full flex flex-col">
        <SlideHeader badge="3 • Proposed Solution" title="Remedion" subtitle="Intelligent Self-Healing System based on Agentic AI" />
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="lg:col-span-2 space-y-3">
            <div className="flex items-center space-x-2 mb-2">
              <Workflow className="h-5 w-5 text-primary" />
              <h3 className="text-base font-semibold">Solution Pillars</h3>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {solutionPillars.map((pillar, index) => (
                <Card key={index} className={`shadow-md hover:shadow-lg transition-shadow border-t-4 ${pillar.color === 'blue' ? 'border-t-blue-500' : pillar.color === 'purple' ? 'border-t-purple-500' : pillar.color === 'green' ? 'border-t-green-500' : 'border-t-orange-500'}`}>
                  <CardContent className="p-3">
                    <div className="flex items-start space-x-2">
                      <div className={`p-2 rounded-lg ${pillar.color === 'blue' ? 'bg-blue-100 dark:bg-blue-900/30' : pillar.color === 'purple' ? 'bg-purple-100 dark:bg-purple-900/30' : pillar.color === 'green' ? 'bg-green-100 dark:bg-green-900/30' : 'bg-orange-100 dark:bg-orange-900/30'}`}>
                        <pillar.icon className={`h-5 w-5 ${pillar.color === 'blue' ? 'text-blue-600' : pillar.color === 'purple' ? 'text-purple-600' : pillar.color === 'green' ? 'text-green-600' : 'text-orange-600'}`} />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-sm">{pillar.title}</h4>
                        <p className="text-xs text-muted-foreground">{pillar.description}</p>
                        <div className="flex flex-wrap gap-1 mt-2">
                          {pillar.features.map((feature, idx) => (<Badge key={idx} variant="outline" className="text-xs py-0">{feature}</Badge>))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            <Card className="shadow-md bg-muted/30">
              <CardContent className="p-3">
                <div className="flex items-center justify-center space-x-2 text-sm">
                  <Badge className="bg-blue-500">Alert</Badge>
                  <ArrowRight className="h-4 w-4 text-muted-foreground" />
                  <Badge className="bg-purple-500">Investigation</Badge>
                  <ArrowRight className="h-4 w-4 text-muted-foreground" />
                  <Badge className="bg-green-500">Reasoning</Badge>
                  <ArrowRight className="h-4 w-4 text-muted-foreground" />
                  <Badge className="bg-orange-500">Action</Badge>
                  <ArrowRight className="h-4 w-4 text-muted-foreground" />
                  <Badge className="bg-emerald-500">Validation</Badge>
                </div>
              </CardContent>
            </Card>
          </div>
          <div className="space-y-3">
            <Card className="shadow-lg bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20">
              <CardHeader className="pb-2"><CardTitle className="text-base flex items-center text-green-700 dark:text-green-400"><TrendingUp className="h-4 w-4 mr-2" />KPI Improvements</CardTitle></CardHeader>
              <CardContent className="space-y-2">
                {kpiImprovements.map((kpi, index) => (
                  <div key={index} className="p-2 bg-background/50 rounded-lg">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-semibold text-sm">{kpi.metric}</span>
                      <Badge className="bg-green-500 text-white text-xs">{kpi.improvement}</Badge>
                    </div>
                    <div className="flex items-center text-xs text-muted-foreground">
                      <span className="text-red-500">{kpi.before}</span>
                      <ArrowRight className="h-3 w-3 mx-2" />
                      <span className="text-green-600 font-medium">{kpi.after}</span>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
            <Card className="shadow-lg border-2 border-primary/20">
              <CardContent className="p-3">
                <h4 className="font-semibold text-primary mb-2 flex items-center text-sm"><Lightbulb className="h-4 w-4 mr-2" />Key Innovation</h4>
                <p className="text-xs text-muted-foreground">Using <span className="font-semibold text-primary">Mastra</span> to orchestrate specialized AI agents with a dynamic <span className="font-semibold">Orchestrator-Worker</span> pattern.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </SlideWrapper>
  )
}
