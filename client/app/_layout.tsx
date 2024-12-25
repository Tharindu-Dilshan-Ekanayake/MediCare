import { View, Text } from 'react-native'
import React from 'react'
import UserContextProvider  from '../context/userContext'
import { Stack } from 'expo-router'

const _layout = () => {
  return (
    <UserContextProvider>
    <Stack
        screenOptions={{
            headerShown: false
        }}
    />
    </UserContextProvider>
  )
}

export default _layout