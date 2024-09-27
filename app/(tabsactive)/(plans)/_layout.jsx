import { View, Text } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'


const ActivePlansLayout = () => {
    return (
        <>
          <Stack>
              <Stack.Screen name="create-plans"
                options={{
                headerShown:false
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