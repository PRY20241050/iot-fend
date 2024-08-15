import { cn } from "@/lib/utils";

interface Props {
  className?: string;
}

export default function LoadingPage({ className }: Props) {
  return (
    <div
      className={cn(
        "flex items-center justify-center h-[calc(100vh-var(--navbar-height))]",
        className
      )}
    >
      <p>Cargando...</p>
    </div>
  );
}
