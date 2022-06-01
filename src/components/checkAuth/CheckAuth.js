import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

const CheckAuth = ({ Component, pageProps }) => {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "loading") {
      return;
    }

    if (!session) {
      router.push("/");
    }
  }, [session, status]);

  if (session) {
    return <Component {...pageProps} />;
  }

  return "Carregando...";
};

export default CheckAuth;
