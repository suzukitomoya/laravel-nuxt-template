export const useAppFetch: typeof useFetch = (request, opts?) => {
  const runtimeConfig = useRuntimeConfig()

  return useFetch(request, {
    baseURL: runtimeConfig.public.apiBaseUrl as string,
    ...opts,
  })
}
