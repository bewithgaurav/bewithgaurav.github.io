// Every fact on this site comes from the public, verified records in Gaurav's
// career inventory, and the wording follows his approved baseline résumé.
// Change a fact there first, then mirror it here. Never add a number,
// technology or claim of scope that the inventory does not support.

export type Link = { label: string; href: string };

export const person = {
  name: "Gaurav Sharma",
  title: "Software Development Engineer II",
  org: "Microsoft",
  team: "Azure SQL Drivers",
  location: "Pune, India",
  tagline: "Systems engineer at the Python, C++ and Rust boundary.",
  intro:
    "Core maintainer of mssql-python, Microsoft's open-source Python driver for SQL Server. I make database connectivity measurably faster, and I ship production AI.",
  email: "gauravsharma2696@gmail.com",
  github: "https://github.com/bewithgaurav",
  linkedin: "https://www.linkedin.com/in/bewithgaurav",
  url: "https://bewithgaurav.github.io",
};

const repo = {
  mssqlPython: "https://github.com/microsoft/mssql-python",
  mssqlDjango: "https://github.com/microsoft/mssql-django",
  mssqlRs: "https://github.com/microsoft/mssql-rs",
};

export const about = [
  "I'm a systems engineer with eight years across performance-critical infrastructure, backend product and customer-facing R&D. Today I'm on Microsoft's Azure SQL Drivers team, where I'm a core maintainer of mssql-python: Microsoft's open-source Python client for SQL Server, built on a C++ core. I took it from pre-release to 1.0 GA, and it now sees over 2.7M downloads a month.",
  "My work centres on latency and throughput at the Python, C++ and Rust boundary, and the driver speedups below (21x write path, 21.8x hot loop, 75x bulk load) were each measured under controlled benchmarking. I also ship AI: a production multi-agent system at Microsoft, and a real-time voice AI assistant outside work.",
  "Before Microsoft: fintech backend at Fyle, production LLM features at Letterdrop in 2022, and four years of automotive sound-quality R&D at HARMAN, including a year onsite in Japan. Looking back, my career has been a steady descent down the stack: frontend, backend, C++ and PyBind11, the CPython C API, and now Rust and TDS.",
];

export const stack = [
  { layer: "Python", items: ["mssql-python API", "SQLAlchemy", "Django"] },
  { layer: "C++", items: ["CPython C API", "PyBind11", "ODBC"] },
  { layer: "Rust", items: ["TDS core", "Tokio", "PyO3"] },
  { layer: "Wire", items: ["TDS", "SQL Server"] },
];

export const scaleAsOf = "Nov 2026";

export const scale = [
  { value: "2.7M+", label: "PyPI downloads a month", href: "https://pypi.org/project/mssql-python/" },
  { value: "1.0", label: "GA, taken from pre-release", href: `${repo.mssqlPython}/releases` },
  { value: "33", label: "releases, 19 of them since GA", href: `${repo.mssqlPython}/releases` },
  { value: "14 days", label: "median gap between releases since GA" },
  { value: "221", label: "merged PRs, Microsoft SQL driver repos" },
  { value: "298", label: "PRs reviewed for other contributors" },
];

export type Benchmark = {
  name: string;
  metric: string;
  before: { value: number; label: string };
  after: { value: number; label: string };
  speedup: string;
  detail: string;
  link: Link;
};

export const benchmarks: Benchmark[] = [
  {
    name: "Write path",
    metric: "executemany latency",
    before: { value: 5.9, label: "5.9 s" },
    after: { value: 0.28, label: "0.28 s" },
    speedup: "21x",
    detail:
      "A staged series of native C++ parameter detection, arena allocation, dispatch tables and prepare caching took mssql-python from 17.4x slower than pyodbc to 1.3x faster.",
    link: { label: "mssql-python#549", href: `${repo.mssqlPython}/pull/549` },
  },
  {
    name: "Fetch hot loop",
    metric: "row construction, per batch",
    before: { value: 1355, label: "1,355 ms" },
    after: { value: 62, label: "62 ms" },
    speedup: "21.8x",
    detail:
      "Profiling showed row construction dominated, so I rewrote it from PyBind11 to the CPython C API. End to end, a 1.2M-row fetch went from 8.33s to 3.31s (2.5x).",
    link: { label: "mssql-python#320", href: `${repo.mssqlPython}/pull/320` },
  },
  {
    name: "Bulk copy",
    metric: "4M-row CSV load, against pyodbc executemany",
    before: { value: 55 * 60, label: "55 h" },
    after: { value: 44, label: "44 min" },
    speedup: "75x",
    detail:
      "I architected the async/sync interop bridge that drives bulk copy through a Rust TDS core on Tokio, using a streaming row-by-row path with direct-to-wire serialization.",
    link: { label: "mssql-rs/mssql-py-core", href: `${repo.mssqlRs}/tree/main/mssql-py-core` },
  },
  {
    name: "Schema reflection",
    metric: "SQLAlchemy MetaData.reflect, 250 tables",
    before: { value: 12.62, label: "12.62 s" },
    after: { value: 1.15, label: "1.15 s" },
    speedup: "11x",
    detail:
      "Replaced per-table reflection loops in SQLAlchemy's SQL Server dialect with five native get_multi_* methods. Foreign keys got 37x faster, primary keys 18x and comments 14x.",
    link: {
      label: "sqlalchemy@c84c7b2",
      href: "https://github.com/sqlalchemy/sqlalchemy/commit/c84c7b2ffccecb5249fcc8ec01c400ca2867dbe5",
    },
  },
];

