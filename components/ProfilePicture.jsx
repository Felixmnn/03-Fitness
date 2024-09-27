import { View, Text, Image,TouchableOpacity } from 'react-native'
import React from 'react'
import { Link, router, useNavigation } from 'expo-router'
import {images} from "../constants"

const ProfilePicture =() => {  

  return (
    <View >
        <TouchableOpacity onPress= { () => router.push("/overview")}>
          <View className="justify-center items-center">
            <Image source={images.profile}  className="w-[60px] h-[60px] rounded-full "/>  
          </View>
            
        </TouchableOpacity>   
        
    </View>
  )
}

export default ProfilePicture