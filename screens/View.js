// For this project we used this code as base to create our app.
// Agrawal, S., 2021. Example of SQLite Database in React Native - About React. [online] 
// About React. Available at: <https://aboutreact.com/example-of-sqlite-database-in-react-native/> 

import React, { useState } from 'react';
import { Text, View, SafeAreaView } from 'react-native';
import Mytextinput from './Components/MyTextInput';
import Mybutton from './Components/MyButtons';
import * as SQLite from 'expo-sqlite';
import { Icon } from 'react-native-elements';

const db = SQLite.openDatabase('employees.db');
const ViewUser = ({ navigation }) => {

  let [rowid, setRowId] = useState('');
  let [userData, setUserData] = useState({});

  let searchUser = () => {
    console.log(rowid);
    setUserData({});
    db.transaction((tx) => {
      tx.executeSql(
        'SELECT rowid, firstName, lastName, gender, department FROM employees where rowid = ?', 
        [rowid],
        (tx, results) => {
          var len = results.rows.length;
          console.log('len', len);
          if (len > 0) { // when the number of employee is bigger than zero will print the users
            setUserData(results.rows.item(0));
          } else {
            alert('No employee found'); // when the number of employee is zero
          }
        }
      );
    });
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1, backgroundColor: 'white' }}>
        <View style={{ flex: 1 }}>
        <Icon style={{ alignContent: 'center'}} size={70} name='person-outline'  color='#00CCFF' type='ionicon'/>
          
          <Mytextinput
            placeholder="Enter Employee ID"
            onChangeText={
              (rowid) => setRowId(rowid)
            }
            style={{ padding: 10 }}
          />
          <Mybutton title="Search Employee" customClick={searchUser} />
          <View
            style={{
              marginLeft: 35,
              marginRight: 35,
              marginTop: 10
            }}>
            <Text>Employee ID: {userData.rowid}</Text>
            <Text>First Name: {userData.firstName}</Text>
            <Text>Last Name: {userData.lastName}</Text>
            <Text>Gender: {userData.gender}</Text>
            <Text>Department: {userData.department}</Text>
          </View>
           <Mybutton
          title="Get the ID"
          customClick={() => navigation.navigate("GetId")}
        />
        </View>

       
        
      </View>
    </SafeAreaView>
  );
};


export default ViewUser;
