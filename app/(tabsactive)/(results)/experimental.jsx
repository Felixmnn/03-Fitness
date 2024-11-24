import { View, Text,SafeAreaView, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { PieChart } from 'react-native-chart-kit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CustomButton from '../../../components/CustomButton';
import { TouchableOpacity } from 'react-native';
import News from '../../../components/News';
const Experimental = () => {
  
  return (
    <SafeAreaView className ="bg-black h-full">
      <ScrollView>
        <News title={"Datbase"} description={"Automatic backups of your workout Datwa"}/>
      </ScrollView>
    </SafeAreaView>
  )
}

export default Experimental