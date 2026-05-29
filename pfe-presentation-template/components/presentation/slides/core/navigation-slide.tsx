"use client"
import SlideWrapper from "../../slide-wrapper"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { BookOpen, Building, Lightbulb, ClipboardList, Calendar, Network, Code, Brain } from "lucide-react"

interface NavigationSlideProps {
  onNavigate: (slideIndex: number) => void
}

const sections = [
  { title: "Introduction", icon: BookOpen, targetSlide: 2, description: "Context & project overview", slides: "2-4" },
  { title: "General Context", icon: Building, targetSlide: 5, description: "Host organization & problem statement", slides: "5-6" },
  { title: "Proposed Solution", icon: Lightbulb, targetSlide: 7, description: "REMEdion overview & value proposition", slides: "7" },
  { title: "Objectives & Scope", icon: ClipboardList, targetSlide: 8, description: "Requirements and system scope", slides: "8-9" },
  { title: "Project Planning", icon: Calendar, targetSlide: 10, description: "Kanban & milestones", slides: "10-11" },
  { title: "Architecture", icon: Network, targetSlide: 12, description: "Mastra workflow, agents, policy, MCP", slides: "12-21" },
  { title: "Implementation", icon: Code, targetSlide: 24, description: "Demo, results & validation", slides: "24-29" },
]

export default function NavigationSlide({ onNavigate }: NavigationSlideProps) {
  return (
    <SlideWrapper className="bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-blue-900/20">
      <div className="h-full flex flex-col justify-between py-4 px-4">
        <div className="text-center space-y-2">
          <Brain className="h-16 w-16 text-primary mx-auto" />
          <h1 className="text-4xl md:text-5xl font-bold text-primary">Presentation Outline</h1>
          <p className="text-xl text-muted-foreground">REMEdion: AI-Driven Self-Healing Infrastructure</p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 w-full flex-1 content-center">
          {sections.map((section, index) => (
            <Card
              key={index}
              className="shadow-lg hover:shadow-xl transition-all cursor-pointer group hover:scale-[1.02] flex flex-col"
              onClick={() => onNavigate(section.targetSlide)}
            >
              <CardHeader className="flex flex-col items-center text-center pb-2 space-y-2 flex-1 justify-center px-4 pt-4">
                <div className="flex items-center justify-start w-full">
                  <Badge variant="secondary" className="text-2xl px-4 py-2 font-bold">{index + 1}</Badge>
                </div>
                <div className="p-5 rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors">
                  <section.icon className="h-12 w-12 text-primary group-hover:text-secondary transition-colors" />
                </div>
                <CardTitle className="text-2xl font-bold text-primary">{section.title}</CardTitle>
              </CardHeader>
              <CardContent className="pt-0 pb-4 text-center">
                <p className="text-2xl text-muted-foreground font-medium">{section.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center text-lg text-muted-foreground">
          Click any section to navigate • Use ← → arrows to move between slides
        </div>
      </div>
    </SlideWrapper>
  )
}

NavigationSlide.defaultProps = {
  onNavigate: (slideIndex: number) => console.log(`Navigate to slide ${slideIndex}`),
}
