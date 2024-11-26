import { View, Text,FlatList } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useLocalSearchParams } from 'expo-router'
import exercises from '../../constants/exercises'
import RenderSets from '../../components/RenderSets'
import RenderSavedExercises from '../../components/RenderSavedExercises'

const PastWorkout = () => {
  const {data} = useLocalSearchParams();
  const workout = data?  JSON.parse(data):null

 
  function renderDuration (duration) {
    const hours = Math.floor(duration/60);
    const minutes = duration%60;
    const durationCOncatinated = `${(hours > 9)?hours : `0${hours}`}:${(minutes > 9)?minutes : `0${minutes}`} Hours`

    return durationCOncatinated
  }

  return (
  

    <SafeAreaView className="bg-black h-full">
      <Text className="text-white text-3xl font-bold text-center">{workout.Name}</Text>
      <View className="justify-between flex-row ">
        <Text className="text-white text-xl font-bold mx-2">Duration:</Text>
        <Text className="text-white text-xl font-bold mx-2">{renderDuration(workout.Duration)}</Text>
      </View>
      <Text className="text-white font-bold text-2xl mx-2 mt-2">Exercises</Text>
      <View className="mx-2 h-[80%]">
        
        <FlatList
        data = {workout.EIDs}
        keyExtractor={(item)=> item.toString()}
        renderItem={({item})=>{
          const recap = workout.SID.filter((object)=> object.EID == item);
          console.log(recap)
          return (
            <View>
              <Text className="text-white font-bold text-xl">{exercises[item-1].Name}</Text>
              <View className="flex-wrap flex-row">{(!(recap.length == 0))?(recap.map((object,index)=> (
                <View key={`${object.EID}-${index}`} className="bg-blue-500 p-1 m-1 rounded-[5px]">
                  <Text>{object.Weight} Kg | {object.Reps} Reps</Text>
                </View>
              ))):(
                <View className="bg-blue-500 p-1 m-1 rounded-[5px]">
                  <Text>No Entrys</Text>
                </View>
              )}
            </View>
          </View>
            
          )
        }}
        /> 
        </View>

    </SafeAreaView>

  )
}

export default PastWorkout