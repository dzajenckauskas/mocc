import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
    components: {
        // MuiTextField: {
        //   styleOverrides: {
        //     root: {
        //       '& label': {
        //         color: '#fff',
        //       },
        //       '& label.Mui-focused': {
        //         color: '#fff',
        //       },
        //       '& .MuiInput-underline:after': {
        //         borderBottomColor: '#fff',
        //       },
        //       '& .MuiOutlinedInput-root': {
        //         '& fieldset': {
        //           borderColor: '#fff',
        //         },
        //         '&:hover fieldset': {
        //           borderColor: '#fff',
        //           borderWidth: '0.15rem',
        //         },
        //         '&.Mui-focused fieldset': {
        //           borderColor: '#fff',
        //         },
        //       },
        //     },
        //   },
        // },
    },
    typography: {
        h1: {
            fontSize: '25px',
            fontWeight: '600'
        },
        h2: {
            fontSize: '20px',
            fontWeight: '600'
        },
        h3: {
            fontSize: '18px',
            fontWeight: '600'
        },
        h4: {
            fontSize: '16px',
            fontWeight: '500'
        },
        h5: {
            fontSize: '14px',
            fontWeight: '500'
        },
        h6: {
            fontWeight: 300,
            fontSize: '12px',
            letterSpacing: '.5px',
        },
        body2: {
            fontSize: '12px'
        },
        body1: {
            fontSize: '14px',
        },
        button: {
            fontSize: '10px'
        }
    },
    palette: {
        primary: {
            main: '#1E6EA1',
        },
        secondary: {
            main: '#090909',
        },
        error: {
            main: '#ff2727ff'
        },
        info: {
            main: '#fff',
            dark: '#f2f2f2'
        }
    },

})
