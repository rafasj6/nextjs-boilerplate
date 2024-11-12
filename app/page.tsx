"use client"
import { QueryClient, QueryClientProvider } from "react-query";
import { AsssementComponent } from "./components/AsssementComponent";
import { ToastContainer } from 'react-toastify';


export default function Home() {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <ToastContainer />
      <AsssementComponent />
    </QueryClientProvider>
  );
}





