import { ProductType } from '@/app/products/productTypes'
import { toSlug } from '@/utils/slugify'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import CardActions from '@mui/material/CardActions'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import Image from 'next/image'
import Link from 'next/link'
import { getColors } from '../layout/colors'

type Props = {
    product: ProductType;
    preview?: boolean;
    priority?: boolean;
}
const ProductCard = ({ product, preview, priority = false }: Props) => {
    const colors = getColors()
    const imageUrl = product.attributes.images?.data && product.attributes.images?.data[0].attributes.url

    const categorySlug = toSlug(product?.attributes?.category?.data?.attributes?.title)

    const productHref = categorySlug
        ? `/ortopedijos-technika/${categorySlug}/${product.attributes.slug}`
        : `/ortopedijos-technika/${product.attributes.slug}`
    const categoryHref = `/ortopedijos-technika/${categorySlug}`
    return (
        <Box sx={{ display: 'flex' }}>
            <Stack sx={{
                minWidth: '200px',
                backgroundColor: '#fff',
                width: '100%',
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                height: '100%',
                boxShadow: 'rgba(0, 0, 0, 0.15) 2px 6px 16px !important',
            }}>
                {product.attributes.isNew &&
                    <CardActions sx={{ p: 0, pt: 0, position: 'absolute', top: 16, zIndex: 99 }}>
                        <Button size="large" variant='contained'
                            sx={{ borderRadius: 0, height: '30px', opacity: '80%', textAlign: 'left' }}>
                            NAUJAS!
                        </Button>
                    </CardActions>}
                <Stack sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                    <Link passHref href={productHref} style={{ width: '100%' }}>
                        <Box
                            sx={{
                                position: 'relative',
                                height: { xs: 200, sm: 210, md: 220 },
                                width: '100%',
                                px: 2,
                                pt: 3,
                                pb: 1,
                                transition: 'opacity 0.3s ease',
                                '&:hover': { opacity: 0.85 },
                            }}
                        >
                            {imageUrl && (
                                <Image
                                    src={imageUrl}
                                    alt={product.attributes.title}
                                    fill
                                    priority={priority}
                                    loading={priority ? undefined : 'lazy'}
                                    sizes="(min-width: 1200px) 25vw, (min-width: 900px) 33vw, (min-width: 600px) 50vw, 100vw"
                                    style={{ objectFit: 'contain', padding: '16px' }}
                                />
                            )}
                        </Box>
                    </Link>
                    <Stack px={2} pb={2} flexGrow={1}>
                        <Link passHref href={productHref} style={{ width: '100%' }}>
                            <Typography fontSize={20} lineHeight={'22px'} gutterBottom color={colors.primary} fontWeight={900}
                                sx={{ ':hover': { filter: 'brightness(75%)', cursor: 'pointer' } }}>
                                {(product.attributes.title)}
                            </Typography>
                        </Link>
                        {!preview && <>
                            {product?.attributes.category?.data?.attributes.title &&
                                <>
                                    <Typography color={colors.primary} fontSize={12}>
                                        {'KATEGORIJA '} <br />
                                    </Typography>
                                    <Link passHref href={categoryHref} style={{ width: '100%' }}>
                                        <Typography sx={{
                                            ':hover': { filter: 'brightness(75%)', cursor: 'pointer' }, fontWeight: 600, color: colors.grey,
                                            fontSize: 14,
                                            lineHeight: '16px', textTransform: 'uppercase'
                                        }}>{product?.attributes.category?.data?.attributes.title}</Typography>
                                    </Link>
                                </>}
                            {product?.attributes.type &&
                                <Typography color={colors.primary} fontSize={12} pt={1}>
                                    {'TIPAS '} <br />
                                    <span style={{
                                        fontWeight: 600, color: colors.grey, fontSize: 14,
                                        lineHeight: '12px', textTransform: 'uppercase'
                                    }}>{product?.attributes.type}</span>
                                </Typography>}
                        </>}
                    </Stack>
                </Stack>
                <CardActions sx={{ p: 0, pt: 0, mt: 'auto' }}>
                    <Link passHref href={productHref} style={{ width: '100%' }}>
                        <Button size="large" color="primary" variant='contained' fullWidth
                            sx={{ borderRadius: 0, height: '50px' }}>
                            Peržiūrėti
                        </Button>
                    </Link>
                </CardActions>
            </Stack>
        </Box>
    )
}

export default ProductCard
