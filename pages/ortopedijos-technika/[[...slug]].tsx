import { getProductQuery } from '@/app/products/getProductQuery'
import { toSlug } from '@/utils/slugify'
import axios from 'axios'
import { GetStaticProps } from 'next'

const LegacyProductRedirect = () => null

export default LegacyProductRedirect

export const getStaticPaths = async () => ({
    paths: [],
    fallback: 'blocking',
})

export const getStaticProps: GetStaticProps = async ({ params }) => {
    const slugParam = params?.slug

    if (!slugParam || !Array.isArray(slugParam)) {
        return {
            notFound: true,
        }
    }

    if (slugParam.length !== 1) {
        return {
            notFound: true,
        }
    }

    const [legacySlug] = slugParam

    if (!legacySlug) {
        return {
            notFound: true,
        }
    }

    const response = await axios.get(getProductQuery(legacySlug))
    const rawProduct = response?.data?.data?.[0]

    if (!rawProduct) {
        return {
            notFound: true,
            revalidate: 60,
        }
    }

    const categoryTitle = rawProduct?.attributes?.category?.data?.attributes?.title
    const categorySlug = toSlug(categoryTitle)

    if (!categorySlug) {
        return {
            notFound: true,
            revalidate: 60,
        }
    }

    return {
        redirect: {
            destination: `/ortopedijos-technika/${categorySlug}/${legacySlug}`,
            permanent: true,
        },
        revalidate: 60,
    }
}
