import Link from "next/link";

import {
  Search,
  Brain,
  Sparkles,
  Database,
  Ticket,
} from "lucide-react";

export default function DashboardPage() {
  return (
    <div className="mx-auto flex max-w-7xl flex-col items-center px-6 pt-8 pb-10">

      {/* Hero */}

      <h1 className="max-w-4xl text-center text-4xl font-bold leading-tight tracking-tight text-white">
        AI-powered bug analysis and debugging assistant.
      </h1>

      <p className="mt-6 max-w-3xl text-center text-lg leading-8 text-zinc-400">
        Analyze logs, stack traces, and error messages using AI to identify
        root causes, suggest fixes, and retrieve similar issues from previous
        analyses.
      </p>

      <div className="mt-10 h-px w-full max-w-5xl bg-zinc-800" />

      {/* Features */}

      <h2 className="mt-10 text-3xl font-semibold text-white">
        What can BugPilot do?
      </h2>

      <div className="mt-10 grid w-full max-w-6xl grid-cols-5 gap-6">

        <FeatureCard
          icon={<Search size={38} />}
          title="Analyze"
          subtitle="stack traces"
        />

        <FeatureCard
          icon={<Brain size={38} />}
          title="Find"
          subtitle="root causes"
        />

        <FeatureCard
          icon={<Sparkles size={38} />}
          title="Suggest"
          subtitle="AI-generated fixes"
        />

        <FeatureCard
          icon={<Database size={38} />}
          title="Retrieve"
          subtitle="similar issues"
        />

        <FeatureCard
          icon={<Ticket size={38} />}
          title="Manage"
          subtitle="open tickets"
        />

      </div>

      <Link
        href="/analyze"
        className="mt-12 rounded-xl bg-violet-600 px-10 py-4 text-lg font-semibold text-white shadow-lg shadow-violet-500/20 transition-all duration-300 hover:bg-violet-500 hover:shadow-violet-500/40">
        Analyze Bug
      </Link>

      <p className="mt-3 text-sm text-zinc-500">
        Get started by analyzing your first bug.
      </p>

    </div>
  );
}

type FeatureCardProps = {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
};

function FeatureCard({
  icon,
  title,
  subtitle,
}: FeatureCardProps) {
  return (
    <div className="group rounded-2xl border border-zinc-800 bg-zinc-900 p-8 text-center transition-all duration-300 hover:-translate-y-1 hover:border-violet-500 hover:shadow-xl hover:shadow-violet-500/20">

      <div className="flex justify-center text-violet-400 transition group-hover:scale-110">
        {icon}
      </div>

      <h3 className="mt-6 text-lg font-semibold text-white">
        {title}
      </h3>

      <p className="mt-2 text-sm leading-6 text-zinc-400">
        {subtitle}
      </p>

    </div>
  );
}