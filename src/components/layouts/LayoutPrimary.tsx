import { cn } from "@/lib/utils";

interface Props {
  children: React.ReactNode;
  className?: string;
}

export default function LayoutPrimary({ children, className }: Props) {
  return (
    <section className="wrapper">
      <div className={cn("inner-wrapper py-8", className)}>{children}</div>
    </section>
  );
}
