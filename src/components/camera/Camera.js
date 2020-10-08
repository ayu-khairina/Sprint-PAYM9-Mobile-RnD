import React, {Component} from 'react';
import {RNCamera} from 'react-native-camera';
import {TouchableOpacity, Text, View, StyleSheet, Alert} from 'react-native';
function Camera () {
  
    return (
     <>
     <View>
     <TouchableOpacity>
         <Text>Choose File</Text>
     </TouchableOpacity>
     </View>
     <View>
     <TouchableOpacity>
         <Text>Launch Camera</Text>
     </TouchableOpacity>
     </View>
     <View>
     <TouchableOpacity>
         <Text>Get Photo from Library</Text>
     </TouchableOpacity>
     </View>
     
     </>
    )
}
export default Camera
const styles = StyleSheet.create({
  btnAlignment: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginBottom: 20,
  },
});
