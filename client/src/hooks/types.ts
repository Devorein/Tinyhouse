export interface State<TData> {
  data: TData | null,
  loading: boolean,
  error: boolean
}