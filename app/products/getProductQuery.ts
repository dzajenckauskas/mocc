export const getProductQuery = (slug: string | string[] | undefined) => {
  const base = `${process.env.NEXT_PUBLIC_API_URL}/api/products`
  const p = new URLSearchParams()
  p.set('filters[slug][$eq]', String(slug))
  // Only fields used in ProductViewPage and SEO
  p.set('fields[0]', 'slug')
  p.set('fields[1]', 'title')
  p.set('fields[2]', 'description')
  p.set('fields[3]', 'type')
  p.set('fields[4]', 'prices')
  p.set('populate[images][fields][0]', 'url')
  p.set('populate[category][fields][0]', 'title')
  p.set('populate[diagnosesTable][fields][0]', 'percent')
  p.set('populate[diagnosesTable][fields][1]', 'specialists')
  p.set('populate[diagnosesTable][populate][diagnoses][fields][0]', 'diagnose')
  p.set('populate[notes][fields][0]', 'text')
  return `${base}?${p.toString()}`
}
