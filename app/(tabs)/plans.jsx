import { View, Text, FlatList, ScrollView, Image } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import NavBox from '../../components/NavBox'
import { icons } from '../../constants'
import { router } from 'expo-router'
import ProfilePicture from 'components/ProfilePicture';
import { TouchableOpacity } from 'react-native'
import WorkoutBox from '../../components/WorkoutBox'
import WorkoutBoxV2 from '../../components/WorkoutBoxV2'


const plans = () => {
  return (  
      <SafeAreaView className="bg-black h-full">
        

          <View className=" flex-row justify-between items-center p-5">
            <Text className="text-white text-3xl font-bold">Your Scedules</Text>
            <ProfilePicture/>
          </View>


            <View className="justify-between  flex-1">

            <View>
              <Text className="text-2xl text-white font-bold m-2">Your Workouts:</Text>
              <FlatList
              data = {[{id:1},{id:2}]}
              keyExtractor={(item)=> item.id}
              horizontal = {true}
              renderItem={()=>{
                return (
                  <WorkoutBoxV2/>
                )
                
              }
              }
              />
              
            </View>
            
            <View>
                <Text className="text-2xl text-white font-bold">Change Training</Text>
                <View className="flex-row justify-between my-3">
                  

                    <NavBox
                    title= "Discover"
                    icon = {icons.eye}
                    handlePress={()=> {router.push("/discover-plans")}}
                    />
                    <NavBox
                    title= "Workout"
                    icon = {icons.plus}
                    handlePress={()=> {router.push("/create-plans")}}
                    />
                    <NavBox
                    title= "Routine"
                    icon = {icons.plus}
                    handlePress={()=> {}}
                    />

              </View>
              
              
            </View>
          </View>
        
      </SafeAreaView>
  )
}

export default plans