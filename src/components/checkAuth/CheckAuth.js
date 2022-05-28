import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

const CheckAuth = ({ Component, pageProps }) => {
  const { data: session, loading } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (loading) {
      return;
    }

    if (!session) {
      router.push("/");
    }
  }, [session, loading]);

  if (session) {
    return <Component {...pageProps} />;
  }

  return "Carregando...";
};

export default CheckAuth;
