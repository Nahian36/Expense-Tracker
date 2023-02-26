import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Button, ScrollView } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Material from 'react-native-vector-icons/MaterialCommunityIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MyPieChart from './components/MyPieChart';

const HomeScreen = ({ navigation, route }) => {

    const [expenseWeekly, SetExpenseWeekly] = useState([]);
    const [pie, SetPie] = useState(false);

    useEffect(() => {
        fetchExpenseWeekly();
        checkingZero();
    }, []);

    const checkingZero = async () => {
        await fetch('http://10.0.2.2:80/expense_tracker_alpha/show_expense_zero_cat_id_user_id.php', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                //user_id:route.params.user_id,
                user_id: route.params.user_id,
            })
        }).then((response) => response.json())
            .then((responseJson) => {

                let flag = 0;
                let id;

                responseJson.forEach(item => {
                    if(item.name == 'zero'){
                        id = item.id;
                        flag = 1;
                    }
                })

                if (flag == 1) {
                    //SetZeroCatID(id);
                } else {
                    createZeroCat();
                }

            }).catch((error) => {
                console.log('Error inside getZeroCatID ' + error);
            });
    }

    const createZeroCat = async () => {
        await fetch('http://10.0.2.2:80/expense_tracker_alpha/insert_expense_zero_cat_user_id.php',{
            method:'POST',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                name:'zero',
                user_id:route.params.user_id,
            })
        }).then((response)=>response.json())
        .then((responseJson)=>{
            //alert("Your Account is created");
        }).catch((error)=>{
            console.log('Inside createZeroCat '+error);
        });

        await fetch('http://10.0.2.2:80/expense_tracker_alpha/insert_income_zero_cat_user_id.php',{
            method:'POST',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                name:'zero',
                user_id:route.params.user_id,
            })
        }).then((response)=>response.json())
        .then((responseJson)=>{
            //alert("Your Account is created");
        }).catch((error)=>{
            console.log('Inside createZeroCat '+error);
        });
    }

    const fetchExpenseWeekly = async () => {
        await fetch('http://10.0.2.2:80/expense_tracker_alpha/expense_weekly.php', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                //user_id:route.params.user_id,
                user_id: route.params.user_id,
            })
        }).then((response) => response.json())
            .then((responseJson) => {

                let flag = 0;
                let data = new Array();

                responseJson.forEach(item => {
                    flag = 1;
                    data.push(item);
                })

                if (flag == 0) {
                    alert('No Expense to Show.');
                } else {
                    SetExpenseWeekly(data);
                    SetPie(true);
                }

            }).catch((error) => {
                console.log('Error inside handleIncomeWeekly ' + error);
            });
    }

    const handleIncome = () => {

        navigation.navigate('Income', {
            color: route.params.color,
            textColor: route.params.textColor,
            mood: route.params.mood,
            email: route.params.email,
            username: route.params.username,
            user_id: route.params.user_id,
            password: route.params.password,
        });

    }

    const handleExpense = () => {
        navigation.navigate('Expense', {
            color: route.params.color,
            textColor: route.params.textColor,
            mood: route.params.mood,
            email: route.params.email,
            username: route.params.username,
            user_id: route.params.user_id,
            password: route.params.password,
        });
    }

    const handleReport = () => {
        navigation.navigate('Report', {
            color: route.params.color,
            textColor: route.params.textColor,
            mood: route.params.mood,
            email: route.params.email,
            username: route.params.username,
            user_id: route.params.user_id,
            password: route.params.password,
        });
    }

    const handleCharts = () => {
        navigation.navigate('Charts', {
            color: route.params.color,
            textColor: route.params.textColor,
            mood: route.params.mood,
            email: route.params.email,
            username: route.params.username,
            user_id: route.params.user_id,
            password: route.params.password,
            bar: route.params.bar,
            pie: route.params.pie,
            line: route.params.line,
        });
    }

    const handleTest = () => {

        console.log(route.params);
    }

    const handleSettings = () => {

        navigation.navigate('Settings', {
            color: route.params.color,
            textColor: route.params.textColor,
            mood: route.params.mood,
            email: route.params.email,
            username: route.params.username,
            user_id: route.params.user_id,
            password: route.params.password,
        });

    }

    const handleBudget = () => {
        navigation.navigate('Budget', {
            color: route.params.color,
            textColor: route.params.textColor,
            mood: route.params.mood,
            email: route.params.email,
            username: route.params.username,
            user_id: route.params.user_id,
            password: route.params.password,
        });
    }

    return (
        <ScrollView
            style={{
                backgroundColor: route.params.mood,
                flex: 1,
            }}
        >
            <View
                style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    margin: 10,
                    marginBottom:0,
                }}
            >
                <View
                    style={{
                        borderColor: route.params.color,
                        borderRadius: 5,
                        borderWidth: 3,
                        padding: 5,
                        alignItems: 'center',
                    }}
                >
                    <TouchableOpacity
                        onPress={() => handleSettings()}
                    >
                        <Entypo
                            name='add-to-list'
                            size={50}
                            color={route.params.color}
                        />
                    </TouchableOpacity>
                </View>
                <View
                    style={{
                        borderColor: route.params.color,
                        borderRadius: 5,
                        borderWidth: 3,
                        padding: 5,
                        alignItems: 'center',
                        justifyContent:'center',
                        width:'60%',
                    }}
                >
                    <Text
                        style={{
                            color:route.params.textColor,
                            fontWeight:'bold',
                            fontSize:20,
                        }}
                    >Welcome {route.params.username}</Text>
                </View>
                <View
                    style={{
                        borderColor: route.params.color,
                        borderRadius: 5,
                        borderWidth: 3,
                        padding: 5,
                        alignItems: 'center',
                    }}
                >
                    <TouchableOpacity
                        onPress={() => handleBudget()}
                    >
                        <FontAwesome
                            name='table'
                            size={50}
                            color={route.params.color}
                        />
                    </TouchableOpacity>
                </View>
            </View>
            {pie ? <View
                style={{
                    width: '100%'
                }}
            >
                <MyPieChart
                    expenseWeekly={expenseWeekly}
                    color={route.params.color}
                    mood={route.params.mood}
                    textColor={route.params.textColor}
                    more={false}
                    type={2}
                />
            </View> : null}
            <View
                style={{
                    flexDirection:'row',
                    justifyContent:'space-between',
                    margin:10,
                }}
            >
                <View
                    style={{
                        width:'40%',
                        height:60,
                        borderColor:route.params.color,
                        borderWidth:3,
                        borderRadius:5,
                        alignItems:'center',
                        justifyContent:'center',
                    }}
                >
                    <TouchableOpacity
                        onPress={()=>handleIncome()}
                    >
                        <Text
                            style={{
                                color:route.params.textColor,
                                fontWeight:'bold',
                                fontSize:20,
                            }}
                        >Income</Text>
                    </TouchableOpacity>
                </View>
                <View
                    style={{
                        width:'40%',
                        height:60,
                        borderColor:route.params.color,
                        borderWidth:3,
                        borderRadius:5,
                        alignItems:'center',
                        justifyContent:'center',
                    }}
                >
                    <TouchableOpacity
                        onPress={()=>handleExpense()}
                    >
                        <Text
                            style={{
                                color:route.params.textColor,
                                fontWeight:'bold',
                                fontSize:20,
                            }}
                        >Expense</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View
                style={{
                    flexDirection:'row',
                    justifyContent:'space-between',
                    margin:10,
                }}
            >
                <View
                    style={{
                        width:'40%',
                        height:60,
                        borderColor:route.params.color,
                        borderWidth:3,
                        borderRadius:5,
                        alignItems:'center',
                        justifyContent:'center',
                    }}
                >
                    <TouchableOpacity
                        onPress={()=>handleReport()}
                    >
                        <Text
                            style={{
                                color:route.params.textColor,
                                fontWeight:'bold',
                                fontSize:20,
                            }}
                        >Report</Text>
                    </TouchableOpacity>
                </View>
                <View
                    style={{
                        width:'40%',
                        height:60,
                        borderColor:route.params.color,
                        borderWidth:3,
                        borderRadius:5,
                        alignItems:'center',
                        justifyContent:'center',
                    }}
                >
                    <TouchableOpacity
                        onPress={()=>handleCharts()}
                    >
                        <Text
                            style={{
                                color:route.params.textColor,
                                fontWeight:'bold',
                                fontSize:20,
                            }}
                        >Charts</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ScrollView>
    )

}

export default HomeScreen;