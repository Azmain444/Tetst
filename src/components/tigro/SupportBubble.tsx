import { useEffect, useRef, useState } from "react";
import supportIcon from "@/assets/support-icon.png.asset.json";

const SUPPORT_URL =
  "https://h5.workorder.support/?tenantid=1091&timestamp=1788874863&website=https%253A%252F%252Fwww.tigro111.com&datablock=9dd5710f81fc77eca2cf878ef10005a0685cd4a1fbf0a66982e28272fdc9921aa9dfa5a9a5e4b7c6521df8f8e101effa83002e848fe94cd80844bba2678807feab7dafa202d22f346cd316dddd4ca56438e9993c60af016635ded00a314d5060&language=bd#/home?language=";

const SIZE = 62;

export function SupportBubble() {
  const [pos, setPos] = useState<{ x: number; y: number } | null>(null);
  const dragging = useRef(false);
  const moved = useRef(false);
  const offset = useRef({ x: 0, y: 0 });

  useEffect(() => {
    setPos({
      x: window.innerWidth - SIZE - 12,
      y: window.innerHeight - SIZE - 96,
    });
  }, []);

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      if (!dragging.current) return;
      moved.current = true;
      const x = Math.min(
        Math.max(0, e.clientX - offset.current.x),
        window.innerWidth - SIZE,
      );
      const y = Math.min(
        Math.max(0, e.clientY - offset.current.y),
        window.innerHeight - SIZE,
      );
      setPos({ x, y });
    };
    const onUp = () => {
      dragging.current = false;
    };
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
    window.addEventListener("pointercancel", onUp);
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
      window.removeEventListener("pointercancel", onUp);
    };
  }, []);

  if (!pos) return null;

  return (
    <button
      type="button"
      aria-label="গ্রাহক পরিষেবা"
      onPointerDown={(e) => {
        dragging.current = true;
        moved.current = false;
        offset.current = {
          x: e.clientX - pos.x,
          y: e.clientY - pos.y,
        };
      }}
      onClick={() => {
        if (moved.current) return;
        window.open(SUPPORT_URL, "_blank", "noopener,noreferrer");
      }}
      style={{
        left: pos.x,
        top: pos.y,
        width: SIZE,
        height: SIZE,
        touchAction: "none",
      }}
      className="fixed z-50 select-none rounded-full bg-card shadow-[0_6px_18px_-4px_rgba(0,0,0,0.25)] active:scale-95"
    >
      <img
        src={supportIcon.url}
        alt="গ্রাহক পরিষেবা"
        draggable={false}
        className="h-full w-full rounded-full object-contain p-1"
      />
    </button>
  );
}
