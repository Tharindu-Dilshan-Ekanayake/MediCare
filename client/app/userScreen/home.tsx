import React from 'react';
import { View } from 'react-native';

import Layout from '@/app/userScreen/layout';
import "../../global.css";
//import Chart from '@/components/chart';
import Head from '@/components/head';
import CombinedComponent from '../components/homeCompo';



export default function Home() {
  

  return (
    <View className='h-full'>
      
      <View className='mt-12 '>
        <Head/>
        <CombinedComponent />

      </View>

      <View className='absolute w-full bottom-6'>
        <Layout />
      </View>
      
      
    </View>
  );
}
