declare module "@/components/CardSwap" {
  import type { ComponentType, ReactNode } from "react";

  type CardProps = {
    customClass?: string;
    className?: string;
    children?: ReactNode;
    style?: Record<string, unknown>;
    onClick?: (event: unknown) => void;
  };

  type CardSwapProps = {
    width?: number;
    height?: number;
    cardDistance?: number;
    verticalDistance?: number;
    delay?: number;
    pauseOnHover?: boolean;
    onCardClick?: (index: number) => void;
    externalTriggerKey?: number;
    skewAmount?: number;
    easing?: "elastic" | "soft";
    children?: ReactNode;
  };

  export const Card: ComponentType<CardProps>;
  const CardSwap: ComponentType<CardSwapProps>;
  export default CardSwap;
}
