import { View, Text, Image } from 'react-native'
import React, { useEffect } from 'react'
import { useLocalSearchParams, usePathname } from 'expo-router'
import exercises from '../../constants/exercises'
import { UserWorkout, WorkoutProvider } from "../../context/currentWorkout"
import { SafeAreaView } from 'react-native-safe-area-context'
import { useContext } from 'react'
import { FlatList } from 'react-native'
import { TouchableOpacity } from 'react-native'
import { router } from 'expo-router'
import Icon from 'react-native-vector-icons/FontAwesome';

const ActiveExercisePicker = () => {
    const { currentWorkout, setCurrentWorkout } = useContext(UserWorkout);



    useEffect (()=> {
        setCurrentWorkout((prevWorkout) => ({
            ...prevWorkout,
            EIDs: [...new Set(currentWorkout.EIDs)]
        }))
        
    },[])


    const setSelectedExercise = (id)=> {
        setCurrentWorkout((prevWorkout) => ({
            ...prevWorkout,
            Selected:id
            
        })
        )
        
        
    }

    const getAmountPastSets = (id) => {
        return currentWorkout.SID.filter(item => item.EID === id).length
      }

  return (


    <SafeAreaView className="h-full bg-black">
        
        <FlatList
            data = {currentWorkout.EIDs}
            keyExtractor={(item, index)=> index.toString()}
            renderItem={({item})=> {
                const e = exercises[item-1];
                return (
                   <TouchableOpacity className="border border-[3px] border-blue2 p-2 flex-row justify-between items-center m-2"
                   onPress={()=> {
                    setSelectedExercise(e.EID)
                    router.back()
                   }
                    }
                   >
                    
                    <View className="flex-row">
                        <Image className="h-[70px] w-[70px] " source={e.Image}/>
                        <View className="justify-center">
                            <Text className="text-white text-xl font-bold w-[150px] h-[25px] mx-3">{e.Name}</Text>
                            <Text className="text-white font-bold mx-3">{`Sets Today: ${getAmountPastSets(e.EID)}`}</Text>
                        </View>
                    </View>
                    <View className="justify-center items-center  w-[40px] h-[40px]">
                        <Icon name="plus" size={30} color="#40E0D0"/>
                    </View>
                   </TouchableOpacity>
                    
                )
                

        }}
        ListFooterComponent={()=>{
            return (
            <TouchableOpacity
                onPress={()=>
                     router.push({
                        pathname:"/exercise-picker",
                        params:{name:"workout"}
                    })}
                className="border border-[3px] border-blue2 p-2 justify-center items-center m-2">
                <Text className="text-xl text-white font-bold">Add Exercies</Text>
            </TouchableOpacity>
            )
            
        }}
        />
        

    </SafeAreaView>



  )
}

export default ActiveExercisePicker