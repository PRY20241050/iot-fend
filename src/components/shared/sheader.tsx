import { TypographyH1 } from "../ui/typography";
import { Button } from "../ui/button";

interface Props {
  showTitle?: boolean;
  title?: string;
  btnAction: () => void;
  btnIcon?: JSX.Element;
  btnLabel?: string;
}

export default function Header({
  showTitle = true,
  title = "",
  btnAction,
  btnIcon,
  btnLabel = "",
}: Props) {
  return (
    <div className="w-full flex justify-between items-end">
      {showTitle && (
        <TypographyH1 className="text-3xl lg:text-4xl">{title}</TypographyH1>
      )}
      <Button onClick={btnAction} className="ml-auto">
        {btnIcon}
        {btnLabel}
      </Button>
    </div>
  );
}
