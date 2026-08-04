type HistoryModalProps = {
  isOpen: boolean;
  onClose: () => void;
  ticket: any;
};

export default function HistoryModal({
  isOpen,
  onClose,
  ticket,
}: HistoryModalProps) {
  if (!isOpen || !ticket) return null;

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
                    {ticket[1]}
                  </Info>

                  <Info title="Description">
                    {ticket[2]}
                  </Info>

                  <Info title="Environment">
                    {ticket[3]}
                  </Info>

                  <Info title="Stack Trace">
                    {ticket[4] || "No stack trace provided." }
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
                    {ticket[5]}
                  </Info>

                  <Info title="Severity">
                    {ticket[6]}
                  </Info>

                  <Info title="Assigned Team">
                    {ticket[7]}
                  </Info>

                  <Info title="Root Cause">
                    {ticket[8]}
                  </Info>

                  <Info title="Investigation Report">
                    {ticket[9]}
                  </Info>

                </div>

              </div>

            </div>

            {/* ========================= */}
            {/* Actual Solution */}
            {/* ========================= */}

            <div>

              <h3 className="mb-4 text-xl font-semibold text-white">
                Actual Solution
              </h3>

              <div className="rounded-xl border border-zinc-700 bg-zinc-900 p-5 text-white leading-7">
                {ticket[10] || "No solution recorded."}
              </div>

            </div>   
          </div>

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