import { View, Text, Image, Button } from 'react-native'
import React, {useContext} from 'react'
import Layout from './layout'
import SettingsHead from '@/components/profilesettingsheader'
import { UserContext } from '../../context/userContext';

export default function profilesettings() {
  const { user } = useContext(UserContext);
  return (
    <View className='h-full '>
      <View className='mt-12 '>
        <SettingsHead/>
      <View>
        {/* update profile */}
        
        <View className='items-center '>
         <Image source={require('../../assets/images/bg/logo1.png')} 
         style={{ width: 150, height: 150, resizeMode: 'contain' }}  />
        </View>
        
        <View className='px-12 mt-2 mb-2'>
          <View>
            <Text className='pb-1'>First Name :</Text>
          </View>
          <View className='h-12 border rounded-lg border-[#298D80] flex px-4 justify-center'>
            <Text className=''>{user.fname}</Text>
          </View>
        </View>
        
        <View className='px-12 mt-2 mb-2'>
          <View>
            <Text className='pb-1'>Last Name :</Text>
          </View>
          <View className='h-12 border rounded-lg border-[#298D80] flex px-4 justify-center'>
            <Text className=''>{user.lname}</Text>
          </View>
        </View>

        <View className='px-12 mt-2 mb-2'>
          <View>
            <Text className='pb-1'>Email :</Text>
          </View>
          <View className='h-12 border rounded-lg border-[#298D80] flex px-4 justify-center'>
            <Text className=''>{user.email}</Text>
          </View>
        </View>

        <View className='px-12 mt-2 mb-2'>
          <View>
            <Text className='pb-1'>Phone Number :</Text>
          </View>
          <View className='h-12 border rounded-lg border-[#298D80] flex px-4 justify-center'>
            <Text className=''>{user.phone_number}</Text>
          </View>
        </View>

        <View className='px-12 mt-2 mb-2'>
          <View>
            <Text className='pb-1'>Dath of Birth :</Text>
          </View>
          <View className='h-12 border rounded-lg border-[#298D80] flex px-4 justify-center'>
            <Text className=''>{user.dob}</Text>
          </View>
        </View>

        <View className='bg-[#298D80] w-[300px] h-12 justify-center mx-auto rounded-lg mt-2 flex'>
          <Text className='text-center text-white'>Edit details</Text>
        </View>
        
      </View>
        

      </View>
      
      <View className='absolute w-full bottom-6'>
          <Layout />
      </View>
    </View>
  )
}