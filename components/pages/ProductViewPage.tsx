import { CategoriesResponseType } from '@/app/categories/ServiceType'
import CloseIcon from '@mui/icons-material/Close'
import ZoomOutMapIcon from '@mui/icons-material/ZoomOutMap'
import Box from '@mui/material/Box'
import Dialog from '@mui/material/Dialog'
import IconButton from '@mui/material/IconButton'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import Image from 'next/image'
import { useState } from 'react'
import CategoriesSection from '../home/CategoriesSection'
import { getColors } from '../layout/colors'
import ProductDiagnosesTable from './ProductDiagnosesTable'
import { ProductViewData } from './ProductViewPage.types'
import Breadcrumbs, { Crumb } from '../shared/Breadcrumbs'

type Props = {
    product: ProductViewData;
    categories?: CategoriesResponseType
}


const ProductViewPage = ({ product, categories }: Props) => {
    const imageUrl = product.image?.url
    const colors = getColors()
    const [isImageModalOpen, setIsImageModalOpen] = useState(false)
    const categorySlug = product?.categorySlug
    const categoryName = product?.categoryTitle

    const crumbs: Crumb[] = [
        { label: 'Katalogas', href: '/ortopedijos-technikos-katalogas' },
        ...(categorySlug && categoryName ? [{ label: categoryName, href: `/ortopedijos-technika/${categorySlug}` }] : []),
        { label: product.title }, // last item: no href → ellipsis on small screens
    ]

    return (
        <>
            <Stack alignItems={'flex-start'} px={{ lg: 4, md: 4, sm: 3, xs: 3 }} maxWidth={'lg'} mx={'auto'}
                minHeight={'80vh'} sx={{ backgroundColor: '#f9f9f9' }}>
                <Breadcrumbs items={crumbs} />

                <Stack color={'primary.main'} direction={'row'} pt={1}>
                    <Stack mt={{ lg: 2, md: 2, sm: 2, xs: 2 }}
                        spacing={{ lg: 4, md: 2, sm: 4, xs: 2 }} pb={10}>

                        <Stack sx={{ color: 'primary.main' }}
                            direction={{ lg: 'row', md: 'row', sm: 'column', xs: 'column' }} pb={4}
                            spacing={{ lg: 4, md: 4, sm: 4, xs: 4 }}>

                            {imageUrl && (
                                <Stack
                                    sx={{
                                        backgroundColor: '#fff',
                                        boxShadow: 'rgba(0, 0, 0, 0.15) 2px 6px 16px !important',
                                        position: 'relative',
                                        flexBasis: { xs: '100%', md: '60%' },
                                        width: { xs: '100%', md: '60%' },
                                        minHeight: { xs: 360, md: 620 },
                                        aspectRatio: { xs: '3 / 4', md: '3 / 4' },
                                    }}
                                >
                                    <Image
                                        alt={product.title}
                                        src={imageUrl}
                                        fill
                                        priority
                                        sizes="(min-width: 1200px) 60vw, 100vw"
                                        style={{ objectFit: 'contain' }}
                                    />
                                    <IconButton
                                        aria-label="Padidinti vaizdą"
                                        onClick={() => setIsImageModalOpen(true)}
                                        size="small"
                                        sx={{
                                            position: 'absolute',
                                            top: 8,
                                            right: 8,
                                            width: 32,
                                            height: 32
                                        }}
                                    >
                                        <ZoomOutMapIcon fontSize='small' />
                                    </IconButton>
                                </Stack>
                            )}

                            <Stack spacing={1}>
                                <Typography variant='h1' maxWidth={600} textTransform={'uppercase'} pb={2}>
                                    {product.title}
                                </Typography>

                                {product.categoryTitle && (
                                    <Typography color={colors.primary} fontSize={12}>
                                        {'KATEGORIJA '} <br />
                                        <span style={{ fontWeight: 600, color: colors.grey, fontSize: 16, lineHeight: '14px', textTransform: 'uppercase' }}>
                                            {product.categoryTitle}
                                        </span>
                                    </Typography>
                                )}

                                {product.prices && (
                                    <Typography color={colors.primary} fontSize={12}>
                                        {'KAINOS '} <br />
                                        <span style={{ fontWeight: 600, color: colors.grey, fontSize: 16, lineHeight: '14px' }}>{product.prices}€</span>
                                    </Typography>
                                )}

                                <Typography fontSize={12} color={colors.primary}>
                                    {'TIPAS '} <br />
                                    <span style={{ fontWeight: 600, color: colors.grey, fontSize: 16, lineHeight: '14px' }}>{product.type}</span>
                                </Typography>

                                <Typography variant='body1' fontSize={14} lineHeight={'18px'} color={colors.grey} pt={1} textAlign={'justify'}>
                                    <span style={{ fontWeight: 600, textTransform: 'uppercase', lineHeight: '30px', fontSize: '16px' }}>
                                        {'Techninis aprašymas ir paskirtis'}
                                    </span>
                                    <br />
                                    {product.description}
                                </Typography>
                            </Stack>
                        </Stack>

                        <ProductDiagnosesTable diagnoses={product.diagnosesTable} />

                        {product.notes.map((note) => (
                            <Stack key={note.id} justifyContent={'center'} width={{ lg: '100%', md: '100%', sm: '100%', xs: '100%' }} pt={0}>
                                <Typography color={colors.primary} fontStyle={'italic'} fontSize={12} lineHeight={'14px'}>
                                    {note.text}
                                </Typography>
                            </Stack>
                        ))}
                    </Stack>
                </Stack>
            </Stack>

            {categories && <CategoriesSection categories={categories} />}

            {imageUrl && (
                <Dialog
                    open={isImageModalOpen}
                    onClose={() => setIsImageModalOpen(false)}
                    maxWidth="lg"
                    PaperProps={{ sx: { backgroundColor: 'transparent', boxShadow: 'none', borderRadius: 0 } }}
                >
                    <Box
                        sx={{
                            width: { xs: '90vw', md: '70vw' },
                            height: { xs: '70vh', md: '80vh' },
                            position: 'relative',
                            backgroundColor: '#fff',
                            overflow: 'hidden',
                        }}
                    >
                        <IconButton
                            aria-label="Uždaryti"
                            onClick={() => setIsImageModalOpen(false)}
                            size="small"
                            sx={{
                                position: 'absolute',
                                top: 8,
                                right: 8,
                                width: 32,
                                height: 32,
                                zIndex: 5,
                            }}
                        >
                            <CloseIcon fontSize='small' />
                        </IconButton>
                        <Image
                            alt={product.title}
                            src={imageUrl}
                            fill
                            sizes="90vw"
                            style={{ objectFit: 'contain' }}
                        />
                    </Box>
                </Dialog>
            )}
        </>
    )
}

export default ProductViewPage
