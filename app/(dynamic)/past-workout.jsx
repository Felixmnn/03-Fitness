import { View, Text,FlatList,ScrollView,TouchableOpacity,Alert } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { router, useLocalSearchParams } from 'expo-router'
import exercises from '../../constants/exercises'
import RenderSets from '../../components/RenderSets'
import RenderSavedExercises from '../../components/RenderSavedExercises'
import { format } from 'date-fns';
import Icon from 'react-native-vector-icons/FontAwesome';
import CustomButton from '../../components/CustomButton';
import AsyncStorage from '@react-native-async-storage/async-storage'
import { deleteWorkout } from '../../lib/appwrite'
import Toast from 'react-native-toast-message'
import  {ExerciseShop}  from '../../lib/svg'
import Svg, { Rect,Path } from 'react-native-svg';

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
  
  function renderMuscleName () {
    const muscleArr = [];
    muscles.map((e)=>{
      muscleArr.push(exercises[e].MainMuscle)
    })
    console.log(muscleArr);
    return muscleArr;
  }
  const muscleArr = renderMuscleName();

  return (
  

    <View className="bg-black h-full justify-start">
        <Text className="text-white text-2xl font-bold text-center m-2">{workout.Name} - {formattedDate(workout.CDate)}</Text>
        <FlatList
        data = {workout.EIDs}
        keyExtractor={(item)=> item.toString()}
        ListHeaderComponent={()=>{
          return (
            <View className="bg-blue2 rounded-[10px] m-2 p-2 ">
              <Text className="text-xl font-bold text-white text-center mb-2">Involved Muscles</Text>
              <View>
              {ExerciseShop({inVolved: Array.isArray(muscleArr) ? muscleArr : ["empty"]})
}
              </View>
              <View className="items-center justify-center">
                <View className="flex-row items-center">
                  <Icon name="clock-o" size={20} color="white" /> 
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

              
              {(!(recap.length == 0))?(
                <View className="m-2">
                  <Text className="text-white font-bold text-xl">{exercises[item-1].Name}</Text>
                  <View className="flex-wrap flex-row">
                    {
                    recap.map((object,index)=> (
                      <View key={`${object.EID}-${index}`} className="bg-blue-500 p-1 mr-1 my-1 rounded-[5px]">
                        <Text>{object.W} Kg | {object.R} Reps</Text>
                      </View>))
                    }
                  </View>
                </View>
              ):(
                null
              )}
          </View>
            
          )
        }}
        />
        
        <TouchableOpacity 
          className="bg-red-900 p-2 rounded-[5px] m-2"
          onPress={async()=> {
            Alert.alert(
              "Warning",
              "After deletion a Workout cant be restored!",
              [
                      {
                        text: "Delete",
                        onPress: async()=> {
                          console.log(workout);
                          deleteWorkout(workout.DataBaseID);
                          AsyncStorage.removeItem(`Workout-${workout.WID}`);
                          console.log("Workout wurde gelöscht");
                          Toast.show({
                            type: 'success', 
                            position: 'top',
                            text1: `Workout has been Deleted`, 
                          });
                          router.push("/");
                        }
                      },
                      {
                        text: "Cancel",
                        style: "cancel",
                      },
            ]

            )

          }}
        >
          <Text className="text-xl font-bold text-white text-center">Delete Workout</Text>
        </TouchableOpacity>
        
        </View>


  )
}

export default PastWorkout