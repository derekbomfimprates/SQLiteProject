// For this project we used this code as base to create our app.
// Agrawal, S., 2021. Example of SQLite Database in React Native - About React. [online] 
// About React. Available at: <https://aboutreact.com/example-of-sqlite-database-in-react-native/> 

import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  ScrollView,
  Image,
  KeyboardAvoidingView,
  Animated,
} from "react-native";
import Mybutton from "./Components/MyButtons";
import Mytext from "./Components/MyText";

//using expo-sqlite to create a database, best approach we found, you can check it on:
//Snyk, 2021, SQLite Storage for React Native. [online] 
//Available at:  <https://snyk.io/advisor/npm-package/react-native-sqlite-2@3.1.1> 
import * as SQLite from "expo-sqlite";

 // using openDatabase to open the db that expo-sqlite creates for us. 
const db = SQLite.openDatabase("employees.db");

const HomeScreen = ({ navigation }) => {
  useEffect(() => {
    // functon to reate a database intenaly on the system.
    db.transaction(function (txn) {
      txn.executeSql(
        "SELECT name FROM sqlite_master WHERE type='table' AND name='employees'",
        [],
        function (tx, res) {
          console.log("item:", res.rows.length);
          if (res.rows.length == 0) {
            txn.executeSql("DROP TABLE IF EXISTS employees", []);
            txn.executeSql(
              `CREATE TABLE IF NOT EXISTS employees
                  (
                      firstName TEXT NOT NULL,
                      lastName TEXT NOT NULL,
                      gender TEXT NOT NULL,
                      department TEXT NOT NULL                
                  );
              `,
              []
            );
          }
        }
      );
    });
  }, []);
//creating stylesheet for container and logo
  const styles = StyleSheet.create({
    btn: {
      height: 20,
    },
    container: {
      backgroundColor: "white",
      flex: 1,
    },
    logoContainer: {
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
    },
    logo: {
      width: 200,
      height: 200,
      alignItems: "center",
    },
  });

  const [offset] = useState(new Animated.ValueXY({ x: 0, y: 80 }));
  useEffect(() => {
    Animated.parallel([
      Animated.spring(offset.y, {
        toValue: 0,
        speed: 4,
        bounciness: 20,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  //we are returning the menu to the App.js, this will be the main page when you open the app.

  return (
    <SafeAreaView style={styles.container}>
      <Animated.View>
        <View style={styles.logoContainer}>
          <Image source={require("../assets/logo.png")} style={styles.logo} />
        </View>

        <ScrollView keyboardShouldPersistTaps="handled">

        <Mybutton
          style={styles.btn}
          title="New Employee"
          customClick={() => navigation.navigate("Register")}
        />
        <Mybutton
          title="View Employee"
          customClick={() => navigation.navigate("View")}
        />
        <Mybutton
          title="Update Employee"
          customClick={() => navigation.navigate("Updates")}
        />
        <Mybutton
          title="View All Employees"
          customClick={() => navigation.navigate("ViewAll")}
        />
        <Mybutton
          title="Delete Employee"
          customClick={() => navigation.navigate("Delete")}
        />
        <Mybutton
          title="Get Employee ID"
          customClick={() => navigation.navigate("GetId")}
        />
        </ScrollView>
      </Animated.View>
    </SafeAreaView>
  );
};

export default HomeScreen;
