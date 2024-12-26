import React, { useState } from 'react';
import {
    View,
    Text,
    ImageBackground,
    TextInput,
    Pressable,
    Image,
    Animated,
    ScrollView,
    KeyboardAvoidingView,
    Platform,
    Alert,
} from 'react-native';
import axios from 'axios'; // Import Axios
import { useRouter } from 'expo-router';
import AntDesign from '@expo/vector-icons/AntDesign';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';


export default function Signup() {
    const router = useRouter();
    const scaleValue = new Animated.Value(1);

    // State for form inputs
    const [formData, setFormData] = useState({
        fname: '',
        lname: '',
        email: '',
        phone_number: '',
        password: '',
        dob: '',
        role: 'user',
        image: '',
    });

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

    // Handle input changes
    const handleInputChange = (key, value) => {
        setFormData({ ...formData, [key]: value });
    };

    // Register User
    const registerUser = async () => {
        try {
            const response = await axios.post('http://192.168.43.64:4000/createuser', formData);
            if (response.status === 201) {
                Alert.alert('Success', 'User created successfully!');
                router.push('/login'); // Navigate to the login screen
            }
        } catch (error) {
            console.error(error);
            Alert.alert('Error', 'Failed to create user. Please try again.');
        }
    };

    return (
        <ImageBackground
            source={require('../assets/images/bg/bg.png')}
            className="flex-1"
        >
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                className="flex-1"
            >
                <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                    <View className="flex-1">
                        {/* Back Arrow */}
                        <Pressable
                            className="absolute z-10 top-10 left-5"
                            onPress={() => router.push('/login')}
                        >
                            <AntDesign name="leftcircleo" size={32} color="#323C4E" />
                        </Pressable>

                        {/* Logo Section */}
                        <View className="items-center justify-center flex-1 pt-[100px]">
                            <Image
                                source={require('../assets/images/bg/Signup.webp')}
                                className="h-[300px] w-[300px]"
                                resizeMode="contain"
                            />
                        </View>

                        {/* Signup Card Section */}
                        <View className="bg-white rounded-t-[40px] shadow-xl px-6 pb-8 pt-10">
                            <Text className="mb-6 text-[35px] text-center text-[#323C4E] font-extrabold">
                                Create an Account
                            </Text>

                            {/* First Name Input */}
                            <Text className="mb-2 text-gray-700">First Name :</Text>
                            <TextInput
                                placeholder="Enter your first name"
                                value={formData.fname}
                                onChangeText={(value) => handleInputChange('fname', value)}
                                className="w-full h-12 px-4 mb-4 border border-gray-300 rounded-lg focus:border-[#19191A] focus:ring-[#19191A]"
                            />

                            {/* Last Name Input */}
                            <Text className="mb-2 text-gray-700">Last Name :</Text>
                            <TextInput
                                placeholder="Enter your last name"
                                value={formData.lname}
                                onChangeText={(value) => handleInputChange('lname', value)}
                                className="w-full h-12 px-4 mb-4 border border-gray-300 rounded-lg focus:border-[#19191A] focus:ring-[#19191A]"
                            />

                            {/* Email Input */}
                            <Text className="mb-2 text-gray-700">Email :</Text>
                            <TextInput
                                placeholder="Enter your email"
                                value={formData.email}
                                onChangeText={(value) => handleInputChange('email', value)}
                                className="w-full h-12 px-4 mb-4 border border-gray-300 rounded-lg focus:border-[#19191A] focus:ring-[#19191A]"
                                keyboardType="email-address"
                            />

                            {/* Phone Number Input */}
                            <Text className="mb-2 text-gray-700">Phone Number :</Text>
                            <TextInput
                                placeholder="Enter your phone number"
                                value={formData.phone_number}
                                onChangeText={(value) => handleInputChange('phone_number', value)}
                                className="w-full h-12 px-4 mb-4 border border-gray-300 rounded-lg focus:border-[#19191A] focus:ring-[#19191A]"
                                keyboardType="phone-pad"
                            />

                            {/* Date of Birth Input */}
                            <Text className="mb-2 text-gray-700">Date of Birth :</Text>
                            <TextInput
                                placeholder="Enter your date of birth"
                                value={formData.dob}
                                onChangeText={(value) => handleInputChange('dob', value)}
                                className="w-full h-12 px-4 mb-4 border border-gray-300 rounded-lg focus:border-[#19191A] focus:ring-[#19191A]"
                            />

                            {/* Password Input */}
                            <Text className="mb-2 text-gray-700">Password :</Text>
                            <TextInput
                                placeholder="Enter your password"
                                value={formData.password}
                                onChangeText={(value) => handleInputChange('password', value)}
                                className="w-full h-12 px-4 mb-6 border border-gray-300 rounded-lg focus:border-[#19191A] focus:ring-[#19191A]"
                                secureTextEntry
                            />

                            {/* Register Button */}
                            <Animated.View style={{ transform: [{ scale: scaleValue }] }}>
                                <Pressable
                                    onPressIn={onPressIn}
                                    onPressOut={onPressOut}
                                    onPress={registerUser}
                                    className="flex flex-row items-center justify-center w-full h-12 bg-orange-500 rounded-lg"
                                >
                                    <AntDesign name="adduser" size={24} color="white" />
                                    <Text className="ml-2 text-lg font-bold text-white">Register</Text>
                                </Pressable>
                            </Animated.View>
                        </View>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </ImageBackground>
    );
}
