import React, { useState } from 'react';
import { Text, View, Alert, SafeAreaView } from 'react-native';
import Mytextinput from './Components/MyTextInput';
import Mybutton from './Components/MyButtons';
import * as SQLite from 'expo-sqlite';
import { Icon } from 'react-native-elements';

const db = SQLite.openDatabase('employees.db'); // this is the acces to our database created by expo-sqlite

const DeleteUser = ({ navigation }) => {
  let [rowid, setRowId] = useState(''); 

  let deleteUser = () => {
    db.transaction((tx) => {
      tx.executeSql(
        'DELETE FROM  employees where rowid = ?', // using SQL function to find the user in the table
        [rowid],
        (tx, results) => {
          console.log('Results', results.rowsAffected);
          if (results.rowsAffected > 0) {
            Alert.alert(
              'Success',
              'User deleted successfully',
              [
                {
                  text: 'Ok',
                  onPress: () => navigation.navigate('HomeScreen'), // when the user click ok the app will go to the homescreen
                },
              ],
              { cancelable: false }
            );
          } else {
            alert('Please insert a valid Employee ID'); // in case the system doesnt find the employee, it will show this message to the user. 
          }
        }
      );
    });
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1, backgroundColor: 'white' }}>
        <View style={{ flex: 1 }}>
        <Icon style={{ alignContent: 'center'}} size={70} name='person-remove-outline'  color='#00CCFF' type='ionicon'/>
          <Mytextinput
            placeholder="Enter Employee ID"
            onChangeText={
              (rowid) => setRowId(rowid)
            }
            style={{ padding: 10 }}
          />
          <Mybutton title="Delete User" customClick={deleteUser} />
        </View>
        <Mybutton
          title="Get the ID"
          customClick={() => navigation.navigate("GetId")} // we included this navigation to GetId screen, because the user will need this information to delete
        />
      </View>
    </SafeAreaView>
  );
};


export default DeleteUser;