import { View, Text, FlatList, Image, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import exercises from '../../constants/exercises';

import { router, useLocalSearchParams } from 'expo-router';
import { useRouter } from 'expo-router';
import { images } from '../../constants';

import { UserPlan } from "../../context/currentPlan";
import { useContext } from 'react';
import { UserWorkout } from '../../context/currentWorkout';
import { TextInput } from 'react-native-web';
import CustomTextInput from '../../components/CustomTextInput';
import Icon from 'react-native-vector-icons/FontAwesome';



const ExercisePicker = () => {


    //Function that ensures the Params are added in the right context
    const source = useLocalSearchParams()
    const {name} = source

    const {currentWorkout, setCurrentWorkout} = useContext(UserWorkout);
    const [ searchQuery, setSearchQuery ] = useState("");
    const [filteredData, setFilteredData] = useState(exercises);
    const [currentFilters, setCurrentFilters ] = useState([]);
    const [filtersShown, setFiltersShown ] = useState(false);
    const [ appliedFilters, setAppliedFilters ] = useState([]);
    const [ ppliedEFiliters, setAppliedEFilters] = useState([])

    const typeFilters = ["Barbell","Dumbbell","Machine","Free"]
    const muscleFilters = ["Shoulders","Chest","Back","Hamstrings","Biceps","Quads","Glutes","Triceps","Core","Obliques","Calves","Traps","Rear Deltoids","Lower Back"]



    const toggleExerciseFilter = (filter) => {
      setAppliedEFilters((prevFilters)=> {
        if (prevFilters.includes(filter)){
          return prevFilters.filter((item) => item !== filter)
        } else {
          return [...prevFilters,filter]
        }
      }
    )
    }
    const toggleFilter = (filter) => {
      setAppliedFilters((prevFilters)=> {
        if (prevFilters.includes(filter)){
          return prevFilters.filter((item) => item !== filter)
        } else {
          return [...prevFilters,filter]
        }
      })
    }

    const changeFilterVisibility = ()=>{
      setFiltersShown(!filtersShown)
    }

    const handleNewFilters = (newFilters) => {
      setCurrentFilters([...currentFilters,newFilters]);
        }

    const handleFilterRemoval = (takeFilters) => {
      newArray = currentFilters.filter((item)=> item !== valueToRemove);
      setCurrentFilters(newArray);
    }


    const handleSearch = (query) => {
      console.log(query);
      setSearchQuery(query);
      let filtered = exercises;
    
      // Filter by name
      if (query) {
        filtered = filtered.filter((item) =>
          item.Name.toLowerCase().includes(query.toLowerCase())
        );
      }
    
      // Filter by types (appliedFilters)
      if (appliedFilters.length > 0) {
        filtered = filtered.filter((item) =>
          appliedFilters.includes(item.Type) // Assuming each exercise object has a `Type` property
        );
      }
    
      // Filter by muscle groups (appliedEFilters)
      if (appliedEFilters.length > 0) {
        filtered = filtered.filter((item) =>
          item.Muscles.some((muscle) => appliedEFilters.includes(muscle)) // Assuming each exercise object has a `Muscles` property that is an array
        );
      }
    
      setFilteredData(filtered);
    };

  


    //Adds the selected exercises to the previous Exercises

    const addExercisesWorkout = (newExercises) => {
      setCurrentWorkout((prevWorkout) => {
        const newWorkout = [...prevWorkout.EIDs,...newExercises]
        return {
          ...prevWorkout,
          EIDs:newWorkout,
        }
      })
    }


    const addExercises = (newExercises)=> {
      setCurrentPlan((prevPlan) => {
        const newArray = [...prevPlan.EIDs,...newExercises]
        return {
          ...prevPlan,
          EIDs:newArray,
        }
      })
    }

    const { currentPlan, setCurrentPlan } = useContext(UserPlan);
    const [selectedExercises, setSelectedExercises]  = useState([])
    


    const addEID = (newEID) => {
      setCurrentPlan((prevPlan) => {
        const updatedEIDs = prevPlan?.EIDs ? [...prevPlan.EIDs, newEID] : [newEID];
    
        return {
          ...prevPlan,
          EIDs: updatedEIDs, 
        };});};

  
  return (
    <SafeAreaView className="bg-black h-full">
      <Text className="text-white text-3xl font-bold text-center my-5">
        Choose a Exercise
      </Text>
      <View className="flex-row justify-center items-center m-2 mr-3">

      
        <CustomTextInput
        handlingChange={(query) => handleSearch(query)}
        title={searchQuery}
        placeholder={"Search..."}
        width={"w-[85%] mr-4"}
        />
        <TouchableOpacity onPress={()=>{changeFilterVisibility()}}>
          <Icon name="sliders" size={35} color="white" />
        </TouchableOpacity>
      </View>

      <View>
        {(!filtersShown)?(<></>):(
          <View>
            

            <Text className="text-white font-bold text-xl m-2">Types:</Text>
            <View className="flex-wrap flex-row">
            
            {typeFilters.map((item,index)=>(
              <TouchableOpacity className={`${appliedFilters.includes(item)?("bg-blue-500 border border-[2px] border-blue-500"):("bg-black border border-[2px] border-blue-500 ")} p-1 m-1 rounded-[5px]`} onPress={()=> {toggleFilter(item)}}>
                  <Text className="text-white font-bold text-xl">{item}</Text>
              </TouchableOpacity>
            ))}
            
            <Text className="text-white font-bold text-xl m-2">Muscles:</Text>
            <View className="flex-wrap flex-row">
            
            {muscleFilters.map((item,index)=>(
              <TouchableOpacity className={`${appliedFilters.includes(item)?("bg-blue-500 border border-[2px] border-blue-500"):("bg-black border border-[2px] border-blue-500 ")} p-1 m-1 rounded-[5px]`} onPress={()=> {toggleExerciseFilter(item)}}>
                  <Text className="text-white font-bold text-xl">{item}</Text>
              </TouchableOpacity>
            ))}
            
            
            </View>
            </View>
          </View>
        )

        }
      </View>

      <View className="flex-1">
        {(filtersShown)?(<></>):(
     
          <View className="h-[100%]">
          
          <FlatList
            
            data = {filteredData}
            keyExtractor={(item) => item.EID}
            

            renderItem={({item}) => (

              <View>
                {selectedExercises.includes(item.EID)?(
                  <View>
                    <TouchableOpacity 
                        onPress={()=> {
                      setSelectedExercises(selectedExercises.filter(num => num !== item.EID))
                      console.log(selectedExercises)
                    }}
                    className={`flex-row border-2 border border-blue2 w-full justify-between items-center bg-blue2 }`}
                    >

                            <Image source={item.Image} className="h-[80px] w-[80px] m-2"/>
                            <Text className="text-white w-[70%] font-bold text-xl ">{item.Name}</Text>
                    </TouchableOpacity>
                  </View>
                ):(
                  <View>
                    <TouchableOpacity 
                          onPress={()=> {
                        setSelectedExercises([...selectedExercises,item.EID])
                        console.log(selectedExercises)
                      }}
                      className={`flex-row border-2 border border-blue2 w-full justify-between items-center  }`}
                      >

                              <Image source={item.Image} className="h-[80px] w-[80px] m-2"/>
                              <Text className="text-white w-[70%] font-bold text-xl ">{item.Name}</Text>
                    </TouchableOpacity>
                  </View>
                )}
              </View>
              
            )}
            
            />     
         </View>)}
      </View>
      <TouchableOpacity className="bg-blue2 rounded-[10px] mx-5 my-5 p-2 "
      onPress={  
        
        (name === "workout") ? (()=>{
          console.log(selectedExercises)
          console.log(currentWorkout.EIDs)
          addExercisesWorkout(selectedExercises)
          console.log(currentWorkout.EIDs)
          router.back()
        }): 
        (()=>{
          console.log(name)
          addExercises(selectedExercises)
          router.back()}
        )}>
        <Text className="text-xl text-white font-bold text-center text-center">
          Add to Plan
        </Text>
      </TouchableOpacity>  
      
      
        
    </SafeAreaView>
  );
};

export default ExercisePicker;
