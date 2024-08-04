import { LayoutPrimary } from "@/components/layouts";
import { ProfileMenu } from "@/components/profile";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <LayoutPrimary className="phone-xl:flex phone-xl:gap-6 space-y-5">
      <ProfileMenu />
      <div className="w-full">{children}</div>
    </LayoutPrimary>
  );
}
