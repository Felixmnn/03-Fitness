import { View, Text } from 'react-native'
import React from 'react'

const Footer = ({content,footerTitle}) => {
  return (
    <View className="h-35% my-2">
        <Text className="text-xl font-bold text-white m-2">{footerTitle}</Text>
        <View className=" h-[50%] w-full rounded-[10px]">
          {content}
        </View>
    </View>
    
  )
}

export default Footer