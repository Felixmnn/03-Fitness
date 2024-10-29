import { View, Text, FlatList } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useContext } from 'react'
import { UserWorkout } from '../../context/currentWorkout'
import exercises from '../../constants/exercises'
import { useEffect } from 'react'



const ProgressWorkout = () => { 


    useEffect (()=> {
        setCurrentWorkout((prevWorkout) => ({
            ...prevWorkout,
            EIDs: [...new Set(currentWorkout.EIDs)]
        }))
        
    },[])

    const {currentWorkout, setCurrentWorkout} = useContext(UserWorkout);

  return (
    <SafeAreaView className="bg-primary h-full">
        <FlatList
        data={currentWorkout.EIDs}
        keyExtractor={(item,index) => index.toString()}
        renderItem={({item})=> {
            const e = exercises[item-1];
            const sA = currentWorkout.SID.filter(set => set.EID === item-1 )
            return (
                <View className="bg-blue2 m-5 p-2">
                    <Text className="text-white text-3xl">{e.Name}</Text>
                    {sA.map((set,index) => (
                        <View key={index}>
                            <Text className="text-white">Reps: {set.Reps}  Weight: {set.Weight}</Text>
                        </View>
                        ))}
                </View>
                
            )
        }}
        />
    </SafeAreaView>
  )
}

export default ProgressWorkout