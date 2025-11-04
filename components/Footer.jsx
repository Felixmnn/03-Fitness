import { View, Text } from 'react-native'
import React from 'react'

const Footer = ({content,footerTitle}) => {
  return (
    <View className="w-full my-2">
        <Text className="text-xl font-bold text-white m-2">{footerTitle}</Text>
        <View className=" w-full rounded-[5px]">
          {content}
        </View>
    </View>
    
  )
}

export default Footer