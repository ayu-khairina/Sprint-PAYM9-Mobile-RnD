import React, {useState, useEffect} from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { Text, View, Button, TextInput } from 'react-native';
import moment from "moment";
import {Calendar, CalendarList, Agenda} from 'react-native-calendars';
import Modal from 'react-native-modal';

function Calendars () {
    const [section, setSection] = useState("today")
    const [dataHutang, setDataHutang] = useState([
        {id: 1, nama: "udin", handphone: "0898987938946", hutang:1243243543, tgl_penagihan: "10/06/2020"}, 
        {id: 2, nama: "Sumarni", handphone: "0897787368", hutang:2000000, tgl_penagihan: "10/07/2020"},
        {id: 3, nama: "Tejo", handphone: "08376872837", hutang: 89000, tgl_penagihan: "10/10/2020"},
        {id: 4, nama: "Slamet", handphone: "083789798999", hutang: 200000, tgl_penagihan: "10/06/2020"}
    ])
  const [openModalCalendar, setOpenModalCalendar] = useState(false)  
  const [openModalBayarHutang, setOpenModalBayarHutang] = useState(false)  
  const [selected, setSelected] = useState(moment(new Date()).format('YYYY-MM-DD'));
  const [selectUser, setSelectUser] = useState([])
  const [jumlahHutang, setJumlahHutang] = useState(null)

    const section_tab = (data) => {
        setSection(data)
    }

    const renderTab = () => {
        return(
            <View>
                <View style={{flexDirection:"row"}}>
                    <View style={{flex:1}}>
                        <TouchableOpacity onPress={()=> section_tab("previous_day")} style={{backgroundColor: section === "previous_day"? "#841584" : "white"}}>
                            <Text style={{alignSelf:"center", fontSize:16, color:section === "previous_day"? "white" : "black", margin: 10}}>Sudah Lewat</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{flex:1}}>
                        <TouchableOpacity onPress={()=> section_tab("today")} style={{backgroundColor:section === "today"? "#841584" : "white"}}>
                            <Text style={{alignSelf:"center", fontSize:16, color:section === "today"? "white" : "black", margin: 10}}>Hari Ini</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{flex:1}}>
                        <TouchableOpacity onPress={()=> section_tab("next_day")} style={{backgroundColor:section === "next_day"? "#841584" : "white"}}>
                            <Text style={{alignSelf:"center", fontSize:16, color:section === "next_day"? "white" : "black", margin: 10}}>Akan Datang</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        )
    }

    const modalCalendar = (item) => {
      setOpenModalCalendar(true)
      setSelectUser(item)
    }

    const modalBayarHutang = (item) => {
      setOpenModalBayarHutang(true)
      setSelectUser(item)
    }

    const onDayPress = (day) => {
      setSelected(day.dateString);
      const index = dataHutang.findIndex(obj => obj.id === selectUser.id);
      // console.log("index:", index);
      // 1. Make a shallow copy of the items
      let items = [...dataHutang];
      // 2. Make a shallow copy of the item you want to mutate
      let item = {...dataHutang[index]};
      // 3. Replace the property you're intested in
      item.tgl_penagihan = moment(day.dateString).format("MM/DD/YYYY");
      // // 4. Put it back into our array. N.B. we *are* mutating the array here, but that's why we made a copy first
      items[index] = item;
      // 5. Set the state to our new copy
      // const newData = [...dataHutang, dataHutang[index].tgl_penagihan = moment(day.dateString).format("MM/DD/YYYY")] 
      setDataHutang(items)
      setOpenModalCalendar(false)
      setSelectUser([])
      // alert(day.dateString)
    };

    const openCalendar = () => {
      return(
        <View style={{flex: 1}}>
          <Modal 
            isVisible={openModalCalendar} 
            style={{backgroundColor:"white", flex: 1, margin:0}} 
            animationIn="slideInUp" 
            animationOut="slideOutDown" 
            coverScreen={true}
            useNativeDriver={true}
          >
            <View style={{flex: 1}}>
              {/* HEADER Kalender*/}
              <View style={styles.header}>
                <View style={{flexDirection: 'row', margin: 10}}>
                  <View>
                    <TouchableOpacity
                      onPress={() => setOpenModalCalendar(false)}
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
                    <Text style={styles.fontHeader}>Atur Tanggal Penagihan</Text>
                  </View>
                </View>
              </View>
              
              {/* Kalender */}
              <Calendar
                // testID={testIDs.calendars.FIRST}
                current={moment(new Date()).format('YYYY-MM-DD')}
                style={styles.calendar}
                // hideExtraDays
                onDayPress={onDayPress}
                markedDates={{
                  [selected]: {
                    selected: true,
                    // disableTouchEvent: true,
                    selectedColor: 'orange',
                    selectedTextColor: 'red',
                  },
                }}
              />
            </View>
          </Modal>
        </View>
      )
    }

    const berikan = () => {
      const index = dataHutang.findIndex(obj => obj.id === selectUser.id);
      // console.log("index:", index);
      // 1. Make a shallow copy of the items
      let items = [...dataHutang];
      // 2. Make a shallow copy of the item you want to mutate
      let item = {...dataHutang[index]};
      // 3. Replace the property you're intested in
      item.hutang = (parseInt(item.hutang) + parseInt(jumlahHutang));
      // // 4. Put it back into our array. N.B. we *are* mutating the array here, but that's why we made a copy first
      items[index] = item;
      // 5. Set the state to our new copy
      // const newData = [...dataHutang, dataHutang[index].tgl_penagihan = moment(day.dateString).format("MM/DD/YYYY")] 
      setDataHutang(items)
      setOpenModalBayarHutang(false)
      setJumlahHutang(null)
      setSelectUser([])
      // console.log(selectUser.hutang)
    }

    const terima = () => {
      const index = dataHutang.findIndex(obj => obj.id === selectUser.id);
      // console.log("index:", index);
      // 1. Make a shallow copy of the items
      let items = [...dataHutang];
      // 2. Make a shallow copy of the item you want to mutate
      let item = {...dataHutang[index]};
      // 3. Replace the property you're intested in
      item.hutang = (item.hutang - jumlahHutang);
      // // 4. Put it back into our array. N.B. we *are* mutating the array here, but that's why we made a copy first
      items[index] = item;
      // 5. Set the state to our new copy
      // const newData = [...dataHutang, dataHutang[index].tgl_penagihan = moment(day.dateString).format("MM/DD/YYYY")] 
      setDataHutang(items)
      setOpenModalBayarHutang(false)
      setJumlahHutang(null)
      setSelectUser([])
      // console.log(selectUser.hutang)
    }

    const openBayarHutang = () => {
      return(
        <View style={{flex: 1}}>
          <Modal 
            isVisible={openModalBayarHutang} 
            style={{backgroundColor:"white", flex: 1, margin:0}} 
            animationIn="slideInUp" 
            animationOut="slideOutDown" 
            coverScreen={true}
            useNativeDriver={true}
          >
            <View style={{flex: 1}}>
              {/* HEADER Kalender*/}
              <View style={styles.header}>
                <View style={{flexDirection: 'row', margin: 10}}>
                  <View>
                    <TouchableOpacity
                      onPress={() => setOpenModalBayarHutang(false)}
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
                    <Text style={styles.fontHeader}>Jumlah diberikan/diterima</Text>
                  </View>
                </View>
              </View>

              {/* FORM BAYAR HUTANG */}
              <View style={{flexDirection:"row", alignSelf:"space-between", margin:10}}>
                <Text style={{marginRight: 10}}>Rp.</Text>
                  <TextInput
                  style={{ height: 40, borderColor: 'gray', borderWidth: 1, width:"80%" }}
                  keyboardType = 'numeric'
                  onChangeText={text => setJumlahHutang(text)}
                  value={jumlahHutang} />
              </View>
              <View style={{ flexDirection:"row", justifyContent:"flex-end", margin:10}}>
                <Button
                  onPress={()=>berikan()}
                  title="Berikan"
                  color="red"
                  accessibilityLabel="Learn more about this purple button"
                />
                <Button
                  onPress={()=>terima()}
                  title="Terima"
                  color="green"
                  accessibilityLabel="Learn more about this purple button"
                />
              </View>
            </View>
          </Modal>
        </View>
      )
    }

    const renderData = () => {
        return (
            <View style={{flex: 1}}>
                { 
                section === "previous_day" ?
                    dataHutang.map((item, index)=> {
                        if (moment(item.tgl_penagihan).format('MM/DD/YYYY') < moment(new Date()).format('MM/DD/YYYY') && item.hutang > 0) {
                            return(
                                <TouchableOpacity onPress={()=> modalCalendar(item)}>
                                    <View style={{flexDirection:"row", justifyContent:"space-between", marginHorizontal: 10, marginTop: 10}}>
                                        <View style={{flexDirection:"row"}}>
                                            <View style={{backgroundColor:"#841584", borderRadius:30, marginRight: 10}}>
                                                <Text style={{fontSize: 18, color:"white", margin:10, marginHorizontal:15 }}>{item.nama.substring(0, 1).toUpperCase()}</Text>
                                            </View>
                                            <Text style={{fontSize: 18, alignSelf:"center"}}>{item.nama}</Text>
                                        </View>
                                        <Text style={{fontSize: 18, alignSelf:"center"}}>Rp. {item.hutang}</Text>
                                    </View>
                                </TouchableOpacity>
                            )
                        } 
                        // else {
                        //     return (
                        //     <Text style={{alignItems:"center", alignSelf:"center", fontSize:18, marginTop:"40%"}}>Data Kosong</Text>
                        //     )
                        // }
                    })
                : section === "today" ?
                    dataHutang.map((item, index)=> {
                        if (moment(item.tgl_penagihan).format('MM/DD/YYYY') === moment(new Date()).format('MM/DD/YYYY') && item.hutang > 0) {
                            return(
                                <TouchableOpacity onPress={()=> modalBayarHutang(item)}>
                                    <View style={{flexDirection:"row", justifyContent:"space-between", marginHorizontal: 10, marginTop: 10}}>
                                        <View style={{flexDirection:"row"}}>
                                            <View style={{backgroundColor:"#841584", borderRadius:30, marginRight: 10}}>
                                                <Text style={{fontSize: 18, color:"white", margin:10, marginHorizontal:15 }}>{item.nama.substring(0, 1).toUpperCase()}</Text>
                                            </View>
                                            <Text style={{fontSize: 18, alignSelf:"center"}}>{item.nama}</Text>
                                        </View>
                                        <Text style={{fontSize: 18, alignSelf:"center"}}>Rp. {item.hutang}</Text>
                                    </View>
                                </TouchableOpacity>
                            )
                        } 
                        // else {
                        //     return (
                        //     <Text style={{alignItems:"center", alignSelf:"center", fontSize:18, marginTop:"40%"}}>Data Kosong</Text>
                        //     )
                        // }
                    })
                : 
                    dataHutang.map((item, index)=> {
                        if (moment(item.tgl_penagihan).format('MM/DD/YYYY') > moment(new Date()).format('MM/DD/YYYY') && item.hutang > 0) {
                            return(
                                <TouchableOpacity onPress={()=> modalBayarHutang(item)}>
                                    <View style={{flexDirection:"row", justifyContent:"space-between", marginHorizontal: 10, marginTop: 10}}>
                                        <View style={{flexDirection:"row"}}>
                                            <View style={{backgroundColor:"#841584", borderRadius:30, marginRight: 10}}>
                                                <Text style={{fontSize: 18, color:"white", margin:10, marginHorizontal:15 }}>{item.nama.substring(0, 1).toUpperCase()}</Text>
                                            </View>
                                            <Text style={{fontSize: 18, alignSelf:"center"}}>{item.nama}</Text>
                                        </View>
                                        <Text style={{fontSize: 18, alignSelf:"center"}}>Rp. {item.hutang}</Text>
                                    </View>
                                </TouchableOpacity>
                            )
                        } 
                        // else {
                        //     return(
                        //     <Text style={{alignItems:"center", alignSelf:"center", fontSize:18, marginTop:"40%"}}>Data Kosong</Text>
                        //     )
                        // }
                    })
                }
            </View>
        )
    }

    const renderMain = () => {
    return (
        <View style={{flex: 1}}>
            {renderTab()}
            {renderData()}
            {openCalendar()}
            {openBayarHutang()}
        </View>
    );
    }

    console.log("data user:", selectUser);
    console.log("data hutang:", dataHutang);
    return(
        <View style={{flex: 1}}>
            {renderMain()}
        </View>
    )

}
export default Calendars;

const styles = StyleSheet.create({
  calendar: {
    marginBottom: 10,
  },
  text: {
    textAlign: 'center',
    padding: 10,
    backgroundColor: 'lightgrey',
    fontSize: 16,
  },
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