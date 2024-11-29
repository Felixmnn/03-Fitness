import { View, Text, FlatList ,Image,ScrollView} from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useContext } from 'react'
import { UserWorkout } from '../../context/currentWorkout'
import exercises from '../../constants/exercises'
import { useEffect } from 'react'
import Icon from 'react-native-vector-icons/FontAwesome';
import { TouchableOpacity } from 'react-native'



const ProgressWorkout = () => { 


    useEffect (()=> {
        setCurrentWorkout((prevWorkout) => ({
            ...prevWorkout,
            EIDs: [...new Set(currentWorkout.EIDs)]
        }))
        
    },[])

    const {currentWorkout, setCurrentWorkout} = useContext(UserWorkout);

    const [shownExercercise, setShownExercise] = useState(null)

    const RenderExercises = (numbers)=> {

        return(
            <View className="flex flex-row flex-wrap items-center ">
                
               {numbers.map((element,index)=>{
                return(
                
                <View key={`${element.EID}-${index}`} className={` ${element.W} bg-blue-500 rounded-[5px] py-1 px-2 m-1 flex-row flex-wrap  items-center justify-center`}>
                    <View className="mx-[5px]">
                        <Text className="text-white font-bold">{`${element.W} Kg | ${element.R} Reps`}</Text>
                    </View>
                    <View>
                    {
                      (element.W !== "bg-black")? (<View className="mr-2"><Icon name="fire" size={15} color="white" /></View>) : (<></>)
                    } 
                    </View>
                    <View>
                    {
                      (element.N !== "")? (<View className="mr-2"><Icon name="sticky-note" size={15} color="white" /></View>) : (<></>)
                    }
                    </View>
                    
                </View>
                
            
                )
               })} 
            </View>
            )}


    

  return (
    <SafeAreaView className="bg-black h-full">
        <View className="h-[100%]">
        <FlatList
        data= {currentWorkout.EIDs}
        keyExtractor={(item) => item.toString()}
        renderItem = {({item})=>{
            const e = exercises[item-1];
            const fE = currentWorkout.SID.filter(item => item.EID === e.EID)

            return (
                <View className="rounded-[10px] bg-blue2 m-2 p-2">
                   <View className="flex-row items-center">
                        <Image source={e.Image} className="h-[70px] w-[70px]"/>
                        <View className="mx-2">
                            <Text className="text-white text-xl fon t-bold w-[100%]">{e.Name}</Text>
                            <Text className="text-white">Sets: {fE.length}</Text>
                        </View> 
                    </View>
                    <View> 
                        <View className="mt-3">{RenderExercises(fE)}</View>
                            <TouchableOpacity onPress={()=> {setShownExercise(null)
                            }} className="items-center justify-center"> 
                            </TouchableOpacity>
                        </View>
                    </View>
            )
        }
        }
        />  
        </View> 
    </SafeAreaView>
  )
}

export default ProgressWorkout