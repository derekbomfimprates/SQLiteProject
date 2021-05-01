// For this project we used this code as base to create our app.
// Agrawal, S., 2021. Example of SQLite Database in React Native - About React. [online] 
// About React. Available at: <https://aboutreact.com/example-of-sqlite-database-in-react-native/> 

import React, { useState } from 'react';
import {
  View,
  ScrollView,
  KeyboardAvoidingView,
  Alert,
  SafeAreaView,
  Text,
} from 'react-native';
import Mytextinput from './Components/MyTextInput'; // importing Mytextinput style and functions
import Mybutton from './Components/MyButtons'; // importing MyButtons style and functions
import * as SQLite from 'expo-sqlite'; // importing all function from expo-sqlite to use to created and manipute the database
import { Icon } from 'react-native-elements'; // using the react native elements 

const db = SQLite.openDatabase('employees.db'); // opening the database, table called employee 

const RegisterUser = ({ navigation }) => { // we are using the navigation to go into the screens
  //Now, i am preparing the data to be manipulate the table after, all are start with '' (none) caracteres.
  let [firstName, setFirstName] = useState('');  
  let [lastName, setLastName] = useState('');
  let [gender, setGender] = useState('');
  let [department, setDepartment] = useState('');

  let register_user = () => { // creating the register user section
    console.log(firstName, lastName, gender, department);

    if (!firstName) { 
      alert('Please fill first name'); // asked to fill the information
      return;
    }
    if (!lastName) {
      alert('Please fill last name');// asked to fill the information
      return;
    }
    if (!gender) {
      alert('Please fill gender');// asked to fill the information
      return;
    }
    if (!department) {
      alert('Please fill department');// asked to fill the information
      return;
    }
    

    db.transaction(function (tx) {
      tx.executeSql(
        'INSERT INTO employees (firstName, lastName, gender, department) VALUES (?,?,?,?)', // database structure to manipulate data
        [firstName, lastName, gender, department], // getting the information
        (tx, results) => {
          console.log('Results', results.rowsAffected);
          if (results.rowsAffected > 0) {
            Alert.alert( // output that the data was save correctly
              'Success',
              'Employee registered successfully',
              [
                {
                  text: 'Ok',
                  onPress: () => navigation.navigate('HomeScreen'), // navigation use to go to homescreen
                },
              ],
              { cancelable: false }
            );
          } else alert('Registration Failed'); // output the message that the data was't save 
        }
      );
    });
  };

  return ( 
    <SafeAreaView style={{ flex: 1 }}> 
      <View style={{ flex: 1, backgroundColor: 'white' }}> 
        <View style={{ flex: 1 }}>
        <Icon style={{ alignContent: 'center'}} size={70} name='person-add-outline'  color='#00CCFF' type='ionicon'/>
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