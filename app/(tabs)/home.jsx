import { View, Text, FlatList } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import  WorkoutBox from "../../components/WorkoutBox"
import  CustomButton  from "../../components/CustomButton";
import ProfilePicture from '../../components/ProfilePicture';
import { router } from 'expo-router';

const Home = () => {
  return (
    <SafeAreaView className="bg-primary h-full">
        <ProfilePicture/>
        <View className="content-center mt-[50px]">
          <Text className="text-3xl text-white text-center mt-[50px] mb-2">
            Choose a Workout
          </Text>
          <WorkoutBox/>
          <View className="mt-5 mx-5">
            <CustomButton 
            title = "Start Workout"
            handlePress={() => router.push('/active-home')}
            />
          </View>
            
        </View>
        
    </SafeAreaView>
  )
}

export default Home