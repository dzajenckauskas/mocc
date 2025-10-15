// components/about/AboutFAQSection.tsx
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import VisibilityIcon from '@mui/icons-material/Visibility';
import PrecisionManufacturingIcon from '@mui/icons-material/PrecisionManufacturing';
import PhoneInTalkIcon from '@mui/icons-material/PhoneInTalk';
import EventNoteIcon from '@mui/icons-material/EventNote';
import BuildCircleIcon from '@mui/icons-material/BuildCircle';
import HomeRepairServiceIcon from '@mui/icons-material/HomeRepairService';
import PlaceIcon from '@mui/icons-material/Place';
import Link from 'next/link';

type FAQItem = {
    id: string;
    icon?: React.ReactNode;
    question: string;
    answer: string | React.ReactNode;
    defaultExpanded?: boolean;
};

type Props = {
    title?: string;
    accent?: string;
    bg?: string;
    items?: FAQItem[];
};

// 🔧 Centralize contact info here
const PHONE_RAW = '+37060792111';
const PHONE_DISPLAY = '+370 607 92111';
const EMAIL = 'info@mocc.lt';
const ADDRESS_TEXT = 'Laisvės pr. 77, Vilnius';
const MAP_URL = 'https://goo.gl/maps/RVoW7FDnbvK3EUiBA';

const makeItems = (accent: string): FAQItem[] => [
    {
        id: 'about',
        icon: <VisibilityIcon fontSize="small" />,
        question: 'Kas mes esame?',
        answer:
            'Medicinos centras kuria pažangias ortopedijos technines priemones: nuo 3D skenavimo ir CAD/CAM projektavimo iki 3D spausdinimo, pritaikymo ir techninio aptarnavimo. Orientuojamės į tikslumą, lengvumą ir individualų komfortą.',
        defaultExpanded: true,
    },
    {
        id: 'services',
        icon: <PrecisionManufacturingIcon fontSize="small" />,
        question: 'Pagrindinės paslaugos',
        answer:
            '• Individualūs šlaunies protezo priėmėjai ir komponentai (SLS/FDM, topologinis projektavimas)\n' +
            '• Funkcinė protezų kosmetika ir 3D spausdinti įdėklai\n' +
            '• 3D skenavimas, CAD/CAM modeliavimas, gamybos paruošimas\n' +
            '• Prototipai ir taikomieji R&D darbai (jutiklių integracija, duomenų surinkimas)\n' +
            '• Pritaikymas, reguliavimas ir techninis aptarnavimas',
    },
    {
        id: 'request',
        icon: <PhoneInTalkIcon fontSize="small" />,
        question: 'Kaip pateikti užklausą?',
        answer: (
            <Typography component="span" sx={{ fontSize: 15, lineHeight: 1.7, color: 'text.secondary' }}>
                Aprašykite poreikį (priemonės tipas, naudojimo tikslas, terminas) ir, jei turite, pridėkite
                <strong> brėžinius / 3D skenus / nuotraukas</strong>. Susisiekite:{' '}
                <Link href={`tel:${PHONE_RAW}`} passHref>
                    <Typography component="span" sx={{ textDecoration: 'underline', color: 'primary.main' }}>
                        {PHONE_DISPLAY}
                    </Typography>
                </Link>{' '}
                ·{' '}
                <Link href={`mailto:${EMAIL}`} passHref>
                    <Typography component="span" sx={{ textDecoration: 'underline', color: 'primary.main' }}>
                        {EMAIL}
                    </Typography>
                </Link>
                .
            </Typography>
        ),
    },
    {
        id: 'inputs',
        icon: <EventNoteIcon fontSize="small" />,
        question: 'Kokią informaciją pateikti pradžioje?',
        answer: (
            <Typography component="span" sx={{ fontSize: 15, lineHeight: 1.7, color: 'text.secondary' }}>
                Naudinga: esamos priemonės tipas (jei yra), norimi patobulinimai, matavimai ar 3D skeno failai, pageidaujamos
                medžiagos, terminas ir ar reikalingas pirminis matavimas vietoje.
            </Typography>
        ),
    },
    {
        id: 'process',
        icon: <BuildCircleIcon fontSize="small" />,
        question: 'Gamybos procesas ir terminai',
        answer: (
            <Typography component="span" sx={{ fontSize: 15, lineHeight: 1.7, color: 'text.secondary' }}>
                Atliekame skenavimą / priimame jūsų duomenis, parengiame CAD modelį, spausdiname (SLS/FDM) ir pritaikome.
                Terminas priklauso nuo sudėtingumo – dažniausiai nuo kelių dienų iki kelių savaičių. Pritaikymo metu
                sureguliuojame ir pateikiame naudojimo rekomendacijas.
            </Typography>
        ),
    },
    {
        id: 'service',
        icon: <HomeRepairServiceIcon fontSize="small" />,
        question: 'Garantija ir aptarnavimas',
        answer: (
            <Typography component="span" sx={{ fontSize: 15, lineHeight: 1.7, color: 'text.secondary' }}>
                Taikome garantinius įsipareigojimus, atliekame priežiūrą ir remontą, keičiame detales, konsultuojame dėl
                saugaus naudojimo ir periodinės priežiūros. Kreipkitės{' '}
                <Link href={`tel:${PHONE_RAW}`} passHref>
                    <Typography component="span" sx={{ textDecoration: 'underline', color: 'primary.main' }}>
                        {PHONE_DISPLAY}
                    </Typography>
                </Link>{' '}
                arba{' '}
                <Link href={`mailto:${EMAIL}`} passHref>
                    <Typography component="span" sx={{ textDecoration: 'underline', color: 'primary.main' }}>
                        {EMAIL}
                    </Typography>
                </Link>
                .
            </Typography>
        ),
    },
    {
        id: 'location',
        icon: <PlaceIcon fontSize="small" />,
        question: 'Kur atliekame matavimus ir pritaikymą?',
        answer: (
            <Typography component="span" sx={{ fontSize: 15, lineHeight: 1.7, color: 'text.secondary' }}>
                Dirbame{' '}
                <Link href={MAP_URL} target="_blank" rel="noopener noreferrer">
                    <Typography component="span" sx={{ textDecoration: 'underline', color: 'primary.main' }}>
                        {ADDRESS_TEXT}
                    </Typography>
                </Link>
                . Pagal poreikį organizuojame išvykstamuosius matavimus Lietuvoje (iš anksto suderinus sąlygas ir terminus).
            </Typography>
        ),
    },
];

