import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  Image,
  KeyboardAvoidingView,
  Animated,
} from "react-native";
import Mybutton from "./Components/MyButtons";
import Mytext from "./Components/MyText";
import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabase("employees.db");
const HomeScreen = ({ navigation }) => {
  useEffect(() => {
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
  return (
    <SafeAreaView style={styles.container}>
      <Animated.View>
        <View style={styles.logoContainer}>
          <Image source={require("../assets/logo.png")} style={styles.logo} />
        </View>

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
      </Animated.View>
    </SafeAreaView>
  );
};

export default HomeScreen;
