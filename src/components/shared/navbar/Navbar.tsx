"use client";

import { cn } from "@/lib/utils";
import Logo from "../Logo";
import { Notifications } from "./notification";
import { UserNav } from "./UserNav";
import SubNavbar from "./SubNavbar";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

interface Props {
  className?: string;
}

export default function Navbar({ className }: Props) {
  const { brickyardId } = useParams();

  const [scrolled, setScrolled] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className={cn("border-b w-full bg-white z-30", className)}>
      <div className="inner-wrapper mx-auto">
        <div
          className={cn(
            "flex items-center overflow-hidden transition-all duration-300",
            scrolled ? "h-0 opacity-0" : "h-[auto] py-3 opacity-100"
          )}
        >
          <Logo />
          <div className="ml-auto flex items-center space-x-4">
            <Notifications />
            <UserNav />
          </div>
        </div>
        {brickyardId && <SubNavbar className={cn({"mt-2" :scrolled})} />}
      </div>
    </div>
  );
}
