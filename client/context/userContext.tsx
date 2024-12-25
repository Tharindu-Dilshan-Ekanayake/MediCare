import React, { createContext, useState, useEffect, ReactNode } from 'react';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Import AsyncStorage for React Native

export interface User {
  name: string;
  email: string;
  [key: string]: any; // Add this if your user object may have other properties
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

  useEffect(() => {
    const fetchUser = async () => {
      const storedUser = await AsyncStorage.getItem('user'); // Use AsyncStorage to get stored data
      if (storedUser) {
        try {
          setUser(JSON.parse(storedUser));
        } catch (err) {
          console.error('Error parsing stored user data:', err);
          await AsyncStorage.removeItem('user'); // Remove if parsing fails
        }
      } else {
        try {
          const { data } = await axios.get<User>('http://192.168.43.64:4000/getprofile'); // Adjust URL as needed
          setUser(data);
          await AsyncStorage.setItem('user', JSON.stringify(data)); // Use AsyncStorage to store user data
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
      await axios.post('/user/logout');
      setUser(null);
      await AsyncStorage.removeItem('user'); // Remove user data from AsyncStorage
      window.location.href = '/'; // This is not relevant for React Native, so you may remove it
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