export type Card = {
  name: string;
  context: string;
  body: string;
  points?: string[];
  tags: string[];
  links?: Link[];
};

export const openSource: Card[] = [
  {
    name: "mssql-python",
    context: "Core maintainer · 2024 to now",
    body: "Microsoft's open-source Python driver for SQL Server: a Python client over a C++ core. I took it from pre-release to 1.0.0 GA in Nov 2025 (33 releases in all; the 19 since GA a median of two weeks apart), and from Windows-only to a 34-wheel release matrix across macOS, Linux and Windows.",
    tags: ["Python", "C++", "CPython C API", "PyBind11", "ODBC", "CMake", "cibuildwheel"],
    links: [
      { label: "GitHub", href: repo.mssqlPython },
      { label: "PyPI", href: "https://pypi.org/project/mssql-python/" },
    ],
  },
  {
    name: "mssql-django",
    context: "Release owner · 1.7.x, 1.8.0, 2.0.0",
    body: "The Django backend for SQL Server. Version 2.0.0 integrated mssql-python as a backend and enforced a six-Django, six-Python support matrix. I shipped Django 6.1 support 39.3 hours after Django's GA across 12 PRs, with 42/42 CI jobs green on the first run.",
    tags: ["Django", "Python", "SQL Server", "Azure DevOps", "GitHub Actions"],
    links: [
      { label: "GitHub", href: repo.mssqlDjango },
      { label: "PyPI", href: "https://pypi.org/project/mssql-django/" },
    ],
  },
  {
    name: "SQLAlchemy",
    context: "Upstream contributor · merged for 2.1",
    body: "Native multi-table reflection for the SQL Server dialect. Reviewed by the core maintainers, and I'm committed to triaging SQL Server reflection regressions after the merge.",
    tags: ["Python", "SQLAlchemy", "SQL Server"],
    links: [
      {
        label: "Commit",
        href: "https://github.com/sqlalchemy/sqlalchemy/commit/c84c7b2ffccecb5249fcc8ec01c400ca2867dbe5",
      },
    ],
  },
];

export const ai: Card[] = [
  {
    name: "Production multi-agent system",
    context: "Microsoft · 2026",
    body: "Designed and shipped a conversational agent on Microsoft Copilot Studio with Model Context Protocol (MCP) tools, delivered through Microsoft Teams. It grew from a monolithic-prompt prototype into an orchestrator agent delegating to a specialist sub-agent, with topic routing and Power Automate flows.",
    points: [
      "Shipped 6 conversational capabilities.",
      "A daily Adaptive Card report turned an hour-long recurring review meeting into a decision forum.",
    ],
    tags: ["Copilot Studio", "MCP", "Power Automate", "Microsoft Teams"],
  },
  {
    name: "Perf Police",
    context: "Open source · mssql-python",
    body: "An agentic performance-review workflow composing reusable code-review, native-performance-review and profiler-operation skills, for ownership and lifetime checks, bounded profiling, raw timelines and paired comparisons. It complements advisory benchmark reports with human-reviewed evidence, rather than making merge decisions.",
    points: [
      "Also built executable AI review probes, a shared code-review skill, path-scoped agent instructions and Copilot prompts into the driver repositories.",
    ],
    tags: ["AI code review", "Agent skills", "Profiling"],
    links: [{ label: "mssql-python#776", href: `${repo.mssqlPython}/pull/776` }],
  },
  {
    name: "Buddy",
    context: "Voice-first AI assistant · 2025 to now",
    body: "A production speech-to-speech pipeline I built and operate on managed APIs, bridging phone (G.711 μ-law, 8 kHz) and browser (PCM16, 24 kHz) calls over WebSockets to Azure OpenAI GPT-Realtime. It has per-path VAD tuning, noise reduction, barge-in with debounced playback cancellation, per-user routing to a managed fallback, and a write-ahead transcript log with restart-safe delivery. Validated at 1,283.5 ms median and 1,418 ms p95 time to first audio.",
    points: [
      "Traced Whisper hallucinations on non-speech input (echo, wind, traffic) to their root causes, including one that produced a false safety refusal, and eliminated them.",
      "Designed five-layer long-term memory, assembled per call to balance recall against latency and cost.",
      "Measured native search recall on three months of real conversations (8/10 and 6/8) and chose not to add embeddings and a vector store.",
      "Per-user OAuth into each user's own Notion workspace, so the backend stores no conversation content.",
      "Rebuilt Hindi voice calling fully streaming, from ~2.3s per turn to ~1s.",
    ],
    tags: ["Azure OpenAI Realtime", "Whisper", "Twilio Media Streams", "WebSockets", "AudioWorklet", "FastAPI"],
  },
  {
    name: "Self-hosted LLM agent platform",
    context: "Independent · 2025 to now",
    body: "A multi-model gateway routing across several providers, plus always-on agents, on a small Azure fleet with a split public/private network plane, held within a fixed monthly cost cap.",
    tags: ["Azure", "Docker", "Tailscale", "MCP", "LLM APIs"],
  },
];

