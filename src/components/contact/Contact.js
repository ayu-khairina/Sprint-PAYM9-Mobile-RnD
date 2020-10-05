import React, {useState, useEffect} from 'react';
import { Text, View, PermissionsAndroid, TouchableOpacity } from 'react-native';
import Contacts from 'react-native-contacts';
function Contact() {
  const [permission, setPermission] = useState(null)
const contactPermission = () => {
  PermissionsAndroid.request(
    PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
    {
      'title': 'Contacts',
      'message': 'This app would like to view your contacts.',
      'buttonPositive': 'Please accept bare mortal'
    }
  ).then(() => {
    Contacts.getAll((err, contacts) => {
      if (err === 'denied'){
        // error
      } else {
        // contacts returned in Array
      }
    })
  });
}
const test = () => {
  alert("test")
}
const add_contact = () => {
  return (
    <View>
      <TouchableOpacity onPress={() => contactPermission()}>
        <Text>add contact</Text>
      </TouchableOpacity>
    </View>
  );
}
  return(
    <View>
      {add_contact()}
    </View>
  )
}
export default Contact;