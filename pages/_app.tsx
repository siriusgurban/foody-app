// @ts- nocheck

import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { appWithTranslation } from 'next-i18next'
import { Provider } from 'react-redux'
import store from '../shared/store/store'

function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  )
}

export default appWithTranslation(App)
