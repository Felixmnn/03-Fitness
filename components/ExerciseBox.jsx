import { View, Text, Image } from 'react-native'
import React from 'react'
import { images } from '../constants'
import { TouchableOpacity } from 'react-native'
import { router } from 'expo-router'
import CustomButton from './CustomButton'

const ExerciseBox = () => {
  return (
    <TouchableOpacity className="ml-5" onPress={()=> {
        router.push({
            pathname:"/exercise",
            params:{name:"jeff"}
        })
    }}>
        <Image source={images.thumbnail} className="w-[100px] h-[100px] rounded-[5px]"/>
        

    </TouchableOpacity>
    
  )
}

export default ExerciseBox