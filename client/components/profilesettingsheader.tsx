import { View, Text, Pressable } from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../context/userContext';
import { Ionicons } from '@expo/vector-icons';
import AntDesign from '@expo/vector-icons/AntDesign';

const SettingsHead = ({ onMenuPress, onNotificationPress }) => {
    const { user, logout } = useContext(UserContext);
    
    const [greeting, setGreeting] = useState('');
    const [hasNotifications, setHasNotifications] = useState(false); // For notification badge

    useEffect(() => {
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

    return (
        <View className="flex-row items-center justify-between px-10 py-3">
            {/* Left side - Greeting */}
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

            {/* Right side - Logout Button and Notification Badge */}
            <View className="flex-row items-center">
                <Pressable
                    onPress={logout}
                    className="relative p-2 "
                >
                    <View className="flex items-center justify-center w-12 h-12 bg-orange-500 rounded-full">
                        <AntDesign name="logout" size={24} color="white" />
                    </View>
                    
                    {hasNotifications && (
                        <View className="absolute w-2 h-2 bg-red-500 rounded-full top-1 right-1" />
                    )}
                </Pressable>
            </View>
        </View>
    );
};

export default SettingsHead;
