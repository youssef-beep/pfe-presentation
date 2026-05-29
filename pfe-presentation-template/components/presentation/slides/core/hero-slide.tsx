"use client"
import SlideWrapper from "../../slide-wrapper"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { UserCircle, Briefcase, CalendarDays, PlayCircle } from "lucide-react"
import Image from "next/image"
import { motion } from "framer-motion"

interface HeroSlideProps {
  onStartPresentation: () => void
}

export default function HeroSlide({ onStartPresentation }: HeroSlideProps) {
  return (
    <SlideWrapper
      showLogos
      className="bg-gradient-to-br from-primary/10 via-background to-secondary/10 dark:from-primary/20 dark:via-slate-900 dark:to-secondary/20"
    >
      <div className="h-full flex flex-col justify-center items-center text-center space-y-6">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Badge variant="secondary" className="px-4 py-1.5 text-sm">
            <CalendarDays className="mr-2 h-4 w-4" />
            Academic Year: 2025/2026
          </Badge>
        </motion.div>

        {/* REMEdion Logo */}
        <motion.div
          className="relative w-32 h-32 mb-2"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Image
            src="/Logo-autoshpere.png"
            alt="REMEdion Logo"
            fill
            className="object-contain"
          />
        </motion.div>

        <div className="space-y-3">
          <motion.h1
            className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight bg-gradient-to-r from-primary via-purple-500 to-secondary bg-clip-text text-transparent"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            REMEdion
          </motion.h1>
          <motion.p
            className="text-xl md:text-2xl lg:text-3xl font-bold text-foreground/90"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            AI-Driven Self-Healing Infrastructure
          </motion.p>
          <motion.p
            className="text-lg md:text-xl text-muted-foreground max-w-3xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            Multi-Agent LLM System for Autonomous OpenStack Operations
          </motion.p>
        </div>

        <motion.p
          className="text-lg md:text-xl font-medium"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.0 }}
        >
          Presented by: <span className="font-bold text-primary">Youssef Hassine</span>
        </motion.p>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl w-full"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.2 }}
        >
          <Card className="shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center text-base">
                <UserCircle className="mr-2 h-5 w-5 text-primary" />
                Academic Supervisor
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Mm Ines Abdeljaoued-Tej</p>
              <p className="font-semibold">ESSAIT</p>
            </CardContent>
          </Card>

          <Card className="shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center text-base">
                <Briefcase className="mr-2 h-5 w-5 text-primary" />
                Professional Supervisor
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground"> Mohamed Naceur BenKhalifa</p>
              <p className="font-semibold">Maison du Web</p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 1.4 }}
        >
          <Button onClick={onStartPresentation} size="lg" className="mt-4 text-lg px-8 py-6">
            <PlayCircle className="mr-2 h-6 w-6" />
            Start Presentation
          </Button>
        </motion.div>
      </div>
    </SlideWrapper>
  )
}

HeroSlide.defaultProps = {
  onStartPresentation: () => console.log("Start presentation clicked"),
}
