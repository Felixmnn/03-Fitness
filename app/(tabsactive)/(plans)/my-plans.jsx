import { View, Text,TouchableOpacity } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { FlatList } from 'react-native'
import WorkoutBox from '../../../components/WorkoutBox'


const MyPlans = () => {
  return (
    <SafeAreaView className ="bg-primary h-full">
        <FlatList
        data={[{id:1}]}
        keyExtractor={(item) => item.$id}
        renderItem = {({item})=> (
          <WorkoutBox/>   
          
          
        )}
        ListHeaderComponent={() => (
          <Text className="text-white p-10 text-3xl">Deine Trainingspläne</Text>
        )}  
      />
    </SafeAreaView>
  )
}

export default MyPlans