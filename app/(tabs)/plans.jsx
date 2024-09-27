import { View, Text, FlatList, ScrollView } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import NavBox from '../../components/NavBox'
import { icons } from '../../constants'
import { router } from 'expo-router'



const plans = () => {
  return (
    
      <SafeAreaView className="bg-primary h-full">
        <ScrollView>
          <NavBox
            title="My Training Plans"
            icon= {icons.bookmark}
            handlePress = {() => router.push("/my-plans")}
          /> 
          <NavBox
            title="Discover Plans"
            icon= {icons.search}
            handlePress = {() => router.push("/discover-plans")}
          /> 
          <NavBox
            title="Create Plan"
            icon= {icons.plus}
            handlePress = {() => router.push("/create-plans")}

          /> 
        </ScrollView>    
      </SafeAreaView>
    
    
  )
}

export default plans