import Head from 'next/head'
import { ReactNode } from 'react'

type OpenGraphMeta = {
    title?: string;
    description?: string;
    url?: string;
    type?: string;
    image?: string;
    siteName?: string;
    locale?: string;
}

type TwitterMeta = {
    card?: 'summary' | 'summary_large_image' | 'app' | 'player';
    title?: string;
    description?: string;
    image?: string;
    site?: string;
    creator?: string;
}

type SeoMetaProps = {
    title: string;
    description: string;
    canonical: string;
    openGraph?: OpenGraphMeta;
    twitter?: TwitterMeta;
    robots?: string;
    keywords?: string;
    author?: string;
    viewport?: string;
    jsonLd?: Record<string, unknown> | Record<string, unknown>[];
    children?: ReactNode;
}

const stripTrailingSlash = (value: string) => value.replace(/\/$/, '')
const baseUrl = process.env.NEXT_PUBLIC_URL ? stripTrailingSlash(process.env.NEXT_PUBLIC_URL) : ''
const defaultImagePath = '/media/shared-link-cover-image.png'
const makeAbsoluteUrl = (value?: string | null) => {
    const input = value?.trim()
    if (!input) return undefined
    if (/^https?:\/\//i.test(input)) return input
    if (input.startsWith('//')) return `https:${input}`
    if (!baseUrl) return input
    if (input.startsWith('/')) return `${baseUrl}${input}`
    return `${baseUrl}/${input}`
}

const defaultViewport = 'width=device-width, initial-scale=1'
const defaultTwitterCard: TwitterMeta['card'] = 'summary_large_image'
const defaultRobots = 'index, follow'
const defaultOgImage = baseUrl ? `${baseUrl}${defaultImagePath}` : defaultImagePath

const SeoMeta = ({
    title,
    description,
    canonical,
    openGraph,
    twitter,
    robots,
    keywords,
    author,
    viewport = defaultViewport,
    jsonLd,
    children,
}: SeoMetaProps) => {
    const og = {
        title,
        description,
        url: canonical,
        type: 'website',
        image: defaultOgImage,
        ...openGraph,
    }

    const ogImage = makeAbsoluteUrl(og.image) ?? defaultOgImage

    const twitterMeta: TwitterMeta = {
        card: defaultTwitterCard,
        title,
        description,
        image: ogImage,
        ...twitter,
    }

    const twitterImage = makeAbsoluteUrl(twitterMeta.image) ?? ogImage

    return (
        <Head>
            <title>{title}</title>
            <meta name="description" content={description} />
            <meta name="viewport" content={viewport} />
            <link rel="canonical" href={canonical} />

            <meta property="og:title" content={og.title} />
            <meta property="og:description" content={og.description} />
            {og.url && <meta property="og:url" content={og.url} />}
            {og.type && <meta property="og:type" content={og.type} />}
            {ogImage && <meta property="og:image" content={ogImage} />}
            {og.siteName && <meta property="og:site_name" content={og.siteName} />}
            {og.locale && <meta property="og:locale" content={og.locale} />}

            <meta name="twitter:card" content={twitterMeta.card ?? defaultTwitterCard} />
            {twitterMeta.title && <meta name="twitter:title" content={twitterMeta.title} />}
            {twitterMeta.description && <meta name="twitter:description" content={twitterMeta.description} />}
            {twitterImage && <meta name="twitter:image" content={twitterImage} />}
            {twitterMeta.site && <meta name="twitter:site" content={twitterMeta.site} />}
            {twitterMeta.creator && <meta name="twitter:creator" content={twitterMeta.creator} />}

            <meta name="robots" content={robots ?? defaultRobots} />
            {keywords && <meta name="keywords" content={keywords} />}
            {author && <meta name="author" content={author} />}

            {jsonLd && (
                <script type="application/ld+json">
                    {JSON.stringify(jsonLd)}
                </script>
            )}

            {children}
        </Head>
    )
}

export default SeoMeta
