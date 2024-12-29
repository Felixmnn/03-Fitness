import { View, Text } from 'react-native'
import React from 'react'

const Main = ({content}) => {
  return (
    <View className="h-[55%] w-full mt-2 justify-center">
      {content}
    </View>
  )
}

export default Main