import { View, Text, FlatList } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { TouchableOpacity } from 'react-native'
import { router, useLocalSearchParams } from 'expo-router'
import AsyncStorage from '@react-native-async-storage/async-storage'

const EditWorkout = () => {
  
  const { pid } = useLocalSearchParams();
  const deletePlan = async () => {
    await AsyncStorage.removeItem(`Plan-${pid}`)
  }

  return (
    <SafeAreaView className="bg-primary h-full">
        <View className="border border-red-900 border-2 m-5">
            <Text className="text-3xl text-white font-bold text-center">Push</Text>
            <Text className="text-xl text-white font-bold ">Description:</Text>
            <FlatList/>
            <Text className="text-xl text-white font-bold ">Exercises:</Text>
            <TouchableOpacity className="p-2 m-5 bg-red-900" onPress={
              ()=> {
                console.log(`Plan-${pid}`)
                deletePlan()
                router.push("/")
              }
            }>
              <Text className="text-3x text-white font-bold">Delete Plan</Text>
            </TouchableOpacity>
        </View>
    </SafeAreaView>
  )
}

export default EditWorkout