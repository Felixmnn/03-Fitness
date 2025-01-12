import { View, Text } from 'react-native'
import React from 'react'

const Main = ({content}) => {
  return (
    <View className="flex-1">
      {content}
    </View>
  )
}

export default Main