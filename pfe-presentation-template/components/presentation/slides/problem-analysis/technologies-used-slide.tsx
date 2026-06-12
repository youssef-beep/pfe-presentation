"use client"
import SlideWrapper from "../../slide-wrapper"
import SlideHeader from "../../slide-header"
import { Card, CardContent } from "@/components/ui/card"
import { Layers, Network, Database, Activity, Cloud, Server, Brain } from "lucide-react"

const technologies = [
  {
    category: "Orchestration",
    icon: Layers,
    items: [
      { name: "Mastra", logo: "/placeholder-logo.svg", desc: "Workflow" },
      { name: "Mastra Agents", logo: "/placeholder-logo.svg", desc: "Reasoner / reporter" },
      { name: "LLM Provider", logo: "https://ollama.ai/public/ollama.png", desc: "Model inference" },
    ],
  },
  {
    category: "AI & ML",
    icon: Brain,
    items: [
      { name: "Ollama/Claude", logo: "https://ollama.ai/public/ollama.png", desc: "LLM" },
      { name: "Qdrant", logo: "https://qdrant.tech/img/logo_with_text.png", desc: "Vector DB" },
      { name: "Random Forest", logo: "https://cdn-icons-png.flaticon.com/512/2103/2103658.png", desc: "ML" },
      { name: "Prophet", logo: "https://cdn-icons-png.flaticon.com/512/3281/3281289.png", desc: "Forecast" },
    ],
  },
  {
    category: "MCP Connectors",
    icon: Network,
    items: [
      { name: "Grafana MCP", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/grafana/grafana-original.svg", desc: "Metrics" },
      { name: "AWX MCP", logo: "https://raw.githubusercontent.com/ansible/awx-logos/master/awx/ui/client/assets/logo-login.svg", desc: "Ansible" },
      { name: "Redmine MCP", logo: "https://www.redmine.org/attachments/download/3458/redmine_logo_v1.png", desc: "Tickets" },
    ],
  },
  {
    category: "Data Layer",
    icon: Database,
    items: [
      { name: "PostgreSQL", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg", desc: "Audit" },
      { name: "Redis", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redis/redis-original.svg", desc: "Cache" },
      { name: "RabbitMQ", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/rabbitmq/rabbitmq-original.svg", desc: "Queue" },
    ],
  },
  {
    category: "Monitoring",
    icon: Activity,
    items: [
      { name: "Prometheus", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/prometheus/prometheus-original.svg", desc: "Metrics" },
      { name: "Grafana", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/grafana/grafana-original.svg", desc: "Dashboards" },
      { name: "OpenSearch", logo: "https://opensearch.org/assets/brand/SVG/Mark/opensearch_mark_default.svg", desc: "Logs" },
      { name: "Jaeger", logo: "https://www.jaegertracing.io/img/jaeger-icon-color.png", desc: "Tracing" },
    ],
  },
  {
    category: "Infrastructure",
    icon: Cloud,
    items: [
      { name: "Kubernetes", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kubernetes/kubernetes-plain.svg", desc: "Orchestration" },
      { name: "Traefik", logo: "https://doc.traefik.io/traefik/assets/img/traefik.logo.png", desc: "Ingress" },
      { name: "cert-manager", logo: "https://cert-manager.io/images/cert-manager-logo-icon.svg", desc: "TLS" },
    ],
  },
  {
    category: "Target Platform",
    icon: Server,
    items: [
      { name: "OpenStack", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/openstack/openstack-original.svg", desc: "Cloud" },
      { name: "AWX/Ansible", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/ansible/ansible-original.svg", desc: "Automation" },
    ],
  },
]

export default function TechnologiesUsedSlide() {
  return (
    <SlideWrapper>
      <div className="h-full min-h-0 flex flex-col">
        <SlideHeader
          badge="4 - Specifications"
          title="Technologies Used"
          subtitle="Complete technology stack powering Remedion"
          className="mb-4 [&>*:first-child]:mb-2 [&>*:first-child]:px-4 [&>*:first-child]:py-1.5 [&>*:first-child]:text-lg [&>h1]:mb-2 [&>h1]:text-5xl md:[&>h1]:text-6xl lg:[&>h1]:text-6xl [&>p]:text-lg [&>p]:leading-snug md:[&>p]:text-xl"
        />

        <div className="flex-1 min-h-0">
          {/* Row 1: 4 categories */}
          <div className="grid grid-cols-4 gap-3 mb-3">
            {technologies.slice(0, 4).map((category, index) => (
              <Card key={index} className="shadow-md">
                <CardContent className="p-3">
                  <div className="flex items-center gap-2 mb-2.5">
                    <category.icon className="h-6 w-6 text-primary" />
                    <span className="font-bold text-lg xl:text-xl">{category.category}</span>
                  </div>
                  <div className="space-y-1.5">
                    {category.items.map((item, idx) => (
                      <div key={idx} className="flex items-center gap-2.5 p-1.5 bg-muted/30 rounded-lg">
                        <div className="w-9 h-9 flex-shrink-0 flex items-center justify-center bg-white rounded-lg p-1.5">
                          <img
                            src={item.logo}
                            alt={item.name}
                            className="w-full h-full object-contain"
                            onError={(e) => {
                              ;(e.target as HTMLImageElement).style.display = "none"
                            }}
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <span className="font-semibold text-base block leading-tight">{item.name}</span>
                          <span className="text-sm text-muted-foreground">{item.desc}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Row 2: 3 categories */}
          <div className="grid grid-cols-3 gap-3">
            {technologies.slice(4).map((category, index) => (
              <Card key={index} className="shadow-md">
                <CardContent className="p-3">
                  <div className="flex items-center gap-2 mb-2.5">
                    <category.icon className="h-6 w-6 text-primary" />
                    <span className="font-bold text-lg xl:text-xl">{category.category}</span>
                  </div>
                  <div className="grid grid-cols-2 gap-1.5">
                    {category.items.map((item, idx) => (
                      <div key={idx} className="flex items-center gap-2 p-1.5 bg-muted/30 rounded-lg">
                        <div className="w-8 h-8 flex-shrink-0 flex items-center justify-center bg-white rounded-lg p-1">
                          <img
                            src={item.logo}
                            alt={item.name}
                            className="w-full h-full object-contain"
                            onError={(e) => {
                              ;(e.target as HTMLImageElement).style.display = "none"
                            }}
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <span className="font-semibold text-sm block leading-tight">{item.name}</span>
                          <span className="text-sm text-muted-foreground">{item.desc}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </SlideWrapper>
  )
}
