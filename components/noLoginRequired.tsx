import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { router } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

const NoLoginRequired = () => {
  return (
    <TouchableOpacity>
    <Text className="text-white text-center py-[5px] " onPress={async ()=> {
        await AsyncStorage.setItem("noAccountWanted", "true");
        router.replace("/home");
    }}>
        I dont want to sign in.
    </Text>
</TouchableOpacity>
  )
}

export default NoLoginRequired