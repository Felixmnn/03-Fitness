import { View, Text } from 'react-native'
import React from 'react'

const WorkoutBox = () => {
  return (
    <View className=" bg-blue2 h-[200px] rounded-[50px] mx-5 ">
          <Text className="text-white text-center">Hier befinden sich Workouts</Text>
          <Text className="text-white text-center">-links und rechts-</Text>
    </View>
  )
}

export default WorkoutBox