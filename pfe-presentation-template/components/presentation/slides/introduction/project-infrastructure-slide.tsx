"use client"
import SlideWrapper from "../../slide-wrapper"
import SlideHeader from "../../slide-header"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { motion, type Variants } from "framer-motion"
import { 
  Brain, Zap, ArrowRight, Server, Activity, Database, 
  Network, BarChart3, Cpu, Layers
} from "lucide-react"

const monitoringTools = [
  { icon: Activity, name: "Prometheus", desc: "Metrics collection", color: "text-orange-600" },
  { icon: BarChart3, name: "Grafana", desc: "Visualization", color: "text-orange-500" },
  { icon: Database, name: "OpenSearch", desc: "Log analysis", color: "text-blue-600" },
  { icon: Cpu, name: "OpenStack", desc: "Cloud platform", color: "text-red-600" },
  { icon: Server, name: "AWX", desc: "Automation", color: "text-purple-600" },
  { icon: Network, name: "RabbitMQ", desc: "Messaging", color: "text-green-600" },
]

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1, 
    transition: { staggerChildren: 0.12, delayChildren: 0.2 } 
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

export default function ProjectInfrastructureSlide() {
  return (
    <SlideWrapper>
      <div className="h-full flex flex-col">
        <SlideHeader 
          badge="1 • Introduction" 
          title="Infrastructure & Vision" 
          subtitle="Current stack and future automation goals" 
        />
        
        <motion.div 
          className="flex-1 flex flex-col gap-6 py-4"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* TOP - Monitoring Stack */}
          <motion.div variants={itemVariants} className="flex-1 flex flex-col" style={{ minHeight: 0 }}>
            <Card className="shadow-md border-0 bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 flex-1 flex flex-col">
              <CardContent className="p-6 flex-1 flex flex-col">
                <div className="flex items-center gap-3 mb-4">
                  <Layers className="h-10 w-10 text-muted-foreground" />
                  <h4 className="text-2xl font-semibold text-muted-foreground uppercase tracking-wide">
                    Existing Monitoring & Automation Stack
                  </h4>
                </div>
                <div className="grid grid-cols-6 gap-5 flex-1 content-center">
                  {monitoringTools.map((tool, index) => (
                    <motion.div
                      key={index}
                      className="bg-white dark:bg-slate-900 rounded-lg p-5 shadow-sm text-center"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.6 + index * 0.05 }}
                      whileHover={{ y: -2, scale: 1.05 }}
                    >
                      <tool.icon className={`h-14 w-14 mx-auto mb-3 ${tool.color}`} />
                      <div className="text-xl font-semibold text-foreground">{tool.name}</div>
                      <div className="text-lg text-muted-foreground">{tool.desc}</div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* BOTTOM - Vision: SRE Co-Pilot (Full Width Banner) */}
          <motion.div 
            variants={itemVariants}
            className="flex-1 flex flex-col"
            style={{ minHeight: 0 }}
          >
            <Card className="shadow-2xl border-0 flex-1 overflow-hidden relative bg-gradient-to-br from-indigo-600 via-blue-700 to-cyan-600">
              {/* Animated Background */}
              <motion.div
                className="absolute inset-0 opacity-20"
                animate={{
                  background: [
                    'radial-gradient(circle at 20% 50%, rgba(255,255,255,0.3) 0%, transparent 50%)',
                    'radial-gradient(circle at 80% 50%, rgba(255,255,255,0.3) 0%, transparent 50%)',
                    'radial-gradient(circle at 20% 50%, rgba(255,255,255,0.3) 0%, transparent 50%)'
                  ]
                }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              />

              <CardContent className="p-6 relative z-10 h-full flex items-center">
                <div className="flex items-center justify-between w-full gap-10">
                  {/* Left - Vision Title & Description */}
                  <div className="flex-shrink-0">
                    <div className="flex items-center gap-4 mb-3">
                      <motion.div
                        animate={{ rotate: [0, 10, -10, 0] }}
                        transition={{ duration: 3, repeat: Infinity, repeatDelay: 2 }}
                      >
                        <Zap className="h-12 w-12 text-yellow-300" />
                      </motion.div>
                      <h3 className="text-4xl font-bold text-white">
                        Vision: SRE Co-Pilot
                      </h3>
                    </div>
                    <p className="text-2xl text-white/90 max-w-md leading-relaxed">
                      Transform IT operations from reactive and manual to{" "}
                      <span className="font-bold text-yellow-200">
                        proactive AI-driven automation
                      </span>
                      .
                    </p>
                  </div>

                  {/* Center - Workflow Visualization */}
                  <div className="flex-1 flex items-center justify-center">
                    <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20">
                      <div className="flex items-center gap-8">
                        <motion.div 
                          className="text-center"
                          whileHover={{ scale: 1.1 }}
                        >
                          <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 mb-2">
                            <Server className="h-12 w-12 mx-auto text-white" />
                          </div>
                          <span className="text-xl font-medium text-white">Alert</span>
                        </motion.div>
                        
                        <motion.div
                          animate={{ x: [0, 8, 0] }}
                          transition={{ duration: 1.5, repeat: Infinity }}
                        >
                          <ArrowRight className="h-8 w-8 text-yellow-300" />
                        </motion.div>
                        
                        <motion.div 
                          className="text-center"
                          whileHover={{ scale: 1.1 }}
                        >
                          <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 mb-2">
                            <Brain className="h-12 w-12 mx-auto text-cyan-300" />
                          </div>
                          <span className="text-xl font-medium text-white">AI Analysis</span>
                        </motion.div>
                        
                        <motion.div
                          animate={{ x: [0, 8, 0] }}
                          transition={{ duration: 1.5, repeat: Infinity, delay: 0.5 }}
                        >
                          <ArrowRight className="h-8 w-8 text-yellow-300" />
                        </motion.div>
                        
                        <motion.div 
                          className="text-center"
                          whileHover={{ scale: 1.1 }}
                        >
                          <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 mb-2">
                            <Zap className="h-12 w-12 mx-auto text-green-400" />
                          </div>
                          <span className="text-xl font-medium text-white">Auto-Fix</span>
                        </motion.div>
                      </div>
                    </div>
                  </div>

                  {/* Right - Badge */}
                  <div className="flex-shrink-0">
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 1, duration: 0.5 }}
                    >
                      <Badge 
                        variant="outline" 
                        className="text-xl px-5 py-2.5 bg-white/10 backdrop-blur-sm border-white/30 text-white"
                      >
                        <Brain className="h-6 w-6 mr-2" />
                        Multi-Agent LLM System
                      </Badge>
                    </motion.div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      </div>
    </SlideWrapper>
  )
}
