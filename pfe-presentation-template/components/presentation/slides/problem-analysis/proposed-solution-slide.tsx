"use client"
import SlideWrapper from "../../slide-wrapper"
import SlideHeader from "../../slide-header"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Brain, ArrowRight, Workflow, Search, Bot, Cog, Lightbulb } from "lucide-react"

const solutionPillars = [
  { icon: Search, title: "Smart Detection", description: "Reactive and predictive alerting with smart deduplication", features: ["Redis Dedup", "ML Prediction", "Cross-correlation"], color: "blue" },
  { icon: Bot, title: "Multi-Agent Investigation", description: "Parallel agents for fast, comprehensive analysis", features: ["Metrics Agent", "Incident Agent", "Runbook Agent"], color: "purple" },
  { icon: Brain, title: "LLM Reasoning", description: "Context-aware analysis and action planning", features: ["Evidence Synthesis", "Action Plan", "Validation"], color: "green" },
  { icon: Cog, title: "Safe Execution", description: "Controlled remediation with policy enforcement and rollback", features: ["Policy Engine", "Circuit Breaker", "Post-validation"], color: "orange" },
]

export default function ProposedSolutionSlide() {
  return (
    <SlideWrapper>
      <div className="h-full min-h-0 flex flex-col">
        {/* Header with Remedion Logo */}
        <div className="mb-3">
          <div>
            <SlideHeader
              badge="3 - Proposed Solution"
              title="Remedion"
              subtitle="Intelligent Self-Healing System powered by Agentic AI"
              className="mb-0 text-left [&>*:first-child]:mb-2 [&>*:first-child]:px-4 [&>*:first-child]:py-1.5 [&>*:first-child]:text-lg [&>h1]:mb-2 [&>h1]:text-5xl md:[&>h1]:text-6xl lg:[&>h1]:text-7xl [&>p]:mx-0 [&>p]:max-w-none [&>p]:text-lg [&>p]:leading-snug md:[&>p]:text-xl"
            />
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 min-h-0 flex flex-col gap-3">
          {/* Solution Pillars Section */}
          <div className="flex-1 flex flex-col min-h-0">
            <div className="flex items-center space-x-3 mb-3">
              <Workflow className="h-8 w-8 text-primary" />
              <h3 className="text-2xl font-bold">Solution Pillars</h3>
            </div>
            <div className="grid grid-cols-2 gap-3.5 flex-1">
              {solutionPillars.map((pillar, index) => (
                <Card
                  key={index}
                  className={`shadow-lg hover:shadow-xl transition-shadow border-t-4 h-full ${
                    pillar.color === "blue"
                      ? "border-t-blue-500"
                      : pillar.color === "purple"
                        ? "border-t-purple-500"
                        : pillar.color === "green"
                          ? "border-t-green-500"
                          : "border-t-orange-500"
                  }`}
                >
                  <CardContent className="p-4 h-full flex items-center">
                    <div className="flex items-center space-x-3.5 w-full">
                      <div
                        className={`p-3.5 rounded-xl flex-shrink-0 ${
                          pillar.color === "blue"
                            ? "bg-blue-100 dark:bg-blue-900/30"
                            : pillar.color === "purple"
                              ? "bg-purple-100 dark:bg-purple-900/30"
                              : pillar.color === "green"
                                ? "bg-green-100 dark:bg-green-900/30"
                                : "bg-orange-100 dark:bg-orange-900/30"
                        }`}
                      >
                        <pillar.icon
                          className={`h-9 w-9 ${
                            pillar.color === "blue"
                              ? "text-blue-600"
                              : pillar.color === "purple"
                                ? "text-purple-600"
                                : pillar.color === "green"
                                  ? "text-green-600"
                                  : "text-orange-600"
                          }`}
                        />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-bold text-xl mb-1.5">{pillar.title}</h4>
                        <p className="text-base text-muted-foreground mb-2.5 leading-snug">{pillar.description}</p>
                        <div className="flex flex-wrap gap-2">
                          {pillar.features.map((feature, idx) => (
                            <Badge key={idx} variant="outline" className="text-sm px-2.5 py-0.5">
                              {feature}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Bottom Section - Workflow and Innovation */}
          <div className="grid grid-cols-3 gap-3.5">
            {/* Workflow */}
            <div className="col-span-2">
              <Card className="shadow-lg bg-muted/30 h-full">
                <CardContent className="p-4 flex items-center justify-center h-full">
                  <div className="flex items-center justify-center space-x-3">
                    <Badge className="bg-blue-500 px-4 py-1.5 text-base font-medium">Alert</Badge>
                    <ArrowRight className="h-5 w-5 text-muted-foreground" />
                    <Badge className="bg-purple-500 px-4 py-1.5 text-base font-medium">Investigation</Badge>
                    <ArrowRight className="h-5 w-5 text-muted-foreground" />
                    <Badge className="bg-green-500 px-4 py-1.5 text-base font-medium">Reasoning</Badge>
                    <ArrowRight className="h-5 w-5 text-muted-foreground" />
                    <Badge className="bg-orange-500 px-4 py-1.5 text-base font-medium">Action</Badge>
                    <ArrowRight className="h-5 w-5 text-muted-foreground" />
                    <Badge className="bg-emerald-500 px-4 py-1.5 text-base font-medium">Validation</Badge>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Key Innovation */}
            <Card className="shadow-lg border-2 border-primary/20">
              <CardContent className="p-4 flex flex-col justify-center h-full">
                <h4 className="font-bold text-primary mb-2 flex items-center text-lg">
                  <Lightbulb className="h-6 w-6 mr-2" />
                  Key Innovation
                </h4>
                <p className="text-base text-muted-foreground leading-snug">
                  <span className="font-semibold text-primary">MASTRA</span> orchestrates specialized AI agents using a dynamic{" "}
                  <span className="font-semibold">Orchestrator-Worker</span> pattern.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </SlideWrapper>
  )
}
