import { View, Text, Image, Pressable } from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../context/userContext';
import * as FileSystem from 'expo-file-system';
import { Ionicons } from '@expo/vector-icons';

const Head = ({ onMenuPress, onNotificationPress }) => {
    const { user, logout } = useContext(UserContext);
    const [defaultImage, setDefaultImage] = useState('');
    const [greeting, setGreeting] = useState('');
    const [hasNotifications, setHasNotifications] = useState(false); // For notification badge

    useEffect(() => {
        loadDefaultImage();
        updateGreeting();
        // Update greeting every minute
        const interval = setInterval(updateGreeting, 60000);
        return () => clearInterval(interval);
    }, []);

    const updateGreeting = () => {
        const hour = new Date().getHours();
        let newGreeting = '';
        
        if (hour >= 5 && hour < 12) {
            newGreeting = 'Good Morning';
        } else if (hour >= 12 && hour < 17) {
            newGreeting = 'Good Afternoon';
        } else if (hour >= 17 && hour < 21) {
            newGreeting = 'Good Evening';
        } else {
            newGreeting = 'Good Night';
        }
        
        setGreeting(newGreeting);
    };

    const loadDefaultImage = async () => {
        try {
            const base64Image = await FileSystem.readAsStringAsync(imageUri, {
                encoding: FileSystem.EncodingType.Base64,
            });
            setDefaultImage(`data:image/jpeg;base64,${base64Image}`);
        } catch (error) {
          
        }
    };

    return (
        <View className="flex-row items-center justify-between px-10 py-3 ">
            {/* Left side - Menu Icon and Greeting */}
            <View className="flex-row items-center flex-1">
                
                
                <View>
                    <Text className="text-lg font-semibold text-gray-800">
                        {greeting},
                    </Text>
                    <Text className="text-xl font-bold text-orange-500">
                        {user?.fname || 'Guest'}
                    </Text>
                </View>
            </View>

            {/* Right side - Notification Icon and Profile Image */}
            <View className="flex-row items-center">
                <Pressable
                    onPress={onNotificationPress}
                    className="relative p-2 mr-4"
                >
                    <Ionicons name="notifications-outline" size={24} color="#1f2937" />
                    {hasNotifications && (
                        <View className="absolute w-2 h-2 bg-red-500 rounded-full top-1 right-1" />
                    )}
                </Pressable>

                <Pressable
                    className="relative"
                    onPress={() => {
                        // Handle profile image press - maybe navigate to profile
                    }}
                >
                    <Image
                        source={
                            user?.image
                                ? { uri: user.image }
                                : defaultImage
                                    ? { uri: defaultImage }
                                    : require('../assets/images/bg/logo1.png')
                        }
                        className="w-12 h-12 border-2 border-orange-400 rounded-full"
                        resizeMode="cover"
                    />
                </Pressable>
            </View>
        </View>
    );
};

export default Head;