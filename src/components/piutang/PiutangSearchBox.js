import React, { Component } from 'react';
import {View, TextInput, StyleSheet, TouchableOpacity, Text } from 'react-native';

const styles = StyleSheet.create({
  AutoCompleteBox: {
    flexDirection: 'row',
    marginHorizontal: 20,
    padding: 10,
    alignSelf: 'stretch',
    backgroundColor: '#FFF',
    borderColor: '#BBB',
    borderWidth: 2,
    borderRadius: 3,
    elevation: 3,
    marginTop: 5
  },
  AutoCompleteInput: {
    flexGrow: 1
  },
  AutoCompleteClose: {
    padding: 5,
    color: '#999',
    fontWeight: '900',
    elevation: 5,
    fontSize: 18
  }
});

function PiutangSearchBox (props) {
  
    return (
        <>
        <View style={styles.AutoCompleteBox}>
        <TextInput
        {...props}
        style={styles.AutoCompleteInput}
        underlineColorAndroid="#FFF"
      />
        <TouchableOpacity onPress={() => props.clearInput()}>
        <Text style={styles.AutoCompleteClose}>X</Text>
        </TouchableOpacity>
        </View>
       
        </>
      
    );
}

export default PiutangSearchBox;