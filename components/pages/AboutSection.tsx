// components/about/AboutFAQSection.tsx
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import VisibilityIcon from '@mui/icons-material/Visibility';
import FlagIcon from '@mui/icons-material/Flag';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import VerifiedIcon from '@mui/icons-material/Verified';
import PhoneInTalkIcon from '@mui/icons-material/PhoneInTalk';
import HomeRepairServiceIcon from '@mui/icons-material/HomeRepairService';
import BuildCircleIcon from '@mui/icons-material/BuildCircle';
import EventNoteIcon from '@mui/icons-material/EventNote';
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
    title?: string;      // section heading
    accent?: string;     // icon color
    bg?: string;         // full-width background color
    items?: FAQItem[];   // optional override list
};

// 🔧 Centralize contact info here
const PHONE_RAW = '+37060792111';
const PHONE_DISPLAY = '+370 607 92111';
const EMAIL = 'info@mocc.lt';
const ADDRESS_TEXT = 'Laisvės pr. 77, Vilnius';
const MAP_URL = 'https://goo.gl/maps/RVoW7FDnbvK3EUiBA';

const makeItems = (accent: string): FAQItem[] => [
    {
        id: 'vision',
        icon: <VisibilityIcon fontSize="small" />,
        question: 'Mūsų vizija',
        answer:
            'Būti profesionalia, dinamiška ir konkurencinga ortopedijos techninių priemonių gamybos bei prekybos įmone.',
        defaultExpanded: true,
    },
    {
        id: 'mission',
        icon: <FlagIcon fontSize="small" />,
        question: 'Įmonės misija',
        answer:
            'Aprūpinti gyventojus atsakingai ir kokybiškai pagamintomis ortopedijos techninėmis priemonėmis, užtikrinančiomis aukštesnę gyvenimo kokybę.',
    },
    {
        id: 'coverage',
        icon: <LocalHospitalIcon fontSize="small" />,
        question: 'Klinikos veikla',
        answer:
            'Bendradarbiaujame su medicinos įstaigomis, pacientus konsultuojame ir jų gyvenamosiose vietose. Priemonės užsakomos, gaminamos ir pritaikomos beveik visoje Lietuvoje. Naudojamos kokybiškos, saugios žaliavos – gaminiai gerai vertinami gydytojų ir pacientų.',
    },
    {
        id: 'quality',
        icon: <VerifiedIcon fontSize="small" />,
        question: 'Kokybės atitiktys ir kompensavimas',
        answer:
            'Gaminiai aprobuoti LR SAM, atitinka Europos direktyvos 93/42/EEB ir Lietuvos medicinos normos MN 4:2009 reikalavimus. Taikomi garantiniai įsipareigojimai. Esame sudarę sutartį su VLK – priklausomai nuo diagnozės, gaminiai ir konsultacijos gali būti visiškai arba iš dalies kompensuojami.',
    },

    // ✅ Answers updated with contacts
    {
        id: 'booking',
        icon: <PhoneInTalkIcon fontSize="small" />,
        question: 'Kaip registruotis konsultacijai?',
        answer: (
            <Typography component="span" sx={{ fontSize: 15, lineHeight: 1.7, color: 'text.secondary' }}>
                Vizitus deriname individualiai. Skambinkite{' '}
                <Link href={`tel:${PHONE_RAW}`} passHref>
                    <Typography component="span" sx={{ textDecoration: 'underline', color: 'primary.main' }}>
                        {PHONE_DISPLAY}
                    </Typography>
                </Link>
                {' '}arba rašykite{' '}
                <Link href={`mailto:${EMAIL}`} passHref>
                    <Typography component="span" sx={{ textDecoration: 'underline', color: 'primary.main' }}>
                        {EMAIL}
                    </Typography>
                </Link>
                {' '}– parinksime Jums patogiausią laiką pas reikiamą specialistą.
            </Typography>
        ),
    },
    {
        id: 'previsit',
        icon: <EventNoteIcon fontSize="small" />,
        question: 'Kaip pasiruošti vizitui?',
        answer: (
            <Typography component="span" sx={{ fontSize: 15, lineHeight: 1.7, color: 'text.secondary' }}>
                Atsineškite turimus medicininius dokumentus (išrašus, tyrimus, siuntimą). Jei naudojate ortopedinę priemonę, pasiimkite ją vertinimui.
                Dėl specifinių klausimų prieš vizitą galite pasiteirauti telefonu{' '}
                <Link href={`tel:${PHONE_RAW}`} passHref>
                    <Typography component="span" sx={{ textDecoration: 'underline', color: 'primary.main' }}>
                        {PHONE_DISPLAY}
                    </Typography>
                </Link>
                {' '}arba el. paštu{' '}
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
        id: 'custom_made',
        icon: <BuildCircleIcon fontSize="small" />,
        question: 'Individuali gamyba: kiek trunka ir kaip vyksta?',
        answer: (
            <Typography component="span" sx={{ fontSize: 15, lineHeight: 1.7, color: 'text.secondary' }}>
                Po konsultacijos atliekami matavimai ar nuskaitymai, parenkamos medžiagos. Gamyba dažniausiai trunka nuo kelių dienų iki kelių savaičių
                (pagal priemonės sudėtingumą). Pritaikymo metu sureguliuojame, apmokome naudotis ir suplanuojame kontrolinį vizitą. Jei norite
                pasitarti, skambinkite{' '}
                <Link href={`tel:${PHONE_RAW}`} passHref>
                    <Typography component="span" sx={{ textDecoration: 'underline', color: 'primary.main' }}>
                        {PHONE_DISPLAY}
                    </Typography>
                </Link>
                .
            </Typography>
        ),
    },
    {
        id: 'repairs',
        icon: <HomeRepairServiceIcon fontSize="small" />,
        question: 'Garantija, remontas ir priežiūra',
        answer: (
            <Typography component="span" sx={{ fontSize: 15, lineHeight: 1.7, color: 'text.secondary' }}>
                Visoms priemonėms taikomi garantiniai įsipareigojimai. Atliekame priežiūrą ir remontą, keičiame detales, patariame dėl saugaus naudojimo
                ir periodinių patikrų. Kreipkitės telefonu{' '}
                <Link href={`tel:${PHONE_RAW}`} passHref>
                    <Typography component="span" sx={{ textDecoration: 'underline', color: 'primary.main' }}>
                        {PHONE_DISPLAY}
                    </Typography>
                </Link>
                {' '}arba el. paštu{' '}
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
        id: 'locations',
        icon: <PlaceIcon fontSize="small" />,
        question: 'Kur teikiamos paslaugos?',
        answer: (
            <Typography component="span" sx={{ fontSize: 15, lineHeight: 1.7, color: 'text.secondary' }}>
                Konsultuojame klinikoje{' '}
                <Link href={MAP_URL} target="_blank" rel="noopener noreferrer">
                    <Typography component="span" sx={{ textDecoration: 'underline', color: 'primary.main' }}>
                        {ADDRESS_TEXT}
                    </Typography>
                </Link>
                , o prireikus organizuojame vizitus regionuose ar paciento namuose (iš anksto suderinus). Dėl vizitų skambinkite{' '}
                <Link href={`tel:${PHONE_RAW}`} passHref>
                    <Typography component="span" sx={{ textDecoration: 'underline', color: 'primary.main' }}>
                        {PHONE_DISPLAY}
                    </Typography>
                </Link>
                .
            </Typography>
        ),
    },
];

export default function AboutFAQSection({
    title = 'Apie mūsų kliniką',
    accent = '#1E6EA1',
    bg = '#ffffff',
    items,
}: Props) {
    const data = items ?? makeItems(accent);

    return (
        <Box sx={{ width: '100vw', bgcolor: bg }}>
            {/* top container (kept for page spacing alignment) */}
            <Stack
                sx={{
                    maxWidth: '1200px',
                    mx: 'auto',
                    px: { lg: 4, md: 4, sm: 3, xs: 3 },
                    width: '100%',
                }}
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
                sx={{
                    maxWidth: 800,
                    width: '100%',
                    mx: 'auto',
                    px: { lg: 4, md: 4, sm: 3, xs: 2 },
                    pb: 12,
                }}
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
                                '& .MuiAccordionSummary-content': {
                                    my: 2,
                                    alignItems: 'center',
                                },
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
                            {/* answers already styled with Typography inside items */}
                            {typeof item.answer === 'string' ? (
                                <Typography sx={{ fontSize: 15, lineHeight: 1.7, color: 'text.secondary', textAlign: 'justify' }}>
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