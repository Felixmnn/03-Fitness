import { View, Text } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useLocalSearchParams } from 'expo-router'
import exercises from '../../constants/exercises'
import RenderSets from '../../components/RenderSets'
import RenderSavedExercises from '../../components/RenderSavedExercises'

const PastWorkout = () => {
  const {data} = useLocalSearchParams();
  const workout = data?  JSON.parse(data):null

 

  return (
  

    <SafeAreaView className="bg-black h-full">
        <View className="justify-center items-center flex-1">
        <Text className="text-white text-3xl font-bold text-center">{workout.Name}</Text>
        <Text className="text-white text-3xl font-bold text-center">{}</Text>
        <View className="w-full">
          <RenderSavedExercises SID={workout.SID} EIDs={workout.EIDs} passed={true}/>
        </View>

        </View>
    </SafeAreaView>

  )
}

export default PastWorkout