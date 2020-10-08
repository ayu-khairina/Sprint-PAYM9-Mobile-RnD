import React, {useState, useEffect} from 'react';
import { TouchableOpacity } from 'react-native';
import { Text, View, Button } from 'react-native';
import moment from "moment"

function Calendar_component () {
    const months = ["January", "February", "March", "April", 
    "May", "June", "July", "August", "September", "October", 
    "November", "December"];

    const weekDays = [
        "Sun","Mon","Tue","Wed","Thu","Fri","Sat"
    ];

    const nDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    const [activeDate, setActivaDate] = useState(new Date())

    const generateMatrix =()=> {
        var matrix = [];
        // Create header
        matrix[0] = this.weekDays;
     
        // More code here
    }
return (
    <View>
        {generateMatrix()}
    </View>
)

}

export default Calendar_component;