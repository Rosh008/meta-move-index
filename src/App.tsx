import { ThemeProvider } from "@/components/theme-provider";
import Home from "@/pages/Home";
import Layout from "@/pages/Layout";

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Layout>
        <Home />
      </Layout>
    </ThemeProvider>
  );
}

export default App;
