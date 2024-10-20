import { useToast } from "@/components/ui/use-toast";
import { DEFAULT_ERROR, getError } from "@/lib/utils";
import { ErrorResponse } from "@/types/errors";
import { useEffect, useState } from "react";

export function useShowToastWithErrorOneTime(
  initialError?: any,
  defaultMessage = DEFAULT_ERROR.server
) {
  const [error, setError] = useState(initialError);
  const [messageError, setMessageError] = useState<ErrorResponse>();
  const { toast } = useToast();

  const changeError = (newError: any) => {
    setError((prev: any) => newError);

    setMessageError((prev: any) => getError(error, defaultMessage));
  };

  useEffect(() => {
    if (!messageError) return;

    toast({
      variant: "destructive",
      title: DEFAULT_ERROR.header,
      description: messageError.message,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [messageError]);

  return {
    changeError,
    error,
  };
}

export function useShowToastWithError(error: any, defaultMessage = "") {
  const { toast } = useToast();

  const mError = getError(error, defaultMessage);

  toast({
    variant: "destructive",
    title: DEFAULT_ERROR.header,
    description: mError.message,
  });
}
