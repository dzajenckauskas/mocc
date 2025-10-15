import { ServiceType } from '@/app/services/ServiceType'
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
    service: ServiceType;
}

const ServiceCard = ({ service }: Props) => {
    const [hovered, setHovered] = useState(false)
    const imageUrl = service.attributes.images?.data && service.attributes.images?.data[0].attributes.url
    const colors = getColors()

    return (
        <Grid item lg={3} md={4} sm={6} xs={12}>
            <Link href={`/ortopedijos-paslaugos/${service.attributes.slug}`} passHref>
                <Stack
                    onMouseEnter={() => setHovered(true)}
                    onMouseLeave={() => setHovered(false)}
                    sx={{
                        height: '100%', // ✅ makes cards equal height inside Grid
                        display: 'flex',
                        flexDirection: 'column',
                        overflow: 'hidden',
                        // borderRadius: 2,
                        boxShadow: 'rgba(0, 0, 0, 0.1) 2px 4px 12px !important',
                        cursor: 'pointer',
                        transition: 'all 0.3s ease',
                        ':hover': { transform: 'translateY(-4px)' },
                        backgroundColor: '#fff',
                    }}
                >
                    {/* Image box */}
                    <Stack position="relative" height={220} width="100%" sx={{ overflow: 'hidden' }}>
                        {imageUrl && (
                            <Image
                                alt={service.attributes.title}
                                src={imageUrl}
                                fill
                                loading="lazy"
                                sizes="(min-width: 1200px) 25vw, (min-width: 900px) 33vw, (min-width: 600px) 50vw, 100vw"
                                style={{
                                    objectFit: 'cover',
                                    opacity: 0.85,
                                    transition: 'transform 0.6s ease',
                                    transform: hovered ? 'scale(1.05)' : 'scale(1)',
                                }}
                            />
                        )}
                        {/* Overlay gradient */}
                        <Stack
                            sx={{
                                position: 'absolute',
                                bottom: 0,
                                left: 0,
                                width: '100%',
                                height: '70%',
                                background: 'linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 100%)',
                            }}
                        />
                        {/* Title over image */}
                        <Typography
                            variant="h6"
                            fontWeight={700}
                            sx={{
                                position: 'absolute',
                                bottom: 12,
                                left: 16,
                                right: 16,
                                color: '#fff',
                                textTransform: 'uppercase',
                                fontSize: 18,
                                lineHeight: '22px',
                            }}
                        >
                            {service.attributes.title}
                        </Typography>
                    </Stack>

                    {/* White content box under image */}
                    <CardContent
                        sx={{
                            backgroundColor: '#fff',
                            flex: 1,
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'space-between',
                            minHeight: { xs: 120, sm: 160 }, // ✅ ensure cards align
                        }}
                    >
                        <Typography
                            fontSize={15}
                            lineHeight="20px"
                            fontWeight={300}
                            color="#333"
                            mb={2}
                        >
                            {service.attributes.description}
                        </Typography>

                        {/* CTA button pinned at bottom */}
                        <Stack
                            direction="row"
                            alignItems="center"
                            spacing={1}
                            sx={{
                                mt: 'auto', // ✅ pushes button down
                                color: colors.primary,
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
    )
}

export default ServiceCard
