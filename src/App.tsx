import { ThemeProvider } from "@/components/theme-provider";
import Details from "@/pages/Details";
import Home from "@/pages/Home";
import Layout from "@/pages/Layout";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/details/:tokenId" element={<Details />} />
          </Routes>
        </Layout>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
