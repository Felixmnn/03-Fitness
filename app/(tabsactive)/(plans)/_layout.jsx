import { View, Text } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'


const ActivePlansLayout = () => {
    return (
        <>
          <Stack>
              
              <Stack.Screen name="create-plans"
                          options={{
                            headerTitle: "Create Plan",
                            headerStyle: {
                              backgroundColor:"#0f0f0f"
                            },
                            headerTintColor: "white"
                          }}/>

                <Stack.Screen name="discover-plans"
                options={{
                headerShown:false
              }}/>

                <Stack.Screen name="my-plans"
                options={{
                headerShown:false
              }}/>
          </Stack>
        </>
      )
    }

export default ActivePlansLayout