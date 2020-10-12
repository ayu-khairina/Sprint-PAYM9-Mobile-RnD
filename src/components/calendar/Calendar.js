import React, {useState, useEffect, useRef, useCallback,} from 'react';
import { TouchableOpacity, StyleSheet, Text, View, Button, TextInput, Linking, Image } from 'react-native';
import moment from "moment";
import {Calendar, CalendarList, Agenda} from 'react-native-calendars';
import Modal from 'react-native-modal';
import Piutang from '../piutang/piutang'
import htmlToImage from 'html-to-image';
import ViewShot from "react-native-view-shot";
import Share from 'react-native-share';
import RNFetchBlob from 'rn-fetch-blob'


function Calendars () {
  const full = useRef();
  const [preview, setPreview] = useState(null);
  const [itemsCount, setItemsCount] = useState(10);
  const [refreshing, setRefreshing] = useState(false);
    // const cardRef = useRef();
    const [section, setSection] = useState("today")
    const [dataHutang, setDataHutang] = useState([
        {id: 1, nama: "udin", handphone: "0898987938946", hutang:1243243543, tgl_penagihan: "10/06/2020"}, 
        {id: 2, nama: "Sumarni", handphone: "0897787368", hutang:2000000, tgl_penagihan: "10/07/2020"},
        {id: 3, nama: "Tejo", handphone: "08376872837", hutang: 89000, tgl_penagihan: "10/12/2020"},
        {id: 4, nama: "Slamet", handphone: "083789798999", hutang: 200000, tgl_penagihan: "10/15/2020"}
    ])
  const [openModalCalendar, setOpenModalCalendar] = useState(false)  
  const [openModalAllCalendar, setOpenModalAllCalendar] = useState(false)  
  const [openModalBayarHutang, setOpenModalBayarHutang] = useState(false)  
  const [selected, setSelected] = useState(moment(new Date()).format('YYYY-MM-DD'));
  const [selectUser, setSelectUser] = useState([])
  const [jumlahHutang, setJumlahHutang] = useState(null)
  const [marked, setMarked] = useState({tgl_penagihan: "10-15-2020", total: 12345772})


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

      console.log("test: ", items);
      for (var i = 0; i < dataHutang.length; i++){
        // look for the entry with a matching `code` value
        if (dataHutang[i].tgl_penagihan == day.dateString){
           // we found it
          // obj[i].name is the matched result
        }
      }
      console.log("data day: ", index);
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

    const sendSMS = async () => {
      // alert("SMS")
      const shareOptions = {
        title: '',
        message: 'some message',
        social: Share.Social.SMS,
        recipient: "0899999999"
      };
      try {
        const ShareResponse = await Share.shareSingle(shareOptions);
        setResult(JSON.stringify(ShareResponse, null, 2));
      } catch (error) {
        // console.log('Error =>', error);
        setResult('error: '.concat(getErrorString(error)));
      }
    }

    const renderViweShoot = () => {
      return(
        <ViewShot
        // style={styles.container}
        ref={full}
        options={{format: 'jpg', quality: 0.9}}>
        <View style={{backgroundColor:"grey"}}>
          <Text style={{alignSelf:"center", marginVertical:20, fontSize:25, color:"white"}}>Bayar hutang woiiiii</Text>
        </View>
        </ViewShot>
      )
    }

    
    const sendWhatsapp = async () => {
      full.current.capture()
      .then(uri => {
          const shareOptions = {
            title: 'Share via',
            message: 'some message',
            url: uri,
            social: Share.Social.WHATSAPP,
            whatsAppNumber: "+6282288360192"  // country code + phone number
          }
          // console.log("in");
           Share.shareSingle(shareOptions);
      })
    
      // RNFetchBlob.fetch('GET', `https://www.gotravelly.com/blog/wp-content/uploads/2019/10/Gunung-Fuji-Jepang-1024x640.jpg`)
      // .then(resp => {
      //   console.log('response : ', resp);
      //   console.log(resp.data);
      //   const base64image = resp.data;
      //   // share(base64image);
      //   const shareOptions = {
      //     title: 'Share via',
      //     message: 'some message',
      //     backgroundImage: 'http://urlto.png',
      //     url: `data:image/png;base64, ${base64image}`,
      //     social: Share.Social.WHATSAPP,
      //     whatsAppNumber: "9199999999",  // country code + phone number
      //     filename: 'test' , // only for base64 file in Android
      //   }
      //    Share.shareSingle(shareOptions);
      // })
      // .catch(err => errorHandler(err));
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
              <View style={{marginTop: 20}}>
                {renderViweShoot()}
              </View>
              {/* send whatsapp */}
              <View style={{flexDirection:"row", alignSelf:"space-between", margin:10}}>
              <Button
                  onPress={()=>sendWhatsapp()}
                  title="whatsapp"
                  color="red"
                  accessibilityLabel="Learn more about this purple button"
                />
                <Button
                  onPress={()=>sendSMS()}
                  title="SMS"
                  color="green"
                  accessibilityLabel="Learn more about this purple button"
                />
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
                    })
                }
            </View>
        )
    }

    // useEffect(() => {
    //   const kalendarMark = dataHutang.map((item, index)=>{
    //     return moment(item.tgl_penagihan).format('MM-DD-YYYY')
    //   })
    //   var obj = kalendarMark.reduce((c, v) => Object.assign(c, {[v]: {marked: true, dotColor: '#50cebb'}}), {});
    //   setMarked({obj})
    // });

    const getCalendar = () => {
      // const kalendarMark = dataHutang.map(
      //   e => e.tgl_penagihan 
      // );
      const kalendarMark = dataHutang.map((item, index)=>{
        return moment(item.tgl_penagihan).format('YYYY-MM-DD')
      })
      var obj = kalendarMark.reduce((c, v) => Object.assign(c, {[v]: {marked: true, dotColor: '#50cebb'}}), {});
      // const kalendars = kalendarMark
      // const kalendarMark = dataHutang.map(({
      //    moment(item.tgl_penagihan).format('MM-DD-YYYY')
      // }))
      // const index = dataHutang.findIndex(obj => obj);
      // dataKalender = moment([kalendarMark]).format('MM-DD-YYYY')
      console.log("dataaa:", obj);
      // const massage = {key:'massage', color: 'blue', selectedDotColor: 'blue'};
      // console.log("iniii:", kalendarMark.tgl_penagihan);
      // console.log("selected:", kalendarMark);
      return(
        <View style={{flex: 1}}>
          <Modal 
            isVisible={openModalAllCalendar} 
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
                      onPress={() => setOpenModalAllCalendar(false)}
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
                    <Text style={styles.fontHeader}>Kalender</Text>
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
                markedDates={obj}
                // markedDates={{
                //   // obj,
                //   // [marked.tgl_penagihan] : {marked: true, dotColor: '#50cebb'},
                //   // '2020-10-15': {marked: true, dotColor: '#50cebb'},
                //   // '2020-10-16': {marked: true, dotColor: '#50cebb'},
                //   // '2020-10-17': {marked: true, dotColor: '#50cebb'},
                //   [selected]: {
                //     selected: true,
                //     // disableTouchEvent: true,
                //     selectedColor: 'orange',
                //     selectedTextColor: 'red',
                //   },
                // }}
              />

              <View>
                <Text>ini</Text>
              </View>
            </View>
          </Modal>
        </View>
      )
    }

    const renderButtonCalendar = () => {
      return (
        <View >
          <TouchableOpacity onPress={()=> setOpenModalAllCalendar(true)} style={{backgroundColor:"purple"}}>
            <Text style={{margin: 16, alignSelf:"center", color:"white", fontSize:16}}>open calendar</Text>
          </TouchableOpacity>
        </View>
      )
    }

    const renderMain = () => {
    return (
        <View style={{flex: 1}}>
            {renderTab()}
            {renderData()}
            {renderButtonCalendar()}
            {openCalendar()}
            {openBayarHutang()}
            {getCalendar()}
        </View>
    );
    }
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

