import { ThemeProvider } from "@/components/theme-provider";
import Routes from "./Routes";

export default function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Routes />
    </ThemeProvider>
  );
}
