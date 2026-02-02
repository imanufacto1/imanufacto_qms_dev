import Link from "next/link";
import { ArrowRight, CheckCircle, Shield, Zap } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      {/* Navigation */}
      <header className="flex h-16 items-center justify-between border-b border-gray-100 px-6 lg:px-12">
        <div className="flex items-center gap-2">
          <span className="text-xl font-bold text-[#1967d2]">imanufacto</span>
        </div>
        <div className="flex items-center gap-4">
          <Link 
            href="/sign-in" 
            className="text-sm font-medium text-gray-600 hover:text-gray-900"
          >
            Sign In
          </Link>
          <Link
            href="/sign-up"
            className="rounded-full bg-[#1967d2] px-4 py-2 text-sm font-medium text-white hover:bg-[#1557b0] transition-colors"
          >
            Get Started
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-1">
        <section className="relative overflow-hidden pt-16 pb-20 lg:pt-32 lg:pb-28">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
              <span className="block">Next-Gen QMS for</span>
              <span className="block text-[#1967d2]">Manufacturing Excellence</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-600">
              Streamline quality management, compliance, and plant operations with our AI-powered, multi-tenant platform. Built for modern manufacturers.
            </p>
            <div className="mt-10 flex justify-center gap-4">
              <Link
                href="/sign-up"
                className="flex items-center gap-2 rounded-full bg-[#1967d2] px-8 py-3 text-base font-semibold text-white shadow-lg hover:bg-[#1557b0] transition-all"
              >
                Start Free Trial <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/about"
                className="flex items-center gap-2 rounded-full border border-gray-300 bg-white px-8 py-3 text-base font-semibold text-gray-700 hover:bg-gray-50 transition-all"
              >
                Learn More
              </Link>
            </div>
          </div>
        </section>

        {/* Feature Grid */}
        <section className="bg-gray-50 py-16 sm:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
              <div className="rounded-2xl bg-white p-8 shadow-sm">
                <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100 text-[#1967d2]">
                  <Shield className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">Enterprise Security</h3>
                <p className="mt-2 text-gray-600">
                  Bank-grade data isolation with Multi-Tenant architecture and Row Level Security (RLS).
                </p>
              </div>
              <div className="rounded-2xl bg-white p-8 shadow-sm">
                <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100 text-[#1967d2]">
                  <Zap className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">Dynamic Forms</h3>
                <p className="mt-2 text-gray-600">
                  Drag-and-drop form builder with JSONB storage for ultimate flexibility without migrations.
                </p>
              </div>
              <div className="rounded-2xl bg-white p-8 shadow-sm">
                <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100 text-[#1967d2]">
                  <CheckCircle className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">Compliance Ready</h3>
                <p className="mt-2 text-gray-600">
                  Built-in audit trails, S3 Object Lock for documents, and ISO 9001 aligned workflows.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-100 py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <span className="text-gray-500">© 2026 imanufacto. All rights reserved.</span>
          <div className="flex gap-6">
            <a href="#" className="text-gray-400 hover:text-gray-600">Privacy</a>
            <a href="#" className="text-gray-400 hover:text-gray-600">Terms</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
