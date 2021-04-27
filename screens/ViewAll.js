
import React, { useState, useEffect } from 'react';
import { FlatList, Text, View, SafeAreaView } from 'react-native';
import * as SQLite from 'expo-sqlite';
import { Icon } from 'react-native-elements';

const db = SQLite.openDatabase('employees.db');

const ViewAllUser = () => {
  let [flatListItems, setFlatListItems] = useState([]);

  useEffect(() => {
    db.transaction((tx) => {
      tx.executeSql(
        'SELECT * FROM employees',
        [],
        (tx, results) => {
          var temp = [];
          for (let i = 0; i < results.rows.length; ++i)
            temp.push(results.rows.item(i));
          setFlatListItems(temp);
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
    return (
      <View
        key={item.id}
        style={{ backgroundColor: 'white', padding: 20 }}>
        <Text>ID: {item.id}</Text>
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