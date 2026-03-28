declare module "@/components/DecryptedText" {
  import type { ComponentType, HTMLAttributes } from "react";

  export interface DecryptedTextProps extends HTMLAttributes<HTMLSpanElement> {
    text: string;
    speed?: number;
    maxIterations?: number;
    sequential?: boolean;
    revealDirection?: "start" | "end" | "center";
    useOriginalCharsOnly?: boolean;
    characters?: string;
    className?: string;
    parentClassName?: string;
    encryptedClassName?: string;
    animateOn?: "hover" | "view" | "click" | "inViewHover";
    clickMode?: "once" | "toggle";
  }

  const DecryptedText: ComponentType<DecryptedTextProps>;
  export default DecryptedText;
}
