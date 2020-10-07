import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import PiutangSearchBox from './PiutangSearchBox';
import PiutangList from './PiutangList';
import Contacts from 'react-native-contacts';
import {tsPropertySignature} from '@babel/types';
function Piutang(props) {
  const [dataSearch, setDataSearch] = useState('');
  const [dataList, setDataList] = useState([]);
  //FUNCTION
  async function search(text) {
    await setDataSearch(text);
    console.log(dataSearch, 'data search');

    const phoneNumberRegex = /\b[\+]?[(]?[0-9]{2,6}[)]?[-\s\.]?[-\s\/\.0-9]{3,15}\b/m;
    if (text === '' || text === null) {
      setDataList([]);
    } else if (phoneNumberRegex.test(text)) {
      Contacts.getContactsByPhoneNumber(text, (err, contacts) => {
        setDataList(contacts);
      });
    } else {
      Contacts.getContactsMatchingString(text, (err, contacts) => {
        setDataList({contacts});
      });
    }
  }
  function clearInput() {
    setDataSearch('');
  }
  //COMPONENT
  const header = () => {
    return (
      <View style={styles.header}>
        <View style={{flexDirection: 'row', margin: 10}}>
          <View>
            <TouchableOpacity
              onPress={() => props.onClose()}
              style={{margin: 0, height: 40}}>
              <Text
                style={{
                  fontSize: 16,
                  alignSelf: 'center',
                  color: 'white',
                  margin: 5,
                  marginHorizontal: 16,
                }}>{`<`}</Text>
            </TouchableOpacity>
          </View>
          <View>
            <Text style={styles.fontHeader}>Tambah Utang</Text>
          </View>
        </View>
      </View>
    );
  };
  return (
    <>
      <View>
        {header()}
        <PiutangSearchBox
          placeholder="Masukan Nama atau Nomer Telepon"
          value={dataSearch}
          onChangeText={text => search(text)}
          clearInput={() => clearInput()}
        />
        <PiutangList data={dataList.contacts} />
      </View>
    </>
  );
}
export default Piutang;

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#f0444c',
    height: 56,
    justifyContent: 'center',
  },
  fontHeader: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 20,
    color: '#ffffff',
    textAlign: 'center',
  },
});
