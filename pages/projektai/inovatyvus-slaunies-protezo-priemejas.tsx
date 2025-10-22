import CaseStudyInnovativeSocketPage from '@/components/pages/CaseStudyInnovativeSocketPage'
import SeoMeta from '@/components/seo/SeoMeta'

const CaseStudyInnovativeSocket = () => {
  const baseUrl = `${process.env.NEXT_PUBLIC_URL}/projektai/inovatyvus-slaunies-protezo-priemejas`
  const title = 'Inovatyvus šlaunies protezo priėmėjas su funkcine kosmetika – Mocc'
  const description =
    'Kaip sukūrėme šlaunies protezo priėmėjo prototipą su sensoriais, 3D spausdinimu ir funkcine kosmetika. Tyrimai, metodika, rezultatai ir naudos pacientui.'

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
          type: 'article',
          siteName: 'Mocc',
          locale: 'lt_LT',
        }}
        twitter={{
          title,
          description,
        }}
        author="Mocc"
      >
        <link rel="icon" href="/favicon.ico" />
      </SeoMeta>
      <CaseStudyInnovativeSocketPage />
    </>
  )
}

export default CaseStudyInnovativeSocket
