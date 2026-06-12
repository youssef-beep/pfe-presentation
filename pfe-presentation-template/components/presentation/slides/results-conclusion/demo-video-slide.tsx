"use client"

import SlideWrapper from "../../slide-wrapper"
import SlideHeader from "../../slide-header"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { motion } from "framer-motion"
import { 
  AlertTriangle, 
  Search, 
  Brain, 
  CheckCircle, 
  Clock,
  ArrowRight
} from "lucide-react"

// UPDATE THIS with your actual YouTube video ID
// Example: If URL is https://www.youtube.com/watch?v=ABC123, use "ABC123"
const YOUTUBE_VIDEO_ID: string = "ftiXyHG9auE"

const demoSteps = [
  {
    icon: AlertTriangle,
    title: "Alert Triggered",
    description: "RabbitMQ queue backlog detected",
    color: "text-red-500",
    bgColor: "bg-red-100 dark:bg-red-900/30"
  },
  {
    icon: Search,
    title: "Agents Investigate",
    description: "Parallel analysis in progress",
    color: "text-purple-500",
    bgColor: "bg-purple-100 dark:bg-purple-900/30"
  },
  {
    icon: Brain,
    title: "LLM Reasoning",
    description: "Root cause identified",
    color: "text-blue-500",
    bgColor: "bg-blue-100 dark:bg-blue-900/30"
  },
  {
    icon: CheckCircle,
    title: "Auto-Resolved",
    description: "Remediation executed safely",
    color: "text-green-500",
    bgColor: "bg-green-100 dark:bg-green-900/30"
  }
]

export default function DemoVideoSlide() {
  return (
    <SlideWrapper>
      <div className="h-full flex flex-col">
        <SlideHeader
          badge="7 • Demonstration"
          title="Remedion in Action"
          subtitle="End-to-end incident resolution demonstration"
        />

        <div className="flex-1 flex flex-col gap-5">
          {/* Video Player */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex-1"
          >
            <Card className="h-full shadow-2xl border-2 border-primary/20 overflow-hidden">
              <CardContent className="p-0 h-full">
                {YOUTUBE_VIDEO_ID === "YOUR_VIDEO_ID_HERE" ? (
                  // Placeholder when no video ID is set
                  <div className="w-full h-full bg-gradient-to-br from-slate-900 to-slate-800 flex flex-col items-center justify-center text-white">
                    <div className="w-24 h-24 rounded-full bg-white/10 flex items-center justify-center mb-6">
                      <div className="w-0 h-0 border-l-[30px] border-l-white border-t-[18px] border-t-transparent border-b-[18px] border-b-transparent ml-2" />
                    </div>
                    <p className="text-2xl font-semibold mb-2">Demo Video</p>
                    <p className="text-lg text-white/60">Replace YOUTUBE_VIDEO_ID in code</p>
                  </div>
                ) : (
                  // YouTube Embed
                  <iframe
                    className="w-full h-full"
                    src={`https://www.youtube.com/embed/${YOUTUBE_VIDEO_ID}?rel=0&modestbranding=1`}
                    title="Remedion Demo"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                )}
              </CardContent>
            </Card>
          </motion.div>

          {/* Demo Steps */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card className="shadow-lg">
              <CardContent className="p-5">
                <div className="flex items-center justify-between">
                  {demoSteps.map((step, index) => (
                    <div key={index} className="flex items-center">
                      <div className="flex items-center gap-3">
                        <div className={`p-3 rounded-xl ${step.bgColor}`}>
                          <step.icon className={`h-7 w-7 ${step.color}`} />
                        </div>
                        <div>
                          <h4 className="font-bold text-base">{step.title}</h4>
                          <p className="text-sm text-muted-foreground">{step.description}</p>
                        </div>
                      </div>
                      {index < demoSteps.length - 1 && (
                        <ArrowRight className="h-6 w-6 text-muted-foreground mx-6" />
                      )}
                    </div>
                  ))}
                  
                  {/* Time Badge */}
                  <Badge className="bg-green-500 text-white px-4 py-2 text-base ml-6">
                    <Clock className="h-5 w-5 mr-2" />
                    &lt; 2 min
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </SlideWrapper>
  )
}
