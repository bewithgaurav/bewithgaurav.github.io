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
  tagline: "Software engineer building fast database infrastructure and production AI.",
  intro:
    "Core maintainer of mssql-python at Microsoft. Shipped production LLM features in 2022; today, a production multi-agent system at work and a real-time voice assistant of my own.",
  email: "gauravsharma2696@gmail.com",
  github: "https://github.com/bewithgaurav",
  linkedin: "https://www.linkedin.com/in/bewithgaurav",
  url: "https://bewithgaurav.github.io",
};

const repo = {
  mssqlPython: "https://github.com/microsoft/mssql-python",
  mssqlDjango: "https://github.com/microsoft/mssql-django",
};

export const about = [
  "I work on two things: the layer where Python meets C++ and SQL Server, and production AI. At Microsoft I'm a core maintainer of mssql-python, taken from pre-release to 1.0 GA and now at ~3M downloads a month, and I designed and shipped a production multi-agent system. Outside work I run Buddy, a real-time voice assistant I built, and a live data product that AI coding agents build under my direction.",
  "The path here wasn't straight: competitive programming, four years of automotive sound-quality R&D at HARMAN, LLM features in 2022, then fintech backend. The sound years stuck. Training as a JBL listener means structured A/B testing and distrust of any result that only looks good, and that maps directly onto how I do performance work.",
];

export const stack = [
  {
    layer: "Python",
    items: ["mssql-python", "SQLAlchemy", "FastAPI", "cibuildwheel"],
    where: "Microsoft, open source, Buddy",
  },
  {
    layer: "C++",
    items: ["CPython C API", "PyBind11", "ODBC", "CMake"],
    where: "Microsoft",
  },
  {
    layer: "Django / Flask",
    items: ["Django", "Flask", "PostgreSQL", "SQL Server"],
    where: "Fyle, HappyFox, HARMAN, Letterdrop, mssql-django",
  },
  {
    layer: "Agents",
    items: ["GitHub Copilot", "Copilot Studio", "MCP", "Agent skills", "Hermes Agent", "OpenClaw"],
    where: "Microsoft, independent projects",
  },
  {
    layer: "AI",
    items: ["Azure OpenAI Realtime", "OpenAI APIs", "Whisper", "Vision LLMs"],
    where: "Buddy, Letterdrop, independent product",
  },
];

export const scaleAsOf = "Nov 2026";

export const scale = [
  { value: "~3M", label: "PyPI downloads a month, 3.7M at peak", href: "https://pypi.org/project/mssql-python/" },
  { value: "1.0", label: "GA, taken from pre-release", href: `${repo.mssqlPython}/releases` },
  { value: "33", label: "releases, 19 of them since GA", href: `${repo.mssqlPython}/releases` },
  { value: "14 days", label: "median gap between releases since GA" },
  { value: "240+", label: "merged pull requests on GitHub" },
  { value: "300+", label: "pull requests reviewed for other contributors" },
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

export const aiLede =
  "I shipped production LLM features in 2022, well before they were commonplace. Today that means a production multi-agent system at Microsoft, agentic code review in the driver repositories, a real-time voice assistant, and a self-hosted fleet of agents.";

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
    name: "Buddy",
    context: "Voice-first AI assistant · 2025 to now",
    body: "A real-time voice assistant I built and operate on managed APIs. Phone (G.711 μ-law, 8 kHz) and browser (PCM16, 24 kHz) audio stream over WebSockets to Azure OpenAI GPT-Realtime, with per-path VAD tuning, noise reduction, barge-in and a write-ahead transcript log. Validated at 1,283.5 ms median and 1,418 ms p95 time to first audio.",
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
    name: "Perf Police",
    context: "Open source · mssql-python",
    body: "An agentic performance-review workflow composing reusable code-review, native-performance-review and profiler-operation skills, for ownership and lifetime checks, bounded profiling, raw timelines and paired comparisons. It complements advisory benchmark reports with human-reviewed evidence, rather than making merge decisions.",
    points: [
      "Also built executable AI review probes, a shared code-review skill, path-scoped agent instructions and Copilot prompts into the driver repositories.",
    ],
    tags: ["AI code review", "Agent skills", "GitHub Copilot", "Profiling"],
    links: [{ label: "mssql-python#776", href: `${repo.mssqlPython}/pull/776` }],
  },
  {
    name: "Self-hosted agent platform",
    context: "Independent · 2025 to now",
    body: "Always-on, Slack-connected agents on two frameworks: OpenClaw on a small Azure VM, and Hermes Agent on my Mac as an orchestrator plus per-project agents, each with its own model and skills. Scheduled reporting jobs, an OpenAI-compatible multi-model gateway, and a split public/private network over Tailscale.",
    tags: ["OpenClaw", "Hermes Agent", "Slack", "MCP", "Tailscale", "Azure"],
  },
  {
    name: "Sales-call insights and editor autocomplete",
    context: "Letterdrop · 2022",
    body: "Led a customer-critical initiative extracting insights from sales-call transcripts with Python/Flask and the OpenAI APIs, and integrated OpenAI-powered autocomplete into the CMS platform's content editor.",
    tags: ["OpenAI APIs", "Python", "Flask"],
  },
];