export default function AboutFAQSection({
    title = 'Apie Medicinos centrą',
    accent = '#1E6EA1',
    bg = '#ffffff',
    items,
}: Props) {
    const data = items ?? makeItems(accent);

    return (
        <Box sx={{ width: '100vw', bgcolor: bg }}>
            {/* spacing keeper */}
            <Stack
                sx={{ maxWidth: '1200px', mx: 'auto', px: { lg: 4, md: 4, sm: 3, xs: 3 }, width: '100%' }}
                spacing={3}
            >
                <Stack />
            </Stack>

            {/* title */}
            <Typography
                variant="h1"
                color="primary.main"
                textAlign="center"
                textTransform="uppercase"
                pb={4}
                pt={4}
            >
                {title}
            </Typography>

            {/* content */}
            <Stack
                sx={{ maxWidth: 800, width: '100%', mx: 'auto', px: { lg: 4, md: 4, sm: 3, xs: 2 }, pb: 12 }}
                spacing={2.5}
            >
                {data.map((item) => (
                    <Accordion
                        key={item.id}
                        defaultExpanded={!!item.defaultExpanded}
                        disableGutters
                        square
                        elevation={0}
                        sx={{
                            borderRadius: 0,
                            border: '1px solid rgba(0,0,0,0.08)',
                            overflow: 'hidden',
                            '&:before': { display: 'none' },
                            boxShadow: item.defaultExpanded
                                ? '0 10px 24px rgba(0,0,0,0.08)'
                                : '0 4px 14px rgba(0,0,0,0.05)',
                            transition: 'box-shadow 180ms ease',
                            '&.Mui-expanded': {
                                boxShadow: '0 10px 24px rgba(0,0,0,0.08)',
                            },
                        }}
                    >
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon sx={{ color: accent }} />}
                            sx={{
                                bgcolor: '#FAFAFB',
                                '& .MuiAccordionSummary-content': { my: 2, alignItems: 'center' },
                            }}
                        >
                            <Stack direction="row" alignItems="center" spacing={1.25} sx={{ width: '100%' }}>
                                {item.icon && (
                                    <Box
                                        sx={{
                                            width: 32,
                                            height: 32,
                                            borderRadius: 1,
                                            display: 'grid',
                                            placeItems: 'center',
                                            backgroundColor: `${accent}14`,
                                            color: accent,
                                            flexShrink: 0,
                                        }}
                                    >
                                        {item.icon}
                                    </Box>
                                )}
                                <Typography component="h2" fontSize={18} fontWeight={700} color="primary.main">
                                    {item.question}
                                </Typography>
                            </Stack>
                        </AccordionSummary>

                        <AccordionDetails sx={{ p: { xs: 2, sm: 3 } }}>
                            {typeof item.answer === 'string' ? (
                                <Typography
                                    sx={{
                                        whiteSpace: 'pre-line',
                                        fontSize: 15,
                                        lineHeight: 1.7,
                                        color: 'text.secondary',
                                        textAlign: 'justify',
                                    }}
                                >
                                    {item.answer}
                                </Typography>
                            ) : (
                                item.answer
                            )}
                        </AccordionDetails>
                    </Accordion>
                ))}
            </Stack>
        </Box>
    );
}