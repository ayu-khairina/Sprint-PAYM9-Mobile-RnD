import React, {useState, useEffect} from 'react';
import { Text, View, PermissionsAndroid, TouchableOpacity, TextInput } from 'react-native';
import Contacts from 'react-native-contacts';
import Modal from 'react-native-modal';

function addContact() {
  const [modalContact, setModalContact] = useState(false)
  const [searchContact, setSearchContact] = useState(null);
  const [modalAddPelanggan, setModalAddPelanggan] = useState(false)
  const [nama, setNama] = useState(null)
  const [handphone, setHandphone] = useState(null)
  const [note, setNote] = useState(null)
  const [list, setList] = useState([{nama: null, handphone:null, note: null}])

const contactPermission = async () => {
  await PermissionsAndroid.requestMultiple([
      PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
      PermissionsAndroid.PERMISSIONS.WRITE_CONTACTS
    ])
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
    } else {
        setModalContact(true)
      // Contacts.getAll((err, contacts) => {
      //   if (err === 'denied'){
      //     // error
      //   } else {
      //     console.log("dataa:", contacts);
      //     // contacts returned in Array
      //   }
      // })
    }
  })  
}

const openModalContact = () => {
  return (
    <View style={{flex: 1}}>
      <Modal 
        isVisible={modalContact} 
        style={{backgroundColor:"white", flex: 1, margin:0}} 
        animationIn="slideInUp" 
        animationOut="slideOutDown" 
        coverScreen={true}
        useNativeDriver={true}
      >
        <View style={{flex: 1}}>
          <View style={{flexDirection:"row", margin:10}}>
            <View >
              <TouchableOpacity onPress={()=> setModalContact(false)} style={{margin:0, backgroundColor:"red", height: 40}}>
                <Text style={{fontSize: 16, alignSelf:"center", color:"white", margin:5, marginHorizontal:16}}>{`<--`}</Text>
              </TouchableOpacity>
            </View>
            <View style={{flex: 2}}>
              <TextInput
                style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
                onChangeText={text => setSearchContact(text)}
                value={searchContact}
              />
            </View>
            <View>
              <TouchableOpacity onPress={()=> alert("search")} style={{margin:0, backgroundColor:"red", height: 40}}>
                <Text style={{fontSize: 16, alignSelf:"center", color:"white", margin:5}}>{`Search`}</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={{alignItems:"center"}} > 
            <TouchableOpacity style={{backgroundColor:"green"}} onPress={()=>setModalAddPelanggan(true) } >
              <View style={{flexDirection:"row", margin: 10}}>
                <Text style={{color:"white"}}>+ </Text>
                <Text style={{color:"white"}}>Tambah Pelanggan Baru</Text>
              </View>
            </TouchableOpacity>  
          </View>
        </View>

      </Modal>
    </View>
  )
}

const openModalAddPelanggan = () => {
  return (
    <View style={{flex: 1}}>
      <Modal 
        isVisible={modalAddPelanggan} 
        style={{backgroundColor:"white", flex: 1, margin:0}} 
        animationIn="slideInUp" 
        animationOut="slideOutDown" 
        coverScreen={true}
        useNativeDriver={true}
      >
        <View style={{flex: 1}}>
          <View>
            <View style={{flexDirection:"row", alignSelf:"space-between", margin:10}}>
              <Text style={{marginRight: 10}}>Nama</Text>
              <TextInput
              style={{ height: 40, borderColor: 'gray', borderWidth: 1, width:"80%" }}
              onChangeText={text => setNama(text)}
              value={nama} />
            </View>
            <View style={{flexDirection:"row", alignSelf:"space-between", margin:10}}>
              <Text style={{marginRight: 10}}>Handphone</Text>
              <TextInput
              style={{ height: 40, borderColor: 'gray', borderWidth: 1, width:"80%" }}
              onChangeText={text => setHandphone(text)}
              value={handphone} />
            </View>
            <View style={{flexDirection:"row", alignSelf:"space-between", margin:10}}>
              <Text style={{marginRight: 10}}>Note</Text>
              <TextInput
              style={{ height: 40, borderColor: 'gray', borderWidth: 1, width:"80%" }}
              onChangeText={text => setNote(text)}
              value={note} />
            </View>
            <View style={{flexDirection:"row", alignSelf:"space-between", margin:10}} >
              <TouchableOpacity onPress={()=> setModalAddPelanggan(false)} style={{backgroundColor:"red", borderRadius:10, marginRight: 16}}>
                <Text style={{color: "white", margin:16}}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={()=> savePelanggan()} style={{backgroundColor:"green", borderRadius:10, marginRight: 16}}>
                <Text style={{color: "white", margin:16}}>Save</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  )
}

const savePelanggan = () => {
  setList([{nama: nama, handphone: handphone, note: note}])
  setModalAddPelanggan(false)
  setModalContact(false)
  alert("success")
}

const button_add_contact = () => {
  return (
    <View style={{margin: 10, flex: 1}}>
      <TouchableOpacity onPress={() => contactPermission()} style={{backgroundColor:"green"}}>
        <Text style={{fontSize: 16, alignSelf:"center", color:"white", margin:16}}> + add contact</Text>
      </TouchableOpacity>
    </View>
  );
}

const listHutang = () => {
  return (
    <View style={{margin: 10}}>
      {
      nama === null && handphone === null && note === null?
        <Text>Data kosong</Text>
      :
        <View>
          <Text>{nama}</Text>
          <Text>{note}</Text>
        </View>
      }
    </View>
  );
}

const renderMain = () => {
  return(
  <View style={{flex: 1}}>
    {button_add_contact()}
    {listHutang()}
  </View>
  )
}

  return(
    <View style={{flex: 1}}>
      {renderMain()}
      {openModalContact()}
      {openModalAddPelanggan()}
    </View>
  )

}

export default addContact;
