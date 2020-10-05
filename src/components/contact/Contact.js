import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  PermissionsAndroid,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  ScrollView
} from 'react-native';
import Contacts from 'react-native-contacts';

function Contact() {
  const [dataContacts, setDataContacts] = useState(null);
  const [dataSearch, setDataSearch] = useState(null);
  const [dataContactList, setDataContactList] = useState(null);
  useEffect(() => {
    contactPermission();
  }, []);
  //FUNCTION
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
      } else {
        setDataContacts(contacts);
        setDataContactList(contacts);
      }
    });
  };

  // COMPONENT
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

  const buttonSearch = () => {
    return (
      <TouchableOpacity>
        <Text>Search</Text>
      </TouchableOpacity>
    );
  };

  const textSearch = () => {
    return (
      <TextInput
        style={{height: 50, borderColor: 'gray', borderWidth: 1}}
        onChangeText={text => setDataSearch(text)}
        value={dataSearch}
        placeholder="Cari Pelanggan"
        placeholderStyle={{
          fontFamily: 'Montserrat-Regular',
          fontSize: 100,
        }}
        fontSize={20}
      />
    );
  };

  const items = () =>
    dataContacts
      .filter(data => {
        if (dataSearch == null) {
          return data;
        } else if (
          data.displayName.toLowerCase().includes(dataSearch.toLowerCase())
        ) {
          return data;
        }
      })
      .map(data => {
        return (
             <View style={styles.contactList}>
            <View style={styles.displayName}>
              <Text style={styles.fontContact}> {data.displayName} </Text>
            </View>

            {data.phoneNumbers.map(item => (
              <Text style={styles.fontNumber}>{item.number}</Text>
            ))}
          </View>
        );
      });

  return dataContacts ? (
    <>
      <View style={styles.header}>
        <Text style={styles.fontHeader}>List Contact</Text>
      </View>
      <View>{textSearch()}</View>
      <ScrollView>
      <View style={styles.container}>{items()}</View>
      </ScrollView>
      
    </>
  ) : null;
}

export default Contact;
const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  header: {
    backgroundColor: '#f0444c',
    height: 56,
    justifyContent: 'center',
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
  fontHeader: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 20,
    color: '#ffffff',
    textAlign: 'center',
  },
  fontContact: {
    fontFamily: 'Montserrat-Regular',
    fontSize: 20,
  },
  fontNumber: {
    fontFamily: 'Montserrat-Light',
    fontSize: 15,
  },
  textInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
  },
});
