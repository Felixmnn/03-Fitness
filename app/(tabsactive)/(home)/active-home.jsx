import { View, Text,SafeAreaView,Image, TextInput } from 'react-native'
import React from 'react'
import CustomButton from '../../../components/CustomButton'
import { TouchableOpacity } from 'react-native'
import { icons, images } from '../../../constants'

const ActiveHome = () => {
  return (
    <SafeAreaView className ="bg-primary h-full">
      <View className="border border-red-900 border-2 flex-1 m-5 justify-between items-center">
        <View className="h-[100px] border border-red-900 border-2 m-2">
          <Text className="text-white text-3xl font-bold text-center mt-2"> Active Workout </Text>
          <Text className="text-white text-xl font-bold text-center mt-2"> 02:32 Hours </Text>
        </View>

        <View className="border border-red-900 border-2 p-3">
          <CustomButton
          containerStyles="bg-blue2 px-5 my-2"
          title="View Progress"
          />
          <View className="bg-blue2 justify-between items-center flex-row my-2 rounded-[5px] w-full">
            <View className="flex-row justify-center items-center">
            <Image source={images.thumbnail} className="h-[70px] w-[70px] m-2"/>
            <Text className="text-2xl text-white font-bold"> Exercise </Text>
            </View>
            
            <Image source={icons.leftArrow} className="h-[20px] w-[25px] m-5"/>
          </View>
          <View className="flex-row justify-between m-2">
            <TextInput
              className="bg-white w-[45%] h-[40px] text-xl "
              placeholder='Weight'
            />
            <TextInput
              className="bg-white w-[45%] h-[40px] text-xl"
              placeholder='Weight'
            />

          </View>
          <CustomButton
          title="Safe set"
          containerStyles="bg-green-500 my-2"
          />

        </View>

        <View className="border border-red-900 border-2 m-2 p-2 h-[100px] justify-center">
          <CustomButton
          containerStyles="bg-red-900"
          title="Workout Beenden"
          />
        </View> 
        
        

      </View>
    </SafeAreaView>
  )
}

export default ActiveHome