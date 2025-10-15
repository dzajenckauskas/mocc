import { CategoriesResponseType } from '@/app/categories/ServiceType';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import CategoryCard from '../categories/CategoryCard';
import { getColors } from '../layout/colors';

type Props = {
    title?: string;
    color?: string;
    categories: CategoriesResponseType;
}

const CategoriesSection = ({ categories, color }: Props) => {
    const colors = getColors()
    const renderCategories = categories?.data.map((category, idx) => (
        <CategoryCard category={category} key={category.id} />
    ))
    return (
        <>
            <Stack sx={{
                backgroundColor: colors.white, mx: 'auto',
                width: '100%', position: 'relative', zIndex: 99,
                pt: 5
            }}>
                <Stack sx={{ maxWidth: '1200px', mx: 'auto' }}>
                    <Stack id={'services'} sx={{
                        scrollMarginTop: '200px',
                        maxWidth: '1200px', mx: 'auto',
                        px: { lg: 4, md: 4, sm: 3, xs: 3 },
                    }} pb={10} alignItems={'center'} >
                        <Typography variant='h1' color={color ?? '#1E6EA1'} pb={5} pt={2} textAlign={'center'}>
                            {'ORTOPEDIJOS PRIEMONIŲ KATEGORIJOS'}
                        </Typography>
                        <Grid container spacing={2}>
                            {renderCategories}
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

export default CategoriesSection
