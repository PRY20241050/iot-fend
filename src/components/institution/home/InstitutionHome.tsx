import { useAuthStore } from "@/store/useAuthStore";
import { LayoutPrimary } from "@/components/layouts";
import { TypographyH1, TypographyH2 } from "@/components/ui/typography";
import { BrickyardCard } from "./brickyard-card";
import { useRequest } from "@/lib/api/swr";
import { BRICKYARDS_URL } from "@/services/consts";
import { Brickyard } from "@/types/brickyard";
import { useShowToastWithErrorOneTime } from "@/hooks/core/useShowToastWithError";
import { useEffect } from "react";

const skeletonItems = [...Array.from({ length: 4 }, (_, i) => i)];

export default function InstitutionHome() {
  const { user } = useAuthStore((state) => ({
    user: state.user,
  }));
  const { changeError } = useShowToastWithErrorOneTime();
  const { institution } = user ?? {};
  const {
    data: brickyards = [],
    isLoading,
    error,
  } = useRequest<Brickyard[]>({
    url: BRICKYARDS_URL,
  });

  useEffect(() => {
    if (!error) return;

    changeError(error);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error]);

  return (
    <LayoutPrimary>
      <TypographyH1 className="text-3xl lg:text-4xl font-semibold">
        {institution?.name}
      </TypographyH1>
      <TypographyH2 className="text-xl lg:text-2xl pt-2 lg:pt-3 border-none">
        Administración de ladrilleras
      </TypographyH2>
      <div className="space-y-4 pt-4">
        {isLoading ? (
          <>
            {skeletonItems.map((index) => (
              <BrickyardCard.Sk key={index} />
            ))}
          </>
        ) : (
          <>
            {brickyards.map((brickyard) => (
              <BrickyardCard key={brickyard.id} data={brickyard} />
            ))}
          </>
        )}
      </div>
    </LayoutPrimary>
  );
}
