import { ThemeProvider } from "@/components/theme-provider";
import Details from "@/pages/Details";
import Home from "@/pages/Home";
import Layout from "@/pages/Layout";
import Request from "@/pages/Request";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/details/:tokenId" element={<Details />} />
            <Route path="/request" element={<Request />} />
          </Routes>
        </Layout>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
