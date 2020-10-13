import React, {useState, useEffect} from 'react';
import { TouchableOpacity } from 'react-native';
import { Text, View, Button, Image } from 'react-native';
import moment from "moment"

function Kartu_Nama () {
    const [selected, setSelected] = useState(0)  
    const [data, setData] = useState({nama: "tyo", alamat: "fatmawati", pekerjaan: "Software Engineer"})
    

    const renderNameTag1 = () => {
        return (
            <View style={{flex: 1, borderWidth: 1, margin: 10}}>
                <View style={{alignItems:"center", justifyContent:"center"}}>
                    <Text style={{fontSize:20, margin: 5}}>{`Nama: ` + data.nama}</Text>
                    <Text style={{fontSize:20, margin: 5}}>{`Alamat: ` + data.alamat}</Text>
                    <Text style={{fontSize:20, margin: 5}}>{`Pekerjaan: ` + data.pekerjaan}</Text>
                </View>
            </View>
        );
    }

    const renderNameTag2 = () => {
        return (
            <View style={{flex: 1, borderWidth: 1, margin: 20}}>
                <View>
                    <Image style={{width:"100%", height:190, position: "absolute"}} source={require('../../image/nametag1.jpg')}/>
                    <View style={{marginTop:30}}>
                        <Text style={{fontSize:20, margin: 5}}>{`Nama: ` + data.nama}</Text>
                        <Text style={{fontSize:20, margin: 5}}>{`Alamat: ` + data.alamat}</Text>
                        <Text style={{fontSize:20, margin: 5}}>{`Pekerjaan: ` + data.pekerjaan}</Text>
                    </View>
                </View>
            </View>
        );
    }

    const renderNameTag3 = () => {
        return (
            <View style={{flex: 1, borderWidth: 1, margin: 10}}>
                <View>
                    <Image style={{width:"100%", height:190, position: "absolute"}} source={require('../../image/nametag2.jpg')}/>
                    <View style={{alignSelf:"flex-end"}}>
                        <Text style={{fontSize:20, margin: 5, color:"white"}}>{`Nama: ` + data.nama}</Text>
                        <Text style={{fontSize:20, margin: 5, color:"white"}}>{`Alamat: ` + data.alamat}</Text>
                        <Text style={{fontSize:20, margin: 5, color:"white"}}>{`Pekerjaan: ` + data.pekerjaan}</Text>
                    </View>
                </View>
            </View>
        );
    }

    const renderSelectTemplate = () => {
        return(
            <View style={{flex: 2}}>
                <Text style={{margin: 10, fontSize: 20}}>Pilih tempalte: </Text>
                <TouchableOpacity onPress={()=> setSelected(0)} style={{margin: 5, borderWidth: selected === 0 ? 2 : 0, borderColor: "red", width:"80%", alignSelf:"center"}}>
                    <View>
                        <View style={{width:"100%", height:80, borderWidth: 1}} />
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=> setSelected(1)} style={{margin: 5, borderWidth: selected === 1 ? 2 : 0, borderColor: "red", width:"80%", alignSelf:"center"}}>
                    <View>
                        <Image style={{width:"100%", height:80}} source={require('../../image/nametag1.jpg')}/>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=> setSelected(2)} style={{margin: 5, borderWidth: selected === 2 ? 2 : 0, borderColor: "red", width:"80%", alignSelf:"center"}}>
                    <View>
                        <Image style={{width:"100%", height:80}} source={require('../../image/nametag2.jpg')}/>
                    </View>
                </TouchableOpacity>
            </View>
        )
    }

    const renderMain = () => {
    return (
        <View style={{flex: 1}}>
            {
                (selected === 0) ?
                    renderNameTag1()
                : (selected === 1) ?
                    renderNameTag2()
                :
                    renderNameTag3()
            }
            {renderSelectTemplate()}
        </View>
    );
    }

    return(
        <View style={{flex: 1}}>
            {renderMain()}
        </View>
    )

}
export default Kartu_Nama;