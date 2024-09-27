import { View, Text } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'


const ProfileLayout = () => {
  return (
    <>
      <Stack>
          <Stack.Screen name="overview"
          options={{
            headerShown:false
          }}/>
      
          <Stack.Screen name="details"
          options={{
            headerShown:false
          }}/>
      </Stack>
    </>
  )
}

export default ProfileLayout