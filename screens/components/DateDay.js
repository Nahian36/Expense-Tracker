import React,{useState} from 'react';
import {
    View,Text,Modal,TouchableOpacity, 
    Button,Dimensions, ScrollView,
    KeyboardAvoidingView
} from 'react-native';
import { TextInput } from 'react-native-gesture-handler';

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

const days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];

const DateDay = (params) => {

    const [date,SetDate] = useState('Set Date');    
    const [dateModal,SetDateModal] = useState(false);
    const [day,SetDay] = useState('Day');
    const [month,SetMonth] = useState('Month');
    const [year,SetYear] = useState('Year');
    const [nday,SetNday] = useState('Day of Month');
    const [err,SetErr] = useState(false);
    
    const handleSetDate = () => {

        const now = new Date();

        console.log(now.getDay());

        SetDay(days[now.getDay().toString()]);
        SetNday(now.getDate().toString());
        SetMonth(now.getMonth().toString());
        SetYear(now.getFullYear().toString());

        SetDateModal(true);

    }
    
    const handleSetClose = () => {

        const chkdate = new Date(year,month,nday);

        console.log(chkdate.toDateString()+' '+Date());

        if(days[chkdate.getDay().toString()] != day
        || chkdate.getDate().toString() != nday
        || chkdate.getMonth().toString() != month
        || chkdate.getFullYear().toString() != year){
            
            SetErr(true);
            
            console.log(days[chkdate.getDay().toString()]+' '+day);
            console.log(chkdate.getDate().toString()+' '+nday);
            console.log(chkdate.getMonth().toString()+' '+month);
            console.log(chkdate.getFullYear().toString()+' '+year);

            //console.log('chk');

        } else {

            SetDate(chkdate.toDateString());
            SetDateModal(false);
            params.handleDate_col(chkdate.toDateString());
        }

    }
    
    return (
        <KeyboardAvoidingView
            style={{
                
            }}

            behavior="padding"
        >
            <View
                style={{
                    flexDirection:'row',
                    alignItems:'center',
                    justifyContent:'center',
                }}
            >
                <TouchableOpacity
                    onPress={()=>handleSetDate()}
                >
                    <View
                        style={{
                            backgroundColor:'#7ae7eb',
                            padding:20,
                            marginRight:30,
                            margin:5,
                            width:200,
                            borderRadius:10,
                            alignItems:'center',
                        }}
                    >
                        <Text style={{color:'black'}}>
                            {date}
                        </Text>
                    </View>
                </TouchableOpacity>
            </View>
            <Modal
                transparent={true}
                animationType='slide'
                visible={dateModal}
            >
                <View
                    style={{
                        backgroundColor:'white',
                        borderRadius:10,
                        width:WIDTH-20,
                        marginTop:200,
                        marginLeft:10,
                        justifyContent:'center',
                    }}
                >
                    <ScrollView
                        style={{
                            borderWidth:2,
                            borderColor:'black',
                            margin:5,
                        }}
                    >
                        <Text
                            style={{
                                marginLeft:10,
                                fontWeight:'bold',
                            }}
                        >
                            Day Of Month
                        </Text>
                        <TextInput
                            placeholder="Date"
                            value={nday}
                            onChangeText={SetNday}
                            style={{
                                borderBottomWidth:2,
                                borderBottomColor:'black',
                                marginLeft:10,
                                marginRight:10,
                            }}
                        />
                        <Text
                            style={{
                                marginLeft:10,
                                fontWeight:'bold',
                            }}
                        >
                            Month
                        </Text>
                        <TextInput
                            placeholder="Month"
                            value={month}
                            onChangeText={SetMonth}
                            style={{
                                borderBottomWidth:2,
                                borderBottomColor:'black',
                                marginLeft:10,
                                marginRight:10,
                            }}
                        />
                        <Text
                            style={{
                                marginLeft:10,
                                fontWeight:'bold',
                            }}
                        >
                            Year
                        </Text>
                        <TextInput
                            placeholder="Year"
                            value={year}
                            onChangeText={SetYear}
                            style={{
                                borderBottomWidth:2,
                                borderBottomColor:'black',
                                marginLeft:10,
                                marginRight:10,
                            }}
                        />
                        <Text
                            style={{
                                marginLeft:10,
                                fontWeight:'bold',
                            }}
                        >
                            Day Of Week
                        </Text>
                        <TextInput
                            placeholder="Day of Week"
                            value={day}
                            onChangeText={SetDay}
                            style={{
                                borderBottomWidth:2,
                                borderBottomColor:'black',
                                marginLeft:10,
                                marginRight:10,
                                marginBottom:10,
                            }}
                        />
                    </ScrollView>
                    {err?
                    <View
                        style={{
                            backgroundColor:'#f5424e',
                            padding:10,
                            marginLeft:100,
                            marginRight:100,
                            margin:10,
                            justifyContent:'center',
                            alignItems:'center',
                        }}
                    >
                        <Text
                            style={{
                                color:'white',
                                fontWeight:'bold',
                                fontSize:15,
                            }}
                        >
                            Wrong Date
                        </Text>    
                    </View>:null}
                    <TouchableOpacity
                        onPress={()=>handleSetClose()}
                    >
                        <View
                            style={{
                                backgroundColor:'#563df5',
                                padding:15,
                                marginLeft:80,
                                marginRight:80,
                                borderRadius:10,
                                justifyContent:'center',
                                alignItems:'center',
                                margin:8,
                            }}
                        >
                            <Text
                                style={{
                                    color:'white',
                                }}
                            >
                                Set And Close</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </Modal>
        </KeyboardAvoidingView>
    )

}

export default DateDay;