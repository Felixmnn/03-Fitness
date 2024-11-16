import { View, Text,TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { router } from 'expo-router'
import { icons } from '../constants'
import Icon from 'react-native-vector-icons/FontAwesome';


const NavBox = ({title, handlePress, icon}) => {
  return (
    <TouchableOpacity className=" border border-[3px] border-blue2 rounded-[10px] w-[150px] h-[150px] justify-center items-center bg-blue2" onPress={handlePress}>
      <Icon name="plus" size={40} color="white" />
      <Text className="text-white text-xl font-bold">{title}</Text>
    </TouchableOpacity>
  )
}

export default NavBox