import { View, Text } from 'react-native'
import React from 'react'
import Layout from './layout'

const Book = () => {
  return (
    <View className=''>
      <Text>book</Text>
     
        <View className='absolute w-full bottom-6'>
            <Layout />
        </View>
    </View>
  )
}

export default Book