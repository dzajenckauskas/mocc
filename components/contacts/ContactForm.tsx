import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import React, { useState } from 'react'
import { getColors } from '../layout/colors'
import * as yup from 'yup';
import { SubmitHandler, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { ContactFormType } from '@/app/contact-form/ContactFormType'

const ContactForm = () => {
    const colors = getColors()
    const [completed, setCompleted] = useState(false)
    const onSubmit = async (args: ContactFormType) => {
        // use hardened HTTP wrapper and a relative path
        const { post } = await import('@/utils/http')
        const response = await post('/api/contact-forms', {
            data: {
                email: args.email,
                name: args.name,
                message: args.message,
            },
        })
        console.log(response)
        setCompleted(true)
        reset()
    }

    const contactFormSchema = yup.object({
        email: yup.string().email(`Neteisingas el. pašto adresas`).required(`Įveskite el. pašto adresą`),
        message: yup.string().required(`Žinutė yra privaloma`),
        name: yup.string().required(`Vardas yra privalomas`),
    }).required();

    const form = useForm<ContactFormType>({
        resolver: yupResolver(contactFormSchema as any),
    });

    const { register, handleSubmit, formState: { errors }, reset } = form

    const submit: SubmitHandler<ContactFormType> = async (
        args: ContactFormType
    ) => {
        onSubmit(args)
    };

    return (
        <Stack width={{ lg: '50%', md: '50%', sm: '50%', xs: '100%' }} pt={{ lg: 2, md: 2, sm: 2, xs: 8 }}>
            <form onSubmit={handleSubmit(submit)} noValidate>
                <Typography color={colors.white} variant='h3'>
                    Palikite mums žinutę
                </Typography>
                <Typography color={colors.white} fontSize={14} fontWeight={300} pt={1} lineHeight={'18px'}>
                    Vienas iš būdų gauti reikiamą informaciją, bei užsiregistruoti vizitui - susisiekti el. paštu
                </Typography>
                <Stack spacing={2} py={2}>
                    <Stack direction={'row'} spacing={2}>
                        <TextField
                            required
                            color={'info'} variant={'outlined'} InputProps={{ sx: { color: colors.white } }}
                            InputLabelProps={{ sx: { color: colors.white } }}
                            fullWidth label='Vardas'
                            {...register("name")} error={!!errors.name?.message}
                            helperText={errors.name?.message} />

                        <TextField
                            required
                            color={'info'} variant={'outlined'} InputProps={{ sx: { color: colors.white } }}
                            InputLabelProps={{ sx: { color: colors.white } }}
                            fullWidth label='El. paštas'
                            {...register("email")} error={!!errors.email?.message}
                            helperText={errors.email?.message} />
                    </Stack>
                    <TextField
                        required
                        color={'info'} variant={'outlined'} InputProps={{ sx: { color: colors.white } }}
                        InputLabelProps={{ sx: { color: colors.white } }}
                        fullWidth label='Žinutės tekstas' rows={6} multiline
                        {...register("message")} error={!!errors.message?.message}
                        helperText={errors.message?.message} />
                </Stack>

                <Button type={'submit'} variant='outlined' fullWidth
                    sx={{
                        color: colors.white, fontWeight: 600, border: '2px solid #fff',
                        fontSize: 14, backgroundColor: 'transparent', ':hover': {
                            color: colors.primary,
                            backgroundColor: colors.white, border: '2px solid #fff',
                        }
                    }}>
                    SIŲSTI ŽINUTĘ
                </Button>

                {completed &&
                    <Typography fontWeight={300} pt={1}>
                        Žinutė išsiųsta! Su Jumis susisieksime artimiausiu metu.
                    </Typography>
                }
            </form>
        </Stack>
    )
}

export default ContactForm
