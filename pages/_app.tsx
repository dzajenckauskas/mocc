import { theme } from '@/components/theme';
import '@/styles/globals.css';
import { ThemeProvider } from '@mui/material/styles';
import type { AppProps } from 'next/app';
import { Roboto } from 'next/font/google';

const roboto = Roboto({
  weight: ['400', '700'],
  style: ['normal'],
  subsets: ['latin'],
})


function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <style jsx global>{`
      html {
        font-family: ${roboto.style.fontFamily};
      }
    `}</style>
      <ThemeProvider theme={theme}>
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  )
}

export default App
