import axios from 'axios'
import { GetStaticProps } from 'next'
import { ReviewsResponseType } from '@/app/services/ReviewTypes'
import { ServiceType } from '@/app/services/ServiceType'
import ServicePage from '@/components/pages/ServicePage'

type Props = {
  service: ServiceType
  reviews: ReviewsResponseType
}

export default function ServiceView(props: Props) {
  return <ServicePage {...props} />
}

export async function getStaticPaths() {
  const res = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/api/services?pagination[pageSize]=100&populate=*&filters[mocc][$eq]=true`,
  )
  const paths = (res.data?.data ?? [])
    .map((item: any) => item?.attributes?.slug)
    .filter((slug: any) => typeof slug === 'string' && slug.length > 0)
    .map((slug: string) => ({ params: { slug } }))

  return { paths, fallback: 'blocking' }
}

export const getStaticProps: GetStaticProps<Props> = async (context) => {
  const slugParam = context.params?.slug
  if (!slugParam || Array.isArray(slugParam)) return { notFound: true }

  const [serviceRes, reviewsRes] = await Promise.all([
    axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/api/services?filters[slug][$eq]=${encodeURIComponent(
        slugParam,
      )}&populate=*&filters[mocc][$eq]=true`,
    ),
    axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/reviews`),
  ])

  const service = serviceRes?.data?.data?.[0]
  if (!service) return { notFound: true, revalidate: 60 }

  return {
    props: { service, reviews: reviewsRes.data },
    revalidate: 86400,
  }
}
