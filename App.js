import { StatusBar } from 'expo-status-bar';
//mport React from 'react';
//import { StyleSheet, Text, View } from 'react-native';
import 'react-native-gesture-handler';
import * as React from 'react';
import { StyleSheet, Button, View,Text} from 'react-native';
import Menu, { MenuItem, MenuDivider } from 'react-native-material-menu';
import { NavigationContainer } from '@react-navigation/native';
//import { createStackNavigator } from '@react-navigation/stack';

import Register from './screens/Register';


//import MenuItem from "...";
//import Button from "...";
//import Menu from "@material-ui/core/Menu";
  
const App = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  
  const handleClose = () => {
    setAnchorEl(null);
  };
  
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  
  return (
    <View>
      <Button
        // aria-controls="simple-menu"
        // aria-haspopup="true"
        onClick={handleClick}
        title="Open Menu List"
      />
      <Menu
        keepMounted
        anchorEl={anchorEl}
        onClose={handleClose}
        open={Boolean(anchorEl)}
      >
        <MenuItem onClick={handleClose}>View</MenuItem>
        <MenuItem onClick={handleClose}>Register</MenuItem>
        <MenuItem onClick={handleClose}>Update</MenuItem>
        <MenuItem onClick={handleClose}>Delete</MenuItem>
      </Menu>
    </View>
  );
};
  
export default App;
