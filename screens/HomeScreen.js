import React, { useEffect } from 'react';
import { StyleSheet, View, Text, SafeAreaView, Image } from 'react-native';
import Mybutton from './Components/MyButtons';
import Mytext from './Components/MyText';
import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('employees.db');
const HomeScreen = ({ navigation }) => {
  useEffect(() => {
    db.transaction(function (txn) {
      txn.executeSql(
        "SELECT name FROM sqlite_master WHERE type='table' AND name='employees'",
        [],
        function (tx, res) {
          console.log('item:', res.rows.length);
          if (res.rows.length == 0) {
            txn.executeSql('DROP TABLE IF EXISTS employees', []);
            txn.executeSql(
              `CREATE TABLE IF NOT EXISTS employees
                  (
                      id INTEGER PRIMARY KEY NOT NULL AUTO_INCREMENT,
                      firstName TEXT NOT NULL,
                      lastName TEXT NOT NULL,
                      gender TEXT NOT NULL,
                      department TEXT NOT NULL                
                  );
              `,[]);
          }
        }
      );
    });
  }, []);

  const styles = StyleSheet.create({
 
    btn: {
      height: 20,
 
    },
  });
 
  return (
    <SafeAreaView style={{  }}>
      <View style={{backgroundColor: 'white' }}>
        <View style={{}}>
          
          <Mybutton
            style={styles.btn}
            title="New Employee"
            customClick={() => navigation.navigate('Register')}
          />
          <Mybutton
            title="View Employee"
            customClick={() => navigation.navigate('View')}
          />
          <Mybutton
            title="Update Employee"
            customClick={() => navigation.navigate('Updates')}
          />
          <Mybutton
            title="View All Employees"
            customClick={() => navigation.navigate('ViewAll')}
          />
          <Mybutton
            title="Delete Employee"
            customClick={() => navigation.navigate('Delete')}
          />
          <View style={{flexDirection: 'column',justifyContent: 'center', alignItems: 'center'}} >
         <Image source={require('../assets/logo.png')}  style={{ width: 200, height: 200, alignItems: 'center' }}/>
        </View>
        </View>
  
       </View>
    </SafeAreaView>
  );

};



export default HomeScreen;
