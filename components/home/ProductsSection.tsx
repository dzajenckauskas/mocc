import { ProductsType } from '@/app/products/productTypes';
import { ArrowForward } from '@mui/icons-material';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Link from 'next/link';
import React from 'react'
import { getColors } from '../layout/colors'
import ProductCard from '../products/ProductCard';

type Props = {
    products: ProductsType;
    color?: string;
    title?: string;
}

const ProductsSection = ({ products, color, title }: Props) => {
    const colors = getColors()
    const renderProducts = products?.data.map((product, idx) => (
        <ProductCard product={product} key={product.id} priority={idx === 0} />
    ))
    return (
        <>
            <Stack sx={{
                backgroundColor: colors.softGrey, mx: 'auto',
                width: '100%', position: 'relative', zIndex: 99,
            }}>
                <Stack sx={{ maxWidth: '1200px', mx: 'auto', px: { lg: 4, md: 4, sm: 3, xs: 3 } }}>
                    <Stack sx={{
                        maxWidth: '1200px', mx: 'auto',
                    }} pt={2} pb={10} alignItems={'center'} >
                        <Typography variant='h1' color={color ?? '#1E6EA1'} py={5} textAlign={'center'}>
                            {title}
                        </Typography>
                        <Stack color={'primary.main'} direction={'row'} sx={{
                            maxWidth: '1200px', mx: 'auto',
                        }}>
                            <Stack spacing={4} direction={'column'}>
                                {products &&
                                    <Grid container spacing={4} sx={{ position: 'relative', left: -32 }}>
                                        {renderProducts}
                                    </Grid>}
                                <Stack direction={'row'} sx={{ width: '100%', justifyContent: 'flex-end' }} pt={0}>
                                    <Link href={'/ortopedijos-technikos-katalogas'} >
                                        <Button size="small" disableRipple sx={{
                                            display: 'flex', flexDirection: 'row', alignContent: 'center',
                                            ':hover': { backgroundColor: 'transparent', textDecoration: 'underline' }
                                        }}>
                                            {"PERŽIŪRĖTI KATALOGĄ"}
                                            <ArrowForward sx={{ height: '14px', color: colors.primary }} />
                                        </Button>
                                    </Link>
                                </Stack>
                            </Stack>
                        </Stack>
                    </Stack>
                </Stack>
            </Stack>
        </>
    )
}

export default ProductsSection
