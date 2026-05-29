"use client"
import SlideWrapper from "../../slide-wrapper"
import SlideHeader from "../../slide-header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, TestTube, Code, GitBranch, Layers, Activity } from "lucide-react"

const testCategories = [
  { category: "Unit Tests", count: 92, icon: Code, color: "blue" },
  { category: "Integration Tests", count: 18, icon: GitBranch, color: "purple" },
  { category: "End-to-End Tests", count: 15, icon: Layers, color: "green" },
]

const validationScenarios = [
  { scenario: "RabbitMQ Exporter Down", route: "Investigation", result: "MTTR: 45s" },
  { scenario: "Nova CPU High", route: "Investigation", result: "Detected FP" },
  { scenario: "Predictive Memory Alert", route: "Investigation", result: "15 min early" },
  { scenario: "Known Pattern Match", route: "Fast Path", result: "MTTR: 30s" },
]

export default function TestResultsSlide() {
  return (
    <SlideWrapper>
      <div className="h-full min-h-0 flex flex-col">
        <SlideHeader
          badge="8 - Implementation"
          title="Test Coverage & Validation"
          subtitle="125/125 tests passing | ~85% code coverage"
          className="mb-4 [&>*:first-child]:mb-2 [&>*:first-child]:px-4 [&>*:first-child]:py-1.5 [&>*:first-child]:text-lg [&>h1]:mb-2 [&>h1]:text-4xl md:[&>h1]:text-5xl lg:[&>h1]:text-5xl xl:[&>h1]:text-6xl [&>p]:text-lg [&>p]:leading-snug md:[&>p]:text-xl"
        />

        <div className="flex-1 min-h-0 grid grid-cols-1 gap-4 lg:grid-cols-12" style={{ minHeight: 0 }}>
          <div className="flex min-h-0 flex-col gap-4 lg:col-span-4">
            <Card className="shadow-lg bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20">
              <CardContent className="p-4 text-center">
                <TestTube className="mx-auto mb-3 h-12 w-12 text-green-500" />
                <div className="text-4xl font-bold text-green-600">125/125</div>
                <div className="mt-1 text-lg text-muted-foreground">Tests Passing</div>
                <Badge className="mt-3 bg-green-500 px-3.5 py-1.5 text-base text-white hover:bg-green-600">
                  ~85% Coverage
                </Badge>
              </CardContent>
            </Card>

            <Card className="shadow-lg flex-1">
              <CardHeader className="px-4 pt-4 pb-2">
                <CardTitle className="flex items-center text-lg">
                  <Code className="mr-2.5 h-5 w-5 text-primary" />
                  Test Categories
                </CardTitle>
              </CardHeader>
              <CardContent className="px-4 pb-4 space-y-2.5">
                {testCategories.map((cat) => (
                  <div
                    key={cat.category}
                    className={`flex items-center justify-between rounded-xl px-3 py-3 ${
                      cat.color === "blue"
                        ? "bg-blue-50 dark:bg-blue-900/20"
                        : cat.color === "purple"
                          ? "bg-purple-50 dark:bg-purple-900/20"
                          : "bg-green-50 dark:bg-green-900/20"
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <cat.icon
                        className={`h-5 w-5 ${
                          cat.color === "blue"
                            ? "text-blue-500"
                            : cat.color === "purple"
                              ? "text-purple-500"
                              : "text-green-500"
                        }`}
                      />
                      <span className="text-base font-semibold">{cat.category}</span>
                    </div>
                    <Badge variant="secondary" className="px-3 py-1 text-base">
                      {cat.count}
                    </Badge>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          <div className="flex min-h-0 flex-col gap-4 lg:col-span-8">
            <Card className="shadow-lg flex-1">
              <CardHeader className="px-4 pt-4 pb-2">
                <CardTitle className="flex items-center text-lg">
                  <Activity className="mr-2.5 h-5 w-5 text-primary" />
                  Validation Scenarios
                </CardTitle>
              </CardHeader>
              <CardContent className="px-4 pb-4">
                <table className="w-full table-fixed">
                  <thead>
                    <tr className="border-b">
                      <th className="w-[48%] py-2 pr-3 text-left text-sm font-bold">Scenario</th>
                      <th className="w-[24%] px-2 py-2 text-left text-sm font-bold">Route</th>
                      <th className="w-[20%] px-2 py-2 text-left text-sm font-bold">Result</th>
                      <th className="w-[8%] py-2 pl-2 text-center text-sm font-bold">OK</th>
                    </tr>
                  </thead>
                  <tbody>
                    {validationScenarios.map((scenario) => (
                      <tr key={scenario.scenario} className="border-b last:border-b-0">
                        <td className="py-3 pr-3 text-sm font-semibold leading-snug">{scenario.scenario}</td>
                        <td className="px-2 py-3">
                          <Badge
                            className={`px-2.5 py-1 text-sm ${
                              scenario.route === "Fast Path" ? "bg-green-500" : "bg-orange-500"
                            }`}
                          >
                            {scenario.route}
                          </Badge>
                        </td>
                        <td className="px-2 py-3 text-sm font-bold text-green-600">{scenario.result}</td>
                        <td className="py-3 pl-2 text-center">
                          <CheckCircle className="mx-auto h-5 w-5 text-green-500" />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </CardContent>
            </Card>

            <Card className="border-2 border-primary/20 shadow-md">
              <CardContent className="p-4">
                <p className="text-center text-sm leading-snug text-muted-foreground">
                  Validation focused on ingestion, deduplication, routing, investigation, policy decisions, MCP
                  integration, and rollback behavior.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </SlideWrapper>
  )
}
