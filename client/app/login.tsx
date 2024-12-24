import React, { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {
    View,
    Text,
    ImageBackground,
    TextInput,
    Pressable,
    Image,
    Animated,
    Alert,
} from 'react-native';
import axios from 'axios';
import { useRouter } from 'expo-router';
import AntDesign from '@expo/vector-icons/AntDesign';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

export default function Login() {
    const router = useRouter();
    const scaleValue = new Animated.Value(1);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

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

    const handleLogin = async () => {
        try {
            const response = await axios.post('http://192.168.43.64:4000/login', {
                email,
                password,
            });

            const { token, user } = response.data;

            if (token) {
                // Save token and user details locally
                await AsyncStorage.setItem('token', token);
                await AsyncStorage.setItem('user', JSON.stringify(user));

                // Navigate to the home page
                router.push('/userScreen/home');
            } else {
                Alert.alert('Login Failed', response.data.error || 'Unknown error');
            }
        } catch (err) {
            console.error('Login error:', err);
            Alert.alert('Login Failed', 'An error occurred during login. Please try again.');
        }
    };

    return (
        <ImageBackground
            source={require('../assets/images/bg/bg.png')}
            className="flex-1"
        >
            <View className="flex-1">
                <Pressable
                    className="absolute z-10 top-10 left-5"
                    onPress={() => router.push('/')}
                >
                    <AntDesign name="leftcircleo" size={32} color="#323C4E" />
                </Pressable>

                <View className="items-center justify-center flex-1 pt-[100px]">
                    <Image
                        source={require('../assets/images/bg/Login.png')}
                        className="h-[300px] w-[300px]"
                        resizeMode="contain"
                    />
                </View>

                <View className="bg-white rounded-t-[40px] shadow-xl px-6 pb-8 pt-10">
                    <Text className="mb-6 text-[35px] text-center text-[#323C4E] font-extrabold">
                        Welcome Back
                    </Text>

                    <Text className="mb-2 text-gray-700">Email :</Text>
                    <TextInput
                        placeholder="Enter your email"
                        className="w-full h-12 px-4 mb-4 border border-gray-300 rounded-lg focus:border-[#19191A] focus:ring-[#19191A]"
                        keyboardType="email-address"
                        value={email}
                        onChangeText={setEmail}
                    />

                    <Text className="mb-2 text-gray-700">Password :</Text>
                    <TextInput
                        placeholder="Enter your password"
                        className="w-full h-12 px-4 mb-6 border border-gray-300 rounded-lg focus:border-[#19191A] focus:ring-[#19191A]"
                        secureTextEntry
                        value={password}
                        onChangeText={setPassword}
                    />

                    <Animated.View style={{ transform: [{ scale: scaleValue }] }}>
                        <Pressable
                            onPressIn={onPressIn}
                            onPressOut={onPressOut}
                            onPress={handleLogin}
                            className="flex flex-row items-center justify-center w-full h-12 bg-orange-500 rounded-lg"
                        >
                            <MaterialIcons name="login" size={24} color="white" />
                            <Text className="ml-2 text-lg font-bold text-white">Login</Text>
                        </Pressable>
                    </Animated.View>

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
