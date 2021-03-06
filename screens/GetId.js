// For this project we used this code as base to create our app.
// Agrawal, S., 2021. Example of SQLite Database in React Native - About React. [online] 
// About React. Available at: <https://aboutreact.com/example-of-sqlite-database-in-react-native/> 

import React, { useState } from "react";
import { FlatList, Text, View, SafeAreaView } from "react-native";
import Mytextinput from "./Components/MyTextInput";
import Mybutton from "./Components/MyButtons";
import * as SQLite from "expo-sqlite";
import { Icon } from 'react-native-elements';

const db = SQLite.openDatabase("employees.db");

const GetId = () => {
  let [userName, setUserName] = useState("");
  let [userName1, setUserName1] = useState("");
  let [userData, setUserData] = useState({});
  let [flatListItems, setFlatListItems] = useState([]);

  let searchUser = () => {
    console.log(userName, userName1);
    setUserData({});
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT rowid, firstName, lastName, gender, department FROM employees where firstName = ? and lastName = ?",
        [userName, userName1],
        (tx, results) => {
          
          var len = results.rows.length;
          console.log("len", len);
          
          if (len > 0) {
            var temp = [];
          for (let i = 0; i < results.rows.length; ++i){
          
            setUserData(results.rows.item(i));
            temp.push(results.rows.item(i));
            setFlatListItems(temp);}
          } else {
            alert("No employee found");
          }
        }
      );
    });
  };
  let listViewItemSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: '100%',
          backgroundColor: '#00CCFF'
        }}
      />
    );
  };
  let listItemView = (item) => {
    return (
      <View
        key={item.rowid}
        style={{ backgroundColor: 'white', padding: 20 }}>
        <Text>ID: {item.rowid}</Text>
        <Text>First Name: {item.firstName}</Text>
        <Text>Last Name: {item.lastName}</Text>
        <Text>Gender: {item.gender}</Text>
        <Text>Department: {item.department}</Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1, backgroundColor: "white" }}>
        <View style={{ flex: 1 }}>
        <Icon style={{ alignContent: 'center'}} size={70} name='search-outline'  color='#00CCFF' type='ionicon'/>
          <Mytextinput
            placeholder="Enter Employee First Name"
            onChangeText={(userName) => setUserName(userName)}
            style={{ padding: 10 }}
          />
          <Mytextinput
            placeholder="Enter Employee Last Name"
            onChangeText={(userName1) => setUserName1(userName1)}
            style={{ padding: 10 }}
          />
          <Mybutton title="Search Employee" customClick={searchUser} />
          <View>
             <FlatList
             data={flatListItems}
             ItemSeparatorComponent={listViewItemSeparator}
             keyExtractor={(item, index) => index.toString()}
             renderItem={({ item }) => listItemView(item)}
           />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default GetId;
