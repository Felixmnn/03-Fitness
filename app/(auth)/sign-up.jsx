import { View, Text, ScrollView, Alert,TouchableOpacity } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Link, router } from 'expo-router'
import FormField from '../../components/FormField'
import  CustomButton  from "../../components/CustomButton";
import React, { useState } from 'react'
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
    <SafeAreaView className="bg-black flex-1 p-2">
          <View className="flex-1 justify-center items-center">
              <Text className="text-white text-center font-bold text-3xl mb-4">
                Sign-Up
              </Text>
                  <FormField
                      title="Name"
                      placeholder="Name"
                      value= {form.name}
                      handleChangeText = {(e)=> setForm({...form,name:e})}
                      otherStyles="mx-5 w-full max-w-[300px]"
                    />
                  <FormField
                    title="Email"
                    placeholder="Email"
                    value= {form.email}
                    handleChangeText = {(e)=> setForm({...form,email:e})}
                    otherStyles="mx-5 w-full max-w-[300px]"
                    keyboardType="email-adress"
                  />
                  <FormField
                    title="Password"
                    placeholder="Password"
                    value= {form.password}
                    handleChangeText = {(e)=> setForm({...form,password:e})}
                    otherStyles="mx-5 w-full max-w-[300px]"
                  />
                  <FormField
                    title="Confirm Password"
                    placeholder="Confirm Password"
                    value= {form.confirmPassword}
                    handleChangeText = {(e)=> setForm({...form,confirmPassword:e})}
                    otherStyles="mx-5 w-full max-w-[300px]"
                  />
                    <CustomButton
                    className="flex justify-center items-center h-screen"
                    title="Sign Up"
                    handlePress={submit}
                    containerStyles="my-[15px] bg-blue-500 rounded-[10px] w-full max-w-[300px]"
                    isLoading={isSubmitting}
                    textStyles={"text-white"}
                  />
                  <View className="flex-row justify-center gap-1 mt-1">
                    <Text className="text-white  text-lg pb-1">A have a Account?</Text>
                    <Link href="/sign-in" className='text-red-500 font-psemibold text-lg pt-[2px]'>Sign In</Link>
              </View>  
        </View>
    </SafeAreaView>
  )
}

export default SignUp