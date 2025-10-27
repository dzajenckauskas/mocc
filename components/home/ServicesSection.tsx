import { ServicesResponseType } from '@/app/services/ServiceType';
import { ArrowForward } from '@mui/icons-material';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Link from 'next/link';
import { getColors } from '../layout/colors';
import ServiceCard from '../services/ServiceCard';

type Props = {
    title?: string;
    color?: string;
    services: ServicesResponseType;
}

const ServicesSection = ({ services, color }: Props) => {
    const colors = getColors()
    const renderServices = services?.data?.slice(0, 6).map((service) =>
        <ServiceCard service={service} key={service.id} />
    )
    return (
        <>
            <Stack sx={{
                backgroundColor: colors.softGrey, mx: 'auto',
                width: '100%', position: 'relative', zIndex: 99,
                pt: 5
            }}>
                <Stack sx={{ maxWidth: '1200px', mx: 'auto' }}>
                    <Stack id={'ortopedijos-paslaugos'} sx={{
                        scrollMarginTop: '160px',
                        maxWidth: '1200px', mx: 'auto',
                        px: { lg: 4, md: 4, sm: 3, xs: 3 },
                    }} pb={10} alignItems={'center'} >
                        <Typography variant='h1' color={color ?? '#1E6EA1'} pb={5} pt={2}>
                            {'ORTOPEDIJOS PASLAUGOS'}
                        </Typography>
                        <Grid container spacing={2}>
                            {renderServices}
                        </Grid>
                        {/* <Stack direction={'row'} sx={{ width: '100%', justifyContent: 'flex-end' }} pt={4}>
                            <Link href={'/paslaugu-kainorastis'} >
                                <Button size="small" disableRipple sx={{
                                    display: 'flex', flexDirection: 'row', alignContent: 'center',
                                    ':hover': { backgroundColor: 'transparent', textDecoration: 'underline' }
                                }}>
                                    {"PASLAUGŲ KAINORAŠTIS"}
                                    <ArrowForward sx={{ height: '14px', color: colors.primary }} />
                                </Button>
                            </Link>
                        </Stack> */}
                    </Stack>
                </Stack>
            </Stack>
        </>
    )
}

export default ServicesSection