"use client"
import SlideWrapper from "../../slide-wrapper"
import SlideHeader from "../../slide-header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, TrendingUp, Lightbulb, ArrowRight, Target, Brain, Rocket, Award } from "lucide-react"

const achievements = [
  { icon: TrendingUp, title: "93% MTTR Reduction", description: "From ~30 min to ~30 sec in the fast path" },
  { icon: Target, title: "70% Alert Reduction", description: "Deduplication and correlation reduce operational noise" },
  { icon: CheckCircle, title: "85% Less Manual Work", description: "Low-risk actions require far less SRE intervention" },
]

const futureWork = [
  { term: "Short-term", items: ["Multi-node remediation commands", "Command validation", "AWX auto-selection"] },
  { term: "Long-term", items: ["Multi-cloud support", "Advanced anomaly detection", "Self-improving prompts"] },
]

const keyLearnings = [
  "Mastra supports complex multi-agent orchestration",
  "Rule-based routing reduces unnecessary LLM calls",
  "YAML-driven policies improve governance and safety",
]

export default function ConclusionContentSlide() {
  return (
    <SlideWrapper>
      <div className="h-full min-h-0 flex flex-col">
        <SlideHeader
          badge="Conclusion"
          title="Summary & Perspectives"
          subtitle="Key achievements, learnings, and future roadmap"
          className="mb-4 [&>*:first-child]:mb-2 [&>*:first-child]:px-4 [&>*:first-child]:py-1.5 [&>*:first-child]:text-lg [&>h1]:mb-2 [&>h1]:text-4xl md:[&>h1]:text-5xl lg:[&>h1]:text-5xl xl:[&>h1]:text-6xl [&>p]:text-lg [&>p]:leading-snug md:[&>p]:text-xl"
        />
        <div className="flex-1 min-h-0 grid grid-cols-1 gap-4 lg:grid-cols-2" style={{ minHeight: 0 }}>
          {/* Left Column */}
          <div className="flex flex-col gap-4">
            <Card className="flex-1 shadow-lg bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20">
              <CardHeader className="px-4 pt-4 pb-2">
                <CardTitle className="flex items-center text-xl text-green-700 dark:text-green-400">
                  <Award className="mr-2.5 h-6 w-6" />
                  Key Achievements
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2.5 px-4 pb-4">
                {achievements.map((item, index) => (
                  <div key={index} className="flex items-center space-x-3 rounded-xl bg-background/50 p-3">
                    <item.icon className="h-7 w-7 flex-shrink-0 text-green-500" />
                    <div>
                      <span className="block text-lg font-bold">{item.title}</span>
                      <p className="text-sm leading-snug text-muted-foreground">{item.description}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="shadow-lg">
              <CardHeader className="px-4 pt-4 pb-2">
                <CardTitle className="flex items-center text-xl">
                  <Lightbulb className="mr-2.5 h-6 w-6 text-primary" />
                  Key Learnings
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2.5 px-4 pb-4">
                {keyLearnings.map((learning, index) => (
                  <div key={index} className="flex items-start space-x-2.5">
                    <CheckCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
                    <span className="text-base leading-snug">{learning}</span>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Right Column */}
          <div className="flex flex-col gap-4">
            <Card className="flex-1 shadow-lg">
              <CardHeader className="px-4 pt-4 pb-2">
                <CardTitle className="flex items-center text-xl">
                  <Rocket className="mr-2.5 h-6 w-6 text-primary" />
                  Future Work
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3.5 px-4 pb-4">
                {futureWork.map((period, index) => (
                  <div key={index}>
                    <Badge variant="secondary" className="mb-2 text-sm px-3 py-1">{period.term}</Badge>
                    <ul className="space-y-2">
                      {period.items.map((item, idx) => (
                        <li key={idx} className="flex items-center space-x-2.5 text-base">
                          <ArrowRight className="h-4 w-4 text-muted-foreground" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="shadow-lg border-2 border-primary/20 bg-gradient-to-r from-primary/5 to-secondary/5">
              <CardHeader className="px-4 pt-4 pb-2">
                <CardTitle className="flex items-center text-xl text-primary">
                  <Brain className="mr-2.5 h-6 w-6" />
                  Final Statement
                </CardTitle>
              </CardHeader>
              <CardContent className="px-4 pb-4 text-center">
                <h4 className="mb-3 text-2xl font-bold text-primary">Validated Prototype</h4>
                <div className="mb-3 flex justify-center space-x-3">
                  <Badge className="bg-green-500 px-3 py-1.5 text-base">125/125 Tests</Badge>
                  <Badge className="bg-blue-500 px-3 py-1.5 text-base">20+ Nodes</Badge>
                  <Badge className="bg-purple-500 px-3 py-1.5 text-base">3 MCP Servers</Badge>
                </div>
                <p className="text-base leading-snug text-muted-foreground">
                  Remedion demonstrates how Agentic AI can support safer and more structured SRE operations.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </SlideWrapper>
  )
}
