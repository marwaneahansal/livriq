import { type Session } from "next-auth";
import { SessionProvider, useSession } from "next-auth/react";
import { type AppType } from "next/app";
import { api } from "~/utils/api";
import { NextUIProvider } from "@nextui-org/react";
import "~/styles/globals.css";
import Layout from "~/components/layout";
import type { AppPropsType } from 'next/dist/shared/lib/utils';
import { Loading } from "~/components/Loading";

export type NextAuthComponentType = AppPropsType['Component'] & { auth?: boolean;};

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  const AuthComponent = Component as NextAuthComponentType;
  return (
    <NextUIProvider>
      <SessionProvider session={session}>
        <Layout>
          {AuthComponent.auth ? (
            <Auth>
              <Component {...pageProps} />
            </Auth>
          ) : (
            <Component {...pageProps} />
          )}
        </Layout>
      </SessionProvider>
    </NextUIProvider>
  );
};

function Auth({ children } : { children: React.ReactNode } ) {
  // if `{ required: true }` is supplied, `status` can only be "loading" or "authenticated"
  const { status } = useSession({ required: true })

  if (status === "loading") {
    return <Loading />;
  }

  return children
}

export default api.withTRPC(MyApp);
