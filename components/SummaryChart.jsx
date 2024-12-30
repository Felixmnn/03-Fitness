import * as React from "react";
import { Text, View,Dimensions, ScrollView } from "react-native";
import { useState,useEffect } from "react";
import { BarChart } from "react-native-gifted-charts";

export default function SummaryChart({data,key}) {
  const [chartPeriod, setChartPeriod] = useState("week");
  const [barData, setBarData] = useState([]);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [transactionType, setTransactionType] = useState("Income");

  // Mock-Daten
  const mockData = [
    { label: "Mon", value: 100, onPress: () => console.log("Hello World") },
    { label: "Tue", value: 0 },
    { label: "Wed", value: 10 },
    { label: "Thu", value: 30 },
    { label: "Fri", value: 60 },
    { label: "Sat", value: 90 },
    { label: "Sun", value: 120 },
  ];

  useEffect(() => {
    // Setzt Mock-Daten als Beispiel
    setBarData(mockData);
    console.log(data)
  }, [chartPeriod, transactionType]);

  const screenWidth = Dimensions.get("window").width;
  return (
    <ScrollView showsHorizontalScrollIndicator={false} className={`mx-2 bg-blue2 rounded-[5px] max-h-[220px] w-[${(Dimensions.get('window').width > 340) ? 340  : Dimensions.get('window').width -20}px]`} horizontal={true}> 
      <View className={`items-center p-2 ${screenWidth > "w-[340px]" ? "w-[320px]" : `w-[${screenWidth}px]`} `}>
        <Text className="text-white font-bold">
          Duration in Minutes
        </Text>
        <BarChart
          data={(data.length > 0)?data:barData}
          barWidth={20} 
          height={150}
          width={(Dimensions.get('window').width > 340) ? 340 -20  : Dimensions.get('window').width}
          frontColor="#3B82F6"
          spacing={15}
          noOfSections={4}
          yAxisThickness={0}
          xAxisThickness={0}
          xAxisLabelsVerticalShift={2}
          xAxisLabelTextStyle={{ color: "white" }}
          yAxisTextStyle={{ color: "white" }}
          isAnimated
          animationDuration={300}
        />  
      </View>
    </ScrollView>
  );
}
