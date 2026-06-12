"use client"

import { useState, useMemo } from "react"
import PresentationLayout from "@/components/presentation/presentation-layout"

// Core slides
import HeroSlide from "@/components/presentation/slides/core/hero-slide"
import NavigationSlide from "@/components/presentation/slides/core/navigation-slide"

// Introduction and company context slides
import ProjectContextSlide from "@/components/presentation/slides/introduction/project-context-slide"
import CompanyOverviewSlide from "@/components/presentation/slides/company-context/company-overview-slide"

// Problem analysis slides
import CurrentArchitectureProblemsSlide from "@/components/presentation/slides/problem-analysis/current-architecture-problems-slide"
import ProposedSolutionSlide from "@/components/presentation/slides/problem-analysis/proposed-solution-slide"
import ActorsRequirementsSlide from "@/components/presentation/slides/problem-analysis/actors-requirements-slide"
import AlertNormalizationExampleSlide from "@/components/presentation/slides/problem-analysis/alert-normalization-example-slide"
import TechnologiesUsedSlide from "@/components/presentation/slides/problem-analysis/technologies-used-slide"

// Architecture slides
import InteractivePipelineSlide from "@/components/presentation/slides/problem-analysis/interactive-pipeline-slide"
import LogicalArchitectureSlide from "@/components/presentation/slides/problem-analysis/logical-architecture-slide"
import PhysicalArchitectureSlide from "@/components/presentation/slides/problem-analysis/physical-architecture-slide"
import SmartRouterSlide from "@/components/presentation/slides/problem-analysis/smart-router-slide"
import AiAgentsOverviewSlide from "@/components/presentation/slides/problem-analysis/ai-agents-overview-slide"
import PolicyEngineSlide from "@/components/presentation/slides/problem-analysis/policy-engine-slide"
import ExecutionPipelineSlide from "@/components/presentation/slides/problem-analysis/execution-pipeline-slide"
import McpConnectorsSlide from "@/components/presentation/slides/problem-analysis/mcp-connectors-slide"

// Project management slides
import GanttChartSlide from "@/components/presentation/slides/project-management/gantt-chart-slide"

// Results and conclusion slides
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

      // SECTION 1: Introduction
      <ProjectContextSlide key="project-context" />,

      // SECTION 2: General Context
      <CompanyOverviewSlide key="company-overview" />,
      <CurrentArchitectureProblemsSlide key="problems" />,

      // SECTION 3: Proposed Solution
      <ProposedSolutionSlide key="solution" />,

      // SECTION 4: Objectives, Scope & Stack
      <ActorsRequirementsSlide key="actors-requirements" />,
      <AlertNormalizationExampleSlide key="alert-normalization" />,
      <TechnologiesUsedSlide key="technologies" />,

      // SECTION 5: Planning
      <GanttChartSlide key="gantt-chart" />,

      // SECTION 6: Architecture
      <InteractivePipelineSlide key="interactive-pipeline" />,
      <LogicalArchitectureSlide key="logical-arch" />,
      <PhysicalArchitectureSlide key="physical-arch" />,
      <SmartRouterSlide key="smart-router" />,
      <AiAgentsOverviewSlide key="ai-agents" />,
      <PolicyEngineSlide key="policy-engine" />,
      <ExecutionPipelineSlide key="execution-pipeline" />,
      <McpConnectorsSlide key="mcp-connectors" />,

      // SECTION 7: Implementation & Validation
      <KpiImprovementsSlide key="kpi-improvements" />,
      <TestResultsSlide key="test-results" />,

      // SECTION 8: Conclusion
      <ConclusionContentSlide key="conclusion" />,
      <ThankYouSlide key="thank-you" />,
    ],
    []
  )

  const slideTitles = useMemo(
    () => [
      "Home", // 0
      "Presentation Outline", // 1
      "Context & Importance", // 2
      "Maison du Web", // 3
      "Problem Statement", // 4
      "Proposed Solution - Remedion", // 5
      "Objectives & Scope", // 6
      "Alert Normalization Example", // 7
      "Technologies Used", // 8
      "Planning Methodology", // 9
      "Architecture & Data Flow", // 10
      "Core Workflow Architecture", // 11
      "Physical Architecture", // 12
      "Smart Router", // 13
      "AI Investigation Agents", // 14
      "Policy Engine", // 15
      "Safe Remediation Pipeline", // 16
      "MCP Connectors", // 17
      "Evaluation Indicators", // 18
      "Test Coverage & Validation", // 19
      "Summary & Perspectives", // 20
      "Thank You", // 21
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
