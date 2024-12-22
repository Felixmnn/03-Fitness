import { View, Text, ScrollView, Image, Alert,TouchableOpacity } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Link, router } from 'expo-router'
import FormField from '../../components/FormField'
import  CustomButton  from "../../components/CustomButton";
import React, { useState } from 'react'
import { icons } from '../../constants'
import {images} from "../../constants"
import { createUser } from '../../lib/appwrite';
import { useGlobalContext } from '../../context/GlobalProvider';
import Icon from 'react-native-vector-icons/FontAwesome';


const SignUp = () => {

  const { user, setUser } = useGlobalContext()
  const { isLoggedIn, setIsLoggedIn } = useGlobalContext()

  const [form, setForm] = useState({
    email:'',
    password:'',
    confirmPassword:'',
    name: ''

  })
 
const [isSubmitting, setIsSubmitting] = useState(false)

const submit = async () => {
  if (!form.name || !form.email || !form.password || !form.confirmPassword ){
    Alert.alert("Error" , "Please fill in all the fields")  
  }
  else if (form.confirmPassword != form.password){
    Alert.alert("Error" , `Make sure your passwords match ${form.password} ${form.confirmPassword}  `)
  }
  else {
      setIsSubmitting(true);
    try {
        const result = await createUser(form.email, form.password, form.name )
        setUser(result);
        setIsLoggedIn(true);
        router.replace("/home");

    }catch (error){ 
      Alert.alert("Error", error.message)
    } finally {
      setIsSubmitting(false)
    }
  }
  
}
const imageWrapper = ({ name, key, action }) => {
    const noActionYet = () => {
      Alert.alert("OAuth not Working yet");
    };
    return (
      <TouchableOpacity
        key={key}
        onPress={() => {
          action ? action : noActionYet();
        }}
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

          <View className="w-full justify-center h-full mt-6">
            

            <View className="rounded-l-[80px] bg-[#003566] mt-5 h-full">

              <Text className="text-white text-center font-pbold text-3xl mt-8 mb-4">
                Sign-Up
              </Text>

              <View className="">
                  <FormField
                      title="Name"
                      placeholder="Name"
                      value= {form.name}
                      handleChangeText = {(e)=> setForm({...form,name:e})}
                      otherStyles="mx-5"
                    />
                  <FormField
                    title="Email"
                    placeholder="Email"
                    value= {form.email}
                    handleChangeText = {(e)=> setForm({...form,email:e})}
                    otherStyles="mx-5"
                    keyboardType="email-adress"
                  />
                  <FormField
                    title="Password"
                    placeholder="Password"
                    value= {form.password}
                    handleChangeText = {(e)=> setForm({...form,password:e})}
                    otherStyles="mx-5"
                  />
                  <FormField
                    title="Confirm Password"
                    placeholder="Confirm Password"
                    value= {form.confirmPassword}
                    handleChangeText = {(e)=> setForm({...form,confirmPassword:e})}
                    otherStyles="mx-5"
                  />
                  <View className="mt-4 mb-3">
                    <CustomButton 
                          className="flex justify-center items-center h-screen"
                          title="Sign-Up"
                          handlePress={submit}
                          containerStyles= "my-[15px] mx-5 bg-blue-500 rounded-2xl"
                          isLoading={isSubmitting}
                          textStyles={"text-white"}

                    />  
                  </View>
                  
                  <Text className="text-white text-center mb-2">
                    Or Sign-Up with:
                  </Text>

                  <View className="flex-row justify-center mb-[30px]">
                    {["google","apple","facebook"].map((item) =>
                      imageWrapper({ name: item, key: item }),
                    )}
                  </View>

                  <View className="flex-row justify-center gap-1 mt-1 mb-[60px]">
                    <Text className="text-white  text-lg pb-1">A have a Account?</Text>
                    <Link href="/sign-in" className='text-red-500 font-psemibold text-lg pt-[2px]'>Sign In</Link>

                  </View>

              </View>  
              

            </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default SignUp