export const productLede =
  "An independent product I run as a one-person team. AI coding agents propose and build; I set direction and approve architecture, production deploys and anything sent to users.";

export const product: Card = {
  name: "A live real-estate data product",
  context: "Independent · 2026 to now",
  body: "Turns a public real-estate registry into a readable change feed. It re-syncs tracked records daily, diffs them for material changes, and extracts tables from filed PDFs with a vision LLM, all built by agents working under written ground rules.",
  points: [
    "Two-tier diff engine: 10 typed handlers plus a recursive JSON catch-all, behind a noise filter that hides ~49k meaningless legacy change rows from public reads and cut the noisiest record's history from 20 rows to 3.",
    "Vision-LLM extraction renders filed PDFs to page images and pulls unit-level tables, with versioned prompts loaded at runtime; 749 rows extracted across 3 projects by June 2026.",
    "Per-task git worktrees, tracker issues synced both ways with GitHub, repository agent instructions, and pytest CI on every push and pull request, with the suite growing from 39 test functions when CI was added (Aug 2026) to 683 (Oct 2026).",
    "Approval gates in the agents' ground rules, plus independent read-only reviewer agents that caught real defects green tests had missed.",
    "One small Azure VM runs production and an isolated staging environment, with Cloudflare in front of an origin that refuses direct HTTP(S), a tailnet-only admin and deploy plane, and a graceful reload that passed 90 of 90 route checks.",
  ],
  tags: ["Agentic development", "Hermes Agent", "OpenClaw", "FastAPI", "SQLite", "Vision LLMs", "Cloudflare", "Azure"],
};

