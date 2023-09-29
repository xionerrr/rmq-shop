export const ToQueryParams = (params: Record<string, unknown>): string => {
  const entries = Object.entries(params)
  const queryParams: string[] = []

  entries.forEach((key) => {
    if (!key[1]) return
    queryParams.push(`${key[0]}=${key[1]}`)
  })

  return '?' + queryParams.join('&')
}
