import { Redirect, router } from "expo-router";
import { ScrollView, Text, View , Image} from "react-native";
import { StatusBar } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import  CustomButton  from "../components/CustomButton";
import { useGlobalContext } from "../context/GlobalProvider";

import { images} from "../constants";



export default function Index() {

    const {isLoading, isLoggedIn} = useGlobalContext();

    if (!isLoading,isLoggedIn) return <Redirect href ="/home"/>

  return (
    <SafeAreaView className="bg-black h-full">
      <ScrollView contentContainerStyle={{height: '100%'}}>
        <View className="w-full justify-center items-center min-h-[100vh] px-4">
            <CustomButton
            title="Get Started"
            textStyles={"text-white"}
            handlePress={() => router.push('/sign-in')}
            containerStyles = "px-[30] mt-7 bg-blue-500"
          />
          
        </View>  
      </ScrollView>
    </SafeAreaView>
  );
}
