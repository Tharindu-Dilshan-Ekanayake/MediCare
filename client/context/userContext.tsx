import React, { createContext, useState, useEffect, ReactNode } from 'react';
import axios from 'axios';

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
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        try {
          setUser(JSON.parse(storedUser));
        } catch (err) {
          console.error('Error parsing stored user data:', err);
          localStorage.removeItem('user');
        }
      } else {
        try {
          const { data } = await axios.get<User>('http://192.168.43.64:4000/getprofile');
          setUser(data);
          localStorage.setItem('user', JSON.stringify(data));
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
      localStorage.removeItem('user');
      window.location.href = '/';
    } catch (err) {
      console.error('Error logging out:', err);
    }
  };

  const updateUser = (userData: User) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
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
