import { View, Text, ScrollView, Image } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Link, router } from 'expo-router'
import FormField from '../../components/FormField'
import  CustomButton  from "../../components/CustomButton";
import React, { useState } from 'react'
import { icons } from '../../constants'
import {images} from "../../constants"



const SignUp = () => {
  const [form, setForm] = useState({
    email:'',
    password:'',
    confirmPassword:'',
    name: ''

  })

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView>

          <View className="w-full justify-center h-full mt-6">
            

            <View className="rounded-l-[80px] bg-[#003566] mt-5 h-full">

              <Text className="text-white text-center font-pbold text-4xl mt-8 mb-4">
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
                          handlePress={() => router.push('/home')}
                          containerStyles= "my-[15px] mx-5"
                    />  
                  </View>
                  
                  <Text className="text-white text-center mb-2">
                    Or Sign-Up with:
                  </Text>

                  <View className="flex-row justify-center mb-4">
                    <Image reciseMode="contain" className="w-[50px] h-[50px]" source={icons.google}/>
                    <Image reciseMode="contain" className="w-[50px] h-[50px]" source={icons.apple}/>
                    <Image reciseMode="contain" className="w-[50px] h-[50px]" source={icons.meta}/>
                  </View>

                  <View className="flex-row justify-center gap-1 mt-1 mb-[60px]">
                    <Text className="text-white  text-lg">Already have a Account?</Text>
                    <Link href="/sign-in" className='text-secondary font-psemibold text-lg'>Sign In</Link>

                  </View>

              </View>  
              

            </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default SignUp