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
                <Stack
                    direction={'row'}
                    justifyContent={'center'}
                    py={8}
                    sx={{ maxWidth: '1200px', mx: 'auto', width: '100%', px: { lg: 4, md: 4, sm: 3, xs: 3 } }}
                >
                    <Stack
                        width={'100%'}
                        spacing={2}
                        sx={{
                            p: { xs: 2, sm: 3 },
                            borderRadius: 2,
                            backdropFilter: 'blur(8px)',
                            backgroundColor: 'rgba(255,255,255,0.06)',
                            boxShadow: '0 16px 40px rgba(0,0,0,0.25)',
                            border: '1px solid rgba(255,255,255,0.12)',
                        }}
                    >
                        <Typography
                            pb={1}
                            fontSize={18}
                            color={colors.white}
                            fontWeight={900}
                            lineHeight={'22px'}
                            sx={{ borderLeft: '3px solid #1E6EA1', pl: 2, textTransform: 'uppercase', letterSpacing: 0.3 }}
                        >
                            Medicinos centras — individualūs ortopedijos sprendimai
                        </Typography>

                        <Typography fontSize={16} color={colors.white} fontWeight={300} lineHeight={'22px'} sx={{ opacity: 0.9 }}>
                            3D skenavimas, CAD/CAM projektavimas ir 3D spausdinimas (SLS/FDM) — tikslumui, lengvumui ir patogumui kasdien.
                        </Typography>

                        <Stack spacing={1.2} pt={0.5}>
                            <Typography fontSize={16} color={colors.white} fontWeight={400} pl={1} lineHeight={'22px'}>
                                <ArrowForward sx={{ height: 16, position: 'relative', top: '3px', color: colors.white }} />
                                <b>Šlaunies protezų priėmėjai ir komponentai</b> — nuo 3D skenavimo iki pritaikymo.
                            </Typography>

                            <Typography fontSize={16} color={colors.white} fontWeight={400} pl={1} lineHeight={'22px'}>
                                <ArrowForward sx={{ height: 16, position: 'relative', top: '3px', color: colors.white }} />
                                <b>Funkcinė protezų kosmetika</b> — lengvos, patvarios ir individualiai pritaikytos apdailos.
                            </Typography>

                            <Typography fontSize={16} color={colors.white} fontWeight={400} pl={1} lineHeight={'22px'}>
                                <ArrowForward sx={{ height: 16, position: 'relative', top: '3px', color: colors.white }} />
                                <b>Individualūs įtvarai</b> — riešo, alkūnės, piršto, KPK, krūtinės–juosmens ir kt.
                            </Typography>

                            <Typography fontSize={16} color={colors.white} fontWeight={400} pl={1} lineHeight={'22px'}>
                                <ArrowForward sx={{ height: 16, position: 'relative', top: '3px', color: colors.white }} />
                                <b>Individualūs įdėklai į avalynę</b> — komfortui, apkrovų paskirstymui, sportui ir kasdienai.
                            </Typography>

                            <Typography fontSize={16} color={colors.white} fontWeight={400} pl={1} lineHeight={'22px'}>
                                <ArrowForward sx={{ height: 16, position: 'relative', top: '3px', color: colors.white }} />
                                <b>Pritaikymas, reguliavimas ir techninis aptarnavimas</b> — viso naudojimo metu.
                            </Typography>

                            <Typography fontSize={16} color={colors.white} fontWeight={400} pl={1} lineHeight={'22px'}>
                                <ArrowForward sx={{ height: 16, position: 'relative', top: '3px', color: colors.white }} />
                                <b>Prototipai ir jutiklių integracija (R&amp;D)</b> — duomenimis grįstas tobulinimas.
                            </Typography>
                        </Stack>
                    </Stack>
                </Stack>
                <Stack direction={'row'} height={'100%'} width={'100%'} overflow={'hidden'}
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
            {/* <ProductsSection products={newProducts} title={'NAUJOS PRIEMONĖS'} /> */}
            <AboutFAQSection bg="#ffffff" accent="#1E6EA1" />

        </Layout>
    )
}

export default HomePage
