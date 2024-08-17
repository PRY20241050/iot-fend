import { SubNavbar } from "@/components/shared/navbar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SubNavbar />
      <div>{children}</div>
    </>
  );
}
