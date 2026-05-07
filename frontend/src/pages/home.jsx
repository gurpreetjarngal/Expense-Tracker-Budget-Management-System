import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";

const Home = () => {
  const navigate = useNavigate();
  const { token } = useSelector((state) => state.auth);

  if (token) {
    return <Navigate to="/app" replace />;
  }

  const handleNavigate = (path) => {
    navigate(path);
  };

  const openRegister = () => {
    navigate("/auth?mode=register");
  };

  return (
    <div className="w-screen max-w-full overflow-x-hidden bg-[#0A0F1E]">
      {/* HEADER */}
      <header className="bg-[#0A0F1E] text-white shadow-lg min-h-16 flex items-center justify-center border-b border-emerald-900/50 sticky top-0 z-50 backdrop-blur-sm">
        <nav className="flex justify-between items-center w-full max-w-7xl px-3 sm:px-6 lg:px-10">
          <h1 className="text-base sm:text-xl text-emerald-400 font-bold tracking-tight whitespace-nowrap">
            Expense<span className="text-white">Flow</span>
          </h1>

          <div className="flex gap-2 sm:gap-3">
            <button
              type="button"
              onClick={openRegister}
              className="bg-emerald-500 hover:bg-emerald-400 px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all duration-200 shadow-lg shadow-emerald-900/40"
            >
              Get Started
            </button>
            <button
              type="button"
              onClick={() => handleNavigate("/auth")}
              className="border border-emerald-900 hover:border-emerald-500 px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm text-gray-300 hover:text-white transition-all duration-200"
            >
              Sign In
            </button>
          </div>
        </nav>
      </header>

      {/* HERO SECTION */}
      <main>
        <div className="bg-[#0A0F1E] relative overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[300px] sm:w-[600px] h-[300px] sm:h-[400px] bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />

          <div className="flex flex-col lg:flex-row justify-center items-center gap-10 lg:gap-24 py-14 sm:py-20 lg:py-28 w-full mx-auto px-4 sm:px-6 lg:px-10 text-center lg:text-left overflow-hidden">
            <div className="my-6 lg:my-10 max-w-lg w-full">
              <span className="inline-block text-[10px] sm:text-xs font-semibold tracking-widest text-emerald-400 bg-emerald-400/10 border border-emerald-800 px-3 py-1 rounded-full mb-6">
                🚀 SMART FINANCIAL MANAGEMENT
              </span>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#F1F5F9] leading-tight break-words">
                Take Control of Your
                <br />
                <span className="text-3xl sm:text-4xl text-emerald-400">
                  Finances with Clarity
                </span>
              </h2>

              <p className="mt-4 text-[#94A3B8] leading-relaxed text-sm sm:text-base">
                Track your expenses, set smart budgets and gain powerful
                insights to build better financial habits effortlessly and
                securely.
              </p>

              <div className="flex flex-col sm:flex-row items-center gap-3 mt-6 w-full">
                <input
                  type="text"
                  placeholder="Enter your email"
                  className="rounded-lg bg-[#ffffff] text-black placeholder-[#64748B] p-3 border border-[#334155] focus:border-emerald-500 focus:outline-none w-full sm:max-w-xs transition-colors"
                />
                <button
                  type="button"
                  onClick={openRegister}
                  className="rounded-lg px-5 py-3 bg-emerald-500 hover:bg-emerald-400 font-semibold text-white transition-all duration-200 shadow-lg shadow-emerald-900/40 whitespace-nowrap w-full sm:w-auto"
                >
                  Get Started
                </button>
              </div>

              <span className="inline-block mt-4 text-xs rounded-full bg-[#1E293B] text-[#64748B] px-4 py-1.5 border border-[#334155]">
                No credit card required • 100% secure
              </span>
            </div>

            <div className="w-full flex justify-center overflow-hidden px-2">
              <div className="relative w-full max-w-[300px] sm:max-w-[420px]">
                <div className="absolute inset-0 bg-emerald-500/10 rounded-2xl blur-xl scale-105" />
                <img
                  className="w-full h-auto rounded-2xl border border-emerald-900/60 shadow-2xl shadow-emerald-900/30 relative z-10"
                  src="https://i.ibb.co/99kKCtjQ/Gemini-Generated-Image-ckq49ickq49ickq4.png"
                  alt="image is running"
                />
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* TRUSTED SECTION */}
      <div className="bg-[#060D1A] py-8 border-t border-b border-emerald-950 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
          <p className="text-center text-xs font-semibold tracking-widest text-[#ffffff] mb-5">
            TRUSTED BY INDIAN LEADERS
          </p>
          <ul className="flex flex-wrap justify-center items-center gap-5 sm:gap-8 lg:gap-12 font-bold text-[#ffffff] tracking-widest text-xs sm:text-sm">
            <li className="hover:text-emerald-400 transition-colors cursor-pointer">
              FINTECH
            </li>
            <li className="hover:text-emerald-400 transition-colors cursor-pointer">
              NEXUS
            </li>
            <li className="hover:text-emerald-400 transition-colors cursor-pointer">
              QUBIT
            </li>
            <li className="hover:text-emerald-400 transition-colors cursor-pointer">
              VELOCITY
            </li>
            <li className="hover:text-emerald-400 transition-colors cursor-pointer">
              ALTIUS
            </li>
          </ul>
        </div>
      </div>

      {/* PROCESS SECTION */}
      <div className="bg-[#0A0F1E] py-16 lg:py-24 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
          <div className="text-center mb-14">
            <h2 className="font-bold text-2xl sm:text-3xl text-[#F1F5F9] mb-4">
              Empower Your Financial Strategy
            </h2>
            <p className="text-[#64748B] max-w-xl mx-auto leading-relaxed text-sm sm:text-base">
              Stay ahead of your finances with automated tools and real-time
              insights tailored for modern expense management
            </p>
          </div>

          {/* CARDS */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-[#0D1526] p-7 w-full rounded-2xl border border-emerald-900/40 shadow-sm transition-all duration-300 hover:scale-105 hover:border-emerald-700/60 hover:shadow-emerald-900/20 hover:shadow-xl group">
              <div className="w-12 h-12 flex items-center justify-center bg-[#1E2D3D] text-white rounded-xl mb-5 group-hover:bg-emerald-900/40 transition-colors">
                📄
              </div>
              <div className="space-y-2">
                <h3 className="text-lg font-semibold text-[#F1F5F9]">
                  Smart Expense Tracking
                </h3>
                <p className="text-[#64748B] text-sm leading-6">
                  Snap receipts and automate reporting with our high-speed
                  ingestion engine. Never manually enter a transaction again.
                </p>
              </div>
            </div>

            <div className="bg-emerald-500/5 p-7 w-full rounded-2xl border border-emerald-500/40 transition-all duration-300 hover:scale-105 hover:shadow-emerald-900/30 hover:shadow-xl group">
              <div className="w-12 h-12 flex items-center justify-center bg-emerald-500 text-white rounded-xl mb-5 group-hover:bg-emerald-400 transition-colors">
                🔔
              </div>
              <div className="space-y-2">
                <h3 className="text-lg font-semibold text-[#F1F5F9]">
                  Intelligent Budgeting
                </h3>
                <p className="text-[#64748B] text-sm leading-6">
                  Set custom limits and receive instant notifications before
                  overspending happens. Predictive alerts for recurring bills.
                </p>
              </div>
            </div>

            <div className="bg-[#0D1526] p-7 w-full rounded-2xl border border-emerald-900/40 shadow-sm transition-all duration-300 hover:scale-105 hover:border-emerald-700/60 hover:shadow-emerald-900/20 hover:shadow-xl group">
              <div className="w-12 h-12 flex items-center justify-center bg-[#1E2D3D] text-white rounded-xl mb-5 group-hover:bg-emerald-900/40 transition-colors">
                📊
              </div>
              <div className="space-y-2">
                <h3 className="text-lg font-semibold text-[#F1F5F9]">
                  Advanced Analytics
                </h3>
                <p className="text-[#64748B] text-sm leading-6">
                  Deep-dive into spending trends with institutional-grade charts
                  and predictive modeling. Export reports in seconds.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* RATING SECTION */}
      <section className="bg-[#060D1A] py-16 lg:py-20 border-y-2 overflow-hidden">
        <h2 className="text-center text-2xl sm:text-3xl font-bold text-white mb-12 px-4">
          How ExpenseFlow Works
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-6xl mx-auto text-center px-4 sm:px-6">
          <div>
            <div className="text-emerald-400 text-3xl mb-4">1</div>
            <h3 className="text-white font-semibold">Add Expenses</h3>
            <p className="text-[#94A3B8] text-sm mt-2">
              Quickly log your daily spending in seconds.
            </p>
          </div>

          <div>
            <div className="text-emerald-400 text-3xl mb-4">2</div>
            <h3 className="text-white font-semibold">Set Budgets</h3>
            <p className="text-[#94A3B8] text-sm mt-2">
              Define limits and control your finances.
            </p>
          </div>

          <div>
            <div className="text-emerald-400 text-3xl mb-4">3</div>
            <h3 className="text-white font-semibold">Track Insights</h3>
            <p className="text-[#94A3B8] text-sm mt-2">
              Get real-time analytics and smart suggestions.
            </p>
          </div>
        </div>
      </section>

      {/* READY SECTION */}
      <section className="bg-[#064E3B] text-white py-16 lg:py-24 px-4 sm:px-6 md:px-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-900/30 to-transparent pointer-events-none" />
        <div className="max-w-4xl mx-auto text-center space-y-6 relative z-10">
          <h1 className="text-3xl md:text-5xl font-bold leading-tight text-[#F1F5F9]">
            Ready to Take Control of your <br className="hidden md:block" />
            Expenses?
          </h1>

          <p className="text-[#A7F3D0] text-base md:text-lg max-w-2xl mx-auto">
            Take full control of your expenses and budgets with real-time
            tracking, smart insights, and powerful financial tools.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4">
            <button
              type="button"
              onClick={openRegister}
              className="bg-white text-[#064E3B] px-8 py-3 rounded-xl font-bold hover:bg-gray-100 transition-all duration-200 shadow-xl"
            >
              Start Free Trial
            </button>
          </div>

          <p className="text-xs text-[#6EE7B7] pt-2">
            Start in seconds • No credit card • No limits
          </p>
        </div>
      </section>

      <div className="flex flex-col sm:flex-row gap-1 sm:gap-4 min-h-14 bg-[#060D1A] justify-center items-center text-xs sm:text-sm text-[#ffffff] px-4 text-center">
        <p>© 2026 ExpenseTracker. All rights reserved.</p>
        <p>Built for better financial control</p>
      </div>

      <section className="relative h-[120px] sm:h-[220px] lg:h-[260px] overflow-hidden bg-[#060D1A] w-full">
        <h2 className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 select-none whitespace-nowrap text-[15vw] font-black leading-none tracking-[-0.08em] text-emerald-400">
          ExpenseFlow
        </h2>
      </section>
    </div>
  );
};

export default Home;