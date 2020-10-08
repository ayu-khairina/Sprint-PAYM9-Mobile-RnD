import React, { Component } from 'react';

import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';

const styles = StyleSheet.create({
  AutoCompleteResultList: {
    marginHorizontal: 22,
    borderWidth: 2,
    borderColor: '#aaa',
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    elevation: 1
  },
  AutoCompleteResultItem: {
    padding: 10,
    marginHorizontal: 10,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#aaa'
  },
  titleText: {
    fontWeight: '600',
    color: '#333',
    marginTop: 5,
    marginBottom: 3,
    fontSize: 16
  },
  text: {
    marginLeft: 2,
    color: '#999'
  },
  contactList: {
    padding: 5,
    marginBottom: 3,
    borderBottomColor: '#D3D0CB',
    borderBottomWidth: 1,
  },
  displayName: {
    marginBottom: 5,
  },
  fontContact: {
    fontFamily: 'Montserrat-Regular',
    fontSize: 20,
  },
  fontNumber: {
    fontFamily: 'Montserrat-Light',
    fontSize: 15,
  }
});

function PiutangList (props) {
    
  const renderItem = (item) => {

    return (
        <View >
            <View style={styles.contactList}>
              <TouchableOpacity onPress={()=>console.log(item, 'item log')
              }
               >
              <View style={styles.displayName}>
                <Text style={styles.fontContact}> {item.item.displayName} </Text>
              </View>
              </TouchableOpacity>
            
              {item.item.phoneNumbers.map((data, index) => (
                <View key={index}>
                <TouchableOpacity onPress={()=>props.onClickList(item.item.displayName)
                }>
<Text style={styles.fontNumber}>{data.number}</Text>
                </TouchableOpacity>
                </View>
              ))}
            </View>
        </View>
    );
  }
 
    return (
      <View>
        <FlatList
          data={props.data}
          contentContainerStyle={styles.AutoCompleteResultList}
          renderItem={renderItem}
        />
      </View>
    );
}

export default PiutangList
