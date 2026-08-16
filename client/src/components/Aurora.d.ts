declare module "@/components/Aurora" {
  import type { ComponentType } from "react";

  export interface AuroraProps {
    colorStops?: [string, string, string];
    amplitude?: number;
    blend?: number;
    speed?: number;
    time?: number;
  }

  const Aurora: ComponentType<AuroraProps>;
  export default Aurora;
}
