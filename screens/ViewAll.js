// For this project we used this code as base to create our app.
// Agrawal, S., 2021. Example of SQLite Database in React Native - About React. [online] 
// About React. Available at: <https://aboutreact.com/example-of-sqlite-database-in-react-native/> 

import React, { useState, useEffect, ScrollView } from 'react';
import { FlatList, Text, View, SafeAreaView } from 'react-native';
import * as SQLite from 'expo-sqlite';
import { Icon } from 'react-native-elements';

const db = SQLite.openDatabase('employees.db');

const ViewAllUser = () => {
  let [flatListItems, setFlatListItems] = useState([]); // list of attributes that will show on screen 

  useEffect(() => {
    db.transaction((tx) => {
      tx.executeSql(
        'SELECT rowid, firstName, lastName, gender, department FROM employees', // the data that will get to be showed
        [],
        (tx, results) => {
          var temp = [];
          for (let i = 0; i < results.rows.length; ++i) // here we are getting the number of user count the rows and go into this length and print every user
            temp.push(results.rows.item(i));
          setFlatListItems(temp); // print the full list 
        }
      );
    });
  }, []);

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
   //created a style of table that will be showed
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
      <View style={{ flex: 1, backgroundColor: 'white' }}>
        <View style={{ flex: 1 }}>
        <Icon style={{ alignContent: 'center'}} size={70} name='people-outline'  color='#00CCFF' type='ionicon'/>
          <FlatList
            data={flatListItems}
            ItemSeparatorComponent={listViewItemSeparator}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => listItemView(item)}
          />
        </View>
        
        
      </View>
    </SafeAreaView>
  );
};

export default ViewAllUser;