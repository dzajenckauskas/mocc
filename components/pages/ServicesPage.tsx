import { ReviewsResponseType } from '@/app/services/ReviewTypes'
import { ServicesResponseType } from '@/app/services/ServiceType'
import Layout from '../Layout'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'
import Link from 'next/link'
import Button from '@mui/material/Button'
import { ArrowForward } from '@mui/icons-material'
import Breadcrumbs, { Crumb } from '../shared/Breadcrumbs'
import { getColors } from '../layout/colors'
import ServiceCard from '../services/ServiceCard'

type Props = {
    services: ServicesResponseType
    reviews: ReviewsResponseType
}

const ServicesPage = ({ services, reviews }: Props) => {
    const colors = getColors()

    const crumbs: Crumb[] = [
        { label: 'Ortopedijos paslaugos', href: '/ortopedijos-paslaugos' },
    ]

    return (
        <Layout color={'#1E6EA1'} reviews={reviews}>
            <Stack
                sx={{
                    maxWidth: '1200px',
                    mx: 'auto',
                    px: { lg: 4, md: 4, sm: 3, xs: 3 },
                    pb: 2,
                    width: '100%',
                }}
                spacing={3}
            >
                <Breadcrumbs items={crumbs} />
            </Stack>
            <Stack
                sx={{
                    maxWidth: '1200px',
                    mx: 'auto',
                    px: { lg: 4, md: 4, sm: 3, xs: 3 },
                    pb: 10,
                    width: '100%',
                }}
            // spacing={}
            >
                <Typography
                    variant="h1"
                    fontSize={25}
                    fontWeight={900}
                    lineHeight={'28px'}
                    color={'#1E6EA1'}
                    sx={{ textAlign: 'left', textTransform: 'uppercase', pt: 0 }}
                >
                    ORTOPEDIJOS PASLAUGOS
                </Typography>

                {/* Grid of services */}
                <Grid container spacing={4} sx={{ position: 'relative', pt: 4 }}>
                    {services.data.map((service) => (
                        <ServiceCard service={service} key={service.id} />
                    ))}
                </Grid>

                {/* CTA (right aligned) */}
                <Stack direction="row" sx={{ width: '100%', justifyContent: 'flex-end' }} pt={2}>
                    <Link href="/paslaugu-kainorastis">
                        <Button
                            size="small"
                            disableRipple
                            sx={{
                                display: 'flex',
                                flexDirection: 'row',
                                alignContent: 'center',
                                ':hover': { backgroundColor: 'transparent', textDecoration: 'underline' },
                            }}
                        >
                            PASLAUGŲ KAINORAŠTIS
                            <ArrowForward sx={{ height: 14, color: colors.primary }} />
                        </Button>
                    </Link>
                </Stack>
            </Stack>
        </Layout>
    )
}

export default ServicesPage