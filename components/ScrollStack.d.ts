declare module "@/components/ScrollStack" {
  import type { ReactNode } from "react";

  type ScrollStackProps = {
    children: ReactNode;
    className?: string;
    itemDistance?: number;
    itemScale?: number;
    itemStackDistance?: number;
    stackPosition?: string;
    scaleEndPosition?: string;
    baseScale?: number;
    scaleDuration?: number;
    rotationAmount?: number;
    blurAmount?: number;
    useWindowScroll?: boolean;
    onStackComplete?: () => void;
  };

  type ScrollStackItemProps = {
    children: ReactNode;
    itemClassName?: string;
  };

  export function ScrollStackItem(props: ScrollStackItemProps): JSX.Element;
  export default function ScrollStack(props: ScrollStackProps): JSX.Element;
}
