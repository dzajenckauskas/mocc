import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';

const MAP_EMBED_URL =
    'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2305.410968980601!2d25.22846307715486!3d54.7058184726852!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x46dd910ad5cccbf7%3A0x9243cf9b1dd1a978!2sLaisv%C4%97s%20pr.%2077%2C%20Vilnius%2006122!5e0!3m2!1slt!2slt!4v1739471110000!5m2!1slt!2slt';

export default function ContactMap() {
    return (
        <Stack
            spacing={3}
            sx={{
                width: '100%',
                // maxWidth: '1200px',
                mx: 'auto',
                // px: { lg: 4, md: 4, sm: 3, xs: 2 },
                // py: { lg: 8, md: 6, sm: 5, xs: 4 },
                alignItems: 'center',
            }}
        >
            {/* Title */}
            {/* <Typography
                variant="h2"
                fontSize={{ lg: 32, md: 28, sm: 26, xs: 24 }}
                fontWeight={700}
                color="primary.main"
                textAlign="center"
            >
                Mūsų buvimo vieta
            </Typography> */}

            {/* Map container */}
            <Box
                sx={{
                    width: '100%',
                    height: { lg: 420, md: 380, sm: 320, xs: 280 },
                    // borderRadius: 4,
                    overflow: 'hidden',
                    position: 'relative',
                    // boxShadow: '0 12px 32px rgba(0,0,0,0.2)',
                    // '&::after': {
                    //     content: '""',
                    //     position: 'absolute',
                    //     inset: 0,
                    //     background: 'rgba(0,0,0,0.2)',
                    //     opacity: 0,
                    //     transition: 'opacity 0.3s ease',
                    //     zIndex: 2,
                    // },
                    // '&:hover::after': {
                    //     opacity: 1,
                    // },
                }}
            >
                <iframe
                    src={MAP_EMBED_URL}
                    width="100%"
                    height="100%"
                    loading="lazy"
                    style={{ border: 0 }}
                    allowFullScreen
                    referrerPolicy="no-referrer-when-downgrade"
                />
            </Box>

            {/* Address info below the map */}
        </Stack>
    );
}
