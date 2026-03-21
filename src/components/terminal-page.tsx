"use client";

import React, { useEffect, useState, useCallback, useRef, useMemo } from "react";
import NextImage from "next/image";

const ACCENT = "#08fff3";

// ─── Project data ─────────────────────────────────────────────────────────────
const PROJECTS = [
  {
    id: "louvre_robbery_agent", hot: true,
    tagline: "multi-modal agents simulating 3D spatial heists",
    stack: "AI SDK · Three.js · YOLOv11 · Llama 4 Vision · RL",
    status: "Test pilot with 1 museum",
    description:
      "An army of multimodal vision agents simulate museum heists in 3D and\n" +
      "find the best preventive security solutions in every scenario.\n" +
      "Agents perceive spatial layout via VLMs, plan optimal routes,\n" +
      "coordinate attacks — while a parallel defensive agent responds live.\n\n" +
      "",
    liveUrl: "https://www.anyfend.com/",
    liveLabel: "Website",
    secondUrl: "https://x.com/1HeathSun/status/1984472445005545991",
    secondLabel: "HackHalloween Costume",
    videoUrl: null,
    image: "/anyfend.gif",
  },
  {
    id: "dump", hot: false,
    tagline: "Voice-powered agent bestie for navigating breakups",
    stack: "ElevenLabs · Vapi · Google Cloud · Voice AI",
    status: "Winner @ AI Valley × Google Hackthon",
    description:
      "A voice-powered agent bestie that helps users navigate breakups.\n\n" +
      "Winner @ AI Valley × Google Hackthon (sponsored by Google, 11labs, Vapi etc.)",
    liveUrl: "https://www.linkedin.com/feed/update/urn:li:activity:7375413213108031488/",
    liveLabel: "LinkedIn Post",
    videoUrl: null,
    image: null,
  },
  {
    id: "travel_rewind", hot: false,
    tagline: "Turn your photo gallery into a cinematic travel story",
    stack: "Gemini 2.5 Flash · Veo 3 · Lyria 3 · Leaflet · ElevenLabs · LiveKit",
    status: "YC × DeepMind Hackathon",
    description:
      "Drop your travel photos in — get a cinematic vlog out. Parses EXIF\n" +
      "data to map locations and timelines, runs batch vision analysis with\n" +
      "Gemini 2.5 Flash for scene/landmark/emotion detection, then generates\n" +
      "animated keyframe videos (Veo 3), chapter music (Lyria 3), and\n" +
      "voiceover narration (ElevenLabs + LiveKit) into a complete travel film.",
    liveUrl: "https://x.com/1HeathSun/status/2031168052520477150",
    liveLabel: "X Post",
    secondUrl: "https://assets.heathsun.dev/Travel-Rewind.pdf",
    secondLabel: "Deck",
    videoUrl: null,
    image: null,
  },
  {
    id: "1CGA_auto_grader", hot: true,
    tagline: "Agentic STEM rubric evaluator via tool-calling (Gemini 2.5 Pro)",
    stack: "Next.js 15 · React · Gemini 2.5 Pro · AI SDK · Cloudflare R2",
    status: "Active prototype",
    description:
      "One click to grade them all. One tool-call to find them.\n\n" +
      "Rubric-customizable STEM paper grading agent using Gemini 2.5 Pro's\n" +
      "extended context window for batch evaluation. Reduces TA workload ~90%.\n" +
      "Custom rubrics via natural language. Edge-deployed on Cloudflare.",
    liveUrl: null,
    videoUrl: "https://www.youtube.com/embed/1NKYhTdQDvA",
    image: "/1CGA-Cover.gif",
  },
  {
    id: "mr_speech_segmentation", hot: false,
    tagline: "Zero-shot speech-guided segmentation for Mixed Reality",
    stack: "Python · YOLOv11 · Whisper · VLMs · Unity · PyAudio",
    status: "Research prototype — Cobot Maker Space",
    description:
      "Zero-shot system combining real-time visual-language understanding\n" +
      "with speech-guided interaction for Mixed Reality. Handles multi-class\n" +
      "segmentation, instance counting, and spatial localization through a\n" +
      "unified architecture. Evaluated on 1,000+ instances across 80 classes\n" +
      "using Lovelace, a custom generative evaluator simulating human queries.",
    liveUrl: null,
    videoUrl: "https://www.youtube.com/embed/x0N8hm2HnAw",
    image: null,
  },
  {
    id: "a42z_judge", hot: false,
    tagline: "AI hackathon judge — runner-up @ AdventureX",
    stack: "Next.js · Pinecone · Dify · Apify · Perplexity · Groq",
    status: "Deployed → judge.a42z.ai",
    description:
      "Agentic hackathon judging pipeline. Scrapes submissions via Apify,\n" +
      "embeds with Pinecone, cross-references live data via Perplexity,\n" +
      "and generates structured evaluation reports.\n" +
      "Processes 100+ projects in minutes.",
    liveUrl: "https://judge.a42z.ai/",
    liveLabel: "Website",
    secondUrl: "https://github.com/HS1CMU/a42z-Judge",
    secondLabel: "GitHub",
    videoUrl: null,
    image: "/a42z-judge.gif",
  },
  {
    id: "abovesaid", hot: false,
    tagline: "Agentic personal knowledge layer as a Chrome extension",
    stack: "TypeScript · React · Vite · Minimax AI · Chrome Extension",
    status: "MVP → v1.0",
    description:
      "AI-powered browser extension that auto-distills web content into\n" +
      "trusted, structured intelligence as you read. Semantic classification\n" +
      "scores every sentence by importance and type (claims, evidence,\n" +
      "reasoning, counterpoints). Builds a local knowledge graph that fuels\n" +
      "RAG pipelines and personalized LLM context injection.\n\n" +
      "Next milestone: Deep Search provenance engine + agentic knowledge vault.",
    liveUrl: "https://github.com/HS1CMU/Abovesaid",
    liveLabel: "GitHub",
    videoUrl: null,
    image: null,
  },
  {
    id: "signfold_browser_use", hot: false,
    tagline: "Hybrid Web/Local automation daemon via browser-use & Playwright",
    stack: "Next.js 15 · Python · Playwright · browser-use · GPT-5",
    status: "Active prototype",
    description:
      "A zero-friction cross-platform subscription router that automates\n" +
      "SaaS sign-ups, form fills, and account orchestration using a hybrid\n" +
      "browser-use + Playwright daemon. Runs locally as a background process\n" +
      "with a web UI. Built for teams managing multiple vendor accounts.",
    liveUrl: "https://devpost.com/software/signfold",
    liveLabel: "Devpost",
    videoUrl: "https://www.youtube.com/embed/5anULeLj8RI?start=3",
    image: null,
  },
  {
    id: "dark_web_evidential", hot: false,
    tagline: "OSINT data pipeline deployed for UK Law Enforcement",
    stack: "Python · Tor · NLP · PostgreSQL · FastAPI",
    status: "Deployed (restricted access)",
    description:
      "Automated OSINT pipeline that crawls dark web forums, extracts\n" +
      "evidential artifacts, and structures them for legal proceedings.\n" +
      "Deployed in collaboration with UK law enforcement agencies in Midland.\n\n" +
      "Entity recognition · cross-reference correlation · automated reports.",
    liveUrl: null,
    videoUrl: null,
    image: null,
  },
  {
    id: "tarot_nlp_quantified", hot: false,
    tagline: "NLP quantification of Barnum effect in Tarot systems (t-SNE)",
    stack: "Python · NLP · Sentence Transformers · t-SNE · Pandas",
    status: "Published analysis",
    description:
      "Quantified psychological mechanisms in tarot systems by measuring\n" +
      "the Barnum effect across Rider-Waite and Thoth decks. Used sentence\n" +
      "embeddings + t-SNE to visualize semantic distribution of readings.\n\n" +
      "Foundation research for FateAlgo's AI-native tarot product.",
    liveUrl: null,
    videoUrl: null,
    image: "/TarotCards.gif",
  },
  {
    id: "optogenetic_microneedle", hot: false,
    tagline: "AI-optimized light distribution for wound-healing microneedles",
    stack: "Python · Simulated Annealing · NumPy · Bioengineering",
    status: "Research — Zhejiang University",
    description:
      "Applied simulated annealing to model spatial heterogeneity of light\n" +
      "intensity for composite elastomer micro-needle arrays. Enables adaptive\n" +
      "customization based on 3D wound geometry for optogenetic cell control.\n\n" +
      "Part of multi-luminescence optogenetic platform for wound-healing.",
    liveUrl: null,
    videoUrl: null,
    image: null,
  },
  {
    id: "quantum_compiler", hot: false,
    tagline: "Hardware-decoupled quantum compiler with ZX-calculus",
    stack: "Haskell · Qiskit · ZX-Diagrams · USTC China",
    status: "Research — USTC",
    description:
      "Contributed to Quantric's hardware-decoupled quantum compiler.\n" +
      "Implemented superposition state control flows and compile-time\n" +
      "quantum error correction, achieving 20-50% fewer LOC vs IBM Qiskit.\n\n" +
      "Designed conversion algorithm: standard circuits ↔ ZX-diagrams.",
    liveUrl: null,
    videoUrl: null,
    image: null,
  },
  {
    id: "stateq", hot: false,
    displayName: "StateQ",
    tagline: "Experimental state-based quantum programming language",
    stack: "Compiler · Quantum control flow · Qif · ZX-calculus",
    status: "Challenge Cup national first prize (quantum programming)",
    description:
      "1. A STATE-CENTRIC PARADIGM WITH ADVANCED QUANTUM CONTROL FLOW\n" +
      "\n" +
      "StateQ introduces a fundamental shift in quantum programming by focusing\n" +
      "on the direct manipulation of quantum states rather than the traditional,\n" +
      "explicit construction of gate-level quantum circuits. This higher-level\n" +
      "abstraction aligns more intuitively with the mathematical formalisms of\n" +
      "quantum mechanics.\n" +
      "\n" +
      "Automatic Qubit Management: The framework eliminates the need for manual\n" +
      "qubit allocation, release, or resetting. The compiler automatically handles\n" +
      "these tasks, releasing unused ancillary qubits promptly to optimize\n" +
      "resources and reduce errors.\n" +
      "\n" +
      "True Quantum Control Flow: StateQ features a unique Qif statement that\n" +
      "replaces classical Boolean guards with a quantum Boolean. Unlike classical\n" +
      "if statements, if the control qubits are in superposition, the Qif statement\n" +
      "executes both branches simultaneously without measuring or collapsing the\n" +
      "state, enabling true coherent branching.\n" +
      "\n" +
      "2. EXCEPTIONAL CODE CONCISENESS AND DEVELOPER PRODUCTIVITY\n" +
      "\n" +
      "Because StateQ abstracts away tedious circuit details and utilizes intuitive\n" +
      "constructs, it drastically reduces the verbosity typically required to write\n" +
      "quantum algorithms. This conciseness improves code manageability, readability,\n" +
      "and the speed of algorithm development. In a benchmark comparing the Lines\n" +
      "of Code (LoC) across various frameworks, StateQ consistently required the\n" +
      "least amount of code:\n" +
      "\n" +
      "· Bernstein-Vazirani Algorithm: StateQ requires only 11 lines, compared to\n" +
      "  28 in Cirq and 32 in Q#.\n" +
      "· Grover's Algorithm: StateQ accomplishes this in 26 lines, vastly outperforming\n" +
      "  Cirq (45 lines) and Q# (64 lines).\n" +
      "· Shor's Algorithm: For complex algorithms, the gap widens significantly;\n" +
      "  StateQ requires just 58 lines, compared to 119 in Quipper, 188 in Cirq,\n" +
      "  and 269 in Q#.\n" +
      "\n" +
      "3. SUPERIOR COMPILATION SPEED AND HARDWARE-LEVEL CIRCUIT OPTIMIZATION\n" +
      "\n" +
      "Beyond writing the code, StateQ's multi-stage compiler and Quantum Circuit\n" +
      "Transpiler demonstrate massive performance advantages in translating high-level\n" +
      "code into hardware-executable instructions. In a test implementing a (4n+2)\n" +
      "qubit version of Shor's algorithm, StateQ was benchmarked against Qiskit and\n" +
      "Q#:\n" +
      "\n" +
      "Lightning-Fast Compilation: StateQ's code compile time was clocked between\n" +
      "0.203 and 0.214 seconds, heavily outperforming Q#'s 3.376 seconds.\n" +
      "\n" +
      "Rapid Transpilation: StateQ translated the abstract circuit into low-level\n" +
      "instructions in 0.112 to 1.294 seconds, while Qiskit took 53.664 seconds\n" +
      "(or 6.311 seconds with manual optimizations).\n" +
      "\n" +
      "Drastic Gate Count Reduction: A lower primitive gate count is crucial for\n" +
      "minimizing hardware noise. Utilizing its unique with statement (which reduces\n" +
      "multi-controlled gates) and a ZX-Calculus Optimization pass, StateQ generated\n" +
      "a circuit with only 27,920 primitive gates. In contrast, Qiskit produced\n" +
      "108,434 gates with optimized controls, and a staggering 900,546 gates without\n" +
      "them.\n" +
      "\n" +
      "",
    liveUrl: "https://assets.heathsun.dev/StateQ__An_Experimental_State_Based_Quantum_Programming_Language___New.pdf",
    liveLabel: "Full technical report (copyrighted)",
    videoUrl: null,
    image: null,
  },
  {
    id: "multi_agent_workflow", hot: false,
    tagline: "Multi-agent platform with digital human front-end for China Mobile",
    stack: "Python · LangChain · React · Digital Human SDK",
    status: "Delivered — China Mobile × Aihuashen",
    description:
      "Led six-member team to build a multi-agent workflow platform demo.\n" +
      "Digital human front-end for natural language interaction with backend\n" +
      "agents. Platform demo helped the company win the bid.\n\n" +
      "Also advised AI biography project for the Islamic world (AceGPT + KAUST).",
    liveUrl: null,
    videoUrl: null,
    image: null,
  },
  {
    id: "fate_algo_product", hot: false,
    displayName: "FateAlgo app iterations (e.g. Prophecat)",
    tagline: "World's first AI-native Tarot app — $60K fellowship, ZhenFund",
    stack: "Java Spring Boot · Vue.js · uni-app · GPT API · RAG · Figma",
    status: "Shut down → pivoted to AI agent consulting",
    image: "https://assets.heathsun.dev/Tarot.gif",
    description:
      "WHAT I BUILT\n" +
      "Architected a dynamic divination engine integrating GPT API and RAG\n" +
      "with a vector database for contextual, personalized tarot readings.\n" +
      "Built a microservices backend in Java Spring Boot with async processing\n" +
      "(Project Reactor Flux) serving 22K+ users. Drove end-to-end product\n" +
      "execution from Figma UI/UX to cross-platform frontend (Vue.js + uni-app).\n\n" +
      "THE INITIAL THESIS\n" +
      "When GPT-3.5 launched, hallucination was the biggest barrier to production.\n" +
      "I chose divination on a contrarian thesis: mysticism is the rare domain\n" +
      "where AI hallucination is a feature, not a bug. Generative ambiguity\n" +
      "enhances the Barnum effect, letting me ship a compelling consumer product\n" +
      "immediately.\n\n" +
      "POST-MORTEM: WHY I SHUT DOWN FATEALGO LTD\n" +
      "· Misaligned Value Prop — real profit comes from high-net-worth clients\n" +
      "  paying for human empathy; AI can't replicate this core value.\n" +
      "· Retention Problem — curiosity-driven, low-frequency users; novelty\n" +
      "  feature with near-impossible long-term retention.\n" +
      "· Zero Data Flywheel — accumulating reading data doesn't make the product\n" +
      "  more accurate or valuable. No defensible technical moat.\n" +
      "· Broken Scaling — cultural products are highly localized; adding new\n" +
      "  divination categories violates zero-marginal-cost scaling.\n\n" +
      "CORE FOUNDER INSIGHTS\n" +
      "1. Passion ≠ Market: a hobby doesn't automatically become a business.\n" +
      "2. Budget Hierarchy: make money > save money > entertain.\n" +
      "3. This hierarchy dictates WTP, GTM friction, and TAM ceiling.",
    liveUrl: null,
    videoUrl: null,
  },
];

