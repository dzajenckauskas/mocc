import { CategoriesResponseType } from '@/app/categories/ServiceType'
import { ProductsType } from '@/app/products/productTypes'
import { ReviewsResponseType } from '@/app/services/ReviewTypes'
import ClearIcon from '@mui/icons-material/Clear'
import SearchIcon from '@mui/icons-material/Search'
import WarningAmberIcon from '@mui/icons-material/WarningAmber'
import { IconButton, InputAdornment, Pagination, TextField } from '@mui/material'
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import { useRouter } from 'next/router'
import { ChangeEvent, FormEvent, useEffect, useMemo, useRef, useState } from 'react'
import CategoriesSection from '../home/CategoriesSection'
import Layout from '../Layout'
import ProductCard from '../products/ProductCard'
import Breadcrumbs, { Crumb } from '../shared/Breadcrumbs'
import LinkIconButton from '../shared/LinkIconButton'

type Props = {
    products: ProductsType;
    reviews?: ReviewsResponseType;
    categories?: CategoriesResponseType;
    searchTerm?: string;
    title?: string | null;
}

const CatalogPage = ({ products, reviews, searchTerm = '', title, categories }: Props) => {
    const router = useRouter()
    const currentPage = useMemo(() => {
        const rawPage = router.query.page
        const value = Array.isArray(rawPage) ? rawPage[0] : rawPage
        const parsed = value ? Number(value) : NaN
        return Number.isNaN(parsed) || parsed < 1 ? 1 : parsed
    }, [router.query.page])

    const currentSearch = useMemo(() => {
        const raw = router.query.search
        return Array.isArray(raw) ? raw[0] ?? '' : raw ?? ''
    }, [router.query.search])

    const [searchValue, setSearchValue] = useState(currentSearch || searchTerm)

    useEffect(() => {
        setSearchValue(currentSearch || '')
    }, [currentSearch])

    const handleChange = (_e: ChangeEvent<unknown>, nextPage: number) => {
        const trimmedSearch = currentSearch.trim()
        const query: Record<string, string> = {}
        if (trimmedSearch) query.search = trimmedSearch
        if (nextPage > 1) query.page = String(nextPage)
        router.push({ pathname: router.asPath.split('?')[0], query })
    }

    const handleSearchSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const trimmed = searchValue.trim()
        const query: Record<string, string> = {}
        if (trimmed) query.search = trimmed
        router.push({ pathname: router.asPath.split('?')[0], query })
    }

    const throttleRef = useRef<ReturnType<typeof setTimeout> | null>(null)
    const pushSearch = (value: string) => {
        const trimmed = value.trim()
        const query: Record<string, string> = {}
        if (trimmed) query.search = trimmed
        router.push({ pathname: router.asPath.split('?')[0], query })
    }

    const handleClearSearch = () => {
        setSearchValue('')
        pushSearch('')
    }

    useEffect(() => {
        if (searchValue === currentSearch) return
        if (throttleRef.current) clearTimeout(throttleRef.current)
        throttleRef.current = setTimeout(() => {
            const trimmed = searchValue.trim()
            const query: Record<string, string> = {}
            if (trimmed) query.search = trimmed
            router.push({ pathname: router.asPath.split('?')[0], query })
        }, 500)
        return () => { if (throttleRef.current) clearTimeout(throttleRef.current) }
    }, [searchValue, currentSearch, router])

    const totalPages = products.meta?.pagination?.pageCount ?? 0
    const safeCurrentPage = products.meta?.pagination?.page ?? currentPage
    const renderProducts = products.data.map((product, index) => (
        <ProductCard
            product={product}
            key={product.id}
            priority={currentPage === 1 && !currentSearch.trim() && index === 0}
        />
    ))

    const crumbs: Crumb[] = [
        { label: 'Katalogas', href: '/ortopedijos-technikos-katalogas' },
        ...(title ? [{ label: title }] : []),
    ]

    return (
        <Stack>
            <Layout color={"#1E6EA1"} reviews={reviews}>
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

                    <Typography
                        variant='h1'
                        fontSize={25}
                        fontWeight={900}
                        lineHeight={'28px'}
                        color={'#1E6EA1'}
                        sx={{ textAlign: 'left', pt: 2, textTransform: 'uppercase' }}
                    >
                        {title ?? "ORTOPEDIJOS TECHNIKOS KATALOGAS"}
                    </Typography>

                    <Stack spacing={{ md: 4, xs: 2 }} pt={2} direction={{ md: 'row', xs: 'column-reverse' }}
                        width={'100%'} justifyContent={'space-between'}>

                        <Box
                            component="form"
                            onSubmit={handleSearchSubmit}
                            sx={{
                                width: { xs: '100%', sm: '70%', md: '50%' },
                                maxWidth: 460,
                                mx: 'auto',
                            }}
                        >
                            <TextField
                                fullWidth
                                value={searchValue}
                                onChange={(event) => setSearchValue(event.target.value)}
                                placeholder={"Ieškoti pagal pavadinimą ar tipą..."}
                                variant="outlined"
                                size='small'
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            {searchValue && (
                                                <IconButton size='small' sx={{ width: 24, height: 24 }} aria-label="Išvalyti paiešką" onClick={handleClearSearch} edge="end">
                                                    <ClearIcon fontSize='small' sx={{ height: 18 }} />
                                                </IconButton>
                                            )}
                                            <IconButton size='small' sx={{ width: 24, height: 24 }} aria-label="Ieškoti" type="submit" edge="end">
                                                <SearchIcon fontSize='small' sx={{ height: 18 }} />
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                }}
                            />
                        </Box>
                        <LinkIconButton target='_blank' href={'/api/ortopedijos-technikos-katalogas'} label="ATSISIŲSTI KATALOGĄ" />
                    </Stack>

                    <Stack spacing={4} pt={3} direction={'column'} width={'100%'}>
                        {products.data.length > 0 ? (
                            <Box
                                sx={{
                                    display: 'grid',
                                    gridTemplateColumns: {
                                        xs: '1fr',
                                        sm: 'repeat(2, 1fr)',
                                        md: 'repeat(3, 1fr)',
                                        lg: 'repeat(4, 1fr)',
                                    },
                                    gap: { xs: 2, sm: 3, md: 4 },
                                    width: '100%',
                                }}
                            >
                                {renderProducts}
                            </Box>
                        ) : (
                            <Stack alignItems="center" justifyContent="center" minHeight={'40vh'}>
                                <WarningAmberIcon fontSize='large' />
                                {searchValue.trim() && (
                                    <Typography color="primary" fontSize={14} textAlign="center" mt={1} fontWeight={'bold'}>
                                        Produktų pagal paieškos frazę: “{searchValue.trim()}” nerasta.
                                    </Typography>
                                )}
                                <Typography color="text.secondary" fontSize={14} textAlign="center" mt={1}>
                                    Pabandykite pakeisti paieškos žodžius.
                                </Typography>
                            </Stack>
                        )}

                        {totalPages > 1 && (
                            <Stack direction={'row'} mb={4} width={'100%'} justifyContent={'center'} pt={2}>
                                <Pagination
                                    count={totalPages}
                                    page={safeCurrentPage}
                                    onChange={handleChange}
                                    color={'primary'}
                                    shape="rounded"
                                />
                            </Stack>
                        )}
                    </Stack>
                </Stack>

                {categories && <CategoriesSection categories={categories} />}
            </Layout>
        </Stack>
    )
}

export default CatalogPage
