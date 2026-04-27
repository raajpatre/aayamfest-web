"use client";

import ShapeGrid from "@/components/ShapeGrid";

export function TerminalBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-50 h-full w-full overflow-hidden bg-[#000000]">
      <div className="fixed inset-0 h-full w-full -z-50 bg-black">
        <ShapeGrid
          direction="diagonal"
          speed={0.22}
          borderColor="rgba(34, 211, 238, 0.22)"
          squareSize={64}
          hoverFillColor="rgba(34, 211, 238, 0.12)"
          shape="square"
          hoverTrailAmount={0}
        />
      </div>

      <div className="fixed inset-0 pointer-events-none z-[-40] bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(0,0,0,0.55)_78%,rgba(0,0,0,0.92)_100%)]" />

      <div className="absolute -left-[18vw] -top-[12vh] h-[28rem] w-[28rem] rounded-full bg-cyan-900/16 blur-[120px]" />
    </div>
  );
}
