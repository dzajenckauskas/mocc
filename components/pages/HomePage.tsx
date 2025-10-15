import { CategoriesResponseType } from '@/app/categories/ServiceType';
import { ProductsType } from '@/app/products/productTypes';
import { ReviewsResponseType } from '@/app/services/ReviewTypes';
import { ServicesResponseType } from '@/app/services/ServiceType';
import { ArrowForward } from '@mui/icons-material';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Image from 'next/image';
import HeroBanner from '../banner/HeroBanner';
import CategoriesSection from '../home/CategoriesSection';
import ProductsSection from '../home/ProductsSection';
import ServicesSection from '../home/ServicesSection';
import Layout from '../Layout';
import { getColors } from '../layout/colors';
import AboutFAQSection from './AboutSection';

type Props = {
    title?: string;
    services: ServicesResponseType;
    reviews?: ReviewsResponseType;
    newProducts: ProductsType;
    individualProducts: ProductsType;
    categories: CategoriesResponseType;
}

const HomePage = ({ services, reviews, newProducts, individualProducts, categories }: Props) => {
    const colors = getColors()
    return (
        <Layout color={colors.primary} reviews={reviews}>
            <HeroBanner />
            <CategoriesSection categories={categories} />
            <ServicesSection services={services} />

            <Stack sx={{
                backgroundColor: colors.primary,
                width: '100%', position: 'relative', zIndex: 99,
            }}>
                <Stack direction={'row'} justifyContent={'center'} py={8} sx={{
                    maxWidth: '1200px', mx: 'auto', width: '100%',
                    px: { lg: 4, md: 4, sm: 3, xs: 3 }
                }}>
                    <Stack width={'100%'}>
                        <Typography pb={2} fontSize={18} color={colors.white} fontWeight={900} lineHeight={'18px'}>
                            Patyrę ir atsakingi ortopedai-protezuotojai bei ortopedai-technikai užsako, pagamina ir
                            individualiai pritaiko ortopedijos technines priemones:
                        </Typography>
                        <Stack spacing={1}>
                            <Typography fontSize={16} color={colors.white} fontWeight={300} pl={1} lineHeight={'20px'}>
                                <ArrowForward sx={{ height: '16px', position: 'relative', top: '3px', color: colors.white }} />
                                po galūnių amputacijų – rankų ir kojų protezus;
                            </Typography>
                            <Typography fontSize={16} color={colors.white} fontWeight={300} pl={1} lineHeight={'20px'}>
                                <ArrowForward sx={{ height: '16px', position: 'relative', top: '3px', color: colors.white }} />
                                po traumų ir kitų susirgimų – rankų, kojų, stuburo plastikinius ir tekstilinius įtvarus, korsetus;
                            </Typography>
                            <Typography fontSize={16} color={colors.white} fontWeight={300} pl={1} lineHeight={'20px'}>
                                <ArrowForward sx={{ height: '16px', position: 'relative', top: '3px', color: colors.white }} />
                                avalynės įdėklus, skirtus gydymui, reabilitacijai, sportui ir kasdieniniam naudojimui;
                            </Typography>
                            <Typography fontSize={16} color={colors.white} fontWeight={300} pl={1} lineHeight={'20px'}>
                                <ArrowForward sx={{ height: '16px', position: 'relative', top: '3px', color: colors.white }} />
                                kitus ortopedinės paskirties gaminius ir įvairias pagalbines priemones neįgaliems žmonėms.
                            </Typography>
                        </Stack>
                    </Stack>
                </Stack>
                <Stack direction={'row'} height={400} width={'100%'} overflow={'hidden'}
                    position={'absolute'} zIndex={-1}>
                    <Image
                        priority
                        alt={'.attributes.title'}
                        src={'/assets/images/cover.webp'}
                        fill
                        sizes="100vw"
                        style={{ objectFit: 'cover', objectPosition: 'center', opacity: 0.15 }}
                    />
                </Stack>
            </Stack>
            <ProductsSection products={newProducts} title={'NAUJOS PRIEMONĖS'} />
            <AboutFAQSection bg="#ffffff" accent="#1E6EA1" />

        </Layout>
    )
}

export default HomePage
