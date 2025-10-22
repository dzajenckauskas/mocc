import EsProjectsPage from '@/components/pages/EsProjectsPage'
import SeoMeta from '@/components/seo/SeoMeta'

const EsProjects = () => {
  const baseUrl = `${process.env.NEXT_PUBLIC_URL}/es-projektai`
  const title = 'ES projektai | Medicinos ir ortopedijos centras'
  const description =
    'Inovatyvaus šlaunies protezo priėmėjo ir funkcinės kosmetikos prototipo vystymą finansuoja Europos Sąjungos fondai. Sužinokite daugiau apie Medicinos ir ortopedijos centro projekto tikslus ir rezultatus.'

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
      <EsProjectsPage />
    </>
  )
}

export default EsProjects
