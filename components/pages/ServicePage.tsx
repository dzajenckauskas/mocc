import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Image from 'next/image'
import Breadcrumbs, { Crumb } from '@/components/shared/Breadcrumbs'
import SeoMeta from '@/components/seo/SeoMeta'
import Layout from '@/components/Layout'
import { ReviewsResponseType } from '@/app/services/ReviewTypes'
import { ServiceType } from '@/app/services/ServiceType'

type Props = {
    service: ServiceType
    reviews: ReviewsResponseType
}

const buildImageUrl = (imagePath?: string | null) => {
    if (!imagePath) return null
    return imagePath.startsWith('http') ? imagePath : `${process.env.NEXT_PUBLIC_URL}${imagePath}`
}

export default function ServicePage({ service, reviews }: Props) {
    const a = service.attributes
    const rawImage = a.images?.data?.[0]?.attributes?.url ?? null
    const absoluteImage = buildImageUrl(rawImage)

    const baseUrl = `${process.env.NEXT_PUBLIC_URL}/ortopedijos-paslaugos/${a.slug}`
    const title = `${a.title} | Ortopedijos paslaugų klinika`
    const description = a.description || 'Profesionali ortopedijos paslauga – registruokitės konsultacijai.'

    const crumbs: Crumb[] = [
        { label: 'Ortopedijos paslaugos', href: '/ortopedijos-paslaugos' },
        { label: a.title },
    ]

    return (
        <>
            <SeoMeta
                title={title}
                description={description}
                canonical={baseUrl}
                openGraph={{
                    title,
                    description,
                    url: baseUrl,
                    type: 'article',
                    siteName: 'Ortopedijos paslaugų klinika',
                }}
                twitter={{
                    title,
                    description,
                }}
                author="Ortopedijos paslaugų klinika"
            >
                <link rel="icon" href="/favicon.ico" />
            </SeoMeta>

            <Layout color={'#1E6EA1'} reviews={reviews}>
                <Stack
                    sx={{
                        maxWidth: '1200px',
                        width: '100%',
                        mx: 'auto',
                        px: { lg: 4, md: 4, sm: 3, xs: 3 },
                        pb: 8,
                    }}
                    spacing={3}
                >
                    {/* Breadcrumbs */}
                    <Breadcrumbs items={crumbs} />

                    {/* Hero */}
                    <Box sx={{ position: 'relative', width: '100%', height: { xs: 280, sm: 360, md: 520 }, borderRadius: 1, overflow: 'hidden' }}>
                        <Image
                            priority
                            src={absoluteImage ?? '/placeholder-image.webp'}
                            alt={a.images?.data?.[0]?.attributes?.alternativeText || a.title}
                            fill
                            sizes="100vw"
                            style={{ objectFit: 'cover' }}
                        />
                        <Box
                            sx={{
                                position: 'absolute',
                                inset: 0,
                                background: 'linear-gradient(to top, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.0) 60%)',
                            }}
                        />
                        <Box
                            sx={{
                                position: 'absolute',
                                bottom: 16,
                                left: { xs: 16, md: '50%' },
                                transform: { md: 'translateX(-50%)' },
                                width: '100%',
                                maxWidth: 1000,
                                px: { xs: 0, md: 2 },
                            }}
                        >
                            <Typography
                                variant="h1"
                                sx={{
                                    color: '#fff',
                                    textTransform: 'uppercase',
                                    fontSize: { xs: 28, sm: 34, md: 42 },
                                    fontWeight: 700,
                                    textAlign: { xs: 'left', md: 'center' },
                                }}
                            >
                                {a.title}
                            </Typography>
                        </Box>
                    </Box>

                    {/* Content (CKEditor/Strapi HTML) */}
                    <Stack sx={{ maxWidth: 1000, alignSelf: 'center', width: '100%' }}>
                        <Box
                            className="dynamicContent"
                            sx={{
                                color: '#000',
                                mx: 'auto',
                                width: '100%',

                                // ✅ Force brand color on headings, links, and bold text inside raw HTML
                                '& h1, & h2, & h3, & h4, & h5, & h6': {
                                    color: 'primary.main',
                                    marginTop: '1.25rem',
                                    marginBottom: '.75rem',
                                    lineHeight: 1.25,
                                },
                                '& a': {
                                    color: 'primary.main',
                                    textDecoration: 'underline',
                                    textUnderlineOffset: '2px',
                                    '&:hover': { opacity: 0.9 },
                                },
                                '& strong, & b': {
                                    // color: 'primary.main',
                                    fontWeight: 700,
                                },
                                '& p': {
                                    marginBottom: '1rem',
                                    lineHeight: 1.6,
                                },
                                '& ul, & ol': {
                                    paddingLeft: '1.25rem',
                                    marginBottom: '1rem',
                                },
                                '& li': {
                                    marginBottom: '.5rem',
                                },
                                // tables/images if needed
                                '& table': {
                                    width: '100%',
                                    borderCollapse: 'collapse',
                                    marginBottom: '1rem',
                                },
                                '& th, & td': {
                                    border: '1px solid rgba(0,0,0,0.1)',
                                    padding: '.5rem',
                                },
                                '& img': {
                                    maxWidth: '100%',
                                    height: 'auto',
                                },
                            }}
                        >
                            {a.fullContent ? (
                                <div dangerouslySetInnerHTML={{ __html: a.fullContent as unknown as string }} />
                            ) : a.richText ? (
                                <div dangerouslySetInnerHTML={{ __html: a.richText as unknown as string }} />
                            ) : (
                                a.description && (
                                    <Typography fontSize={16} lineHeight="24px" fontWeight={300} color="#333">
                                        {a.description}
                                    </Typography>
                                )
                            )}
                        </Box>
                    </Stack>
                </Stack>
            </Layout>
        </>
    )
}
