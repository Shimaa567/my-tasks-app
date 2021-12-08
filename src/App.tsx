import Dashboard from "./ra/Dashboard";
import "./theme.css";
import rtlPlugin from "stylis-plugin-rtl";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";

const cacheRtl = createCache({
  key: "muirtl",
  stylisPlugins: [rtlPlugin],
});
const App: React.FC = () => (
  <CacheProvider value={cacheRtl}>
    <Dashboard />
  </CacheProvider>
);
export default App;
