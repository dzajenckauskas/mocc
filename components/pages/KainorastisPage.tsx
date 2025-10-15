import { PricelistsResponseType } from '@/app/pricelists/PricelistTypes'
import { ReviewsResponseType } from '@/app/services/ReviewTypes'
import Layout from '../Layout'
import { getColors } from '../layout/colors'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import Accordion from '@mui/material/Accordion'
import AccordionSummary from '@mui/material/AccordionSummary'
import AccordionDetails from '@mui/material/AccordionDetails'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import Chip from '@mui/material/Chip'
import Divider from '@mui/material/Divider'
import { useMemo, useState } from 'react'
import Breadcrumbs, { Crumb } from '../shared/Breadcrumbs'

type Props = {
    reviews: ReviewsResponseType;
    pricelists: PricelistsResponseType;
}

const fmtPrice = (v?: number | string) =>
    (v ?? v === 0) ? `${v}€` : '—'

const KainorastisPage = ({ reviews, pricelists }: Props) => {
    const colors = getColors()
    const groups = useMemo(() => pricelists?.data ?? [], [pricelists?.data])
    const [expanded, setExpanded] = useState<string | false>(
        groups.length ? `grp-${groups[0].id}` : false // ✅ first open by default
    )

    const handleChange =
        (panel: string) => (_e: React.SyntheticEvent, isExpanded: boolean) =>
            setExpanded(isExpanded ? panel : false)


    const crumbs: Crumb[] = [
        { label: 'Kainorastis' },
    ]
    return (
        <Layout reviews={reviews}>
            <Stack
                sx={{
                    maxWidth: '1200px',
                    mx: 'auto',
                    px: { lg: 4, md: 4, sm: 3, xs: 3 },
                    width: '100%',
                }}
                spacing={3}
            >

                <Breadcrumbs items={crumbs} />
            </Stack>
            <Typography variant='h1' color={'primary.main'} textAlign={'center'} textTransform={'uppercase'}
                pb={4} pt={2}>
                {"Ortopedijos paslaugų kainoraštis"}
            </Typography>
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
                {groups.map((group) => {
                    const gid = `grp-${group.id}`
                    const lines = group.attributes.serviceLines ?? []
                    const notes = group.attributes.notes ?? []

                    return (
                        <Accordion
                            key={gid}
                            expanded={expanded === gid}
                            onChange={handleChange(gid)}
                            disableGutters
                            square
                            elevation={0}
                            sx={{
                                borderRadius: 0,
                                border: '1px solid rgba(0,0,0,0.08)',
                                overflow: 'hidden',
                                '&:before': { display: 'none' },
                                boxShadow:
                                    expanded === gid
                                        ? '0 10px 24px rgba(0,0,0,0.08)'
                                        : '0 4px 14px rgba(0,0,0,0.05)',
                            }}
                        >
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon sx={{ color: colors.primary }} />}
                                sx={{
                                    bgcolor: '#FAFAFB',
                                    '& .MuiAccordionSummary-content': {
                                        my: 2,
                                        alignItems: 'center',
                                    },
                                }}
                            >
                                <Stack
                                    direction="row"
                                    alignItems="center"
                                    justifyContent="space-between"
                                    sx={{ width: '100%' }}
                                >
                                    <Typography
                                        component="h2"
                                        fontSize={18}
                                        fontWeight={700}
                                        color="primary.main"
                                    >
                                        {group.attributes.title}
                                    </Typography>

                                    {/* <Chip
                                        label={`${lines.length} įrašai`}
                                        size="small"
                                        sx={{ bgcolor: 'primary.light', color: 'primary.contrastText' }}
                                    /> */}
                                </Stack>
                            </AccordionSummary>

                            <AccordionDetails sx={{ p: { xs: 2, sm: 3 } }}>
                                <Stack divider={<Divider flexItem sx={{ my: 1.25 }} />} spacing={1.25}>
                                    {lines.map((line) => (
                                        <Stack
                                            key={line.id}
                                            direction={{ xs: 'column', sm: 'row' }}
                                            alignItems={{ xs: 'flex-start', sm: 'center' }}
                                            justifyContent="space-between"
                                            spacing={{ xs: 0.5, sm: 1 }}
                                        >
                                            {/* Left: title + description */}
                                            <Stack sx={{ flex: 1, pr: { sm: 2 } }} spacing={0.25}>
                                                <Typography
                                                    fontSize={16}
                                                    // fontWeight={400}
                                                    color="secondary.main"
                                                    lineHeight="20px"
                                                >
                                                    {line.title}
                                                </Typography>

                                                {(line.description || line.duration) && (
                                                    <Typography
                                                        variant='caption'
                                                        // fontSize={12}
                                                        color={colors.grey}
                                                    // lineHeight="16px"
                                                    >
                                                        {line.description}
                                                        {/* {line.description && line.duration ? ' • ' : ''}
                                                        {line.duration} */}
                                                    </Typography>
                                                )}
                                            </Stack>

                                            {/* Middle: duration chip (desktop) */}
                                            {line?.duration && (
                                                <Chip
                                                    label={line.duration}
                                                    size="small"
                                                    variant="outlined"
                                                    sx={{
                                                        display: { xs: 'none', sm: 'inline-flex' },
                                                        mr: 1,
                                                        color: colors.grey,
                                                        borderColor: 'rgba(0,0,0,0.15)',
                                                    }}
                                                />
                                            )}

                                            {/* Right: price */}
                                            <Typography
                                                fontSize={15}
                                                fontWeight={700}
                                                color="primary.main"
                                                sx={{ minWidth: { sm: 88 }, textAlign: { xs: 'left', sm: 'right' } }}
                                            >
                                                {fmtPrice(line.price)}
                                            </Typography>
                                        </Stack>
                                    ))}
                                </Stack>

                                {/* Notes (only if present and unique vs previous group) */}
                                {!!notes?.length && (
                                    <Stack pt={2.5} spacing={0.75}>
                                        {notes.map((note) => (
                                            <Typography
                                                key={note.id}
                                                fontSize={12}
                                                lineHeight="16px"
                                                color={colors.primary}
                                                fontStyle="italic"
                                            >
                                                {note.text}
                                            </Typography>
                                        ))}
                                    </Stack>
                                )}
                            </AccordionDetails>
                        </Accordion>
                    )
                })}
            </Stack>
        </Layout>
    )
}

export default KainorastisPage