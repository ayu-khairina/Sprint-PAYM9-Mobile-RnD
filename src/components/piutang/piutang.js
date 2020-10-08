import React, {useState, useEffect} from 'react';

import {View, Text, StyleSheet, TouchableOpacity, Button} from 'react-native';
import PiutangSearchBox from './PiutangSearchBox';
import PiutangList from './PiutangList';
import Contacts from 'react-native-contacts';
import Camera from '../camera/Camera';
function Piutang(props) {
  const [dataSearch, setDataSearch] = useState('');
  const [dataList, setDataList] = useState([]);
  let text;
  //FUNCTION
  function search(text) {
    setDataSearch(text);
    console.log(text, 'data text');


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


  function onClickList (item){
    setDataSearch(item)
    setDataList([])
  }

  function clearInput() {
    text = ''

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


  const addNewContact = () => {
      let newPerson = {
        phoneNumbers: [{
          label: "mobile",
          number: "",
        }],
      };

      Contacts.openContactForm(newPerson, (err) => {
        if (err) console.warn(err) ;
        // form is open
      });
  }


  
  const buttonCamera = () => {
    return(
    <Button
    onPress={() =>props.navigation.navigate('Camera')}
    title="Unggah Foto / Gambar"
    color="red"
  />)
  }
  

  return (
    <>
      <View>
        {header()}

        <View style={{flexDirection:"row", marginTop:10}}>
          <View style={{flex: 2}}>
            <PiutangSearchBox
              placeholder="Masukan Nama atau Nomer Telepon"
              value={dataSearch}
              onChangeText={text => search(text)}
              clearInput={() => clearInput()}
              
            />
            <PiutangList data={dataList.contacts} onClickList={onClickList}/>
          </View>
          <TouchableOpacity onPress={()=> addNewContact()} style={{backgroundColor:"red", width:"10%", marginRight: 10, justifyContent:"center", borderRadius: 10}}>
            <Text style={{fontSize: 25, color:"white", alignSelf:"center"}}>+</Text>
          </TouchableOpacity>
        </View>
        {buttonCamera()}
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
