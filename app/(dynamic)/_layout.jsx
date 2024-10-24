import { View, Text } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'


const ProfileLayout = () => {
  return (
    <>
      <Stack>
          <Stack.Screen name="exercise"
          options={{
            headerShown:false
          }}/>
          <Stack.Screen name="create-workout"
          options={{
            headerShown:false
          }}/>
          <Stack.Screen name="all-exercises"
          options={{
            headerShown:false
          }}/>
          <Stack.Screen name="exercise-picker"
          options={{
            headerShown:false
          }}/>
          <Stack.Screen name="edit-workout"
          options={{
            headerShown:false
          }}/>
          <Stack.Screen name="past-workout"
          options={{
            headerShown:false
          }}/>

      
          
      </Stack>
    </>
  )
}

export default ProfileLayout