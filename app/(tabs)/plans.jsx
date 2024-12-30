import { View, Text, FlatList, ScrollView, Image, Dimensions, Switch, Platform} from 'react-native'
import React, { useRef } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import NavBox from '../../components/NavBox'
import { icons } from '../../constants'
import { router } from 'expo-router'
import ProfilePicture from 'components/ProfilePicture';
import { TouchableOpacity } from 'react-native'
import Main from '../../components/Main'
import Footer from '../../components/Footer'
import { useState } from 'react'
import { useEffect } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Icon from 'react-native-vector-icons/FontAwesome';
import exercises from '../../constants/exercises'
import CustomButton from '../../components/CustomButton'
import { styled } from 'nativewind'
import { LinearGradient, Stop } from 'react-native-svg'
import { Svg, Rect } from 'react-native-svg'; // Importiere das Svg-Tag, um den Gradient anzuwenden

const plans = () => {
  const [filteredKeys, setFilteredKeys] = useState([]);
  const [items,setItems] = useState([]);
  const flatListRef = useRef(null);
  

  const StyledView = styled(View);
  const StyledText = styled(Text)
  
  const onViewableItemsChanged = useRef(({ viewableItems }) => {
    if (viewableItems.length > 0) {
      setCurrentIndex(viewableItems[0].index); // Aktuelles Element verfolgen
    }
  }).current;

  const [currentIndex, setCurrentIndex] = useState(0); // Aktueller Index

  const getKeyObject = async(key)=>{
    const rawData = await AsyncStorage.getItem(key)
    const parsedtData = JSON.parse(rawData) 
    return parsedtData
  }
  const viewabilityConfig = { viewAreaCoveragePercentThreshold: 50 }; // Konfiguration für sichtbare Elemente

  useEffect(() => {
    const fetchKeysAndData = async () => {
      try {
        const storedKeys = await AsyncStorage.getAllKeys();

        const planKeys = storedKeys.filter(key => key.startsWith("Plan-"));
        setFilteredKeys(planKeys);
        console.log("Hier sollten die Keys sein",planKeys);

        // Lade die Plandaten für jeden Schlüssel
        const plansData = await Promise.all(planKeys.map(async key => await getKeyObject(key)));
        console.log("Das Problem entsteht hier",plansData);

        console.log(plansData)
        setItems(plansData.filter(item => item !== null)); // Setze den Zustand mit validen Objekten
      } catch (error) {

        console.log(error);
      }
    };
    fetchKeysAndData();
  }, []);



  const { width, height } = Dimensions.get('window');
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);


  const yourPlans = ()=>  {
    return (
      <View className="justify-start flex-1 bg-black">
        {/* Indikatorpunkte */}
        {(Dimensions.get('window').width > 600 )? null:
        <View className="flex-row justify-center my-4">
          {items.map((_, index) => (
            <View
              key={index}
              className={`h-2 w-2 mx-1 rounded-full ${
                index === currentIndex ? 'bg-white' : 'bg-gray-600'
              }`}
            />
          ))}
          
        </View>
  }
        {/* FlatList */}
        <FlatList
           ref={flatListRef}
           data={items}
           horizontal={true}
           pagingEnabled={false} // Wir verwenden stattdessen snapping
           showsHorizontalScrollIndicator={false}
           onViewableItemsChanged={onViewableItemsChanged}
           ListEmptyComponent={
           <View className="bg-blue2 rounded-[5px] p-2 h-[150px] justify-center w-full">
            <TouchableOpacity className="justify-center items-center" onPress={() => router.push("/create-plans")}>
              <Text className="text-center text-white font-bold m-2 text-xl text-center">{"No Trainingplans yet :("}</Text>
            </TouchableOpacity>
          </View>}
          viewabilityConfig={viewabilityConfig}
          snapToAlignment="center"
          snapToInterval={width * 0.8 + 16} // Breite + Margin
          decelerationRate="fast" // Schnelles Einrasten
          renderItem={({ item,index }) => {
            const isSelected = index === currentIndex; // Prüfen, ob das Element ausgewählt ist

            return (
              
              <View
                className="bg-blue2 rounded-[5px] p-4 m-2 justify-between"
                style={{ width:(Dimensions.get('window').width > 600? 300 : width * 0.8), height:300 }} // Breite auf 80% des Bildschirms
              >
                <View>
                <View className="flex-row justify-between">
                  <View className="flex-row items-center">
                    <Text className="text-white font-bold text-2xl mr-2">
                      {item.Name}
                    </Text>
                    {item.Saved ? <Icon name="cloud" size={20} color="white" /> : null}
                  </View>
                  <TouchableOpacity
                    onPress={() => {
                      router.push({
                        pathname: '/edit-workout',
                        params: { data: JSON.stringify(item) },
                      });
                    }}
                  >
                    <Icon name="edit" size={30} color="white" />
                  </TouchableOpacity>
                 
                </View>
                  <View>
                    <View className="flex-row justify-between items-center">
                    
                    </View>
                    <View className="relative" >

                    <ScrollView className=" h-[165px] ">
                      <View className=" flex-wrap flex-row overflow-hidden pb-5">
                        
                        {
                            item.EIDs.map((EID)=> {
                              return(
                                <Text key={EID} className="text-white bg-blue-500 p-1 mr-1 mt-1 rounded-[2px]" >{exercises[EID-1].Name}</Text>
                              )
                            }
                          )
                        
                        }
                      </View>
                    </ScrollView>  
                    <Svg height="20" width="100%" className="absolute top-[145px] left-0 right-0 z-10">
                      <LinearGradient id="fadeBottom" x1="0%" y1="0%" x2="0%" y2="100%">
                        <Stop offset="0%" stopColor="rgba(0, 53, 102, 1)" stopOpacity="0" />
                        <Stop offset="100%" stopColor="rgba(0, 53, 102, 1)" stopOpacity="1" />
                      </LinearGradient>
                      <Rect x="0" y="0" width="100%" height="30" fill="url(#fadeBottom)" />
                    </Svg>
                    </View>
                  </View>
                </View>

                   

                    <CustomButton title={"Start Workout"} containerStyles={"bg-white"} textStyles={"text-blue2"} handlePress={()=> {

                      router.push({pathname:"/active-home", params: { data: JSON.stringify(item)}})}}
                      />
              </View>
            );
          }}
        />
      </View>
    );

  }

  

  const fContent = ()=> {
    return (
    <View className="flex-row">
      <TouchableOpacity className="justify-center items-center bg-blue2 rounded-[5px]  h-[150px] w-[150px] " onPress={()=> {router.push("/create-plans")}}>
        <Icon name="file-text-o" size={30} color="white" />
        <Text className="text-white font-bold m-2 text-xl text-center">{"New Plan"}</Text>
      </TouchableOpacity>
    </View>
  )
  }

  

  return (  
      <SafeAreaView className="bg-black h-full">
        <View className="flex-1 m-2 justify-between">
          <ProfilePicture message="Plans"/>
          <Main content={yourPlans()}/>
          <Footer footerTitle="Create:" content={fContent()} />
        </View>
      </SafeAreaView>
  )
}

export default plans