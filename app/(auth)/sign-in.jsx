import {
  View,
  Text,
  ScrollView,
  Image,
  Alert,
  TouchableOpacity,
} from "react-native";
import React, { useContext, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import FormField from "../../components/FormField";
import CustomButton from "../../components/CustomButton";
import { Redirect, router, Link } from "expo-router";
import { getCurrentUser, handleLogin, handleOAuthLogin, handleUser, signIn } from "../../lib/appwrite";
import { useGlobalContext } from "../../context/GlobalProvider";
import Icon from 'react-native-vector-icons/FontAwesome';
import { useEffect } from "react";
import { Linking } from "react-native";






const SignIn = () => {


  useEffect(() => {
    try{
      const fetchUSerData = async () => {
        const result = await handleUser();
        if (result === null) {
          console.log("No user signed in");
        }
          else {
            console.log("User ist this", result);
            setUser(result);
            setIsLoggedIn(true);
            Alert.alert("Success", "User signed in successfully :)");
            router.replace("/home");
          }
      }
      fetchUSerData();

    } catch (error) {
      console.log("Error", error);
    }
    
  }, []); 
  

  
  
  const { user, setUser } = useGlobalContext();
  const { isLoggedIn, setIsLoggedIn } = useGlobalContext();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const submit = async () => {
    if (!form.email || !form.password) {
      Alert.alert("Error", "Please fill in all the fields");
    } else {
      setIsSubmitting(true);

      try {
        await signIn(form.email, form.password);
        const result = await getCurrentUser();
        setUser(result);
        setIsLoggedIn(true);
        Alert.alert("Success", "User signed in successfully :)");
        router.replace("/home");
      } catch (error) {
        Alert.alert("Error", error.message);
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const imageWrapper = ({ name, key, action }) => {
    const noActionYet = () => {
      Alert.alert("OAuth not Working yet");
    };
    return (
      <TouchableOpacity
        key={key}
        onPress={action ? action : noActionYet}
        className="m-2 w-[40px]"
      >
        <Icon 
        name={name} 
        size={45} 
        color="white" 
        />

      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView className="bg-black h-full">
      <ScrollView>
        
        <View className="w-full justify-center h-full my-6">
          <View className="justify-center items-center m-5">
            <Text className="text-4xl font-bold text-white my-5">MyLogBook</Text>
          </View>

          <View className="rounded-l-[80px] bg-black mt-[50px] py-[50px] bg-[#003566] justify-center items-center"> 
            <Text className="text-white text-center font-pbold text-3xl mb-4">
              Sign-In
            </Text>
           
            <FormField
              title="Email"
              placeholder="Email"
              value={form.email}
              handleChangeText={(e) => setForm({ ...form, email: e })}
              otherStyles="mx-5 w-full max-w-[300px]"
              keyboardType="email-adress"
            />
            <FormField
              title="Password"
              placeholder="Password"
              value={form.password}
              handleChangeText={(e) => setForm({ ...form, password: e })}
              otherStyles="mx-5 w-full max-w-[300px]"
            />
            <TouchableOpacity onPress={() => {
              Alert.alert("Email Server noch net ready");
            }}>
              <Text className="text-white text-center py-[5px] ">
                Forgot Password
              </Text>
            </TouchableOpacity>
            
            <CustomButton
              className="flex justify-center items-center h-screen"
              title="Sign In"
              handlePress={submit}
              containerStyles="my-[15px] mx-5 bg-blue-500 rounded-2xl w-full max-w-[300px]"
              isLoading={isSubmitting}
              textStyles={"text-white"}
            />

            <Text className="text-white text-center py-[5px]">
              Or Sign In with:
            </Text>

            <View className="flex-row justify-center mb-[30px]">
              {["google"].map((item) =>
                imageWrapper({ name: item, key: item ,action: handleOAuthLogin}),
              )}
            </View>
           

            <View className="flex-row justify-center gap-1 mb-[30] mt-[5] items-center">
              <Text className="text-white  text-lg mb-1">Dont have a Account?</Text>
              <Link
                href="/sign-up"
                className="text-red-500  font-psemibold text-lg"
              >
                Sign Up
              </Link>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignIn;
