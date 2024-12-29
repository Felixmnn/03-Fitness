import { View, Text,SafeAreaView, ScrollView, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { PieChart } from 'react-native-chart-kit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CustomButton from '../../../components/CustomButton';
import { TouchableOpacity } from 'react-native';
import { getAllEntries } from '../../../lib/appwrite';

const Experimental = () => {

 
  const news = ({title,text,url}) => {
    return (
    <View className="bg-blue2 p-2 rounded-[5px] m-2 flex-row">
          <Image source={{ uri: url}} className="h-[100px] w-[100px]"  /> 
          <View className="flex-1 flex-row flex-wrap mx-2">
            <Text className="text-white font-bold text-xl">{title}</Text>
            <View className="flex-row flex-wrap">
              <Text className="text-white font-bold">{text}</Text>
            </View>
          </View>
        </View>
    )
  }


  return (
    <SafeAreaView className ="bg-black h-full">
      <ScrollView>
        <View>
          {news({title:"Export a Excel?",text:"The next version will feature the ability to export your data as an Excel file.",url:'https://raw.githubusercontent.com/Felixmnn/Design-ohne-Titel--8-/refs/heads/main/2.png'})}
          {news({title:"Dark Mode?",text:"Choose whether you want to see a flash grenade effect each time you open your map.",url:'https://raw.githubusercontent.com/Felixmnn/Design-ohne-Titel--8-/refs/heads/main/3.png'})}
          {news({title:"App as APK?",text:"Download the App always.",url:'https://raw.githubusercontent.com/Felixmnn/Design-ohne-Titel--8-/refs/heads/main/1.png'})}
          {news({title:"Charts coming?",text:"Visualize your progress with intuitive charts for quick and easy data access.",url:'https://raw.githubusercontent.com/Felixmnn/Design-ohne-Titel--8-/refs/heads/main/4.png'})}

        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default Experimental