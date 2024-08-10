import { cn } from "@/lib/utils";
import Logo from "../Logo";
import { Notifications } from "./notification";
import { UserNav } from "./UserNav";

interface Props {
  className?: string;
}

export default function Navbar({ className }: Props) {
  return (
    <div className={cn("border-b w-full bg-white", className)}>
      <div className="flex h-16 items-center px-4">
        <Logo />
        <div className="ml-auto flex items-center space-x-4">
          <Notifications />
          <UserNav />
        </div>
      </div>
    </div>
  );
}
