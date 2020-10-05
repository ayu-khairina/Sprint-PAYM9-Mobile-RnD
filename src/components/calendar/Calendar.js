import React, {useState, useEffect} from 'react';
import { Text, View, PermissionsAndroid, TouchableOpacity } from 'react-native';
import Contacts from 'react-native-contacts';

function addContact() {
  const [permission, setPermission] = useState(null)

const contactPermission = () => {
  PermissionsAndroid.request(
    PermissionsAndroid.PERMISSIONS.READ_CONTACTS)
    .then((res) => {
      console.log(res);
      
      read_contact()
    })
    .catch((err)=> {
      alert(err)
    });
}

const read_contact = () => {
  Contacts.getAll((err, contacts) => {
    if (err === 'denied'){
      console.log(err, 'error');
      
    } else {
      console.log("dataa:", contacts);
      // contacts returned in Array
    }
  })
}

const button_add_contact = () => {
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
      {button_add_contact()}
    </View>
  )

}

export default addContact;
