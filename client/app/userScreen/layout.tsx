import { View, Text, TouchableOpacity } from 'react-native'
import Entypo from '@expo/vector-icons/Entypo';
import Fontisto from '@expo/vector-icons/Fontisto';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { useRouter } from 'expo-router';  // Import useRouter
import "../../global.css";

export default function Layout() {
  const router = useRouter();  // Initialize router

  return (
    <View className='flex h-screen w-[70%] mx-auto'>
      <View className='flex flex-row items-center justify-between px-12 bg-white rounded-full h-[50px]'>
        <TouchableOpacity onPress={() => router.push('/userScreen/home')}>
          <Entypo name="home" size={24} color="#298D80" />
        </TouchableOpacity>
        
        <TouchableOpacity onPress={() => router.push('/userScreen/meetdoctor')}>
          <Fontisto name="doctor" size={24} color="#298D80" />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => router.push('/userScreen/profilesettings')}>
          <FontAwesome5 name="user-alt" size={24} color="#298D80" />
        </TouchableOpacity>
      </View>
    </View>
  )
}