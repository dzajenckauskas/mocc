import { servicesData } from '@/api/services'
import { getCategoriesQuery } from '@/app/categories/getCategoriesQuery'
import { CategoriesResponseType } from '@/app/categories/ServiceType'
import { ProductsType } from '@/app/products/productTypes'
import { getCustomerReviewsQuery } from '@/app/reviews/getCustomerReviewsQuery'
import { getServicesQuery } from '@/app/services/getServicesQuery'
import { ReviewsResponseType } from '@/app/services/ReviewTypes'
import { ServicesResponseType } from '@/app/services/ServiceType'
import HomePage from '@/components/pages/HomePage'
import SeoMeta from '@/components/seo/SeoMeta'
import Stack from '@mui/material/Stack'
import axios from 'axios'
import { GetStaticProps } from 'next'

type Props = {
  services: ServicesResponseType;
  categories: CategoriesResponseType;
  newProducts: ProductsType;
  individualProducts: ProductsType;
  reviews: ReviewsResponseType;
}

export default function Home({ newProducts, individualProducts, services, reviews, categories }: Props) {
  const baseUrl = process.env.NEXT_PUBLIC_URL ?? ''
  const title = 'Ortopedijos paslaugų klinika | Kokybiškos Ortopedijos Paslaugos Vilniuje'
  const description = 'Ortopedijos paslaugų klinika Vilniuje teikia profesionalias ortopedijos paslaugas: konsultacijos, diagnostika, reabilitacija ir individualių ortopedinių priemonių gamyba. Rūpinamės jūsų sveikata ir judėjimo komfortu.'
  const keywords = [
    'ortopedijos klinika Vilniuje',
    'ortopedijos paslaugos',
    'reabilitacija Vilnius',
    'ortopediniai įtvarai',
    'ortopedinės priemonės',
    'ortopedijos specialistai',
    'protezai',
    'ortopedinės konsultacijos',
  ].join(', ')

  return (
    <>
      <SeoMeta
        title={title}
        description={description}
        canonical={baseUrl}
        openGraph={{
          title,
          description: 'Apsilankykite Ortopedijos paslaugų klinikoje Vilniuje! Teikiame profesionalias konsultacijas, ortopedinių priemonių gamybą, reabilitacijos paslaugas. Mūsų prioritetas – jūsų sveikata!',
          url: baseUrl,
          type: 'website',
          siteName: 'Ortopedijos paslaugų klinika',
        }}
        twitter={{
          title,
          description: 'Profesionali ortopedijos klinika Vilniuje – individualios ortopedinės priemonės, konsultacijos ir reabilitacija. Kreipkitės į mūsų specialistus šiandien!',
        }}
        keywords={keywords}
        author={'Ortopedijos paslaugų klinika'}
      >
        <link rel="icon" href="/favicon.ico" />
      </SeoMeta>



      <Stack sx={{ minHeight: '100vh', backgroundColor: '#fff' }}>
        <HomePage services={services}
          reviews={reviews}
          individualProducts={individualProducts}
          newProducts={newProducts}
          categories={categories}
        />

      </Stack>
    </>
  )
}
export const getStaticProps: GetStaticProps = async () => {
  const [
    // services, 
    categories, reviews, newProducts, individualProducts] = await Promise.all([
      // axios.get(getServicesQuery()),
      axios.get(getCategoriesQuery()),
      axios.get(getCustomerReviewsQuery()),
      axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/products?filters[isNew][$eq]=true&pagination[pageSize]=12&fields[0]=title&fields[1]=slug&fields[2]=type&populate[images][fields][0]=url&populate[category][fields][0]=title`),
      axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/products?filters[individualyMade][$eq]=true&pagination[pageSize]=12&fields[0]=title&fields[1]=slug&fields[2]=type&populate[images][fields][0]=url&populate[category][fields][0]=title`),
    ])

  return {
    props: {
      newProducts: newProducts.data,
      individualProducts: individualProducts.data,
      // services: services.data,
      services: servicesData,
      categories: categories.data,
      reviews: reviews.data,
    },
    revalidate: 86400,
  }
}
