"use client"
import SlideWrapper from "../../slide-wrapper"
import { motion } from "framer-motion"
import Image from "next/image"

const MDW_BLUE = 'rgb(43, 73, 153)'

// Floating dots like MDW website
const floatingDots = [
  { x: '15%', y: '25%', size: 6, color: MDW_BLUE, delay: 0 },
  { x: '80%', y: '20%', size: 8, color: 'rgb(236 72 153)', delay: 0.5 },
  { x: '70%', y: '75%', size: 5, color: MDW_BLUE, delay: 1 },
  { x: '25%', y: '70%', size: 7, color: 'rgb(139 92 246)', delay: 1.5 },
  { x: '50%', y: '15%', size: 5, color: 'rgb(236 72 153)', delay: 2 },
  { x: '85%', y: '55%', size: 4, color: 'rgb(139 92 246)', delay: 0.3 },
  { x: '10%', y: '55%', size: 6, color: MDW_BLUE, delay: 0.8 },
]

export default function CompanyPresentationTitleSlide() {
  return (
    <SlideWrapper>
      <div className="h-full w-full relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-blue-50 dark:from-slate-900 dark:via-slate-800 dark:to-blue-900">
        {/* Floating Dots Animation */}
        {floatingDots.map((dot, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full pointer-events-none"
            style={{
              left: dot.x,
              top: dot.y,
              width: dot.size,
              height: dot.size,
              backgroundColor: dot.color,
            }}
            animate={{
              y: [0, -20, 0, 20, 0],
              x: [0, 10, 0, -10, 0],
              opacity: [0.3, 0.7, 0.3, 0.7, 0.3],
              scale: [1, 1.3, 1, 1.3, 1],
            }}
            transition={{
              duration: 5 + Math.random() * 2,
              repeat: Infinity,
              delay: dot.delay,
              ease: "easeInOut",
            }}
          />
        ))}

        {/* Content */}
        <div className="relative z-10 h-full flex flex-col items-center justify-center">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="mb-12"
          >
            <motion.div
              className="relative w-32 h-32 rounded-3xl overflow-hidden shadow-2xl ring-8 ring-blue-100 dark:ring-blue-900/50"
              style={{ backgroundColor: MDW_BLUE }}
              whileHover={{ scale: 1.1, rotate: 5 }}
            >
              <Image
                src="/mdw-the-best.png"
                alt="MDW Engineering"
                fill
                className="object-contain p-4"
              />
            </motion.div>
          </motion.div>

          {/* Title */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-center"
          >
            <motion.div
              className="text-xl font-semibold tracking-wider mb-4 uppercase"
              style={{ color: MDW_BLUE }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              Presentation Section
            </motion.div>

            <motion.h1
              className="text-8xl font-bold tracking-tight mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <span
                className="bg-clip-text text-transparent"
                style={{
                  backgroundImage: `linear-gradient(135deg, ${MDW_BLUE} 0%, #1e40af 50%, #7c3aed 100%)`
                }}
              >
                General Context
              </span>
            </motion.h1>

            <motion.p
              className="text-4xl font-light text-muted-foreground"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
            >
              of the Project
            </motion.p>

            {/* Decorative line */}
            <motion.div
              className="w-32 h-1 mx-auto mt-8 rounded-full"
              style={{
                background: `linear-gradient(90deg, transparent, ${MDW_BLUE}, transparent)`
              }}
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1, delay: 0.9 }}
            />
          </motion.div>

          {/* Bottom Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2 }}
            className="absolute bottom-12"
          >
            <div
              className="px-8 py-4 rounded-full backdrop-blur-md border flex items-center gap-4"
              style={{
                backgroundColor: 'rgba(43, 73, 153, 0.1)',
                borderColor: 'rgba(43, 73, 153, 0.2)'
              }}
            >
              <div className="text-xl font-medium" style={{ color: MDW_BLUE }}>REMEdion</div>
              <div className="w-px h-6" style={{ backgroundColor: 'rgba(43, 73, 153, 0.3)' }} />
              <div className="text-lg text-muted-foreground">General Context</div>
            </div>
          </motion.div>
        </div>
      </div>
    </SlideWrapper>
  )
}
