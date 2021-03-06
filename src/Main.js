import { Text, StyleSheet, View } from 'react-native'
import React, { useEffect } from 'react'
import Screens from './screens'
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  HttpLink,
} from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import * as SecureStore from 'expo-secure-store'
import { StripeProvider } from '@stripe/stripe-react-native'
import getEnvVars from '../config'
const { STRIPE_PUBLISHABLE_KEY } = getEnvVars()

const link = new HttpLink({
  uri: 'http://192.168.0.102:8080/tickets-api',
})

const authLink = setContext(async (_, { headers }) => {
  return {
    headers: {
      ...headers,
      authorization: (await SecureStore.getItemAsync('userToken')) || '',
    },
  }
})

const client = new ApolloClient({
  link: authLink.concat(link),
  cache: new InMemoryCache(),
})

const Main = () => {
  return (
    <ApolloProvider client={client}>
      <StripeProvider publishableKey={STRIPE_PUBLISHABLE_KEY}>
        <Screens />
      </StripeProvider>
    </ApolloProvider>
  )
}

export default Main

const styles = StyleSheet.create({})
