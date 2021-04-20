

import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const Mybutton = (props) => {
  return (
    <TouchableOpacity
      style={styles.button}
      onPress={props.customClick}>
      <Text style={styles.text}>
        {props.title}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    backgroundColor: '#00CCFF',
    color: '#ffffff',
    padding: 10,
    marginTop: 16,
    marginLeft: 150,
    marginRight: 150,
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12
  },
  text: {
    color: 'black',
  },
});

export default Mybutton;