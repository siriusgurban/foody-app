import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { appWithTranslation } from 'next-i18next'
import { Provider } from 'react-redux'
import store from '../shared/store/store'
import '@fontsource/roboto'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ChakraProvider, extendTheme } from '@chakra-ui/react'
import { PagesProgressBar as ProgressBar } from 'next-nprogress-bar'

const queryClient = new QueryClient()

const theme = extendTheme({
  fonts: {
    heading: `'Roboto', sans-serif`,
    body: `'Roboto', sans-serif`,
  },
})

function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <Provider store={store}>
          <Component {...pageProps} />
          <ProgressBar height="4px" color="#C74FEB" />
        </Provider>
      </QueryClientProvider>
    </ChakraProvider>
  )
}

export default appWithTranslation(App)
