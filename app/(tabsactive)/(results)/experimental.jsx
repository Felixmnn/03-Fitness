import { View, Text,SafeAreaView } from 'react-native'
import React from 'react'

const Experimental = () => {
  return (
    <SafeAreaView className ="bg-primary h-full">
      <View className="flex-1 border border-red-900 border-2 m-5 justify-center items-center ">
        <Text className="text-white text-3xl font-bold">Experimental Stuff</Text>
      </View>
    </SafeAreaView>
  )
}

export default Experimental