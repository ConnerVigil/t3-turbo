import type { AppProps } from "next/app";
import { trpc } from "../util/trpc";

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  return <Component {...pageProps} />;
}

export default trpc.withTRPC(MyApp);
