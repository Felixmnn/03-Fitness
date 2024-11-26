import { View, Text,Image } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { images } from '../../constants'
import { FlatList } from 'react-native'
import ExerciseBox from '../../components/ExerciseBox'
import CustomButton from '../../components/CustomButton'
import { TouchableOpacity } from 'react-native'
import {icons} from '../../constants'
import { router } from 'expo-router'

const plan = () => {
  return (
    <SafeAreaView className="bg-primary h-full">
        <View className="my-5 items-center">
            <Image className="contain w-[90%]" source={images.thumbnail}/>
        </View>
        <View>
            <Text className = "font-bold text-white text-3xl m-5" >Plan Name</Text>
            
        </View>
        
        <Text className="text-white text-xl font-bold m-5">Target Muscles:</Text>
        <Text className="text-white text-xl font-bold m-5">Exercises:</Text>
        
        <FlatList
        data={[{id:1},{id:1},{id:1}]}
        keyExtractor={(item) => item.$id}
        renderItem={({item})=>(
            <ExerciseBox/>
        )   
        }
        ListFooterComponent={
            <TouchableOpacity onPress={()=>
                router.push("/all-exercises")
            }>
                <View className="flex-1 jsutify-center items-center ml-6 mt-[30px] pr-5">
                    <Image source={icons.plus} className="h-[40px] w-[40px]"/>
                </View>
                
            </TouchableOpacity>
        }
        horizontal
        />
            <CustomButton title={"Add to my Plans"} handlePress={()=>{

            }

            }/>
    </SafeAreaView>
  )
}

export default plan