import type { AppType } from "next/app";
import { trpc } from "../util/trpc";
import type { AppProps } from "next/app";

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  return <Component {...pageProps} />;
}

export default trpc.withTRPC(MyApp);
