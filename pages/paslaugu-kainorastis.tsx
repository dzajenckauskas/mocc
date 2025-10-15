import { PricelistsResponseType } from '@/app/pricelists/PricelistTypes'
import { getCustomerReviewsQuery } from '@/app/reviews/getCustomerReviewsQuery'
import { ReviewsResponseType } from '@/app/services/ReviewTypes'
import KainorastisPage from '@/components/pages/KainorastisPage'
import SeoMeta from '@/components/seo/SeoMeta'
import axios from 'axios'
import { GetStaticProps } from 'next'

type Props = {
  reviews: ReviewsResponseType;
  pricelists: PricelistsResponseType;
}

export default function Kainorastis({ reviews, pricelists }: Props) {
  const baseUrl = `${process.env.NEXT_PUBLIC_URL}/paslaugu-kainorastis`
  const title = 'Ortopedijos paslaugų kainoraštis | Profesionalios paslaugos Vilniuje'
  const description = 'Išsami ortopedijos paslaugų kainoraščio informacija: konsultacijos, tyrimai, masažai, kineziterapija, fizioterapija. Sužinokite mūsų kainas ir užsiregistruokite šiandien.'
  const keywords = 'ortopedijos paslaugos Vilniuje, ortopedijos kainos, konsultacijos, kineziterapija, fizioterapija, masažai'

  return (
    <>
      <SeoMeta
        title={title}
        description={description}
        canonical={baseUrl}
        openGraph={{
          title,
          description: 'Atraskite profesionalias ortopedijos paslaugas: konsultacijos, tyrimai, kineziterapija, fizioterapija. Sužinokite kainas ir kreipkitės dabar!',
          url: baseUrl,
          type: 'website',
          siteName: 'Ortopedijos paslaugų klinika',
          locale: 'lt_LT',
        }}
        twitter={{
          title,
          description: 'Atraskite profesionalias ortopedijos paslaugas: konsultacijos, tyrimai, kineziterapija, fizioterapija. Sužinokite kainas ir kreipkitės dabar!',
        }}
        keywords={keywords}
        author={'Ortopedijos paslaugų klinika'}
      >
        <meta name="theme-color" content="#ffffff" />
        <link rel="icon" href="/favicon.ico" />
      </SeoMeta>



      <KainorastisPage reviews={reviews} pricelists={pricelists} />
    </>
  )
}
export const getStaticProps: GetStaticProps = async () => {
  const reviews = await axios.get(getCustomerReviewsQuery())
  const pricelists = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/pricelists?populate=*`)

  return {
    props: {
      pricelists: pricelists.data,
      reviews: reviews.data
    },
    revalidate: 86400
  }
}
