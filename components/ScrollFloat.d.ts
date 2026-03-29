declare module "@/components/ScrollFloat" {
  import type { ElementType, MutableRefObject, ReactNode } from "react";

  type ScrollFloatProps = {
    children: ReactNode;
    as?: ElementType;
    scrollContainerRef?: MutableRefObject<HTMLElement | null>;
    containerClassName?: string;
    textClassName?: string;
    animationDuration?: number;
    ease?: string;
    scrollStart?: string;
    scrollEnd?: string;
    stagger?: number;
  };

  export default function ScrollFloat(props: ScrollFloatProps): JSX.Element;
}
