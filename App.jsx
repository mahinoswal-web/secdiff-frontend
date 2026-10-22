import React, { useState } from "react";
import {
  Shield,
  GitBranch,
  Cpu,
  Layers,
  Terminal,
  Copy,
  Check,
  ExternalLink,
  ChevronRight,
  AlertTriangle,
  FileCode2,
  Menu,
  X,
  ArrowUpRight,
  CheckCircle2,
  GitCommit,
  GitPullRequest
} from "lucide-react";

export default function App() {
  const [activeTab, setActiveTab] = useState("git-push");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [copiedIndex, setCopiedIndex] = useState(null);
  const [quickstartStep, setQuickstartStep] = useState(0);

  const navItems = [
    { id: "git-push", label: "Git Push", icon: GitBranch },
    { id: "features", label: "Features", icon: Cpu },
    { id: "protocol", label: "Protocol", icon: Layers },
    { id: "quickstart", label: "Quickstart", icon: Terminal }
  ];

  const quickstartSteps = [
    {
      step: 1,
      title: "Clone Repository",
      command: "git clone https://github.com/YOUR_GITHUB_USERNAME/secdiff-agent.git",
      desc: "Fetch the SecDiff agent codebase into your local environment."
    },
    {
      step: 2,
      title: "Install Dependencies",
      command: "pip install -r requirements.txt",
      desc: "Installs llama-cpp-python, rich, and pydantic for local inference."
    },
    {
      step: 3,
      title: "Audit Local Target File",
      command: 'GEMMA_MODEL_PATH="/path/to/gemma-2-2b-it.gguf" python harness.py test_code.py',
      desc: "Analyzes test_code.py, detects CWE-89, and synthesizes a unified diff."
    },
    {
      step: 4,
      title: "Scan Remote Git Repository",
      command: 'GEMMA_MODEL_PATH="/path/to/gemma-2-2b-it.gguf" python harness.py https://github.com/username/repo.git',
      desc: "Shallow clones into ephemeral storage, audits all .py files, and auto-cleans."
    }
  ];

  const handleCopy = (text, index) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const handleNavClick = (tabId) => {
    setActiveTab(tabId);
    setSidebarOpen(false);
  };

  return (
    <div className="flex h-screen overflow-hidden bg-slate-950 text-slate-300 font-sans selection:bg-cyan-500/30 selection:text-cyan-200 antialiased">
      {/* Mobile Backdrop Overlay */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 bg-black/70 backdrop-blur-sm z-40 md:hidden"
        />
      )}

      {/* Sidebar (Left - Fixed w-64) */}
      <aside
        className={`fixed md:static inset-y-0 left-0 z-50 w-64 flex flex-col justify-between bg-slate-900/60 backdrop-blur-xl border-r border-white/10 transition-transform duration-300 ease-in-out ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
      >
        <div className="flex flex-col flex-1 overflow-y-auto">
          {/* Top Logo */}
          <div className="flex items-center justify-between h-16 px-6 border-b border-white/10">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-gradient-to-tr from-cyan-500 to-emerald-400 p-[1px] shadow-lg shadow-cyan-500/20">
                <div className="w-full h-full bg-slate-950 rounded-[7px] flex items-center justify-center">
                  <Shield className="w-5 h-5 text-cyan-400" />
                </div>
              </div>
              <div>
                <span className="text-lg font-bold tracking-tight text-white flex items-center gap-1">
                  SecDiff <span className="text-sm">🛡️</span>
                </span>
                <span className="block text-[10px] font-mono text-cyan-400 tracking-wider uppercase">
                  Agent v1.0
                </span>
              </div>
            </div>
            <button
              onClick={() => setSidebarOpen(false)}
              className="p-1 rounded-md text-slate-400 hover:text-white md:hidden"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Links */}
          <div className="px-3 py-6 space-y-1.5 flex-1">
            <div className="px-3 mb-2 text-[11px] font-mono uppercase tracking-wider text-slate-500 font-semibold">
              Workflow
            </div>
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                    isActive
                      ? "bg-cyan-500/10 text-cyan-400 border-r-2 border-cyan-400 font-semibold"
                      : "text-slate-400 hover:text-white hover:bg-white/5"
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? "text-cyan-400" : "text-slate-500"}`} />
                  <span>{item.label}</span>
                  {isActive && <ChevronRight className="w-4 h-4 ml-auto text-cyan-400/80" />}
                </button>
              );
            })}
          </div>

          {/* Runtime Status Pill */}
          <div className="px-4 py-3 mx-3 mb-4 rounded-xl bg-white/5 border border-white/10 text-xs font-mono space-y-1">
            <div className="flex items-center gap-2 text-slate-400">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Gemma 2 2B GGUF</span>
            </div>
            <div className="text-[11px] text-slate-500">Local-First · Zero API Cost</div>
          </div>
        </div>

        {/* Sidebar Bottom */}
        <div className="p-4 border-t border-white/10 space-y-2">
          <a
            href="https://github.com/YOUR_GITHUB_USERNAME/secdiff-agent"
            target="_blank"
            rel="noreferrer"
            className="flex items-center justify-between w-full px-3 py-2 text-xs font-medium text-slate-300 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg transition"
          >
            <div className="flex items-center gap-2">
              <ExternalLink className="w-3.5 h-3.5 text-cyan-400" />
              <span>GitHub Repository</span>
            </div>
            <ArrowUpRight className="w-3.5 h-3.5 text-slate-500" />
          </a>
          <div className="text-[10px] text-slate-400 text-center font-mono pt-1">
            MIT License © 2026 SecDiff
          </div>
        </div>
      </aside>

      {/* Main Content Area (Right) */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* Mobile Header Bar */}
        <header className="md:hidden flex items-center justify-between h-16 px-4 bg-slate-900/80 border-b border-white/10 z-30">
          <button
            onClick={() => setSidebarOpen(true)}
            className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 border border-white/10"
          >
            <Menu className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-cyan-400" />
            <span className="font-bold text-white text-sm">SecDiff Agent</span>
          </div>
          <span className="px-2 py-0.5 rounded text-[11px] font-mono bg-cyan-950/60 border border-cyan-500/30 text-cyan-300">
            {activeTab === "git-push" ? "Git Push" : activeTab}
          </span>
        </header>

        {/* Scrollable Dashboard Workspace */}
        <main className="flex-1 overflow-y-auto p-6 md:p-10 relative bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-900 via-slate-950 to-slate-950">
          <div className="pointer-events-none absolute -top-24 right-10 w-96 h-96 bg-cyan-500/10 rounded-full blur-[120px]" />
          <div className="pointer-events-none absolute bottom-10 left-10 w-96 h-96 bg-emerald-500/5 rounded-full blur-[140px]" />

          {/* ================= VIEW 1: GIT PUSH (Automated Remediation & Git Push) ================= */}
          {activeTab === "git-push" && (
            <div className="max-w-6xl mx-auto space-y-8 relative z-10">
              {/* Header */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-white/10">
                <div>
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-cyan-500/30 bg-cyan-950/40 text-cyan-300 text-xs font-mono font-medium mb-3">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    Automated Security Lifecycle
                  </div>
                  <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                    Automated Remediation &{" "}
                    <span className="bg-gradient-to-r from-cyan-400 to-emerald-400 bg-clip-text text-transparent">
                      Git Push.
                    </span>
                  </h1>
                  <p className="mt-2 text-slate-400 text-sm sm:text-base">
                    Detect vulnerabilities, synthesize Unified Git Diff patches, verify with self-critique, and push verified code back to your repository.
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setActiveTab("quickstart")}
                    className="px-5 py-2.5 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-sm shadow-lg shadow-cyan-500/25 transition flex items-center gap-2"
                  >
                    <span>Run Quickstart</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setActiveTab("protocol")}
                    className="px-5 py-2.5 rounded-lg border border-white/20 hover:border-white/40 text-white hover:bg-white/5 font-medium text-sm transition"
                  >
                    Inspect Protocol
                  </button>
                </div>
              </div>

              {/* Metric Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="p-4 rounded-xl bg-white/5 border border-white/10 hover:border-cyan-500/30 transition">
                  <div className="text-xs font-mono text-slate-400 uppercase">Detection Engine</div>
                  <div className="mt-1 text-lg font-bold text-white flex items-center gap-1.5">
                    <AlertTriangle className="w-4 h-4 text-cyan-400" />
                    CWE-89 Identified
                  </div>
                  <div className="mt-1 text-xs text-slate-400">SQL Injection pattern matching</div>
                </div>

                <div className="p-4 rounded-xl bg-white/5 border border-white/10 hover:border-emerald-500/30 transition">
                  <div className="text-xs font-mono text-slate-400 uppercase">Patch Format</div>
                  <div className="mt-1 text-lg font-bold text-white flex items-center gap-1.5">
                    <FileCode2 className="w-4 h-4 text-emerald-400" />
                    Unified Git Diff
                  </div>
                  <div className="mt-1 text-xs text-slate-400">Zero business logic breakage</div>
                </div>

                <div className="p-4 rounded-xl bg-white/5 border border-white/10 hover:border-cyan-500/30 transition">
                  <div className="text-xs font-mono text-slate-400 uppercase">Self-Critique</div>
                  <div className="mt-1 text-lg font-bold text-white flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-cyan-400" />
                    98% Confidence
                  </div>
                  <div className="mt-1 text-xs text-slate-400">VERDICT: READY TO MERGE</div>
                </div>

                <div className="p-4 rounded-xl bg-white/5 border border-white/10 hover:border-emerald-500/30 transition">
                  <div className="text-xs font-mono text-slate-400 uppercase">Remote Lifecycle</div>
                  <div className="mt-1 text-lg font-bold text-white flex items-center gap-1.5">
                    <GitBranch className="w-4 h-4 text-emerald-400" />
                    Auto Git Push
                  </div>
                  <div className="mt-1 text-xs text-slate-400">Committed & pushed to origin/main</div>
                </div>
              </div>

              {/* GitHub-Style Code Viewer & Mock Terminal */}
              <div className="rounded-xl border border-white/10 bg-slate-900 shadow-2xl overflow-hidden">
                {/* macOS Terminal Titlebar */}
                <div className="flex items-center justify-between px-4 py-3 bg-slate-950 border-b border-white/10">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-red-500 inline-block" />
                    <span className="w-3 h-3 rounded-full bg-yellow-500 inline-block" />
                    <span className="w-3 h-3 rounded-full bg-green-500 inline-block" />
                    <span className="ml-3 text-xs font-mono text-slate-400">
                      secdiff-harness: git lifecycle audit & push
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-xs font-mono text-emerald-400">
                    <GitCommit className="w-3.5 h-3.5" />
                    <span>origin/main</span>
                  </div>
                </div>

                {/* Terminal Body */}
                <div className="p-6 font-mono text-sm space-y-4">
                  {/* Command Line */}
                  <div className="text-cyan-400 font-mono text-sm font-semibold">
                    &gt; secdiff-harness: audit &amp;&amp; git push origin main
                  </div>

                  {/* Phase 1 Block: Yellow Alert Box */}
                  <div className="bg-yellow-950/30 border border-yellow-500/30 text-yellow-200 p-3 rounded mt-4 text-xs sm:text-sm">
                    <div className="font-semibold flex items-center gap-2">
                      <AlertTriangle className="w-4 h-4 text-yellow-400 shrink-0" />
                      <span>Phase 1: CWE-89 (SQL Injection) detected in authenticate_user()</span>
                    </div>
                    <div className="text-yellow-200/80 text-xs mt-1.5 leading-relaxed pl-6">
                      Attack Vector: Direct f-string formatting concatenates untrusted user input into raw SQL queries without parameterization.
                    </div>
                  </div>

                  {/* Phase 2: Dedicated Diff Block */}
                  <div className="bg-slate-950 border border-slate-800 rounded p-4 font-mono text-sm mt-3 space-y-1">
                    <div className="text-gray-500 text-xs">--- a/test_code.py</div>
                    <div className="text-gray-500 text-xs">+++ b/test_code.py</div>
                    <div className="text-cyan-400 font-bold text-xs">@@ -11,4 +11,5 @@ def authenticate_user(username, password):</div>
                    <div className="text-red-400 bg-red-950/40 w-full inline-block px-1 rounded text-xs sm:text-sm">
                      - query = f&quot;SELECT * FROM users WHERE username = &apos;{'{'}username{'}'}&apos; AND password = &apos;{'{'}password{'}'}&apos;&quot;
                    </div>
                    <div className="text-red-400 bg-red-950/40 w-full inline-block px-1 rounded text-xs sm:text-sm">
                      - cursor.execute(query)
                    </div>
                    <div className="text-emerald-400 bg-emerald-950/40 w-full inline-block px-1 rounded text-xs sm:text-sm">
                      + query = &quot;SELECT * FROM users WHERE username = ? AND password = ?&quot;
                    </div>
                    <div className="text-emerald-400 bg-emerald-950/40 w-full inline-block px-1 rounded text-xs sm:text-sm">
                      + cursor.execute(query, (username, password))
                    </div>
                  </div>

                  {/* Phase 3 Block: Footer Row with Score and Badge */}
                  <div className="flex items-center justify-between pt-3 mt-3 border-t border-slate-800 text-xs">
                    <span className="text-slate-400">
                      Phase 3 Self-Critique: <strong className="text-cyan-400">98% Confidence</strong>
                    </span>
                    <span className="px-2.5 py-1 rounded bg-emerald-950/80 border border-emerald-500/40 text-emerald-400 font-semibold font-mono">
                      READY TO MERGE
                    </span>
                  </div>

                  {/* Git Push Success Block */}
                  <div className="text-emerald-400 mt-4 font-mono text-xs sm:text-sm space-y-1 bg-emerald-950/20 border border-emerald-500/20 p-3 rounded">
                    <div>[secdiff-git] Committing patch: &quot;Fix CWE-89 in authenticate_user()&quot;</div>
                    <div className="flex items-center gap-1.5 font-bold">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      <span>[secdiff-git] Pushing to remote repository... Success!</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ================= VIEW 2: FEATURES ================= */}
          {activeTab === "features" && (
            <div className="max-w-6xl mx-auto space-y-8 relative z-10">
              <div className="pb-6 border-b border-white/10">
                <span className="text-xs font-mono uppercase tracking-widest text-cyan-400 font-semibold">
                  Core Capabilities
                </span>
                <h1 className="mt-2 text-3xl font-extrabold text-white tracking-tight">
                  Features & Autonomous Capabilities
                </h1>
                <p className="mt-2 text-slate-400 text-sm sm:text-base">
                  Engineered for autonomous defense, offline execution, and zero data leakage.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white/5 border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-all hover:border-cyan-500/30 group">
                  <div className="w-12 h-12 rounded-lg bg-cyan-950/50 border border-cyan-500/30 flex items-center justify-center text-cyan-400 mb-5 group-hover:scale-105 transition-transform">
                    <Cpu className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">Local-First AI</h3>
                  <p className="text-sm text-slate-300 leading-relaxed">
                    Powered by the open-weight <code className="text-cyan-400 font-mono">gemma-2-2b-it-GGUF</code> model. Runs 100% offline and private—no API keys, zero prompt leakage, and zero recurring token costs.
                  </p>
                  <div className="mt-4 pt-3 border-t border-white/5 flex items-center gap-2 text-xs font-mono text-cyan-400">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Fully offline execution
                  </div>
                </div>

                <div className="bg-white/5 border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-all hover:border-emerald-500/30 group">
                  <div className="w-12 h-12 rounded-lg bg-emerald-950/50 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-5 group-hover:scale-105 transition-transform">
                    <GitBranch className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">Repository Scanning</h3>
                  <p className="text-sm text-slate-300 leading-relaxed">
                    Pass any public or private GitHub repository URL. SecDiff automatically performs a shallow git clone into ephemeral directories, audits all Python files, and performs an automatic, safe cleanup upon completion.
                  </p>
                  <div className="mt-4 pt-3 border-t border-white/5 flex items-center gap-2 text-xs font-mono text-emerald-400">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Ephemeral temp directory cleanup
                  </div>
                </div>

                <div className="bg-white/5 border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-all hover:border-cyan-500/30 group">
                  <div className="w-12 h-12 rounded-lg bg-cyan-950/50 border border-cyan-500/30 flex items-center justify-center text-cyan-400 mb-5 group-hover:scale-105 transition-transform">
                    <FileCode2 className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">Auto-Patching</h3>
                  <p className="text-sm text-slate-300 leading-relaxed">
                    Synthesizes unified Git diffs (<code className="text-cyan-400 font-mono">--- a/</code> <code className="text-cyan-400 font-mono">+++ b/</code>) to fix CWE vulnerabilities instantly without altering or breaking application business logic.
                  </p>
                  <div className="mt-4 pt-3 border-t border-white/5 flex items-center gap-2 text-xs font-mono text-cyan-400">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Syntactically verified patches
                  </div>
                </div>

                <div className="bg-white/5 border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-all hover:border-emerald-500/30 group">
                  <div className="w-12 h-12 rounded-lg bg-emerald-950/50 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-5 group-hover:scale-105 transition-transform">
                    <Layers className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">Enterprise Summaries</h3>
                  <p className="text-sm text-slate-300 leading-relaxed">
                    Generates rich terminal tables classifying safe vs. vulnerable files. Supports clean Ctrl+C interrupt handling with partial summary reports so no progress is ever lost.
                  </p>
                  <div className="mt-4 pt-3 border-t border-white/5 flex items-center gap-2 text-xs font-mono text-emerald-400">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Graceful Ctrl+C interruption
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ================= VIEW 3: PROTOCOL ================= */}
          {activeTab === "protocol" && (
            <div className="max-w-5xl mx-auto space-y-8 relative z-10">
              <div className="pb-6 border-b border-white/10">
                <span className="text-xs font-mono uppercase tracking-widest text-emerald-400 font-semibold">
                  Standardized Workflow
                </span>
                <h1 className="mt-2 text-3xl font-extrabold text-white tracking-tight">
                  The 3-Phase Agent Skills Protocol
                </h1>
                <p className="mt-2 text-slate-400 text-sm sm:text-base">
                  Standardized in <code className="text-cyan-400 font-mono">.skills/secdiff/SKILL.md</code> for deterministic, auditable security evaluations.
                </p>
              </div>

              <div className="relative pl-6 sm:pl-8 space-y-10">
                <div className="absolute left-[17px] sm:left-[21px] top-6 bottom-6 w-0.5 bg-gradient-to-b from-cyan-500 via-emerald-500 to-cyan-500" />

                {/* Phase 1 */}
                <div className="relative flex items-start gap-5">
                  <div className="absolute -left-[31px] sm:-left-[35px] w-9 h-9 rounded-lg bg-slate-900 border-2 border-cyan-500 flex items-center justify-center font-mono font-bold text-xs text-cyan-400 shadow-lg shadow-cyan-500/20">
                    01
                  </div>
                  <div className="flex-1 bg-white/5 border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-all">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-mono uppercase tracking-wider text-cyan-400 font-semibold">
                        Phase 1
                      </span>
                      <span className="text-xs font-mono text-slate-400">Vulnerability Detection</span>
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">CWE Identification & Attack Vector</h3>
                    <p className="text-sm text-slate-300 leading-relaxed mb-4">
                      Scans source code to pinpoint Common Weakness Enumeration (<span className="text-cyan-300 font-semibold">CWE</span>) IDs and explains the attack vector in exactly two concise sentences.
                    </p>
                    <div className="p-3 rounded-lg bg-slate-900/90 border border-white/10 text-xs font-mono text-slate-300">
                      <span className="text-yellow-400 font-semibold">[Rule]:</span> Identify CWE name + ID. State input origin, vulnerable sink, and exploitation impact in 2 sentences.
                    </div>
                  </div>
                </div>

                {/* Phase 2 */}
                <div className="relative flex items-start gap-5">
                  <div className="absolute -left-[31px] sm:-left-[35px] w-9 h-9 rounded-lg bg-slate-900 border-2 border-emerald-500 flex items-center justify-center font-mono font-bold text-xs text-emerald-400 shadow-lg shadow-emerald-500/20">
                    02
                  </div>
                  <div className="flex-1 bg-white/5 border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-all">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-mono uppercase tracking-wider text-emerald-400 font-semibold">
                        Phase 2
                      </span>
                      <span className="text-xs font-mono text-slate-400">Patch Synthesis</span>
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">Unified Git Diff Generation</h3>
                    <p className="text-sm text-slate-300 leading-relaxed mb-4">
                      Synthesizes a minimal Unified Git Diff patch (<code className="text-emerald-400 font-mono">--- a/file</code> <code className="text-emerald-400 font-mono">+++ b/file</code>) remediating vulnerabilities while preserving application business logic.
                    </p>
                    <div className="p-3 rounded-lg bg-slate-900/90 border border-white/10 text-xs font-mono text-slate-300">
                      <span className="text-emerald-400 font-semibold">[Rule]:</span> Standard Unified Diff format with chunk headers. Do not alter surrounding functionality.
                    </div>
                  </div>
                </div>

                {/* Phase 3 */}
                <div className="relative flex items-start gap-5">
                  <div className="absolute -left-[31px] sm:-left-[35px] w-9 h-9 rounded-lg bg-slate-900 border-2 border-cyan-500 flex items-center justify-center font-mono font-bold text-xs text-cyan-400 shadow-lg shadow-cyan-500/20">
                    03
                  </div>
                  <div className="flex-1 bg-white/5 border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-all">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-mono uppercase tracking-wider text-cyan-400 font-semibold">
                        Phase 3
                      </span>
                      <span className="text-xs font-mono text-slate-400">Self-Critique</span>
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">Confidence Scoring & Merge Verdict</h3>
                    <p className="text-sm text-slate-300 leading-relaxed mb-4">
                      Inspects the patch for syntax errors, regressions, or unintended side effects. Delivers a Confidence Score (0-100%) and a definitive verdict: <strong className="text-emerald-400 font-mono">READY TO MERGE</strong> or <strong className="text-yellow-400 font-mono">REQUIRES REVISION</strong>.
                    </p>
                    <div className="p-3 rounded-lg bg-slate-900/90 border border-white/10 text-xs font-mono text-slate-300 flex items-center justify-between">
                      <span>Verification Rule: Confidence Score 0-100%</span>
                      <span className="text-emerald-400 font-bold">VERDICT: READY TO MERGE</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ================= VIEW 4: QUICKSTART ================= */}
          {activeTab === "quickstart" && (
            <div className="max-w-6xl mx-auto space-y-8 relative z-10">
              <div className="pb-6 border-b border-white/10">
                <span className="text-xs font-mono uppercase tracking-widest text-cyan-400 font-semibold">
                  Documentation & CLI
                </span>
                <h1 className="mt-2 text-3xl font-extrabold text-white tracking-tight">
                  Quickstart Guide
                </h1>
                <p className="mt-2 text-slate-400 text-sm sm:text-base">
                  Follow these four steps to run autonomous security audits on local files or remote Git repositories.
                </p>
              </div>

              {/* Split Layout */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                {/* Left: Step Selector */}
                <div className="lg:col-span-5 space-y-3">
                  {quickstartSteps.map((item, idx) => (
                    <button
                      key={idx}
                      onClick={() => setQuickstartStep(idx)}
                      className={`w-full text-left p-4 rounded-xl border transition-all flex items-start gap-3.5 ${
                        quickstartStep === idx
                          ? "bg-white/10 border-cyan-500/50 shadow-lg shadow-cyan-500/10"
                          : "bg-white/5 border-white/10 hover:bg-white/10"
                      }`}
                    >
                      <div
                        className={`w-7 h-7 rounded-lg flex items-center justify-center font-mono font-bold text-xs mt-0.5 ${
                          quickstartStep === idx
                            ? "bg-cyan-500 text-slate-950"
                            : "bg-slate-900 text-slate-400 border border-white/10"
                        }`}
                      >
                        0{item.step}
                      </div>
                      <div className="flex-1">
                        <h4 className="text-sm font-bold text-white">{item.title}</h4>
                        <p className="text-xs text-slate-400 mt-1 leading-relaxed">{item.desc}</p>
                      </div>
                      <ChevronRight
                        className={`w-4 h-4 mt-1 transition-transform ${
                          quickstartStep === idx ? "text-cyan-400 translate-x-1" : "text-slate-600"
                        }`}
                      />
                    </button>
                  ))}
                </div>

                {/* Right: Mock macOS Terminal */}
                <div className="lg:col-span-7 rounded-xl border border-white/10 bg-slate-900 shadow-2xl overflow-hidden">
                  <div className="flex items-center justify-between px-4 py-3 bg-slate-950 border-b border-white/10">
                    <div className="flex items-center gap-2">
                      <span className="w-3 h-3 rounded-full bg-red-500 inline-block" />
                      <span className="w-3 h-3 rounded-full bg-yellow-500 inline-block" />
                      <span className="w-3 h-3 rounded-full bg-green-500 inline-block" />
                      <span className="ml-3 text-xs font-mono text-slate-400">
                        bash — step {quickstartSteps[quickstartStep].step} of 4
                      </span>
                    </div>
                    <button
                      onClick={() => handleCopy(quickstartSteps[quickstartStep].command, quickstartStep)}
                      className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-mono text-slate-300 bg-white/5 hover:bg-white/10 border border-white/10 rounded-md transition-colors"
                      title="Copy command"
                    >
                      {copiedIndex === quickstartStep ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                          <span className="text-emerald-400">Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>Copy</span>
                        </>
                      )}
                    </button>
                  </div>

                  <div className="p-6 font-mono text-sm space-y-4">
                    <div className="space-y-1">
                      <div className="text-xs text-slate-500 uppercase tracking-wider font-semibold">
                        # {quickstartSteps[quickstartStep].title}
                      </div>
                      <div className="text-slate-400 text-xs">
                        # {quickstartSteps[quickstartStep].desc}
                      </div>
                    </div>

                    <div className="p-4 rounded-lg bg-slate-950 border border-white/10 overflow-x-auto text-cyan-300 font-mono text-xs sm:text-sm">
                      <div className="flex items-center gap-2">
                        <span className="text-emerald-400 select-none">$</span>
                        <span className="select-all break-all whitespace-pre-wrap">
                          {quickstartSteps[quickstartStep].command}
                        </span>
                      </div>
                    </div>

                    <div className="pt-2 text-xs text-slate-400 space-y-1 font-mono">
                      {quickstartStep === 0 && (
                        <div className="text-slate-500">
                          Cloning into 'secdiff-agent'...<br />
                          remote: Enumerating objects: 42, done.<br />
                          remote: Total 42 (delta 15), reused 39 (delta 12)
                        </div>
                      )}
                      {quickstartStep === 1 && (
                        <div className="text-slate-500">
                          Collecting llama-cpp-python&gt;=0.2.80...<br />
                          Collecting rich&gt;=13.0.0...<br />
                          Successfully installed llama-cpp-python pydantic rich
                        </div>
                      )}
                      {quickstartStep === 2 && (
                        <div className="text-slate-500">
                          <span className="text-cyan-400">Loading model...</span><br />
                          <span className="text-yellow-400">Running security audit and patch generation...</span><br />
                          <span className="text-emerald-400">SecDiff Final Audit Summary: test_code.py [Vulnerable]</span>
                        </div>
                      )}
                      {quickstartStep === 3 && (
                        <div className="text-slate-500">
                          <span className="text-cyan-400">Cloning repository: https://github.com/username/repo.git...</span><br />
                          <span className="text-purple-400">Auditing: /tmp/.../auth.py</span><br />
                          <span className="text-emerald-400">Auto-cleaned temporary audit directories successfully.</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
