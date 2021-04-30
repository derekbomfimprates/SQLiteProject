import React, { useState } from 'react'; // Impport React for application 
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
import { Icon } from 'react-native-elements';

const db = SQLite.openDatabase('employees.db');

const UpdateUser = ({ navigation }) => {
  let [rowid, setRowId] = useState('');
  let [firstName, setFirstName] = useState('');
  let [lastName, setLastName] = useState('');
  let [gender, setGender] = useState('');
  let [department, setDepartment] = useState('');

  let updateAllStates = (f_name, l_name, gender, department) => {
    setFirstName(f_name);
    setLastName(l_name);
    setGender(gender);
    setDepartment(department);
  };

  let searchUser = () => {
    console.log(rowid);
    db.transaction((tx) => {
      tx.executeSql(
        'SELECT * FROM employees where rowid = ?',
        [rowid],
        (tx, results) => {
          var len = results.rows.length;
          if (len > 0) {
            let res = results.rows.item(0);
            updateAllStates(
              res.firstName,
              res.lastName,
              res.gender,
              res.department
            );
          } else {
            alert('No employee found');
            updateAllStates('', '', '', '');
          }
        }
      );
    });
  };
  let UpdateUser = () => {
    console.log(rowid, firstName, lastName, gender, department);

    if (!rowid) {
      alert('Please fill employee ID');
      return;
    }
    if (!firstName) {
      alert('Please fill first name');
      return;
    }
    if (!lastName) {
      alert('Please fill last name');
      return;
    }
    if (!gender) {
      alert('Please fill gender');
      return;
    }
    if (!department) {
      alert('Please fill department');
      return;
    }

    db.transaction((tx) => {
      tx.executeSql(
        'UPDATE employees set firstName=?, lastName=? , gender=?, department=? where rowid = ?',
        [firstName, lastName, gender, department, rowid],
        (tx, results) => {
          console.log('Results', results.rowsAffected);
          if (results.rowsAffected > 0) {
            Alert.alert(
              'Success',
              'Employee updated successfully',
              [
                {
                  text: 'Ok',
                  onPress: () => navigation.navigate('HomeScreen'),
                },
              ],
              { cancelable: false }
            );
          } else alert('Updation Failed');
        }
      );
    });
  };
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1, backgroundColor: 'white' }}>
        <View style={{ flex: 1 }}>
        <Icon style={{ alignContent: 'center'}} size={70} name='sync-outline'  color='#00CCFF' type='ionicon'/>
          <ScrollView keyboardShouldPersistTaps="handled">
            <KeyboardAvoidingView
              behavior="padding"
              style={{ flex: 1, justifyContent: 'space-between' }}>
              <Mytextinput
                placeholder="Enter Employee ID"
                style={{ padding: 10 }}
                onChangeText={
                  (rowid) => setRowId(rowid)
                }
              />
              <Mybutton
                title="Search Employee"
                customClick={searchUser} 
              />
              <Mytextinput
                placeholder="Enter First Name"
                value={firstName}
                style={{ padding: 10 }}
                onChangeText={
                  (firstName) => setFirstName(firstName)
                }
              />
              <Mytextinput
                placeholder="Enter Last Name"
                value={'' + lastName}
                onChangeText={
                  (lastName) => setLastName(lastName)
                }
                maxLength={10}
                style={{ padding: 10 }}
              />
              <Mytextinput
                value={gender}
                placeholder="Enter Gender"
                onChangeText={
                  (gender) => setGender(gender)
                }
                maxLength={225}
                numberOfLines={5}
                multiline={true}
                style={{ textAlignVertical: 'top', padding: 10 }}
              />
                <Mytextinput
                value={department}
                placeholder="Enter Department"
                onChangeText={
                  (department) => setDepartment(department)
                }
                maxLength={225}
                numberOfLines={5}
                multiline={true}
                style={{ textAlignVertical: 'top', padding: 10 }}
              />
              <Mybutton
                title="Update Employee"
                customClick={UpdateUser}
              />
            </KeyboardAvoidingView>
          </ScrollView>
        </View>
        
      </View>
    </SafeAreaView>
  );
};

export default UpdateUser;
