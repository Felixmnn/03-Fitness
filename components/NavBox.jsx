import { View, Text,TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { router } from 'expo-router'
import { icons } from '../constants'


const NavBox = ({title, handlePress, icon}) => {
  return (
    <TouchableOpacity className=" border border-[3px] border-blue2 rounded-[10px] w-[110px] h-[110px] justify-center items-center" onPress={handlePress}>
      <Image source={icon} className="h-[40px] w-[40px]" />
      <Text className="text-white text-xl font-bold">{title}</Text>
    </TouchableOpacity>
  )
}

export default NavBox