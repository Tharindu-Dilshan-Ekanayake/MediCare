import Head from '@/components/head'
import React, { useState } from 'react'
import { View, Text, Image, TextInput, TouchableOpacity, ScrollView } from 'react-native'
import Booking from '../components/booking'
import Layout from './layout'

export default function Doctor() {
  const [search, setSearch] = useState('')

  return (
    <View className='h-full bg-[#f2f2f2]'>
      <View className='mt-12'>
        <Head />
        <View className='px-8 py-3'>
          {/* Channel Your Doctor */}
          <Text className='text-xl text-[#19191A] font-bold text-center pb-2 mb-2'>Channel Your Doctor</Text>
          
          {/* Search bar */}
          <TextInput
            className='h-12 mt-4 border-[#298D80] border-2 rounded-lg text-[#19191A]  px-4'
            placeholder="Search doctors..."
            placeholderTextColor="#D1D5DB"
            value={search}
            onChangeText={setSearch}
          />
        </View>

        {/* Scrollable Doctor List */}
        <ScrollView className='h-[560px] mt-5 p-2 '>
          {/* Doctor 1 */}
          <View className='flex flex-row px-8 bg-[#298D80] justify-between mt-2 rounded-lg items-center mx-4'>
            <Image
              source={require('../../assets/images/bg/Signup.webp')}
              className='w-[100px] h-[200px]'
            />
            <View className='flex flex-col items-center text-white'>
              <Text className='font-bold text-white'>Dr. John Doe</Text>
              <Text className=''>Category: Cardiologist</Text>
              <Text>Contact: +1 234 567 890</Text>
              <Text>Hospital: City Heart Center</Text>
              <Text>Rate: $100/hr</Text>

              {/* Feedback and Rating */}
              <View className='flex flex-row items-center items-orange-300'>
                <Text className='text-orange-300'>★★★★★</Text>
                
              </View>

              {/* Channel Now Button */}
              <TouchableOpacity className='px-4 py-2 mt-2 bg-orange-500 rounded-full'>
                <Text className='text-white'>Channel Now</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Doctor 2 */}
          <View className='flex flex-row items-center justify-between px-8 mx-4 mt-2 bg-orange-500 rounded-lg'>
            <View className='flex flex-col items-center justify-center text-white '>
              <Text className='font-bold text-white'>Dr. Mark Lee</Text>
              <Text>Category: Orthopedic</Text>
              <Text>Contact: +1 345 678 901</Text>
              <Text>Hospital: Bone Health Clinic</Text>
              <Text>Rate: $110/hr</Text>

              {/* Feedback and Rating */}
              <View className='flex flex-row items-center'>
              <Text className='text-yellow-400'>★★★★☆</Text>
                
              </View>

              {/* Channel Now Button */}
              <TouchableOpacity className='mt-2 bg-[#298D80] px-4 py-2 rounded-full'>
                <Text className='text-white'>Channel Now</Text>
              </TouchableOpacity>
            </View>
            <Image
              source={require('../../assets/images/bg/Login.png')}
              className='w-[100px] h-[200px]'
            />
          </View>

          {/* Doctor 3 */}
          <View className='flex flex-row px-8 bg-[#298D80] justify-between mt-2 rounded-lg items-center mx-4'>
            <Image
              source={require('../../assets/images/bg/Signup.webp')}
              className='w-[100px] h-[200px]'
            />
            <View className='flex flex-col items-center text-white'>
              <Text className='font-bold text-white'>Dr. Doe Anthony</Text>
              <Text className=''>Category: Cardiologist</Text>
              <Text>Contact: +1 234 567 890</Text>
              <Text>Hospital: City Heart Center</Text>
              <Text>Rate: $100/hr</Text>

              {/* Feedback and Rating */}
              <View className='flex flex-row items-center items-orange-300'>
                <Text className='text-orange-300'>★★★★★</Text>
                
              </View>

              {/* Channel Now Button */}
              <TouchableOpacity className='px-4 py-2 mt-2 bg-orange-500 rounded-full'>
                <Text className='text-white'>Channel Now</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Doctor 4 */}
          <View className='flex flex-row items-center justify-between px-8 mx-4 mt-2 bg-orange-500 rounded-lg'>
            <View className='flex flex-col items-center justify-center text-white '>
              <Text className='font-bold text-white'>Dr. Mark Lee</Text>
              <Text>Category: Orthopedic</Text>
              <Text>Contact: +1 345 678 901</Text>
              <Text>Hospital: Bone Health Clinic</Text>
              <Text>Rate: $110/hr</Text>

              {/* Feedback and Rating */}
              <View className='flex flex-row items-center'>
              <Text className='text-yellow-400'>★★★★☆</Text>
                
              </View>

              {/* Channel Now Button */}
              <TouchableOpacity className='mt-2 bg-[#298D80] px-4 py-2 rounded-full'>
                <Text className='text-white'>Channel Now</Text>
              </TouchableOpacity>
            </View>
            <Image
              source={require('../../assets/images/bg/Login.png')}
              className='w-[100px] h-[200px]'
            />
          </View>
        </ScrollView>
      </View>

      <View className='absolute w-full bottom-6'>
        <Layout />
      </View>
    </View>
  )
}
