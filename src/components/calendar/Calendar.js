import React, {useState, useEffect} from 'react';
import { Text, View, PermissionsAndroid, TouchableOpacity } from 'react-native';
import Contacts from 'react-native-contacts';

function addContact() {
  const [permission, setPermission] = useState(null)

const contactPermission = () => {
  PermissionsAndroid.request(
    PermissionsAndroid.PERMISSIONS.READ_CONTACTS,PermissionsAndroid.PERMISSIONS.WRITE_CONTACTS)
    .then((res) => {
      add_contact()
    })
    .catch((err)=> {
      alert(err)
    });
}

const add_contact = () => {
  const newPerson = {
    emailAddresses: [{
      label: "work",
      email: "mrniet@example.com",
    }],
    familyName: "Nietzsche",
    givenName: "Friedrich",
    phoneNumbers: [{
      label: "mobile",
      number: "0822098732883"
    }]
  }
  Contacts.addContact(newPerson, (err) => {
    if (err) {
      console.log("ini error:", err);
    }
  })
  // Contacts.getAll((err, contacts) => {
  //   if (err === 'denied'){
  //     // error
  //   } else {
  //     console.log("dataa:", contacts);
  //     // contacts returned in Array
  //   }
  // })
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
