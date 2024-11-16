import { View, Text, ScrollView, Image, Alert} from 'react-native'
import React, { useContext, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import {images} from "../../constants"
import FormField from '../../components/FormField'
import  CustomButton  from "../../components/CustomButton";
import { Redirect, router, Link } from "expo-router";
import { icons } from '../../constants'
import {getCurrentUser, signIn} from "../../lib/appwrite"
import {useGlobalContext} from "../../context/GlobalProvider"




const SignIn = () => {

  const { user, setUser } = useGlobalContext()
  const { isLoggedIn, setIsLoggedIn } = useGlobalContext()

  const [form, setForm] = useState({
    email:'',
    password:''
  })

  const [isSubmitting, setIsSubmitting] = useState(false)


  const submit = async () => {
    if ( !form.email || !form.password ){
      Alert.alert("Error" , "Please fill in all the fields")  
    }
    
    
        setIsSubmitting(true);
        
      try {
          await signIn(form.email, form.password)
          const result = await getCurrentUser();
          setUser(result);
          setIsLoggedIn(true);
          Alert.alert("Success", "User signed in successfully :)");
          router.replace("/home");

      }catch (error){ 
        Alert.alert("Error", error.message)
      } finally {
        setIsSubmitting(false)
      }
    
    
  }

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView>

        <View className="w-full justify-center h-full my-6">
          <View className="justify-center items-center">
            <Image source={images.logBook} 
            reciseMode="contain" className="w-[115px] h-[35px]"/>
          </View>
          

          <View className="rounded-l-[80px] bg-black mt-[50px] py-[50px] bg-[#003566] ">

          <Text className="text-white text-center font-pbold text-4xl">
            Sign-In
          </Text>

          <FormField
            title= "Email"
            placeholder="Email"
            value= {form.email}
            handleChangeText = {(e)=> setForm({...form,email:e})}
            otherStyles="mx-5"
            keyboardType="email-adress"
            />
            <FormField
            title= "Password"
            placeholder="Password"
            value= {form.password}
            handleChangeText = {(e)=> setForm({...form,password:e})}
            otherStyles="mx-5"
            />
            <Text className="text-white text-center py-[5px] ">
              Forgot Password
            </Text>

            <CustomButton 
              className="flex justify-center items-center h-screen"
              title="Sign In"
              handlePress={submit}
              containerStyles= "my-[15px] mx-5"
              isLoading={isSubmitting}
            />

            <Text className="text-white text-center py-[5px]">
                Or Sign In with:
            </Text>

            <View className="flex-row justify-center mb-[30px]">
              <Image reciseMode="contain" className="w-[50px] h-[50px]" source={icons.google}/>
              <Image reciseMode="contain" className="w-[50px] h-[50px]" source={icons.apple}/>
              <Image reciseMode="contain" className="w-[50px] h-[50px]" source={icons.meta}/>
            </View>

            <View className="flex-row justify-center gap-1 mb-[30] mt-[5]">
              <Text className="text-white  text-lg">Dont have a Account?</Text>
              <Link href="/sign-up" className='text-secondary font-psemibold text-lg'>Sign Up</Link>

            </View>
          </View>
            
          
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default SignIn