// ─── GitHub contributions hook ───────────────────────────────────────────────
type ContribDay = { date: string; count: number; level: number };

function useGitHubContribs(username: string) {
  const [data, setData] = useState<ContribDay[]>([]);
  const [total, setTotal] = useState(0);
  useEffect(() => {
    const FALLBACK = `https://github-contributions-api.jogruber.de/v4/${username}`;

    fetch("/api/contributions")
      .then(async r => {
        if (!r.ok) {
          const body = await r.text();
          console.warn("[contribs] API route failed:", r.status, body);
          throw new Error(r.status.toString());
        }
        return r.json();
      })
      .then(json => {
        console.log("[contribs] API route OK, total:", json.total);
        setData(json.contributions ?? []);
        setTotal(json.total ?? 0);
      })
      .catch((err) => {
        console.warn("[contribs] Falling back to scraper…", err?.message);
        fetch(FALLBACK)
          .then(r => r.json())
          .then(json => {
            setData(json.contributions ?? []);
            const t: Record<string, number> = json.total ?? {};
            const sum = Object.values(t).reduce((a, b) => a + b, 0);
            console.log("[contribs] Scraper fallback total:", sum);
            setTotal(sum);
          })
          .catch(() => {});
      });
  }, [username]);
  return { data, total };
}

const LEVEL_COLORS: Record<number, string> = {
  0: `rgba(8,255,243,0.06)`,
  1: `rgba(8,255,243,0.25)`,
  2: `rgba(8,255,243,0.45)`,
  3: `rgba(8,255,243,0.7)`,
  4: ACCENT,
};

