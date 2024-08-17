import Loader from "@/components/ui/loader";
import { cn } from "@/lib/utils";

interface Props {
  className?: string;
}

export default function LoadingPage({ className }: Props) {
  return (
    <div className={cn("flex items-center justify-center h-[100vh]", className)}>
      <div className="space-y-3">
        <Loader className="border-primary w-8 h-8" /> <p>Cargando...</p>
      </div>
    </div>
  );
}
