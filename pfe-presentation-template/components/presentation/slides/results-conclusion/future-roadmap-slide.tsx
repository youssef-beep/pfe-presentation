"use client"
import SlideWrapper from "../../slide-wrapper"
import SlideHeader from "../../slide-header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { 
  Rocket, Calendar, Cloud, Brain, Zap, Shield, 
  ArrowRight, CheckCircle, Server, Activity
} from "lucide-react"

const shortTermGoals = [
  { 
    title: "Multi-Node Command Generation", 
    desc: "Generate commands for distributed deployments",
    status: "planned"
  },
  { 
    title: "Command Validation", 
    desc: "Dry-run check before presenting to operator",
    status: "planned"
  },
  { 
    title: "AWX Template Auto-Selection", 
    desc: "Map diagnostic status → AWX job template",
    status: "in_progress"
  },
]

const longTermGoals = [
  { 
    title: "Multi-Cloud Support", 
    desc: "AWS, Azure, GCP integration",
    icon: Cloud,
    features: ["Cloud-agnostic patterns", "Provider adapters", "Unified alerting"]
  },
  { 
    title: "Advanced Anomaly Detection", 
    desc: "Enhanced ML models for prediction",
    icon: Brain,
    features: ["Prophet forecasting", "LSTM models", "Multi-variate correlation"]
  },
  { 
    title: "Self-Improving Prompts", 
    desc: "Continuous prompt optimization",
    icon: Zap,
    features: ["A/B test variants", "Track success rates", "Auto-refinement"]
  },
]

const productionReadiness = [
  { item: "125/125 Tests Passing", icon: CheckCircle },
  { item: "20+ Specialized Nodes", icon: Activity },
  { item: "3 MCP Servers", icon: Server },
  { item: "YAML Policy Engine", icon: Shield },
  { item: "Circuit Breaker Pattern", icon: Zap },
  { item: "Expanded Observability", icon: Brain },
]

export default function FutureRoadmapSlide() {
  return (
    <SlideWrapper>
      <div className="h-full flex flex-col">
        <SlideHeader 
          badge="Conclusion" 
          title="Future Roadmap" 
          subtitle="Short-term improvements and long-term vision" 
        />
        
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-3 gap-5" style={{ minHeight: 0 }}>
          {/* Short-term Goals */}
          <div className="space-y-5 flex flex-col">
            <Card className="shadow-lg flex-1">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg flex items-center">
                  <Calendar className="h-7 w-7 mr-3 text-blue-500" />
                  Short-term (3 months)
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {shortTermGoals.map((goal, index) => (
                  <div key={index} className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl border-l-4 border-blue-500">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-bold text-base">{goal.title}</span>
                      <Badge variant="outline" className={`text-sm ${
                        goal.status === 'in_progress' ? 'text-yellow-600 border-yellow-500' : 'text-blue-600'
                      }`}>
                        {goal.status === 'in_progress' ? 'In Progress' : 'Planned'}
                      </Badge>
                    </div>
                    <p className="text-base text-muted-foreground">{goal.desc}</p>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Production Readiness */}
            <Card className="shadow-lg bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg flex items-center text-green-700 dark:text-green-400">
                  <CheckCircle className="h-7 w-7 mr-3" />
                  Production Ready ✓
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {productionReadiness.map((item, index) => (
                  <div key={index} className="flex items-center gap-3 text-base">
                    <item.icon className="h-6 w-6 text-green-500" />
                    <span>{item.item}</span>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Long-term Goals */}
          <div className="lg:col-span-2 space-y-5 flex flex-col">
            <Card className="shadow-lg flex-1">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg flex items-center">
                  <Rocket className="h-7 w-7 mr-3 text-purple-500" />
                  Long-term Vision (6-12 months)
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 gap-5">
                  {longTermGoals.map((goal, index) => (
                    <Card key={index} className="shadow-md border-t-4 border-t-purple-500">
                      <CardContent className="p-5">
                        <div className="flex items-center gap-3 mb-4">
                          <goal.icon className="h-8 w-8 text-purple-500" />
                          <span className="font-bold text-base">{goal.title}</span>
                        </div>
                        <p className="text-base text-muted-foreground mb-4">{goal.desc}</p>
                        <div className="space-y-2.5">
                          {goal.features.map((feature, i) => (
                            <div key={i} className="flex items-center gap-2 text-base">
                              <ArrowRight className="h-5 w-5 text-purple-400" />
                              <span>{feature}</span>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Impact Summary */}
            <Card className="shadow-lg border-2 border-primary/20">
              <CardContent className="p-6">
                <h4 className="font-bold text-center text-2xl text-primary mb-6">
                  Remedion: Transforming SRE Operations
                </h4>
                <div className="grid grid-cols-4 gap-6 text-center">
                  <div>
                    <div className="text-4xl font-bold text-green-600">93%</div>
                    <div className="text-base text-muted-foreground">MTTR Reduction</div>
                  </div>
                  <div>
                    <div className="text-4xl font-bold text-green-600">85%</div>
                    <div className="text-base text-muted-foreground">Automation Rate</div>
                  </div>
                  <div>
                    <div className="text-4xl font-bold text-green-600">70%</div>
                    <div className="text-base text-muted-foreground">Alert Reduction</div>
                  </div>
                  <div>
                    <div className="text-4xl font-bold text-blue-600">20min</div>
                    <div className="text-base text-muted-foreground">Earlier Detection</div>
                  </div>
                </div>
                <p className="text-center text-lg text-muted-foreground mt-6">
                  <span className="font-semibold text-primary">Agentic AI</span> enables autonomous, 
                  intelligent infrastructure operations
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </SlideWrapper>
  )
}
