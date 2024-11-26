import { View, Text,FlatList, TouchableOpacity,Image } from 'react-native'
import React from 'react'
import exercises from '../constants/exercises'
import Icon from 'react-native-vector-icons/FontAwesome';
import { useState } from 'react';



const RenderSavedExercises = ({SID,EIDs, passed}) => {
// was brauche ich alles exercises EIDs
// currentworkout.SID
    const [shownExercercise, setShownExercise] = useState(null)

    const RenderExercises = (numbers)=> {

        return(
            <View className="flex flex-row flex-wrap items-center justify-center">
               {numbers.map((element,index)=>{
                return(
                
                <View key={`${element.EID}-${index}`}  className={` ${element.WarmUp} border border-blue2 border-[3px] rounded-[5px] py-1 px-2 w-[90px] m-1 flex-row`}>
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
    <FlatList
        data={EIDs}
        keyExtractor={(item) => item.toString()}
        renderItem={({item})=> {
            const e = exercises[item-1];
            const fE = SID.filter(item => item.EID === e.EID)
            return (
                (fE.length === 0 || fE === null)?(<></>):(
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
                
            ))
        }}
        />
  )
}

export default RenderSavedExercises