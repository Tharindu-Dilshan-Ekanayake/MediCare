import { View, Text } from 'react-native'
import React from 'react'
import Layout from './layout'

export default function profilesettings() {
  return (
    <View className='h-full '>
      <Text>profilesettings</Text>
      
      <View className='absolute w-full bottom-6'>
          <Layout />
      </View>
    </View>
  )
}