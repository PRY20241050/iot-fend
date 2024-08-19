import Link from "next/link";
import { TypographyH4 } from "../ui/typography";

export default function Logo() {
  return (
    <TypographyH4 className="w-[8ch] text-[12px] font-bold">
      <Link href="/">IoT Monitoring</Link>
    </TypographyH4>
  );
}
