import { CategoriesResponseType } from '@/app/categories/ServiceType';
import { ProductsType } from '@/app/products/productTypes';
import { getCustomerReviewsQuery } from '@/app/reviews/getCustomerReviewsQuery';
import { ReviewsResponseType } from '@/app/services/ReviewTypes';
import CatalogPage from '@/components/pages/CatalogPage';
import SeoMeta from '@/components/seo/SeoMeta';
import axios from 'axios';
import { getCategoriesQuery } from '@/app/categories/getCategoriesQuery';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { useMemo } from 'react';

type Props = {
    products: ProductsType;
    reviews: ReviewsResponseType;
    searchTerm?: string;
    categories?: CategoriesResponseType;
};

export default function Catalog({ products, reviews, searchTerm = '', categories }: Props) {
    const router = useRouter();
    const page = useMemo(() => {
        const raw = router.query.page;
        const value = Array.isArray(raw) ? raw[0] : raw;
        return value ? Number(value) || 1 : 1;
    }, [router.query.page]);

    const baseUrl = `${process.env.NEXT_PUBLIC_URL}/ortopedijos-technikos-katalogas`;
    const canonicalParams = new URLSearchParams();
    if (searchTerm) {
        canonicalParams.set('search', searchTerm);
    }
    if (page > 1) {
        canonicalParams.set('page', String(page));
    }
    const canonicalUrl = canonicalParams.toString() ? `${baseUrl}?${canonicalParams.toString()}` : baseUrl;

    const title = 'Ortopedijos technikos katalogas | Įtvarai, Protezai ir Avalynė'
    const description = 'Atraskite platų ortopedijos technikos pasirinkimą Vilniuje: įtvarai, protezai, ortopedinė avalynė ir kitos priemonės pagal individualius poreikius. Užsakykite dabar!'
    const keywords = 'ortopedijos technikos katalogas, ortopediniai įtvarai, ortopedinė avalynė, protezai, reabilitacijos priemonės, ortopedijos sprendimai'

    return (
        <>
            <SeoMeta
                title={title}
                description={description}
                canonical={canonicalUrl}
                openGraph={{
                    title: 'Ortopedijos technikos katalogas | Kokybiškos Priemonės Jūsų Sveikatai',
                    description: 'Peržiūrėkite mūsų ortopedijos technikos katalogą: aukštos kokybės įtvarai, protezai, ortopedinė avalynė ir daugiau. Užtikrinkite komfortą ir sveikatą su mūsų sprendimais!',
                    url: canonicalUrl,
                    type: 'website',
                    siteName: 'Medicinos ir ortopedijos centras',
                }}
                twitter={{
                    title: 'Ortopedijos technikos katalogas | Įtvarai, Protezai ir Avalynė',
                    description: 'Mūsų ortopedijos technikos kataloge rasite įtvarus, protezus ir ortopedinę avalynę, pritaikytą jūsų individualiems poreikiams. Pasirūpinkite savo sveikata šiandien!',
                }}
                keywords={keywords}
                author={'Medicinos ir ortopedijos centras'}
            >
                <link rel="icon" href="/favicon.ico" />
            </SeoMeta>

            <CatalogPage products={products} reviews={reviews} searchTerm={searchTerm} categories={categories} />
        </>
    );
}

export const getServerSideProps: GetServerSideProps<Props> = async ({ query }) => {
    const pageParam = Array.isArray(query.page) ? query.page[0] : query.page
    const searchParam = Array.isArray(query.search) ? query.search[0] : query.search

    const page = pageParam ? Math.max(parseInt(pageParam, 10) || 1, 1) : 1
    const searchTerm = searchParam ? searchParam.toString().trim() : ''

    const baseUrl = `${process.env.NEXT_PUBLIC_API_URL}/api/products`
    const params = new URLSearchParams()
    params.set('pagination[page]', String(page))
    params.set('pagination[pageSize]', '12')
    // Only fetch fields used in the catalog list
    params.set('fields[0]', 'title')
    params.set('fields[1]', 'slug')
    params.set('fields[2]', 'type')
    params.set('fields[3]', 'isNew')
    // minimal populate for relations
    params.set('populate[images][fields][0]', 'url')
    params.set('populate[category][fields][0]', 'title')

    if (searchTerm) {
        params.set('filters[$or][0][title][$containsi]', searchTerm)
        params.set('filters[$or][1][type][$containsi]', searchTerm)
        params.set('filters[$or][2][slug][$containsi]', searchTerm)
    }

    const productsUrl = `${baseUrl}?${params.toString()}`

    const [productsResponse, reviewsResponse] = await Promise.all([
        axios.get<ProductsType>(productsUrl),
        axios.get<ReviewsResponseType>(getCustomerReviewsQuery()),
    ])
    let categoriesResData: CategoriesResponseType = { data: [] }
    try {
        const res = await axios.get<CategoriesResponseType>(getCategoriesQuery())
        categoriesResData = res.data
    } catch (e) {
        try {
            const fallback = await axios.get<CategoriesResponseType>(`${process.env.NEXT_PUBLIC_API_URL}/api/categories?populate=*`)
            categoriesResData = fallback.data
        } catch {
            console.warn('Categories fetch failed, continuing with empty list')
        }
    }
    return {
        props: {
            products: productsResponse.data,
            reviews: reviewsResponse.data,
            categories: categoriesResData,
            searchTerm,
        },
    }
}
