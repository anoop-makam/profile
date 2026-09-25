import type { Skill, SkillCategory } from '@/types'
import { categories } from '@/types'

export { categories }
export type { Skill, SkillCategory }

export const skills: Skill[] = [
  {
    id: 'entra',
    name: 'Entra ID',
    category: 'cloud',
    weight: 1.05,
    contexts: [
      {
        organization: 'General Motors',
        role: 'Software engineer',
        year: '2022 — Present',
        description:
          'Microsoft Entra ID for identity: Azure AD, B2C, and the token path in front of customer and dealer apps.',
      },
    ],
    relatedSkills: ['oauth', 'oidc', 'msal', 'tokens', 'pkce'],
  },
  {
    id: 'appservice',
    name: 'App Service',
    category: 'cloud',
    weight: 0.95,
    contexts: [
      {
        organization: 'General Motors',
        year: '2022 — Present',
        description: 'Azure App Service for hosted APIs and web apps in the GM stack.',
      },
    ],
    relatedSkills: ['aks', 'docker', 'dotnet', 'aspnet'],
  },
  {
    id: 'keyvault',
    name: 'Key Vault',
    category: 'cloud',
    weight: 0.95,
    contexts: [
      {
        organization: 'General Motors',
        year: '2022 — Present',
        description: 'Secrets and keys in Azure Key Vault instead of config files and hope.',
      },
    ],
    relatedSkills: ['entra', 'terraform', 'appconfig'],
  },
  {
    id: 'appconfig',
    name: 'App Config',
    category: 'cloud',
    weight: 0.9,
    contexts: [
      {
        organization: 'General Motors',
        year: '2022 — Present',
        description: 'Azure App Configuration for feature flags and environment settings.',
      },
    ],
    relatedSkills: ['keyvault', 'terraform', 'appservice'],
  },
  {
    id: 'aks',
    name: 'AKS',
    category: 'cloud',
    weight: 1.2,
    contexts: [
      {
        organization: 'General Motors',
        year: '2022 — Present',
        description:
          'Containerized services on Azure Kubernetes Service, deployed through ACR, as part of moving off OCF.',
      },
    ],
    relatedSkills: ['docker', 'terraform', 'cicd', 'azdo', 'microservices'],
  },
  {
    id: 'servicebus',
    name: 'Service Bus',
    category: 'cloud',
    weight: 1.0,
    contexts: [
      {
        organization: 'General Motors',
        year: '2022 — Present',
        description: 'Azure Service Bus for async work between microservices.',
      },
    ],
    relatedSkills: ['microservices', 'rest', 'aks'],
  },
  {
    id: 'terraform',
    name: 'Terraform',
    category: 'cloud',
    weight: 1.05,
    contexts: [
      {
        organization: 'General Motors',
        year: '2022 — Present',
        description: 'Infrastructure as Code with Terraform across Azure resources.',
      },
    ],
    relatedSkills: ['aks', 'keyvault', 'appconfig', 'azdo'],
  },
  {
    id: 'pcf',
    name: 'PCF',
    category: 'cloud',
    weight: 0.9,
    contexts: [
      {
        organization: 'General Motors',
        year: '2022 — Present',
        description:
          'Pivotal Cloud Foundry on the way in. The work since has been migrating those apps onto Azure.',
      },
    ],
    relatedSkills: ['aks', 'docker', 'cicd'],
  },
  {
    id: 'az900',
    name: 'AZ-900',
    category: 'cloud',
    weight: 0.85,
    contexts: [
      {
        organization: 'Certification',
        description:
          'Azure Fundamentals. Cloud models, deployment modes, and how the pieces are supposed to fit.',
      },
    ],
    relatedSkills: ['terraform', 'aks', 'appservice'],
  },
  {
    id: 'csharp',
    name: 'C#',
    category: 'languages',
    weight: 1.3,
    contexts: [
      {
        organization: 'General Motors',
        role: 'Software engineer',
        year: '2022 — Present',
        description: 'The language under the .NET APIs and services.',
      },
      {
        organization: 'Hawaiian Airlines',
        role: 'Software engineer intern',
        year: '2021 — 2022',
        description: 'C# on the Hawaiian mobile client.',
      },
    ],
    relatedSkills: ['dotnet', 'aspnet', 'xamarin'],
  },
  {
    id: 'dotnet',
    name: '.NET 8',
    category: 'languages',
    weight: 1.3,
    contexts: [
      {
        organization: 'General Motors',
        year: '2022 — Present',
        description:
          'Refactored a legacy .NET API: outdated patterns out, modular services in, faster responses.',
      },
    ],
    relatedSkills: ['csharp', 'aspnet', 'dapper', 'xunit', 'otel'],
  },
  {
    id: 'aspnet',
    name: 'ASP.NET',
    category: 'backend',
    weight: 1.15,
    contexts: [
      {
        organization: 'General Motors',
        year: '2022 — Present',
        description: 'ASP.NET Core for the HTTP surface of those backend APIs.',
      },
    ],
    relatedSkills: ['dotnet', 'rest', 'csharp'],
  },
  {
    id: 'ts',
    name: 'TypeScript',
    category: 'languages',
    weight: 1.15,
    contexts: [
      {
        organization: 'General Motors',
        year: '2022 — Present',
        description: 'Typed frontends on Angular 19 — the UI half of the GM applications.',
      },
    ],
    relatedSkills: ['angular', 'js', 'rxjs'],
  },
  {
    id: 'js',
    name: 'JavaScript',
    category: 'languages',
    weight: 0.95,
    contexts: [
      {
        organization: 'General Motors',
        description: 'JavaScript where TypeScript is not already doing the job.',
      },
    ],
    relatedSkills: ['ts', 'html', 'css'],
  },
  {
    id: 'python',
    name: 'Python',
    category: 'languages',
    weight: 0.9,
    contexts: [
      {
        organization: 'UT Austin',
        role: 'M.S. Artificial Intelligence',
        year: '2025 — Present',
        description: 'Python in the toolbox for scripting and AI coursework at UT Austin.',
      },
    ],
    relatedSkills: ['pytorch', 'huggingface', 'numpy', 'ml'],
  },
  {
    id: 'java',
    name: 'Java',
    category: 'languages',
    weight: 0.85,
    contexts: [
      {
        organization: 'Languages',
        description:
          'Java in the language set — used alongside C# and TypeScript, not the daily GM runtime.',
      },
    ],
    relatedSkills: ['csharp', 'ts'],
  },
  {
    id: 'sql',
    name: 'SQL',
    category: 'languages',
    weight: 1.05,
    contexts: [
      {
        organization: 'General Motors',
        description: 'SQL against Postgres, MySQL, and SQLite depending on the system.',
      },
    ],
    relatedSkills: ['postgres', 'mysql', 'sqlite', 'dapper'],
  },
  {
    id: 'xamarin',
    name: 'Xamarin',
    category: 'languages',
    weight: 1.05,
    contexts: [
      {
        organization: 'Hawaiian Airlines',
        role: 'Software engineer intern',
        year: '2021 — 2022',
        description:
          'Xamarin Forms on the Hawaiian Airlines app: maps, geolocation, and a live flight widget.',
      },
    ],
    relatedSkills: ['sqlite', 'csharp', 'dotnet', 'jenkins'],
  },
  {
    id: 'microservices',
    name: 'Microservices',
    category: 'architecture',
    weight: 1.25,
    contexts: [
      {
        organization: 'General Motors',
        year: '2022 — Present',
        description:
          'Architected microservices for customer and dealer-facing apps — security, availability, scale.',
      },
    ],
    relatedSkills: ['rest', 'aks', 'servicebus', 'otel', 'datadog'],
  },
  {
    id: 'rest',
    name: 'REST',
    category: 'backend',
    weight: 1.1,
    contexts: [
      {
        organization: 'General Motors',
        year: '2022 — Present',
        description:
          'Reusable REST APIs across Delivery Platforms, Campaigns, and Coupons so teams stop cloning the same endpoints.',
      },
    ],
    relatedSkills: ['microservices', 'aspnet', 'postman'],
  },
  {
    id: 'oauth',
    name: 'OAuth 2.0',
    category: 'architecture',
    weight: 1.05,
    contexts: [
      {
        organization: 'General Motors',
        year: '2022 — Present',
        description: 'OAuth 2.0 on the identity path for those apps.',
      },
    ],
    relatedSkills: ['oidc', 'pkce', 'msal', 'entra', 'tokens'],
  },
  {
    id: 'oidc',
    name: 'OIDC',
    category: 'architecture',
    weight: 1.0,
    contexts: [
      {
        organization: 'General Motors',
        year: '2022 — Present',
        description: 'OpenID Connect on top of OAuth for sign-in.',
      },
    ],
    relatedSkills: ['oauth', 'entra', 'msal'],
  },
  {
    id: 'pkce',
    name: 'PKCE',
    category: 'architecture',
    weight: 0.9,
    contexts: [
      {
        organization: 'General Motors',
        year: '2022 — Present',
        description:
          'PKCE on public clients so the auth code flow is not a gift to whoever sniffs the redirect.',
      },
    ],
    relatedSkills: ['oauth', 'oidc', 'msal'],
  },
  {
    id: 'msal',
    name: 'MSAL',
    category: 'architecture',
    weight: 0.95,
    contexts: [
      {
        organization: 'General Motors',
        year: '2022 — Present',
        description: 'MSAL for acquiring and caching Microsoft identity tokens.',
      },
    ],
    relatedSkills: ['entra', 'oauth', 'tokens'],
  },
  {
    id: 'tokens',
    name: 'Tokens',
    category: 'architecture',
    weight: 0.95,
    contexts: [
      {
        organization: 'General Motors',
        year: '2022 — Present',
        description: 'Token-based authentication across the API surface.',
      },
    ],
    relatedSkills: ['oauth', 'msal', 'entra'],
  },
  {
    id: 'postgres',
    name: 'PostgreSQL',
    category: 'data',
    weight: 1.15,
    contexts: [
      {
        organization: 'General Motors',
        year: '2022 — Present',
        description: 'Postgres as the GM data store behind those services.',
      },
    ],
    relatedSkills: ['sql', 'dapper', 'redis', 'dbeaver'],
  },
  {
    id: 'redis',
    name: 'Redis',
    category: 'data',
    weight: 1.0,
    contexts: [
      {
        organization: 'General Motors',
        year: '2022 — Present',
        description: 'Redis for cache and fast lookups next to the databases.',
      },
    ],
    relatedSkills: ['postgres', 'microservices'],
  },
  {
    id: 'mysql',
    name: 'MySQL',
    category: 'data',
    weight: 0.9,
    contexts: [
      {
        organization: 'General Motors',
        description: 'MySQL where the system already lives on it.',
      },
    ],
    relatedSkills: ['sql', 'dbeaver'],
  },
  {
    id: 'dapper',
    name: 'Dapper',
    category: 'data',
    weight: 0.95,
    contexts: [
      {
        organization: 'General Motors',
        year: '2022 — Present',
        description: 'Dapper for SQL access from .NET without dragging a full ORM into every query.',
      },
    ],
    relatedSkills: ['sql', 'postgres', 'csharp', 'dotnet'],
  },
  {
    id: 'sqlite',
    name: 'SQLite',
    category: 'data',
    weight: 0.85,
    contexts: [
      {
        organization: 'Hawaiian Airlines',
        role: 'Software engineer intern',
        year: '2021 — 2022',
        description: 'SQLite on the Hawaiian Airlines mobile client.',
      },
    ],
    relatedSkills: ['xamarin', 'sql'],
  },
  {
    id: 'gha',
    name: 'Actions',
    category: 'devops',
    weight: 0.95,
    contexts: [
      {
        organization: 'CI/CD',
        description: 'GitHub Actions for CI/CD where that is the pipeline.',
      },
    ],
    relatedSkills: ['cicd', 'docker'],
  },
  {
    id: 'azdo',
    name: 'Azure DevOps',
    category: 'devops',
    weight: 1.1,
    contexts: [
      {
        organization: 'General Motors',
        year: '2022 — Present',
        description: 'Azure DevOps pipelines as part of building CI/CD for the Azure migration.',
      },
    ],
    relatedSkills: ['cicd', 'docker', 'aks', 'terraform'],
  },
  {
    id: 'cicd',
    name: 'CI/CD',
    category: 'devops',
    weight: 1.1,
    contexts: [
      {
        organization: 'General Motors',
        year: '2022 — Present',
        description:
          'Pipelines that build, test, and ship containerized services instead of a handoff on Friday.',
      },
    ],
    relatedSkills: ['docker', 'aks', 'azdo', 'gha'],
  },
  {
    id: 'docker',
    name: 'Docker',
    category: 'devops',
    weight: 1.1,
    contexts: [
      {
        organization: 'General Motors',
        year: '2022 — Present',
        description: 'Containerized services, into ACR, onto AKS.',
      },
    ],
    relatedSkills: ['aks', 'cicd', 'azdo'],
  },
  {
    id: 'jenkins',
    name: 'Jenkins',
    category: 'devops',
    weight: 0.85,
    contexts: [
      {
        organization: 'Hawaiian Airlines',
        role: 'Software engineer intern',
        year: '2021 — 2022',
        description: 'Jenkins on the Hawaiian Airlines internship stack.',
      },
    ],
    relatedSkills: ['xamarin', 'cicd'],
  },
  {
    id: 'datadog',
    name: 'Datadog',
    category: 'observability',
    weight: 1.3,
    contexts: [
      {
        organization: 'General Motors',
        year: '2022 — Present',
        description:
          'Traces, logs, and metrics into Datadog. Synthetic monitors, RUM, and SLO alerts into Slack and ServiceNow.',
      },
    ],
    relatedSkills: ['otel', 'grafana', 'synthetics', 'slo', 'webhooks', 'microservices', 'angular'],
  },
  {
    id: 'otel',
    name: 'OpenTelemetry',
    category: 'observability',
    weight: 1.25,
    contexts: [
      {
        organization: 'General Motors',
        year: '2022 — Present',
        description:
          'OpenTelemetry across .NET and Angular so a request can be followed from the browser into the API.',
      },
    ],
    relatedSkills: ['datadog', 'angular', 'dotnet', 'microservices'],
  },
  {
    id: 'kibana',
    name: 'Kibana',
    category: 'observability',
    weight: 0.9,
    contexts: [
      {
        organization: 'General Motors',
        description: 'Kibana for log search when the trail is in Elastic.',
      },
    ],
    relatedSkills: ['grafana', 'datadog', 'otel'],
  },
  {
    id: 'grafana',
    name: 'Grafana',
    category: 'observability',
    weight: 0.95,
    contexts: [
      {
        organization: 'General Motors',
        description: 'Grafana dashboards for the metrics that Datadog is not already covering.',
      },
    ],
    relatedSkills: ['datadog', 'kibana', 'otel'],
  },
  {
    id: 'synthetics',
    name: 'Synthetic Monitors',
    category: 'observability',
    weight: 1.1,
    contexts: [
      {
        organization: 'General Motors',
        role: 'Software engineer',
        year: '2022 — Present',
        description:
          'Synthetic monitors in Datadog for the customer and dealer apps, alongside RUM.',
      },
    ],
    relatedSkills: ['datadog', 'slo', 'webhooks', 'otel'],
  },
  {
    id: 'slo',
    name: 'SLOs',
    category: 'observability',
    weight: 1.1,
    contexts: [
      {
        organization: 'General Motors',
        role: 'Software engineer',
        year: '2022 — Present',
        description: 'Service level objectives, with SLO alerts into Slack and ServiceNow.',
      },
    ],
    relatedSkills: ['datadog', 'synthetics', 'webhooks', 'oncall'],
  },
  {
    id: 'webhooks',
    name: 'Webhook Alerts',
    category: 'observability',
    weight: 0.95,
    contexts: [
      {
        organization: 'General Motors',
        role: 'Software engineer',
        year: '2022 — Present',
        description: 'Webhook alerts from the observability stack into Slack and ServiceNow.',
      },
    ],
    relatedSkills: ['datadog', 'slo', 'pagerduty', 'oncall'],
  },
  {
    id: 'oncall',
    name: 'On-call',
    category: 'observability',
    weight: 1.05,
    contexts: [
      {
        organization: 'General Motors',
        role: 'Software engineer',
        year: '2022 — Present',
        description: 'On-call for P1s on the customer and dealer-facing services.',
      },
    ],
    relatedSkills: ['pagerduty', 'slo', 'datadog', 'jira'],
  },
  {
    id: 'pagerduty',
    name: 'PagerDuty',
    category: 'observability',
    weight: 0.95,
    contexts: [
      {
        organization: 'General Motors',
        role: 'Software engineer',
        year: '2022 — Present',
        description: 'PagerDuty for on-call at GM.',
      },
    ],
    relatedSkills: ['oncall', 'webhooks', 'slo', 'datadog'],
  },
  {
    id: 'pytorch',
    name: 'PyTorch',
    category: 'ai',
    weight: 1.15,
    contexts: [
      {
        organization: 'UT Austin',
        role: 'M.S. Artificial Intelligence',
        year: '2025 — Present',
        description: 'PyTorch for deep learning coursework in the MS at UT Austin.',
      },
    ],
    relatedSkills: ['python', 'numpy', 'deeplearning', 'neuralnets', 'huggingface'],
  },
  {
    id: 'huggingface',
    name: 'Hugging Face',
    category: 'ai',
    weight: 1.05,
    contexts: [
      {
        organization: 'UT Austin',
        role: 'M.S. Artificial Intelligence',
        year: '2025 — Present',
        description: 'Hugging Face for NLP work in the MS at UT Austin.',
      },
    ],
    relatedSkills: ['pytorch', 'nlp', 'python', 'deeplearning'],
  },
  {
    id: 'numpy',
    name: 'NumPy',
    category: 'ai',
    weight: 0.95,
    contexts: [
      {
        organization: 'UT Austin',
        role: 'M.S. Artificial Intelligence',
        year: '2025 — Present',
        description: 'NumPy for numerical work in the MS at UT Austin.',
      },
    ],
    relatedSkills: ['python', 'pytorch', 'ml'],
  },
  {
    id: 'deeplearning',
    name: 'Deep Learning',
    category: 'ai',
    weight: 1.15,
    contexts: [
      {
        organization: 'UT Austin',
        role: 'M.S. Artificial Intelligence',
        year: '2025 — Present',
        description: 'Deep learning as part of the MS in Artificial Intelligence at UT Austin.',
      },
    ],
    relatedSkills: ['pytorch', 'neuralnets', 'ml', 'huggingface'],
  },
  {
    id: 'nlp',
    name: 'NLP',
    category: 'ai',
    weight: 1.1,
    contexts: [
      {
        organization: 'UT Austin',
        role: 'M.S. Artificial Intelligence',
        year: '2025 — Present',
        description:
          'Natural language processing coursework in the MS at UT Austin.',
      },
    ],
    relatedSkills: ['huggingface', 'pytorch', 'deeplearning', 'ml'],
  },
  {
    id: 'neuralnets',
    name: 'Neural Networks',
    category: 'ai',
    weight: 1.05,
    contexts: [
      {
        organization: 'UT Austin',
        role: 'M.S. Artificial Intelligence',
        year: '2025 — Present',
        description: 'Neural networks as part of the MS at UT Austin.',
      },
    ],
    relatedSkills: ['deeplearning', 'pytorch', 'ml'],
  },
  {
    id: 'ml',
    name: 'Machine Learning',
    category: 'ai',
    weight: 1.15,
    contexts: [
      {
        organization: 'UT Austin',
        role: 'M.S. Artificial Intelligence',
        year: '2025 — Present',
        description: 'Machine learning coursework in the MS at UT Austin.',
      },
    ],
    relatedSkills: ['python', 'numpy', 'deeplearning', 'nlp'],
  },
  {
    id: 'angular',
    name: 'Angular 19',
    category: 'frontend',
    weight: 1.3,
    contexts: [
      {
        organization: 'General Motors',
        year: '2022 — Present',
        description:
          'Angular 19 on customer and dealer-facing apps, instrumented with OpenTelemetry the same as the APIs.',
      },
    ],
    relatedSkills: ['ts', 'rxjs', 'otel', 'html', 'css', 'aem'],
  },
  {
    id: 'rxjs',
    name: 'RxJS',
    category: 'frontend',
    weight: 1.0,
    contexts: [
      {
        organization: 'General Motors',
        year: '2022 — Present',
        description: 'RxJS inside Angular for async UI state and HTTP streams.',
      },
    ],
    relatedSkills: ['angular', 'ts'],
  },
  {
    id: 'html',
    name: 'HTML',
    category: 'frontend',
    weight: 0.8,
    contexts: [
      {
        organization: 'General Motors',
        description: 'HTML for the markup under Angular views on GM customer and dealer apps.',
      },
    ],
    relatedSkills: ['css', 'angular'],
  },
  {
    id: 'css',
    name: 'CSS',
    category: 'frontend',
    weight: 0.8,
    contexts: [
      {
        organization: 'General Motors',
        description: 'CSS for layout and styling on those Angular surfaces.',
      },
    ],
    relatedSkills: ['html', 'angular'],
  },
  {
    id: 'aem',
    name: 'AEM',
    category: 'frontend',
    weight: 0.9,
    contexts: [
      {
        organization: 'General Motors',
        description: 'AEM integration on the content side of the frontend.',
      },
    ],
    relatedSkills: ['angular', 'html'],
  },
  {
    id: 'xunit',
    name: 'xUnit',
    category: 'tools',
    weight: 0.95,
    contexts: [
      {
        organization: 'General Motors',
        description: 'xUnit for .NET unit tests.',
      },
    ],
    relatedSkills: ['moq', 'csharp', 'dotnet'],
  },
  {
    id: 'moq',
    name: 'Moq',
    category: 'tools',
    weight: 0.85,
    contexts: [
      {
        organization: 'General Motors',
        description: 'Moq to isolate the code under test.',
      },
    ],
    relatedSkills: ['xunit', 'csharp'],
  },
  {
    id: 'selenium',
    name: 'Selenium',
    category: 'tools',
    weight: 0.9,
    contexts: [
      {
        organization: 'General Motors',
        description: 'Selenium for browser automation where Playwright is not the runner.',
      },
    ],
    relatedSkills: ['playwright', 'jasmine'],
  },
  {
    id: 'jasmine',
    name: 'Jasmine',
    category: 'tools',
    weight: 0.85,
    contexts: [
      {
        organization: 'General Motors',
        description: 'Jasmine for Angular unit tests.',
      },
    ],
    relatedSkills: ['angular', 'ts'],
  },
  {
    id: 'sonar',
    name: 'SonarQube',
    category: 'tools',
    weight: 0.85,
    contexts: [
      {
        organization: 'General Motors',
        description: 'SonarQube on the pipeline for quality gates.',
      },
    ],
    relatedSkills: ['cicd', 'azdo'],
  },
  {
    id: 'postman',
    name: 'Postman',
    category: 'tools',
    weight: 0.85,
    contexts: [
      {
        organization: 'APIs',
        description: 'Postman for exercising APIs by hand and in collections.',
      },
    ],
    relatedSkills: ['rest', 'insomnia'],
  },
  {
    id: 'insomnia',
    name: 'Insomnia',
    category: 'tools',
    weight: 0.8,
    contexts: [
      {
        organization: 'APIs',
        description: 'Insomnia as the other HTTP client in the drawer.',
      },
    ],
    relatedSkills: ['postman', 'rest'],
  },
  {
    id: 'git',
    name: 'Git',
    category: 'tools',
    weight: 0.9,
    contexts: [
      {
        organization: 'Always',
        description: 'Git for source history on GM and Hawaiian work — every change that shipped.',
      },
    ],
    relatedSkills: ['gha', 'azdo'],
  },
  {
    id: 'dbeaver',
    name: 'DBeaver',
    category: 'tools',
    weight: 0.8,
    contexts: [
      {
        organization: 'Data',
        description: 'DBeaver for looking at Postgres and the rest without a guess.',
      },
    ],
    relatedSkills: ['postgres', 'mysql', 'sql'],
  },
  {
    id: 'jira',
    name: 'Jira',
    category: 'tools',
    weight: 0.85,
    contexts: [
      {
        organization: 'General Motors',
        year: '2022 — Present',
        description: 'Jira to track GM work: stories, incidents, and the on-call follow-up.',
      },
    ],
    relatedSkills: ['agile', 'scrum'],
  },
  {
    id: 'playwright',
    name: 'Playwright',
    category: 'tools',
    weight: 1.1,
    contexts: [
      {
        organization: 'General Motors',
        year: '2022 — Present',
        description: 'Playwright on the GM tech stack for end-to-end coverage.',
      },
    ],
    relatedSkills: ['selenium', 'angular'],
  },
  {
    id: 'agile',
    name: 'Agile',
    category: 'methods',
    weight: 0.85,
    contexts: [
      {
        organization: 'Methods',
        description: 'Agile delivery with the rest of the GM and internship teams.',
      },
    ],
    relatedSkills: ['scrum', 'safe', 'jira'],
  },
  {
    id: 'scrum',
    name: 'Scrum',
    category: 'methods',
    weight: 0.85,
    contexts: [
      {
        organization: 'Methods',
        description: 'Scrum as the working cadence.',
      },
    ],
    relatedSkills: ['agile', 'safe'],
  },
  {
    id: 'safe',
    name: 'SAFe',
    category: 'methods',
    weight: 0.85,
    contexts: [
      {
        organization: 'Methods',
        description: 'SAFe where the org runs on it.',
      },
    ],
    relatedSkills: ['agile', 'scrum'],
  },
]

export const skillsById = Object.fromEntries(skills.map((skill) => [skill.id, skill])) as Record<
  string,
  Skill
>

export function getSkill(id: string): Skill | undefined {
  return skillsById[id]
}

export const filters = [{ id: 'all', label: 'All' }, ...categories] as const
