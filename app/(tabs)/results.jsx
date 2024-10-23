import { View, Text, FlatList, ScrollView, Image } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import NavBox from '../../components/NavBox'
import { icons } from '../../constants'
import { router } from 'expo-router'
import ProfilePicture from 'components/ProfilePicture';
import { TouchableOpacity } from 'react-native'
import WorkoutBox from '../../components/WorkoutBox'


const results = () => {
  return (
    <SafeAreaView className="bg-primary h-full">
        <View className="border border-red-900 border-2 flex-1 m-5">
          <View className=" flex-row justify-between m-2 items-center">
            <Text className="text-white text-3xl font-bold">Resultate</Text>
            <ProfilePicture/>
          </View>
          <View className="justify-between border border-red-900 border-2 flex-1 m-2">
            <View>
              <Text className="text-2xl text-white font-bold mb-2">Letzte Workouts:</Text>

              <View>
                
              <View className="flex-row justify-center">
                <TouchableOpacity className="w-[30%]" onPress={()=> {router.push("/past-workout")}}>
                  <View className="bg-blue2 rounded-[5px] pt-1 mt-1 h-[50px] w-full">
                    <Text className="text-white">Gestern</Text>
                  </View>
                  </TouchableOpacity>
                <View className="bg-blue2 rounded-[5px]  m-1 p-1  h-[50px] w-[30%]">
                  <Text className="text-white">Vorgestern</Text>
                </View>
                <View className="bg-blue2 rounded-[5px]  m-1 p-1 h-[50px] w-[30%]">
                  <Text className="text-white">21.10</Text>
                </View>
              </View>
              <View className="flex-row justify-center">
                <View className="bg-blue2 rounded-[5px] m-1 p-1 h-[50px] w-[30%]">
                  <Text className="text-white">20.10</Text>
                </View>
                <View className="bg-blue2 rounded-[5px]  m-1 p-1  h-[50px] w-[30%]">
                  <Text className="text-white">19.10</Text>
                </View>
                <View className="bg-blue2 rounded-[5px]  m-1 p-1 h-[50px] w-[30%]">
                  <Text className="text-white">17.10</Text>
                </View>
              </View>
              <View className="flex-row justify-center">
                <View className="bg-blue2 rounded-[5px] m-1 p-1 h-[50px] w-[30%]">
                  <Text className="text-white">10.10</Text>
                </View>
                <View className="bg-blue2 rounded-[5px]  m-1 p-1  h-[50px] w-[30%]">
                  <Text className="text-white">5.10</Text>
                </View>
                <View className="bg-blue2 rounded-[5px]  m-1 p-1 h-[50px] w-[30%]">
                  <Text className="text-white">2.10</Text>
                </View>
              </View>
              <View className="flex-row justify-center">
                <View className="bg-blue2 rounded-[5px] m-1 p-1 h-[50px] w-[30%]">
                  <Text className="text-white">03.09</Text>
                </View>
                <View className="bg-blue2 rounded-[5px]  m-1 p-1  h-[50px] w-[30%]">
                  <Text className="text-white">02.09</Text>
                </View>
                <View className="bg-blue2 rounded-[5px]  m-1 p-1 h-[50px] w-[30%]">
                  <Text className="text-white">01.09</Text>
                </View>
              </View>
              </View>
              
            </View>
            
            <View>
                <Text className="text-2xl text-white font-bold">Neue Features:</Text>
                <View className="flex-row">
                  
                    <View className="w-[45%] h-[120px] bg-blue2 justify-center rounded-[10px] items-center m-2 p-2">
                      <TouchableOpacity onPress={()=> {router.push("/analyse-training")}}>
                        <View className="items-center justify-center">
                          <Image source={icons.data} className="h-[50px] w-[50px]"/>
                          <Text className="text-xl text-white font-bold text-center mb-1">Charts</Text>
                        </View>
                      </TouchableOpacity>
                    </View> 
                  
                  
                    <View className="w-[45%] h-[120px] bg-blue2 justify-center rounded-[10px] items-center m-2 p-2">
                      <TouchableOpacity onPress={()=> {router.push("/experimental")}}>
                        <View className="items-center justify-center">
                          <Image source={icons.search} className="h-[40px] w-[40px]"/>
                          <Text className="text-xl text-white font-bold text-center mb-1">Lab</Text>
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

export default results