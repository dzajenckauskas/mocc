export const getCategoriesQuery = () => {
  const base = `${process.env.NEXT_PUBLIC_API_URL}/api/categories`
  const p = new URLSearchParams()
  p.set('fields[0]', 'title')
  p.set('fields[1]', 'slug')
  // keep request minimal and broadly compatible
  p.set('populate[images][fields][0]', 'url')
  return `${base}?${p.toString()}`
}
