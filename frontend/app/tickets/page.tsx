"use client";

import { useEffect, useState } from "react";
import TicketModal from "@/components/TicketModal";
import HistoryModal from "@/components/HistoryModal";


const API_URL = process.env.NEXT_PUBLIC_API_URL;


export default function TicketsPage() {

  const [open, setOpen] = useState(false);

  const [tickets, setTickets] = useState<any[]>([]);

  const [selectedTicket, setSelectedTicket] = useState<any>(null);

  const [historyOpen, setHistoryOpen] = useState(false);

  const [historyTicket, setHistoryTicket] = useState<any>(null);


  const fetchTickets = async () => {

    const response = await fetch(
     `${API_URL}/api/tickets/open`
    );

    const data = await response.json();

    setTickets(data);

  };


  useEffect(() => {

   fetchTickets();

  }, []);


  const handleTicketClosed = () => {

   setOpen(false);

   fetchTickets();

  };


  const handleViewTicket = async (ticketId: number) => {

    const response = await fetch(
     `${API_URL}/api/tickets/${ticketId}`
    );

    const data = await response.json();

    setSelectedTicket({
      ticket: data.ticket,
      similar_bugs: data.similar_bugs,
    });

    setOpen(true);

  };


  const handleViewPreviousTicket = async (ticketId: number) => {

    const response = await fetch(
      `${API_URL}/api/tickets/history/${ticketId}`
    );

    const data = await response.json();

    setOpen(false);

    setHistoryTicket(data);

    setHistoryOpen(true);

  };


  return (
    <div className="mx-auto max-w-7xl px-6 pt-8 pb-10">

      {/* Header */}

      <h1 className="text-center text-4xl font-bold tracking-tight text-white">
        Open Tickets
      </h1>

      <p className="mt-3 text-center text-lg text-zinc-400">
        Track active bugs assigned for resolution.
      </p>

      {/* Table */}

      <div className="mt-10 overflow-hidden rounded-2xl border border-zinc-700 bg-zinc-800 shadow-xl shadow-black/20">

        <table className="w-full">

          <thead className="border-b border-zinc-700 bg-zinc-900">

            <tr className="text-left">

              <th className="px-6 py-4 text-sm font-semibold text-zinc-300">
                Ticket ID
              </th>

              <th className="px-6 py-4 text-sm font-semibold text-zinc-300">
                Bug Title
              </th>

              <th className="px-6 py-4 text-sm font-semibold text-zinc-300">
                Severity
              </th>

              <th className="px-6 py-4 text-sm font-semibold text-zinc-300">
                Assigned Team
              </th>

              <th className="px-6 py-4 text-sm font-semibold text-zinc-300">
                Created
              </th>

              <th className="px-6 py-4 text-sm font-semibold text-zinc-300">
                Action
              </th>

            </tr>

          </thead>

          <tbody>

            {tickets.length === 0 ? (

              <tr>

                <td
                  colSpan={6}
                  className="py-12 text-center text-zinc-400"
                >
                  No open tickets found.
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
                    {ticket[3]}
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

      <TicketModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onTicketClosed={handleTicketClosed}
        ticket={selectedTicket}
        onViewPreviousTicket={handleViewPreviousTicket}
      />

      <HistoryModal
        isOpen={historyOpen}
        onClose={() => setHistoryOpen(false)}
        ticket={historyTicket}
      />

    </div>
  );
}