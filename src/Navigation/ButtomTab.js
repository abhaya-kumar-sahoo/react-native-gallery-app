import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Home} from '../Screens/Home/Home';
import {Video} from '../Screens/Video/Video';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {View} from 'react-native';

const Tab = createBottomTabNavigator();

export const BottomTab = () => {
  return (
    <Tab.Navigator
      sceneContainerStyle={{backgroundColor: '#161616'}}
      screenOptions={{
        headerShown: false,
        headerBackgroundContainerStyle: {backgroundColor: 'black'},
        tabBarActiveBackgroundColor: '#333333',
        tabBarBadgeStyle: {borderRadius: 20},
        tabBarInactiveBackgroundColor: '#444444',
        tabBarShowLabel: false,
        tabBarStyle: {position: 'absolute'},
      }}
      initialRouteName="Image">
      <Tab.Screen
        name="Image"
        component={Home}
        options={{
          tabBarShowLabel: false,
          tabBarIcon: ({color, size}) => (
            <MaterialCommunityIcons
              name="folder-image"
              color={'#bada55'}
              size={30}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Video"
        component={Video}
        options={{
          tabBarIcon: ({color, size}) => (
            <MaterialCommunityIcons name="video" color={'#bada55'} size={30} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};
