import { View, Text, ImageBackground, TextInput, Pressable, Image } from 'react-native';
import { Link } from 'expo-router';
import "../global.css";
import AntDesign from '@expo/vector-icons/AntDesign';

export default function Login() {
  return (
    <ImageBackground
      source={require('../assets/images/bg/bg.png')}
      className="flex-1"
    >
      <View className="flex-1">
      <AntDesign name="leftcircleo" size={24} color="black" />
        {/* Logo Section */}
        <View className="items-center justify-center flex-1 pt-[100px]">
          <Image
            source={require('../assets/images/bg/homescreen.png')}
            className="h-[300px] w-[300px]"
            resizeMode="contain"
          />
        
        </View>

        {/* Login Card Section */}
        <View className="bg-white rounded-t-[40px] shadow-xl px-6 pb-8 pt-10">
          <Text className="mb-6 text-2xl font-bold text-center text-[#19191A]">
            Welcome
          </Text>
          
          {/* Email Input */}
          <Text>Email :</Text>
          <TextInput
            placeholder="Email"
            className="w-full h-12 px-4 mb-4 border border-gray-300 rounded-lg focus:border-[#19191A] focus:ring-[#19191A]"
            keyboardType="email-address"
          />

          {/* Password Input */}
          <Text>Password :</Text>
          <TextInput
            placeholder="Password"
            className="w-full h-12 px-4 mb-6 border border-gray-300 rounded-lg focus:border-[#19191A] focus:ring-[#19191A]"
            secureTextEntry
          />

          {/* Login Button */}
          <Pressable className="flex items-center justify-center w-full h-12 bg-orange-500 rounded-lg">
            <Text className="text-lg font-bold text-white">Login</Text>
          </Pressable>

          {/* Forgot Password Link */}
          <View className="mt-4">
            <Text className="text-sm text-center text-gray-500">
              Forgot your password?{' '}
              <Link href={'/profile'} className="font-bold text-orange-500">
                Reset here
              </Link>
            </Text>
          </View>

          {/* Signup Link */}
          <View className="mt-4">
            <Text className="text-sm text-center text-gray-500">
              Don't have an account?{' '}
              <Link href="/signup" className="font-bold text-orange-500">
                Sign up
              </Link>
            </Text>
          </View>
        </View>
      </View>
    </ImageBackground>
  );
}
