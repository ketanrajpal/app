import { ApolloClient, InMemoryCache, HttpLink, from } from '@apollo/client'
import { onError } from '@apollo/client/link/error'

const error = onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors) {
        console.log('graphQLErrors', graphQLErrors)
    }
    if (networkError) {
        console.log('networkError', networkError)
    }
})

const link = new HttpLink({ uri: 'https://localhost:4000/graphql' })

const client = new ApolloClient({
    link: from([error, link]),
    cache: new InMemoryCache(),
})

export default client