export type Role = {
  title: string;
  team?: string;
  location?: string;
  start: string;
  end: string;
  points: string[];
};

export type Job = { org: string; href?: string; roles: Role[] };

export const experience: Job[] = [
  {
    org: "Microsoft",
    href: "https://www.microsoft.com",
    roles: [
      {
        title: "Software Development Engineer II",
        team: "Azure SQL Drivers",
        start: "Jul 2024",
        end: "Present",
        points: [
          "**Concurrency:** diagnosed customer-reported GIL starvation on blocking ODBC calls that stalled asyncio event loops (~50 missed heartbeats per 5s call), and released the GIL across ~30 call scopes. Separately resolved a GIL/mutex deadlock under concurrent multithreaded logging.",
          "**Performance architecture:** defined the binding layer's six reusable performance patterns (RAII refcount discipline, marshalling in C, dispatch tables, GIL release, batch boundary crossing, arena allocation) with an enforcement roadmap and anti-pattern detection, then drove them into the codebase.",
          "**Measurement:** built a two-layer native profiler (45 C++ and 18 Python probes, ~0% overhead when disabled) and per-PR performance reports comparing merge-base against PR head across 21 workloads on SQL Server 2022/2025. Buffer tuning separately cut ODBC fetch time 54% and total query time 16.8%.",
          "**Cross-platform delivery:** took the driver from Windows-only to a 34-wheel release matrix across macOS (Intel, ARM64, universal), Linux (Debian, RHEL, Alpine, SUSE) and Windows (x64, ARM64), and cut CI build time 5-10x with pre-built toolchain images.",
          "**Adversarial testing:** built a bug-hunting framework combining differential testing against a reference driver, runtime sanitizers (ASan, UBSan, LSan, TSan) and coverage-guided fuzzing, which surfaced 18 real defects, 5 critical, in a single session.",
          "**Security and identity:** delivered Entra ID authentication and extended it to bulk copy; added security compiler options, CodeQL scanning and parser-based connection-string sanitization; led SDL compliance onboarding and wrote the playbook sibling drivers now follow.",
          "**Reliability:** hardened cursor, connection, pool and interpreter-shutdown cleanup against segfaults, and built a logging framework bridging the Python and C++ layers.",
          "**Community:** scoped community-reported defects with enough design context that external contributors could land fixes independently, in one case within a day.",
        ],
      },
    ],
  },
  {
    org: "HappyFox",
    href: "https://www.happyfox.com",
    roles: [
      {
        title: "Backend Engineer",
        start: "May 2024",
        end: "Jul 2024",
        points: ["Backend development for the Business Intelligence product platform (Python/Django, PostgreSQL)."],
      },
    ],
  },
  {
    org: "Fyle",
    href: "https://www.fylehq.com",
    roles: [
      {
        title: "Member of Technical Staff 3",
        team: "Corporate Cards",
        start: "Jan 2023",
        end: "Apr 2024",
        points: [
          "Owned critical features for Visa and Mastercard Real-Time Feeds and the Budgets module in a production expense-management platform (Python/Django, PostgreSQL).",
          "Ran periodic and emergency Kubernetes deployments across Indian and US clusters as part of the backend deploy rotation.",
          "Rewrote test suites to raise code coverage, and wrote the engineering design documents behind feature work and bug fixes.",
        ],
      },
    ],
  },
  {
    org: "Letterdrop",
    href: "https://letterdrop.com",
    roles: [
      {
        title: "Full Stack Developer",
        location: "Remote",
        start: "Aug 2022",
        end: "Jan 2023",
        points: [
          "Led a customer-critical initiative extracting insights from sales-call transcripts with Python/Flask and the OpenAI APIs: production LLM work in 2022.",
          "Integrated OpenAI-powered autocomplete into the CMS platform's content editor.",
          "Delivered full-stack features on the MERN stack with Heroku, Doppler and serverless GCP Functions.",
        ],
      },
    ],
  },
  {
    org: "HARMAN International",
    href: "https://www.harman.com",
    roles: [
      {
        title: "Engineer II, Software & Acoustics Engineering",
        location: "Pune",
        start: "Dec 2020",
        end: "Aug 2022",
        points: [
          "Built full-stack platforms and data-analysis dashboards for global custom R&D studies (Python/Django/SQL).",
          "Led Car Audio Benchmarking India and ran critical listening sessions for employees and OEMs.",
        ],
      },
      {
        title: "LEAP Engineer, Experiential R&D",
        location: "Nagoya, Japan",
        start: "Nov 2019",
        end: "Dec 2020",
        points: [
          "One-year onsite rotation with the Global Experiential R&D team at HARMAN Japan.",
          "Built custom software for configuration studies, preference tests and sound-quality analysis for OEMs including Toyota/Lexus and Subaru, and a full-stack web portal used to train and assess listeners.",
        ],
      },
      {
        title: "LEAP Engineer, Software & Acoustics Engineering",
        location: "Pune",
        start: "Jun 2018",
        end: "Nov 2019",
        points: [
          "Selected into HARMAN's LEAP leadership program; led the Benchmarking India initiative, coordinating with the global team.",
          "Worked with the Connected Car division to integrate new audio technologies, supporting testing and tuning of branded and non-branded automotive audio systems.",
        ],
      },
    ],
  },
];

