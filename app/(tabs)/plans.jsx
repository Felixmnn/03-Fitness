import { View, Text, FlatList, ScrollView, Image } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import NavBox from '../../components/NavBox'
import { icons } from '../../constants'
import { router } from 'expo-router'
import ProfilePicture from 'components/ProfilePicture';
import { TouchableOpacity } from 'react-native'
import WorkoutBox from '../../components/WorkoutBox'


const plans = () => {
  return (  
      <SafeAreaView className="bg-primary h-full">
        <View className="border border-red-900 border-2 flex-1 m-5">
          <View className=" flex-row justify-between m-2 items-center">
            <Text className="text-white text-3xl font-bold">Trainingpläne</Text>
            <ProfilePicture/>
          </View>
          <View className="justify-between border border-red-900 border-2 flex-1 m-2">
            <View>
              <Text className="text-2xl text-white font-bold mb-2">Deine Pläne</Text>
            </View>
            
            <View>
                <Text className="text-2xl text-white font-bold">Change Training</Text>
                <View className="flex-row">
                  
                    <View className="w-[45%] h-[120px] bg-blue2 justify-center rounded-[10px] items-center m-2 p-2">
                      <TouchableOpacity onPress={()=> {router.push("/discover-plans")}}>
                        <View className="items-center justify-center">
                          <Image source={icons.eye} className="h-[50px] w-[50px]"/>
                          <Text className="text-xl text-white font-bold text-center mb-1">Discover</Text>
                        </View>
                      </TouchableOpacity>
                    </View> 
                  
                  
                    <View className="w-[45%] h-[120px] bg-blue2 justify-center rounded-[10px] items-center m-2 p-2">
                      <TouchableOpacity onPress={()=> {router.push("/create-plans")}}>
                        <View className="items-center justify-center">
                          <Image source={icons.plus} className="h-[40px] w-[40px]"/>
                          <Text className="text-xl text-white font-bold text-center mb-1">Create</Text>
                        </View>
                      </TouchableOpacity>
                    </View> 
                  
              </View>
              
              
            </View>
          </View>
        </View>
      </SafeAreaView>
  )
}

export default plans