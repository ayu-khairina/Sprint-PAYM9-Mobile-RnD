import React, {useState, useEffect} from 'react';
import { TouchableOpacity } from 'react-native';
import { Text, View, Button } from 'react-native';
import moment from "moment"

function Calendar () {
    const [section, setSection] = useState("today")
    const [dataHutang, setDataHutang] = useState([
        {nama: "udin", handphone: "0898987938946", hutang:1243243543, tgl_penagihan: "10/06/2020"}, 
        {nama: "Sumarni", handphone: "0897787368", hutang:2000000, tgl_penagihan: "10/05/2020"},
        {nama: "Tejo", handphone: "08376872837", hutang: 89000, tgl_penagihan: "10/10/2020"},
        {nama: "Slamet", handphone: "083789798999", hutang: 200000, tgl_penagihan: "10/06/2020"}
    ])

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

    const renderData = () => {
        return (
            <View style={{flex: 1}}>
                { 
                section === "previous_day" ?
                    dataHutang.map((item, index)=> {
                        if (moment(item.tgl_penagihan).format('MM/DD/YYYY') < moment(new Date()).format('MM/DD/YYYY')) {
                            return(
                                <TouchableOpacity>
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
                        if (moment(item.tgl_penagihan).format('MM/DD/YYYY') === moment(new Date()).format('MM/DD/YYYY')) {
                            return(
                                <TouchableOpacity>
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
                        if (moment(item.tgl_penagihan).format('MM/DD/YYYY') > moment(new Date()).format('MM/DD/YYYY')) {
                            return(
                                <TouchableOpacity>
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

    const renderAddPenagihan =()=> {
        return(
            <View style={{}}>

            </View>
        )
    }

    const renderMain = () => {
    return (
        <View style={{flex: 1}}>
            {renderTab()}
            {renderData()}
            {renderAddPenagihan()}
        </View>
    );
    }

    console.log("date:", moment(dataHutang[0].tgl_penagihan).format('MM/DD/YYYY'));
    return(
        <View style={{flex: 1}}>
            {renderMain()}
        </View>
    )

}
export default Calendar;