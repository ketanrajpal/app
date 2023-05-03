import '@/styles/main.scss'
import type { AppProps } from 'next/app'
import { ApolloProvider } from '@apollo/client'
import client from '../graphql/client'
import { Provider } from 'react-redux'
import { store } from '@/redux/store'

export default function App({ Component, pageProps }: AppProps) {
    return (
        <Provider store={store}>
            <ApolloProvider client={client}>
                <Component {...pageProps} />
            </ApolloProvider>
        </Provider>
    )
}
