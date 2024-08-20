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
    <div className="w-full flex flex-col gap-3 justify-between phone-xl:flex-row phone-xl:items-end">
      {showTitle && (
        <TypographyH1 className="text-3xl lg:text-4xl font-semibold">
          {title}
        </TypographyH1>
      )}
      <div className="flex gap-2">
        {btnAction && (
          <Button onClick={btnAction} className="phone-xl:ml-auto">
            {btnIcon}
            {btnLabel}
          </Button>
        )}
        {children}
      </div>
    </div>
  );
}
