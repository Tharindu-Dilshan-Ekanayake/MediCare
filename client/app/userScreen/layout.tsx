import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Entypo from '@expo/vector-icons/Entypo';
import Fontisto from '@expo/vector-icons/Fontisto';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { useRouter, usePathname } from 'expo-router';
import { useState } from 'react';
import "../../global.css";

type IconComponentType = typeof Entypo | typeof Fontisto | typeof FontAwesome5;

interface NavButtonProps {
  path: string;
  icon: IconComponentType;
  iconName: string;
}

export default function Layout() {
  const router = useRouter();
  const pathname = usePathname();
  const [hoveredIcon, setHoveredIcon] = useState<string | null>(null);

  const getIconStyle = (path: string): any => {
    const isActive = pathname.includes(path);
    const isHovered = hoveredIcon === path;
    
    return {
      opacity: isActive ? 1 : isHovered ? 0.8 : 0.5,
      transform: isHovered ? [{ scale: 1.1 }] : [{ scale: 1 }],
      transition: 'all 0.3s ease'
    };
  };

  const NavButton = ({ path, icon: Icon, iconName }: NavButtonProps) => (
    <TouchableOpacity 
      onPress={() => router.push(path)}
      style={getIconStyle(path)}
    >
      <Icon name={iconName} size={24} color="#298D80" />
    </TouchableOpacity>
  );

  return (
    <View className='flex w-[70%] mx-auto'>
      <View className='flex flex-row items-center justify-between px-12 bg-white rounded-full h-[50px]'>
        <NavButton 
          path="/userScreen/home" 
          icon={Entypo} 
          iconName="home"
        />
        <NavButton 
          path="/userScreen/book" 
          icon={Fontisto} 
          iconName="doctor"
        />
        <NavButton 
          path="/userScreen/profilesettings" 
          icon={FontAwesome5} 
          iconName="user-alt"
        />
      </View>
    </View>
  );
}