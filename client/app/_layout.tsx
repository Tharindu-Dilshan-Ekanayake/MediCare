import React from 'react';
import { Stack } from 'expo-router';
import UserContextProvider from '../context/userContext';

export default function _layout() {
  return (
    <UserContextProvider>
      <Stack
        screenOptions={{
          headerShown: false, // Hides headers globally
        }}
      />
    </UserContextProvider>
  );
}