function ContribGraph({ data }: { data: ContribDay[] }) {
  const weeks = useMemo(() => {
    const map = new Map(data.map(d => [d.date, d]));
    const now = new Date();
    const start = new Date(now);
    start.setDate(start.getDate() - 363);
    start.setDate(start.getDate() - start.getDay());

    const result: ContribDay[][] = [];
    const cur = new Date(start);
    while (cur <= now) {
      const week: ContribDay[] = [];
      for (let d = 0; d < 7; d++) {
        const ds = cur.toISOString().split("T")[0];
        week.push(map.get(ds) ?? { date: ds, count: 0, level: 0 });
        cur.setDate(cur.getDate() + 1);
      }
      result.push(week);
    }
    return result;
  }, [data]);

  if (!data.length) return <div className="text-white/20 italic">loading contributions...</div>;

  return (
    <div className="flex gap-[2px]">
      {weeks.map((week, wi) => (
        <div key={wi} className="flex flex-col gap-[2px]">
          {week.map((day, di) => (
            <div
              key={di}
              className="w-[10px] h-[10px] rounded-[2px]"
              style={{ backgroundColor: LEVEL_COLORS[day.level] ?? LEVEL_COLORS[0] }}
              title={`${day.date}: ${day.count} contributions`}
            />
          ))}
        </div>
      ))}
    </div>
  );
}

// ─── ASCII image hook ─────────────────────────────────────────────────────────
const ASCII_CHARS = " .,:;+*%#@";
function useAsciiMedia(src: string | undefined, cols: number, ratio = 0.5): string {
  const [ascii, setAscii] = useState("");
  const raf = useRef<number>(0);
  useEffect(() => {
    if (!src) { setAscii(""); return; }
    cancelAnimationFrame(raf.current);
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    if (!ctx) return;
    const img = new Image();
    const isGif = src.toLowerCase().endsWith(".gif");
    const draw = () => {
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      const d = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
      let o = "";
      for (let y = 0; y < canvas.height; y++) {
        for (let x = 0; x < canvas.width; x++) {
          const i = (y * canvas.width + x) * 4;
          const l = (0.299 * d[i] + 0.587 * d[i + 1] + 0.114 * d[i + 2]) / 255;
          o += ASCII_CHARS[Math.floor(l * (ASCII_CHARS.length - 1))];
        }
        o += "\n";
      }
      setAscii(o);
      if (isGif) raf.current = requestAnimationFrame(draw);
    };
    img.onload = () => {
      const s = cols / img.naturalWidth;
      canvas.width = cols;
      canvas.height = Math.max(1, Math.round(img.naturalHeight * s * ratio));
      draw();
    };
    img.src = src;
    return () => cancelAnimationFrame(raf.current);
  }, [src, cols, ratio]);
  return ascii;
}

// ─── History line types ───────────────────────────────────────────────────────
type TLine =
  | { k: "text";     text: string; dim?: boolean }
  | { k: "cmd";      dir: string; cmd: string }
  | { k: "blank" }
  | { k: "ls-root"; showHidden?: boolean }
  | { k: "ls-projects" }
  | { k: "kv";       key: string; value: string }
  | { k: "demo";     projId: string }
  | { k: "ascii";    src: string; cols: number }
  | { k: "img";      src: string }
  | { k: "rich";     node: React.ReactNode }
  | { k: "help-row"; cmd: string; desc: string }
  | { k: "brief" }
  | { k: "contrib-graph" };

type Line = { id: number } & TLine;

let _uid = 0;
const mk = {
  t:      (text: string, dim = false): Line => ({ id: ++_uid, k: "text", text, dim }),
  cmd:    (dir: string, cmd: string):  Line => ({ id: ++_uid, k: "cmd", dir, cmd }),
  b:      ():                          Line => ({ id: ++_uid, k: "blank" }),
  lsRoot: (showHidden = false):         Line => ({ id: ++_uid, k: "ls-root", showHidden }),
  lsProjects: ():                      Line => ({ id: ++_uid, k: "ls-projects" }),
  kv:     (key: string, val: string):  Line => ({ id: ++_uid, k: "kv", key, value: val }),
  demo:   (projId: string):             Line => ({ id: ++_uid, k: "demo", projId }),
  ascii:  (src: string, cols = 72):    Line => ({ id: ++_uid, k: "ascii", src, cols }),
  img:    (src: string):              Line => ({ id: ++_uid, k: "img", src }),
  rich:   (node: React.ReactNode):   Line => ({ id: ++_uid, k: "rich", node }),
  helpRow:(cmd: string, desc: string): Line => ({ id: ++_uid, k: "help-row", cmd, desc }),
  brief:  ():                        Line => ({ id: ++_uid, k: "brief" }),
  contribGraph: ():                  Line => ({ id: ++_uid, k: "contrib-graph" }),
};

