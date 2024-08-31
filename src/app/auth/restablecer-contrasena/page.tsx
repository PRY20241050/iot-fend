import { RestorePassword } from "@/components/auth/restore-password";
import { LOGIN_PATH } from "@/lib/utils";
import { redirect } from "next/navigation";

interface Props {
  searchParams: {
    token?: string;
    uid?: string;
  };
}

export default function RestablecerContrasenaPage({ searchParams }: Props) {
  if (searchParams.token && searchParams.uid) {
    return <RestorePassword />;
  } else {
    redirect(LOGIN_PATH);
  }
}
