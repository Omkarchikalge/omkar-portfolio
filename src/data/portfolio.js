export const personalInfo = {
  name: 'Omkar Chikalge',
  role: 'Platform Engineer & SRE',
  location: 'Pune, Maharashtra, India',
  email: 'omkar@example.com',
  github: 'https://github.com/omkar-chikalge',
  linkedin: 'https://linkedin.com/in/omkar-chikalge',
  twitter: 'https://twitter.com/omkarchikalge',
  devto: 'https://dev.to/omkarchikalge',
  bio: [
    "I'm Omkar Chikalge, a DevOps student specializing in Platform Engineering and Site Reliability Engineering. I build internal developer platforms, design CI/CD pipelines, and obsess over system reliability — because downtime isn't an option.",
    "My approach blends infrastructure-as-code with a product mindset: the platform team is an internal product team, and developers are the customers. I optimize for developer velocity, observability, and self-service.",
    "When I'm not knee-deep in Kubernetes manifests or Terraform plans, I contribute to open source projects and explore the intersection of cloud-native tooling and platform abstraction.",
  ],
  stats: [
    { num: '10+', label: 'Projects shipped' },
    { num: '5+', label: 'Cloud platforms' },
    { num: '99.9%', label: 'Target uptime' },
  ],
}

export const certifications = [
  { icon: '☁️', name: 'Certified Kubernetes Administrator', provider: 'Linux Foundation · CNCF', status: 'in progress' },
  { icon: '🔶', name: 'AWS Solutions Architect Associate', provider: 'Amazon Web Services', status: 'planned' },
  { icon: '🏔️', name: 'HashiCorp Terraform Associate', provider: 'HashiCorp', status: 'planned' },
  { icon: '📊', name: 'Google Cloud Professional DevOps', provider: 'Google Cloud', status: 'planned' },
]

export const skillCategories = [
  {
    icon: '⚙️',
    title: 'Orchestration',
    tags: ['Kubernetes', 'Helm', 'ArgoCD', 'Flux CD', 'Kustomize', 'Istio'],
  },
  {
    icon: '🏗️',
    title: 'Infrastructure as Code',
    tags: ['Terraform', 'Pulumi', 'Ansible', 'CloudFormation', 'Crossplane'],
  },
  {
    icon: '🔁',
    title: 'CI/CD',
    tags: ['GitHub Actions', 'Jenkins', 'GitLab CI', 'Tekton', 'CircleCI'],
  },
  {
    icon: '📈',
    title: 'Observability',
    tags: ['Prometheus', 'Grafana', 'Loki', 'Jaeger', 'OpenTelemetry', 'Datadog'],
  },
  {
    icon: '☁️',
    title: 'Cloud Platforms',
    tags: ['AWS', 'GCP', 'Azure', 'DigitalOcean', 'Hetzner'],
  },
  {
    icon: '💻',
    title: 'Languages & Scripting',
    tags: ['Go', 'Python', 'Bash', 'YAML', 'HCL', 'SQL'],
  },
]

export const projects = [
  {
    id: 1,
    featured: true,
    tag: 'Platform',
    tagVariant: 'platform',
    title: 'Internal Developer Platform (IDP)',
    description:
      'Built a self-service platform on top of Kubernetes using Backstage as the developer portal. Integrated service catalog, scaffolding templates, CI/CD pipelines, and environment provisioning — reducing onboarding time from 3 days to 2 hours.',
    stack: ['Kubernetes', 'Backstage', 'ArgoCD', 'Terraform', 'GitHub Actions'],
    github: 'https://github.com/',
    pods: [
      { name: 'api-gateway', status: 'running', replicas: '3 replicas', dot: 'green' },
      { name: 'backstage-portal', status: 'running', replicas: '2 replicas', dot: 'green' },
      { name: 'argo-server', status: 'running', replicas: '1 replica', dot: 'green' },
      { name: 'postgres-db', status: 'pending', replicas: 'scaling', dot: 'amber' },
      { name: 'prometheus', status: 'collecting', replicas: 'metrics', dot: 'blue' },
      { name: 'legacy-svc', status: 'deprecated', replicas: '', dot: 'red' },
    ],
  },
  {
    id: 2,
    featured: false,
    tag: 'Infrastructure',
    tagVariant: 'infra',
    title: 'Multi-Cloud Terraform Modules',
    description:
      'Modular, reusable Terraform library for provisioning VPCs, EKS/GKE clusters, RDS, and IAM policies across AWS and GCP. State managed via Terraform Cloud with policy-as-code using Sentinel.',
    stack: ['Terraform', 'AWS EKS', 'GKE', 'Sentinel'],
    github: 'https://github.com/',
  },
  {
    id: 3,
    featured: false,
    tag: 'SRE',
    tagVariant: 'sre',
    title: 'SLO Dashboard & Alerting Engine',
    description:
      'Designed SLI/SLO framework using Prometheus recording rules and Grafana dashboards. Multi-window, multi-burn-rate alerts with error budget tracking and PagerDuty integration.',
    stack: ['Prometheus', 'Grafana', 'PagerDuty', 'Python'],
    github: 'https://github.com/',
  },
  {
    id: 4,
    featured: false,
    tag: 'Automation',
    tagVariant: 'automation',
    title: 'GitOps CD Pipeline',
    description:
      'End-to-end GitOps pipeline: Git push triggers GitHub Actions, builds & pushes OCI image to GHCR, Flux reconciles to dev/staging/prod. Includes drift detection and auto-rollback on SLO breach.',
    stack: ['Flux CD', 'GitHub Actions', 'Helm', 'Go'],
    github: 'https://github.com/',
  },
  {
    id: 5,
    featured: false,
    tag: 'Infrastructure',
    tagVariant: 'infra',
    title: 'Kubernetes Operator (Go)',
    description:
      'Custom CRD and controller written in Go using controller-runtime. Automates database provisioning and credential rotation, exposing secrets via External Secrets Operator into workloads.',
    stack: ['Go', 'controller-runtime', 'CRDs', 'ESO'],
    github: 'https://github.com/',
  },
]
