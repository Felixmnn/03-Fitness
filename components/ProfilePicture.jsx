import { View, Text, Image,TouchableOpacity } from 'react-native'
import React from 'react'
import { Link, router, useNavigation } from 'expo-router'
import {images} from "../constants"
import { useGlobalContext } from '../context/GlobalProvider';


const ProfilePicture =({message}) => { 
  const { user, isLoggedIn, setUser } = useGlobalContext();

  return (
    <View >
      <View className="flex-row mx-2 justify-between items-center">
          <Text className="text-white text-3xl font-bold">{message}</Text>       
            <TouchableOpacity onPress= { () => router.push("/overview")}>
              <View className="justify-center items-center">
              <Image source={(user.avatar)?({uri:`${user.avatar}`}):(images.profile)}  className="w-[60px] h-[60px] rounded-full "/>  
              </View>
            
        </TouchableOpacity>   
        </View>
    </View>
  )
}

export default ProfilePicture