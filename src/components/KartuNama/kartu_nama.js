import React, {useState, useEffect} from 'react';
import { TouchableOpacity } from 'react-native';
import { Text, View, Button } from 'react-native';
import moment from "moment"

function Kartu_Nama () {
    

    const renderMain = () => {
    return (
        <View style={{flex: 1}}>
            <Text>Ini kartu nama</Text>
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