// ─── Main component ───────────────────────────────────────────────────────────
export default function TerminalPage({ nameAscii }: { nameAscii: string }) {
  const [history, setHistory] = useState<Line[]>([]);
  const [input,   setInput]   = useState("");
  const [cwd,     setCwd]     = useState("~");
  const [cmdHist, setCmdHist] = useState<string[]>([]);
  const [histIdx, setHistIdx] = useState(-1);
  const [saved,   setSaved]   = useState("");
  const [blink,   setBlink]   = useState(true);
  const [modal,   setModal]   = useState<typeof PROJECTS[0] | null>(null);

  // Streaming typewriter
  const [isTyping,     setIsTyping]     = useState(false);
  const [typingDisplay, setTypingDisplay] = useState("");
  const typingFull     = useRef("");
  const typingPos      = useRef(0);
  const typingOnDone   = useRef<(() => void) | null>(null);

  const inputRef  = useRef<HTMLInputElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  // Boot: print welcome on mount
  useEffect(() => {
    const welcomeLines: Line[] = [
      mk.b(),
      ...nameAscii.split("\n").map(l => mk.t(l)),
      mk.b(),
      mk.t("  Heath Sun  ·  Mountain View, CA  ·  Building AI infrastructure for human communication", true),
      mk.b(),
      mk.t(`  Type 'brief' to get started.`, true),
      mk.b(),
    ];
    const timers: ReturnType<typeof setTimeout>[] = [];
    welcomeLines.forEach((line, i) => {
      timers.push(setTimeout(() => setHistory(h => [...h, line]), i * 30));
    });
    timers.push(setTimeout(() => setInput("brief"), welcomeLines.length * 30 + 100));
    return () => timers.forEach(clearTimeout);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Cursor blink
  useEffect(() => {
    const id = setInterval(() => setBlink(b => !b), 530);
    return () => clearInterval(id);
  }, []);

  // Scroll to bottom (suppress while brief is the latest meaningful content)
  useEffect(() => {
    const lastMeaningful = [...history].reverse().find(l => l.k !== "blank");
    if (lastMeaningful?.k === "brief") return;
    bottomRef.current?.scrollIntoView({ behavior: "auto" });
  }, [history, typingDisplay]);

  // Typewriter engine
  useEffect(() => {
    if (!isTyping) return;
    const id = setInterval(() => {
      const next = Math.min(typingPos.current + 5, typingFull.current.length);
      typingPos.current = next;
      setTypingDisplay(typingFull.current.slice(0, next));
      if (next >= typingFull.current.length) {
        clearInterval(id);
        const full = typingFull.current;
        const cb   = typingOnDone.current;
        setHistory(h => [...h, mk.t(full)]);
        setTypingDisplay("");
        typingPos.current = 0;
        setIsTyping(false);
        cb?.();
      }
    }, 2);
    return () => clearInterval(id);
  }, [isTyping]);

  const typeText = useCallback((text: string, onDone?: () => void) => {
    typingFull.current   = text;
    typingPos.current    = 0;
    typingOnDone.current = onDone ?? null;
    setIsTyping(true);
  }, []);

  const push = useCallback((lines: Line[]) => {
    setHistory(h => [...h, ...lines]);
  }, []);

  const promptDir = (dir: string) =>
    dir === "~" ? "~" : dir.split("/").pop() ?? "~";

  // ── Filesystem helpers ──────────────────────────────────────────────────────
  const validDirs = useMemo<Record<string, string[]>>(() => ({
    "~":                      ["projects"],
    "~/projects":             PROJECTS.map(p => p.id),
  }), []);

  const isValidDir = (targetCwd: string, name: string) =>
    validDirs[targetCwd]?.includes(name) ?? false;

  function resolveCwd(current: string, arg: string): string | null {
    if (arg === ".." || arg === "../") {
      return current === "~" ? null : current.split("/").slice(0, -1).join("/") || "~";
    }
    if (arg === "~") return "~";
    const target = `${current}/${arg}`.replace("~/~", "~");
    if (validDirs[target] !== undefined) return target;
    if (current !== "~" && validDirs[`${current}/${arg}`] !== undefined) return `${current}/${arg}`;
    return null;
  }

  // ── Tab completion ──────────────────────────────────────────────────────────
  const tabComplete = useCallback((raw: string) => {
    const parts = raw.split(" ");
    const last  = parts[parts.length - 1];
    if (!last) return;

    const options = [
      ...(validDirs[cwd] ?? []).map(d => d + "/"),
      ...(cwd === "~" ? ["ABOUT_ME.md", "contact_me.sh", ".coffee.txt"] : ["README.md"]),
    ];

    const matches = options.filter(o => o.startsWith(last));
    if (matches.length === 1) {
      const completed = [...parts.slice(0, -1), matches[0]].join(" ");
      setInput(completed);
    } else if (matches.length > 1) {
      push([
        mk.cmd(cwd, raw),
        mk.t("  " + matches.join("  ")),
      ]);
      setInput(raw);
    }
  }, [cwd, push, validDirs]);

  // ── Command executor ────────────────────────────────────────────────────────
  const runCmd = useCallback((raw: string, silent = false) => {
    const trimmed = raw.trim();
    if (!trimmed) return;

    if (!silent) {
      setHistory(h => [...h, mk.cmd(promptDir(cwd), trimmed)]);
      setCmdHist(h => [trimmed, ...h.slice(0, 99)]);
      setHistIdx(-1);
      setSaved("");
    }

    const parts = trimmed.split(/\s+/);
    const verb  = parts[0].toLowerCase();
    const arg1  = parts[1] ?? "";

    // ── clear ──
    if (verb === "clear") { setHistory([]); return; }

    // ── brief ──
    if (verb === "brief") {
      push([mk.b(), mk.brief(), mk.b()]);
      return;
    }

    // ── sudo ──
    if (verb === "sudo") {
      push([
        mk.b(),
        mk.t("  Heath incident reported. This attempt has been logged."),
        mk.t("  To unlock 'root' privileges and deploy Heath full-time,"),
        mk.t("  a term sheet or a residency offer is required."),
        mk.b(),
        mk.rich(<>{"  Please contact: "}<a href="mailto:heathsun@cmu.edu" onClick={e => e.stopPropagation()} className="hover:opacity-70 transition-opacity" style={{ color: ACCENT }}>heathsun@cmu.edu</a>{" to negotiate access keys."}</>),
        mk.b(),
      ]);
      return;
    }

    // ── github ──
    if (verb === "github") {
      push([mk.b(), mk.contribGraph(), mk.b()]);
      return;
    }

    // ── whoami ──
    if (verb === "whoami") {
      push([
        mk.b(),
        mk.kv("NAME",          "Heath Sun"),
        mk.kv("LOCATION",      "Mountain View, CA"),
        mk.kv("EDUCATION",     "CMU (M.S. SM) · Oxford (AI) · Nottingham (B.S. CS)"),
        mk.kv("INFO",          "Ex-ZhenFund EIR · Li Dak Sum Research Fellow"),
        mk.kv("CURRENT_FOCUS", "Building Hypercue, AI for live speaking."),
        mk.b(),
      ]);
      return;
    }

    // ── help ──
    if (verb === "help" || verb === "?") {
      push([
        mk.b(),
        mk.t("  COMMANDS"),
        mk.t("  ─────────────────────────────────────────────"),
        mk.helpRow("brief",    "overview + projects"),
        mk.helpRow("whoami",   "key-value bio"),
        mk.helpRow("ls -la",   "list directory"),
        mk.helpRow("cd projects", "change directory"),
        mk.helpRow("cat .coffee.txt", "find me IRL"),
        mk.helpRow("github",  "ASCII contribution graph"),
        mk.helpRow("sudo",    "try it"),
        mk.helpRow("clear",   "clear terminal"),
        mk.b(),
        mk.t("  [↑ ↓]  history    [tab]  autocomplete", true),
        mk.b(),
      ]);
      return;
    }

    // ── pwd ──
    if (verb === "pwd") {
      push([mk.t("  /home/visitor/" + cwd.replace("~", ""))]);
      return;
    }

    // ── ls ──
    if (verb === "ls") {
      const showHidden = arg1 === "-la" || arg1 === "-a" || arg1 === "-al";
      if (cwd === "~") {
        push([mk.b(), mk.lsRoot(showHidden), mk.b()]);
      } else if (cwd === "~/projects") {
        push([mk.b(), mk.lsProjects(), mk.b()]);
      } else {
        push([mk.b(), mk.t("  README.md"), mk.b()]);
      }
      return;
    }

    // ── cd ──
    if (verb === "cd") {
      const target = arg1 || "~";
      const next   = resolveCwd(cwd, target);
      if (next === null) {
        push([mk.t(`  cd: ${target}: No such file or directory`, true)]);
      } else {
        setCwd(next);
        // auto-ls after cd
        setTimeout(() => runCmd("ls", true), 50);
      }
      return;
    }

    // ── cat ──
    if (verb === "cat") {
      if (!arg1) { push([mk.t("  cat: missing operand", true)]); return; }

      // cat ABOUT_ME.md
      if (arg1 === "ABOUT_ME.md" && cwd === "~") {
        const text = [
          "  ════════════════════════════════════════════",
          "  ABOUT_ME.md",
          "  ════════════════════════════════════════════",
          "",
          nameAscii,
          "",
          "  Mountain View, CA  ·  Building AI infrastructure for human communication",
          "",
          "  CMU (M.S. SM) · Oxford (AI) · Nottingham (B.S. CS)",
          "",
          "  Ex-ZhenFund EIR · Li Dak Sum Research Fellow.",
          "  ════════════════════════════════════════════",
        ].join("\n");
        push([mk.b()]);
        typeText(text);
        return;
      }

      // cat contact_me.sh
      if (arg1 === "contact_me.sh" && cwd === "~") {
        const linkStyle = { color: ACCENT };
        const linkCls = "hover:opacity-70 transition-opacity";
        push([
          mk.b(),
          mk.t("  #!/bin/bash"),
          mk.t("  # contact_me.sh"),
          mk.b(),
          mk.t('  echo "Opening preferred channels..."'),
          mk.b(),
          mk.t("  # X (Twitter)"),
          mk.rich(<>{"  open "}<a href="https://x.com/1HeathSun" target="_blank" rel="noopener noreferrer" onClick={e => e.stopPropagation()} className={linkCls} style={linkStyle}>https://x.com/1HeathSun</a></>),
          mk.b(),
          mk.t("  # LinkedIn"),
          mk.rich(<>{"  open "}<a href="https://www.linkedin.com/in/heathsun/" target="_blank" rel="noopener noreferrer" onClick={e => e.stopPropagation()} className={linkCls} style={linkStyle}>https://www.linkedin.com/in/heathsun/</a></>),
          mk.b(),
          mk.t("  # Email"),
          mk.rich(<>{"  open "}<a href="mailto:heathsun@cmu.edu" onClick={e => e.stopPropagation()} className={linkCls} style={linkStyle}>heathsun@cmu.edu</a></>),
          mk.b(),
          mk.t('  echo "Done."'),
          mk.b(),
        ]);
        return;
      }

      // cat .coffee.txt
      if (arg1 === ".coffee.txt" && cwd === "~") {
        const coffeeText = [
          "  Here is where you can find me offline, usually highly",
          "  caffeinated and claudemaxxing:",
        ].join("\n");
        push([mk.b()]);
        typeText(coffeeText, () => {
          const linkCls = "hover:opacity-70 transition-opacity";
          const linkStyle = { color: ACCENT };
          push([
            mk.b(),
            mk.rich(
              <div className="my-2 ml-2">
                <iframe
                  src="https://www.google.com/maps/embed?hl=en&pb=!4v1710000000000!6m8!1m7!1sxKIpTH5T9qHrHuKZGvX9oA!2m2!1d37.3936759!2d-122.0791116!3f254.04!4f-2.65!5f0.7820865974627469"
                  className="w-full max-w-[480px] h-[280px] rounded border border-white/10"
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            ),
            mk.b(),
            mk.t("  📍 Maison Alyzée, 212 Castro St, Mountain View."),
            mk.t("  The first coffee and croissant are on me."),
            mk.rich(<>{"  Hit me up: "}<a href="mailto:heath@cmu.edu" onClick={e => e.stopPropagation()} className={linkCls} style={linkStyle}>heath@cmu.edu</a>{" or DM me on "}<a href="https://x.com/1HeathSun" target="_blank" rel="noopener noreferrer" onClick={e => e.stopPropagation()} className={linkCls} style={linkStyle}>X</a>{"/"}<a href="https://www.linkedin.com/in/heathsun/" target="_blank" rel="noopener noreferrer" onClick={e => e.stopPropagation()} className={linkCls} style={linkStyle}>LinkedIn</a>{"."}</>),
            mk.b(),
          ]);
        });
        return;
      }

      // cat <project>/README.md  OR  cat <project>
      const projMatch = PROJECTS.find(
        p => arg1 === p.id ||
             arg1 === `${p.id}/` ||
             arg1 === `${p.id}/README.md`
      );
      if (projMatch) {
        const proj = projMatch;
        push([mk.b()]);
        if (proj.image) push([mk.img(proj.image)]);
        const log = [
          "  ════════════════════════════════════════════",
          `  [PROJECT] — ${"displayName" in proj && proj.displayName ? proj.displayName : proj.id.toUpperCase().replace(/_/g, " ")}`,
          "  ════════════════════════════════════════════",
          `  STACK:  ${proj.stack}`,
          `  STATUS: ${proj.status}`,
          "",
          ...proj.description.split("\n").map(l => "  " + l),
          "  ════════════════════════════════════════════",
        ].join("\n");
        typeText(log, () => {
          if (proj.liveUrl || proj.videoUrl) {
            push([mk.b(), mk.demo(proj.id)]);
          }
        });
        return;
      }

      // cat README.md inside a project dir
      if (arg1 === "README.md") {
        const proj = PROJECTS.find(p => cwd.endsWith(p.id));
        if (proj) {
          push([mk.b()]);
          if (proj.image) push([mk.img(proj.image)]);
          const log = [
            "  ════════════════════════════════════════════",
            `  [PROJECT] — ${"displayName" in proj && proj.displayName ? proj.displayName : proj.id.toUpperCase().replace(/_/g, " ")}`,
            "  ════════════════════════════════════════════",
            `  STACK:  ${proj.stack}`,
            `  STATUS: ${proj.status}`,
            "",
            ...proj.description.split("\n").map(l => "  " + l),
            "  ════════════════════════════════════════════",
          ].join("\n");
          typeText(log, () => {
            if (proj.liveUrl || proj.videoUrl) push([mk.b(), mk.demo(proj.id)]);
          });
          return;
        }
      }

      push([mk.t(`  cat: ${arg1}: No such file or directory`, true)]);
      return;
    }

    // ── unknown ──
    push([mk.t(`  bash: ${verb}: command not found  (try 'brief')`, true)]);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cwd, nameAscii, push, typeText]);

  // ── Clickable item runner ──────────────────────────────────────────────────
  const clickItem = useCallback((cmd: string) => {
    setInput("");
    setHistory(h => [...h, mk.cmd(promptDir(cwd), cmd)]);
    runCmd(cmd, true);
    inputRef.current?.focus();
  }, [cwd, runCmd]);

  // ── Key handler ────────────────────────────────────────────────────────────
  const onKeyDown = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
    if (isTyping && e.key !== "Escape") return; // block input while typing

    if (e.key === "Enter") {
      e.preventDefault();
      const cmd = input;
      setInput("");
      runCmd(cmd);
    } else if (e.key === "Tab") {
      e.preventDefault();
      tabComplete(input);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (!cmdHist.length) return;
      if (histIdx === -1) setSaved(input);
      const next = Math.min(histIdx + 1, cmdHist.length - 1);
      setHistIdx(next);
      setInput(cmdHist[next]);
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (histIdx === -1) return;
      const next = histIdx - 1;
      if (next < 0) { setHistIdx(-1); setInput(saved); }
      else { setHistIdx(next); setInput(cmdHist[next]); }
    } else if (e.ctrlKey && e.key === "c") {
      e.preventDefault();
      if (isTyping) {
        setIsTyping(false);
        setTypingDisplay("");
      }
      setHistory(h => [...h, mk.cmd(promptDir(cwd), input + "^C")]);
      setInput("");
    } else if (e.ctrlKey && e.key === "l") {
      e.preventDefault();
      setHistory([]);
    }
  }, [isTyping, input, runCmd, tabComplete, cmdHist, histIdx, saved, cwd]);

  const promptStr = `visitor@cli.heathsun.dev ${promptDir(cwd)} % `;

  return (
    <>
      {/* Terminal window */}
      <div
        className="fixed inset-0 bg-black text-white font-mono z-[100] flex flex-col"
        onClick={() => inputRef.current?.focus()}
      >
        {/* Title bar */}
        <div className="shrink-0 border-b border-white/10 px-5 py-1.5 flex items-center gap-2 text-xs">
          <span className="text-white/10 text-[10px]">●  ●  ●</span>
          <span className="mx-auto text-white/30">visitor@cli.heathsun.dev</span>
          <span className="text-white/15">zsh</span>
        </div>

        {/* Output */}
        <div className="flex-1 overflow-y-auto px-5 py-4 text-xs leading-relaxed">
          {history.map(line => (
            <HistoryLine key={line.id} line={line} onClickItem={clickItem} onOpenModal={setModal} />
          ))}

          {/* Typewriter streaming */}
          {typingDisplay && (
            <div className="text-white/85 whitespace-pre-wrap">
              {typingDisplay}
              <span
                className="inline-block w-[0.55em] h-[1.1em] align-middle"
                style={blink ? { backgroundColor: ACCENT } : undefined}
              />
            </div>
          )}

          {/* Active input line */}
          {!isTyping && (
            <div className="flex items-baseline flex-wrap mt-0.5">
              <span className="text-white/45 shrink-0 whitespace-pre">{promptStr}</span>
              <span className="text-white/90 whitespace-pre">{input}</span>
              <span
                className="inline-block w-[0.55em] h-[1.1em] align-middle"
                style={blink ? { backgroundColor: ACCENT } : undefined}
              />
            </div>
          )}

          {/* Hidden real input */}
          <input
            ref={inputRef}
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={onKeyDown}
            autoFocus
            autoComplete="off"
            autoCorrect="off"
            autoCapitalize="off"
            spellCheck={false}
            className="absolute top-0 left-0 w-full opacity-0 h-8 -z-10"
            aria-label="Terminal input"
          />

          <div ref={bottomRef} className="h-2" />
        </div>
      </div>

      {/* Demo modal */}
      {modal && (
        <DemoModal project={modal} onClose={() => setModal(null)} />
      )}
    </>
  );
}

// ─── History line renderer ────────────────────────────────────────────────────
function HistoryLine({
  line,
  onClickItem,
  onOpenModal,
}: {
  line: Line;
  onClickItem: (cmd: string) => void;
  onOpenModal: (p: typeof PROJECTS[0]) => void;
}) {
  const prompt = (dir: string) => `visitor@cli.heathsun.dev ${dir} % `;

  switch (line.k) {
    case "blank":
      return <div className="h-[0.6em]" />;

    case "text":
      return (
        <div className={`whitespace-pre ${line.dim ? "text-white/35" : "text-white/85"}`}>
          {line.text}
        </div>
      );

    case "rich":
      return <div className="whitespace-pre text-white/85">{line.node}</div>;

    case "help-row":
      return (
        <div className="flex items-baseline whitespace-pre">
          <span className="text-white/85">{"  "}</span>
          <button
            onClick={e => { e.stopPropagation(); onClickItem(line.cmd); }}
            className="text-white hover:opacity-70 transition-opacity cursor-pointer shrink-0"
            style={{ width: "18ch", textAlign: "left" }}
          >
            {line.cmd}
          </button>
          <span className="text-white/40">{line.desc}</span>
        </div>
      );

    case "cmd":
      return (
        <div className="flex flex-wrap items-baseline mt-1">
          <span className="text-white/40 shrink-0 whitespace-pre">{prompt(line.dir)}</span>
          <span className="text-white/80">{line.cmd}</span>
        </div>
      );

    case "kv":
      return (
        <div className="flex gap-2">
          <span className="text-white/40 w-28 shrink-0">{line.key}:</span>
          <span className="text-white/85">
            {line.key === "CURRENT_FOCUS"
              ? <>Building{" "}
                  <a href="https://www.hypercue.ai/" target="_blank" rel="noopener noreferrer"
                     onClick={e => e.stopPropagation()}
                     className="underline hover:opacity-70 transition-opacity"
                     style={{ color: ACCENT }}>Hypercue</a>, AI for live speaking.</>
              : line.value}
          </span>
        </div>
      );

    case "ls-root":
      return (
        <div className="space-y-1">
          {line.showHidden && (
            <LsRow perms="-rw-r--r--" name=".coffee.txt" isDir={false}
              onClick={() => onClickItem("cat .coffee.txt")} />
          )}
          <LsRow perms="drwxr-xr-x" name="projects/" isDir comment=""
            onClick={() => onClickItem("cd projects")} />
          <LsRow perms="-rw-r--r--" name="ABOUT_ME.md" isDir={false}
            onClick={() => onClickItem("cat ABOUT_ME.md")} />
          <LsRow perms="-rwxr-xr-x" name="contact_me.sh" isDir={false}
            onClick={() => onClickItem("cat contact_me.sh")} />
        </div>
      );

    case "ls-projects":
      return (
        <div className="space-y-1">
          {PROJECTS.map(p => (
            <ProjectRow
              key={p.id}
              project={p}
              onClick={() => onClickItem(`cat ${p.id}/README.md`)}
            />
          ))}
        </div>
      );

    case "demo":
      return <DemoButton projectId={line.projId} onOpen={onOpenModal} />;

    case "ascii":
      return <AsciiLine src={line.src} cols={line.cols} />;

    case "img":
      return (
        <NextImage
          src={line.src}
          alt=""
          width={480}
          height={320}
          className="my-2 max-w-[480px] max-h-[320px] w-auto h-auto object-contain rounded border border-white/10"
          unoptimized
        />
      );

    case "brief":
      return <BriefSection onClickItem={onClickItem} />;

    case "contrib-graph":
      return <ContribGraphSection />;

    default:
      return null;
  }
}

// ─── Sub-components ───────────────────────────────────────────────────────────
function LsRow({
  perms, name, isDir, comment, onClick,
}: {
  perms: string; name: string; isDir: boolean; comment?: string; onClick: () => void;
}) {
  return (
    <div className="flex items-baseline gap-3">
      <span className="text-white/30 shrink-0">{perms}</span>
      <button
        onClick={e => { e.stopPropagation(); onClick(); }}
        className={`hover:underline underline-offset-2 cursor-pointer shrink-0 ${
          isDir ? "text-white/90 font-semibold" : "text-white/70"
        }`}
      >
        {name}
      </button>
      {comment && <span className="text-white/25">{comment}</span>}
    </div>
  );
}

function ProjectRow({
  project, onClick,
}: {
  project: typeof PROJECTS[number]; onClick: () => void;
}) {
  return (
    <div className="flex items-baseline gap-3">
      <span className="text-white/30 shrink-0">drwxr-xr-x</span>
      <button
        onClick={e => { e.stopPropagation(); onClick(); }}
        className="text-white/85 font-semibold hover:underline underline-offset-2 cursor-pointer shrink-0"
      >
        {project.id}/
      </button>
      {project.hot && (
        <span className="text-[10px] shrink-0 opacity-80" style={{ color: ACCENT }}>𒀭</span>
      )}
      <span className="text-white/35 truncate">— {project.tagline}</span>
    </div>
  );
}

function DemoButton({
  projectId, onOpen,
}: {
  projectId: string; onOpen: (p: typeof PROJECTS[0]) => void;
}) {
  const proj = PROJECTS.find(p => p.id === projectId);
  if (!proj) return null;
  const hasSecond = "secondUrl" in proj && proj.secondUrl;
  if (!proj.liveUrl && !proj.videoUrl && !hasSecond) return null;
  const linkCls = "border border-white/25 px-3 py-1 text-xs text-white/70 transition-colors cursor-pointer";
  const onEnter = (e: React.MouseEvent<HTMLElement>) => { e.currentTarget.style.borderColor = ACCENT; e.currentTarget.style.color = ACCENT; };
  const onLeave = (e: React.MouseEvent<HTMLElement>) => { e.currentTarget.style.borderColor = ""; e.currentTarget.style.color = ""; };
  return (
    <div className="flex gap-3 flex-wrap my-1">
      {proj.videoUrl && (
        <button
          onClick={e => { e.stopPropagation(); onOpen(proj); }}
          className={linkCls} onMouseEnter={onEnter} onMouseLeave={onLeave}
        >
          ▶ View Demo / Video
        </button>
      )}
      {proj.liveUrl && (
        <a href={proj.liveUrl} target="_blank" rel="noopener noreferrer"
          onClick={e => e.stopPropagation()}
          className={linkCls} onMouseEnter={onEnter} onMouseLeave={onLeave}
        >
          ↗ {proj.liveLabel ?? "Open Live Demo"}
        </a>
      )}
      {hasSecond && (
        <a href={(proj as { secondUrl: string }).secondUrl} target="_blank" rel="noopener noreferrer"
          onClick={e => e.stopPropagation()}
          className={linkCls} onMouseEnter={onEnter} onMouseLeave={onLeave}
        >
          ↗ {("secondLabel" in proj && proj.secondLabel) || "Link"}
        </a>
      )}
    </div>
  );
}

function AsciiLine({ src, cols }: { src: string; cols: number }) {
  const ascii = useAsciiMedia(src, cols, 0.6);
  return ascii ? (
    <pre className="text-[4.5px] leading-[1] text-white/65 overflow-x-hidden whitespace-pre my-1">
      {ascii}
    </pre>
  ) : (
    <div className="text-white/20 text-xs italic my-1">  rendering ascii art...</div>
  );
}

// ─── Standalone contrib graph for `github` command ───────────────────────────
function ContribGraphSection() {
  const { data, total } = useGitHubContribs("HS1CMU");
  return (
    <div className="my-2 space-y-2">
      <div className="text-white/40">
        {"  "}@HS1CMU
      </div>
      <div className="pl-2"><ContribGraph data={data} /></div>
    </div>
  );
}

// ─── Brief section ────────────────────────────────────────────────────────────
function BriefSection({ onClickItem }: { onClickItem: (cmd: string) => void }) {
  const ascii = useAsciiMedia("/AI1.jpg", 60, 0.55);
  const { data: contribData, total: contribTotal } = useGitHubContribs("HS1CMU");
  const [step, setStep] = useState(0);
  const [hoveredRow, setHoveredRow] = useState<number | null>(null);
  const activeRow = hoveredRow ?? 0;
  useEffect(() => {
    if (step >= 7) return;
    const id = setTimeout(() => setStep(s => s + 1), 45);
    return () => clearTimeout(id);
  }, [step]);

  return (
    <div className="space-y-4 my-1">
      {/* step 0 — Portrait + Bio */}
      <div className="flex gap-6 items-start">
        {ascii ? (
          <pre className="text-[6px] leading-[1.2] text-white/55 shrink-0 whitespace-pre select-none">
            {ascii}
          </pre>
        ) : (
          <div className="text-white/20 italic shrink-0 w-[220px] h-[180px] flex items-center justify-center">
            rendering...
          </div>
        )}
        <div className="flex flex-col justify-center gap-0.5 py-2 min-w-0">
          <div style={{ color: ACCENT }}>Heath Sun</div>
          <div className="text-white/40 mt-0.5">Mountain View, CA</div>
          <div className="text-white/40">Building AI infrastructure for human communication</div>
          <div className="h-4" />
          <div className="text-white/55">CMU (M.S. SM) · Oxford (AI) · Nottingham (B.S. CS)</div>
          <div className="text-white/55">Ex-ZhenFund EIR · Li Dak Sum Research Fellow</div>
          <div className="text-white/55"></div>
          <div className="h-4" />
          <div className="flex gap-4">
            <a href="https://x.com/1HeathSun" target="_blank" rel="noopener noreferrer"
               onClick={e => e.stopPropagation()}
               className="hover:opacity-70 transition-opacity" style={{ color: ACCENT }}>X</a>
            <a href="https://www.linkedin.com/in/heathsun/" target="_blank" rel="noopener noreferrer"
               onClick={e => e.stopPropagation()}
               className="hover:opacity-70 transition-opacity" style={{ color: ACCENT }}>LinkedIn</a>
            <a href="https://github.com/HS1CMU" target="_blank" rel="noopener noreferrer"
               onClick={e => e.stopPropagation()}
               className="hover:opacity-70 transition-opacity" style={{ color: ACCENT }}>GitHub</a>
            <a href="mailto:heathsun@cmu.edu"
               onClick={e => e.stopPropagation()}
               className="hover:opacity-70 transition-opacity" style={{ color: ACCENT }}>heathsun@cmu.edu</a>
            <button
               onClick={e => { e.stopPropagation(); onClickItem("cat .coffee.txt"); }}
               className="hover:opacity-70 transition-opacity cursor-pointer" style={{ color: ACCENT }}>Coffee</button>
          </div>
        </div>
      </div>

      {/* step 1 — Current Focus */}
      {step >= 1 && <div className="space-y-1.5 text-white/55 pl-2">
        <div className="text-white/25 mb-1">CURRENT FOCUS</div>
        <div className="flex gap-2 leading-relaxed">
          <span style={{ color: ACCENT }}>→</span>
          <span>
            <a href="https://hypercue.ai" target="_blank" rel="noopener noreferrer"
               onClick={e => e.stopPropagation()}
               className="hover:opacity-70 transition-opacity" style={{ color: ACCENT }}>
              Hypercue
            </a>
            {" — AI for live speaking"}
          </span>
        </div>
      </div>}

      {/* step 2 — Highlights */}
      {step >= 2 && <div className="space-y-1.5 text-white/55 pl-2">
        <div className="text-white/25 mb-1">HIGHLIGHTS</div>
        {[
          <>Built an AI tarot <button onClick={e => { e.stopPropagation(); onClickItem("cat fate_algo_product/README.md"); }} className="underline underline-offset-2 cursor-pointer hover:opacity-70 transition-opacity" style={{ color: ACCENT }}>app</button> at 19 that reached 22K users; later served as the youngest ZhenResident at <a href="https://www.google.com/search?q=what+is+ZhenFund&sca_esv=cf639ee39397d013&rlz=1C5AJCO_enUS1197US1197&sxsrf=ANbL-n5V0xXLpeWDlO_oQkFOx65vcP30xg%3A1773620042917&ei=Sku3adnXN9730PEPhtnI6Q8&biw=1470&bih=835&ved=0ahUKEwjZpP_EkaOTAxXeOzQIHYYsMv0Q4dUDCBE&uact=5&oq=what+is+ZhenFund&gs_lp=Egxnd3Mtd2l6LXNlcnAiEHdoYXQgaXMgWmhlbkZ1bmQyBRAAGO8FMgUQABjvBTIIEAAYgAQYogQyCBAAGIAEGKIEMggQABiABBiiBEjcC1D2AVjeCnABeACQAQCYAZkBoAG3BqoBAzUuM7gBA8gBAPgBAZgCCaAC6AbCAgsQABiABBiwAxiiBMICCBAAGLADGO8FwgIIEAAYgAQYywHCAgcQABiABBgNwgIGEAAYDRgewgIIEAAYChgNGB7CAgUQIRigAcICBxAhGKABGAqYAwCIBgGQBgSSBwM1LjSgB4sWsgcDNC40uAffBsIHBTAuMy42yAcdgAgA&sclient=gws-wiz-serp" target="_blank" rel="noopener noreferrer" onClick={e => e.stopPropagation()} className="underline hover:opacity-70 transition-opacity" style={{ color: ACCENT }}>ZhenFund</a>, China&apos;s leading VC.</>,
          <>Founded <a href="https://www.google.com/search?q=what+is+EuroMCM&rlz=1C5AJCO_enUS1197US1197&oq=what+is+EuroMCM&gs_lcrp=EgZjaHJvbWUyBggAEEUYOTIKCAEQABiABBiiBDIKCAIQABiABBiiBDIKCAMQABiABBiiBDIKCAQQABiABBiiBDIHCAUQABjvBdIBCTUzNzFqMGoxNagCCLACAfEFgp7W_KPZtVY&sourceid=chrome&ie=UTF-8" target="_blank" rel="noopener noreferrer" onClick={e => e.stopPropagation()} className="underline hover:opacity-70 transition-opacity" style={{ color: ACCENT }}>EuroMCM</a>, a non-profit pan-European applied mathematics competition, starting from zero budget.</>,
          <>Won China&apos;s 18th <a href="https://www.google.com/search?q=what+is+Challenge+Cup+China&sca_esv=cf639ee39397d013&rlz=1C5AJCO_enUS1197US1197&biw=1470&bih=835&sxsrf=ANbL-n5yvoJ3MVL5HqsyzxJZ-FEMeP5hUg%3A1773620113018&ei=kUu3aeBhhL_Q8Q_xwLPwDQ&ved=0ahUKEwig7rXmkaOTAxWEHzQIHXHgDN4Q4dUDCBE&uact=5&oq=what+is+Challenge+Cup+China&gs_lp=Egxnd3Mtd2l6LXNlcnAiG3doYXQgaXMgQ2hhbGxlbmdlIEN1cCBDaGluYTIIECEYoAEYwwQyCBAhGKABGMMEMggQIRigARjDBEjfCVD4AViICHABeACQAQCYAa4BoAGpCKoBAzMuNrgBA8gBAPgBAZgCBKAChAPCAgoQABiwAxjWBBhHwgIKECEYoAEYwwQYCpgDAIgGAZAGBJIHAzEuM6AHvSOyBwMwLjO4B4ADwgcDMC40yAcHgAgA&sclient=gws-wiz-serp" target="_blank" rel="noopener noreferrer" onClick={e => e.stopPropagation()} className="underline hover:opacity-70 transition-opacity" style={{ color: ACCENT }}>Challenge Cup</a> national first prize in quantum programming (co-created <button type="button" onClick={e => { e.stopPropagation(); onClickItem("cat stateq/README.md"); }} className="underline underline-offset-2 cursor-pointer hover:opacity-70 transition-opacity" style={{ color: ACCENT }}>StateQ</button>) and received the $60K <a href="https://www.google.com/search?q=what+is+Li+Dak+Sum+fellow&sca_esv=cf639ee39397d013&rlz=1C5AJCO_enUS1197US1197&biw=1470&bih=835&sxsrf=ANbL-n6kguQD72BsO59GEzUuAJgUbYmIpQ%3A1773620211240&ei=80u3abquDsP20PEPyL6soQM&ved=0ahUKEwj686CVkqOTAxVDOzQIHUgfKzQQ4dUDCBE&uact=5&oq=what+is+Li+Dak+Sum+fellow&gs_lp=Egxnd3Mtd2l6LXNlcnAiGXdoYXQgaXMgTGkgRGFrIFN1bSBmZWxsb3cyBRAhGKABSJAoUABY3CZwAXgBkAEAmAGFAaABmg2qAQQ2LjEwuAEDyAEA-AEBmAIOoAKLC8ICCBAhGKABGMMEwgIHECEYoAEYCpgDAJIHAzYuOKAHviKyBwM1Lji4B4gLwgcEMy4xMcgHFIAIAA&sclient=gws-wiz-serp" target="_blank" rel="noopener noreferrer" onClick={e => e.stopPropagation()} className="underline hover:opacity-70 transition-opacity" style={{ color: ACCENT }}>Li Dak Sum Fellowship</a>.</>,
          <>Interned at <a href="https://www.google.com/search?q=what+is+UKRI+Trustworthy+Autonomous+System+Hub&sca_esv=cf639ee39397d013&rlz=1C5AJCO_enUS1197US1197&biw=1470&bih=835&sxsrf=ANbL-n6C8YB0sWpPT38eeKWpicMc3vpkDg%3A1773620771391&ei=I063aZXEF_uNm9cP4MaP4AE&ved=0ahUKEwjV4a2glKOTAxX7xuYEHWDjAxwQ4dUDCBE&uact=5&oq=what+is+UKRI+Trustworthy+Autonomous+System+Hub&gs_lp=Egxnd3Mtd2l6LXNlcnAiLndoYXQgaXMgVUtSSSBUcnVzdHdvcnRoeSBBdXRvbm9tb3VzIFN5c3RlbSBIdWIyBRAhGKABSNqqAVC6BVj8pwFwD3gBkAEBmAGFAqABoiaqAQc0MC4xMy4xuAEDyAEA-AEBmAJEoAKHJsICChAAGLADGNYEGEfCAgoQIxiABBgnGIoFwgIIEAAYgAQYywHCAggQLhiABBjLAcICBBAAGB7CAgYQABgIGB7CAggQABiABBiiBMICBRAAGO8FwgIHECEYoAEYCsICBBAhGAqYAwCIBgGQBgGSBwU1Mi4xNqAH1a4BsgcFMzcuMTa4B9slwgcGOS41NC41yAdvgAgA&sclient=gws-wiz-serp" target="_blank" rel="noopener noreferrer" onClick={e => e.stopPropagation()} className="underline hover:opacity-70 transition-opacity" style={{ color: ACCENT }}>UKRI TAS</a> and <a href="https://www.google.com/search?q=what+is+China+Mobile&sca_esv=cf639ee39397d013&rlz=1C5AJCO_enUS1197US1197&biw=1470&bih=835&sxsrf=ANbL-n44YqIj9L-DVPVRt6KuqjDlZ6e2lw%3A1773620408482&ei=uEy3adeOHfu00PEPyODUwAs&ved=0ahUKEwjXyqfzkqOTAxV7GjQIHUgwFbgQ4dUDCBE&uact=5&oq=what+is+China+Mobile&gs_lp=Egxnd3Mtd2l6LXNlcnAiFHdoYXQgaXMgQ2hpbmEgTW9iaWxlMggQABiABBjLATIIEAAYgAQYywEyCBAAGIAEGMsBMgQQABgeMgQQABgeMgQQABgeMgQQABgeMgQQABgeMgQQABgeMgQQABgeSONyULIEWMNxcAF4AZABAJgBZaABqA2qAQQxOS4xuAEDyAEA-AEBmAIVoAKBDqgCCsICBxAjGCcY6gLCAgQQIxgnwgIKECMYgAQYJxiKBcICCxAuGIAEGNEDGMcBwgIFEAAYgATCAgoQABiABBhDGIoFwgIOEC4YgAQYxwEYjgUYrwHCAggQLhiABBjLAZgDBfEFTZqpZ-o9LD2SBwQxNS42oAeAe7IHBDE0Nja4B_wNwgcGMC44LjEzyAc-gAgA&sclient=gws-wiz-serp" target="_blank" rel="noopener noreferrer" onClick={e => e.stopPropagation()} className="underline hover:opacity-70 transition-opacity" style={{ color: ACCENT }}>China Mobile</a>, working on voice AI and agent-related research and engineering.</>,
          <>Won multiple hackathons, including <a href="https://www.linkedin.com/posts/heathsun_ai-hackathon-agenticai-activity-7357069306276290560-l0CC?utm_source=share&utm_medium=member_desktop&rcm=ACoAAEboMJ8B6_eFT-ETRpHba3LKxkSctgFITYw" target="_blank" rel="noopener noreferrer" onClick={e => e.stopPropagation()} className="underline hover:opacity-70 transition-opacity" style={{ color: ACCENT }}>2nd place</a> in the AI agent track at China&apos;s largest hackathon, <a href="https://www.google.com/search?q=what+is+AdventureX+hackathon+china&sca_esv=cf639ee39397d013&rlz=1C5AJCO_enUS1197US1197&biw=1470&bih=835&sxsrf=ANbL-n6arT7vwv6SwxxZsmxNxGJ57yUWLQ%3A1773620340095&ei=dEy3adHIBffO0PEP9uLGsQo&ved=0ahUKEwjR0tnSkqOTAxV3JzQIHXaxMaYQ4dUDCBE&uact=5&oq=what+is+AdventureX+hackathon+china&gs_lp=Egxnd3Mtd2l6LXNlcnAiIndoYXQgaXMgQWR2ZW50dXJlWCBoYWNrYXRob24gY2hpbmEyBRAhGKABSMgVUJEDWMQUcAF4AJABAJgBtAGgAf8MqgEEMTAuNrgBA8gBAPgBAZgCEKAC6QzCAgoQABiwAxjWBBhHwgIIEAAYgAQYogTCAgUQABjvBcICBxAhGKABGAqYAwCIBgGQBgOSBwQxMC42oAfOMLIHAzkuNrgH5AzCBwQ0LjEyyAcXgAgA&sclient=gws-wiz-serp" target="_blank" rel="noopener noreferrer" onClick={e => e.stopPropagation()} className="underline hover:opacity-70 transition-opacity" style={{ color: ACCENT }}>AdventureX</a> (8K+ developers applied).</>,
        ].map((item, i) => (
          <div key={i} className="flex gap-2 leading-relaxed">
            <span className="shrink-0 text-white/25">{i + 1}.</span>
            <span>{item}</span>
          </div>
        ))}
      </div>}

      {/* step 3 — GitHub contribution graph */}
      {step >= 3 && <div className="space-y-2">
        <div className="text-white/30">
          {"  "}@HS1CMU
        </div>
        <div className="pl-2"><ContribGraph data={contribData} /></div>
      </div>}

      {/* step 4 — Fun Projects */}
      {step >= 4 && <div>
        <div className="text-white/10 mb-2">  ─────────────────────────────────────────────────────────────</div>
        <div className="text-white/30 mb-1">  FUN PROJECTS</div>
        <div className="space-y-0.5 pl-2" onMouseLeave={() => setHoveredRow(null)}>
          {[
            { id: "louvre_robbery_agent",  name: "Anyfend",            desc: "multi-modal agents simulating spatial heists for museum physical security" },
            { id: "dump",                  name: "Dump",               desc: "voice agent that breaks up with your bf/gf for you · #1 winner @ AI Valley × Google Hackathon" },
            { id: "travel_rewind",         name: "Travel Rewind",      desc: "turns your photo gallery into a cinematic travel story · YC × DeepMind Hackathon" },
            { id: "1CGA_auto_grader",      name: "1CGA",               desc: "One Click to Grade Them All · reduces TA workload ~90%" },
            { id: "mr_speech_segmentation",name: "AdaSeg4MR",          desc: "zero-shot mixed reality system with speech-guided visual-language understanding" },
            { id: "a42z_judge",            name: "a42z",               desc: "agentic hackathon judge · runner-up @ AdventureX" },
            { id: "abovesaid",             name: "Abovesaid",          desc: "personal knowledge layer between you and the internet, distilling information as you read" },
            { id: "signfold_browser_use",  name: "Signfold",           desc: "browser agent that follows companies across social media with one click" },
            { id: "dark_web_evidential",   name: "Dark Web Evidental", desc: "OSINT pipeline for automated evidence extraction, built in collaboration with UK law enforcement" },
          ].map((p, i) => (
            <div key={i} className="flex items-baseline gap-2"
              onMouseEnter={() => setHoveredRow(i)}
            >
              <span className="shrink-0 w-3 text-center inline-block">
                {activeRow === i
                  ? <span className="text-[10px] opacity-80" style={{ color: ACCENT }}>𒀭</span>
                  : <span className="text-white/25">·</span>}
              </span>
              <button
                onClick={e => { e.stopPropagation(); onClickItem(`cat ${p.id}/README.md`); }}
                className="text-white/70 hover:text-white transition-colors cursor-pointer shrink-0"
              >
                {p.name}
              </button>
              <span className="text-white/25 truncate">— {p.desc}</span>
            </div>
          ))}
        </div>
      </div>}

      {/* step 5 — Essays */}
      {step >= 5 && <div onMouseLeave={() => setHoveredRow(null)}>
        <div className="text-white/30 mb-1">  ESSAYS</div>
        <div className="space-y-1 pl-2">
          <div className="flex gap-2 leading-relaxed"
            onMouseEnter={() => setHoveredRow(9)}
          >
            <span className="shrink-0 w-3 text-center inline-block">
              {activeRow === 9
                ? <span className="text-[10px] opacity-80" style={{ color: ACCENT }}>𒀭</span>
                : <span className="text-white/25">·</span>}
            </span>
            <span>
              <a href="https://www.heathsun.dev/blog/ideas" target="_blank" rel="noopener noreferrer"
                 onClick={e => e.stopPropagation()}
                 className="hover:opacity-70 transition-opacity text-white/70">
                <span className="text-white font-text font-semibold">Ideas Are More Important Than Execution</span>
              </a>
              <span className="text-white/40">{" (2026)"}</span>
            </span>
          </div>
          <div className="flex gap-2 leading-relaxed"
            onMouseEnter={() => setHoveredRow(11)}
          >
            <span className="shrink-0 w-3 text-center inline-block">
              {activeRow === 11
                ? <span className="text-[10px] opacity-80" style={{ color: ACCENT }}>𒀭</span>
                : <span className="text-white/25">·</span>}
            </span>
            <span>
              <a href="https://www.heathsun.dev/blog/middle-layer" target="_blank" rel="noopener noreferrer"
                 onClick={e => e.stopPropagation()}
                 className="hover:opacity-70 transition-opacity text-white/70">
                <span className="text-white font-text font-semibold">The Middle Layer Has No Moat</span>
              </a>
              <span className="text-white/40">{" (2026)"}</span>
            </span>
          </div>
          <div className="flex gap-2 leading-relaxed"
            onMouseEnter={() => setHoveredRow(12)}
          >
            <span className="shrink-0 w-3 text-center inline-block">
              {activeRow === 12
                ? <span className="text-[10px] opacity-80" style={{ color: ACCENT }}>𒀭</span>
                : <span className="text-white/25">·</span>}
            </span>
            <span>
              <a href="https://www.heathsun.dev/blog/gui" target="_blank" rel="noopener noreferrer"
                 onClick={e => e.stopPropagation()}
                 className="hover:opacity-70 transition-opacity text-white/70">
                <span className="text-white font-text font-semibold">The Best Interface in the AI Era Is Still a GUI</span>
              </a>
              <span className="text-white/40">{" (2026)"}</span>
            </span>
          </div>
          <div className="flex gap-2 leading-relaxed"
            onMouseEnter={() => setHoveredRow(13)}
          >
            <span className="shrink-0 w-3 text-center inline-block">
              {activeRow === 13
                ? <span className="text-[10px] opacity-80" style={{ color: ACCENT }}>𒀭</span>
                : <span className="text-white/25">·</span>}
            </span>
            <span>
              <a href="https://www.heathsun.dev/blog/mysticism" target="_blank" rel="noopener noreferrer"
                 onClick={e => e.stopPropagation()}
                 className="hover:opacity-70 transition-opacity text-white/70">
                <span className="text-white font-text font-semibold">Mysticism in the Age of AI:</span>
                <span className="text-white font-text font-semibold">{" How to Quantitatively Compare Divination Systems?"}</span>
              </a>
              <span className="text-white/40">{" (2022)"}</span>
            </span>
          </div>
        </div>
      </div>}

      {/* step 6 — Arts */}
      {step >= 6 && <div onMouseLeave={() => setHoveredRow(null)}>
        <div className="text-white/30 mb-1">  ARTS</div>
        <div className="space-y-1 pl-2">
          <div className="flex gap-2 leading-relaxed"
            onMouseEnter={() => setHoveredRow(10)}
          >
            <span className="shrink-0 w-3 text-center inline-block">
              {activeRow === 10
                ? <span className="text-[10px] opacity-80" style={{ color: ACCENT }}>𒀭</span>
                : <span className="text-white/25">·</span>}
            </span>
            <span>
              <a href="https://www.hesun.art/" target="_blank" rel="noopener noreferrer"
                 onClick={e => e.stopPropagation()}
                 className="hover:opacity-70 transition-colors text-white/70">
                hesun.art
              </a>
              <span className="text-white/40">{" — Metrical classical poetry in various forms. These works have received multiple provincial awards and nationwide recognition."}</span>
            </span>
          </div>
        </div>
      </div>}

      {/* step 7 — Command hint */}
      {step >= 7 && <div className="pl-2">
        <div className="text-white/25">Type &apos;<button onClick={e => { e.stopPropagation(); onClickItem("help"); }} className="text-white hover:opacity-70 transition-opacity cursor-pointer">help</button>&apos; to see more commands...</div>
      </div>}
    </div>
  );
}

// ─── Demo modal ───────────────────────────────────────────────────────────────
function DemoModal({
  project, onClose,
}: {
  project: typeof PROJECTS[number]; onClose: () => void;
}) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 bg-black/85 z-[200] flex items-center justify-center p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="bg-black border border-white/20 w-full max-w-2xl font-mono"
        onClick={e => e.stopPropagation()}
      >
        {/* Modal header */}
        <div className="border-b border-white/10 px-5 py-2.5 flex items-center justify-between text-xs">
          <span className="text-white/40">
            [DEMO] {"displayName" in project && project.displayName ? project.displayName : project.id.toUpperCase().replace(/_/g, " ")}
          </span>
          <button
            onClick={onClose}
            className="text-white/30 hover:text-white transition-colors cursor-pointer"
          >
            ✕ close [esc]
          </button>
        </div>

        {/* Video embed */}
        {project.videoUrl && (
          <div className="aspect-video bg-black">
            <iframe
              src={project.videoUrl}
              className="w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        )}

        {/* Footer links */}
        <div className="border-t border-white/10 px-5 py-3 flex items-center gap-4 text-xs">
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/50 hover:text-white transition-colors"
            >
              ↗ {project.liveLabel ?? "Open Live Demo"}
            </a>
          )}
          {"secondUrl" in project && project.secondUrl && (
            <a
              href={project.secondUrl as string}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/50 hover:text-white transition-colors"
            >
              ↗ {("secondLabel" in project && project.secondLabel) || "Link"}
            </a>
          )}
          <span className="ml-auto text-white/20">{project.stack}</span>
        </div>
      </div>
    </div>
  );
}
