import { View, Text, Image } from 'react-native'
import React from 'react'

const News = ({title,description}) => {
  return (
    <View className="h-[150px] bg-blue2 rounded-[10px] m-2 flex-row">

        <Image source={"../assets/images/thumbnail.png"} className="h-[150px] w-[150px]"/>
        
        <View className="flex-1 flex-wrap">
        <Text className="text-white font-bold text-xl">
            {title}
        </Text>
        <Text className="text-white">
            {description}
        </Text>
        </View>

    </View>
  )
}

export default News