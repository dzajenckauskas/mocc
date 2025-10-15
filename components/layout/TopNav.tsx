import LocalPhoneOutlinedIcon from '@mui/icons-material/LocalPhoneOutlined';
import MailOutlinedIcon from '@mui/icons-material/MailOutlined';
import PlaceOutlinedIcon from '@mui/icons-material/PlaceOutlined';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Link from 'next/link';
import {
    COMPANY_ADDRESS,
    COMPANY_EMAIL,
    COMPANY_GMAPS_URL,
    COMPANY_PHONE_DISPLAY,
    COMPANY_PHONE_TEL,
} from '@/utils/contactInfo';

const TopNav = () => {
    return (
        <Stack direction={'row'} justifyContent={'center'} alignItems={'center'}
            sx={{
                backgroundColor: '#1E6EA1', height: 30, position: 'fixed', top: '0px', width: '100vw',
                display: { xs: 'none', sm: 'none', md: 'flex', lg: 'flex' }, zIndex: 999
            }}>
            <Stack direction={'row'} mt={1} spacing={5} pb={1} px={5} maxWidth={'1200px'} justifyContent={'flex-start'} width={'100%'}>
                <Link href={`tel:${COMPANY_PHONE_TEL}`} passHref>
                    <Stack direction={'row'} spacing={1} sx={{ cursor: 'pointer' }} alignItems={'center'}>
                        <LocalPhoneOutlinedIcon fontSize='small' sx={{ height: '18px', marginRight: '-5px' }} />
                        <Typography fontWeight={300} color={'#fff'} fontSize={'13px'} className="underlineOnHover">
                            {COMPANY_PHONE_DISPLAY}
                        </Typography>
                    </Stack>
                </Link>
                <Link href={`mailto:${COMPANY_EMAIL}`} passHref>
                    <Stack direction={'row'} spacing={1} sx={{ cursor: 'pointer' }} alignItems={'center'}>
                        <MailOutlinedIcon fontSize='small' sx={{ height: '18px', marginRight: '-5px' }} />
                        <Typography fontWeight={300} color={'#fff'} fontSize={'13px'} className="underlineOnHover">
                            {COMPANY_EMAIL}
                        </Typography>
                    </Stack>
                </Link>
                <Link href={COMPANY_GMAPS_URL} passHref target={'_blank'}>
                    <Stack direction={'row'} spacing={1} sx={{ cursor: 'pointer' }} alignItems={'center'}>
                        <PlaceOutlinedIcon fontSize='small' sx={{ height: '19px', marginRight: '-5px' }} />
                        <Typography fontWeight={300} color={'#fff'} fontSize={'13px'} className="underlineOnHover">
                            {COMPANY_ADDRESS}
                        </Typography>
                    </Stack>
                </Link>
            </Stack>
        </Stack>
    )
}

export default TopNav
