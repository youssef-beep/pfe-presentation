"use client"
import SlideWrapper from "../../slide-wrapper"
import SlideHeader from "../../slide-header"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { motion, type Variants } from "framer-motion"
import { TrendingUp, Clock, AlertTriangle, Users, ArrowRight, CheckCircle2 } from "lucide-react"

const keyMetrics = [
  {
    label: "MTTR",
    fullName: "Mean Time to Recovery",
    before: "~30 min",
    after: "~30 sec",
    improvement: "93%",
    icon: Clock,
    color: "from-red-500 to-orange-500",
    bgColor: "bg-red-50 dark:bg-red-950/30",
  },
  {
    label: "Alert Volume",
    fullName: "Daily Alerts",
    before: "~1,000/day",
    after: "~300/day",
    improvement: "70%",
    icon: AlertTriangle,
    color: "from-orange-500 to-amber-500",
    bgColor: "bg-orange-50 dark:bg-orange-950/30",
  },
  {
    label: "Manual Work",
    fullName: "Human Intervention",
    before: "100%",
    after: "15%",
    improvement: "85%",
    icon: Users,
    color: "from-amber-500 to-yellow-500",
    bgColor: "bg-amber-50 dark:bg-amber-950/30",
  },
]

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2, delayChildren: 0.1 },
  },
}

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
}

export default function KpiImprovementsSlide() {
  return (
    <SlideWrapper>
      <div className="h-full min-h-0 flex flex-col">
        <SlideHeader
          badge="7 - Results"
          title="Evaluation Indicators"
          subtitle="Observed improvements in the validation scenario"
          className="mb-4 [&>*:first-child]:mb-2 [&>*:first-child]:px-4 [&>*:first-child]:py-1.5 [&>*:first-child]:text-lg [&>h1]:mb-2 [&>h1]:text-4xl md:[&>h1]:text-5xl lg:[&>h1]:text-5xl xl:[&>h1]:text-6xl [&>p]:text-lg [&>p]:leading-snug md:[&>p]:text-xl"
        />

        <motion.div
          className="flex-1 min-h-0 flex flex-col gap-4"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={itemVariants} className="flex items-center gap-3">
            <div className="rounded-xl bg-gradient-to-br from-green-500 to-emerald-500 p-3 shadow-lg">
              <TrendingUp className="h-8 w-8 text-white" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-green-600 dark:text-green-400">
                Key Performance Indicators
              </h3>
              <p className="text-lg text-muted-foreground">Scenario-based operational improvements</p>
            </div>
          </motion.div>

          <div className="flex-1 min-h-0 grid grid-cols-3 gap-4">
            {keyMetrics.map((metric, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ y: -6, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
                className="h-full"
              >
                <Card className={`h-full overflow-hidden border-0 shadow-xl ${metric.bgColor}`}>
                  <CardContent className="flex h-full flex-col p-5">
                    <div className="mb-4 flex items-center gap-3">
                      <div className={`rounded-xl bg-gradient-to-br ${metric.color} p-3 shadow-lg`}>
                        <metric.icon className="h-8 w-8 text-white" />
                      </div>
                      <div>
                        <h4 className="text-xl font-bold text-foreground">{metric.label}</h4>
                        <p className="text-base text-muted-foreground">{metric.fullName}</p>
                      </div>
                    </div>

                    <div className="flex flex-1 flex-col justify-center">
                      <div className="mb-3 flex items-center justify-between">
                        <span className="text-lg font-medium text-muted-foreground">Before</span>
                        <span className="text-2xl font-bold text-red-500 line-through decoration-2">
                          {metric.before}
                        </span>
                      </div>

                      <div className="my-2 flex justify-center">
                        <motion.div
                          animate={{ y: [0, 5, 0] }}
                          transition={{ duration: 1.5, repeat: Infinity }}
                        >
                          <ArrowRight className="h-8 w-8 rotate-90 text-green-500" />
                        </motion.div>
                      </div>

                      <div className="mt-3 flex items-center justify-between">
                        <span className="text-lg font-medium text-muted-foreground">After</span>
                        <span className="text-3xl font-bold text-green-600">{metric.after}</span>
                      </div>
                    </div>

                    <motion.div
                      className="mt-4 border-t border-green-200 pt-3 dark:border-green-800"
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: 0.5 + index * 0.1 }}
                    >
                      <div className="flex items-center justify-center gap-2">
                        <CheckCircle2 className="h-6 w-6 text-green-500" />
                        <Badge className="bg-green-500 px-4 py-2 text-xl font-bold text-white hover:bg-green-600">
                          {metric.improvement} Reduction
                        </Badge>
                      </div>
                    </motion.div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          <motion.div variants={itemVariants}>
            <Card className="border-2 border-green-200 bg-gradient-to-r from-green-50 to-emerald-50 shadow-xl dark:border-green-800 dark:from-green-950/30 dark:to-emerald-950/30">
              <CardContent className="p-4">
                <div className="flex flex-col items-center justify-center gap-3">
                  <p className="text-center text-sm text-muted-foreground">
                    Values correspond to the validation/demo scenario.
                  </p>
                  <div className="flex items-center justify-center gap-6">
                    <div className="flex items-center gap-3">
                      <CheckCircle2 className="h-6 w-6 text-green-500" />
                      <span className="text-lg font-semibold text-green-700 dark:text-green-400">
                        Faster Resolution
                      </span>
                    </div>
                    <div className="h-5 w-px bg-green-300 dark:bg-green-700" />
                    <div className="flex items-center gap-3">
                      <CheckCircle2 className="h-6 w-6 text-green-500" />
                      <span className="text-lg font-semibold text-green-700 dark:text-green-400">
                        Fewer Alerts
                      </span>
                    </div>
                    <div className="h-5 w-px bg-green-300 dark:bg-green-700" />
                    <div className="flex items-center gap-3">
                      <CheckCircle2 className="h-6 w-6 text-green-500" />
                      <span className="text-lg font-semibold text-green-700 dark:text-green-400">
                        Less Manual Work
                      </span>
                    </div>
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
