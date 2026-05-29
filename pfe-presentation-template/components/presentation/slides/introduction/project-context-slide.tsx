"use client"
import SlideWrapper from "../../slide-wrapper"
import SlideHeader from "../../slide-header"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { motion, type Variants } from "framer-motion"
import { 
  Cloud, Brain, Layers, ArrowRight, Sparkles
} from "lucide-react"

const contextPoints = [
  { 
    icon: Cloud, 
    title: "Cloud Computing Complexity", 
    description: "Modern infrastructures have thousands of interconnected services across OpenStack, Kubernetes, and hybrid environments — creating unprecedented operational complexity", 
    color: "from-blue-500 to-cyan-500",
    bgColor: "bg-blue-50 dark:bg-blue-950/30"
  },
  { 
    icon: Brain, 
    title: "Agentic AI Emergence", 
    description: "Large Language Models and multi-agent systems now enable intelligent automation that can reason, investigate, and act — transforming what's possible in IT operations", 
    color: "from-emerald-500 to-teal-500",
    bgColor: "bg-emerald-50 dark:bg-emerald-950/30"
  },
]

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1, 
    transition: { staggerChildren: 0.15, delayChildren: 0.2 } 
  }
}

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } 
  }
}

export default function ProjectContextSlide() {
  return (
    <SlideWrapper>
      <div className="h-full min-h-0 flex flex-col">
        <SlideHeader 
          badge="1 • Introduction" 
          title="Context and Importance" 
          subtitle="The convergence of cloud complexity and AI capability" 
          className="mb-5 [&>*:first-child]:mb-3 [&>*:first-child]:px-5 [&>*:first-child]:py-2 [&>*:first-child]:text-xl [&>h1]:mb-3 [&>h1]:text-5xl md:[&>h1]:text-6xl lg:[&>h1]:text-7xl [&>p]:max-w-3xl [&>p]:text-xl [&>p]:leading-snug md:[&>p]:text-2xl"
        />
        
        <motion.div 
          className="flex-1 min-h-0 flex flex-col gap-4"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Context Cards - Two Main Points */}
          <div className="grid flex-1 grid-cols-2 gap-4">
            {contextPoints.map((point, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ y: -4, scale: 1.01 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="h-full"
              >
                <Card className={`shadow-xl border-0 overflow-hidden ${point.bgColor} h-full`}>
                  <CardContent className="p-6 h-full flex flex-col justify-center">
                    <div className="flex flex-col items-center text-center gap-4">
                      {/* Icon */}
                      <motion.div
                        className={`p-4 rounded-xl bg-gradient-to-br ${point.color} shadow-lg`}
                        whileHover={{ rotate: [0, -5, 5, 0], scale: 1.1 }}
                        transition={{ duration: 0.4 }}
                      >
                        <point.icon className="h-10 w-10 text-white" />
                      </motion.div>

                      {/* Content */}
                      <div className="space-y-2.5">
                        <h4 className="font-bold text-2xl xl:text-3xl text-foreground leading-tight">
                          {point.title}
                        </h4>
                        <p className="max-w-sm text-xl text-muted-foreground leading-snug">
                          {point.description}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Opportunity Statement */}
          <motion.div variants={itemVariants}>
            <Card className="shadow-xl border-2 border-primary/20 bg-gradient-to-r from-blue-50 via-white to-emerald-50 dark:from-blue-950/30 dark:via-slate-900 dark:to-emerald-950/30">
              <CardContent className="p-4">
                <div className="flex items-center justify-center gap-4">
                  <div className="flex items-center gap-2.5">
                    <Layers className="h-7 w-7 text-blue-600" />
                    <span className="text-xl font-semibold text-blue-700 dark:text-blue-400">
                      Growing Complexity
                    </span>
                  </div>
                  
                  <ArrowRight className="h-5 w-5 text-muted-foreground" />
                  
                  <div className="flex items-center gap-2.5">
                    <Sparkles className="h-7 w-7 text-emerald-600" />
                    <span className="text-xl font-semibold text-emerald-700 dark:text-emerald-400">
                      AI-Powered Solution
                    </span>
                  </div>
                  
                  <ArrowRight className="h-5 w-5 text-muted-foreground" />
                  
                  <Badge className="bg-gradient-to-r from-blue-600 to-emerald-600 text-white px-3.5 py-1.5 text-lg font-bold">
                    REMEdion
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      </div>
    </SlideWrapper>
  )
}
