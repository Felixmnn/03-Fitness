import { View, Text } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

const PastWorkout = () => {
  return (
    <SafeAreaView className="bg-primary h-full">
        <View className="justify-center items-center flex-1">
        <Text className="text-white text-3xl font-bold text-center">Hier gibts dann Infos zu alten workouts oder so..</Text>

        </View>
    </SafeAreaView>

  )
}

export default PastWorkout