import { ArrowForward } from '@mui/icons-material'
import Button from '@mui/material/Button'
import { SxProps, Theme } from '@mui/material/styles'
import Link from 'next/link'
import React from 'react'
import { getColors } from '../layout/colors'

type Props = {
    href: string
    label: string
    target?: string
    icon?: React.ReactNode
    sx?: SxProps<Theme>
}

const LinkIconButton = ({ href, label, target = '_blank', icon, sx }: Props) => {
    const colors = getColors()

    return (
        <Button
            size="small"
            disableRipple
            sx={{
                px: 0,
                // pt: { md: 6, xs: 2 },
                width: 'max-content',
                ':hover': { backgroundColor: 'transparent', textDecoration: 'underline' },
                ...sx,
            }}
        >
            <Link href={href} passHref target={target}>
                {label}
                {icon ?? (
                    <ArrowForward
                        sx={{
                            height: '14px',
                            color: colors.primary,
                            transform: 'rotate(90deg)',
                            position: 'relative',
                            top: 2,
                            ml: 0.5,
                        }}
                    />
                )}
            </Link>
        </Button>
    )
}

export default LinkIconButton