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
          
          
          
          <Stack.Screen name="exercise-picker"
            options={{
              headerTitle: "Select Exercises",
              headerStyle: {
                backgroundColor:"#0f0f0f",
                borderBottomWidth: 0
              },
              headerTintColor: "white"
            }}/>

          <Stack.Screen name="edit-workout"
            options={{
              headerTitle: "Editing Workout",
              headerStyle: {
                backgroundColor:"#0f0f0f",
                borderBottomWidth: 0
              },
              headerTintColor: "white"
            }}/>
          <Stack.Screen name="past-workout"
          options={{
            headerTitle: "Past Workout",
            headerStyle: {
              backgroundColor:"#0f0f0f",
              borderBottomWidth: 0
            
            },
            headerTintColor: "white"
          }}/>
         
         

      
          
      </Stack>
    </>
  )
}

export default ProfileLayout