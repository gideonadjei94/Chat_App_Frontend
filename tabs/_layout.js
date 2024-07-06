import { View, Image,Text } from 'react-native'
import {Tabs, Redirect } from 'expo-router';

import { icons } from '../../constants'
import { images } from '../../constants';

const TabIcon = ({ icon, color, name, focused }) =>{
    return (
        <View className="items-center justify-center gap-1">
            <Image 
                source={icon}
                resizeMode='contain'
                tintColor={color}
                className="w-6 h-6"
            />
            <Text className={`${focused ? 'font-psemibold': 'font-pregular'} text-xs`} style={{ color: color }}>
                {name}
            </Text>
        </View>
    )
}

const TabLayout = () => {
  return (
    <>
        <Tabs
            screenOptions={{
                tabBarShowLabel: false,
                tabBarActiveTintColor: '#000000',
                tabBarInactiveTintColor:'#CDCDE0',
                tabBarStyle:{
                    backgroundColor:"#79E5F0",
                    borderTopWidth: 1,
                    borderTopColor: '#79E5F0'
                }
            }}
        >
            <Tabs.Screen 
                name="message" 
                options={{
                    title: 'message',
                    headerShown: false,
                    tabBarIcon: ({color, focused}) =>(
                        <TabIcon 
                        icon={icons.message}
                        color={color}
                        name="message"
                        focused={focused}
                        
                        />
                    )
                }}
            />
            <Tabs.Screen 
                name="call" 
                options={{
                    title: 'call',
                    headerShown: false,
                    tabBarIcon: ({color, focused}) =>(
                        <TabIcon 
                        icon={icons.call}
                        color={color}
                        name="call"
                        focused={focused}
                        
                        />
                    )
                }}
            />
            <Tabs.Screen 
                name="status" 
                options={{
                    title: 'Status',
                    headerShown: false,
                    tabBarIcon: ({color, focused}) =>(
                        <TabIcon 
                        icon={icons.status}
                        color={color}
                        name="status"
                        focused={focused}
                        
                        />
                    )
                }}
            />
            <Tabs.Screen 
                name="profile" 
                options={{
                    title: 'Profile',
                    headerShown: false,
                    tabBarIcon: ({color, focused}) =>(
                        <TabIcon 
                        icon={icons.profile}
                        color={color}
                        name="profile"
                        focused={focused}
                        
                        />
                    )
                }}
            />
        </Tabs>
    </>
  )
}

export default TabLayout