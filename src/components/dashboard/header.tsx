import { useAuthStore } from "@/store/useAuthStore";
import { TypographyH1 } from "../ui/typography";
import { Button } from "../ui/button";
import { ListBulletIcon } from "@radix-ui/react-icons";

export default function Header() {
  const { user, isBrickyard } = useAuthStore((state) => ({
    user: state.user,
    isBrickyard: state.isBrickyard,
  }));

  return (
    <div className="inner-wrapper flex justify-between items-end pt-8">
      {isBrickyard && (
        <TypographyH1 className="text-3xl lg:text-4xl">
          Ladrillera {user?.brickyard?.name ?? "Sin nombre"}
        </TypographyH1>
      )}
      <Button>
        <ListBulletIcon className="h-4 w-4 mr-2" />
        Ver historial
      </Button>
    </div>
  );
}
