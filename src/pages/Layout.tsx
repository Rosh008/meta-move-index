import { Button } from "@/components/ui/button";

interface LayoutProps {
  children: React.ReactNode;
}
export default function Layout({ children }: LayoutProps) {
  return (
    <div className="flex flex-col min-h-screen w-screen">
      <header className="w-full fixed py-4 px-6 flex justify-between items-center bg-[#171717] top-0 z-50">
        <div className="font-serif text-lg">Meta Move AI</div>
        <Button variant="outline">Submit request</Button>
      </header>
      <main className="w-full flex-1 xl:px-24 px-8 mx-auto mt-24">
        {children}
      </main>
      <footer className="xl:px-24 px-8 mb-4">Footer</footer>
    </div>
  );
}
