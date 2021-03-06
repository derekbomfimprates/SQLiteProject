import 'react-native-gesture-handler';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import HomeScreen from './screens/HomeScreen';
import RegisterUser from './screens/Register';
import ViewUser from './screens/View';
import DeleteUser from './screens/Delete';
import UpdateUser from './screens/Updates';
import ViewAllUser from './screens/ViewAll';
import GetId from './screens/GetId';


  
const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="HomeScreen">
        <Stack.Screen
          name="HomeScreen"
          component={HomeScreen}
          options={{
            title: 'HR Buddy', //Set Header Title
            headerStyle: {
              backgroundColor: '#00CCFF', //Set Header color
            },
            headerTintColor: 'black', //Set Header text color
            headerTitleStyle: {
              fontWeight: 'bold', //Set Header text style
              alignSelf: 'center',
              
            },
          }}
        />
        <Stack.Screen
          name="View"
          component={ViewUser}
          options={{
            title: 'View Employee', //Set Header Title
            headerStyle: {
              backgroundColor: '#00CCFF', //Set Header color
            },
            headerTintColor: 'black', //Set Header text color
            headerTitleStyle: {
              fontWeight: 'bold', //Set Header text style
            },
          }}
        />
        <Stack.Screen
          name="Delete"
          component={DeleteUser}
          options={{
            title: 'Delete Employee', //Set Header Title
            headerStyle: {
              backgroundColor: '#00CCFF', //Set Header color
            },
            headerTintColor: 'black', //Set Header text color
            headerTitleStyle: {
              fontWeight: 'bold', //Set Header text style
            },
          }}
        />
        <Stack.Screen
          name="Register"
          component={RegisterUser}
          options={{
            title: 'Register Employee', //Set Header Title
            headerStyle: {
              backgroundColor: '#00CCFF', //Set Header color
            },
            headerTintColor: 'black', //Set Header text color
            headerTitleStyle: {
              fontWeight: 'bold', //Set Header text style
            },
          }}
        />
        <Stack.Screen
          name="ViewAll"
          component={ViewAllUser}
          options={{
            title: 'View All Employees', //Set Header Title
            headerStyle: {
              backgroundColor: '#00CCFF', //Set Header color
            },
            headerTintColor: 'black', //Set Header text color
            headerTitleStyle: {
              fontWeight: 'bold', //Set Header text style
            },
          }}
        />
        <Stack.Screen
          name="Updates"
          component={UpdateUser}
          options={{
            title: 'Update Employee', //Set Header Title
            headerStyle: {
              backgroundColor: '#00CCFF', //Set Header color
            },
            headerTintColor: 'black', //Set Header text color
            headerTitleStyle: {
              fontWeight: 'bold', //Set Header text style
            },
          }}
        />
        <Stack.Screen
          name="GetId"
          component={GetId}
          options={{
            title: 'Get ID', //Set Header Title
            headerStyle: {
              backgroundColor: '#00CCFF', //Set Header color
            },
            headerTintColor: 'black', //Set Header text color
            headerTitleStyle: {
              fontWeight: 'bold', //Set Header text style
            },
          }}
        />
        
    
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;