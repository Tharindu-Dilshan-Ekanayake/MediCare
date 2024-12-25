import React, { createContext, useState, useEffect, ReactNode } from 'react';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native'; // Import navigation for React Native
import { useRouter } from 'expo-router'; // Use expo-router's router

export interface User {
  name: string;
  email: string;
  [key: string]: any; // For additional user properties
}

interface UserContextProps {
  user: User | null;
  setUser: (user: User) => void;
  logout: () => Promise<void>;
  loading: boolean;
  isAuthenticated: boolean;
}

export const UserContext = createContext<UserContextProps | null>(null);

interface UserContextProviderProps {
  children: ReactNode;
}

export default function UserContextProvider({ children }: UserContextProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const navigation = useNavigation(); // React Navigation
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      const storedUser = await AsyncStorage.getItem('user');
      if (storedUser) {
        try {
          setUser(JSON.parse(storedUser));
        } catch (err) {
          console.error('Error parsing stored user data:', err);
          await AsyncStorage.removeItem('user');
        }
      } else {
        try {
          const { data } = await axios.get<User>('http://192.168.43.64:4000/getprofile');
          setUser(data);
          await AsyncStorage.setItem('user', JSON.stringify(data));
        } catch (err) {
          console.error('Error fetching user data:', err);
        }
      }
      setLoading(false);
    };

    fetchUser();
  }, []);

  const logout = async () => {
    try {
      await axios.post('http://192.168.43.64:4000/logout');
      setUser(null);
      await AsyncStorage.removeItem('user'); // Clear stored user data
      router.push('/login'); // Navigate to the Login screen
    } catch (err) {
      console.error('Error logging out:', err);
    }
  };

  const updateUser = (userData: User) => {
    setUser(userData);
    AsyncStorage.setItem('user', JSON.stringify(userData)); // Update AsyncStorage
  };

  return (
    <UserContext.Provider
      value={{
        user,
        setUser: updateUser,
        logout,
        loading,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}
