import React, { useEffect } from 'react';
import { StyleSheet, View, Text, SafeAreaView } from 'react-native';
import Mybutton from './Components/MyButtons';
import Mytext from './Components/Mytext';
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
                      id INTEGER PRIMARY KEY NOT NULL,
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
          <Mytext text="SQLite Example" />
          <Mybutton
            style={styles.btn}
            title="Register"
            customClick={() => navigation.navigate('Register')}
          />
          <Mybutton
            title="Update"
            customClick={() => navigation.navigate('Update')}
          />
          <Mybutton
            title="View"
            customClick={() => navigation.navigate('View')}
          />
          <Mybutton
            title="Delete"
            customClick={() => navigation.navigate('Delete')}
          />
        </View>
       </View>
    </SafeAreaView>
  );

};



export default HomeScreen;
