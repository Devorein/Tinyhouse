import { useCallback } from "react";
import { useEffect, useState } from "react"
import { server } from "../utils";

interface State<TData> {
  data: TData | null,
  loading: boolean
}
export const useQuery = <TData = any>(query: string) => {
  const [state, setState] = useState<State<TData>>({ data: null, loading: true });

  const fetch = useCallback(() => {
    const fetchApi = async () => {
      const { data } = await server.fetch<TData>({ query });
      setState({
        data,
        loading: false
      })
    }
    fetchApi();
  }, [query]);

  useEffect(() => {
    fetch()
  }, [fetch]);

  return { state, refetch: fetch };
}