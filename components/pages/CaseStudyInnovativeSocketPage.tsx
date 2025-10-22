import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Layout from '../Layout'
import { getColors } from '../layout/colors'

const CaseStudyInnovativeSocketPage = () => {
  const colors = getColors()
  const bullet = (text: string) => (
    <Stack direction="row" spacing={2} alignItems="flex-start" key={text}>
      <Box
        component="span"
        sx={{
          width: 10,
          height: 10,
          borderRadius: '50%',
          backgroundColor: colors.primary,
          position: 'relative',
          top: 8,
          flexShrink: 0,
        }}
      />
      <Typography fontSize={17} color={colors.dark} lineHeight={1.6}>
        {text}
      </Typography>
    </Stack>
  )

  return (
    <Layout color={colors.primary}>
      <Stack
        spacing={6}
        sx={{
          width: '100%',
          maxWidth: '1200px',
          mx: 'auto',
          px: { lg: 4, md: 4, sm: 3, xs: 3 },
          py: { lg: 10, md: 8, sm: 6, xs: 5 },
        }}
      >
        <Stack
          spacing={3}
          sx={{
            backgroundColor: '#fff',
            borderRadius: 3,
            boxShadow: '0 24px 60px rgba(4,42,73,0.08)',
            px: { lg: 7, md: 6, sm: 5, xs: 4 },
            py: { lg: 7, md: 6, sm: 5, xs: 5 },
          }}
        >
          <Typography
            variant="h1"
            color={colors.primary}
            fontWeight={800}
            sx={{
              fontSize: { lg: 40, md: 36, sm: 32, xs: 28 },
              lineHeight: { lg: '48px', md: '44px', sm: '38px', xs: '36px' },
              textTransform: 'uppercase',
              letterSpacing: 0.4,
            }}
          >
            Inovatyvus šlaunies protezo priėmėjas su funkcine kosmetika
          </Typography>

          <Typography
            fontSize={18}
            fontWeight={400}
            color={colors.dark}
            lineHeight={1.65}
            sx={{ opacity: 0.9 }}
          >
            3D projektavimas, SLS/FDM gamyba, sensorių integracija ir realių duomenų analizė pacientų patogumui bei
            saugumui.
          </Typography>

          <Stack direction={{ lg: 'row', md: 'row', sm: 'column', xs: 'column' }} spacing={2} pt={1}>
            <Button
              size="large"
              variant="contained"
              color="primary"
              href="/media/projektai/inovatyvus-slaunies-protezo-priemejas-santrauka.pdf"
              sx={{ px: 3, py: 1.2 }}
            >
              Atsisiųsti santrauką
            </Button>
            <Button
              size="large"
              variant="outlined"
              color="primary"
              href="/kontaktai"
              sx={{ px: 3, py: 1.2 }}
            >
              Susisiekti dėl konsultacijos
            </Button>
          </Stack>
        </Stack>

        <Stack spacing={4}>
          <Stack spacing={2}>
            <Typography
              variant="h2"
              color={colors.primary}
              fontWeight={800}
              sx={{
                fontSize: { lg: 26, md: 24, sm: 22, xs: 20 },
                textTransform: 'uppercase',
                letterSpacing: 0.3,
              }}
            >
              Trumpai apie projektą
            </Typography>
            <Typography fontSize={17} color={colors.dark} lineHeight={1.7}>
              Sukūrėme prototipą, kuris sujungia individualizuotą 3D projektavimą, 3D spausdinimą (įskaitant funkcinę
              protezų kosmetiką) ir į priėmėją integruotus jutiklius duomenų rinkimui bei analizei. Tikslas — pasauliniu
              mastu naujas sprendimas, gerinantis komfortą, pusiausvyrą ir eiseną.
            </Typography>
          </Stack>

          <Stack spacing={2}>
            <Typography
              variant="h2"
              color={colors.primary}
              fontWeight={800}
              sx={{
                fontSize: { lg: 26, md: 24, sm: 22, xs: 20 },
                textTransform: 'uppercase',
                letterSpacing: 0.3,
              }}
            >
              Pagrindiniai darbai
            </Typography>
            <Stack spacing={1.5}>
              {[
                '3D projektavimo ir gamybos metodologija + kokybės vertinimo metodika priėmėjams.',
                'Individualizuota ir automatizuota gamybos technologija, adaptuota skirtingiems pacientų atvejams.',
                'Funkcinė 3D spausdinta kosmetika ir 3D spausdinti gydomieji įdėklai.',
                'Sensorių ir elektronikos integracija su duomenų vizualizacija ir analize.',
                '3D skenavimas ir eisenos tyrimai (Qualisys sistema, papildoma Rehawalk/Zebris analizė).',
              ].map(bullet)}
            </Stack>
          </Stack>

          <Stack spacing={2}>
            <Typography
              variant="h2"
              color={colors.primary}
              fontWeight={800}
              sx={{
                fontSize: { lg: 26, md: 24, sm: 22, xs: 20 },
                textTransform: 'uppercase',
                letterSpacing: 0.3,
              }}
            >
              Metodika ir įranga (santrauka)
            </Typography>
            <Typography fontSize={17} color={colors.dark} lineHeight={1.7}>
              Naudotos standartizuotos mechaninės bandymų procedūros (tempimo ir lenkimo bandymai pagal ISO 527-1:2019,
              ISO 527-2:2012), skirtingų spausdinimo technologijų (SLS, FDM) palyginimas, padėties spausdinimo kameroje
              įtaka mechaninėms savybėms.
            </Typography>
          </Stack>

          <Stack spacing={2}>
            <Typography
              variant="h2"
              color={colors.primary}
              fontWeight={800}
              sx={{
                fontSize: { lg: 26, md: 24, sm: 22, xs: 20 },
                textTransform: 'uppercase',
                letterSpacing: 0.3,
              }}
            >
              Ką tai duoda pacientui?
            </Typography>
            <Stack spacing={1.5}>
              {[
                'Geresnė pusiausvyra (mažesnis statinės padėties centro išsibarstymas naudojant mikroprocesoriumi valdomus sprendimus).',
                'Komfortas ir ilgaamžiškumas dėl optimizuotų mechaninių savybių ir individualizavimo.',
                'Duomenimis grįsta reabilitacija ir eisenos korekcijos programos.',
              ].map(bullet)}
            </Stack>
          </Stack>

          <Stack spacing={2}>
            <Typography
              variant="h2"
              color={colors.primary}
              fontWeight={800}
              sx={{
                fontSize: { lg: 26, md: 24, sm: 22, xs: 20 },
                textTransform: 'uppercase',
                letterSpacing: 0.3,
              }}
            >
              Rezultatai (highlights)
            </Typography>
            <Stack spacing={1.5}>
              {[
                'Sukurtos 3D projektavimo ir kokybės vertinimo metodikos; išbandytos spausdinimo medžiagos ir padėtys.',
                'Parengtas elektronikos su jutikliais prototipas ir vartotojo sąsaja duomenims atvaizduoti.',
                'Patvirtinta, kad priėmėjo ir gamybos technologijos projektavimą reikia derinti dėl sąnaudų ir savybių balanso.',
              ].map(bullet)}
            </Stack>
          </Stack>
        </Stack>

        <Stack
          spacing={3}
          sx={{
            backgroundColor: '#fff',
            borderRadius: 3,
            boxShadow: '0 16px 40px rgba(4,42,73,0.08)',
            px: { lg: 7, md: 6, sm: 5, xs: 4 },
            py: { lg: 6, md: 5, sm: 5, xs: 5 },
          }}
        >
          <Typography
            variant="h2"
            color={colors.primary}
            fontWeight={800}
            sx={{
              fontSize: { lg: 26, md: 24, sm: 22, xs: 20 },
              textTransform: 'uppercase',
              letterSpacing: 0.3,
            }}
          >
            Ar pasiruošę kitam žingsniui?
          </Typography>

          <Stack
            direction={{ lg: 'row', md: 'row', sm: 'column', xs: 'column' }}
            spacing={3}
            justifyContent="space-between"
          >
            <Stack spacing={1.5} flex={1}>
              <Typography fontSize={18} fontWeight={600} color={colors.dark} lineHeight={1.5}>
                Nori išbandyti sprendimą klinikinėje praktikoje?
              </Typography>
              <Typography fontSize={16} color={colors.dark} lineHeight={1.6}>
                Susitarkime dėl piloto, kad galėtume įvertinti realius duomenis, pritaikyti priėmėją ir pasiruošti
                platesniam diegimui.
              </Typography>
              <Button variant="contained" color="primary" href="/kontaktai" sx={{ alignSelf: 'flex-start', px: 3 }}>
                Susitarkime dėl piloto
              </Button>
            </Stack>
            <Stack spacing={1.5} flex={1}>
              <Typography fontSize={18} fontWeight={600} color={colors.dark} lineHeight={1.5}>
                Reikia techninės specifikacijos?
              </Typography>
              <Typography fontSize={16} color={colors.dark} lineHeight={1.6}>
                Atsiųsime PDF santrauką su matmenimis, integruotų jutiklių sąrašu, duomenų valdymo sprendimais ir
                rekomendacijomis klinikai.
              </Typography>
              <Button
                variant="outlined"
                color="primary"
                href="/media/projektai/inovatyvus-slaunies-protezo-priemejas-santrauka.pdf"
                sx={{ alignSelf: 'flex-start', px: 3 }}
              >
                Gauti PDF santrauką
              </Button>
            </Stack>
          </Stack>
        </Stack>
      </Stack>
    </Layout>
  )
}

export default CaseStudyInnovativeSocketPage
