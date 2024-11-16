import { View, Text, FlatList, ScrollView, Image} from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import NavBox from '../../components/NavBox'
import { icons } from '../../constants'
import { router } from 'expo-router'
import ProfilePicture from 'components/ProfilePicture';
import { TouchableOpacity } from 'react-native'
import WorkoutBox from '../../components/WorkoutBox'
import WorkoutBoxV2 from '../../components/WorkoutBoxV2'
import Main from '../../components/Main'
import Footer from '../../components/Footer'
import { useState } from 'react'
import { useEffect } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Icon from 'react-native-vector-icons/FontAwesome';
import exercises from '../../constants/exercises'
import CustomButton from '../../components/CustomButton'
import { isTemplateLiteralToken } from 'typescript'
import { styled } from 'nativewind'
import {images} from '../../constants'
const plans = () => {
  const [filteredKeys, setFilteredKeys] = useState([]);
  const [items,setItems] = useState([]);

  const StyledView = styled(View);
  const StyledText = styled(Text)
  



  const getKeyObject = async(key)=>{
    const rawData = await AsyncStorage.getItem(key)
    const parsedtData = JSON.parse(rawData) 
    return parsedtData
  }

  useEffect(() => {
    const fetchKeysAndData = async () => {
      try {
        const storedKeys = await AsyncStorage.getAllKeys();

        const planKeys = storedKeys.filter(key => key.startsWith("Plan-"));
        setFilteredKeys(planKeys);

        // Lade die Plandaten für jeden Schlüssel
        const plansData = await Promise.all(planKeys.map(async key => await getKeyObject(key)));
        console.log(plansData)
        setItems(plansData.filter(item => item !== null)); // Setze den Zustand mit validen Objekten
      } catch (error) {

        console.log(error);
      }
    };
    fetchKeysAndData();
  }, []);





  const yourPlans = ()=>  {
    return (

          (items)?(
            <FlatList
              data = {items}
              keyExtractor={(item)=> item.PID.toString()}
              renderItem={({item})=>{
                return (
                  <View className="bg-blue2 rounded-[10px] p-2 m-2">
                    <View className="flex-row justify-between">
                      <Text className="text-white font-bold text-2xl ">{item.Name}</Text>
                      <TouchableOpacity onPress={()=> {
                        router.push({pathname:"/edit-workout", params: { data: JSON.stringify(item)}  })
                        
                        }}>
                        <Icon name="edit" size={30} color={"red"}/> 
                      </TouchableOpacity>
                    </View>
                    <Text className="text-white font-bold text-xl ">Exercises:</Text>
                    <View className="flex-wrap flex-row p-[1px]">
                    {
                      item.EIDs.map((eid)=>(
                        <View key={eid} className="bg-blue-500 m-1 p-1 rounded-[5px] jus">
                          <Text>{exercises[eid-1].Name}</Text>
                        </View>
                      ))
                    }
                    </View>
                    
                    <Text className="text-white font-bold text-xl">Muscle Groups:</Text>
                      <View className="flex-wrap flex-row p-[1px]">
                          {
                          item.EIDs.map((eid)=>(
                            <View key={eid} className="bg-blue-500 m-1 p-1 rounded-[5px] jus">
                              <Text>{exercises[eid-1].MainMuscle}</Text>
                            </View>
                          ))
                        }
                      </View>

                      <CustomButton
                        title="Start Workout"
                        containerStyles={" bg-black  m-1 h-[50px] "} 
                        textStyles = {"text-white"}
                        handlePress={()=> {
                          router.push({pathname:"/active-home", params: { data: JSON.stringify(isTemplateLiteralToken)}})}}
                        /> 
                  </View>
                )
                
              }
              }
              />
          ):(<View className="bg-blue2 rounded-[10px] p-2 h-[150px] justify-center">
            
              <TouchableOpacity className="justify-center items-center">
                <Text className="text-center text-white font-bold ">Looks like you're just getting Started.</Text>
                <Text className="text-center text-white font-bold ">Time for your first Workout:</Text>
                <Icon name="plus" size={30} color={"white"}/>
              </TouchableOpacity>
          </View>))
  }

  

  const fContent = ()=> {
    return (
      <View className="flex-row">
    <NavBox
      title= "Workout"
      icon = {icons.plus}
      handlePress={()=> {router.push("/create-plans")}}
    />

    <Image
    source={images.scedulesc}
    className="h-[150px] w-[150px] rounded-[10px] ml-2"
    />
   
  
    

    
    </View>
  )
  }

  

  return (  
      <SafeAreaView className="bg-black h-full">
        <View className="flex-1 m-2 justify-between">
          <ProfilePicture message="Plans"/>
          <Main content={yourPlans()}/>
          <Footer footerTitle="Create:" content={fContent()} />
        </View>
      </SafeAreaView>
  )
}

export default plans