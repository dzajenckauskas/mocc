import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import Layout from '../Layout';

type Props = {
    title?: string;
    color?: string;
}

const KontaktaiPage = ({ title, color }: Props) => {
    const primaryColor = '#1E6EA1'

    return (
        <Layout title={'Kontaktai'} color={primaryColor}>
            <Stack spacing={2} textAlign={'left'} sx={{ width: '100%', maxWidth: '1200px', mx: 'auto', px: { lg: 4, md: 4, sm: 3, xs: 3 }, }}>
                <Stack sx={{}}>
                    <Typography fontWeight={900} color={'primary.main'}>
                        ADRESAS
                    </Typography>
                    <Typography variant='body1' color={'secondary.main'}>
                        Laisvės pr.77, Vilnius
                    </Typography>
                </Stack>
                <Stack>
                    <Typography fontWeight={900} color={'primary.main'}>
                        TELEFONAS
                    </Typography>
                    <Typography variant='body1' color={'secondary.main'}>
                        +370 607 921 11
                    </Typography>
                </Stack>
                <Stack>
                    <Typography fontWeight={900} color={'primary.main'}>
                        EL. PAŠTAS
                    </Typography>
                    <Typography variant='body1' color={'secondary.main'}>
                        info@opklinika.lt
                    </Typography>
                </Stack>
                <Stack>
                    <Typography fontWeight={900} color={'primary.main'}>
                        DARBO LAIKAS
                    </Typography>
                    <Stack direction={'row'}>
                        <Stack>
                            <Typography variant='body1' color={'secondary.main'}>
                                I - V:
                            </Typography>
                        </Stack>
                        <Stack>
                            <Typography variant='body1' color={'secondary.main'}>
                                09:00 - 17:00
                            </Typography>
                        </Stack>
                    </Stack>
                </Stack>
            </Stack>
        </Layout>
    )
}

export default KontaktaiPage