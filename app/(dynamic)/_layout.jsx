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
              headerTitle: "Select Exercises",
              headerStyle: {
                backgroundColor:"#0f0f0f"
              },
              headerTintColor: "white"
            }}/>

          <Stack.Screen name="edit-workout"
            options={{
              headerTitle: "Editing Workout",
              headerStyle: {
                backgroundColor:"#0f0f0f"
              },
              headerTintColor: "white"
            }}/>
          <Stack.Screen name="past-workout"
          options={{
            headerTitle: "Past Workout",
            headerStyle: {
              backgroundColor:"#0f0f0f"
            },
            headerTintColor: "white"
          }}/>
          <Stack.Screen name="active-exercise-picker"
            options={{
              headerTitle: "Select Exercise",
              headerStyle: {
                backgroundColor:"#0f0f0f"
              },
              headerTintColor: "white"
            }}/>
          <Stack.Screen name="progress-workout"
            options={{
              headerTitle: "Progress",
              headerStyle: {
                backgroundColor:"#0f0f0f"
              },
              headerTintColor: "white"
            }}/>

      
          
      </Stack>
    </>
  )
}

export default ProfileLayout