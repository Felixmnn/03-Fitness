import { View, Text, Image,TouchableOpacity } from 'react-native'
import React, { useEffect } from 'react'
import { Link, router, useNavigation } from 'expo-router'
import {images} from "../constants"
import { useGlobalContext } from '../context/GlobalProvider';


const ProfilePicture =({message}) => { 
  const { user, isLoggedIn, setUser } = useGlobalContext();


  return (
    <View >
      <View className="flex-row mx-2 justify-between items-center">
          <Text className="text-white text-3xl font-bold">{message}</Text>       
            <TouchableOpacity onPress= { () => router.push("/profile-details")}>
              <View className="justify-center items-center">
                {
                  (user && user.avatar) ? 
                  (<Image source={user && user.avatar ? { uri: `${user.avatar}` } : images.thumbnail}   className="w-[60px] h-[60px] rounded-full "/> ):
                  <View className="w-[60px] h-[60px] rounded-full"></View>
                }
               
              </View>
            
        </TouchableOpacity>   
        </View>
    </View>
  )
}

export default ProfilePicture