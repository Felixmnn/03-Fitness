import { View, Text, Image } from 'react-native'
import React, { useEffect } from 'react'
import { useLocalSearchParams } from 'expo-router'
import exercises from '../../constants/exercises'
import { UserWorkout, WorkoutProvider } from "../../context/currentWorkout"
import { SafeAreaView } from 'react-native-safe-area-context'
import { useContext } from 'react'
import { FlatList } from 'react-native'
import { TouchableOpacity } from 'react-native'
import { router } from 'expo-router'

const ActiveExercisePicker = () => {
    const { currentWorkout, setCurrentWorkout } = useContext(UserWorkout);



    useEffect (()=> {
        setCurrentWorkout((prevWorkout) => ({
            ...prevWorkout,
            EIDs: [...new Set(currentWorkout.EIDs)]
        }))
        
    },[])


    const setSelectedExercise = (name,image,id)=> {
        setCurrentWorkout((prevWorkout) => ({
            ...prevWorkout,
            Selected:{EID:id,Name:name,Image:image}
            
        })
        )
        
    }

  return (


    <SafeAreaView className="h-full bg-primary">

        <FlatList
            data = {currentWorkout.EIDs}
            keyExtractor={(item, index)=> index.toString()}
            renderItem={({item})=> {
                const e = exercises[item-1];
                return (
                    <TouchableOpacity className="m-5 bg-black" onPress={()=> {
                        console.log(e.Name,e.Image,e.EID)
                        setSelectedExercise(e.Name,e.Image,e.EID)
                        router.push("/active-home")
                    }
                    
                    }>
                        <Text className="text-3xl text-white">
                            {e.Name}
                        </Text>

                        <Image source={e.Image}/>
                    </TouchableOpacity>
                    
                )
                

        }}
        />

        <TouchableOpacity onPress={()=> {console.log(currentWorkout.EIDs)}}>
        <Text className="text-white text-3xl">{currentWorkout.EIDs}</Text>

        </TouchableOpacity>
    </SafeAreaView>



  )
}

export default ActiveExercisePicker