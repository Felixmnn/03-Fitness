import { View, Text, Image } from 'react-native';
import { Tabs, Redirect } from 'expo-router';
import {icons} from "../../constants";

const TabIcon = ({icon, color, name, focused})=> {
  return(
    <View className="items-center justify-center gap-2 " >
      <Image
        source={icon}
        resizeMode="contain"
        tintColor={color}
        className="w-6 h-6"
      />
      <Text className={`${focused ? 'font-psemibold' : 'font-pregular'} text-xs`} style={{color:color}}>
        {name}
      </Text>
    </View>
    
  );
};

const TabsLayout = () => {
  return (
    <>
      <Tabs screenOptions={{
        tabBarShowLabel:false,
        tabBarActiveTintColor: "red",
        tabBarInactiveTintColor: "#ffffff",
        tabBarStyle: { 
          backgroundColor:'#003566',
          borderTopWidth:1 ,
          borderTopColor: "232533",
          height: 80,

        }
      }}
        
      >
      
        
        <Tabs.Screen
          name="plans"
          options={{
            title: "Plans",
            headerShown: false,
            tabBarIcon:({color,focused}) => (
              <TabIcon
                icon={icons.plans}
                color={color}
                name="Plans"
                focused={focused}
                />
            )
          }}
          />

<Tabs.Screen
          name="home"
          options={{
            title: "Home",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon={icons.plus}
                color={color}
                name="Create"
                focused={focused}
              />
            ),
          }}
          />

          <Tabs.Screen
          name="results"
          options={{
            title: "Results",
            headerShown: false,
            tabBarIcon:({color,focused}) => (
              <TabIcon
                icon={icons.data}
                color={color}
                name="Results"
                focused={focused}
                />
            )
          }}
          />
      </Tabs>
    </>
  )
}

export default TabsLayout