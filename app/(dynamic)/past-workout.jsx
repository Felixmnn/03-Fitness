import { View, Text,FlatList,ScrollView } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useLocalSearchParams } from 'expo-router'
import exercises from '../../constants/exercises'
import RenderSets from '../../components/RenderSets'
import RenderSavedExercises from '../../components/RenderSavedExercises'
import { format } from 'date-fns';
import Icon from 'react-native-vector-icons/FontAwesome';


const PastWorkout = () => {
  const {data} = useLocalSearchParams();
  const workout = data?  JSON.parse(data):null

 
  function renderDuration (duration) {
    const hours = Math.floor(duration/60);
    const minutes = duration%60;
    const durationCOncatinated = `${(hours > 9)?hours : `0${hours}`}:${(minutes > 9)?minutes : `0${minutes}`} Hours`

    return durationCOncatinated
  }

  const formattedDate = (date)=>{
    return format(date, 'dd.MM.yyyy');
  }

  function renderMuscles () {
    const muscles = [];
    workout.SID.map((w) => {
      if (!(muscles.includes(w.EID))){
        muscles.push(w.EID);
      }
    })
    console.log(muscles);
    return muscles;
  }
  const muscles = renderMuscles();

  return (
  

    <View className="bg-black h-full justify-start">
        <Text className="text-white text-2xl font-bold text-center m-2">{workout.Name} - {formattedDate(workout.CDate)}</Text>
        <FlatList
        data = {workout.EIDs}
        keyExtractor={(item)=> item.toString()}
        ListHeaderComponent={()=>{
          return (
            <View className="bg-blue2 rounded-[10px] m-2 p-2 ">
              <ScrollView className="bg-blue-500 h-[150px] w-full">
                { muscles.map((muscle)=>
                
                <Text key={`${muscle}`} className="text-white font-bold">
                  {
                    muscle
                  }
                </Text>

                )}
              </ScrollView>
              <View className="items-center justify-center">
                <View className="flex-row items-center">
                  <Icon name="bank" size={20} color="white" /> 
                  <Text className="text-white m-1">Dauer</Text>
                </View>
              </View>
            </View>
          )
        }}
        renderItem={({item})=>{
          const recap = workout.SID.filter((object)=> object.EID == item);
          console.log(recap)
          return (
            <View>
              <Text className="text-white font-bold text-xl">{exercises[item-1].Name}</Text>
              <View className="flex-wrap flex-row">{(!(recap.length == 0))?(recap.map((object,index)=> (
                <View key={`${object.EID}-${index}`} className="bg-blue-500 p-1 m-1 rounded-[5px]">
                  <Text>{object.W} Kg | {object.R} Reps</Text>
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


  )
}

export default PastWorkout