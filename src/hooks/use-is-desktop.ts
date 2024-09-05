import { ScreenSizeContext } from "@/context/ScreenSIzeContext";
import { useContext } from "react";

export default function useIsDesktop() {
  const { isDesktop } = useContext(ScreenSizeContext);
  return isDesktop;
}
