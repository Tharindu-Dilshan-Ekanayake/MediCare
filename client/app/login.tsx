import React from 'react';
import {
  View,
  Text,
  ImageBackground,
  TextInput,
  Pressable,
  Image,
  Animated,
} from 'react-native';
import { useRouter } from 'expo-router'; // For navigation
import AntDesign from '@expo/vector-icons/AntDesign';
import MaterialIcons from '@expo/vector-icons/MaterialIcons'; // Icons for Login and Register
import "../global.css";

export default function Login() {
  const router = useRouter(); // Router for navigation

  const scaleValue = new Animated.Value(1); // Scaling animation

  const onPressIn = () => {
    Animated.spring(scaleValue, {
      toValue: 0.95,
      useNativeDriver: true,
    }).start();
  };

  const onPressOut = () => {
    Animated.spring(scaleValue, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  return (
    <ImageBackground
      source={require('../assets/images/bg/bg.png')}
      className="flex-1"
    >
      <View className="flex-1">
        {/* Back Arrow */}
        <Pressable
          className="absolute z-10 top-10 left-5"
          onPress={() => router.push('/')} // Navigate back to Index
        >
          <AntDesign name="leftcircleo" size={32} color="#323C4E" />
        </Pressable>

        {/* Logo Section */}
        <View className="items-center justify-center flex-1 pt-[100px]">
          <Image
            source={require('../assets/images/bg/Login.png')}
            className="h-[300px] w-[300px]"
            resizeMode="contain"
          />
        </View>

        {/* Login Card Section */}
        <View className="bg-white rounded-t-[40px] shadow-xl px-6 pb-8 pt-10">
          <Text className="mb-6 text-[35px] text-center text-[#323C4E] font-extrabold">
            Welcome Back
          </Text>

          {/* Email Input */}
          <Text className="mb-2 text-gray-700">Email :</Text>
          <TextInput
            placeholder="Enter your email"
            className="w-full h-12 px-4 mb-4 border border-gray-300 rounded-lg focus:border-[#19191A] focus:ring-[#19191A]"
            keyboardType="email-address"
          />

          {/* Password Input */}
          <Text className="mb-2 text-gray-700">Password :</Text>
          <TextInput
            placeholder="Enter your password"
            className="w-full h-12 px-4 mb-6 border border-gray-300 rounded-lg focus:border-[#19191A] focus:ring-[#19191A]"
            secureTextEntry
          />

          {/* Login Button */}
          <Animated.View style={{ transform: [{ scale: scaleValue }] }}>
            <Pressable
              onPressIn={onPressIn}
              onPressOut={onPressOut}
              onPress={() => alert('Login Button Pressed')}
              className="flex flex-row items-center justify-center w-full h-12 bg-orange-500 rounded-lg"
            >
              <MaterialIcons name="login" size={24} color="white" />
              <Text className="ml-2 text-lg font-bold text-white">Login</Text>
            </Pressable>
          </Animated.View>

          {/* Forgot Password Link */}
          <View className="mt-4">
            <Text className="text-sm text-center text-gray-500">
              Forgot your password?{' '}
              <Pressable onPress={() => router.push('/')}>
                <Text className="font-bold text-orange-500">Reset here</Text>
              </Pressable>
            </Text>
          </View>

          {/* Divider */}
          <View className="flex flex-row items-center my-6">
            <View className="flex-1 h-px bg-gray-300" />
            <Text className="px-2 text-sm text-gray-500">OR</Text>
            <View className="flex-1 h-px bg-gray-300" />
          </View>

          {/* Signup Section */}
          <Animated.View style={{ transform: [{ scale: scaleValue }] }}>
            <Pressable
              onPressIn={onPressIn}
              onPressOut={onPressOut}
              onPress={() => router.push('/signup')}
              className="flex flex-row items-center justify-center w-full h-12 border-2 border-[#298D80] rounded-lg"
            >
              <AntDesign name="adduser" size={24} color="#298D80" />
              <Text className="ml-2 text-[#298D80] font-bold">Register</Text>
            </Pressable>
          </Animated.View>
        </View>
      </View>
    </ImageBackground>
  );
}
