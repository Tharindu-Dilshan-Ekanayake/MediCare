import { View, Text } from 'react-native';
import React, { useContext } from 'react';
import { UserContext } from '../../context/userContext'; // Import UserContext
import Layout from '@/app/userScreen/layout';
import "../../global.css";

export default function Home() {
  const { user } = useContext(UserContext); // Access user from context

  return (
    <View>
      <Text>Home</Text>
      {/* Check if user exists and display user.fname */}
      {user ? <Text>Welcome, {user.fname}</Text> : <Text>Loading...</Text>}
      <Text>{user.lname}</Text>
      <Text>{user.email}</Text>
      <Layout/>

      <View className='flex justify-between'>
        <Text className='text-blue-500'>Home</Text>
        <Text>Home</Text>
      </View>
    </View>
  );
}
