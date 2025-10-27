// import { getServicesQuery } from '@/app/services/getServicesQuery'
import { getServicesQuery } from '@/app/services/getServicesQuery'
import { ReviewsResponseType } from '@/app/services/ReviewTypes'
import { ServicesResponseType } from '@/app/services/ServiceType'
import ServicesPage from '@/components/pages/ServicesPage'
import SeoMeta from '@/components/seo/SeoMeta'
import axios from 'axios'
import { GetStaticProps } from 'next'

type Props = {
  services: ServicesResponseType;
  reviews: ReviewsResponseType;
}

export default function ServicesIndex({ services, reviews }: Props) {
  const baseUrl = `${process.env.NEXT_PUBLIC_URL}/ortopedijos-paslaugos`
  const title = 'Medicinos ir ortopedijos centras | Profesionalios ortopedijos paslaugos Vilniuje'
  const description =
    'Medicinos ir ortopedijos centro ortopedijos paslaugos: konsultacijos, diagnostika, kineziterapija, fizioterapija ir kitos profesionalios paslaugos. Sužinokite daugiau ir registruokitės.'

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
          type: 'website',
          siteName: 'Medicinos ir ortopedijos centras',
          locale: 'lt_LT',
        }}
        twitter={{
          title,
          description,
        }}
        author={'Medicinos ir ortopedijos centras'}
      >
        <link rel="icon" href="/favicon.ico" />
      </SeoMeta>
      <ServicesPage services={services} reviews={reviews} />
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const [
    services,
    reviews] = await Promise.all([
      axios.get(getServicesQuery()),
      axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/reviews`),
    ])

  return {
    props: {
      // services: servicesData,
      services: services.data,
      reviews: reviews.data,
    },
    revalidate: 86400,
  }
}
