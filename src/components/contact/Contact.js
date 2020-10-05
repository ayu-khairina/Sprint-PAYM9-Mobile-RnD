import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  PermissionsAndroid,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import Contacts from 'react-native-contacts';

function Contact() {
  const [dataContacts, setDataContacts] = useState(null);

  useEffect(() => {
    contactPermission();
  }, []);

  const contactPermission = () => {
    PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.READ_CONTACTS)
      .then(res => {
        read_contact();
      })
      .catch(err => {
        alert(err);
      });
  };

  const read_contact = () => {
    Contacts.getAll((err, contacts) => {
      if (err === 'denied') {
        console.log(err, 'error');
      } else {
        console.log('dataa:', contacts);
        setDataContacts(contacts);
      }
    });
  };

  const button_add_contact = () => {
    return (
      <View>
        <TouchableOpacity onPress={() => contactPermission()}>
          <Text>add contact</Text>
        </TouchableOpacity>
      </View>
    );
  };

  const contactList = () => {
    return (
      <>
        <View>
          {dataContacts.map(item => (
            <View style={styles.contactList}>
              <View style={styles.displayName}>
              <Text style={styles.fontContact}> {item.displayName} </Text>
                </View>
             

              {item.phoneNumbers.map(item => (
                <Text style={styles.fontNumber}>{item.number}</Text>
              ))}
            </View>
          ))}
        </View>
      </>
    );
  };

  console.log(dataContacts, 'dataContact');
  return dataContacts ? (
    <>
      <View style={styles.header}>
      <Text style={styles.fontHeader}>List Contact</Text>
      </View>
      
      <View style={styles.container}>{contactList()}</View>
    </>
  ) : null;
}

export default Contact;
const styles = StyleSheet.create({
  container: {
    padding: 5,
  },
  header : {
    backgroundColor: '#f0444c',
    height: 56,
    justifyContent:'center'
  },
  contactList: {
    padding: 5,
    marginBottom: 3,
    borderBottomColor: '#D3D0CB',
    borderBottomWidth: 1,
  },
  displayName:{
    marginBottom: 5
  },
  fontHeader: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 20,
    color: '#ffffff',
    textAlign: 'center',
  },
  fontContact:{
    fontFamily: 'Montserrat-Regular',
    fontSize: 20
  },
  fontNumber:{
    fontFamily: 'Montserrat-Light',
    fontSize: 15
  }
});
