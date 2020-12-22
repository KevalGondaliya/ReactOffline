import React from 'react';
import {TouchableOpacity, Text, StyleSheet} from 'react-native';

const Mybutton = (props) => {
  return (
    <TouchableOpacity style={styles.button} onPress={props.customClick}>
      <Text style={styles.text}>{props.title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    backgroundColor: '#3cb565',
    color: '#ffffff',
    padding: 15,
    marginTop: 16,
    marginLeft: 35,
    marginRight: 35,
    borderRadius: 25,
  },
  text: {
    color: '#ffffff',
  },
});

export default Mybutton;
