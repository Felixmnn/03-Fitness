import { View, Text,TouchableOpacity, FlatList } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import WorkoutBox from '../../../components/WorkoutBox'
import { ScrollView } from 'react-native-web'

const DiscoverPlans = () => {
  return (
    <SafeAreaView className ="bg-primary h-full">
      <View>
      <View className="mb-2">
        <Text className="text-center font-bold text-3xl text-white mt-5">Hello World</Text>
        <Text className="ml-2 font-bold text-3xl text-white mt-5">Popular</Text>
        <FlatList
          data={[{id:1},{id:2}]}
          keyExtractor={(item)=> item.$id}
          renderItem={(item) => (
            <WorkoutBox/>
          )}
        horizontal
        contentContainerStyle={{ paddingHorizontal: 10 }}
        />
      </View>

      <View className="mb-2">
        <Text className="ml-2 font-bold text-3xl text-white mt-5">Strength</Text>
        <FlatList
          data={[{id:1},{id:2}]}
          keyExtractor={(item)=> item.$id}
          renderItem={(item) => (
            <WorkoutBox/>
          )}
        horizontal
        contentContainerStyle={{ paddingHorizontal: 10 }}
        />
      </View>

      <View className="mb-2">
        <Text className="ml-2 font-bold text-3xl text-white mt-5">New</Text>
        <FlatList
          data={[{id:1},{id:2}]}
          keyExtractor={(item)=> item.$id}
          renderItem={(item) => (
            <WorkoutBox/>
          )}
        horizontal
        contentContainerStyle={{ paddingHorizontal: 10 }}
        />
      </View>

         </View>
    </SafeAreaView>
  )
}

export default DiscoverPlans