import { View, Text, FlatList, Image, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import exercises from '../../constants/exercises';
import { router, useLocalSearchParams } from 'expo-router';
import { UserPlan } from "../../context/currentPlan";
import { useContext } from 'react';
import { UserWorkout } from '../../context/currentWorkout';
import CustomTextInput from '../../components/CustomTextInput';
import Icon from 'react-native-vector-icons/FontAwesome';
import CustomButton from '../../components/CustomButton';
import { Svg, Rect,LinearGradient, Stop } from 'react-native-svg';


const ExercisePicker = () => {


    //Function that ensures the Params are added in the right context
    const source = useLocalSearchParams()
    const {name} = source

    const {currentWorkout, setCurrentWorkout} = useContext(UserWorkout);
    const [ searchQuery, setSearchQuery ] = useState("");
    const [filteredData, setFilteredData] = useState(exercises);
    const [currentFilters, setCurrentFilters ] = useState([]);
    const [filtersShown, setFiltersShown ] = useState(false);
    const { currentPlan, setCurrentPlan } = useContext(UserPlan);
    const [selectedExercises, setSelectedExercises]  = useState([])

    const typeFilters = ["Barbell","Dumbbell","Machine","Free"]
    const muscleFilters = ["Shoulders","Chest","Back","Hamstrings","Biceps","Quads","Glutes","Triceps","Core","Obliques","Calves","Traps","Rear Deltoids","Lower Back"]


    //Alles was nichts mit Filtern zu tun hat:
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
    const addEID = (newEID) => {
      setCurrentPlan((prevPlan) => {
        const updatedEIDs = prevPlan?.EIDs ? [...prevPlan.EIDs, newEID] : [newEID];
    
        return {
          ...prevPlan,
          EIDs: updatedEIDs, 
        };});};


    

    //Alles was mit Filtern zu tun hat
  
    const [ appliedFilters, setAppliedFilters ] = useState([]);


    const handleSearch = (query) => {
      setSearchQuery(query);
      let filtered = exercises;
    
      if (query) {
        filtered = filtered.filter((item) =>
          item.Name.toLowerCase().includes(query.toLowerCase())
        );
      }
    
      if (appliedFilters.length > 0) {
        filtered = filtered.filter(
          (item) => appliedFilters.includes(item.MainMuscle) || appliedFilters.includes(item.Type)
        );
      }
    
      setFilteredData(filtered);
    };
    




    function toggleFilter (item) {
      if (appliedFilters.find((object)=> object == item)){
        setAppliedFilters(appliedFilters.filter((object)=> object !== item ));
        handleSearch();

      } else
      setAppliedFilters([...appliedFilters,item]);
      handleSearch();

    }
    
    useEffect(()=> {
      handleSearch(searchQuery);
    },[appliedFilters,searchQuery])

    

    
    


    
  
  return (
    <View className="bg-black h-full items-center ">
      <View className="max-w-[300px]">
      <View className="flex-row justify-center items-center m-2 mr-3 ">

      
        <CustomTextInput
        handlingChange={(query) => handleSearch(query)}
        title={searchQuery}
        placeholder={"Search..."}
        width={"w-[85%] mr-4"}
        />
        <TouchableOpacity onPress={()=>{setFiltersShown(!filtersShown)}}>
          <Icon name="sliders" size={35} color="white" />
        </TouchableOpacity>
      </View>

      <View>
        {(!filtersShown)?(<></>):(
          <View>
            

            <Text className="text-white font-bold text-xl mx-4">Types:</Text>
            <View className="flex-wrap flex-row mx-2">
            
              {typeFilters.map((item,index)=>(
                <TouchableOpacity key={`${item.id}-${index}`}  className={`${appliedFilters.includes(item)?("bg-blue-500 border border-[2px] border-blue-500"):("bg-black border border-[2px] border-blue-500 ")} p-1 m-1 rounded-[5px]`} onPress={()=> {toggleFilter(item)}}>
                    <Text className="text-white font-bold text-xl">{item}</Text>
                </TouchableOpacity>
              ))}
            </View>

            <Text className="text-white font-bold text-xl mx-4">Muscles:</Text>
            <View className="flex-wrap flex-row mx-2">
            
            {muscleFilters.map((item,index)=>(
              <TouchableOpacity key={`${item.id}-${index}`} className={`${appliedFilters.includes(item)?("bg-blue-500 border border-[2px] border-blue-500"):("bg-black border border-[2px] border-blue-500 ")} p-1 m-1 rounded-[5px]`} onPress={()=> {toggleFilter(item)}}>
                  <Text className="text-white font-bold text-xl">{item}</Text>
              </TouchableOpacity>
            ))}
            
            
            </View>
            <View className="w-full items-center justify-center flex-row mt-2">
            
            <CustomButton
              containerStyles={"bg-blue2 ml-2 mr-1 w-[45%] "}
              textStyles={"text-white"}
              title={"Apply Filters"}
              handlePress={()=>{setFiltersShown(!filtersShown)}}
            />

            <CustomButton
              containerStyles={"bg-blue2 ml-1 mr-2 w-[45%]"}
              textStyles={"text-white"}
              title={"Reset Filters"}
              handlePress={()=> setAppliedFilters([])}
            />

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
            keyExtractor={(item) => item.EID.toString()}
            className="m-2 px-1 rounded-[5px] bg-blue2"
            renderItem={({item}) => (

              <View className="m-1">
                {selectedExercises.includes(item.EID)?(
                  <View>
                    <TouchableOpacity 
                        onPress={()=> {
                      setSelectedExercises(selectedExercises.filter(num => num !== item.EID))
                      console.log(selectedExercises)
                    }}
                    className={`flex-row  w-full justify-between items-center bg-blue-500 rounded-[5px]  }`}
                    >

                            {/*<Image source={item.Image} className="h-[80px] w-[80px] m-2"/> */}
                            <Text className="text-white w-[70%] font-bold text-xl p-2 ">{item.Name}</Text>
                    </TouchableOpacity>
                  </View>
                ):(
                  <View>
                    <TouchableOpacity 
                          onPress={()=> {
                        setSelectedExercises([...selectedExercises,item.EID])
                        console.log(selectedExercises)
                      }}
                      className={`flex-row w-full justify-between items-center  }`}
                      >

                              {/*<Image source={item.Image} className="h-[80px] w-[80px] m-2"/>*/}
                              <Text className="text-white w-[70%] font-bold text-xl p-2 ">{item.Name}</Text>
                    </TouchableOpacity>
                  </View>
                )}
              </View>
              
            )}
            
            />
              <Svg height="40" width="100%" className="absolute bottom-0 left-0 right-0 z-10">
                <LinearGradient id="fadeBottom" x1="0%" y1="0%" x2="0%" y2="100%">
                  <Stop offset="100%" stopColor="rgba(18, 18, 18, 1)" stopOpacity="1" />
                  <Stop offset="0%" stopColor="rgba(18, 18, 18, 1)" stopOpacity="0" />
                </LinearGradient>
                <Rect x="0" y="0" width="100%" height="40" fill="url(#fadeBottom)" />
              </Svg>
         </View>
        
        )
        }
      </View>
      
      <CustomButton
      textStyles={"text-white"}
      containerStyles={"bg-blue2 m-4 "}
      title={"Add To Plan"}
      handlePress={  
        
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
        )}
      />
      
      
        
    </View>
    </View>
  );
};

export default ExercisePicker;
