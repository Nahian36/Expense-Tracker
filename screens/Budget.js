import React, { useState } from 'react';
import {
    View, Text, ScrollView,
    TouchableOpacity, Button, TextInput
} from 'react-native';
import Calender from './Calender';
import Material from 'react-native-vector-icons/MaterialCommunityIcons';
import Foundation from 'react-native-vector-icons/Foundation';
import AntDesign from 'react-native-vector-icons/AntDesign';

const Budget = ({ navigation, route }) => {

    const [ex, SetEx] = useState(true);
    const [name, SetName] = useState('');
    const [amount, SetAmount] = useState('');
    const [calender, SetCalender] = useState(false);
    const [startDate, SetStartDate] = useState('');
    const [endDate, SetEndDate] = useState('');
    const [add, SetAdd] = useState(false);
    const [errtxtName, SetErrtxtName] = useState('');
    const [errtxtAmount, SetErrtxtAmount] = useState('');
    const [errtxtChk, SetErrtxtChk] = useState('');
    const [errtxtCalender, SetErrtxtCalender] = useState('');
    const [type, SetType] = useState('');
    const [fill1, SetFill1] = useState(false);
    const [fill2, SetFill2] = useState(false);

    const handleTest = () => {
        console.log('Inside Budget ' + startDate + ' ' + endDate);
    }

    const handlePressEx = () => {
        SetEx(true);
    }

    const handlePressInEx = () => {
        SetEx(false);
    }

    const handlePressCalender = () => {
        if (calender == false) SetCalender(true);
        else SetCalender(false);
    }

    const handleSetClose = (v1, v2) => {
        SetStartDate(v1);
        SetEndDate(v2);
        SetCalender(false);
    }

    const handlePressAdd = async () => {

        SetErrtxtName('');
        SetErrtxtAmount('');
        SetErrtxtChk('');
        SetErrtxtCalender('');

        if (handleNull(name)) {
            SetErrtxtName('Name can not be Empty.');
            return;
        }

        if (handleNull(amount)) {
            SetErrtxtAmount('Amount can not be empty');
            return;
        }

        /*if (handleNull(type)) {
            SetErrtxtChk('Choose a type.');
            return;
        }*/

        if (handleNull(startDate)) {
            SetErrtxtCalender('Start Date can not be empty');
            return;
        }

        if (handleNull(endDate)) {
            SetErrtxtCalender('End Date can not be empty.');
            return;
        }

        if (handleLength(name)) {
            SetErrtxtName('Name can not be greater than 35.');
            return;
        }

        SetErrtxtName('');
        SetErrtxtAmount('');
        SetErrtxtCalender('');

        await fetch('http://10.0.2.2:80/expense_tracker_alpha/show_budget_user_id.php',{
            method:'POST',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                //user_id:route.params.user_id,
                user_id:route.params.user_id,
            })
        }).then((response)=>response.json())
        .then((responseJson)=>{
            
            let flag = 0;

            responseJson.forEach(item=>{
                if(item.name==name){
                    flag=1;
                    alert('The name is not available.');
                }
            })

            if(flag==0){
                handleAdd();
            }

        }).catch((error)=>{
            console.log('Error inside handleDeleteIncomeCat '+error);
        });
    }

    const handleAdd = async () => {
        await fetch('http://10.0.2.2:80/expense_tracker_alpha/add_budget.php', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: name,
                amount: amount,
                startDate: new Date(startDate),
                endDate: new Date(endDate),
                user_id: route.params.user_id,
                type: 'ex',
            })
        }).then((response) => response.json())
            .then((responseJson) => {
                //alert(responseJson);
                alert("Budget Added.");
            }).catch((error) => {
                console.log('new ' + error);
            });
    }

    const handlePressDelete = async () =>{

        SetErrtxtName('');

        if(handleNull(name)){
            SetErrtxtName('Empty name can not be deleted.');
            return ;
        }

        if(handleLength(name)){
            SetErrtxtName('Name can not be greater than 35.');
            return ;
        }

        SetErrtxtName('');

        await fetch('http://10.0.2.2:80/expense_tracker_alpha/show_budget_user_id.php',{
            method:'POST',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                //user_id:route.params.user_id,
                user_id:route.params.user_id,
            })
        }).then((response)=>response.json())
        .then((responseJson)=>{
            
            let flag = 0;

            responseJson.forEach(item=>{
                if(item.name==name){
                    flag=1;
                    handleDelete();
                }
            })

            if(flag==0){
                alert('There is nothing to delete.');
            }

        }).catch((error)=>{
            console.log('Error inside handleDeleteIncomeCat '+error);
        });
    }

    const handleDelete = async () => {
        await fetch('http://10.0.2.2:80/expense_tracker_alpha/delete_budget_name_user_id.php',{
            method:'POST',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                name:name,
                user_id:route.params.user_id,
            })
        }).then((response)=>response.json())
        .then((responseJson)=>{
            
            alert(responseJson);
            SetErrtxtName('');
            SetName('');

        }).catch((error)=>{
            console.log('Error inside handleDeleteIncomeCat1 '+error);
        });
    }

    const handleNull = (v) => {
        if (v == '') {
            return true;
        }
        return false;
    }

    const handleLength = (v) => {
        if (v.length > 35) {
            return true;
        }
        return false;
    }

    const handleChkBox = (d) => {
        if (d == 1) {
            SetFill1(true);
            SetFill2(false);
            SetType('ex');
        } else if (d == 2) {
            SetFill1(false);
            SetFill2(true);
            SetType('inex');
        }
    }

    const returnAdd = () => {
        return (
            <View>
                <View>
                    <View
                        style={{
                            borderColor: route.params.color,
                            borderWidth: 4,
                            borderRadius: 5,
                            margin: 10,
                        }}
                    >
                        <TextInput
                            placeholder="Enter Name of The Budget"
                            onChangeText={SetName}
                            value={name}
                            placeholderTextColor={route.params.textColor}
                            color={route.params.textColor}
                            style={{
                                fontSize: 20,
                                margin: 10,
                            }}
                        />
                    </View>
                    <Text
                        style={{
                            color: 'red',
                            fontWeight: 'bold',
                            marginLeft: 10,
                        }}
                    >
                        {errtxtName}
                    </Text>
                    <View
                        style={{
                            borderColor: route.params.color,
                            borderWidth: 4,
                            borderRadius: 5,
                            margin: 10,
                        }}
                    >
                        <TextInput
                            placeholder="Enter Amount"
                            onChangeText={SetAmount}
                            value={amount}
                            keyboardType='numeric'
                            placeholderTextColor={route.params.textColor}
                            color={route.params.textColor}
                            style={{
                                fontSize: 20,
                                margin: 10,
                            }}
                        />
                    </View>
                    <Text
                        style={{
                            color: 'red',
                            fontWeight: 'bold',
                            marginLeft: 10,
                        }}
                    >
                        {errtxtAmount}
                    </Text>
                </View>
                {false?<View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'center',
                        margin: 10,
                        marginTop: 0,
                        borderColor: route.params.color,
                        borderWidth: 2,
                        borderRadius: 5,
                    }}
                >
                    <View
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            margin: 20,
                        }}
                    >
                        <View
                            style={fill1 ? {
                                backgroundColor: route.params.color,
                                borderColor: route.params.color,
                                borderRadius: 5,
                                borderWidth: 4,
                            } : {
                                backgroundColor: route.params.mood,
                                borderColor: route.params.color,
                                borderRadius: 5,
                                borderWidth: 4,
                            }}
                        >
                            <TouchableOpacity
                                onPress={() => handleChkBox(1)}
                            >
                                <AntDesign
                                    name='check'
                                    size={40}
                                    color='white'
                                />
                            </TouchableOpacity>
                        </View>
                        <Text
                            style={{
                                color: route.params.textColor,
                                fontSize: 20,
                                margin: 10,
                            }}
                        > Ex</Text>
                    </View>
                    <View
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            margin: 20,
                        }}
                    >
                        <View
                            style={fill2 ? {
                                backgroundColor: route.params.color,
                                borderColor: route.params.color,
                                borderRadius: 5,
                                borderWidth: 4,
                            } : {
                                backgroundColor: 'black',
                                borderColor: route.params.color,
                                borderRadius: 5,
                                borderWidth: 4,
                            }}
                        >
                            <TouchableOpacity
                                onPress={() => handleChkBox(2)}
                            >
                                <AntDesign
                                    name='check'
                                    size={40}
                                    color='white'
                                />
                            </TouchableOpacity>
                        </View>
                        <Text
                            style={{
                                color: route.params.textColor,
                                fontSize: 20,
                                margin: 10,
                            }}
                        > In-Ex</Text>
                    </View>
                </View>:null}
                <Text
                    style={{
                        color: 'red',
                        fontWeight: 'bold',
                        marginLeft: 10,
                    }}
                >
                    {errtxtChk}
                </Text>
                <View
                    style={{
                        alignItems: 'center',
                        margin: 10,
                    }}
                >
                    <View
                        style={calender ? {
                            backgroundColor: route.params.color,
                            alignItems: 'center',
                            justifyContent: 'center',
                            width: '40%',
                            borderWidth: 2,
                            borderRadius: 5,
                            borderColor: route.params.color,
                        } : {
                            backgroundColor: route.params.mood,
                            alignItems: 'center',
                            justifyContent: 'center',
                            width: '40%',
                            borderWidth: 2,
                            borderRadius: 5,
                            borderColor: route.params.color,
                        }}
                    >
                        <TouchableOpacity
                            onPress={() => handlePressCalender()}
                        >
                            <View
                                style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                }}
                            >
                                <Material
                                    name='calendar-range-outline'
                                    size={50}
                                    color={route.params.textColor}
                                    style={{
                                        margin: 5,
                                    }}
                                />
                                <Text
                                    style={{
                                        color: route.params.textColor,
                                        fontSize: 20,
                                        margin: 5,
                                        marginLeft: 0,
                                    }}
                                >Calender</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <Text
                        style={{
                            color: 'red',
                            fontWeight: 'bold',
                            marginLeft: 10,
                        }}
                    >
                        {errtxtCalender}
                    </Text>
                </View>
                {calender ?
                    <View
                        style={{
                            margin: 5,
                            borderColor: route.params.color,
                            borderWidth: 2,
                            borderRadius: 5,
                        }}
                    >
                        <Calender
                            range={true}
                            handleSetClose={handleSetClose}
                        />
                    </View> :
                    <View
                        style={{
                            alignItems: 'center',
                        }}
                    >
                        <View
                            style={add ? {
                                backgroundColor: route.params.color,
                                alignItems: 'center',
                                justifyContent: 'center',
                                width: '40%',
                                borderWidth: 2,
                                borderRadius: 5,
                                borderColor: route.params.color,
                            } : {
                                backgroundColor: route.params.mood,
                                alignItems: 'center',
                                justifyContent: 'center',
                                width: '40%',
                                borderWidth: 4,
                                borderRadius: 5,
                                borderColor: route.params.color,
                            }}
                        >
                            <TouchableOpacity
                                onPress={() => handlePressAdd()}
                            >
                                <View
                                    style={{
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                        margin: 5,
                                    }}
                                >
                                    <Foundation
                                        name='page-add'
                                        size={50}
                                        color={route.params.color}
                                    />
                                    <Text
                                        style={{
                                            color: route.params.color,
                                            fontSize: 20,
                                            margin: 5,
                                            marginLeft: 17,
                                        }}
                                    >Add</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>}
            </View>
        )
    }

    const returnDelete = () => {
        return (
            <ScrollView>
                <View
                    style={{
                        alignItems:'center',
                        borderRadius:150,
                        borderWidth:2,
                        borderColor:route.params.color,
                        marginLeft:120,
                        marginRight:120,
                    }}
                >
                    <AntDesign
                        name='delete'
                        size={150}
                        color={route.params.color}
                        style={{
                            margin:10,
                        }}
                    />
                </View>
                <View
                    style={{
                        borderColor: route.params.color,
                        borderWidth: 4,
                        borderRadius: 5,
                        margin: 10,
                        marginTop:30,
                    }}
                >
                    <TextInput
                        placeholder="Enter Name of The Budget"
                        onChangeText={SetName}
                        value={name}
                        placeholderTextColor={route.params.textColor}
                        color={route.params.textColor}
                        style={{
                            fontSize: 20,
                            margin: 10,
                        }}
                    />
                </View>
                <Text
                    style={{
                        color: 'red',
                        fontWeight: 'bold',
                        marginLeft: 10,
                    }}
                >
                    {errtxtName}
                </Text>
                <View
                    style={{
                        alignItems:'center',
                    }}
                >
                <View
                    style={{
                        backgroundColor:route.params.mood,
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: '40%',
                        borderWidth: 2,
                        borderRadius: 5,
                        borderColor: route.params.color,
                    }}
                >
                    <TouchableOpacity
                        onPress={() => handlePressDelete()}
                    >
                        <View
                            style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                margin: 5,
                            }}
                        >
                            <AntDesign
                                name='delete'
                                size={50}
                                color={route.params.color}
                            />
                            <Text
                                style={{
                                    color: route.params.color,
                                    fontSize: 20,
                                    margin: 5,
                                    marginLeft: 17,
                                }}
                            >Delete</Text>
                        </View>
                    </TouchableOpacity>
                </View>
                </View>
            </ScrollView>
        )
    }

    return (
        <ScrollView
            style={{
                backgroundColor: route.params.mood,
                flex: 1,
            }}
        >
            {false ? <Button
                title='test'
                onPress={() => handleTest()}
            /> : null}
            <View
                style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    margin: 10,
                }}
            >
                <View
                    style={ex ? {
                        backgroundColor: route.params.color,
                        width: '40%',
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderColor: route.params.color,
                        borderRadius: 5,
                        borderWidth: 2,
                    } : {
                        backgroundColor: route.params.mood,
                        width: '40%',
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderColor: route.params.color,
                        borderRadius: 5,
                        borderWidth: 2,
                    }}
                >
                    <TouchableOpacity
                        onPress={() => handlePressEx()}
                    >
                        <Text
                            style={{
                                color: route.params.textColor,
                                fontSize: 20,
                                margin: 8,
                            }}
                        >
                            Add
                        </Text>
                    </TouchableOpacity>
                </View>
                <View
                    style={ex ? {
                        backgroundColor: route.params.mood,
                        width: '40%',
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderColor: route.params.color,
                        borderRadius: 5,
                        borderWidth: 2,
                    } : {
                        backgroundColor: route.params.color,
                        width: '40%',
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderColor: route.params.color,
                        borderRadius: 5,
                        borderWidth: 2,
                    }}
                >
                    <TouchableOpacity
                        onPress={() => handlePressInEx()}
                    >
                        <Text
                            style={{
                                color: route.params.textColor,
                                fontSize: 20,
                                margin: 8,
                            }}
                        >
                            Delete
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
            {ex ? returnAdd() : returnDelete()}
        </ScrollView>
    )
}

export default Budget;