import { View, Text } from 'react-native'
import React from 'react'
import { FlatList } from 'react-native'
import WorkoutBoxV2 from './WorkoutBoxV2'

const Main = ({content}) => {
  return (
    <View className="h-[55%] w-full mt-2 justify-center">
      {content}
    </View>
  )
}

export default Main