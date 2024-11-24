import { View, Text } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'

const AnalysisLayout = () => {
    return (
        <>
          <Stack>
              <Stack.Screen name="analyse-training"
                options={{
                headerShown:false
              }}/>
            <Stack.Screen name="experimental"
              options={{
                headerTitle: "Upcoming",
                headerStyle: {
                  backgroundColor:"#0f0f0f"
                },
                headerTintColor: "white"
            }}/>

                <Stack.Screen name="traininglist"
                options={{
                headerShown:false
              }}/>
          </Stack>
        </>
      )
    }

export default AnalysisLayout