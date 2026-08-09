import { useState, useEffect, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  Menu,
  X,
  ArrowRight,
  Check,
  BarChart2,
  Shield,
  Users,
  Layers,
  AlertTriangle,
  Cpu,
  Clock,
  Calendar,
  CheckCircle2,
  ChevronRight,
  Info,
  DollarSign,
  TrendingUp,
  Package,
  Activity,
  ArrowDown
} from "lucide-react";
import logoImg from "../assets/logo.png";

export default function LandingPage() {
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  
  // FEFO Simulator States
  const [fefoQty, setFefoQty] = useState(15);
  const [fefoAllocated, setFefoAllocated] = useState(false);
  const [batchAStock, setBatchAStock] = useState(20);
  const [batchBStock, setBatchBStock] = useState(40);
  const [allocatedA, setAllocatedA] = useState(0);
  const [allocatedB, setAllocatedB] = useState(0);
  const [simulationLog, setSimulationLog] = useState("");

  // Sticky navbar listener
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // FEFO Simulation Handler
  const handleFefoSimulate = (qty) => {
    const q = parseInt(qty) || 0;
    if (q <= 0) return;
    
    setFefoQty(q);
    setFefoAllocated(true);
    
    // Simulate allocation logic
    let remaining = q;
    let takenA = Math.min(remaining, 20); // Max Batch A stock is 20
    remaining -= takenA;
    
    let takenB = Math.min(remaining, 40); // Max Batch B stock is 40
    remaining -= takenB;
    
    setAllocatedA(takenA);
    setAllocatedB(takenB);
    
    setBatchAStock(20 - takenA);
    setBatchBStock(40 - takenB);
    
    let logMsg = "";
    if (takenA > 0 && takenB > 0) {
      logMsg = `FEFO Triggered: Allocated ${takenA} units from Batch A (expires first) and ${takenB} units from Batch B.`;
    } else if (takenA > 0) {
      logMsg = `FEFO Triggered: Allocated all ${takenA} units from Batch A. Batch B is untouched because Batch A satisfies the order.`;
    } else if (takenB > 0) {
      logMsg = `FEFO Triggered: Batch A is empty! Allocated ${takenB} units from Batch B.`;
    } else {
      logMsg = `Insufficient inventory across all batches.`;
    }
    setSimulationLog(logMsg);
  };

  const handleResetFefo = () => {
    setFefoQty(15);
    setFefoAllocated(false);
    setBatchAStock(20);
    setBatchBStock(40);
    setAllocatedA(0);
    setAllocatedB(0);
    setSimulationLog("");
  };

  const scrollToSection = (id) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-[var(--color-background)] font-poppins text-[var(--color-text)] antialiased scroll-smooth">
      {/* SECTION 1 — NAVBAR */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-350 ${
          isScrolled
            ? "bg-slate-900/95 backdrop-blur-md border-b border-slate-850 py-3 shadow-lg"
            : "bg-transparent py-5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => scrollToSection("home")}>
            <div className="w-9 h-9 rounded-lg bg-white p-1 flex items-center justify-center shrink-0 shadow-md">
              <img src={logoImg} alt="Logo" className="w-full h-full object-contain" />
            </div>
            <span className="font-extrabold text-xl tracking-tight text-white">
              NICKY <span className="text-[var(--color-primary)]">FROZEN</span>
            </span>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center gap-8">
            <button
              onClick={() => scrollToSection("home")}
              className="text-sm font-medium text-slate-300 hover:text-white transition-colors cursor-pointer bg-transparent border-none"
            >
              Home
            </button>
            <button
              onClick={() => scrollToSection("features")}
              className="text-sm font-medium text-slate-300 hover:text-white transition-colors cursor-pointer bg-transparent border-none"
            >
              Features
            </button>
            <button
              onClick={() => scrollToSection("fefo")}
              className="text-sm font-medium text-slate-300 hover:text-white transition-colors cursor-pointer bg-transparent border-none"
            >
              FEFO System
            </button>
            <button
              onClick={() => scrollToSection("roles")}
              className="text-sm font-medium text-slate-300 hover:text-white transition-colors cursor-pointer bg-transparent border-none"
            >
              Workflow
            </button>
          </div>

          {/* Primary CTA */}
          <div className="hidden md:flex items-center">
            <Link
              to="/login"
              className="inline-flex items-center justify-center px-5 py-2.5 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-[var(--color-primary-dark)] to-[var(--color-primary)] shadow-md hover:opacity-95 transition-all duration-250 active:scale-[0.98] decoration-none"
            >
              Go to Application
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-slate-300 hover:text-white cursor-pointer bg-transparent border-none"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation Dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-slate-900 border-b border-slate-800 px-6 py-6 flex flex-col gap-4 shadow-xl">
            <button
              onClick={() => scrollToSection("home")}
              className="text-left py-2 text-slate-300 hover:text-white text-base font-semibold bg-transparent border-none cursor-pointer"
            >
              Home
            </button>
            <button
              onClick={() => scrollToSection("features")}
              className="text-left py-2 text-slate-300 hover:text-white text-base font-semibold bg-transparent border-none cursor-pointer"
            >
              Features
            </button>
            <button
              onClick={() => scrollToSection("fefo")}
              className="text-left py-2 text-slate-300 hover:text-white text-base font-semibold bg-transparent border-none cursor-pointer"
            >
              FEFO System
            </button>
            <button
              onClick={() => scrollToSection("roles")}
              className="text-left py-2 text-slate-300 hover:text-white text-base font-semibold bg-transparent border-none cursor-pointer"
            >
              Workflow
            </button>
            <hr className="border-slate-800 my-1" />
            <Link
              to="/login"
              className="w-full text-center py-3 rounded-xl text-white font-semibold bg-gradient-to-r from-[var(--color-primary-dark)] to-[var(--color-primary)] decoration-none"
            >
              Go to Application
            </Link>
          </div>
        )}
      </nav>

      {/* SECTION 2 — HERO */}
      <section
        id="home"
        className="relative pt-32 pb-24 md:pt-40 md:pb-36 bg-slate-950 overflow-hidden flex flex-col items-center justify-center"
      >
        {/* Background Grid Pattern & Radial Lights */}
        <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:32px_32px] opacity-25"></div>
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[60%] rounded-full bg-cyan-900/20 blur-[120px] pointer-events-none"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[60%] rounded-full bg-blue-900/10 blur-[120px] pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-6 relative z-10 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            {/* Hero text content */}
            <div className="lg:col-span-6 text-center lg:text-left">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/80 border border-cyan-800/50 mb-6 shadow-inner">
                <span className="w-2 h-2 rounded-full bg-[var(--color-primary)] animate-pulse"></span>
                <span className="text-xs font-semibold text-cyan-300 tracking-wide uppercase">
                  Frozen Food POS &amp; Inventory Suite
                </span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.1] mb-6">
                Smart POS &amp; <br className="hidden sm:inline" />
                <span className="bg-gradient-to-r from-[var(--color-primary)] to-blue-400 bg-clip-text text-transparent">
                  Inventory Management
                </span>
              </h1>

              <p className="text-base sm:text-lg text-slate-400 max-w-xl mx-auto lg:mx-0 leading-relaxed mb-8">
                Manage sales, inventory, batches, expiration dates, and daily operations in one integrated system. Tailored specifically for frozen food businesses.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                <Link
                  to="/login"
                  className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-3.5 rounded-xl font-bold text-white bg-gradient-to-r from-[var(--color-primary-dark)] to-[var(--color-primary)] shadow-lg shadow-cyan-500/20 hover:scale-[1.01] transition-transform cursor-pointer decoration-none"
                >
                  Go to Application
                  <ArrowRight className="w-5 h-5 ml-2.5" />
                </Link>
                <button
                  onClick={() => scrollToSection("features")}
                  className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-3.5 rounded-xl font-bold text-slate-300 hover:text-white bg-slate-900 border border-slate-800 hover:bg-slate-800 transition-colors cursor-pointer"
                >
                  Explore Features
                </button>
              </div>
            </div>

            {/* Hero Visual Mockup */}
            <div className="lg:col-span-6 flex justify-center">
              <div className="w-full max-w-lg lg:max-w-xl rounded-2xl border border-slate-800 bg-slate-900/90 shadow-2xl p-4 md:p-6 backdrop-blur-sm relative transition-all duration-300 hover:border-cyan-800/45">
                {/* Dashboard top frame */}
                <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-4">
                  <div className="flex items-center gap-1.5">
                    <span className="w-3 h-3 rounded-full bg-red-500/80"></span>
                    <span className="w-3 h-3 rounded-full bg-yellow-500/80"></span>
                    <span className="w-3 h-3 rounded-full bg-green-500/80"></span>
                    <span className="text-xs font-semibold text-slate-500 ml-2">NICKY POS Dashboard (Mockup)</span>
                  </div>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 font-bold border border-emerald-500/20">
                    Live Status
                  </span>
                </div>

                {/* Dashboard grid layout */}
                <div className="grid grid-cols-3 gap-3 mb-4">
                  <div className="rounded-xl bg-slate-950 p-3 border border-slate-800">
                    <div className="flex items-center justify-between text-slate-400 mb-1">
                      <span className="text-[10px] font-medium">Today Sales</span>
                      <DollarSign className="w-3 h-3 text-cyan-400" />
                    </div>
                    <span className="text-xs sm:text-sm font-bold text-white">Rp 2.450.000</span>
                  </div>
                  <div className="rounded-xl bg-slate-950 p-3 border border-slate-800">
                    <div className="flex items-center justify-between text-slate-400 mb-1">
                      <span className="text-[10px] font-medium">Batch Active</span>
                      <Layers className="w-3 h-3 text-emerald-400" />
                    </div>
                    <span className="text-xs sm:text-sm font-bold text-white">42 Batches</span>
                  </div>
                  <div className="rounded-xl bg-slate-950 p-3 border border-slate-800">
                    <div className="flex items-center justify-between text-slate-400 mb-1">
                      <span className="text-[10px] font-medium">Low Stock</span>
                      <AlertTriangle className="w-3 h-3 text-amber-500" />
                    </div>
                    <span className="text-xs sm:text-sm font-bold text-white">5 Items</span>
                  </div>
                </div>

                {/* Main section visual content */}
                <div className="rounded-xl bg-slate-950 p-4 border border-slate-800">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[11px] font-semibold text-slate-300">Sales Intelligence Trends</span>
                    <span className="text-[10px] text-slate-500">Last 7 Days</span>
                  </div>

                  {/* SVG Chart Drawing */}
                  <div className="h-28 flex items-end justify-between pt-4 pb-1">
                    {[35, 45, 30, 60, 80, 55, 90].map((h, idx) => (
                      <div key={idx} className="flex flex-col items-center gap-1.5 w-full">
                        <div className="w-6 bg-gradient-to-t from-cyan-600/30 to-cyan-400 rounded-t-sm transition-all duration-500 hover:opacity-80" style={{ height: `${h}%` }}></div>
                        <span className="text-[8px] text-slate-600">Day {idx + 1}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Footer mockup alert */}
                <div className="flex items-center gap-2.5 mt-3 p-2.5 rounded-lg bg-red-950/20 border border-red-900/30 text-red-400">
                  <AlertTriangle className="w-4 h-4 shrink-0" />
                  <span className="text-[10px] font-medium">
                    Batch Warning: Product "Chicken Nugget (Batch A)" expires in 7 days! Prioritizing FEFO.
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3 — TRUST / VALUE STATEMENT */}
      <section className="py-16 bg-slate-900 border-y border-slate-800">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-xs font-semibold text-[var(--color-primary)] tracking-widest uppercase mb-3">
              Core Paradigm
            </h2>
            <p className="text-2xl sm:text-3xl font-bold text-white leading-snug">
              "More than a cashier system."
            </p>
            <p className="text-base text-slate-400 leading-relaxed mt-4">
              Nicky Frozen unites sales point checkout, multi-batch warehouse tracking, FEFO batch prioritization, real-time expiration monitoring, and role-based operational permissions into one unified dashboard. Eliminate stock loss and automate frozen food compliance effortlessly.
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 4 — CORE FEATURES */}
      <section id="features" className="py-24 bg-[var(--color-background)]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-xs font-semibold text-[var(--color-primary-dark)] tracking-wider uppercase mb-3">
              Comprehensive Platform
            </h2>
            <h3 className="text-3xl sm:text-4xl font-bold text-slate-900">
              Built to Solve Frozen Food Operations
            </h3>
            <p className="text-slate-500 mt-3 text-sm sm:text-base">
              Say goodbye to manual stock audits and expired wastage. Here is what Nicky Frozen does out of the box.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm transition-all duration-300 hover:shadow-md hover:scale-[1.01]">
              <div className="w-12 h-12 rounded-xl bg-cyan-50 flex items-center justify-center text-cyan-600 mb-5">
                <BarChart2 className="w-6 h-6" />
              </div>
              <h4 className="text-lg font-bold text-slate-900 mb-2">POS &amp; Checkout</h4>
              <p className="text-sm text-slate-500 leading-relaxed">
                Process daily sales quickly with a role-based POS workflow, holding transactions, and generating clean receipt invoices instantly.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm transition-all duration-300 hover:shadow-md hover:scale-[1.01]">
              <div className="w-12 h-12 rounded-xl bg-cyan-50 flex items-center justify-center text-cyan-600 mb-5">
                <Layers className="w-6 h-6" />
              </div>
              <h4 className="text-lg font-bold text-slate-900 mb-2">Multi-Batch Inventory</h4>
              <p className="text-sm text-slate-500 leading-relaxed">
                Track stock according to individual batches, receiving dates, and varying cost prices, allowing precise profit margin control.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm transition-all duration-300 hover:shadow-md hover:scale-[1.01]">
              <div className="w-12 h-12 rounded-xl bg-cyan-50 flex items-center justify-center text-cyan-600 mb-5">
                <Clock className="w-6 h-6" />
              </div>
              <h4 className="text-lg font-bold text-slate-900 mb-2">FEFO Allocation</h4>
              <p className="text-sm text-slate-500 leading-relaxed">
                First-Expired-First-Out automation. The checkout automatically selects stock from the batch with the nearest expiration date.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm transition-all duration-300 hover:shadow-md hover:scale-[1.01]">
              <div className="w-12 h-12 rounded-xl bg-cyan-50 flex items-center justify-center text-cyan-600 mb-5">
                <Calendar className="w-6 h-6" />
              </div>
              <h4 className="text-lg font-bold text-slate-900 mb-2">Expiration Monitoring</h4>
              <p className="text-sm text-slate-500 leading-relaxed">
                Monitor expired and soon-to-expire inventory proactively. Get color-coded warnings before products become operational losses.
              </p>
            </div>

            {/* Feature 5 */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm transition-all duration-300 hover:shadow-md hover:scale-[1.01]">
              <div className="w-12 h-12 rounded-xl bg-cyan-50 flex items-center justify-center text-cyan-600 mb-5">
                <Cpu className="w-6 h-6" />
              </div>
              <h4 className="text-lg font-bold text-slate-900 mb-2">Inventory Intelligence</h4>
              <p className="text-sm text-slate-500 leading-relaxed">
                Understand stock conditions and trends through comprehensive analytical reports, branch syncing logs, and recommendation triggers.
              </p>
            </div>

            {/* Feature 6 */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm transition-all duration-300 hover:shadow-md hover:scale-[1.01]">
              <div className="w-12 h-12 rounded-xl bg-cyan-50 flex items-center justify-center text-cyan-600 mb-5">
                <Users className="w-6 h-6" />
              </div>
              <h4 className="text-lg font-bold text-slate-900 mb-2">Multi-Role Access</h4>
              <p className="text-sm text-slate-500 leading-relaxed">
                Separate Owner, Admin, and Cashier permissions. Make sure cashiers handle transactions while admins control inventory batches.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 5 — FEFO EXPLANATION */}
      <section id="fefo" className="py-24 bg-slate-950 text-white relative">
        <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-slate-800 to-transparent"></div>
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            {/* Left explanation text */}
            <div className="lg:col-span-5">
              <span className="text-xs font-bold text-[var(--color-primary)] uppercase tracking-wider block mb-3">
                Intelligent Allocation
              </span>
              <h3 className="text-3xl sm:text-4xl font-extrabold tracking-tight leading-tight">
                How FEFO Works in Nicky Frozen
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed mt-4">
                Because frozen goods have different lifespans, a single product (e.g. <em>Chicken Nuggets</em>) can consist of multiple batches with different expiration dates.
              </p>
              <p className="text-slate-400 text-sm leading-relaxed mt-3">
                When a cashier processes an order, our checkout engine evaluates all active batches in real-time, automatically earmarking items from the batch expiring first.
              </p>
              <div className="mt-8 p-4 rounded-xl bg-slate-900 border border-slate-800 flex items-start gap-3">
                <Info className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
                <div className="text-xs text-slate-400 leading-relaxed">
                  <strong className="text-white block mb-0.5">Interactive Demo:</strong>
                  Try checking out different quantities on the right panel to see the algorithm allocate stock dynamically!
                </div>
              </div>
            </div>

            {/* Right FEFO simulation console */}
            <div className="lg:col-span-7 bg-slate-900 rounded-2xl border border-slate-800 p-6 shadow-xl relative overflow-hidden">
              <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-6">
                <span className="text-sm font-bold text-white flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-cyan-400"></span>
                  FEFO Live Simulation
                </span>
                <button
                  onClick={handleResetFefo}
                  className="text-xs font-semibold text-slate-400 hover:text-white px-2.5 py-1 rounded bg-slate-800 border border-slate-700 transition-all cursor-pointer"
                >
                  Reset Demo
                </button>
              </div>

              {/* Product Representation */}
              <div className="mb-6 p-4 rounded-xl bg-slate-950 border border-slate-850">
                <div className="flex justify-between items-center mb-3">
                  <div>
                    <span className="text-xs font-semibold text-slate-400">Target Product</span>
                    <h5 className="text-sm font-bold text-white">Chicken Nugget (Premium)</h5>
                  </div>
                  <span className="text-xs px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 font-semibold border border-cyan-800/30">
                    Total Stock: {batchAStock + batchBStock} units
                  </span>
                </div>

                <div className="space-y-4">
                  {/* Batch A representation */}
                  <div className={`p-3 rounded-lg border transition-all duration-300 ${
                    fefoAllocated && allocatedA > 0
                      ? "border-emerald-500/40 bg-emerald-950/10 shadow-inner"
                      : "border-slate-800 bg-slate-900"
                  }`}>
                    <div className="flex justify-between text-xs mb-1.5">
                      <span className="font-semibold text-white flex items-center gap-1.5">
                        Batch A 
                        <span className="text-[10px] font-bold text-red-400 px-1.5 py-0.5 rounded bg-red-950/50 border border-red-900/30">
                          Expires: 10 Aug (Soon)
                        </span>
                      </span>
                      <span className="text-slate-400">Stock: {batchAStock} / 20</span>
                    </div>
                    {/* Visual Bar progress indicator */}
                    <div className="w-full bg-slate-950 h-3.5 rounded-full overflow-hidden flex relative">
                      {/* Old stock indicator */}
                      <div className="h-full bg-cyan-500/80 transition-all duration-500" style={{ width: `${(batchAStock / 20) * 100}%` }}></div>
                      {/* Allocated visualization */}
                      {fefoAllocated && allocatedA > 0 && (
                        <div className="h-full bg-emerald-500/90 animate-pulse absolute right-0 top-0 bottom-0" style={{ width: `${(allocatedA / 20) * 100}%` }}></div>
                      )}
                    </div>
                    {fefoAllocated && allocatedA > 0 && (
                      <span className="text-[10px] text-emerald-400 font-semibold mt-1 block">
                        ✓ Allocated {allocatedA} units via FEFO (prioritized)
                      </span>
                    )}
                  </div>

                  {/* Batch B representation */}
                  <div className={`p-3 rounded-lg border transition-all duration-300 ${
                    fefoAllocated && allocatedB > 0
                      ? "border-emerald-500/40 bg-emerald-950/10"
                      : "border-slate-800 bg-slate-900"
                  }`}>
                    <div className="flex justify-between text-xs mb-1.5">
                      <span className="font-semibold text-white flex items-center gap-1.5">
                        Batch B 
                        <span className="text-[10px] font-bold text-slate-400 px-1.5 py-0.5 rounded bg-slate-800 border border-slate-700">
                          Expires: 25 Aug (Later)
                        </span>
                      </span>
                      <span className="text-slate-400">Stock: {batchBStock} / 40</span>
                    </div>
                    {/* Visual Bar progress indicator */}
                    <div className="w-full bg-slate-950 h-3.5 rounded-full overflow-hidden flex relative">
                      {/* Old stock indicator */}
                      <div className="h-full bg-cyan-600/50 transition-all duration-500" style={{ width: `${(batchBStock / 40) * 100}%` }}></div>
                      {/* Allocated visualization */}
                      {fefoAllocated && allocatedB > 0 && (
                        <div className="h-full bg-emerald-500/90 animate-pulse absolute right-0 top-0 bottom-0" style={{ width: `${(allocatedB / 40) * 100}%` }}></div>
                      )}
                    </div>
                    {fefoAllocated && allocatedB > 0 && (
                      <span className="text-[10px] text-emerald-400 font-semibold mt-1 block">
                        ✓ Allocated {allocatedB} units (taken after Batch A depleted)
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Slider for Checkout Qty */}
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-850">
                <div className="flex justify-between items-center text-xs mb-2">
                  <span className="font-medium text-slate-400">Select Checkout Quantity</span>
                  <span className="font-extrabold text-white bg-slate-900 px-2.5 py-1 rounded border border-slate-800">{fefoQty} Units</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="60"
                  value={fefoQty}
                  onChange={(e) => handleFefoSimulate(e.target.value)}
                  className="w-full accent-cyan-400 cursor-pointer py-2 bg-transparent"
                />

                <div className="flex justify-between text-[10px] text-slate-600 mt-1">
                  <span>1 Unit</span>
                  <span>30 Units</span>
                  <span>60 Units (Full Stock)</span>
                </div>
              </div>

              {/* Log Messages Console */}
              {simulationLog && (
                <div className="mt-4 p-3 rounded-lg bg-slate-950 border border-cyan-950 text-[11px] font-mono text-cyan-400 leading-relaxed shadow-inner">
                  {simulationLog}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 6 — INVENTORY INTELLIGENCE */}
      <section className="py-24 bg-[var(--color-background)]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-bold text-cyan-600 uppercase tracking-widest block mb-3">
              Automated Operations
            </span>
            <h3 className="text-3xl sm:text-4xl font-extrabold text-slate-900 leading-tight">
              Real-time Inventory Intelligence
            </h3>
            <p className="text-slate-500 mt-3 text-sm sm:text-base">
              The system analyzes stock parameters dynamically, generating dashboards, alerts, and batch recommendations.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            {/* Left widget: Inventory Health */}
            <div className="lg:col-span-4 bg-white rounded-2xl border border-slate-200 p-6 flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow">
              <div>
                <h4 className="font-bold text-slate-900 mb-1">Inventory Health</h4>
                <p className="text-xs text-slate-500 mb-6">Illustrative distribution representation</p>
                
                {/* Visual health bar indicator */}
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-xs font-semibold mb-1">
                      <span className="text-emerald-600">Healthy Stock</span>
                      <span>82%</span>
                    </div>
                    <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                      <div className="bg-emerald-500 h-full" style={{ width: "82%" }}></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-xs font-semibold mb-1">
                      <span className="text-amber-600">Warning (Near Expiry)</span>
                      <span>13%</span>
                    </div>
                    <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                      <div className="bg-amber-500 h-full" style={{ width: "13%" }}></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-xs font-semibold mb-1">
                      <span className="text-rose-600">Critical (Low / Expired)</span>
                      <span>5%</span>
                    </div>
                    <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                      <div className="bg-rose-500 h-full" style={{ width: "5%" }}></div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                <span>Updated just now</span>
                <span className="font-semibold text-slate-950">Safe Level</span>
              </div>
            </div>

            {/* Middle widget: Expired soon alerts */}
            <div className="lg:col-span-4 bg-white rounded-2xl border border-slate-200 p-6 flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow">
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h4 className="font-bold text-slate-900">Expired Soon Alerts</h4>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-rose-50 text-rose-600 font-bold border border-rose-100">
                    3 Batches
                  </span>
                </div>

                <div className="space-y-3">
                  <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-150 flex items-center justify-between">
                    <div>
                      <h5 className="text-xs font-bold text-slate-900">Premium Fish Roll</h5>
                      <span className="text-[9px] text-slate-500">Batch #F39 - Expiry 14 Aug</span>
                    </div>
                    <span className="text-[9px] px-2 py-0.5 rounded bg-rose-50 text-rose-600 font-semibold border border-rose-200">5 Days Left</span>
                  </div>

                  <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-150 flex items-center justify-between">
                    <div>
                      <h5 className="text-xs font-bold text-slate-900">Premium Beef Meatball</h5>
                      <span className="text-[9px] text-slate-500">Batch #B21 - Expiry 19 Aug</span>
                    </div>
                    <span className="text-[9px] px-2 py-0.5 rounded bg-rose-50 text-rose-600 font-semibold border border-rose-200">10 Days Left</span>
                  </div>

                  <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-150 flex items-center justify-between">
                    <div>
                      <h5 className="text-xs font-bold text-slate-900">Premium Potato Fries</h5>
                      <span className="text-[9px] text-slate-500">Batch #P09 - Expiry 21 Aug</span>
                    </div>
                    <span className="text-[9px] px-2 py-0.5 rounded bg-rose-50 text-rose-600 font-semibold border border-rose-200">12 Days Left</span>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 text-xs text-slate-500 flex items-center gap-1.5">
                <Info className="w-3.5 h-3.5 text-slate-400" />
                <span>Automatically notifies Admin of near-expiries</span>
              </div>
            </div>

            {/* Right widget: Low Stock monitoring */}
            <div className="lg:col-span-4 bg-white rounded-2xl border border-slate-200 p-6 flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow">
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h4 className="font-bold text-slate-900">Low Stock Monitoring</h4>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-50 text-amber-600 font-bold border border-amber-100">
                    7 Products
                  </span>
                </div>

                <div className="space-y-3">
                  <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-150">
                    <div className="flex justify-between items-center mb-1">
                      <h5 className="text-xs font-bold text-slate-900">Spicy Chicken Wing</h5>
                      <span className="text-xs font-bold text-slate-900">4 Pcs Left</span>
                    </div>
                    <div className="w-full bg-slate-100 h-1.5 rounded-full">
                      <div className="bg-amber-500 h-full" style={{ width: "20%" }}></div>
                    </div>
                  </div>

                  <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-150">
                    <div className="flex justify-between items-center mb-1">
                      <h5 className="text-xs font-bold text-slate-900">Frozen Edamame</h5>
                      <span className="text-xs font-bold text-slate-900">2 Pcs Left</span>
                    </div>
                    <div className="w-full bg-slate-100 h-1.5 rounded-full">
                      <div className="bg-amber-500 h-full" style={{ width: "10%" }}></div>
                    </div>
                  </div>

                  <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-150">
                    <div className="flex justify-between items-center mb-1">
                      <h5 className="text-xs font-bold text-slate-900">Premium Fish Dumpling</h5>
                      <span className="text-xs font-bold text-slate-900">0 Pcs Left</span>
                    </div>
                    <div className="w-full bg-slate-100 h-1.5 rounded-full">
                      <div className="bg-rose-500 h-full" style={{ width: "0%" }}></div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 text-xs text-slate-500 flex items-center gap-1.5">
                <Info className="w-3.5 h-3.5 text-slate-400" />
                <span>Triggers branch sync restocking suggestions</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 7 — ROLE-BASED WORKFLOW */}
      <section id="roles" className="py-24 bg-slate-950 text-white relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-bold text-[var(--color-primary)] uppercase tracking-wider block mb-3">
              Operational Roles
            </span>
            <h3 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              Designed For Multi-Role Businesses
            </h3>
            <p className="text-slate-400 mt-3 text-sm sm:text-base">
              Nicky Frozen features customized user experiences tailored specifically to individual responsibility layers.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Owner Role Card */}
            <div className="bg-slate-900/60 rounded-2xl border border-slate-800 p-6 flex flex-col justify-between hover:border-cyan-800/30 transition-all duration-300 hover:scale-[1.01]">
              <div>
                <div className="w-10 h-10 rounded-xl bg-cyan-950/80 border border-cyan-800/40 flex items-center justify-center text-cyan-400 mb-6 font-bold">
                  OW
                </div>
                <h4 className="text-lg font-bold text-white mb-2 font-poppins">OWNER</h4>
                <p className="text-slate-400 text-xs leading-relaxed mb-6">
                  Monitor complete business viability, manage administrative roles, supervise inventory ledgers across branches, and view visual analytical breakdowns.
                </p>

                <ul className="space-y-2.5 text-xs text-slate-300 p-0 m-0 list-none">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                    <span>Real-time Business Monitor</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                    <span>User Role Management</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                    <span>Multi-Branch Reports</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                    <span>Analytical Ledgers</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Admin Role Card */}
            <div className="bg-slate-900/60 rounded-2xl border border-slate-800 p-6 flex flex-col justify-between hover:border-cyan-800/30 transition-all duration-300 hover:scale-[1.01]">
              <div>
                <div className="w-10 h-10 rounded-xl bg-cyan-950/80 border border-cyan-800/40 flex items-center justify-center text-cyan-400 mb-6 font-bold">
                  AD
                </div>
                <h4 className="text-lg font-bold text-white mb-2 font-poppins">ADMIN</h4>
                <p className="text-slate-400 text-xs leading-relaxed mb-6">
                  Control stock and inventory, register incoming batches, monitor expiration timelines, transfer inventory items, and coordinate branch restock syncing.
                </p>

                <ul className="space-y-2.5 text-xs text-slate-300 p-0 m-0 list-none">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                    <span>Products &amp; Categories Setup</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                    <span>New Stock Batch Registry</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                    <span>Expiration Alert Timelines</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                    <span>Branch Sync RESTOCK Requests</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Kasir Role Card */}
            <div className="bg-slate-900/60 rounded-2xl border border-slate-800 p-6 flex flex-col justify-between hover:border-cyan-800/30 transition-all duration-300 hover:scale-[1.01]">
              <div>
                <div className="w-10 h-10 rounded-xl bg-cyan-950/80 border border-cyan-800/40 flex items-center justify-center text-cyan-400 mb-6 font-bold">
                  KS
                </div>
                <h4 className="text-lg font-bold text-white mb-2 font-poppins">KASIR</h4>
                <p className="text-slate-400 text-xs leading-relaxed mb-6">
                  Process daily customer orders, secure payment handshakes, hold ongoing checkout states, finalize reports, and track transaction history.
                </p>

                <ul className="space-y-2.5 text-xs text-slate-300 p-0 m-0 list-none">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                    <span>Automated FEFO Checkout POS</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                    <span>Hold Transactions &amp; Recall</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                    <span>Instant Receipts Printing</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                    <span>Daily Close Book Reports</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 8 — SYSTEM WORKFLOW */}
      <section className="py-24 bg-[var(--color-background)] border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-bold text-cyan-600 uppercase tracking-widest block mb-3">
              Unified Cycle
            </span>
            <h3 className="text-3xl sm:text-4xl font-extrabold text-slate-900 leading-tight">
              Operational System Workflow
            </h3>
            <p className="text-slate-500 mt-3 text-sm sm:text-base">
              See the complete lifecycle and how each piece fits together in our inventory machine.
            </p>
          </div>

          {/* Workflow Step-by-Step Blocks */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-6 relative">
            {[
              { num: "01", title: "RESTOCK", desc: "Incoming items from vendors" },
              { num: "02", title: "NEW BATCH", desc: "Batch numbers & expiry logged" },
              { num: "03", title: "INVENTORY", desc: "Stock is tracked per branch" },
              { num: "04", title: "FEFO", desc: "Algorithm scans expiry dates" },
              { num: "05", title: "CHECKOUT", desc: "Cashier prints transaction invoice" },
              { num: "06", title: "INTELLIGENCE", desc: "Owner views analytics report" }
            ].map((step, idx) => (
              <div key={idx} className="bg-white rounded-xl border border-slate-200 p-5 flex flex-col justify-between shadow-sm relative group hover:border-cyan-500 transition-colors">
                <div>
                  <span className="text-2xl font-extrabold text-slate-200 group-hover:text-cyan-100 transition-colors block mb-2">{step.num}</span>
                  <h5 className="font-bold text-slate-900 text-sm mb-1">{step.title}</h5>
                  <p className="text-[11px] text-slate-500 leading-normal">{step.desc}</p>
                </div>
                
                {/* Horizontal chevron icon indicating flow */}
                {idx < 5 && (
                  <div className="hidden lg:flex absolute top-1/2 -right-3.5 transform -translate-y-1/2 z-10 w-7 h-7 items-center justify-center rounded-full bg-white border border-slate-200 shadow-sm text-slate-400 group-hover:text-cyan-500 group-hover:border-cyan-200 transition-all">
                    <ChevronRight className="w-4 h-4" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 9 — SECURITY / RELIABILITY */}
      <section className="py-20 bg-slate-900 text-white relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h3 className="text-3xl font-extrabold tracking-tight">
              Enterprise Grade Safety &amp; Reliability
            </h3>
            <p className="text-slate-400 text-sm mt-3">
              Rest assured your database operations are secure, stable, and protected against race conditions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 rounded-xl bg-slate-850/50 border border-slate-800">
              <div className="w-10 h-10 rounded-lg bg-cyan-950/80 border border-cyan-800/40 flex items-center justify-center text-cyan-400 mb-4">
                <Shield className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-white mb-2 text-base">Protected JWT Routes</h4>
              <p className="text-slate-400 text-xs leading-relaxed">
                Role-based verification rules authenticate routes. Client JWT headers secure API responses, ensuring information isolation across cashier roles.
              </p>
            </div>

            <div className="p-6 rounded-xl bg-slate-850/50 border border-slate-800">
              <div className="w-10 h-10 rounded-lg bg-cyan-950/80 border border-cyan-800/40 flex items-center justify-center text-cyan-400 mb-4">
                <Check className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-white mb-2 text-base">Transaction Safety</h4>
              <p className="text-slate-400 text-xs leading-relaxed">
                Database queries implement transaction isolation to protect inventory records. Branch inventories remain perfectly in sync under simultaneous checkout requests.
              </p>
            </div>

            <div className="p-6 rounded-xl bg-slate-850/50 border border-slate-800">
              <div className="w-10 h-10 rounded-lg bg-cyan-950/80 border border-cyan-800/40 flex items-center justify-center text-cyan-400 mb-4">
                <Users className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-white mb-2 text-base">Branch-Level Access</h4>
              <p className="text-slate-400 text-xs leading-relaxed">
                Admins and cashiers are isolated to their registered branch warehouse. Avoid cross-contamination of products while owners retain complete multi-branch analytics.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 10 — CTA */}
      <section className="py-24 bg-slate-950 text-white relative overflow-hidden flex flex-col items-center">
        <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:24px_24px] opacity-10"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60%] h-[60%] rounded-full bg-cyan-900/10 blur-[100px] pointer-events-none"></div>

        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <h3 className="text-3xl sm:text-4xl font-extrabold tracking-tight leading-tight mb-4">
            Ready to manage your frozen food business smarter?
          </h3>
          <p className="text-slate-400 text-sm max-w-xl mx-auto leading-relaxed mb-8">
            Access the Nicky Frozen management system and start managing sales, stock batches, FEFO queues, and multi-branch reports from one integrated panel.
          </p>

          <Link
            to="/login"
            className="inline-flex items-center justify-center px-8 py-3.5 rounded-xl font-bold text-white bg-gradient-to-r from-[var(--color-primary-dark)] to-[var(--color-primary)] shadow-lg shadow-cyan-500/20 hover:scale-[1.01] transition-transform duration-200 cursor-pointer decoration-none"
          >
            Go to Application
            <ArrowRight className="w-5 h-5 ml-2.5" />
          </Link>
        </div>
      </section>

      {/* SECTION 11 — FOOTER */}
      <footer className="bg-slate-950 text-slate-500 text-xs border-t border-slate-900 py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-12">
            {/* Branding */}
            <div className="md:col-span-5">
              <div className="flex items-center gap-2.5 mb-4">
                <div className="w-7 h-7 rounded-md bg-white p-0.5 flex items-center justify-center shrink-0">
                  <img src={logoImg} alt="Logo" className="w-full h-full object-contain" />
                </div>
                <span className="font-extrabold text-base tracking-tight text-white">
                  NICKY <span className="text-[var(--color-primary)]">FROZEN</span>
                </span>
              </div>
              <p className="text-slate-400 leading-relaxed max-w-sm mb-4">
                Integrated Point of Sale (POS) and Multi-batch Inventory Management System optimized for the frozen food supply chain.
              </p>
              <div className="text-[10px] text-slate-600">
                Technology Stack: MongoDB, Express.js, React, Node.js (MERN)
              </div>
            </div>

            {/* Quick Links */}
            <div className="md:col-span-3">
              <h5 className="font-bold text-slate-300 text-sm uppercase mb-4 font-poppins">Navigation</h5>
              <ul className="space-y-2.5 p-0 m-0 list-none">
                <li>
                  <button onClick={() => scrollToSection("home")} className="hover:text-white transition-colors cursor-pointer bg-transparent border-none text-slate-500 text-xs">
                    Home
                  </button>
                </li>
                <li>
                  <button onClick={() => scrollToSection("features")} className="hover:text-white transition-colors cursor-pointer bg-transparent border-none text-slate-500 text-xs">
                    Features
                  </button>
                </li>
                <li>
                  <button onClick={() => scrollToSection("fefo")} className="hover:text-white transition-colors cursor-pointer bg-transparent border-none text-slate-500 text-xs">
                    FEFO System
                  </button>
                </li>
                <li>
                  <button onClick={() => scrollToSection("roles")} className="hover:text-white transition-colors cursor-pointer bg-transparent border-none text-slate-500 text-xs">
                    Workflow
                  </button>
                </li>
              </ul>
            </div>

            {/* Support info */}
            <div className="md:col-span-4">
              <h5 className="font-bold text-slate-300 text-sm uppercase mb-4 font-poppins">Application Entry</h5>
              <p className="text-slate-400 leading-relaxed mb-4">
                Are you an employee, manager, or owner? Access the operations dashboard directly.
              </p>
              <Link
                to="/login"
                className="inline-flex items-center gap-1.5 font-semibold text-[var(--color-primary)] hover:text-cyan-300 transition-colors decoration-none"
              >
                Go to Application Log In
                <ChevronRight className="w-4.5 h-4.5" />
              </Link>
            </div>
          </div>

          <div className="border-t border-slate-900 pt-8 flex flex-col sm:flex-row items-center justify-between text-slate-650">
            <span>&copy; {new Date().getFullYear()} Nicky Frozen POS System. All rights reserved.</span>
            <div className="flex gap-4 mt-4 sm:mt-0">
              <a href="#" className="hover:text-slate-400 text-slate-600 decoration-none">Terms of Service</a>
              <span>&bull;</span>
              <a href="#" className="hover:text-slate-400 text-slate-600 decoration-none">Privacy Policy</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
