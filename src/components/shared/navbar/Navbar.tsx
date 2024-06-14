import Logo from "../Logo";
import { Notifications } from "./Notifications";
import { UserNav } from "./UserNav";

export default function Navbar() {
  return (
    <div className="border-b">
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
