import { CategoryType } from '@/app/categories/ServiceType'
import CardContent from '@mui/material/CardContent'
import Grid from '@mui/material/Grid'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { getColors } from '../layout/colors'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'

type Props = {
    category: CategoryType;
};

const CategoryCard = ({ category }: Props) => {
    const [hovered, setHovered] = useState(false);
    const imageUrl =
        category.attributes.images?.data &&
        category.attributes.images?.data[0].attributes.url;
    const colors = getColors();
    const categorySlug = category.attributes.slug;

    return (
        <Grid item lg={4} md={4} sm={6} xs={12}>
            <Link href={'/ortopedijos-technika/' + categorySlug} passHref>
                <Stack
                    onMouseEnter={() => setHovered(true)}
                    onMouseLeave={() => setHovered(false)}
                    sx={{
                        overflow: 'hidden',
                        minWidth: 200,
                        width: '100%',
                        position: 'relative',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                        boxShadow: 'rgba(0, 0, 0, 0.1) 2px 4px 12px !important',
                        cursor: 'pointer',
                        transition: 'all 0.3s ease',
                        ':hover': { opacity: 0.98, transform: 'translateY(-4px)' },
                    }}
                >
                    {/* Background image */}
                    <Stack
                        direction={'row'}
                        height={260}
                        width={'100%'}
                        position={'absolute'}
                        zIndex={1}
                    >
                        {imageUrl && (
                            <Image
                                alt={category.attributes.title}
                                src={imageUrl}
                                fill
                                loading="lazy"
                                sizes="(min-width: 1200px) 33vw, (min-width: 900px) 50vw, 100vw"
                                style={{
                                    objectFit: 'cover',
                                    opacity: 0.85,
                                    transition: 'transform 0.6s ease',
                                    transform: hovered ? 'scale(1.05)' : 'scale(1)',
                                }}
                            />
                        )}
                    </Stack>

                    {/* Overlay (lighter gradient) */}
                    <Stack
                        direction="row"
                        height={260}
                        sx={{
                            background: 'linear-gradient(to top, rgba(0,0,0,0.55) 20%, rgba(0,0,0,0.1) 100%)',
                        }}
                        position="relative"
                        zIndex={2}
                    />

                    {/* Content */}
                    <CardContent
                        sx={{
                            height: '100%',
                            position: 'absolute',
                            bottom: 0,
                            zIndex: 3,
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'flex-end',
                        }}
                    >
                        <Typography
                            fontSize={18}
                            lineHeight="22px"
                            fontWeight={700}
                            color={colors.white}
                            sx={{
                                textTransform: 'uppercase',
                                mb: 1,
                                opacity: 1, // ✅ always 100%
                            }}
                        >
                            {category.attributes.title}
                        </Typography>

                        {/* Description on hover */}
                        {hovered && (
                            <Typography
                                mb={1}
                                fontSize={15}
                                lineHeight="17px"
                                fontWeight={300}
                                color={colors.white}
                                sx={{
                                    transition: 'opacity 0.3s ease',
                                    opacity: 1, // ✅ full opacity
                                }}
                            >
                                {category.attributes.description}
                            </Typography>
                        )}

                        {/* Button with arrow */}
                        <Stack
                            direction="row"
                            alignItems="center"
                            spacing={1}
                            sx={{
                                mt: 1,
                                color: colors.white,
                                fontWeight: 600,
                                fontSize: 14,
                                transition: 'all 0.3s ease',
                                transform: hovered ? 'translateX(4px)' : 'translateX(0)',
                            }}
                        >
                            <Typography
                                sx={{
                                    textTransform: 'uppercase',
                                    fontSize: 12,
                                    letterSpacing: '0.5px',
                                    opacity: 1, // ✅ keep strong
                                }}
                            >
                                Peržiūrėti
                            </Typography>
                            <ArrowForwardIcon
                                sx={{
                                    fontSize: 14,
                                    transition: 'transform 0.3s ease',
                                    transform: hovered ? 'translateX(4px)' : 'translateX(0)',
                                }}
                            />
                        </Stack>
                    </CardContent>
                </Stack>
            </Link>
        </Grid>
    );
};

export default CategoryCard;
