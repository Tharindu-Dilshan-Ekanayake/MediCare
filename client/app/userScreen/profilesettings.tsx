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
        <Text>{user.fname}</Text>
      </View>
        

      </View>
      
      <View className='absolute w-full bottom-6'>
          <Layout />
      </View>
    </View>
  )
}