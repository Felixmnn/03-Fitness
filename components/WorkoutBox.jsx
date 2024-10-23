import { View, Text, Image } from 'react-native'
import React from 'react'
import {images} from "../constants"
import {icons} from "../constants"
import { TouchableOpacity } from 'react-native'
import CustomButton from './CustomButton'
import { router } from 'expo-router'


const WorkoutBox = ({title,musclegroups,imageurl,duration,added}) => {
  const {username} = "JEff"
  return (
    <View className="bg-blue2  p-2 w-[95%] h-[200px]  rounded-[20px]">
      
      <View className="flex-row h-[70%] border border-red-900 border-2 p-1 mb-1">
        <View>
          <View className="w-[97%]  flex-row justify-between border border-red-900 border-2 mx-1">
            <Text className="text-xl font-bold text-white ml-2">Push</Text>
            <TouchableOpacity onPress={()=> {
              router.push("/edit-workout")
            }}>
              <Image source={icons.rightArrow}/>
            </TouchableOpacity>
          </View>
          <View className="border border-red-900 m-1 w-[97%]">
            <Text className="text-white text-xxl font-bol">
              Exercises:
            </Text>
            <View className="flex-row">
              <Image source={images.thumbnail} className="h-[60px] w-[60px] mx-1"/>
              <Image source={images.thumbnail} className="h-[60px] w-[60px] mx-1"/>
              <Image source={images.thumbnail} className="h-[60px] w-[60px] mx-1"/>
              </View>
          </View>
        </View>
      </View>
      <CustomButton
      title="Start Workout"
      handlePress={()=> {router.push("/active-home")}}
      />
    </View>
  )
}

export default WorkoutBox