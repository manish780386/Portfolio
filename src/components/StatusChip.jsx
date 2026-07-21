import React from "react";

const TONES = {
  active:   { dot: "#34d399", text: "text-[#34d399]", bg: "bg-[#34d399]/10", border: "border-[#34d399]/25" },
  live:     { dot: "#34d399", text: "text-[#34d399]", bg: "bg-[#34d399]/10", border: "border-[#34d399]/25" },
  info:     { dot: "#60a5fa", text: "text-[#60a5fa]", bg: "bg-[#60a5fa]/10", border: "border-[#60a5fa]/25" },
  pending:  { dot: "#f5b942", text: "text-[#f5b942]", bg: "bg-[#f5b942]/10", border: "border-[#f5b942]/25" },
  neutral:  { dot: "#7c8aa0", text: "text-[#7c8aa0]", bg: "bg-white/[0.04]", border: "border-white/10" },
};

/**
 * StatusChip — small mono-font pill used consistently across the site
 * (hero availability, project status, cert verification, timeline state).
 * Keeping this to one component keeps that vocabulary consistent instead
 * of every section inventing its own badge styling.
 */
export default function StatusChip({ tone = "neutral", pulse = false, children }) {
  const t = TONES[tone] || TONES.neutral;
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border font-mono-label text-[10px] uppercase ${t.text} ${t.bg} ${t.border}`}
    >
      <span className="relative flex h-1.5 w-1.5">
        {pulse && (
          <span
            className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75"
            style={{ background: t.dot }}
          />
        )}
        <span className="relative inline-flex rounded-full h-1.5 w-1.5" style={{ background: t.dot }} />
      </span>
      {children}
    </span>
  );
}