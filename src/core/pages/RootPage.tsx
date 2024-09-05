import { ScreenSizeContext } from "@/context/ScreenSIzeContext";
import useMediaQuery from "@/hooks/use-media-query";
import { Outlet } from "react-router-dom";

export default function RootPage() {
  const isDesktop = useMediaQuery("(min-width: 1024px)");

  return (
    <ScreenSizeContext.Provider value={{ isDesktop }}>
      <Outlet />
    </ScreenSizeContext.Provider>
  );
}
