import Stack from '@mui/material/Stack'
import React, { useState } from 'react'
import Typography from '@mui/material/Typography'
import Logo from '../Logo'
import Link from 'next/link'
import { useRouter } from 'next/router'
import TopNav from './TopNav'
import LocalPhoneOutlinedIcon from '@mui/icons-material/LocalPhoneOutlined';
import MailOutlinedIcon from '@mui/icons-material/MailOutlined';
import PlaceOutlinedIcon from '@mui/icons-material/PlaceOutlined';
import { theme } from '../theme'
import {
    COMPANY_ADDRESS,
    COMPANY_EMAIL,
    COMPANY_GMAPS_URL,
    COMPANY_PHONE_DISPLAY,
    COMPANY_PHONE_TEL,
} from '@/utils/contactInfo'

const Header = () => {
    const primaryColor = '#1E6EA1'
    const router = useRouter()
    const isActive = (href: string) => {
        const path = router.asPath || ''
        if (href.startsWith('#')) return path.includes(href)
        return path === href || path.startsWith(href + '/') || path.startsWith(href + '?')
    }

    const [openMenu, setOpenMenu] = useState(false)
    return (
        <>
            <Stack sx={{ zIndex: 999, position: 'relative', top: '0px', mb: { lg: '130px', md: '130px', sm: '80px', xs: '80px' } }}>
                <TopNav />
                <Stack direction={'row'} alignItems={'center'} sx={{
                    position: 'fixed', top: { lg: 30, md: 30, sm: 0, xs: 0 },
                    width: '100vw', height: { lg: '100px', md: '100px', sm: '80px', xs: '80px' }, backgroundColor: '#fff',
                    boxShadow: 'rgba(50, 50, 93, 0.15) 0px 6px 16px -5px, rgba(0, 0, 0, 0.01) 0px 5px 12px -8px'
                }}>
                    <Stack direction={'row'} justifyContent={'space-between'} sx={{ width: '100%', maxWidth: '1200px', mx: 'auto' }}>
                        <Stack width='300px' px={{ lg: 4, md: 4, sm: 3, xs: 3 }} height={'100%'} alignSelf={'center'}>
                            <Link passHref href={'/'} aria-label={'Medicinos ir ortopedijos centras'}>
                                <Logo icon primaryColor={primaryColor} />
                            </Link>
                        </Stack>
                        <Stack direction={'row'} spacing={5} p={4} sx={{ display: { xs: 'none', md: 'flex' } }}>
                            <Link passHref href={'/ortopedijos-technikos-katalogas'}>
                                <Typography fontSize={14} color={primaryColor} fontWeight={isActive('/ortopedijos-technikos-katalogas') ? 700 : 400}>Katalogas</Typography>
                            </Link>
                            <Link passHref href={'/ortopedijos-paslaugos'}>
                                <Typography fontSize={14} color={primaryColor} fontWeight={isActive('/ortopedijos-paslaugos') ? 700 : 400}>Paslaugos</Typography>
                            </Link>
                            {/* <Link passHref href={'/projektai/inovatyvus-slaunies-protezo-priemejas'}>
                                <Typography fontSize={14} color={primaryColor} fontWeight={isActive('/projektai/inovatyvus-slaunies-protezo-priemejas') ? 700 : 400}>Projektai</Typography>
                            </Link> */}
                            <Link passHref href={'/es-projektai'}>
                                <Typography fontSize={14} color={primaryColor} fontWeight={isActive('/es-projektai') ? 700 : 400}>ES projektai</Typography>
                            </Link>
                            {/* <Link passHref href={'/paslaugu-kainorastis'}>
                                <Typography fontSize={14} color={primaryColor} fontWeight={isActive('/paslaugu-kainorastis') ? 700 : 400}>Kainoraštis</Typography>
                            </Link> */}
                            {/* <Link passHref href={'#rekomendacijos'}>
                                <Typography fontSize={14} color={primaryColor} fontWeight={isActive('#rekomendacijos') ? 700 : 400}>Rekomendacijos</Typography>
                            </Link> */}
                            <Link passHref href={'#kontaktai'}>
                                <Typography fontSize={14} color={primaryColor} fontWeight={isActive('#kontaktai') ? 700 : 400}>Kontaktai</Typography>
                            </Link>
                        </Stack>
                        <Stack direction={'row'} px={{ lg: 4, md: 4, sm: 3, xs: 3 }} sx={{ display: { xs: 'flex', md: 'none', cursor: 'pointer' } }} alignSelf={'center'}>
                            <div className={`hamburger ${openMenu ? 'is-active' : ''}`} id="hamburger" onClick={() => { setOpenMenu(!openMenu) }}>
                                <span className='line'></span>
                                <span className='line'></span>
                                <span className='line'></span>
                            </div>
                        </Stack>
                    </Stack>
                </Stack>
                {openMenu && <Stack sx={{
                    display: { xs: 'flex', md: 'none' },
                    position: 'fixed', top: '80px',
                    zIndex: -1,
                    width: '100vw',
                    minHeight: '100px', backgroundColor: '#fff',
                    // borderTop: '1px solid #1E6EA1',
                    boxShadow: ' rgba(50, 50, 93, 0.15) 0px 7px 11px -5px, rgba(0, 0, 0, 0.13) 0px 5px 10px -8px'
                }}>
                    <Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'}>
                        <Stack direction={'column'} spacing={3} px={3} py={6}>
                            <Link onClick={() => { setOpenMenu(!openMenu) }} passHref href={'/ortopedijos-technikos-katalogas'}>
                                <Typography fontSize={14} textTransform={'uppercase'} color={primaryColor} fontWeight={isActive('/ortopedijos-technikos-katalogas') ? 800 : 600}>Katalogas</Typography>
                            </Link>
                            <Link onClick={() => { setOpenMenu(!openMenu) }} passHref href={'/ortopedijos-paslaugos'}>
                                <Typography fontSize={14} textTransform={'uppercase'} color={primaryColor} fontWeight={isActive('/ortopedijos-paslaugos') ? 800 : 600}>Paslaugos</Typography>
                            </Link>
                            {/* <Link onClick={() => { setOpenMenu(!openMenu) }} passHref href={'/projektai/inovatyvus-slaunies-protezo-priemejas'}>
                                <Typography fontSize={14} textTransform={'uppercase'} color={primaryColor} fontWeight={isActive('/projektai/inovatyvus-slaunies-protezo-priemejas') ? 800 : 600}>Projektai</Typography>
                            </Link> */}
                            <Link onClick={() => { setOpenMenu(!openMenu) }} passHref href={'/es-projektai'}>
                                <Typography fontSize={14} textTransform={'uppercase'} color={primaryColor} fontWeight={isActive('/es-projektai') ? 800 : 600}>ES projektai</Typography>
                            </Link>
                            {/* <Link onClick={() => { setOpenMenu(!openMenu) }} passHref href={'/paslaugu-kainorastis'}>
                                <Typography fontSize={14} textTransform={'uppercase'} color={primaryColor} fontWeight={isActive('/paslaugu-kainorastis') ? 800 : 600}>Kainoraštis</Typography>
                            </Link> */}
                            {/* <Link onClick={() => { setOpenMenu(!openMenu) }} passHref href={'#rekomendacijos'}>
                                <Typography fontSize={14} textTransform={'uppercase'} color={primaryColor} fontWeight={isActive('#rekomendacijos') ? 800 : 600}>Rekomendacijos</Typography>
                            </Link> */}
                            <Link onClick={() => { setOpenMenu(!openMenu) }} passHref href={'#contacts'}>
                                <Typography fontSize={14} textTransform={'uppercase'} color={primaryColor} fontWeight={isActive('#contacts') ? 800 : 600}>Kontaktai</Typography>
                            </Link>
                        </Stack>

                    </Stack>
                    <Stack direction={'column'} mt={1} spacing={3} pb={6} px={3} justifyContent={'flex-start'} width={'100%'}>
                        <Link href={`tel:${COMPANY_PHONE_TEL}`} passHref>
                            <Stack direction={'row'} spacing={1} sx={{ cursor: 'pointer' }} alignItems={'center'}>
                                <LocalPhoneOutlinedIcon fontSize='small' sx={{ height: '18px', color: theme.palette.secondary.main, marginRight: '-5px' }} />
                                <Typography fontWeight={300} color={theme.palette.secondary.main} fontSize={'13px'} className="underlineOnHover">
                                    {COMPANY_PHONE_DISPLAY}
                                </Typography>
                            </Stack>
                        </Link>
                        <Link href={`mailto:${COMPANY_EMAIL}`} passHref>
                            <Stack direction={'row'} spacing={1} sx={{ cursor: 'pointer' }} alignItems={'center'}>
                                <MailOutlinedIcon fontSize='small' sx={{ height: '18px', color: theme.palette.secondary.main, marginRight: '-5px' }} />
                                <Typography fontWeight={300} color={theme.palette.secondary.main} fontSize={'13px'} className="underlineOnHover">
                                    {COMPANY_EMAIL}
                                </Typography>
                            </Stack>
                        </Link>
                        <Link href={COMPANY_GMAPS_URL} passHref target={'_blank'}>
                            <Stack direction={'row'} spacing={1} sx={{ cursor: 'pointer' }} alignItems={'center'}>
                                <PlaceOutlinedIcon fontSize='small' sx={{ height: '19px', color: theme.palette.secondary.main, marginRight: '-5px' }} />
                                <Typography fontWeight={300} color={theme.palette.secondary.main} fontSize={'13px'} className="underlineOnHover">
                                    {COMPANY_ADDRESS}
                                </Typography>
                            </Stack>
                        </Link>
                    </Stack>
                </Stack>}
            </Stack></>
    )
}

export default Header
