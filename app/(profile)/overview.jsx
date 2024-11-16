import { View, Text, SafeAreaView } from 'react-native'
import React from 'react'
import { TouchableOpacity } from 'react-native'
import CustomButton from '../../components/CustomButton'
import { signOut } from '../../lib/appwrite'
import { router } from 'expo-router'
const ProfileOverview = () => {

  const logout = async () => {
      await signOut();
  }


  return (
    <SafeAreaView className="bg-primary h-full items-center justify-center">
      <CustomButton title="Logout"  containerStyles={"bg-red-900"} handlePress={async()=> {logout(); router.push("/sign-in")}}/>
    </SafeAreaView>
  )
}

export default ProfileOverview