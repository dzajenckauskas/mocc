import type { NextApiRequest, NextApiResponse } from 'next'
import React from 'react'
import axios from 'axios'
import { renderToStream } from '@react-pdf/renderer'
import { ProductCatalogDocument } from '@/components/pdf/ProductCatalogPDF'
import { ProductViewData } from '@/components/pages/ProductViewPage.types'

/** Normalize text for PDF: strip tags and collapse whitespace */
function normalizeText(input?: string | null): string {
  if (!input) return ''
  try {
    const noTags = input.replace(/<[^>]*>/g, ' ')
    return noTags.replace(/\s+/g, ' ').trim()
  } catch {
    return String(input)
  }
}

/** Build absolute URL for images (Strapi usually returns relative paths) */
const buildAbsolute = (url?: string | null) => {
  if (!url) return undefined
  if (/^https?:\/\//i.test(url)) return url
  // Try your public site URL first (images proxied by Next) or fall back to Strapi URL:
  const base = process.env.NEXT_PUBLIC_URL || process.env.NEXT_PUBLIC_API_URL || ''
  return `${base}${url}`
}

/** Prefer a smaller image format for faster PDF rendering */
function pickLowResImageUrl(attr?: any): string | undefined {
  const formats = attr?.formats || {}
  const order = ['medium']
  for (const key of order) {
    const u = formats?.[key]?.url
    if (u) return buildAbsolute(u)
  }
  return buildAbsolute(attr?.url)
}

function mapStrapiToProductViewData(item: any): ProductViewData {
  const a = item?.attributes ?? {}

  const imageAttr =
    a.image?.data?.attributes ??
    a.images?.data?.[0]?.attributes ??
    a.cover?.data?.attributes ??
    null

  // Normalize diagnoses table where possible
  const normDiagnosesTable = Array.isArray(a.diagnosesTable)
    ? a.diagnosesTable.map((g: any, gi: number) => {
      const ga = g?.attributes ?? g
      const rawList = Array.isArray(ga?.diagnoses)
        ? ga.diagnoses
        : Array.isArray(ga?.diagnoses?.data)
          ? ga.diagnoses.data.map((d: any) => d?.attributes ?? d)
          : []
      return {
        id: g?.id ?? ga?.id ?? gi,
        percent: ga?.percent ?? null,
        specialists: normalizeText(ga?.specialists ?? ''),
        diagnoses: rawList.map((d: any, di: number) => ({
          id: d?.id ?? di,
          diagnose: normalizeText(d?.diagnose ?? d?.attributes?.diagnose ?? ''),
        })),
      }
    })
    : a.diagnosesTable

  const rawNotes = Array.isArray(a.notes)
    ? a.notes
    : Array.isArray(a.notes?.data)
      ? a.notes.data.map((n: any) => ({ id: n?.id, ...(n?.attributes ?? {}) }))
      : []

  return {
    slug: item?.slug ?? a.slug,
    id: item?.id ?? a.id ?? String(Math.random()),
    title: a.title ?? a.name ?? 'Be pavadinimo',
    type: a.type ?? null,
    prices: a.prices ?? a.price ?? null,
    description: normalizeText(a.description ?? a.content ?? ''),
    image: imageAttr ? { url: pickLowResImageUrl(imageAttr)! } : undefined,
    categoryTitle: a.category?.data?.attributes?.title ?? a.categoryTitle ?? null,
    categorySlug: a.category?.data?.attributes?.slug ?? a.categorySlug ?? null,
    diagnosesTable: normDiagnosesTable ?? a.diagnoses ?? undefined,
    notes: rawNotes.map((n: any, i: number) => ({ id: n?.id ?? i, text: normalizeText(n?.text ?? String(n)) })),
  }
}

async function fetchProducts(q: NextApiRequest['query']): Promise<ProductViewData[]> {
  const API = process.env.NEXT_PUBLIC_API_URL
  if (!API) throw new Error('Missing NEXT_PUBLIC_API_URL')

  const params: Record<string, any> = {
    'pagination[pageSize]': '100',
    // request only fields we actually render in the PDF
    'fields[0]': 'slug',
    'fields[1]': 'title',
    'fields[2]': 'type',
    'fields[3]': 'prices',
    'fields[4]': 'description',
    'populate[images][fields][0]': 'url',
    'populate[images][fields][1]': 'formats',
    'populate[image][fields][0]': 'url',
    'populate[image][fields][1]': 'formats',
    'populate[category][fields][0]': 'title',
    'populate[category][fields][1]': 'slug',
    'populate[diagnosesTable][fields][0]': 'percent',
    'populate[diagnosesTable][fields][1]': 'specialists',
    'populate[diagnosesTable][populate][diagnoses][fields][0]': 'diagnose',
    'populate[notes][fields][0]': 'text',
  }

  const url = `${API}/api/products`

  const res = await axios.get(url, { params })
  const list = res?.data?.data ?? []

  return list.map(mapStrapiToProductViewData)
}


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const products = await fetchProducts(req.query)

    if (!products.length) {
      res.status(404).json({ error: 'No products found for the given filters' })
      return
    }

    const doc = React.createElement(ProductCatalogDocument, {
      products,
      brand: 'www.mocc.lt',
      baseUrl: process.env.NEXT_PUBLIC_URL,
    }) as unknown as React.ReactElement<import('@react-pdf/renderer').DocumentProps>

    const stream = await renderToStream(doc)

    res.setHeader('Content-Type', 'application/pdf')
    res.setHeader('Content-Disposition', 'inline; filename="Medicinos ir ortopedijos centras - katalogas.pdf"')
    res.setHeader('Cache-Control', 'public, max-age=3600, s-maxage=3600')

    // @ts-ignore Node stream type is acceptable here
    stream.pipe(res)
  } catch (err: any) {
    console.error('PDF render failed:', err?.message || err)
    res.status(500).json({ error: 'Failed to render PDF' })
  }
}
