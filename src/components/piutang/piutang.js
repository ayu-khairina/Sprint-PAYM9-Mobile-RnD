import React, {useState, useEffect} from 'react';

import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Button,
  TextInput,
  Image,
  ScrollView,
} from 'react-native';
import PiutangSearchBox from './PiutangSearchBox';
import PiutangList from './PiutangList';
import Contacts from 'react-native-contacts';
import ImagePicker from 'react-native-image-picker';
function Piutang(props) {
  const [dataSearch, setDataSearch] = useState('');
  const [dataList, setDataList] = useState([]);
  const [dataImage, setDataImage] = useState();
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

  function onClickList(item) {
    setDataSearch(item);
    setDataList([]);
  }

  function clearInput() {
    text = '';

    setDataSearch('');
  }

  const clickCamera = () => {
    let options = {
      title: 'Select Image',
      customButtons: [
        {name: 'customOptionKey', title: 'Choose Photo from Custom Option'},
      ],
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
      maxWidth: 800,
      quality: 1
      // maxHeight: 600
    };

    ImagePicker.showImagePicker(options, response => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        const source = {uri: response.uri};
        setDataImage({
          filePath: response,
          fileData: response.data,
          fileUri: response.uri,
        });
      }
    });
  };

  const deleteImage = () => {
    setDataImage()
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

  const JumlahHutang = () => {
    return (
      <>
        <View style={styles.smallContainer}>
          <View>
            <Text style={styles.fontTitle}>*Jumlah Utang</Text>
          </View>
          <View>
            <TextInput
              style={{height: 40, borderColor: 'gray', borderBottomWidth: 1}}
            />
          </View>
        </View>
      </>
    );
  };

  const TanggalHutang = () => {
    return (
      <>
        <View style={styles.smallContainer}>
          <View>
            <Text style={styles.fontTitle}>*Tanggal Utang</Text>
          </View>
          <View>
            <TextInput
              style={{height: 40, borderColor: 'gray', borderBottomWidth: 1}}
            />
          </View>
        </View>
      </>
    );
  };

  const TanggalJatuhTempo = () => {
    return (
      <>
        <View style={styles.smallContainer}>
          <View>
            <Text style={styles.fontTitle}>*Tanggal Jatuh Tempo</Text>
          </View>
          <View>
            <TextInput
              style={{height: 40, borderColor: 'gray', borderBottomWidth: 1}}
            />
          </View>
        </View>
      </>
    );
  };

  const Catatan = () => {
    return (
      <>
        <View style={styles.smallContainer}>
          <View>
            <Text style={styles.fontTitle}>*Catatan</Text>
          </View>
          <View>
            <TextInput
              style={{height: 40, borderColor: 'gray', borderBottomWidth: 1}}
            />
          </View>
        </View>
      </>
    );
  };

  const UnggahImage = () => {
    return (
      <>
        <View style={styles.smallContainer}>
          <View>
            <Text style={styles.fontTitle}>*Unggah Foto/Gambar Transaksi</Text>
          </View>
          {dataImage ? (
            <View style={styles.smallContainer}>
              <View style={styles.smallContainerImage}>
              <Image source={{uri: dataImage.fileUri}} style={styles.images} />
              </View>
              <View style={styles.smallContainer}>
          <Text>File Size :  {dataImage.filePath.fileSize} byte, {dataImage.filePath.fileSize / 1024} KB, {dataImage.filePath.fileSize / 1048576} MB </Text>
          <Text> w x h : {dataImage.filePath.width} x {dataImage.filePath.height} </Text>
          <Text> path : {dataImage.filePath.path} </Text>
          <Text>type : {dataImage.filePath.type}</Text>
          <Text>filename : {dataImage.filePath.filename} </Text>
                </View>
              <View style={{flexDirection: 'row', marginTop: 5}}>
                <View style={{marginRight: 20}}>
                  <Button
                    onPress={() => deleteImage()}
                    title="Hapus"
                    color="red"
                  />
                </View>
                <View>
                  <Button
                    onPress={() => clickCamera()}
                    title="Ulangi Foto"
                    color="red"
                  />
                </View>
              </View>
            </View>
          ) : (
            <View style={styles.smallContainer}>
              <Button
                onPress={() => clickCamera()}
                title="Unggah Foto/Gambar"
                color="red"
              />
            </View>
          )}
        </View>
      </>
    );
  };

  const addNewContact = () => {
    let newPerson = {
      phoneNumbers: [
        {
          label: 'mobile',
          number: '',
        },
      ],
    };

    Contacts.openContactForm(newPerson, err => {
      if (err) console.warn(err);
      // form is open
    });
  };

  console.log(dataImage, 'dataImage');

  return (
    <>
      <ScrollView>
        <View>
          {header()}

          <View style={{flexDirection: 'row', marginTop: 10}}>
            <View style={{flex: 2}}>
              <View style={styles.smallContainer}>
                <Text style={styles.fontTitle}>*Kontak</Text>
              </View>
              <PiutangSearchBox
                placeholder="Masukan Nama atau Nomer Telepon"
                value={dataSearch}
                onChangeText={text => search(text)}
                clearInput={() => clearInput()}
              />
              <PiutangList data={dataList.contacts} onClickList={onClickList} />
            </View>

            <TouchableOpacity
              onPress={() => addNewContact()}
              style={{
                backgroundColor: 'red',
                width: '10%',
                marginRight: 10,
                justifyContent: 'center',
                borderRadius: 10,
              }}>
              <Text style={{fontSize: 25, color: 'white', alignSelf: 'center'}}>
                +
              </Text>
            </TouchableOpacity>
          </View>
          {JumlahHutang()}
          {TanggalHutang()}
          {TanggalJatuhTempo()}
          {Catatan()}
          {UnggahImage()}
        </View>
      </ScrollView>
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
  fontTitle: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 15,
  },
  smallContainer: {
    padding: 10,
  },
  smallContainerImage: {
    flex: 1, alignItems: "center", justifyContent: "center",
    width: 300,
    height: 300,
    backgroundColor: 'white'
  },
  images: {
    width: 300,
    height: 300,
    borderColor: 'black',
    borderWidth: 1,
    marginHorizontal: 3,
    backgroundColor: 'white',
    aspectRatio: 2/3
  },
});
