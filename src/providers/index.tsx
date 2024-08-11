"use client";
import { PropsWithChildren } from "react";
import { QueryClientProvider } from "./queryClientProvider";
import { AuthContext } from "./authContext";

export const AppProviders = (props: PropsWithChildren) => {
  return (
    <AuthContext>
      <QueryClientProvider>{props.children}</QueryClientProvider>
    </AuthContext>
  );
};
