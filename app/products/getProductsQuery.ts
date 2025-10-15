export const getProductsQuery = () => {
  const base = `${process.env.NEXT_PUBLIC_API_URL}/api/products`
  const p = new URLSearchParams()
  // Only what we need for building static paths
  p.set('pagination[limit]', '1000')
  p.set('fields[0]', 'slug')
  p.set('populate[category][fields][0]', 'title')
  return `${base}?${p.toString()}`
}
