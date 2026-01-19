import Link from 'next/link';
import { ArrowRight, Globe, Zap, Shield, TrendingUp } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#002418] to-[#003d2e]">
      {/* Header */}
      <header className="border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="text-2xl font-bold text-white">Damisa</div>
            <div className="px-3 py-1 bg-white/10 rounded-full text-xs text-white/80">
              CorridorOS
            </div>
          </div>
          <button className="px-6 py-2 bg-white text-[#002418] rounded-full font-medium hover:bg-white/90 transition-colors">
            Contact us
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="max-w-3xl">
          <h1 className="text-5xl font-bold text-white mb-6 leading-tight">
            Launch Payment Corridors in <span className="text-[#DFF2ED]">1-2 Weeks</span> Instead of 6-8
          </h1>
          <p className="text-xl text-white/70 mb-8 leading-relaxed">
            Automate partner discovery, regulatory compliance, and integration setup. 
            Deploy new stablecoin payment corridors 3x faster with pre-configured templates.
          </p>
          <Link 
            href="/dashboard"
            className="inline-flex items-center gap-2 px-8 py-4 bg-white text-[#002418] rounded-full font-semibold text-lg hover:bg-white/90 transition-colors group"
          >
            Launch Your First Corridor
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-20">
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
            <div className="text-4xl font-bold text-[#DFF2ED] mb-2">75%</div>
            <div className="text-white/70">Faster Launch Time</div>
          </div>
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
            <div className="text-4xl font-bold text-[#DFF2ED] mb-2">50+</div>
            <div className="text-white/70">Pre-vetted Partners</div>
          </div>
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
            <div className="text-4xl font-bold text-[#DFF2ED] mb-2">8</div>
            <div className="text-white/70">Markets Available</div>
          </div>
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
            <div className="text-4xl font-bold text-[#DFF2ED] mb-2">100%</div>
            <div className="text-white/70">Compliance Ready</div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-7xl mx-auto px-6 py-20">
        <h2 className="text-3xl font-bold text-white mb-12 text-center">
          Everything You Need to Launch New Corridors
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Feature 1 */}
          <div className="bg-[#DFF2ED] rounded-2xl p-6">
            <div className="w-12 h-12 bg-[#002418] rounded-xl flex items-center justify-center mb-4">
              <Globe className="w-6 h-6 text-[#DFF2ED]" />
            </div>
            <h3 className="text-xl font-semibold text-[#002418] mb-3">
              Partner Discovery
            </h3>
            <p className="text-[#002418]/70 leading-relaxed">
              Pre-vetted database of 50+ payment partners across emerging markets with transparent fees and ratings.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="bg-[#DFF2ED] rounded-2xl p-6">
            <div className="w-12 h-12 bg-[#002418] rounded-xl flex items-center justify-center mb-4">
              <Shield className="w-6 h-6 text-[#DFF2ED]" />
            </div>
            <h3 className="text-xl font-semibold text-[#002418] mb-3">
              Regulatory Intelligence
            </h3>
            <p className="text-[#002418]/70 leading-relaxed">
              Pre-researched compliance requirements and AML templates for each jurisdiction.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="bg-[#DFF2ED] rounded-2xl p-6">
            <div className="w-12 h-12 bg-[#002418] rounded-xl flex items-center justify-center mb-4">
              <Zap className="w-6 h-6 text-[#DFF2ED]" />
            </div>
            <h3 className="text-xl font-semibold text-[#002418] mb-3">
              Integration Wizard
            </h3>
            <p className="text-[#002418]/70 leading-relaxed">
              Auto-generated API connectors and compliance monitoring with pre-built templates.
            </p>
          </div>

          {/* Feature 4 */}
          <div className="bg-[#DFF2ED] rounded-2xl p-6">
            <div className="w-12 h-12 bg-[#002418] rounded-xl flex items-center justify-center mb-4">
              <TrendingUp className="w-6 h-6 text-[#DFF2ED]" />
            </div>
            <h3 className="text-xl font-semibold text-[#002418] mb-3">
              Testing Suite
            </h3>
            <p className="text-[#002418]/70 leading-relaxed">
              Automated end-to-end testing with synthetic transactions and performance benchmarks.
            </p>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="bg-gradient-to-r from-[#DFF2ED] to-[#b8e6d5] rounded-3xl p-12 text-center">
          <h2 className="text-4xl font-bold text-[#002418] mb-4">
            Ready to 3x Your Expansion Velocity?
          </h2>
          <p className="text-xl text-[#002418]/70 mb-8 max-w-2xl mx-auto">
            Join Damisa in revolutionizing cross-border stablecoin payments. Launch your first corridor today.
          </p>
          <Link 
            href="/dashboard"
            className="inline-flex items-center gap-2 px-8 py-4 bg-[#002418] text-white rounded-full font-semibold text-lg hover:bg-[#002418]/90 transition-colors"
          >
            Get Started Now
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-white/10 mt-20">
        <div className="max-w-7xl mx-auto px-6 py-8 text-center text-white/50 text-sm">
          © 2026 Damisa. Built for the future of cross-border payments.
        </div>
      </footer>
    </div>
  );
}