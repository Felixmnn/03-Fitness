import { View, SafeAreaView, Alert, Text, Image,ScrollView, ActivityIndicator } from 'react-native';
import React, {  useState } from 'react';
import { router } from 'expo-router';
import CustomButton from '../../components/CustomButton';
import {  getAllPlans, getAllWorkouts, signOut } from '../../lib/appwrite';
import { useGlobalContext } from '../../context/GlobalProvider';
import AsyncStorage from '@react-native-async-storage/async-storage';
import XLSX from 'xlsx';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';
import { TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Toast from 'react-native-toast-message';



const ProfileOverview = () => {
  const { user, isLoggedIn, setUser } = useGlobalContext();


  const logout = async () => {
    await signOut();
    router.push("/sign-in");
  };


  const [isFetching2,setIsFetching2] = useState(false);
  
  const excel = async () => {
    console.log("I am doing something :)");
      setIsFetching2(true);
      try {
        const plans = await getAllPlans();

        const workouts = await getAllWorkouts();
        plans.map((plan)=> plan.EIDs = JSON.stringify(plan.EIDs));
        console.log("Hallo");
        workouts.map((workout)=> workout.EIDs = JSON.stringify(workout.EIDs));

        const plansSheet = XLSX.utils.json_to_sheet(plans);
        const workoutsSheet = XLSX.utils.json_to_sheet(workouts);


        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, plansSheet, 'Plans');
        XLSX.utils.book_append_sheet(workbook, workoutsSheet, 'Workouts');


        const excelOutput = XLSX.write(workbook, { type: 'base64', bookType: 'xlsx' });
        const fileUri = `${FileSystem.documentDirectory}example.xlsx`;
        await FileSystem.writeAsStringAsync(fileUri, excelOutput, {
          encoding: FileSystem.EncodingType.Base64,
        });
        if (await Sharing.isAvailableAsync()) {
          await Sharing.shareAsync(fileUri, {
            mimeType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
            dialogTitle: 'Teile deine Excel-Datei',
          });
        } else {
          Alert.alert('Teilen nicht möglich', 'Sharing wird auf diesem Gerät nicht unterstützt.');
        }
      } catch(error){
        console.log(error);
      }
      setIsFetching2(false);
    };





    const random = () =>{
      
      router.push("/exercise");
    }


    const commitsData = [
      { date: "2024-11-02", count: 1 },
      { date: "2024-11-03", count: 2 },
      { date: "2024-11-04", count: 3 },
      { date: "2024-11-05", count: 4 },
      { date: "2024-11-06", count: 5 },
      { date: "2024-11-30", count: 2 },
      { date: "2024-11-31", count: 3 },
      { date: "2024-11-01", count: 2 },
      { date: "2024-11-02", count: 4 },
      { date: "2024-11-05", count: 2 },
      { date: "2024-11-30", count: 4 }
    ];
    
    const chartConfig = {
      backgroundGradientFrom: "#000",
      backgroundGradientFromOpacity: 0.4,
      backgroundGradientTo: "#000",
      backgroundGradientToOpacity: 1,
      color: (opacity = 1) => `rgba(0, 150, 255, ${opacity})`,
      strokeWidth: 2, // optional, default 3
      barPercentage: 0.5,
      useShadowColorFromDataset: false // optional
    };
    


    //@Exporting the Data
    const [isFetching, setIsFetching] = useState(false);

   

    const reduxProtection = async ({parsedKeys,plans,workouts}) => {
      const workout = [];
      const workoutTest = [];
      const workoutDublicates = [];

      await Promise.all(plans.map( async(plan) => {
        if (!(parsedKeys.some((object)=> object.includes(plan.PID)))){
          const newPlan = {
              PID: plan.PID,
              Name: plan.Name,
              Description: plan.Description,
              EIDs: plan.EIDs,
              Difficulty: plan.Difficulty,
              Duration: plan.Duration,
              CDate: plan.CDate,     // Creation Date
              Public: plan.Public,
              Saved: plan.Saved,
              Bg:plan.Bg,
              DataBaseID: plan.$id
          
          }
          
          await AsyncStorage.setItem(`Plan-${plan.PID}`,JSON.stringify(newPlan));
          }
      }))
        
        
        await Promise.all(workouts.map( async(workout) => {
          
        if (!(parsedKeys.some((object)=> object.includes(workout.WID)))){
          const newWorkout = {
            WID: workout.WID,
            TPID:workout.TPID,
            Name:workout.Name,
            Selected:workout.Selected,
            EIDs:workout.EIDs,     
            SID:JSON.parse(workout.SID),     
            CDate:workout.CDate,     
            Duration:workout.Duration,
            Public:workout.Public,
            Saved:workout.Saved,
            Active:false,
            DataBaseID: workout.$id

          }
          await AsyncStorage.setItem(`Workout-${newWorkout.WID}`,JSON.stringify(newWorkout));
          console.log("Success?");
        }
        }))
      }
  

    const importData = async () => {
      console.log("I am doing something :)");
      
      setIsFetching(true);
      try {
        const plans = await getAllPlans();
        console.log("All Plans:",plans)
        const workouts = await getAllWorkouts();
        console.log("Success",typeof plans[0]);
        console.log(typeof plans[0].PID);
        const parsedKeys = await AsyncStorage.getAllKeys();

        
        await reduxProtection({parsedKeys,plans,workouts});
        /*
        */
        //await AsyncStorage.setItem(`Plan-${plans[0].PID}`,plans[0].PID);
        //console.log("Added the first entry:",plans[0].PID)
        //const currentKeys = await AsyncStorage.getAllKeys();
        //console.log("Hier sind die Keys",currentKeys);
        Toast.show({
                                type: 'success', 
                                position: 'top',
                                text1: `Refresh the App to see your saved Entrys`, 
                              });
      } catch(error){
        console.log(error);
      }
      
      setIsFetching(false);


    }

    //@Exporting the Data
    
    

  return (
    <SafeAreaView className="bg-black h-full items-center justify-center">
      <View className="flex-1 w-[100%] max-w-[300px]">
        <View className="m-5 items-center justify-center ">
          <View className="w-[155px] h-[155px] rounded-full bg-blue2 items-center justify-center ">
            <Image source={(user.avatar)?({uri:`${user.avatar}`}):(images.profile)}  className="w-[150px] h-[150px] rounded-full "/> 
          </View>
            <Text className="text-white font-bold text-3xl">{user.username}</Text> 
        </View>
        <View className="flex-1 bg-blue2 rounded-t-[25px] p-2 justify-start items-center" >
          <View>
            {/*<CustomButton title="Random Stuff" handlePress={()=> random()} containerStyles={"bg-red-900 mx-2"} textStyles={"text-white"}/>*/}
            <View className="flex-row justify-between w-full">
            <TouchableOpacity className={`flex-row items-center p-2 rounded-[5px] bg-blue-500 justify-center m-2 flex-1 ${isFetching2? 'opacity-50' : ""}`}
                              onPress={()=> excel()}
                              disabled = {isFetching2}
                              >
                                {
                (isFetching2)?
                  (<ActivityIndicator size={"small"} color={"white"}/>):
                  <Icon name="file-excel-o" size={30} color="white"/>
            }
                <Text className="text-white font-bold m-2">Export Data</Text>
            </TouchableOpacity>
            <TouchableOpacity 
            className={`flex-row items-center p-2 rounded-[5px] ${isFetching? 'opacity-50' : ""}  bg-blue-500 justify-center m-2 flex-1`}
            onPress={()=> importData()}
            disabled = {isFetching}
            >
              {
                (isFetching)?
                  (<ActivityIndicator size={"small"} color={"white"}/>):
                  <Icon name="cloud" size={30} color="white"/>
            }
                <Text className="text-white font-bold m-2">Import Data</Text>
            </TouchableOpacity>
            

            </View>
          </View>
          <CustomButton handlePress={async()=> AsyncStorage.clear()  } title={" Clear Async Storage"} containerStyles={"bg-red-900"} textStyles={"text-white"} />
          {/*<CustomButton handlePress={async()=> sendRecoveryEmail()  } title={"Recovery Mail"} containerStyles={"bg-red-900"} textStyles={"text-white"} />*/}
          <View> 
            <CustomButton title={"Logout"} containerStyles={"bg-red-900 m-5"} textStyles={"text-white"}  handlePress={logout} />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ProfileOverview;
