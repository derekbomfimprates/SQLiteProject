import React, { useState } from 'react';
import { Text, View, SafeAreaView } from 'react-native';
import Mytextinput from './Components/MyTextInput';
import Mybutton from './Components/MyButtons';
import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('employees.db');

const ViewUser = () => {
  let [userId, setUserId] = useState('');
  let [userData, setUserData] = useState({});

  let searchUser = () => {
    console.log(userId);
    setUserData({});
    db.transaction((tx) => {
      tx.executeSql(
        'SELECT * FROM employees where id = ?',
        [userId],
        (tx, results) => {
          var len = results.rows.length;
          console.log('len', len);
          if (len > 0) {
            setUserData(results.rows.item(0));
          } else {
            alert('No employee found');
          }
        }
      );
    });
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1, backgroundColor: 'white' }}>
        <View style={{ flex: 1 }}>
          <Mytextinput
            placeholder="Enter Employee ID"
            onChangeText={
              (userId) => setUserId(userId)
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
            <Text>Employee ID: {userData.id}</Text>
            <Text>First Name: {userData.firstName}</Text>
            <Text>Last Name: {userData.lastName}</Text>
            <Text>Gender: {userData.gender}</Text>
            <Text>Department: {userData.department}</Text>
          </View>
        </View>
        
        
      </View>
    </SafeAreaView>
  );
};

export default ViewUser;
