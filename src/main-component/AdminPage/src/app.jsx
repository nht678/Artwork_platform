/* eslint-disable perfectionist/sort-imports */
// import "src/global.css";
import "simplebar-react/dist/simplebar.min.css";
import { useScrollToTop } from "../src/hooks/use-scroll-to-top";

import Router from "../src/routes/sections";
import ThemeProvider from "./theme";

// ----------------------------------------------------------------------

export default function App() {
  useScrollToTop();

  return (
    <ThemeProvider>
      <Router />
    </ThemeProvider>
  );
}
