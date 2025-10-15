export const getServicesQuery = () => {
  const base = `${process.env.NEXT_PUBLIC_API_URL}/api/services`
  const params = new URLSearchParams({
    populate: '*',
    'filters[mocc][$eq]': 'true',
  })
  return `${base}?${params.toString()}`
}