import React from 'react';
import { View, Text, ScrollView, Dimensions } from 'react-native';
import { LineChart } from 'react-native-chart-kit';

const pandemicData = {
  pandemics: [
    {
      name: 'COVID-19',
      monthlyUpdates: [300, 150, 200, 250, 300, 350, 400, 450, 500, 550, 600, 650],
      color: 'rgba(41, 141, 128, 1)', // Green
    },
    {
      name: 'Monkeypox',
      monthlyUpdates: [450, 290, 200, 130, 160, 190, 220, 400, 380, 310, 340, 370],
      color: 'rgba(255, 99, 71, 1)', // Red
    },
    {
      name: 'Influenza',
      monthlyUpdates: [100, 250, 170, 390, 110, 130, 150, 170, 190, 210, 230, 250],
      color: 'rgba(255, 165, 0, 1)', // Orange
    },
  ],
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
};

const screenWidth = Dimensions.get('window').width; // Get device screen width

const Chart = () => {
  return (
    <ScrollView showsVerticalScrollIndicator={false} className="flex-1 ">
      <View className="px-4 py-1 border">
        <Text className="text-xl font-bold text-center text-black">
          Pandemic Growth (Enhanced Line Chart)
        </Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} className=" rounded-2xl">
          <LineChart
            data={{
              labels: pandemicData.labels,
              datasets: pandemicData.pandemics.map((pandemic) => ({
                data: pandemic.monthlyUpdates,
                color: () => pandemic.color, // Assign individual line colors
                strokeWidth: 1, // Decrease line thickness (default is 3, reducing to 2)
              })),
              legend: pandemicData.pandemics.map((pandemic) => pandemic.name), // Add legend
            }}
            width={screenWidth * 2} // Chart width for horizontal scrolling
            height={180} // Chart height
            chartConfig={{
              backgroundColor: 'white', // Transparent background
              backgroundGradientFrom: 'white',
              backgroundGradientTo: 'white',
              decimalPlaces: 0,
              color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`, // Axis labels color
              labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
              style: {
                borderRadius: 3,
              },
              propsForDots: {
                r: '4',
                strokeWidth: '2',
                stroke: '#ffffff',
              },
            }}
            bezier
            style={{
              borderRadius: 2,
              marginVertical: 16,
              minHeight: 200, // Minimum height of 200px
            }}
          />
        </ScrollView>
      </View>
    </ScrollView>
  );
};

export default Chart;
