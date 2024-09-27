import { View, Text,TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { router } from 'expo-router'
import { icons } from '../constants'


const NavBox = ({title, handlePress, icon}) => {
  return (
    <TouchableOpacity
    onPress={handlePress}

    >
        <View className="bg-blue2 rounded-[50px] h-[200px] justify-center items-center m-2">
                <Image source={icon} className="h-50 w-50 "/>
            <Text className="text-center text-white text-3xl mt-5">{title}</Text>
        </View>
    </TouchableOpacity>
  )
}

export default NavBox