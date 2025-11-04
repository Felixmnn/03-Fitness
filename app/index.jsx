import { Redirect, router } from "expo-router";
import { ScrollView, View, ActivityIndicator, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomButton from "../components/CustomButton";
import { useGlobalContext } from "../context/GlobalProvider";
import { StatusBar } from 'expo-status-bar';

export default function Index() {
  const { isLoading, isLoggedIn } = useGlobalContext();

  // Zeige Ladescreen, solange Daten geladen werden
  if (isLoading) {
    return (
      <SafeAreaView style={{ backgroundColor: '#001d3d', flex: 1 }}>
        <View className="flex-1 justify-center items-center">
          <ActivityIndicator size="large" color="#ffffff" />
          <Text className="text-white mt-4">Lädt...</Text>
        </View>
      </SafeAreaView>
    );
  }

  // Weiterleitung zu /home, wenn der Benutzer eingeloggt ist
  if (isLoggedIn) {
    return <Redirect href="/home" />;
  }

  // Standardanzeige der Index-Seite
  return (
    <SafeAreaView className="flex-1 bg-[#001d3d]">
      <StatusBar style="dark" backgroundColor="#121212" />
      
      <ScrollView className="h-full">
        <View className="w-full justify-center items-center min-h-[100vh] px-4">
          <CustomButton
            title="Get Started"
            textStyles={"text-white"}
            handlePress={() => router.push('/sign-in')}
            containerStyles="px-[30] mt-7 bg-blue-500 "
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
