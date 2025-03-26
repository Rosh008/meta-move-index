import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

interface LayoutProps {
  children: React.ReactNode;
}
export default function Layout({ children }: LayoutProps) {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col min-h-screen w-screen">
      <header className="w-full fixed py-4 px-6 flex justify-between items-center bg-[#171717] top-0 z-50">
        <div
          onClick={() => navigate("/")}
          className="font-serif text-lg cursor-pointer"
        >
          AptIndex AI
        </div>
        <Button onClick={() => navigate("/request")} variant="outline">
          Submit request
        </Button>
      </header>
      <main className="w-full flex-1 xl:px-24 px-8 mx-auto mt-24">
        {children}
      </main>
      <footer className="xl:px-24 px-8 my-4">
        <div className="text-[#A2A2A2] text-center text-sm ">
          Copyright © 2025 AptIndex AI
        </div>
      </footer>
    </div>
  );
}
