import { useState } from "react"
import { server } from "../utils";
import { State } from "./types";

export const useMutation = <TData = any, TVariables = any>(query: string) => {
  const [state, setState] = useState<State<TData>>({
    data: null,
    loading: false,
    error: false
  });

  const fetch = async (variables?: TVariables) => {
    try {
      setState({
        data: null,
        error: false,
        loading: true
      });

      const { data, errors } = await server.fetch<TData, TVariables>({ query, variables });
      if (errors && errors.length) {
        throw new Error(errors[0].message)
      }

      setState({
        loading: false,
        error: false,
        data
      });

    } catch (err) {
      setState({
        error: true,
        loading: false,
        data: null
      })
      console.error(err.message)
    }
  }

  return [fetch, state]
}