export const takeaways = [
  {
    title: "Prove every route has a handler",
    text: "A dispatcher sent some cases away from its fallback to handlers that didn't exist, and a whole class of changes stayed invisible for months. Guard that invariant with a test.",
  },
  {
    title: "Invest by volume times relevance",
    text: "The most common, most user-relevant change type sat in the generic catch-all while a 22-row type had a dedicated handler.",
  },
  {
    title: "Check the join before declaring data lost",
    text: "Names on legacy rows looked unrecoverable. 1,957 of 1,957 resolved through a key back to the stored raw payload.",
  },
  {
    title: "Passing tests are not a review",
    text: "Independent reviewer agents rejected real defects in changes whose suites were green, so high-risk changes get a separate reviewer.",
  },
  {
    title: "Fixtures should look like the source",
    text: "Convenient invented fixtures hid a real extraction failure; source-shaped ones, down to key-absent versus null, caught it before deploy.",
  },
  {
    title: "Make the gentle deploy the default",
    text: "One avoidable restart cost 69 seconds and 46 HTTP 502s. A graceful reload then passed 90 of 90 route checks.",
  },
  {
    title: "Ambiguous is not failed",
    text: "When a delivery provider's result is unclear, hold it and reconcile with evidence. An automatic retry risks a duplicate send.",
  },
  {
    title: "Schema lives in migrations",
    text: "A self-healing ALTER at startup split the source of truth. Schema belongs in numbered migrations that record their own ledger entry.",
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

export type Chapter = {
  when: string;
  where: string;
  theme: string;
  story: string;
  roles?: (Role & { org: string })[];
};

export const chapters: Chapter[] = [
  {
    when: "2024 to now",
    where: "Microsoft",
    theme: "A driver at scale, and agents",
    story:
      "Core maintainer of mssql-python and release owner for mssql-django: performance, reliability, security and releases for a driver at ~3M downloads a month, alongside a production multi-agent system.",
    roles: [
      {
        org: "Microsoft",
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
          "**Community:** scoped community-reported and out-of-scope defects with enough design context that external contributors could pick them up independently; in one case a community contributor opened a fix within a day.",
        ],
      },
    ],
  },
  {
    when: "2025 to now",
    where: "Independent",
    theme: "Agents, voice and a product",
    story:
      "Outside work: Buddy, my real-time voice assistant; a self-hosted agent platform on OpenClaw and Hermes Agent; and a live real-estate data product that AI coding agents build under my direction.",
  },
  {
    when: "2023 to 2024",
    where: "Fyle, HappyFox",
    theme: "Fintech and BI backend",
    story:
      "Owned critical features for Visa and Mastercard Real-Time Feeds and the Budgets module at Fyle, and took my turn on Kubernetes deploys across Indian and US clusters. Then backend work on HappyFox's Business Intelligence platform.",
    roles: [
      {
        org: "HappyFox",
        title: "Backend Engineer",
        start: "May 2024",
        end: "Jul 2024",
        points: ["Backend development for the Business Intelligence product platform (Python/Django, PostgreSQL)."],
      },
      {
        org: "Fyle",
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
    when: "2022 to 2023",
    where: "Letterdrop",
    theme: "LLMs in production, early",
    story:
      "A remote full-stack role at a B2B content platform, where I shipped LLM features on the OpenAI APIs in 2022.",
    roles: [
      {
        org: "Letterdrop",
        title: "Full Stack Developer",
        location: "Remote",
        start: "Aug 2022",
        end: "Jan 2023",
        points: [
          "Led a customer-critical initiative extracting insights from sales-call transcripts with Python/Flask and the OpenAI APIs.",
          "Integrated OpenAI-powered autocomplete into the CMS platform's content editor.",
          "Delivered full-stack features on the MERN stack with Heroku, Doppler and serverless GCP Functions.",
        ],
      },
    ],
  },
  {
    when: "2018 to 2022",
    where: "HARMAN International",
    theme: "Where software met sound",
    story:
      "Joined through the LEAP leadership program and spent four years between code and acoustics: R&D platforms and listener tools in Python and Django, study software for OEMs including Toyota/Lexus and Subaru during a year in Nagoya, Car Audio Benchmarking India, and training as a JBL listener.",
    roles: [
      {
        org: "HARMAN",
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
        org: "HARMAN",
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
        org: "HARMAN",
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
  {
    when: "2014 to 2018",
    where: "NIT Raipur",
    theme: "Problem solving",
    story:
      "B.Tech in Information Technology. ACM ICPC regional qualifier in 2015 and 2017 with the college-topper team, 500+ problems solved across HackerEarth, CodeChef and HackerRank, and the website for the first edition of CodeUtsava, the college's annual CS festival.",
    roles: [
      {
        org: "Equiphunt",
        title: "Backend Developer Intern",
        location: "Hyderabad",
        start: "May 2017",
        end: "Jul 2017",
        points: ["Designed the database and built APIs for a Lead Management System with 10+ user roles (PHP, MySQL)."],
      },
      {
        org: "Aspiring Minds",
        title: "Code Evaluator Intern",
        start: "May 2016",
        end: "Aug 2016",
        points: ["Evaluated 1,000+ C++ and Java algorithm and data-structure submissions for clarity and efficiency."],
      },
      {
        org: "CodeUtsava, NIT Raipur",
        title: "Web Developer & Organizer",
        start: "Dec 2016",
        end: "Feb 2018",
        points: [
          "Built the official website for the first edition (Python Flask, MySQL), then joined the core committee for the second, handling sponsorships, onsite technical operations and problem statements.",
          "Problem setter for HackerEarth's Breaking Code 1.0 and 2.0 and Narcodes contests, and author of problem editorials.",
        ],
      },
    ],
  },
];

export const offKeyboard = "Away from the keyboard: a trained JBL listener, and a lifelong musician and guitarist.";

export const principles = [
  {
    title: "Measure before believing",
    text: "I treat a measurement as untrustworthy until the experiment is sound. When agreement across paired runs is weak, I mark the result inconclusive, and I invest in variance reduction rather than report a flattering number.",
  },
  {
    title: "Fix the cause",
    text: "I trace defects to their architectural root cause. When a workaround is the right call, it still names the cause and tracks it separately.",
  },
  {
    title: "Scope tightly, hand off well",
    text: "I don't grow a change mid-flight. Out-of-scope defects get filed with enough design context that someone else can pick them up; in one case a community contributor opened a fix within a day.",
  },
  {
    title: "Agents propose, a human decides",
    text: "On my own product, AI coding agents propose and build while I approve architecture, pushes, production deploys and anything sent to users. At work, agentic performance review adds human-reviewed evidence rather than making merge decisions.",
  },
];

export const skills = [
  { label: "Languages", items: ["Python", "C++", "SQL", "JavaScript"] },
  {
    label: "Systems",
    items: ["CPython C API", "PyBind11", "ODBC", "Concurrency and GIL management", "Memory safety"],
  },
  {
    label: "Agentic frameworks",
    items: [
      "GitHub Copilot",
      "Microsoft Copilot Studio",
      "Model Context Protocol (MCP)",
      "Agent skills",
      "Hermes Agent",
      "OpenClaw",
      "Reviewer agents and approval gates",
    ],
  },
  {
    label: "AI",
    items: [
      "Multi-agent orchestration",
      "LLM memory and context engineering",
      "Retrieval evaluation",
      "Vision LLM extraction",
      "Azure OpenAI",
      "OpenAI APIs",
    ],
  },
  {
    label: "Voice",
    items: ["Real-time speech-to-speech", "Streaming STT and TTS", "Whisper", "VAD and barge-in tuning", "Twilio Media Streams"],
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
    label: "Web and data",
    items: ["Django", "Flask", "FastAPI", "React", "SQL Server", "PostgreSQL", "SQLite", "MongoDB", "MySQL", "SQLAlchemy"],
  },
  {
    label: "Build, cloud and security",
    items: ["CMake", "cibuildwheel", "Azure DevOps", "GitHub Actions", "Docker", "Kubernetes", "Azure", "Cloudflare", "Entra ID", "OAuth", "CodeQL"],
  },
];

export const highlights = [
  { value: "~3M", label: "mssql-python downloads a month" },
  { value: "21x", label: "faster write path" },
  { value: "2022", label: "LLM features shipped at Letterdrop" },
  { value: "1.28s", label: "validated p50 first audio, voice AI" },
];
