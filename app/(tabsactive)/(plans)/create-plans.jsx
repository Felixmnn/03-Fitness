import { View, Text, SafeAreaView, Image, TextInput, FlatList, ScrollView } from 'react-native';
import { icons, images } from '../../../constants';
import { TouchableOpacity } from 'react-native';
import { router } from 'expo-router'; // Verwende `useSearchParams`
import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import exercises from '../../../constants/exercises'; // Überprüfe den Zugriff auf Übungen
import { useLocalSearchParams } from 'expo-router';
import  CustomButton  from "../../../components/CustomButton";

 
const CreatePlan = () => {
  const {updatedData} = useLocalSearchParams();
  const [exerciseIDs, setExerciseIDs] = useState(updatedData ? JSON.parse(updatedData) : [0])

  const removeExercise = (index) => {
    setExerciseIDs((prevIDs) => {
      const updateIDs = [...prevIDs];
      updateIDs.splice(index,1);
      return updateIDs;
    })
  }
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [difficulty,setDifficulty] = useState("Easy")
  const [buttonColor,setButtonColor] = useState ("bg-green-900")

  const changeButtonColor = () => {
    setButtonColor(prevColor => 
      prevColor === "bg-green-900" ? "bg-red-400" : 
      prevColor === "bg-red-400" ? "bg-red-900" : 
      "bg-green-900"
    );
  };
  
  const changeDifficulty = ()=> {
    if (difficulty === "Easy") {
      setDifficulty("Medium");
    } else if (difficulty === "Medium"){
      setDifficulty("Hard")
    } else {
      setDifficulty("Easy")
    }
  }


  const [finalPlan,setFinalPlan] = useState([{PID:"",
                                    Type:"Plan",
                                    Name:"",
                                    Description:"",
                                    EIDs:[],
                                    Difficulty:1,
                                    Duration:1,
                                    CDate:"",     //Creation Date
                                    LUData:"",    //Last Use Date
                                    Keywords:[],
                                    Public:false
                                  }])
  return (
    <SafeAreaView className="bg-primary h-full">
      <View className="justify-center m-5 items-center h-full">
        <View className="p-5 m-5 w-full h-full flex-1 border border-red-900 border-2">
          <Text className="text-center text-white text-3xl font-bold ">Create Plan</Text>
          <View className="p-1 border border-red-900 flex-1 h-full ">
            <TextInput
            className="my-2 w-full bg-white h-[40px] text-xl"
            placeholder="Name"
            value={name}
            onChangeText={(text)=> {setName(text)}}
            />
            <TextInput
            className="my-2 w-full bg-white h-[40px] text-xl "
            placeholder="Name"
            value={description}
            onChangeText={(text)=> {setDescription(text)}}
            
            />
            <View className="flex-row justify-between">
              
              <CustomButton
                containerStyles= {`my-[15px] my-2 w-[50%] h-[50px] ${buttonColor}`}

                style = {{backgroundColor: buttonColor}}
                title = {difficulty}
                handlePress={()=> {
                  changeDifficulty()
                  changeButtonColor()
                }} 
              />

              <TextInput
              className=" my-2 w-[40%] bg-white h-[50px] text-xl"
              placeholder="Name"
              /> 
              
            </View>
            <Text className="text-white text-2xl gont-bold">Exercises: </Text>
            <FlatList
              data={exerciseIDs}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item,index }) => {
                const e = exercises.find(ex => ex.EID === item);
                if (e) {
                  return (
                    <View className="flex-row justify-between items-center bg-black rounded-[10px] mt-2">
                        <View className="flex-row justify-center items-center ">
                          <Image source={e.Image} className="w-[60px] h-[60px] m-2 rounded-[5px]"/>
                          <Text className="text-xl text-white">{e.Name}</Text> 
                        </View>
                          <TouchableOpacity onPress={()=> removeExercise(index) } className="mr-2">
                            <Image source={icons.eye} className="w-[40px] h-[40px] recisemode-contain"/>
                          </TouchableOpacity>
                      </View>
                     
                    
                  );
                }
                return null; 
              }}
              ListFooterComponent={
              <TouchableOpacity onPress={ ()=> {
                router.push({
                  pathname:"/exercise-picker",
                  params:{data:JSON.stringify(exerciseIDs)}})}}
                  >
                <Image className="m-5"source={icons.plus}/>
                
              </TouchableOpacity>}
            />
            
          </View>
          
          <View className="flex-row justify-center mt-2">
            <TouchableOpacity onPress={()=> {
              console.log(description)
            }}>
              <Image source={icons.plus} className="h-[60px] w-[60px] mx-5"/>
            </TouchableOpacity>
            <TouchableOpacity>
              <Image source={icons.plus} className="h-[60px] w-[60px] mx-5"/>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default CreatePlan;
