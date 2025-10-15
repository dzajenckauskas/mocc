import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import { getColors } from './layout/colors'
import React from 'react'
import Logo from './Logo'
import LocalPhoneOutlinedIcon from '@mui/icons-material/LocalPhoneOutlined';
import MailOutlinedIcon from '@mui/icons-material/MailOutlined';
import PlaceOutlinedIcon from '@mui/icons-material/PlaceOutlined';
import Link from 'next/link'
import ContactForm from './contacts/ContactForm'
const Footer = () => {
    const colors = getColors()

    return (
        <Stack sx={{ width: '100%', backgroundColor: colors.primary, }} id={"kontaktai"}>
            <Stack sx={{
                minHeight: '100px', width: '100%', backgroundColor: colors.primary, maxWidth: '1200px', mx: 'auto'
            }} pt={6} pb={2} px={{ lg: 4, md: 4, sm: 3, xs: 3 }} >

                <Stack >
                    <Stack height={'100%'} maxWidth={200} direction={'row'}>
                        <Logo width={'200px'} icon primaryColor={'#fff'} />
                    </Stack>
                    <Stack height={'100%'} direction={{ sm: 'row', xs: 'column' }} spacing={2} mt={2} justifyContent={'space-between'} >
                        <Stack spacing={1}>
                            <Typography fontSize={16} mt={2} color={'#fff'} fontWeight={900}>UAB „MEDICINOS CENTRAS“</Typography>
                            <Link href={`https://goo.gl/maps/RVoW7FDnbvK3EUiBA`} passHref target={'_blank'}>
                                <Stack direction={'row'} spacing={2} sx={{ cursor: 'pointer' }} alignItems={'center'}>
                                    <PlaceOutlinedIcon fontSize='small' color={'info'} sx={{ height: '19px', marginRight: '-5px' }} />
                                    <Typography fontWeight={300} color={'#fff'} fontSize={'14px'} className="underlineOnHover">
                                        {'Laisvės pr. 77, Vilnius'}
                                    </Typography>
                                </Stack>
                            </Link>
                            <Link href={`tel:${'+370 607 921 11'}`} passHref>
                                <Stack direction={'row'} spacing={2} sx={{ cursor: 'pointer' }} alignItems={'center'}>
                                    <LocalPhoneOutlinedIcon fontSize='small' color={'info'} sx={{ height: '18px', marginRight: '-5px' }} />
                                    <Typography fontWeight={300} color={'#fff'} fontSize={'14px'} className="underlineOnHover">
                                        {'+370 607 92111'}
                                    </Typography>
                                </Stack>
                            </Link>
                            <Link href={`mailto:${'info@mocc.lt'}`} passHref>
                                <Stack direction={'row'} spacing={2} sx={{ cursor: 'pointer' }} alignItems={'center'}>
                                    <MailOutlinedIcon fontSize='small' color={'info'} sx={{ height: '18px', marginRight: '-5px' }} />
                                    <Typography fontWeight={300} color={'#fff'} fontSize={'14px'} className="underlineOnHover">
                                        {'info@mocc.lt'}
                                    </Typography>
                                </Stack>
                            </Link>
                        </Stack>
                        <ContactForm />
                    </Stack>
                </Stack>
                <Stack mt={20}>
                    <Stack direction={'row'} textAlign={'left'} justifyContent={{ sm: 'flex-start', xs: 'center' }}>
                        <Typography fontSize={12} color={'#fff'} fontWeight={200}>
                            UAB Ortopedijos paslaugų klinika © {new Date().getFullYear()}
                        </Typography>
                    </Stack>
                </Stack>
            </Stack>
        </Stack>
    )
}

export default Footer
