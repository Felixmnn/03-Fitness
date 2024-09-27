import { Redirect, router } from "expo-router";
import { ScrollView, Text, View , Image} from "react-native";
import { StatusBar } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import  CustomButton  from "../components/CustomButton";

import { images} from "../constants";

export default function Index() {
  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView contentContainerStyle={{height: '100%'}}>
        <View className="w-full justify-center items-center min-h-[100vh] px-4">
          <Image  source={images.logBook}
                  className="w-[130px] h-[84px]"
                  resizeMode="contain"
                  />
          <Text className="text-sm font-pregular text-gray-100">
          The easyest way to log your workouts
          </Text>

          <CustomButton
            title="Get Started"
            handlePress={() => router.push('/sign-in')}
            containerStyles = "px-[30]  mt-7"
          />
          <CustomButton
            title="Home Screen"
            handlePress={() => router.push('/home')}
            containerStyles = "px-[30]  mt-7"
          />
          <CustomButton
            title="Profile"
            handlePress={() => router.push('/overview')}
            containerStyles = "px-[30]  mt-7"
          />

          <CustomButton
            title="Test"
            handlePress={() => router.push('/my-plans')}
            containerStyles = "px-[30]  mt-7"
          />

        </View>  
      </ScrollView>
    </SafeAreaView>
  );
}
