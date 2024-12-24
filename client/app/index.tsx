import React from 'react';
import { View, Text, ImageBackground, Pressable, Image, Dimensions } from 'react-native';
import { Link } from 'expo-router';
import "../global.css";


export default function Index() {
  const windowHeight = Dimensions.get('window').height;
  
  return (
    <ImageBackground
      source={require('../assets/images/bg/bg.png')}
      className="flex-1"
    >
      <View className="flex-1">
        {/* Logo Section with adjusted spacing */}
        <View className="items-center justify-center flex-1 pt-[100px] pl-5">
          <Image
            source={require('../assets/images/bg/homescreen.png')}
            className="h-[550px] w-[500px]"
            resizeMode="contain"
          />
        </View>

        {/* White Card Section */}
        <View className="bg-white rounded-t-[40px] shadow-xl px-6 pb-8 pt-10 flex justify-center items-center">
          <Text className="mb-4 text-2xl font-bold text-center text-[#19191A]">
            MediCare
          </Text>
          
          <Text className="px-4 mb-8 text-base text-center text-gray-600 opacity-55">
          Explore a variety of healthcare services, gain valuable medical insights, and enhance your well being with the best resources tailored just for you!
          </Text>
          <View>
          <Link href={'/login'} className="w-full mb-8">
              <View className="items-center h-12 mx-4 bg-orange-500 rounded-xl w-[100px] flex justify-center">
                <Text className="text-lg font-bold text-white">Explore</Text>
              </View>
            </Link>
          </View>

          {/* Footer Text */}
          <Text className="text-center text-gray-500 opacity-35">
            Your path to better health starts here.
          </Text>
        </View>
      </View>
    </ImageBackground>
  );
}