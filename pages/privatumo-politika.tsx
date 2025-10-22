import { getCustomerReviewsQuery } from '@/app/reviews/getCustomerReviewsQuery';
import { ReviewsResponseType } from '@/app/services/ReviewTypes';
import PrivacyPolicyPagePage from '@/components/pages/PrivacyPolicyPagePage';
import SeoMeta from '@/components/seo/SeoMeta';
import axios from 'axios';
import { GetStaticProps } from 'next';

type Props = {
    reviews: ReviewsResponseType;
}
export default function PrivacyPolicyPage({ reviews }: Props) {
    const baseUrl = `${process.env.NEXT_PUBLIC_URL}/privatumo-politika`
    const title = 'Privatumo politika - Medicinos ir ortopedijos centras'
    const description = 'Sužinokite, kaip Medicinos ir ortopedijos centras renka, naudoja ir saugo jūsų asmens duomenis laikantis galiojančių teisės aktų.'

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
                }}
                twitter={{
                    title,
                    description,
                }}
                author={'Medicinos ir ortopedijos centras'}
            >
                <link rel="icon" href="/favicon.ico" />
            </SeoMeta>
            <PrivacyPolicyPagePage reviews={reviews} />
        </>
    )
}


export const getStaticProps: GetStaticProps = async () => {
    const reviews = await axios.get(getCustomerReviewsQuery())
    return {
        props: {
            reviews: reviews.data
        }
    }
}
