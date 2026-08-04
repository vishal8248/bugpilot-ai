"use client";

import { useEffect, useState } from "react";
import HistoryModal from "@/components/HistoryModal";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function HistoryPage() {

  const [open, setOpen] = useState(false);

  const [tickets, setTickets] = useState<any[]>([]);

  const [selectedTicket, setSelectedTicket] = useState<any>(null);

  const fetchHistory = async () => {

    const response = await fetch(
      `${API_URL}/api/tickets/history`
    );

    const data = await response.json();

    setTickets(data);

  };

  useEffect(() => {

    fetchHistory();

  }, []);

  const handleViewTicket = async (ticketId: number) => {

    const response = await fetch(
      `${API_URL}/api/tickets/history/${ticketId}`
    );

    const data = await response.json();

    setSelectedTicket(data);

    setOpen(true);

  };

  return (
    <div className="mx-auto max-w-7xl px-6 pt-8 pb-10">

      {/* Header */}

      <h1 className="text-center text-4xl font-bold tracking-tight text-white">
        History
      </h1>

      <p className="mt-3 text-center text-lg text-zinc-400">
        View previously resolved bugs and AI investigations.
      </p>

      {/* Table */}

      <div className="mt-10 overflow-hidden rounded-2xl border border-zinc-700 bg-zinc-800 shadow-xl shadow-black/20">

        <table className="w-full">

          <thead className="border-b border-zinc-700 bg-zinc-900">

            <tr>

              <th className="px-6 py-4 text-left text-sm font-semibold text-zinc-300">
                Ticket ID
              </th>

              <th className="px-6 py-4 text-left text-sm font-semibold text-zinc-300">
                Bug Title
              </th>

              <th className="px-6 py-4 text-left text-sm font-semibold text-zinc-300">
                Severity
              </th>

              <th className="px-6 py-4 text-left text-sm font-semibold text-zinc-300">
                Closed Date
              </th>

              <th className="px-6 py-4 text-left text-sm font-semibold text-zinc-300">
                Action
              </th>

            </tr>

          </thead>

          <tbody>

            {tickets.length === 0 ? (

              <tr>

                <td
                  colSpan={5}
                  className="py-12 text-center text-zinc-400"
                >
                  No closed tickets found.
                </td>

              </tr>

            ) : (

              tickets.map((ticket) => (

                <tr
                  key={ticket[0]}
                  className="border-b border-zinc-700 transition hover:bg-zinc-700/40"
                >

                  <td className="px-6 py-5 text-white">
                    BUG-{ticket[0]}
                  </td>

                  <td className="px-6 py-5 text-zinc-300">
                    {ticket[1]}
                  </td>

                  <td className="px-6 py-5">

                    <span
                      className={`rounded-full px-3 py-1 text-sm font-medium
                        ${
                          ticket[2] === "Critical"
                            ? "bg-red-500/20 text-red-400"
                            : ticket[2] === "High"
                            ? "bg-red-500/20 text-red-400"
                            : ticket[2] === "Medium"
                            ? "bg-orange-500/20 text-orange-400"
                            : "bg-green-500/20 text-green-400"
                        }`}
                    >
                      {ticket[2]}
                    </span>

                  </td>

                  <td className="px-6 py-5 text-zinc-300">
                    {ticket[5]}
                  </td>

                  <td className="px-6 py-5">

                    <button
                      onClick={() => handleViewTicket(ticket[0])}
                      className="rounded-lg bg-violet-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-violet-500"
                    >
                      View
                    </button>

                  </td>

                </tr>

              ))

            )}

          </tbody>

        </table>

      </div>

      <HistoryModal
        isOpen={open}
        onClose={() => setOpen(false)}
        ticket={selectedTicket}
      />

    </div>
  );
}