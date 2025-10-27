import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import Image from 'next/image'
import Link from 'next/link'
import Layout from '../Layout'
import { getColors } from '../layout/colors'
import Logo from '../Logo'
import { theme } from '../theme'
import Breadcrumbs, { Crumb } from '../shared/Breadcrumbs'

const EsProjectsPage = () => {
    const colors = getColors()
    const crumbs: Crumb[] = [
        ...([{ label: "ES projektai" }]),
    ]
    return (
        <Layout color={colors.primary}>
            <Stack
                color={'primary.main'}
                direction={'column'}
                sx={{
                    maxWidth: '1200px', mx: 'auto',
                    px: { lg: 4, md: 4, sm: 3, xs: 3 },
                    pb: 10,
                    width: '100%',
                }}
            >
                <Breadcrumbs items={crumbs} />
                <Stack
                    spacing={3}
                    sx={{
                        backgroundColor: '#fff',
                        // borderRadius: 3,
                        mt: 2.5,
                        boxShadow: '0 24px 60px rgba(4,42,73,0.1)',
                        px: { lg: 8, md: 6, sm: 5, xs: 4 },
                        pt: 4,
                        pb: { lg: 7, md: 6, sm: 5, xs: 4 },
                    }}
                >
                    <Image
                        src={'/media/es-projektai/es-logo.jpeg'}
                        alt={'Europos Sąjungos vėliava'}
                        width={320}
                        height={150}
                        style={{ height: 'auto', width: 'auto' }}
                    />
                    <Typography
                        variant='h2'
                        color={colors.primary}
                        fontWeight={900}
                        fontSize={{ lg: 36, md: 32, sm: 28, xs: 26 }}
                        lineHeight={1.25}
                        sx={{ textTransform: 'uppercase', letterSpacing: 0.5 }}
                    >
                        Inovatyvaus šlaunies protezo priėmėjo su funkcine kosmetika prototipo vystymas
                    </Typography>
                    <Typography fontSize={18} fontWeight={400} color={colors.dark} lineHeight={1.6}>
                        Projekto tikslas – sukurti inovatyvų šlaunies protezo priėmėjo su funkcine kosmetika prototipą, kuris būtų
                        naujas pasaulio mastu.
                    </Typography>
                    <Typography fontSize={18} fontWeight={400} color={colors.dark} lineHeight={1.6}>
                        Sukurtas inovatyvus prototipas pasižymės vartotojui svarbiais parametrais: tinkamu dizainu, atitiks žmogaus
                        biomechaninius stovėjimo ir ėjimo parametrus, bus individualizuotas – parinktas individualaus bei masinio
                        skanavimo būdu, bus greitai pagaminamas naudojant naujausias gamybos technologijas ir parenkant tinkamas
                        biologiškai suderinamas medžiagas 3D spausdinimo būdu.
                    </Typography>
                    <Stack
                        spacing={4}
                        direction={{ lg: 'row', md: 'row', sm: 'column', xs: 'column' }}
                        alignItems={{ lg: 'center', md: 'center', sm: 'flex-start', xs: 'flex-start' }}
                        justifyContent={'space-between'}
                    >
                        <Stack spacing={2} pt={4}>
                            <Typography fontSize={16} fontWeight={500} color={colors.primary} letterSpacing={0.5}>
                                Finansuojama iš Europos regioninės plėtros fondo bei kaip ES atsako į COVID-19 pandemiją priemonės
                            </Typography>
                            <Typography pt={4} fontSize={16} fontWeight={400} color={colors.dark}>
                                Projekto vykdytojas:
                            </Typography>
                            <Stack width='200px'>

                                <Logo />
                            </Stack>
                            {/* <Typography fontSize={18} fontWeight={700} color={colors.dark} letterSpacing={0.8}>
                                MEDICINOS CENTRAS
                            </Typography> */}
                        </Stack>


                    </Stack>
                    <Stack
                        spacing={2}
                        pt={4}
                        alignItems={{ lg: 'flex-end', md: 'flex-end', sm: 'flex-start', xs: 'flex-start' }}
                        textAlign={{ lg: 'right', md: 'right', sm: 'left', xs: 'left' }}
                    >
                        <Image
                            src={'/media/es-projektai/es-flag.png'}
                            alt={'Europos Sąjungos vėliava'}
                            width={160}
                            height={90}
                        // style={{ height: 'auto', width: 'auto' }}
                        />
                        <Typography fontSize={16} fontWeight={600} color={colors.dark}>
                            Kuriame Lietuvos ateitį
                        </Typography>
                        <Typography fontSize={15} fontWeight={400} color={colors.dark} lineHeight={1.4}>
                            2014–2020 metų Europos Sąjungos fondų investicijų veiksmų programa
                        </Typography>
                        <Link href={'https://www.esinvesticijos.lt'} target='_blank' rel='noopener noreferrer'>
                            <Typography
                                fontSize={14}
                                fontWeight={500}
                                color={colors.primary}
                                sx={{ textDecoration: 'underline' }}
                            >
                                www.esinvesticijos.lt
                            </Typography>
                        </Link>
                    </Stack>
                </Stack>


            </Stack>
        </Layout>
    )
}

export default EsProjectsPage
