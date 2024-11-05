import { View, Text, Image } from 'react-native'
import React from 'react'
import { icons, images } from '../constants'
import { TouchableOpacity } from 'react-native'

const WorkoutBoxV2 = () => {
  return (
    <View className="border border-[3px] border-blue2 rounded-[5px] p-2 m-2">
        <View className="flex-row justify-between items-center">
            <View>
                <Text className="text-white text-xl font-bold ">Name</Text>
                <Text className="text-white">Exercises:</Text>
            </View>
            <Image source={icons.leftArrow} className="h-[20px] w-[25px]"/>
        </View>
        <View className="flex-row">
            <Image source={images.thumbnail} className="w-[50px] h-[50px] m-[2px]"/>
            <Image source={images.thumbnail} className="w-[50px] h-[50px] m-[2px]"/>
            <Image source={images.thumbnail} className="w-[50px] h-[50px] m-[2px]"/>
            <Image source={images.thumbnail} className="w-[50px] h-[50px] m-[2px]"/>
        </View>
        <TouchableOpacity className="border border-[3px] border-blue2 rounded-[3px] bg-blue2 p-1 mt-2">
            <Text className="text-xl text-white font-bold">Start Workout</Text>
        </TouchableOpacity>
      
    </View>
  )
}

export default WorkoutBoxV2