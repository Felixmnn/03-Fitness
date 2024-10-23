import { View, Text, FlatList } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

const EditWorkout = () => {
  return (
    <SafeAreaView className="bg-primary h-full">
        <View className="border border-red-900 border-2 m-5">
            <Text className="text-3xl text-white font-bold text-center">Push</Text>
            <Text className="text-xl text-white font-bold ">Description:</Text>
            <FlatList/>
            <Text className="text-xl text-white font-bold ">Exercises:</Text>
        </View>
    </SafeAreaView>
  )
}

export default EditWorkout