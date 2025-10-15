import { ProductViewData } from './ProductViewPage.types'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import { getColors } from '../layout/colors'
import React from 'react'

type Props = {
    diagnoses: ProductViewData['diagnosesTable']
}

const borderBlue = '#1e6da1'

const ProductDiagnosesTable = ({ diagnoses }: Props) => {
    const colors = getColors()
    const items = Array.isArray(diagnoses) ? diagnoses : []
    if (!items.length) return null

    return (
        <Stack
            direction="column"
            sx={{
                border: `1px solid ${borderBlue}`,
                color: '#000000DE',
                boxShadow: 'rgba(0, 0, 0, 0.15) 2px 6px 16px !important',
            }}
        >
            {items.map((group, i) => {
                const prev = items[i - 1]
                const showHeader = !prev || prev.percent !== group.percent

                return (
                    <Stack key={group.id} sx={{ boxShadow: 'rgba(0,0,0,0.15) 2px 6px 16px !important' }}>
                        {showHeader && (
                            <>
                                {/* Blue bar */}
                                <Stack
                                    direction="row"
                                    justifyContent="space-between"
                                    width="100%"
                                    sx={{ py: 0, px: 1, backgroundColor: colors.primary }}
                                >
                                    <Typography
                                        color={colors.white}
                                        fontSize={22}
                                        py={1}
                                        fontWeight={600}
                                        textTransform="uppercase"
                                    >
                                        Kompensuojama {group.percent}%
                                    </Typography>
                                </Stack>

                                {/* Column headers */}
                                <Stack
                                    direction={{ lg: 'row', md: 'row', sm: 'row', xs: 'column' }}
                                    sx={{ backgroundColor: '#fff', border: `1px solid ${borderBlue}` }}
                                >
                                    <Stack
                                        width={{ lg: '50%', md: '50%', sm: '50%', xs: '100%' }}
                                        direction="row"
                                        p={1}
                                        sx={{ borderRight: `1px solid ${borderBlue}` }}
                                    >
                                        <Typography
                                            color={colors.primary}
                                            fontSize={16}
                                            fontWeight={600}
                                            textTransform="uppercase"
                                            lineHeight="15px"
                                        >
                                            Diagnozės
                                        </Typography>
                                    </Stack>

                                    {/* Right header hidden on xs (same as before) */}
                                    <Stack
                                        display={{ lg: 'flex', md: 'flex', sm: 'flex', xs: 'none' }}
                                        width={{ lg: '50%', md: '50%', sm: '50%', xs: '100%' }}
                                        direction="row"
                                        alignItems="center"
                                        p={1}
                                        sx={{ borderLeft: `1px solid ${borderBlue}` }}
                                    >
                                        <Typography
                                            color={colors.primary}
                                            fontSize={16}
                                            fontWeight={600}
                                            textTransform="uppercase"
                                            lineHeight="15px"
                                        >
                                            Gydytojai
                                        </Typography>
                                    </Stack>
                                </Stack>
                            </>
                        )}

                        {/* Body */}
                        <Stack
                            direction={{ lg: 'row', md: 'row', sm: 'row', xs: 'column' }}
                            sx={{ border: `.5px solid ${borderBlue}`, backgroundColor: '#fff' }}
                        >
                            {/* Left: diagnoses list */}
                            <Stack width={{ lg: '50%', md: '50%', sm: '50%', xs: '100%' }}>
                                {group.diagnoses.map((d) => (
                                    <Stack
                                        key={d.id}
                                        direction="row"
                                        alignItems="center"
                                        sx={{
                                            border: `.5px solid ${borderBlue}`,
                                            borderRight: `1px solid ${borderBlue}`,
                                            p: 1,
                                            height: '100%',
                                        }}
                                    >
                                        <Typography fontSize={14} lineHeight="18px">
                                            {d.diagnose}
                                        </Typography>
                                    </Stack>
                                ))}
                            </Stack>

                            {/* Right header for xs only */}
                            <Stack
                                width={{ lg: '50%', md: '50%', sm: '50%', xs: '100%' }}
                                direction="row"
                                alignItems="center"
                                p={1}
                                sx={{ border: `1px solid ${borderBlue}` }}
                                display={{ lg: 'none', md: 'none', sm: 'none', xs: 'flex' }}
                            >
                                <Typography
                                    color={colors.primary}
                                    fontSize={16}
                                    fontWeight={600}
                                    textTransform="uppercase"
                                    lineHeight="15px"
                                >
                                    Gydytojai
                                </Typography>
                            </Stack>

                            {/* Right: specialists */}
                            <Stack
                                justifyContent="center"
                                width={{ lg: '50%', md: '50%', sm: '50%', xs: '100%' }}
                                sx={{
                                    border: `.5px solid ${borderBlue}`,
                                    borderLeft: `1px solid ${borderBlue}`,
                                    p: 1,
                                }}
                            >
                                <Typography
                                    fontSize={14}
                                    lineHeight="15px"
                                    textAlign={{ lg: 'center', md: 'center', sm: 'center', xs: 'left' }}
                                >
                                    {group.specialists}
                                </Typography>
                            </Stack>
                        </Stack>
                    </Stack>
                )
            })}
        </Stack>
    )
}

export default ProductDiagnosesTable