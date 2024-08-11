import {
  QueryClient,
  QueryClientProvider as ReactQueryQueryClientProvider,
} from "@tanstack/react-query";
import { PropsWithChildren } from "react";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: { refetchOnWindowFocus: false, refetchInterval: 0 },
  },
});

export const QueryClientProvider = (props: PropsWithChildren) => {
  return (
    <ReactQueryQueryClientProvider client={queryClient}>
      {props.children}
    </ReactQueryQueryClientProvider>
  );
};
