import Navbar from "@/components/shared/navbar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <main>
      <Navbar className="fixed" />
      <div className="pt-16">{children}</div>
    </main>
  );
}
