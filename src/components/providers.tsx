"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import * as React from "react";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { AuthProvider } from "./auth/auth-provider";

//======================================
export function Providers({ children }: { children: React.ReactNode }) {
  const queryClient = new QueryClient();
  // const [queryClient] = React.useState(
  //   () =>
  //     new QueryClient({
  //       defaultOptions: {
  //         queries: {
  //           staleTime: 5 * 1000,
  //         },
  //       },
  //     })
  // );
  return (
    <QueryClientProvider client={queryClient}>
      <NuqsAdapter>
        <NextThemesProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
          enableColorScheme
        >
          <AuthProvider>{children}</AuthProvider>
        </NextThemesProvider>
      </NuqsAdapter>
    </QueryClientProvider>
  );
}
