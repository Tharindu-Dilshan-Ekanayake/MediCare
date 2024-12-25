import { View, Text, Button } from 'react-native';
import React from 'react';

import Layout from '@/app/userScreen/layout';
import "../../global.css";
import Tips from '@/components/tips';
//import Chart from '@/components/chart';
import Booking from '@/components/booking';
import CombinedComponent from '../components/homeCompo';


export default function Home() {
  

  return (
    <View className=''>
      <View className='mt-12 '>
        
        <CombinedComponent />
       
        
      </View>

      <View className='absolute w-full bottom-6'>
        <Layout />
      </View>
      
      
    </View>
  );
}
