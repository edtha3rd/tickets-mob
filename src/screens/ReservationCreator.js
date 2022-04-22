import { Button, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { gql, useMutation } from '@apollo/client'
import Constants from 'expo-constants'
import Loading from '../components/Loading'
import ReservationForm from '../components/ReservationForm'

const ReservationCreator = (props) => {
  const params = props.route.params.params
  //   console.log(props)
  const NEW_RESERVATION = gql`
    mutation newReservation(
      $sessionId: ID!
      $totalPrice: Int!
      $seatSelected: [String]
    ) {
      newReservation(
        sessionId: $sessionId
        totalPrice: $totalPrice
        seatSelected: $seatSelected
      ) {
        reservedBy {
          username
        }
        seat
        sessionDetails {
          location {
            username
          }
          movie {
            title
          }
          screeningDay
          screeningTime
          quality
        }
        totalPrice
        confirmationCode
        id
      }
    }
  `

  //   React.useEffect(() => {
  // newReservation({
  //   variables: {
  //     sessionId: params.orderDetails.id,
  //     seat: params.mySeats,
  //     totalPrice: params.total,
  //   },
  // })
  const [newReservation, { loading, error }] = useMutation(NEW_RESERVATION, {
    onCompleted: (data) => {
      //   console.log('completed')
      props.navigation.navigate('SessionUpdater', {
        data: data.newReservation,
        params: params,
      })
    },
  })
  React.useEffect(() => {
    console.log('using effect')
    newReservation({
      variables: {
        sessionId: params.orderDetails.id,
        seatSelected: params.mySeats,
        totalPrice: params.total,
      },
    })
  }, [])
  if (loading) <Loading />
  if (error) alert(`An error has occured ${error.message}`)
  //   })
  return (
    <View>
      <Loading />
      {/* <ReservationForm
        action={newReservation}
        params={params}
        navigation={props.navigation}
      /> */}
    </View>
  )
}

export default ReservationCreator

const styles = StyleSheet.create({})
