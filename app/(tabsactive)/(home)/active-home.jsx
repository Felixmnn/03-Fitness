import { View, Text,SafeAreaView,Image, TextInput, FlatList,ScrollView,Alert } from 'react-native'
import React, { useContext } from 'react'
import CustomButton from '../../../components/CustomButton'
import { TouchableOpacity } from 'react-native'
import { icons, images } from '../../../constants'
import { useLocalSearchParams, usePathname, useRouter } from 'expo-router'
import { UserWorkout, WorkoutProvider } from "../../../context/currentWorkout"
import { useEffect } from 'react'
import uuid from "react-native-uuid"
import { useState } from 'react'
import { router } from 'expo-router'
import AsyncStorage from '@react-native-async-storage/async-storage'
import CustomTextInput from '../../../components/CustomTextInput'
import exercises from '../../../constants/exercises'
import Icon from 'react-native-vector-icons/FontAwesome';
import { CountdownCircleTimer } from 'react-native-countdown-circle-timer';
import RenderLastEntrys from '../../../components/RenderLastEntrys'
import RenderBreakTimer from '../../../components/RenderBreakTimer'
import Toast from 'react-native-toast-message'


const ActiveHome = () => {




/*
Initialisierungsvariablen

*/

const { data } = useLocalSearchParams();
const planObject = data? JSON.parse(data) : null;
const { currentWorkout, setCurrentWorkout } = useContext(UserWorkout);

useEffect(() => {
    
  if (planObject) {
    setCurrentWorkout((prevPlan) => ({
      ...prevPlan,
      WID: `Workout-${uuid.v4()}`,
      TPID: planObject.PID,
      Name: planObject.Name,
      EIDs: planObject.EIDs,
      SID:[],
      CDate: new Date(),
      Active: true,
    }));
    console.log("Basic setup was successful");
  }

}, [data]);





useEffect(() => {
  const saveWorkoutData = async () => {
    if (currentWorkout && currentWorkout.Active) { // Check auf isActive
      await AsyncStorage.setItem("ActiveWorkout", JSON.stringify(currentWorkout));
    }
  };
  saveWorkoutData();
}, [currentWorkout]); // Ausgeführt, wenn workoutData geändert wird

const changeDuration = () => {
  const startTime = currentWorkout.CDate;
  const currentTime = new Date();
  const differenceInMilliseconds = currentTime.getTime() - new Date(startTime).getTime() ;
  setDuration(Math.floor(differenceInMilliseconds/1000));
  const differenceInMinutes = Math.floor(differenceInMilliseconds / 60000).toString(); 
  setCurrentWorkout((prevWorkout) => ({
      ...prevWorkout,
      Duration: differenceInMinutes,
  }));

};

useEffect(()=>{
  const interval = setInterval(()=> {
    changeDuration();
  },1000)
  return () => clearInterval(interval)
},[])














//Speichern des Workouts:
const setWorkoutInactive = async ()=>{
  await AsyncStorage.removeItem("ActiveWorkout")
}













const [duration,setDuration] = useState(0);
const [ currentWeight, setCurrentWeight ] = useState(0);
const [ currentReps, setCurrentReps ] = useState(0);
const [currentNotes, setCurrentNotes] = useState("")
const [ warmUp , setWarmUp ] = useState("bg-black")


  


/*Potentiell Unnötig
    const [ activeTimer, setActiveTimer] = useState(true)
    const [viewTimer ,setViewTimer ] = useState(false)
    const [ selectedExercise, setSelectedExercise] =  useState(1);
    const [ moreActive, setMoreActive ] = useState(false)
    const [viewProgress, setViewProgress] = useState(false)
    const safeSetButton = (item) =>{
      return (
        <CustomButton
                              title="Safe Set"
                              containerStyles="bg-blue2 pt-2 h-[41px] w-[32%]"
                              textStyles="text-white"
                              handlePress={async()=> {
                                  const set = {EID:item,R:currentReps,W:currentWeight,N:currentNotes,WarmUp:warmUp,D:getDates()}
                                  const exists = await checkIfAsyncEntry();
                                  if (exists) {
                                    await addAsyncEntry(set)
                                  } else {
                                    await setAsyncEntry();
                                    console.log("Ein Eintrag im Async Storage wurde erstellt")
                                    await addAsyncEntry(set);
                                  }
                                  console.log(pastExercises)
                      
                                  setCurrentWorkout((prevWorkout) => ({
                                    ...prevWorkout,
                                    SID:[...prevWorkout.SID,set]
                                  }))
                                  
                                  
                                  Toast.show({
                                    type: 'success', // oder 'error' für eine Fehlermeldung
                                    position: 'top',
                                    text1: `Added Set to Log`, // Text der Toast-Nachricht
                                  });
                                  setCurrentNotes("");
                                  setCurrentReps(0);
                                  setCurrentWeight(0);
                                }
                                }
                              />
      )
     }

*/

 

  
  
  
  

  //Funtkionen zum passiven setzen von Werten
  
  const [pastExercises, setPastExercises] = useState([])


  //Functionen zum aktiven setzen von Werten
    

    const handleWeightChange = (text) =>  {
      setCurrentWeight(text)
    }
    const handleRepChange = (text) =>  {
      setCurrentReps(text)
    }
    const handleNoteChange = (text) => {
      setCurrentNotes(text)
    }

    

    const getPastSets = (id) => {
      return currentWorkout.SID.filter(item => item.EID === id)
    }

    const getDates = () => {
      const currentDate = new Date();
      const year = currentDate.getFullYear();
      const month = String(currentDate.getMonth()+1).padStart(2,"0");
      const day = String(currentDate.getDate()).padStart(2,"0");
      const formatedDate = `${day}-${month}-${year}`;
      return formatedDate;
    }

const safeWorkout = async ()=> {
      
      changeDuration();
      const jsonValue = JSON.stringify(currentWorkout)
      await AsyncStorage.setItem(`Workout-${currentWorkout.WID}`,jsonValue)
      console.log("Locally Stored")

    }

    const checkIfAsyncEntry = async ()=>  {
      const exerciseName = exercises[currentWorkout.Selected-1].Name
      const exists = await AsyncStorage.getItem(exerciseName);
      return (exists === null)? false:true;
    }

    const getAsyncEntry = async () => {
      const exerciseName = exercises[currentWorkout.Selected-1].Name
      const newPastExercises = await AsyncStorage.getItem(exerciseName);
      setPastExercises(JSON.parse(newPastExercises))
    }

    const setAsyncEntry = async () => {
      const exerciseName = exercises[currentWorkout.Selected-1].Name
      await AsyncStorage.setItem(exerciseName,JSON.stringify([]))
    }

    const addAsyncEntry = async (entry) => {
      const exerciseName = exercises[currentWorkout.Selected-1].Name
      let newPastExerciseArray;

      if(pastExercises.length < 100 ){
        newPastExerciseArray = [entry,...pastExercises];
      } else {
        newPastExerciseArray = [entry,...pastExercises.slice(0,1000)];
      }
      setPastExercises(newPastExerciseArray)
      await AsyncStorage.setItem(exerciseName,JSON.stringify(newPastExerciseArray))
    }
    
      const progressInfo = ()=> {
        return (
        <View className="bg-blue2 p-2 rounded-[10px] ">
          <TouchableOpacity onPress={()=> setViewProgress(!viewProgress)}>
            <View className="flex-row items-center justify-between">
              <Text className="text-white text-xl font-bold">View Exercise Progress:</Text>
              <Icon name="eye" size={30} color="white"/>
          </View>
         </TouchableOpacity>
      <View className="my-2">
        {(viewProgress)?
        (<View>

          <Text className="text-center text-white font-bold">Today</Text>
        <View className="flex-row flex-wrap justify-center">
          { getPastSets(currentWorkout.Selected).map((item,index)=>{
            return(
              <View key={`${item.EID}-${index}`} className={` bg-blue-500 rounded-[5px] p-1 px-2 m-1 flex-row items-center justify-center`}>
              <View className="mx-[5px] flex-row ">
              <Text className="text-white font-bold">{`${item.W} Kg | ${item.R} Reps`}</Text>
             
              </View>
              
              <View >
                {
                  (item.W !== "bg-black")? (<View className="mr-2"><Icon name="fire" size={15} color="white" /></View>) : (<></>)
                } 
                </View>
                <View className="items-center">
                {
                  (item.N !== "")? (<View className="mr-2"><Icon name="sticky-note" size={15} color="white" /></View>) : (<></>)
                }
                </View>
            </View>)
          })

          }
        </View>
        <View>
          {(moreActive)?(<RenderLastEntrys />):(<></>)}
        </View>
        <TouchableOpacity className="items-center justify-center my-2" onPress={()=> {setMoreActive(!moreActive)}}>
        {
          (moreActive)?
          (<Text className="text-white text-center underline">hide last workouts</Text>):
          (
          <Text className="text-white text-center underline">show last workouts</Text>)
        }  
      </TouchableOpacity>
        </View>):
        (<></>)}
        
      </View>
      </View>
        )
      }




      /*
      Ab hier kommen alle header spezifischen Aspektete
      */

      function formatDuration () {
        if (!duration || duration <= 0) {
          return "00:00:00"; // Standardwert für nicht vorhandene oder leere Dauer
        }
        const hours = Math.floor(duration/3600)
        const minutes = Math.floor((duration%3600)/60);
        const seconds = duration%60;

        return (`${(hours < 10 )? (`0${hours}`):`${hours}`}-${(minutes < 10 )? (`0${minutes}`):`${minutes}`}-${(seconds < 10 )? (`0${seconds}`):`${seconds}`}`)

      }

      const header = () => {
        return (
            <View className=" flex-row mx-3 my-1 items-center justify-between">
              <Text className="text-white font-bold text-3xl">{currentWorkout.Name}</Text>
              <View className="flex-row items-center">
                <Text className="text-white font-bold text-xl"> {formatDuration()}  </Text>
                <Icon name="clock-o" size={30} color="#fff" />

              </View>
              </View>
             )
            }

      const footer = () =>{
        return(
          <View className="  mx-2 p-2 h-[100px] justify-center">
          <CustomButton
          handlePress={()=> {
            
            safeWorkout()
            setCurrentWorkout((prevWorkout)=> ({
              
              ...prevWorkout,
              WID:"",
              TPID:"",
              Name:"",
              Selected:-1,
              EIDs:[],     
              SID:[],     
              CDate:"",     
              STime:"",    
              Duration:"",
              Active:false,

            }))
            setWorkoutInactive()
            console.log("Values were reset")
            Toast.show({
              type: 'success', // oder 'error' für eine Fehlermeldung
              position: 'top',
              text1: `Workout was saved`, // Text der Toast-Nachricht
            });
            console.log("Finished Processing",currentWorkout)

            router.push("/")
          
          }}

          textStyles="text-white"
          containerStyles="bg-red-900 mx-1"
          title="Workout Beenden"
          />
        </View> 
        )
      }









      /*
      Alles Ab hier ist für den Main Scroll view
      */
     const [showDetails, setShowDetails] = useState([]);
     const [ showMoreDetails ,setshowMoreDetials ] = useState([]);
     const [ showEvenMoreDetails, setshowEvenMoreDetails ] = useState([]);

     function changeDetailVisibility (ID){
        if(showDetails.includes(ID)){
          setShowDetails(showDetails.filter((i)=> i !== ID))
        } else{
          setShowDetails(showDetails.concat(ID))
        }
     }
     function changeMoreDetailVisibility (ID){
      console.log("Test")
      if(showMoreDetails.includes(ID)){
        setshowMoreDetials(showMoreDetails.filter((i)=> i !== ID))
      } else{
        setshowMoreDetials(showMoreDetails.concat(ID))
      }
   }
   function changeEvenMoreDetailVisibility (ID){
    if(showEvenMoreDetails.includes(ID)){
      setshowEvenMoreDetails(showEvenMoreDetails.filter((i)=> i !== ID))
    } else{
      setshowEvenMoreDetails(showEvenMoreDetails.concat(ID))
    }
 }
     
     const matchingExercises = (ID)=> {
      return currentWorkout.SID.filter((item)=> item.EID == ID );
     }

     


/*
     const [array, setArray] = useState([
      { EID: 1, R: '11', W: "12", N: 'Top', Wa: "red", D: '11' },
      { EID: 2, R: '22', W: "13", N: 'Middle', Wa: "white", D: '12' },
      { EID: 3, R: '33', W: "14", N: 'Bottom', Wa: "red", D: '13' },
      { EID: 4, R: '44', W: "15", N: 'Other', Wa: "white", D: '14' },
    ]);
    */
      

      const main = () =>{
        const getAmountPastSets = (id) => {
          return currentWorkout.SID.filter(SID => SID.EID === id).length
        }
        
        const handleRepChange = (text, date) => {
          const updatedArray = [...currentWorkout.SID];
          const index = updatedArray.findIndex(item => item.D === date);
          updatedArray[index].R = text; 
          setCurrentWorkout({
            ...currentWorkout, 
            SID: updatedArray, 
          }); 
        };
        
        const handleWeightChange = (text, date) => {
          const updatedArray = [...currentWorkout.SID];
          const index = updatedArray.findIndex(item => item.D === date );
          updatedArray[index].W = text;
          setCurrentWorkout({
            ...currentWorkout, 
            SID: updatedArray, 
          }); 
        };

        const handleWarmChange = (date) => {
          const updatedWorkout  = { ...currentWorkout };
          const updatedSID = [...currentWorkout.SID];
          const index = updatedSID.findIndex(item => item.D === date ); 
          if (updatedSID[index].Wa == "red"){
            updatedSID[index].Wa = "white";
          } else {
            updatedSID[index].Wa = "red";

          }
          updatedWorkout.SID = updatedSID;
          setCurrentWorkout(updatedWorkout); 
        };

        const addTuple = (ID) => {
          console.log("Adding new Touple")
          const newTuple = { EID: ID, R: null, W: null, N: null, Wa: "white", D: new Date() };
          setCurrentWorkout((prevState) => ({
            ...prevState,
            SID: [...prevState.SID, newTuple],
        }));
        };

        return(
          <View>
            {
              currentWorkout.EIDs.map((item,index)=> {
                return(
                  
                    <View key={`${item}-${index}`} className="bg-blue2 rounded-[5px] w-[full]  mx-2 mt-2 justify-start">
                      <View className="flex-row p-2">
                        <Image source={exercises[item-1].Image} className="h-[60px] w-[60px]"/>
                        <View>
                          <Text className="text-white font-bold text-xl ml-2">{(exercises[item-1].Name.length > 15)?(`${exercises[item-1].Name.slice(0,15)}...`):(exercises[item-1].Name)}</Text>
                          <Text className=" ml-2 text-white text-start"> 
                          {(!currentWorkout.SID.some((SID) => SID.EID === item)) ? ("No Sets Today") : (`Sets: ${getAmountPastSets(item)}`)} 
                          </Text>
                        </View>
                      </View>
                      
                      <View>
                        {(showDetails.includes(item))?(
                          <View>
                            
                            <View className="flex-row justify-between mx-2">
                                  <Text className="text-white font-bold">Set    </Text>
                                  <Text className="text-white font-bold">Reps</Text>
                                  <Text className="text-white font-bold">Kg</Text>
                                  <Text className="text-white font-bold">Warmup</Text>

                              </View>
                            {
                            
                            currentWorkout.SID.filter((object)=> object.EID == item ).map((item,index)=>{
                            


                              return (

                                <View className={`flex-row ${index%2 == 0?("bg-blue2"):("bg-[#023f77]")} mx-2 p-2 justify-between`}>
                                  <Text className="text-white font-bold text-xl">{index}</Text>
                                  <TextInput 
                                  key={`${item.D}-${index}-Reps`}
                                  className={`w-[30%] bg-white rounded-[5px] ${
                                    index % 2 === 0 ? 'bg-[#023f77]' : 'bg-blue2'
                                  } text-white text-center`}
                                  keyboardType="numeric"
                                  value={item.R}
                                  placeholder="-"
                                  onChangeText={(text) => handleRepChange(text, item.D)}
                                  />

                                  <TextInput 
                                  key={`${item.D}-${index}-Weight`}
                                  className={`w-[30%] bg-white rounded-[5px] ${
                                    index % 2 === 0 ? 'bg-[#023f77]' : 'bg-blue2'
                                  } text-white text-center`}
                                  keyboardType="numeric"
                                  value={item.W}
                                  placeholder="-"
                                  onChangeText={(text) => handleWeightChange(text, item.D)}
                                  />
                                  <View className="flex-row">
                                    <TouchableOpacity className={` p-[2px] rounded-[5px] mr-1`} onPress={() => handleWarmChange(item.D)}>
                                        <Icon key={`${item.D}-${index}-WarmUp`} name="check-circle" size={25} color={item.Wa === "red"?"white":"red"} />
                                    </TouchableOpacity>

                                    
                                  </View>
                                </View>
                              )
                            })
                            
                            }
                            <TouchableOpacity className=" m-3 " onPress={()=> addTuple(item)}>
                            <Icon name='plus' size={30} color={"white"}/>
                            </TouchableOpacity>
                            </View>
                        ):(
                          <View></View>
                          )}
                          
                      </View>
                      
                      <TouchableOpacity className="mb-2 " onPress={()=>changeDetailVisibility(item)}>
                        {(!showDetails.includes(item))?(
                          <View className="justify-center items-center">
                            <Icon name="chevron-down" size={20} color="#fff" />
                          </View>
                        ):
                        (

                          <View>
                            { (showMoreDetails.includes(item))?(

                              <View>
                                {(showEvenMoreDetails.includes(item))?(
                                
                              <View className="flex-row justify-between items-center">
                                <TouchableOpacity className="bg-white p-1 rounded-[5px] ml-3" onPress={()=> changeEvenMoreDetailVisibility(item)}>
                                  <Text className=" font-bold">Show Less</Text>
                                </TouchableOpacity>
                                <Icon name="chevron-up" size={20} color="#fff" />
                                <View className="w-[70px] ml-3"></View>

                              </View>):(
                                
                                <View className="flex-row justify-between items-center">
                                  <TouchableOpacity className="bg-white p-1 rounded-[5px] ml-3" onPress={()=> changeMoreDetailVisibility(item)}>
                                    <Text className=" font-bold">Show Less</Text>
                                  </TouchableOpacity>
                                  <Icon name="chevron-up" size={20} color="#fff" />
                                  <TouchableOpacity className="bg-white p-1 rounded-[5px] mr-3" onPress={()=> changeEvenMoreDetailVisibility(item)}>
                                    <Text className=" font-bold">Show More</Text>
                                  </TouchableOpacity>
                                </View>)
                                } 
                              </View>
                              
                            ):

                              <View className="flex-row justify-between items-center">
                                <View className="w-[60px] ml-3"></View>
                                <Icon name="chevron-up" size={20} color="#fff" />
                                <TouchableOpacity className="bg-white p-1 rounded-[5px] mr-3" onPress={()=> changeMoreDetailVisibility(item)}>
                                  <Text className=" font-bold">Compare</Text>
                                </TouchableOpacity>
                              </View>
                            }
                            

                          </View>
                          

                        )}
                      </TouchableOpacity>
                    </View> 
                )
              })
            }
          </View>
        )
      }


  return (
    <SafeAreaView className ="bg-black h-full">
      <View>{header()}</View>
        <ScrollView className="flex-1">
          {main()}
        </ScrollView>
      <View>{footer()}</View>
    </SafeAreaView>
  )
}

export default ActiveHome