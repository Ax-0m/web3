import axios from "axios";
// import { useEffect, useState } from "react";
import { QueryClient, QueryClientProvider, useQuery } from "@tanstack/react-query";

const queryClient = new QueryClient();

async function get() {
  const response = await axios.get("https://jsonplaceholder.typicode.com/posts");
  return response.data;
}

function App() {

  return (
    <QueryClientProvider client={queryClient}>
      <Posts />    
    </QueryClientProvider>
)}

function Posts() {
  const {data, isLoading, Error} = useQuery({
    queryKey: ["posts"],
    queryFn: get
  })

  if (Error) {
    return <div>Error</div>
  }

  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <div>
      {JSON.stringify(data)}
    </div>
  )
}

export default App;