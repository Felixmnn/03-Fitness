import { View, Text, Image, Platform } from 'react-native';
import { Tabs, Redirect } from 'expo-router';
import { icons } from "../../constants";

const TabIcon = ({ icon, color, name, focused }) => {
  const iconSize = Platform.select({ web: 30, default: 24 }); // Different size for web

  return (
    <View className={`items-center justify-center ${Platform.OS === 'web' ? "h-[70px] mb-2" : "gap-2"}`}>
      <Image
        source={icon}
        resizeMode="contain"
        tintColor={color}
        style={{ width: iconSize, height: iconSize }} // Apply the icon size
      />
      <Text className={`${focused ? 'font-psemibold' : 'font-pregular'} text-xs w-12 text-center`} style={{ color: color }}>
        {name}
      </Text>
    </View>
  );
};

const TabsLayout = () => {
  return (
    <>
      <Tabs
        screenOptions={{
          tabBarShowLabel: false,
          tabBarActiveTintColor: "red",
          tabBarInactiveTintColor: "#ffffff",
          tabBarPosition: Platform.OS === 'web' ? 'bottom' : 'bottom',
          tabBarStyle: {
            backgroundColor: '#003566',
            borderTopWidth: 0,
            height: Platform.OS === 'web' ? 70 : 80, // Set a fixed height for web
            paddingTop: Platform.OS === 'web' ? 10 : 20, // Adjust padding for web
          },
        }}
      >
        <Tabs.Screen
          name="plans"
          options={{
            title: "Plans",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon={icons.plans}
                color={color}
                name="Plans"
                focused={focused}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="home"
          options={{
            title: "Home",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon={icons.home}
                color={color}
                name="Home"
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
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon={icons.data}
                color={color}
                name="Results"
                focused={focused}
              />
            ),
          }}
        />
      </Tabs>
    </>
  );
};

export default TabsLayout;