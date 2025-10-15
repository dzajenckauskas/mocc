import { getProductsQuery } from "@/app/products/getProductsQuery";
import { ProductsType } from "@/app/products/productTypes";
import { toSlug } from "@/utils/slugify";
import axios from "axios";
import { GetServerSideProps } from "next";

type Props = {
    products: ProductsType;
    services: {
        data: Array<{
            id: number;
            attributes: {
                slug?: string | null;
                updatedAt?: string | null;
                title?: string | null;
            };
        }>;
        meta?: { pagination?: { pageCount?: number } };
    };
};

const getServicesQuery = () =>
    `${process.env.NEXT_PUBLIC_API_URL}/api/services?pagination[pageSize]=100&fields[0]=slug&fields[1]=updatedAt&fields[2]=title`;

function generateSiteMap({ products, services }: Props) {
    const now = new Date().toISOString();

    const baseUrl = process.env.NEXT_PUBLIC_URL;
    const baseCatalogUrl = `${baseUrl}/ortopedijos-technikos-katalogas`;
    const baseServicesUrl = `${baseUrl}/ortopedijos-paslaugos`;

    // Catalog pagination entries
    const catalogPages = products.meta?.pagination?.pageCount ?? 1;
    const catalogEntries = Array.from({ length: catalogPages }, (_v, i) => {
        const page = i + 1;
        const suffix = page > 1 ? `?page=${page}` : "";
        return `
  <url>
    <loc>${`${baseCatalogUrl}${suffix}`}</loc>
    <lastmod>${now}</lastmod>
  </url>`;
    }).join("");

    // Product entries
    const productEntries = (products.data ?? [])
        .map((eo) => {
            const categoryTitle = eo.attributes?.category?.data?.attributes?.title;
            const categorySlug = toSlug(categoryTitle);
            const productSlug = eo.attributes?.slug;
            if (!categorySlug || !productSlug) return "";
            return `
  <url>
    <loc>${`${baseUrl}/ortopedijos-technika/${categorySlug}/${productSlug}`}</loc>
    <lastmod>${eo?.attributes?.updatedAt?.toString() || now}</lastmod>
  </url>`;
        })
        .join("");

    // Services index + service pages
    const servicesIndex = `
  <url>
    <loc>${baseServicesUrl}</loc>
    <lastmod>${now}</lastmod>
  </url>`;

    const serviceEntries = (services.data ?? [])
        .map((s) => {
            const slug = s.attributes?.slug;
            if (!slug) return "";
            return `
  <url>
    <loc>${`${baseServicesUrl}/${slug}`}</loc>
    <lastmod>${s.attributes?.updatedAt || now}</lastmod>
  </url>`;
        })
        .join("");

    return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">

  <url>
    <loc>${baseUrl}</loc>
    <lastmod>${now}</lastmod>
  </url>

  <url>
    <loc>${`${baseUrl}/paslaugu-kainorastis`}</loc>
    <lastmod>${now}</lastmod>
  </url>

  ${catalogEntries}
  ${productEntries}
  ${servicesIndex}
  ${serviceEntries}

</urlset>`;
}

function SiteMap() {
    // getServerSideProps writes the XML
    return null;
}

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
    const [productsResponse, servicesResponse] = await Promise.all([
        axios.get(getProductsQuery()),
        axios.get(getServicesQuery()),
    ]);

    const products = productsResponse.data as ProductsType;
    const services = servicesResponse.data as Props["services"];

    const sitemap = generateSiteMap({ products, services });

    res.setHeader("Content-Type", "text/xml");
    res.write(sitemap);
    res.end();

    return { props: {} };
};

export default SiteMap;