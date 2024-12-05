import { View, Text } from 'react-native'
import React from 'react'
import { useState } from 'react';
import { TouchableOpacity } from 'react-native';
import exercises from '../constants/exercises';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/FontAwesome';
const ShowPastWorkouts = ({EID}) => {


    const [ lastWorkouts,setLastWorkouts ] = useState([]);



        const refreshLastWorkout = async (EID) => {


        if (lastWorkouts.length !== lastWorkouts.filter(workout => workout.EID === EID.toString()).length){
            console.log("Ich werde erfüllt")
            console.log(lastWorkouts)
            setLastWorkouts((prevLastWorkouts) => 
                prevLastWorkouts.filter(workout => workout.EID === EID.toString())
            );

        } else {
            console.log("Startet er Überhaupt")

            const allItemsJSON = await AsyncStorage.getItem(exercises[EID-1].Name);
            console.log("Wo hört er auf",allItemsJSON)
            if (allItemsJSON === null){
                setLastWorkouts([{EID:EID,R:null}]);
            } else{


            const allItems = JSON.parse(allItemsJSON);
            console.log("Wo hört er auf",allItems)


            const matchingDate = new Date(allItems[0].D).toISOString().split("T")[0];
            console.log("Wo hört er auf",matchingDate)

            const matchingExercises = allItems.filter((item) => new Date(item.D).toISOString("T")[0] !== matchingDate ); 
            console.log("Wo hört er auf",matchingExercises)
            
            if (matchingExercises.length > 0){
                console.log("Das wird gepseichert",matchingExercises)

                setLastWorkouts((prevLastWorkouts) => [...prevLastWorkouts, ...matchingExercises ]);
            } else {
                console.log("Er finded keine Einträge unter dieser ID")
            }
            }
        }
    }

       



  return (
    <View key={`${lastWorkouts.length}`} className="flex-1 justify-center items-center">
        {
            lastWorkouts.length > 0 ? 
            (<View>{
                
                (lastWorkouts[0].R !== null)?
                <View className="flex-row flex-wrap">{(lastWorkouts.map((workout,index) => {
                  return (
                    <View key={index} className="flex-row justify-between bg-blue-500 p-1 m-1 rounded-[5px] items-center">
                        <Text className="font-bold text-white">{workout.W} Kg |</Text>
                        <Text className="font-bold text-white mr-1"> {workout.R} Reps</Text>
                        <View>{workout.Wa == "white"? <Icon name="check-circle" size={20} color={workout.Wa === "red"?"white":"red"} />:null}</View>
                    </View>
                  )
                    }))}
                </View>

                :(<Text className="text-white">No past entrys</Text>)}
                <View className="items-center justify-center">
                <TouchableOpacity onPress={()=> refreshLastWorkout(EID)} className="bg-white p-2 rounded-[5px] my-2">
                    <Text className="font-bold">Hide Data</Text>
                </TouchableOpacity>
                </View>
            </View>
              )
            :
        (
        <TouchableOpacity className="bg-white p-2 rounded-[5px] my-2 h-[35px]" onPress={()=> refreshLastWorkout(EID)}>
            <Text className="font-bold">Last Workout Data </Text>
        </TouchableOpacity>
        )
        }
    </View>
  )
}

export default ShowPastWorkouts