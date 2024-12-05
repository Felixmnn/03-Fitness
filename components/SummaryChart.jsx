import SegmentedControl from "@react-native-segmented-control/segmented-control";
import * as React from "react";
import { Text, TouchableOpacity, View } from "react-native";
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
    { label: "Tue", value: 90 },
    { label: "Wed", value: 50 },
    { label: "Thu", value: 80 },
    { label: "Fri", value: 120 },
    { label: "Sat", value: 90 },
    { label: "Sun", value: 1 },
  ];

  useEffect(() => {
    // Setzt Mock-Daten als Beispiel
    setBarData(mockData);
    console.log(data)
  }, [chartPeriod, transactionType]);

  return (
    <View >
      
      <Text className="text-white font-bold">
        Duration in Minutes
      </Text>

      
      <BarChart
        data={(data.length > 0)?data:barData}
        barWidth={20}
        height={150}
        width={250}
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
  );
}
