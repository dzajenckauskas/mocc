import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Image from 'next/image';
import { keyframes } from '@mui/system';
import { getColors } from '../layout/colors';

const float = keyframes`
  0% { transform: translateY(0px) }
  50% { transform: translateY(-6px) }
  100% { transform: translateY(0px) }
`;

const HeroBanner = () => {
    const colors = getColors();
    const sectionHeight = { lg: 700, md: 700, sm: 600, xs: 700 }
    return (
        <Stack position="relative" overflow="hidden">
            {/* Background image — replace with your best-fit photo */}
            <Box
                position="absolute"
                left={0}
                // top={{ lg: 130, md: 130, sm: 80, xs: 80 }}
                width="100vw"
                height={sectionHeight}
                sx={{ opacity: 0.92, overflow: 'hidden' }}
                aria-hidden
            >
                <Image
                    alt="Medicinos centras – ortopedijos technologijos ir gamyba"
                    // src={'/media/banner.webp'}
                    src={'/media/consultations.jpg'}
                    fill
                    priority
                    sizes="100vw"
                    style={{ objectFit: 'cover', objectPosition: '50% 50%' }}
                />
            </Box>

            {/* Techy mesh + gradient overlays for depth/readability */}
            <Box
                position="absolute"
                left={0}
                // top={{ lg: 130, md: 130, sm: 80, xs: 80 }}
                width="100vw"
                height={sectionHeight}
                sx={{
                    background:
                        `radial-gradient(1200px 600px at 12% 18%, ${colors.primary}44, transparent 60%),
                     radial-gradient(900px 500px at 88% 72%, #00B0FF33, transparent 60%),
                     linear-gradient(180deg, #0A254033 0%, #0A254000 40%, #0A254033 100%)`,
                    mixBlendMode: 'multiply',
                }}
            />
            <Box
                position="absolute"
                left={0}
                // top={{ lg: 130, md: 130, sm: 80, xs: 80 }}
                width="100vw"
                height={sectionHeight}
                sx={{ background: `linear-gradient(-90deg, ${colors.primary}A6, ${colors.primary}26)` }}
            />

            {/* Content */}
            <Stack
                minHeight={sectionHeight}
                zIndex={2}
                justifyContent="flex-end"
                alignItems="flex-start"
                sx={{
                    px: { lg: 4, md: 4, sm: 3, xs: 3 },
                    mx: 'auto',
                    maxWidth: '1200px',
                    width: '100%',
                    pb: { lg: 10, md: 8, sm: 6, xs: 5 },
                }}
            >
                <Stack
                    spacing={1.25}
                    sx={{
                        borderLeft: '3px solid #1E6EA1',
                        px: 4,
                        py: 4.5,
                        maxWidth: 760,
                        color: '#fff',
                        backdropFilter: 'blur(2px)',
                        backgroundColor: 'rgba(10, 37, 64, 0.20)',
                        boxShadow: '0 24px 60px rgba(0,0,0,0.28)',
                        // borderRadius: 2,
                        animation: `${float} 6s ease-in-out infinite`,
                        '@media (prefers-reduced-motion: reduce)': { animation: 'none' },
                    }}
                >
                    <Typography
                        variant="h1"
                        sx={{
                            fontSize: { lg: 44, md: 40, sm: 36, xs: 30 },
                            lineHeight: { lg: '52px', md: '48px', sm: '42px', xs: '36px' },
                            fontWeight: 800,
                            letterSpacing: 0.3,
                            textTransform: 'uppercase',
                        }}
                    >
                        Inovatyvūs ortopedijos sprendimai
                    </Typography>

                    <Typography
                        sx={{
                            fontSize: { lg: 18, md: 17, sm: 16, xs: 15 },
                            lineHeight: { lg: '26px', md: '24px', sm: '22px', xs: '22px' },
                            fontWeight: 300,
                            maxWidth: 720,
                        }}
                    >
                        Medicinos centras kuria ir pritaiko individualias ortopedijos technines priemones –
                        3D skenavimas, projektavimas, 3D spausdinimas, funkcinė kosmetika ir techninis aptarnavimas.
                    </Typography>

                    <Stack direction="row" spacing={1.5} pt={1} flexWrap="wrap">
                        <Button
                            size="large"
                            variant="contained"
                            color="primary"
                            href="/ortopedijos-technikos-katalogas"
                            sx={{ px: 2.6, py: 1.1 }}
                        >
                            Peržiūrėti katalogą
                        </Button>
                        <Button
                            size="large"
                            variant="outlined"
                            color="inherit"
                            href="#kontaktai"
                            sx={{
                                borderColor: 'rgba(255,255,255,0.75)',
                                color: '#fff',
                                px: 2.6,
                                py: 1.1,
                                '&:hover': { borderColor: '#fff', backgroundColor: 'rgba(255,255,255,0.08)' },
                            }}
                        >
                            Kontaktai
                        </Button>
                    </Stack>
                </Stack>
            </Stack>
        </Stack>
    );
};

export default HeroBanner;