import { CategoriesResponseType, CategoryType } from '@/app/categories/ServiceType';
import { ProductsType } from '@/app/products/productTypes';
import { getCustomerReviewsQuery } from '@/app/reviews/getCustomerReviewsQuery';
import { ReviewsResponseType } from '@/app/services/ReviewTypes';
import KatalogasPage from '@/components/pages/CatalogPage';
import SeoMeta from '@/components/seo/SeoMeta';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import { getCategoriesQuery } from '@/app/categories/getCategoriesQuery';
import { GetServerSideProps } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useMemo } from 'react';

type Props = {
    products: ProductsType;
    reviews: ReviewsResponseType;
    categories: CategoriesResponseType;
    searchTerm?: string;
    categorySlug?: string | null;
    categoryTitle?: string | null;
};

export default function Katalogas({
    products,
    reviews,
    searchTerm = '',
    categories,
    categorySlug = null,
    categoryTitle = null,
}: Props) {
    const router = useRouter();
    const page = useMemo(() => {
        const raw = router.query.page;
        const value = Array.isArray(raw) ? raw[0] : raw;
        return value ? Number(value) || 1 : 1;
    }, [router.query.page]);

    // Base canonical respects category path if present
    const baseUrl = `${process.env.NEXT_PUBLIC_URL}/ortopedijos-technikos-katalogas${categorySlug ? `/${categorySlug}` : ''}`;
    const canonicalParams = new URLSearchParams();
    if (searchTerm) canonicalParams.set('search', searchTerm);
    if (page > 1) canonicalParams.set('page', String(page));
    const canonicalUrl = canonicalParams.toString() ? `${baseUrl}?${canonicalParams.toString()}` : baseUrl;

    // SEO strings (category-aware)
    const titleBase = 'Ortopedijos technikos katalogas';
    const siteName = 'Ortopedijos paslaugų klinika';
    const categorySuffix = categoryTitle ? ` | ${categoryTitle}` : '';
    const title = `${titleBase}${categorySuffix} | Įtvarai, Protezai ir Avalynė`;

    const description = categoryTitle
        ? `Peržiūrėkite kategoriją „${categoryTitle}“: aukštos kokybės įtvarai, protezai ir ortopedinė avalynė, pritaikyta jūsų poreikiams. Užsakykite dabar!`
        : 'Atraskite platų ortopedijos technikos pasirinkimą Vilniuje: įtvarai, protezai, ortopedinė avalynė ir kitos priemonės pagal individualius poreikius. Užsakykite dabar!';

    const keywords =
        (categoryTitle ? `ortopedijos technikos katalogas, ${categoryTitle.toLowerCase()}, ` : 'ortopedijos technikos katalogas, ') +
        'ortopediniai įtvarai, ortopedinė avalynė, protezai, reabilitacijos priemonės, ortopedijos sprendimai';

    return (
        <>
            <SeoMeta
                title={title}
                description={description}
                canonical={canonicalUrl}
                openGraph={{
                    title,
                    description,
                    url: canonicalUrl,
                    type: 'website',
                    siteName,
                }}
                twitter={{
                    title,
                    description,
                }}
                keywords={keywords}
                author={siteName}
            >
                <link rel="icon" href="/favicon.ico" />
            </SeoMeta>

            <KatalogasPage categories={categories} title={categoryTitle} products={products} reviews={reviews} searchTerm={searchTerm} />
        </>
    );
}

export const getServerSideProps: GetServerSideProps<Props> = async ({ query }) => {
    const categorySlug = Array.isArray(query.categorySlug) ? query.categorySlug[0] : query.categorySlug || null;
    const pageParam = Array.isArray(query.page) ? query.page[0] : query.page;
    const searchParam = Array.isArray(query.search) ? query.search[0] : query.search;

    const page = pageParam ? Math.max(parseInt(pageParam as string, 10) || 1, 1) : 1;
    const searchTerm = (searchParam ? String(searchParam) : '').trim();

    const baseUrl = `${process.env.NEXT_PUBLIC_API_URL}/api/products`;
    const categoriesBaseUrl = `${process.env.NEXT_PUBLIC_API_URL}/api/categories`;

    // Build product query
    const params = new URLSearchParams();
    params.set('pagination[page]', String(page));
    params.set('pagination[pageSize]', '12');
    // only fields used in card list
    params.set('fields[0]', 'title');
    params.set('fields[1]', 'slug');
    params.set('fields[2]', 'type');
    params.set('fields[3]', 'isNew');
    params.set('populate[images][fields][0]', 'url');
    params.set('populate[category][fields][0]', 'title');
    // ✅ Category filter
    if (categorySlug) {
        // change "category" → "categories" if your relation is many-to-many
        params.set('filters[category][slug][$eq]', categorySlug);
    }
    // ✅ Search
    if (searchTerm) {
        // ✅ Category filter
        if (categorySlug) {
            // change "category" → "categories" if your relation is many-to-many
            params.set('filters[category][slug][$eq]', categorySlug);
        }
        params.set('filters[$or][0][title][$containsi]', searchTerm);
        params.set('filters[$or][1][type][$containsi]', searchTerm);
        params.set('filters[$or][2][slug][$containsi]', searchTerm);
    }

    const productsUrl = `${baseUrl}?${params.toString()}`;

    const categoriesUrl = getCategoriesQuery();

    const [categoriesResponse, productsResponse, reviewsResponse] = await Promise.all([
        axios.get<CategoriesResponseType>(categoriesUrl),
        axios.get<ProductsType>(productsUrl),
        axios.get<ReviewsResponseType>(getCustomerReviewsQuery()),
    ]);

    // Safely extract category title from Strapi v4 response
    const catData = (categoriesResponse.data)?.data?.find((c) => c.attributes.slug === categorySlug);
    const catAttrs = catData?.attributes;
    const categoryTitle: string | null = catAttrs?.title || null;

    return {
        props: {
            categories: categoriesResponse.data,
            category: categoriesResponse.data?.data?.find((c) => c.attributes.slug === categorySlug),
            products: productsResponse.data,
            reviews: reviewsResponse.data,
            searchTerm,
            categorySlug,
            categoryTitle,
        },
    };
};
