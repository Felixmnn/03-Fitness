import { View, Text,TouchableOpacity } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

const MyPlans = () => {
  return (
    <SafeAreaView className ="bg-primary h-full">
      <Text className="text-3xl text-white text-center mt-10">
        My Plans
      </Text>
        <TouchableOpacity>
        <View className="bg-blue2 h-[200px] rounded-[50px] my-5 mx-3 justify-center content-center">
          <Text className="text-white text-3xl text-center">Ich bin ein Platzhalter</Text>
        </View>
      </TouchableOpacity>
    </SafeAreaView>
  )
}

export default MyPlans