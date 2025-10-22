import EsProjectsPage from '@/components/pages/EsProjectsPage'
import SeoMeta from '@/components/seo/SeoMeta'

const EsProjects = () => {
  const baseUrl = `${process.env.NEXT_PUBLIC_URL}/es-projektai`
  const title = 'ES projektai | Ortopedijos paslaugų klinika'
  const description =
    'Inovatyvaus šlaunies protezo priėmėjo ir funkcinės kosmetikos prototipo vystymą finansuoja Europos Sąjungos fondai. Sužinokite daugiau apie projekto tikslus ir rezultatus.'

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
          siteName: 'Ortopedijos paslaugų klinika',
          locale: 'lt_LT',
        }}
        twitter={{
          title,
          description,
        }}
        author={'Ortopedijos paslaugų klinika'}
      >
        <link rel="icon" href="/favicon.ico" />
      </SeoMeta>
      <EsProjectsPage />
    </>
  )
}

export default EsProjects
