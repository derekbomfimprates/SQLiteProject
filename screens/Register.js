
import React, { useState } from 'react';
import {
  View,
  ScrollView,
  KeyboardAvoidingView,
  Alert,
  SafeAreaView,
  Text,
} from 'react-native';
import Mytextinput from './Components/MyTextInput';
import Mybutton from './Components/MyButtons';
import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('employees.db');
// id INTEGER PRIMARY KEY NOT NULL,
// firstName TEXT NOT NULL,
// lastName TEXT NOT NULL,
// gender TEXT NOT NULL,
// department TEXT NOT NULL  

const RegisterUser = ({ navigation }) => {
  let [firstName, setFirstName] = useState('');
  let [lastName, setLastName] = useState('');
  let [gender, setGender] = useState('');
  let [department, setDepartment] = useState('');

  let register_user = () => {
    console.log(firstName, lastName, gender, department);

    if (!firstName) {
      alert('Please fill name');
      return;
    }
    if (!lastName) {
      alert('Please fill Contact Number');
      return;
    }
    if (!gender) {
      alert('Please fill Address');
      return;
    }
    if (!department) {
      alert('Please fill Address');
      return;
    }
    

    db.transaction(function (tx) {
      tx.executeSql(
        'INSERT INTO employees (firstName, lastName, gender, department) VALUES (?,?,?,?)',
        [firstName, lastName, gender, department],
        (tx, results) => {
          console.log('Results', results.rowsAffected);
          if (results.rowsAffected > 0) {
            Alert.alert(
              'Success',
              'You are Registered Successfully',
              [
                {
                  text: 'Ok',
                  onPress: () => navigation.navigate('HomeScreen'),
                },
              ],
              { cancelable: false }
            );
          } else alert('Registration Failed');
        }
      );
    });
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1, backgroundColor: 'white' }}>
        <View style={{ flex: 1 }}>
          <ScrollView keyboardShouldPersistTaps="handled">
            <KeyboardAvoidingView
              behavior="padding"
              style={{ flex: 1, justifyContent: 'space-between' }}>
              <Mytextinput
                placeholder="Enter First Name"
                onChangeText={
                  (firstName) => setFirstName(firstName)
                }
                style={{ padding: 10 }}
              />
               <Mytextinput
                placeholder="Enter Last Name"
                onChangeText={
                  (lastName) => setLastName(lastName)
                }
                style={{ padding: 10 }}
              />
              <Mytextinput
                placeholder="Enter Gender"
                onChangeText={
                  (gender) => setGender(gender)
                }
                style={{ padding: 10 }}
              />
              <Mytextinput
                placeholder="Enter Department"
                onChangeText={
                  (department) => setDepartment(department)
                }
                style={{ padding: 10 }}
              />
              <Mybutton title="Submit" customClick={register_user} />
            </KeyboardAvoidingView>
          </ScrollView>
        </View>
        
      </View>
    </SafeAreaView>
  );
};

export default RegisterUser;