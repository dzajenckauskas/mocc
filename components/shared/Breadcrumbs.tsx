'use client';

import Link from 'next/link';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { SxProps, Theme } from '@mui/material/styles';
import HomeIcon from '@mui/icons-material/Home';
export type Crumb = { label: string; href?: string };

type Props = {
    items: Crumb[];                 // e.g. [{label:'Katalogas', href:'/ortopedijos-technikos-katalogas'}, {label:'Kategorija', href:'/..'}, {label:'Ilgas produkto pavadinimas...'}]
    homeLabel?: string;             // default 'Home'
    homeHref?: string;              // default '/'
    separator?: string | React.ReactNode; // default '/'
    sx?: SxProps<Theme>;
    lastMaxWidth?: { xs?: string | number; sm?: string | number; md?: string | number };
};

export default function Breadcrumbs({
    items,
    homeHref = '/',
    separator = ' / ',
    sx,
    lastMaxWidth = { xs: '55vw', sm: '70vw', md: 'unset' },
}: Props) {


    return (
        <Box
            sx={{
                maxWidth: '80vw',
                display: 'flex',
                alignItems: 'center',
                flexWrap: 'nowrap',
                overflow: 'hidden',
                minWidth: 0,           // ✅ allow truncation inside
                pt: 2,
                position: 'relative',
                right: 6,
                ...sx,
            }}
        >
            {/* Home */}
            <Link href={homeHref} passHref>
                <Typography
                    variant="body2"
                    sx={{ fontWeight: 500, mr: '-6px', color: (t) => t.palette.secondary.main, ':hover': { textDecoration: 'underline' }, flexShrink: 0 }}
                >
                    <HomeIcon sx={{ height: 12, position: 'relative', top: 2 }} />
                    {/* {homeLabel} */}
                </Typography>
            </Link>

            {/* Trail */}
            {items.map((item, idx) => {
                const isLast = idx === items.length - 1;
                return (
                    <Box
                        key={idx}
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 0.5,
                            flexShrink: isLast ? 1 : 0, // last can shrink
                            minWidth: 0,                 // ✅ critical for ellipsis
                        }}
                    >
                        <Typography
                            variant="body2"
                            sx={{ mx: 0.5, color: (t) => t.palette.text.secondary, flexShrink: 0 }}
                        >
                            {separator}
                        </Typography>

                        {isLast ? (
                            <Typography
                                variant="body2"
                                noWrap
                                title={item.label}
                                sx={{
                                    fontWeight: 500,
                                    color: (t) => t.palette.secondary.main,
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis',
                                    whiteSpace: 'nowrap',
                                    maxWidth: {
                                        xs: lastMaxWidth.xs ?? '55vw',
                                        sm: lastMaxWidth.sm ?? '70vw',
                                        md: lastMaxWidth.md ?? 'unset',
                                    },
                                    minWidth: 0,
                                    flexGrow: 1,   // ✅ let last crumb take remaining space
                                }}
                            >
                                {item.label}
                            </Typography>
                        ) : (
                            <Link href={item.href ?? '#'} passHref>
                                <Typography
                                    variant="body2"
                                    sx={{
                                        fontWeight: 500,
                                        color: (t) => t.palette.secondary.main,
                                        ':hover': { textDecoration: 'underline' },
                                        flexShrink: 0, // ✅ don’t shrink links before last
                                        whiteSpace: 'nowrap',
                                    }}
                                >
                                    {item.label}
                                </Typography>
                            </Link>
                        )}
                    </Box>
                );
            })}
        </Box>
    );
}