import { CategoriesResponseType } from '@/app/categories/ServiceType'
import { getProductQuery } from '@/app/products/getProductQuery'
import { getProductsQuery } from '@/app/products/getProductsQuery'
import Footer from '@/components/Footer'
import Header from '@/components/layout/Header'
import ProductViewPage from '@/components/pages/ProductViewPage'
import { ProductViewData } from '@/components/pages/ProductViewPage.types'
import SeoMeta from '@/components/seo/SeoMeta'
import { toSlug } from '@/utils/slugify'
import Stack from '@mui/material/Stack'
import axios from 'axios'
import { getCategoriesQuery } from '@/app/categories/getCategoriesQuery'
import { GetStaticProps } from 'next'

type Props = {
    product: ProductViewData;
    categories: CategoriesResponseType;
}

const mapProduct = (rawProduct: any): ProductViewData => {
    const attributes = rawProduct?.attributes ?? {}
    const images = Array.isArray(attributes.images?.data) ? attributes.images.data : []
    const mainImageAttributes = images[0]?.attributes

    const diagnosesTable = Array.isArray(attributes.diagnosesTable)
        ? attributes.diagnosesTable.map((item: any) => ({
            id: item?.id ?? 0,
            percent: item?.percent ?? null,
            specialists: item?.specialists ?? '',
            diagnoses: Array.isArray(item?.diagnoses)
                ? item.diagnoses.map((diagnosis: any) => ({
                    id: diagnosis?.id ?? 0,
                    diagnose: diagnosis?.diagnose ?? '',
                }))
                : [],
        }))
        : []

    const notes = Array.isArray(attributes.notes)
        ? attributes.notes.map((note: any) => ({
            id: note?.id ?? 0,
            text: note?.text ?? '',
        }))
        : []

    const categoryTitle = attributes.category?.data?.attributes?.title ?? null
    const categorySlug = toSlug(categoryTitle)

    return {
        id: rawProduct?.id ?? 0,
        slug: attributes.slug ?? '',
        categorySlug,
        title: attributes.title ?? '',
        description: attributes.description ?? '',
        type: attributes.type ?? '',
        prices: attributes.prices ?? null,
        categoryTitle,
        image: mainImageAttributes?.url
            ? {
                url: mainImageAttributes.url,
                alternativeText: mainImageAttributes.alternativeText ?? null,
            }
            : null,
        diagnosesTable,
        notes,
    }
}

const ProductView = ({ product, categories }: Props) => {
    const seoTitle = `${product.title}${product.categoryTitle ? ` | ${product.categoryTitle}` : ''} | ${product.type} | Medicinos ir ortopedijos centras`
    const seoDescription = `${product.title} - ${product.description}. Atraskite aukštos kokybės ${product.type} priemones, pritaikytas pagal individualius poreikius. Užsakykite dabar!`
    const productUrl = `${process.env.NEXT_PUBLIC_URL}/ortopedijos-technika/${product.categorySlug}/${product.slug}`
    const keywords = [
        product.title,
        'ortopedijos priemonės',
        'ortopediniai produktai',
        product.categoryTitle ?? undefined,
        product.type,
        'aukštos kokybės ortopedija',
        'individualūs ortopedijos sprendimai',
    ].filter(Boolean).join(', ')

    return (
        <>
            <SeoMeta
                title={seoTitle}
                description={seoDescription}
                canonical={productUrl}
                openGraph={{
                    title: seoTitle,
                    description: `${product.title} - ${product.description}. Užsakykite dabar ir pagerinkite savo judėjimo komfortą. Aukštos kokybės ${product.type} priemonės pagal individualius poreikius.`,
                    url: productUrl,
                    type: 'product',
                }}
                twitter={{
                    title: seoTitle,
                    description: `${product.title} - ${product.description}. Pasirūpinkite savo sveikata ir komfortu su mūsų ${product.type} priemonėmis.`,
                }}
                keywords={keywords}
                author={'Medicinos ir ortopedijos centras'}
            >
                <link rel="icon" href="/favicon.ico" />
            </SeoMeta>

            <Stack sx={{ minHeight: '100vh', height: '100%', backgroundColor: '#f9f9f9' }}>
                <Header />
                <ProductViewPage product={product} categories={categories} />
                <Footer />
            </Stack>
        </>
    )
}
export default ProductView

export async function getStaticPaths() {
    const pages = await axios.get(getProductsQuery())
    const paths = pages.data.data?.map((page: any) => {
        const categoryTitle = page?.attributes?.category?.data?.attributes?.title
        const categorySlug = toSlug(categoryTitle)
        const slug = page?.attributes?.slug

        if (!slug) return null

        return categorySlug
            ? { params: { categorySlug, slug } }
            : null
    })?.filter(Boolean) ?? []

    return {
        paths: paths as { params: { categorySlug: string; slug: string } }[],
        fallback: 'blocking',
    }
}

export const getStaticProps: GetStaticProps<Props> = async (context) => {
    const categorySlugParam = context.params?.categorySlug
    const slug = context.params?.slug

    if (!slug || Array.isArray(slug) || !categorySlugParam || Array.isArray(categorySlugParam)) {
        return { notFound: true }
    }

    const data = await axios.get(getProductQuery(slug))
    const rawProduct = data?.data?.data?.[0]

    if (!rawProduct) {
        return { notFound: true, revalidate: 60 }
    }

    const product = mapProduct(rawProduct)

    if (!product.categorySlug) {
        return { notFound: true, revalidate: 60 }
    }

    if (product.categorySlug !== categorySlugParam) {
        return {
            redirect: {
                destination: `/ortopedijos-technika/${product.categorySlug}/${product.slug}`,
                permanent: true,
            },
            revalidate: 60,
        }
    }

    // ✅ Fetch categories for sidebar/navigation/SEO (slim query reused)
    const categoriesRes = await axios.get<CategoriesResponseType>(getCategoriesQuery())

    return {
        props: {
            product,
            categories: categoriesRes.data,
        },
        revalidate: 60,
    }
}
