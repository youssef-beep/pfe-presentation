import type React from "react"
import Image from "next/image"
import { cn } from "@/lib/utils"

interface SlideWrapperProps {
  children: React.ReactNode
  className?: string
  id?: string
  showLogos?: boolean
}

export default function SlideWrapper({ children, className, id, showLogos = false }: SlideWrapperProps) {
  return (
    <section
      id={id}
      className={cn(
        "h-full w-full flex flex-col p-4 md:p-6 lg:p-8 overflow-y-auto relative",
        className,
      )}
    >
      {showLogos && (
        <>
          {/* Top Left Logo */}
          <div className="absolute top-6 left-10 z-10">
            <Image
              src="/Logo_ESSAIT1.png"
              alt="Esprit Logo"
              width={100}
              height={50}
              onError={(e) => {
                e.currentTarget.src = "/placeholder-logo.png"
              }}
            />
          </div>

          {/* Top Right Logo */}
          <div className="absolute top-4 right-10 z-10">
            <Image
              src="/logo-mdw.png"
              alt="Maison du Web Logo"
              width={100}
              height={50}
              onError={(e) => {
                e.currentTarget.src = "/placeholder-logo.png"
              }}
            />
          </div>
        </>
      )}

      <div className="w-full h-full flex flex-col">{children}</div>
    </section>
  )
}