export const earlier = [
  {
    org: "Equiphunt",
    title: "Backend Developer Intern",
    when: "2017",
    text: "Designed the database and built APIs for a Lead Management System with 10+ user roles (PHP, MySQL).",
  },
  {
    org: "Aspiring Minds",
    title: "Code Evaluator Intern",
    when: "2016",
    text: "Evaluated 1,000+ C++ and Java algorithm and data-structure submissions for clarity and efficiency.",
  },
  {
    org: "CodeUtsava, NIT Raipur",
    title: "Web Developer & Organizer",
    when: "2016 to 2018",
    text: "Built the official website for the first edition of the annual CS festival, then joined the core committee for the second, handling sponsorships, onsite technical operations and problem statements.",
  },
];

export const skills = [
  { label: "Languages", items: ["Python", "C++", "Rust", "SQL", "JavaScript"] },
  {
    label: "Systems",
    items: ["CPython C API", "PyBind11", "PyO3", "ODBC", "TDS", "Tokio", "Concurrency and GIL management", "Memory safety"],
  },
  {
    label: "Performance and quality",
    items: [
      "Profiling and instrumentation",
      "Benchmark design",
      "Regression detection",
      "Differential testing",
      "Coverage-guided fuzzing",
      "ASan/UBSan/LSan/TSan",
    ],
  },
  {
    label: "AI and agents",
    items: [
      "Multi-agent orchestration",
      "Microsoft Copilot Studio",
      "Model Context Protocol (MCP)",
      "LLM memory and context engineering",
      "Retrieval evaluation",
      "Azure OpenAI",
      "OpenAI APIs",
    ],
  },
  {
    label: "Voice",
    items: ["Real-time speech-to-speech", "Streaming STT and TTS", "Whisper", "VAD and barge-in tuning", "Twilio Media Streams"],
  },
  {
    label: "Build, cloud and security",
    items: ["CMake", "cibuildwheel", "Azure DevOps", "GitHub Actions", "Docker", "Kubernetes", "Azure", "Entra ID", "OAuth", "CodeQL"],
  },
  {
    label: "Data and frameworks",
    items: ["SQL Server", "PostgreSQL", "MongoDB", "MySQL", "Django", "SQLAlchemy", "FastAPI", "Flask", "React"],
  },
];

export const beyond = [
  {
    title: "B.Tech, Information Technology",
    detail: "National Institute of Technology, Raipur · 2014 to 2018",
  },
  {
    title: "ACM ICPC regional qualifier, 2015 and 2017",
    detail: "College-topper team both years, competing at the Chennai and Gwalior regionals.",
  },
  {
    title: "Competitive programming",
    detail:
      "500+ problems solved and 200+ contests across HackerEarth, CodeChef and HackerRank, with several top-20 placements. Problem setter for HackerEarth's Breaking Code 1.0 and 2.0 and Narcodes.",
  },
  {
    title: "HARMAN LEAP leadership program",
    detail: "Selected into the program, including a one-year international rotation in Japan.",
  },
  {
    title: "Away from the keyboard",
    detail: "Trained JBL listener, and a lifelong musician and guitarist.",
  },
];
