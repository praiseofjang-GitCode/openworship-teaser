"use client";

import MusicNoteIcon from "./MusicNoteIcon";
import Link from "next/link";

/** Open Worship 마스터 로고: OW + 음표 + Open Worship 텍스트 */
export default function Logo({
  variant = "default",
  layout = "stacked",
  className = "",
}: {
  variant?: "default" | "reversed" | "simplified";
  layout?: "stacked" | "horizontal";
  className?: string;
}) {
  const isReversed = variant === "reversed";
  const isSimplified = variant === "simplified";
  const isHorizontal = layout === "horizontal";

  const rectFill = isReversed ? "white" : "#0d9488";
  const owFill = isReversed ? "#0d9488" : "white";
  const noteColor = isReversed ? "white" : "#0d9488";
  const textColor = isReversed ? "white" : "#4d4d4d";

  const owBox = (
    <span
      className="inline-flex items-center justify-center rounded-md px-2.5 py-1"
      style={{ backgroundColor: rectFill }}
    >
      <span
        className="font-bold tracking-tighter"
        style={{
          color: owFill,
          fontFamily: "var(--font-montserrat)",
          fontSize: isHorizontal ? "1.25rem" : "1.5rem",
          lineHeight: 1,
        }}
      >
        OW
      </span>
    </span>
  );

  const note = !isSimplified ? (
    <span style={{ color: noteColor }}>
      <MusicNoteIcon size={isHorizontal ? 16 : 14} />
    </span>
  ) : null;

  const label = !isSimplified ? (
    <span
      className="font-medium tracking-wide"
      style={{
        color: textColor,
        fontFamily: "inherit",
        fontSize: isHorizontal ? "0.875rem" : "0.75rem",
      }}
    >
      Open Worship
    </span>
  ) : null;

  return (
    <Link
      href="/"
      className={`inline-flex no-underline ${isHorizontal ? "flex-row items-center gap-2" : "flex-col items-center gap-0.5"} ${className}`}
      aria-label="Open Worship 홈"
    >
      {isHorizontal ? (
        <>
          <span className="flex items-center gap-1.5">
            {owBox}
            {note}
          </span>
          {label}
        </>
      ) : (
        <>
          <span className="flex flex-col items-center">
            {owBox}
            {note && <span className="mt-0.5 flex justify-center">{note}</span>}
          </span>
          {label}
        </>
      )}
    </Link>
  );
}
