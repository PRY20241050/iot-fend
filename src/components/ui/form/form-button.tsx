import { Button } from "../button"; 
import Loader from "../loader"; 

interface Props {
  type?: "button" | "submit" | "reset";
  disabled: boolean;
  className?: string;
  text: string;
  isLoading: boolean;
}

export function FormButton({
  type = "submit",
  disabled,
  isLoading,
  text,
  className,
}: Props) {
  return (
    <Button type={type} disabled={disabled} className={className}>
      {isLoading ? <Loader /> : <>{text}</>}
    </Button>
  );
}
