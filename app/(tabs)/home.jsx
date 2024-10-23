import { View, Text, FlatList } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import  WorkoutBox from "components/WorkoutBox"
import  CustomButton  from "components/CustomButton";
import ProfilePicture from 'components/ProfilePicture';
import { router } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState } from 'react'
import uuid from "react-native-uuid"
const Home = () => {

  

  return (
    <SafeAreaView className="bg-primary h-full">
      <View className="flex-1 border border-red-900 border-2 m-5">
        <View className="flex-row justify-between m-2 items-center">
          <Text className="text-white text-3xl font-bold">Guten Tag </Text>
          <ProfilePicture/>
        </View>
        <View className="border border-red-900 border-2 flex-1 m-2 justify-center items-center">
          <WorkoutBox/>
          
          <CustomButton
          title ="I do storage Stuff"
          handlePress = {()=>{
            console.log(uuid.v4())
          }

          }
          />
        </View>
      </View>
    </SafeAreaView>
  )
}

export default Home