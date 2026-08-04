"use client";
import { useState } from "react";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function AnalyzePage() {

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [environment, setEnvironment] = useState("");
  const [stackTrace, setStackTrace] = useState("");

  const [loading, setLoading] = useState(false);

  const [result, setResult] = useState<any>(null);  


  const handleAnalyze = async () => {
  setLoading(true);

  try {
    const response = await fetch(`${API_URL}/api/analyze`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        description,
        environment,
        stack_trace: stackTrace,
      }),
    });

    const data = await response.json();

    setResult(data);
  } catch (error) {
    console.error(error);
  } finally {
    setLoading(false);
  }
};


  return (
    <div className="mx-auto max-w-7xl px-6 pt-8 pb-10">

      {/* Header */}

      <h1 className="text-center text-4xl font-bold tracking-tight text-white">
        Analyze Bug
      </h1>

      <p className="mt-3 text-center text-lg text-zinc-400">
        Submit bug details and let BugPilot AI analyze the issue.
      </p>

      {/* Main Layout */}

      <div className="mt-10 grid grid-cols-5 gap-8">

        {/* ========================= */}
        {/* Left - Bug Form */}
        {/* ========================= */}

        <div className="col-span-2 rounded-2xl border border-zinc-700 bg-zinc-800 p-6 shadow-xl shadow-black/20">

          <h2 className="text-2xl font-semibold text-white">
            Bug Details
          </h2>

          <p className="mt-2 text-sm text-zinc-400">
            Fill in the information below to start the AI analysis.
          </p>

          <div className="mt-8 space-y-6">

            {/* Bug Title */}

            <div>

              <label className="mb-2 block text-sm font-medium text-zinc-300">
                Bug Title
              </label>

              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter bug title"
                className="w-full rounded-xl border border-zinc-700 bg-zinc-900 px-4 py-3 text-white placeholder:text-zinc-500 outline-none transition-all duration-300 focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20"
              />

            </div>

            {/* Description */}

            <div>

              <label className="mb-2 block text-sm font-medium text-zinc-300">
                Description
              </label>

              <textarea
                rows={4}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Describe the issue..."
                className="w-full resize-none rounded-xl border border-zinc-700 bg-zinc-900 px-4 py-3 text-white placeholder:text-zinc-500 outline-none transition-all duration-300 focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20"
              />

            </div>

            {/* Environment */}

            <div>

              <label className="mb-2 block text-sm font-medium text-zinc-300">
                Environment
              </label>

              <input
                type="text"
                value={environment}
                onChange={(e) => setEnvironment(e.target.value)}
                placeholder="Windows 11, Python 3.12, FastAPI..."
                className="w-full rounded-xl border border-zinc-700 bg-zinc-900 px-4 py-3 text-white placeholder:text-zinc-500 outline-none transition-all duration-300 focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20"
              />

            </div>

            {/* Stack Trace */}

            <div>

              <label className="mb-2 block text-sm font-medium text-zinc-300">
                Stack Trace
              </label>

              <textarea
                rows={8}
                value={stackTrace}
                onChange={(e) => setStackTrace(e.target.value)}
                placeholder="Paste stack trace..."
                className="w-full rounded-xl border border-zinc-700 bg-zinc-900 px-4 py-3 font-mono text-sm text-white placeholder:text-zinc-500 outline-none transition-all duration-300 focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20"
              />

            </div>

            {/* Button */}

            <button onClick={handleAnalyze} className="w-full rounded-xl bg-violet-600 py-3 text-lg font-semibold text-white shadow-lg shadow-violet-500/20 transition-all duration-300 hover:bg-violet-500 hover:shadow-violet-500/40">
              {loading ? "Analyzing..." : "Analyze Bug"}
            </button>

          </div>

        </div>

        {/* ========================= */}
        {/* Right - Analysis Result */}
        {/* ========================= */}

        <div className="col-span-3 rounded-2xl border border-zinc-700 bg-zinc-800 p-6 shadow-xl shadow-black/20">

          <h2 className="text-2xl font-semibold text-white">
            Analysis Result
          </h2>

          <p className="mt-2 text-sm text-zinc-400">
            AI analysis will appear here after you analyze a bug.
          </p>

          <div className="mt-8 space-y-5">

  {result ? (

    <>

      <InfoCard
        title="Issue Type"
        value={result.issue_type}
      />

      <InfoCard
        title="Severity"
        value={result.severity}
      />

      <InfoCard
        title="Assigned Team"
        value={result.assigned_team}
      />

      <InfoCard
        title="Root Cause"
        value={result.root_cause}
      />

      <InfoCard
        title="Investigation Report"
        value={result.investigation_report}
      />

    </>

  ) : (

    <div className="flex h-[650px] items-center justify-center rounded-xl border border-dashed border-zinc-600 bg-zinc-900">

      <div className="text-center">

        <h3 className="text-xl font-semibold text-zinc-300">
          Waiting for Analysis
        </h3>

        <p className="mt-3 max-w-sm text-sm leading-6 text-zinc-500">
          Enter the bug details and click
          <span className="font-medium text-violet-400">
            {" "}Analyze Bug{" "}
          </span>
          to generate the AI investigation.
        </p>

      </div>

    </div>

  )}

</div>

        </div>

      </div>

    </div>
  );
}

type InfoCardProps = {
  title: string;
  value: string;
};

function InfoCard({
  title,
  value,
}: InfoCardProps) {

  return (

    <div className="rounded-xl border border-zinc-700 bg-zinc-900 p-5">

      <p className="mb-2 text-sm font-medium text-zinc-400">
        {title}
      </p>

      <p className="whitespace-pre-line leading-7 text-white">
        {value}
      </p>

    </div>

  );

}