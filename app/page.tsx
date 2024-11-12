"use client"
import { QueryClient, QueryClientProvider } from "react-query";
import { AsssementComponent } from "./components/AsssementComponent";


export default function Home() {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <AsssementComponent />
    </QueryClientProvider>
  );
}





