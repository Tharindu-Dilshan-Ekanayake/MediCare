import { View, Text } from 'react-native'
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
          <Text>First Name :</Text>
        <Text>{user.fname}</Text>
        </View>
        
        <View className='items-center '>
          <Text>Lqst Name :</Text>
        <Text>{user.lname}</Text>
        </View>

        <View className='items-center '>
          <Text>Email :</Text>
        <Text>{user.email}</Text>
        </View>
        
      </View>
        

      </View>
      
      <View className='absolute w-full bottom-6'>
          <Layout />
      </View>
    </View>
  )
}