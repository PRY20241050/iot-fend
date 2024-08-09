import { cn } from "@/lib/utils";
import s from "./Loader.module.scss";

interface Props {
  children?: React.ReactNode;
  className?: string;
}

const Loader: React.FC<Props> = ({
  children,
  className,
}) => {
  return (
    <div className="flex gap-2 items-center justify-center">
      <span
        className={cn(
          "w-6 h-6 border-4 border-white rounded-full inline-block box-border",
          s.loader,
          className,
          "border-b-transparent"
        )}
      ></span>
      {children}
    </div>
  );
};

export default Loader;
