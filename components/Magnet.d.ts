declare module "@/components/Magnet" {
  import type { ComponentType, HTMLAttributes, ReactNode } from "react";

  export interface MagnetProps extends HTMLAttributes<HTMLDivElement> {
    children: ReactNode;
    padding?: number;
    disabled?: boolean;
    magnetStrength?: number;
    activeTransition?: string;
    inactiveTransition?: string;
    wrapperClassName?: string;
    innerClassName?: string;
  }

  const Magnet: ComponentType<MagnetProps>;
  export default Magnet;
}
