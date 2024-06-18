import { TypographyH1 } from "../ui/typography";
import { Button } from "../ui/button";

interface Props {
  showTitle?: boolean;
  title?: string;
  btnAction: () => void;
  btnIcon?: JSX.Element;
  btnLabel?: string;
  children?: React.ReactNode;
}

export default function Header({
  showTitle = true,
  title = "",
  btnAction,
  btnIcon,
  btnLabel = "",
  children,
}: Props) {
  return (
    <div className="w-full flex justify-between items-end">
      {showTitle && (
        <TypographyH1 className="text-3xl lg:text-4xl">{title}</TypographyH1>
      )}
      <div className="flex gap-2">
        {children}
        <Button onClick={btnAction} className="ml-auto">
          {btnIcon}
          {btnLabel}
        </Button>
      </div>
    </div>
  );
}
