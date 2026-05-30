"use client"

import { useState, useMemo } from "react"
import PresentationLayout from "@/components/presentation/presentation-layout"

// Core slides
import HeroSlide from "@/components/presentation/slides/core/hero-slide"
import NavigationSlide from "@/components/presentation/slides/core/navigation-slide"

// Introduction slides
import IntroductionTitleSlide from "@/components/presentation/slides/introduction/introduction-title-slide"
import ProjectContextSlide from "@/components/presentation/slides/introduction/project-context-slide"

// Company context slides
import CompanyPresentationTitleSlide from "@/components/presentation/slides/company-context/company-presentation-title-slide"
import CompanyOverviewSlide from "@/components/presentation/slides/company-context/company-overview-slide"

// Problem analysis slides
import CurrentArchitectureProblemsSlide from "@/components/presentation/slides/problem-analysis/current-architecture-problems-slide"
import ProposedSolutionSlide from "@/components/presentation/slides/problem-analysis/proposed-solution-slide"
import ActorsRequirementsSlide from "@/components/presentation/slides/problem-analysis/actors-requirements-slide"
import TechnologiesUsedSlide from "@/components/presentation/slides/problem-analysis/technologies-used-slide"

// Architecture slides
import ArchitectureTitleSlide from "@/components/presentation/slides/problem-analysis/architecture-title-slide"
import InteractivePipelineSlide from "@/components/presentation/slides/problem-analysis/interactive-pipeline-slide"
import LogicalArchitectureSlide from "@/components/presentation/slides/problem-analysis/logical-architecture-slide"
import PhysicalArchitectureSlide from "@/components/presentation/slides/problem-analysis/physical-architecture-slide"
import KubernetesArchitectureSlide from "@/components/presentation/slides/problem-analysis/kubernetes-architecture-slide"
import SmartRouterSlide from "@/components/presentation/slides/problem-analysis/smart-router-slide"
import AiAgentsOverviewSlide from "@/components/presentation/slides/problem-analysis/ai-agents-overview-slide"
import PolicyEngineSlide from "@/components/presentation/slides/problem-analysis/policy-engine-slide"
import ExecutionPipelineSlide from "@/components/presentation/slides/problem-analysis/execution-pipeline-slide"
import McpConnectorsSlide from "@/components/presentation/slides/problem-analysis/mcp-connectors-slide"

// Project management slides
import ProjectPlanningTitleSlide from "@/components/presentation/slides/project-management/project-planning-title-slide"
import GanttChartSlide from "@/components/presentation/slides/project-management/gantt-chart-slide"

// Results and conclusion slides
import RealisationTitleSlide from "@/components/presentation/slides/results-conclusion/realisation-title-slide"
import EnvironmentToolsSlide from "@/components/presentation/slides/results-conclusion/environment-tools-slide"
import KpiImprovementsSlide from "@/components/presentation/slides/results-conclusion/kpi-improvements-slide"
import TestResultsSlide from "@/components/presentation/slides/results-conclusion/test-results-slide"
import ConclusionContentSlide from "@/components/presentation/slides/results-conclusion/conclusion-content-slide"

import ThankYouSlide from "@/components/presentation/slides/results-conclusion/thank-you-slide"

export default function PresentationPage() {
  const [currentSlide, setCurrentSlide] = useState(0)

  const handleStartPresentation = () => {
    setCurrentSlide(1)
  }

  const handleNavigateToSlide = (slideIndex: number) => {
    setCurrentSlide(slideIndex)
  }

  const slides = useMemo(
    () => [
      // 0 - Hero
      <HeroSlide key="hero" onStartPresentation={handleStartPresentation} />,
      // 1 - Navigation
      <NavigationSlide key="nav" onNavigate={handleNavigateToSlide} />,

      // SECTION 1: Introduction (slides 2-4)
      <IntroductionTitleSlide key="intro-title" />,
      <ProjectContextSlide key="project-context" />,
      <CompanyOverviewSlide key="company-overview" />,

      // SECTION 2: Problématique (slides 5-6)
      <CompanyPresentationTitleSlide key="company-title" />,
      <CurrentArchitectureProblemsSlide key="problems" />,

      // SECTION 3: Proposed Solution (slide 7)
      <ProposedSolutionSlide key="solution" />,

      // SECTION 4: Specifications (slides 8-9)
      <ActorsRequirementsSlide key="actors-requirements" />,
      <TechnologiesUsedSlide key="technologies" />,

      // SECTION 5: Planning (slides 10-11)
      <ProjectPlanningTitleSlide key="planning-title" />,
      <GanttChartSlide key="gantt-chart" />,

      // SECTION 6: Architecture (slides 12-21)
      <ArchitectureTitleSlide key="arch-title" />,
      <InteractivePipelineSlide key="interactive-pipeline" />,
      <LogicalArchitectureSlide key="logical-arch" />,
      <PhysicalArchitectureSlide key="physical-arch" />,
      <KubernetesArchitectureSlide key="k8s-arch" />,
      <SmartRouterSlide key="smart-router" />,
      <AiAgentsOverviewSlide key="ai-agents" />,
      <PolicyEngineSlide key="policy-engine" />,
      <ExecutionPipelineSlide key="execution-pipeline" />,
      <McpConnectorsSlide key="mcp-connectors" />,

      // SECTION 7: Implementation (slides 22-25)
      <RealisationTitleSlide key="realisation-title" />,
      <EnvironmentToolsSlide key="environment-tools" />,
      <KpiImprovementsSlide key="kpi-improvements" />,
      <TestResultsSlide key="test-results" />,

      // SECTION 8: Conclusion (slides 26-27)
      <ConclusionContentSlide key="conclusion" />,
      <ThankYouSlide key="thank-you" />,
    ],
    []
  )

  const slideTitles = useMemo(
    () => [
      "Home", // 0
      "Presentation Outline", // 1
      "Introduction", // 2
      "Context & Importance", // 3
      "Maison du Web", // 4
      "Problématique", // 5
      "Current Problems", // 6
      "Proposed Solution - REMEdion", // 7
      "Actors & Requirements", // 8
      "Technologies Used", // 9
      "Project Planning", // 10
      "Gantt Chart & Milestones", // 11
      "System Architecture", // 12
      "Interactive Pipeline", // 13
      "Logical Architecture", // 14
      "Physical Architecture", // 15
      "Kubernetes Architecture", // 16
      "Smart Router", // 17
      "AI Investigation Agents", // 18
      "Policy Engine", // 19
      "Execution Pipeline", // 20
      "MCP Connectors", // 21
      "Implementation", // 22
      "Development Environment", // 23
      "KPI Improvements", // 24
      "Test Results", // 25
      "Summary & Perspectives", // 26
      "Thank You", // 27
    ],
    []
  )

  return (
    <PresentationLayout
      slides={slides}
      currentSlide={currentSlide}
      setCurrentSlide={setCurrentSlide}
      totalSlides={slides.length}
      slideTitles={slideTitles}
    />
  )
}
