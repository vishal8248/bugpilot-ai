"use client";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

import { useState } from "react";


type TicketModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onTicketClosed: () => void;
  ticket: any;

  onViewPreviousTicket: (ticketId: number) => void;
};


export default function TicketModal({
  isOpen,
  onClose,
  onTicketClosed,
  ticket,
  onViewPreviousTicket,
}: TicketModalProps) {
  if (!isOpen || !ticket) return null;

  const [actualSolution, setActualSolution] = useState("");


  const handleCloseTicket = async () => {

  if (!actualSolution.trim()) {
    alert("Please enter the actual solution.");
    return;
  }

  const response = await fetch(
    `${API_URL}/api/tickets/close`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ticket_id: ticket.ticket[0],
        actual_solution: actualSolution,
      }),
    }
  );

  const data = await response.json();

  alert(data.message);

  onTicketClosed();

  };


  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-6">

      <div className="flex max-h-[90vh] w-full max-w-7xl flex-col overflow-hidden rounded-2xl border border-zinc-700 bg-zinc-800 shadow-2xl">

        {/* ========================= */}
        {/* Header */}
        {/* ========================= */}

        <div className="flex items-center justify-between border-b border-zinc-700 p-6">

          <h2 className="text-2xl font-bold text-white">
            Ticket Details
          </h2>

          <button
            onClick={onClose}
            className="text-2xl text-zinc-400 transition hover:text-white"
          >
            ✕
          </button>

        </div>

        {/* ========================= */}
        {/* Scrollable Content */}
        {/* ========================= */}

        <div className="flex-1 overflow-y-auto p-6">

          <div className="space-y-8">

            {/* ========================= */}
            {/* Top Section */}
            {/* ========================= */}

            <div className="grid grid-cols-2 gap-8">

              {/* ========================= */}
              {/* Bug Details */}
              {/* ========================= */}

              <div>

                <h3 className="mb-6 text-xl font-semibold text-white">
                  Bug Details
                </h3>

                <div className="space-y-5">

                  <Info title="Bug Title">
                    {ticket.ticket[1]}
                  </Info>

                  <Info title="Description">
                    {ticket.ticket[2]}
                  </Info>

                  <Info title="Environment">
                    {ticket.ticket[3]}
                  </Info>

                  <Info title="Stack Trace">
                    {ticket.ticket[4] || "No stack trace provided."}
                  </Info>

                </div>

              </div>

              {/* ========================= */}
              {/* AI Investigation */}
              {/* ========================= */}

              <div>

                <h3 className="mb-6 text-xl font-semibold text-white">
                  AI Investigation
                </h3>

                <div className="space-y-5">

                  <Info title="Issue Type">
                    {ticket.ticket[5]}
                  </Info>

                  <Info title="Severity">
                    {ticket.ticket[6]}
                  </Info>

                  <Info title="Assigned Team">
                    {ticket.ticket[7]}
                  </Info>

                  <Info title="Root Cause">
                    {ticket.ticket[8]}
                  </Info>

                  <Info title="Investigation Report">
                    {ticket.ticket[9]}
                  </Info>

                </div>

              </div>

            </div>
        

           {/* ========================= */}
{/* Similar Previous Bugs */}
{/* ========================= */}

<div>

  <h3 className="mb-4 text-xl font-semibold text-white">
    Similar Previous Bugs
  </h3>

  {ticket.similar_bugs.length === 0 ? (

    <div className="rounded-xl border border-dashed border-zinc-700 bg-zinc-900 p-8 text-center">

      <p className="text-lg font-medium text-white">
        No Similar Bugs Found
      </p>

      <p className="mt-2 text-sm text-zinc-400">
        BugPilot AI could not find any similar historical incidents.
      </p>

    </div>

  ) : (

    <div className="space-y-4">

      {ticket.similar_bugs.map((bug: any) => (

        <div
          key={bug.ticket_id}
          className="rounded-xl border border-zinc-700 bg-zinc-900 p-5"
        >

          <p className="font-semibold text-violet-400">
            BUG-{bug.ticket_id}
          </p>

          <p className="mt-2 text-white">
            {bug.title}
          </p>

          <p className="mt-4 text-sm font-medium text-zinc-400">
            Root Cause
          </p>

          <p className="mt-2 text-white">
            {bug.root_cause}
          </p>

          <button
            onClick={() => onViewPreviousTicket(bug.ticket_id)}
            className="mt-5 rounded-lg bg-violet-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-violet-500"          >
            View Previous Ticket
          </button>

        </div>

      ))}

    </div>

  )}

</div>

            {/* ========================= */}
            {/* Actual Solution */}
            {/* ========================= */}

            <div>

              <h3 className="mb-4 text-xl font-semibold text-white">
                Actual Solution
              </h3>

              <textarea
                rows={6}
                value={actualSolution}
                onChange={(e) => setActualSolution(e.target.value)}
                placeholder="Engineer writes the final verified solution..."
                className="w-full rounded-xl border border-zinc-700 bg-zinc-900 p-4 text-white outline-none transition focus:border-violet-500"
              />

            </div>
                      </div>

        </div>

        {/* ========================= */}
        {/* Fixed Footer */}
        {/* ========================= */}

        <div className="flex justify-end gap-4 border-t border-zinc-700 bg-zinc-800 p-6">
          
          <button
           onClick={handleCloseTicket}
           className="w-44 rounded-xl bg-violet-600 py-3 font-medium text-white transition hover:bg-violet-500">

            Close Ticket

          </button>

        </div>

      </div>

    </div>
  );
}

type InfoProps = {
  title: string;
  children: React.ReactNode;
};

function Info({
  title,
  children,
}: InfoProps) {
  return (
    <div>

      <p className="mb-2 text-sm font-medium text-zinc-400">
        {title}
      </p>

      <div className="rounded-xl border border-zinc-700 bg-zinc-900 p-4 text-sm leading-7 text-white">

        {children}

      </div>

    </div>
  );
}