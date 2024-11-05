import { View, Text, FlatList ,Image} from 'react-native'
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
            <View className="flex flex-row flex-wrap items-center justify-center">
               {numbers.map((element,index)=>{
                return(
                
                <View className={` ${element.WarmUp} border border-blue2 border-[3px] rounded-[5px] py-1 px-2 w-[90px] m-1 flex-row`}>
                    <View className="mx-[5px]">
                        <Text className="text-white font-bold">{`${element.Weight} Kg`}</Text>
                        <Text className="text-white font-bold">{`${element.Reps} Reps`}</Text>
                    </View>
                    <View>
                    {
                      (element.Notes !== "")? (<View className="mr-2"><Icon name="sticky-note" size={15} color="white" /></View>) : (<></>)
                    }
                    </View>
                </View>
                
            
                )
               })} 
            </View>
            )}

  return (
    <SafeAreaView className="bg-black h-full">
        <FlatList
        data={currentWorkout.EIDs}
        keyExtractor={(item,index) => index.toString()}
        renderItem={({item})=> {
            const e = exercises[item-1];
            const fE = currentWorkout.SID.filter(item => item.EID === e.EID)
            return (
                <View className=" m-2 p-2 border border-[3px] border-blue2">
                    <View className="flex-row items-center">
                        <Image source={e.Image} className="h-[70px] w-[70px]"/>
                        <View className="mx-2">
                            <Text className="text-white text-xl fon t-bold w-[100%]">{e.Name}</Text>
                            <Text className="text-white">Sets: {fE.length}</Text>
                        </View>
                    </View>
                    <View className="items-center">
                        {
                        (e.EID === shownExercercise)?
                        (<View> 
                            <View className="mt-3">{RenderExercises(fE)}</View>
                            <TouchableOpacity onPress={()=> {setShownExercise(null)
                            }} className="items-center justify-center"> 
                                <Icon name="angle-up" size={30} color="white" />
                            </TouchableOpacity>
                        </View>):


                        (<View> 
                            <TouchableOpacity onPress={()=> setShownExercise(e.EID)}>
                                {(fE.length > 0)?(<Icon name="angle-down" size={30} color="white" />):(<></>)}
                            </TouchableOpacity>
                        </View>)
                        }
                    </View>
                </View>
                
            )
        }}
        />
    </SafeAreaView>
  )
}

export default ProgressWorkout