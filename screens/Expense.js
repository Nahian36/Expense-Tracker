import React, { useState,useEffect } from 'react';
import {
    View, Text, ScrollView,
    TouchableOpacity, TextInput,
    Modal, FlatList, Button, Alert,
} from 'react-native';
import Material from 'react-native-vector-icons/MaterialIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialC from 'react-native-vector-icons/MaterialCommunityIcons';
import Foundation from 'react-native-vector-icons/Foundation';
import Calender from './Calender';

/*const DATA = [
    { id: '1', name: 'atiq', user_id: '2' },
    { id: '2', name: 'shafin', user_id: '2' },
    { id: '3', name: 'edon', user_id: '2' },
];*/

const Expense = ({ navigation, route }) => {

    const [zeroCatID,SetZeroCatID] = useState();

    useEffect(()=>{
        getZeroCatID();
    },[]);

    const getZeroCatID = async () =>{
        await fetch('http://10.0.2.2:80/expense_tracker_alpha/show_income_zero_cat_id_user_id.php', {
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
                    SetZeroCatID(id);
                } else {
                    alert('There is no Zero Category.');
                }

            }).catch((error) => {
                console.log('Error inside getZeroCatID ' + error);
            });

    }

    //for budget checking
    const [bdData, SetBdData] = useState([]);
    const [bc,SetBC] = useState(false);

    const [exD,SetExD] = useState([]);

    const [amount, SetAmount] = useState('');
    const [desc, SetDesc] = useState('');
    const [errtxtAmount, SetErrtxtAmount] = useState('');

    const [cat, SetCat] = useState(false);
    const [cat1, SetCat1] = useState(false);
    const [catData, SetCatData] = useState();
    const [catid, SetCatid] = useState('');

    const [md, SetMd] = useState(false);
    const [md1, SetMd1] = useState(false);
    const [mdData, SetMdData] = useState();
    const [mdid, SetMdid] = useState('');

    const [cal, SetCal] = useState(false);
    const [cal1, SetCal1] = useState(false);
    const [calData, SetCalData] = useState();
    const [calin, SetCalin] = useState('');

    const [add, SetAdd] = useState(false);
    const [add1, SetAdd1] = useState(false);
    const [addData, SetAddData] = useState();

    function formatDate(date) {
        var d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();
    
        if (month.length < 2) 
            month = '0' + month;
        if (day.length < 2) 
            day = '0' + day;
    
        return [year, month, day].join('-');
    }

    const handleTest = () => {
        //console.log(exD);
        //handleBudgetCheck();
        //getBdData();
        //getExData('2021-10-12','2021-10-30');
        console.log(bdData);
    }

    const handleInc = () => {
        exD.push('atiq');
    }

    const handleCat = async () => {

        if (cat == false) {
            SetCat(true);
        } else {
            SetCat(false);
        }

        await fetch('http://10.0.2.2:80/expense_tracker_alpha/show_expense_cat_user_id.php', {
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

                if (flag == 1) {
                    SetCatData(data);
                    //console.log(data);
                    SetCat1(true);
                } else {
                    alert('There is no category to show.');
                    SetCat(false);
                }

            }).catch((error) => {
                console.log('Error inside handleDeleteIncomeCat ' + error);
            });

    }

    const returnCatModal = () => {

        const handleCatCheck = (vid) => {
            //console.log(typeof vid);

            SetCat1(false);
            SetCat(false);
            SetCatid(vid);
        }

        const renderItem = ({ item }) => {
            return (
                <View
                    style={{
                        backgroundColor: route.params.mood,
                        marginLeft: 20,
                        marginRight: 20,
                        margin: 10,
                        borderColor: route.params.color,
                        borderRadius: 5,
                        borderWidth: 3,
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                    }}
                >
                    <Text
                        style={{
                            color: route.params.textColor,
                            fontSize: 20,
                            margin: 10,
                        }}
                    >{item.name}</Text>
                    <View
                        style={{
                            borderWidth: 0,
                            borderLeftWidth: 3,
                            borderColor: route.params.color,
                        }}
                    >
                        <TouchableOpacity
                            onPress={() => handleCatCheck(item)}
                        >
                            <Entypo
                                name='check'
                                size={50}
                                color={route.params.color}
                            />
                        </TouchableOpacity>
                    </View>
                </View>
            )
        }

        return (
            <Modal
                animationType='slide'
                transparent={true}
                visible={cat1}
                onRequestClose={() => { }}
            >
                <View
                    style={{
                        backgroundColor: route.params.mood,
                        width: '100%',
                        marginTop: 150,
                        borderColor: route.params.color,
                        borderWidth: 2,
                        borderRadius: 5,
                        height:450,

                    }}
                >
                    <View
                        style={{
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                    >
                        <Text
                            style={{
                                color: route.params.color,
                                fontSize: 40,
                                fontWeight: 'bold',
                            }}
                        >
                            Category
                        </Text>
                    </View>
                    <FlatList
                        data={catData}
                        renderItem={renderItem}
                        keyExtractor={item => item.id}

                    />
                </View>
            </Modal>
        )
    }

    const handleMd = async () => {

        if (md == false) {
            SetMd(true);
        } else {
            SetMd(false);
        }

        await fetch('http://10.0.2.2:80/expense_tracker_alpha/show_mode_cat_user_id.php', {
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

                if (flag == 1) {
                    SetMdData(data);
                    //console.log(data);
                    SetMd1(true);
                } else {
                    alert('There is no mode to show.');
                    SetMd(false);
                }

            }).catch((error) => {
                console.log('Error inside handleDeleteIncomeCat ' + error);
            });
    }

    const returnMdModal = () => {

        const handleMdCheck = (vid) => {
            //console.log(typeof vid);

            SetMd1(false);
            SetMd(false);
            SetMdid(vid);
        }

        const renderItem = ({ item }) => {
            return (
                <View
                    style={{
                        backgroundColor: route.params.mood,
                        marginLeft: 20,
                        marginRight: 20,
                        margin: 10,
                        borderColor: route.params.color,
                        borderRadius: 5,
                        borderWidth: 3,
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                    }}
                >
                    <Text
                        style={{
                            color: route.params.textColor,
                            fontSize: 20,
                            margin: 10,
                        }}
                    >{item.name}</Text>
                    <View
                        style={{
                            borderWidth: 0,
                            borderLeftWidth: 3,
                            borderColor: route.params.color,
                        }}
                    >
                        <TouchableOpacity
                            onPress={() => handleMdCheck(item)}
                        >
                            <Entypo
                                name='check'
                                size={50}
                                color={route.params.color}
                            />
                        </TouchableOpacity>
                    </View>
                </View>
            )
        }

        return (
            <Modal
                animationType='slide'
                transparent={true}
                visible={md1}
                onRequestClose={() => { }}
            >
                <View
                    style={{
                        backgroundColor: route.params.mood,
                        width: '100%',
                        marginTop: 150,
                        borderColor: route.params.color,
                        borderWidth: 2,
                        borderRadius: 5,
                        height:450,
                    }}
                >
                    <View
                        style={{
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                    >
                        <Text
                            style={{
                                color: route.params.color,
                                fontSize: 40,
                                fontWeight: 'bold',
                            }}
                        >
                            Mode
                        </Text>
                    </View>
                    <FlatList
                        data={mdData}
                        renderItem={renderItem}
                        keyExtractor={item => item.id}

                    />
                </View>
            </Modal>
        )

    }

    const handleCal = () => {

        if (cal == false) {
            SetCal(true);
        } else {
            SetCal(false);
        }

    }

    const returnCalModal = () => {

        const handleSetClose = (vd) => {

            const ar = new Array();
            ar.push('Sun');
            ar.push('Mon');
            ar.push('Tue');
            ar.push('Wed');
            ar.push('Thu');
            ar.push('Fri');
            ar.push('Sat');

            const arM = new Array();
            arM.push('Jan');
            arM.push('Feb');
            arM.push('Mar');
            arM.push('Apr');
            arM.push('May');
            arM.push('Jun');
            arM.push('Jul');
            arM.push('Aug');
            arM.push('Sep');
            arM.push('Oct');
            arM.push('Nov');
            arM.push('Dec');

            const obj = {
                date_col: vd.toString(),
                day_col: ar[(new Date(vd)).getDay()],
                month_col:arM[(new Date(vd)).getMonth()],
            }

            SetCalin(obj);
            SetCal(false);
            getBdData(vd.toString());
        }

        return (
            <Calender
                range={false}
                handleSetClose={handleSetClose}
            />
        )

    }

    const handleAdd = () => {

        SetBC(false);

        if (add == false) {
            SetAdd(true);
        } else {
            SetAdd(false);
        }

        if (handleNull(amount)) {
            SetErrtxtAmount('Amount can not be Zero');
            SetAdd1(false);
            SetAdd(false);
            return;
        }

        if (handleNull(catid)) {
            SetErrtxtAmount('Category must be choosen.');
            SetAdd1(false);
            SetAdd(false);
            return;
        }

        if (handleNull(mdid)) {
            SetErrtxtAmount('Mode must be choosen.');
            SetAdd1(false);
            SetAdd(false);
            return;
        }

        if (handleNull(calin)) {
            SetErrtxtAmount('A Date must be choosen.');
            SetAdd1(false);
            SetAdd(false);
            return;
        }

        handleBudgetCheck();

        const Arrobj = [
            { id: '1', title: 'amount', value: amount },
            { id: '2', title: 'Category', value: catid.name },
            { id: '3', title: 'Date', value: calin.date_col },
            { id: '4', title: 'Day', value: calin.day_col },
            { id: '5', title: 'Mode', value: mdid.name },
            { id: '6', title: 'Description', value: desc },
        ];

        SetAddData(Arrobj);
        SetAdd1(true);

    }

    const handleBudgetCheck = async () => {

        bdData.forEach(item => {
            console.log("bdData");
            console.log(item);
            getExData(item.name, item.amount, item.start_date, item.end_date);
            //console.log('inside handleBudgetCheck : '+exData);
        });


    }

    const getBdData = async (vd) => {

        await fetch('http://10.0.2.2:80/expense_tracker_alpha/bd_date_type_user_id.php', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                date_col:formatDate(vd),
                type: 'ex',
                user_id: route.params.user_id,
            })
        }).then((response) => response.json())
            .then((responseJson) => {

                let flag = 1;
                let data = new Array();

                responseJson.forEach(item => {
                    flag = 1;
                    data.push(item);
                })

                if (flag == 1) {
                    SetBdData(data);
                } else {
                    alert('There is no data to show.');
                }

            }).catch((error) => {
                console.log('Error inside handleDeleteIncomeCat ' + error);
            });

    }

    const getExData = async (name, amt, start_date, end_date) => {

        await fetch('http://10.0.2.2:80/expense_tracker_alpha/ex_date_user_id.php', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                //user_id:route.params.user_id,
                start_date: start_date,
                end_date: end_date,
                user_id: route.params.user_id,
            })
        }).then((response) => response.json())
            .then((responseJson) => {
                let fl = parseFloat(responseJson).toFixed(2);
                const flamt = parseFloat(amt).toFixed(2);
                const samt = parseFloat(amount).toFixed(2);

                if(fl == "NaN") {
                    fl = 0;
                }

                if (flamt == 'NaN') {
                    alert('No budget to compare, You can Proceed');
                } else {
                    let vv = parseFloat(samt)+parseFloat(fl);
                    

                    if (vv > flamt) {

                        SetExD(prev=>[{name:name,flamt:flamt,cur:vv},...prev]);

                        SetBC(true);

                    }

                }

            }).catch((error) => {
                console.log('Error in getExData() ' + error);
            });
    }

    const returnBcross = () => {
        return(
            <View
                style={{
                    borderColor:route.params.color,
                    borderWidth:3,
                    borderRadius:5,
                    margin:10,
                }}
            >
                <TouchableOpacity
                    onPress={()=>handleBcross()}
                >
                    <Text
                        style={{
                            color:'red',
                            fontSize:15,
                            fontWeight:'bold',
                            margin:10,
                        }}
                    >Budget Crossed. Click me to get Report.</Text>
                </TouchableOpacity>
            </View>
        )
    }

    const handleBcross = () => {

        SetAdd1(false);
        SetAdd(false);

        navigation.navigate('BudgetCross', {
            arr: exD,
            color:route.params.color,
            textColor:route.params.textColor,
            mood:route.params.mood,
            user_id:route.params.user_id,
        });

        SetExD([]);
    }

    const handleNull = (v) => {
        if (v == '') {
            return true;
        }
        return false;
    }

    const returnAddModal = () => {

        const renderItem = ({ item }) => {
            return (
                <View
                    style={{
                        flexDirection: 'row',
                        borderRadius: 5,
                        borderWidth: 3,
                        borderColor: route.params.color,
                        margin: 10,
                    }}
                >
                    <View
                        style={{
                            width: '35%',
                            borderRightWidth: 3,
                            borderColor: route.params.color,
                        }}
                    >
                        <Text
                            style={{
                                color: route.params.textColor,
                                fontSize: 20,
                                margin: 10,
                            }}
                        >{item.title}</Text>
                    </View>
                    <View
                        style={{
                            width: '65%',
                        }}
                    >
                        <Text
                            style={{
                                color: route.params.textColor,
                                fontSize: 20,
                                margin: 10,
                            }}
                        >{item.value}</Text>
                    </View>
                </View>
            )
        }

        const handleConfirm = async () => {
            await fetch('http://10.0.2.2:80/expense_tracker_alpha/add_expense.php', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    amount: amount,
                    category: parseInt(catid.id),
                    date_col: new Date(calin.date_col),
                    day_col: calin.day_col,
                    month_col:calin.month_col,
                    mode: parseInt(mdid.id),
                    descp: desc,
                    user_id: route.params.user_id,
                })
            }).then((response) => response.json())
                .then((responseJson) => {

                    //console.log('add_income.php : '+responseJson);
                    alert("Expense Added");
                    SetAdd1(false);
                    SetAdd(false);
                    SetAmount('');
                    SetDesc('');

                }).catch((error) => {
                    console.log('Error inside handleDeleteIncomeCat ' + error);
                });
            
                await fetch('http://10.0.2.2:80/expense_tracker_alpha/add_income.php', {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        amount:0,
                        category:parseInt(zeroCatID),
                        date_col:new Date(calin.date_col),
                        day_col:calin.day_col,
                        month_col:calin.month_col,
                        mode:parseInt(mdid.id),
                        descp:desc,
                        user_id:route.params.user_id,
                    })
                }).then((response) => response.json())
                    .then((responseJson) => {
    
                        //console.log('add_income.php : '+responseJson);
                        alert("Expense Added");
                        SetAdd1(false);
                        SetAdd(false);
                        SetAmount('');
                        SetDesc('');
    
                    }).catch((error) => {
                        console.log('Error inside handleDeleteIncomeCat ' + error);
                    });
        }

        const handleDeny = () => {
            SetAdd1(false);
            SetAdd(false);
        }

        return (
            <Modal
                animationType='slide'
                transparent={true}
                visible={add1}
                onRequestClose={() => { }}
            >
                <View
                    style={{
                        backgroundColor: route.params.mood,
                        width: '100%',
                        marginTop: 150,
                        borderColor: route.params.color,
                        borderWidth: 2,
                        borderRadius: 5,
                    }}
                >
                    <View
                        style={{
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                    >
                        <Text
                            style={{
                                color: route.params.color,
                                fontSize: 40,
                                fontWeight: 'bold',
                            }}
                        >
                            Expense
                        </Text>
                    </View>
                    <View
                        style={{
                            width: '100%',
                            height: 350,
                        }}
                    >
                        <FlatList
                            data={addData}
                            renderItem={renderItem}
                            keyExtractor={item => item.id}

                        />
                    </View>
                    <View
                        style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            margin: 10,
                        }}
                    >
                        <View
                            style={{
                                borderColor: route.params.color,
                                borderWidth: 3,
                                borderRadius: 5,
                                width: '40%',
                            }}
                        >
                            <TouchableOpacity
                                onPress={() => handleConfirm()}
                            >
                                <View
                                    style={{
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                        margin: 5,
                                    }}
                                >
                                    <AntDesign
                                        name='checksquareo'
                                        size={50}
                                        color={route.params.textColor}
                                    />
                                    <Text
                                        style={{
                                            color: route.params.textColor,
                                            fontSize: 20,
                                        }}
                                    >Confirm</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                        <View
                            style={{
                                borderColor: route.params.color,
                                borderWidth: 3,
                                borderRadius: 5,
                                width: '40%',
                            }}
                        >
                            <TouchableOpacity
                                onPress={() => handleDeny()}
                            >
                                <View
                                    style={{
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                        margin: 5,
                                    }}
                                >
                                    <AntDesign
                                        name='closesquareo'
                                        size={50}
                                        color={route.params.textColor}
                                    />
                                    <Text
                                        style={{
                                            color: route.params.textColor,
                                            fontSize: 20,
                                            marginLeft: 15,
                                        }}
                                    >Deny</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        )

    }

    return (
        <ScrollView
            style={{
                backgroundColor: route.params.mood,
                flex: 1,
            }}
        >
            {bc?returnBcross():null}
            {false ?
                <Button
                    title='test'
                    onPress={() => handleTest()}
                /> : null}
            {false ?
                <Button
                    title='inc'
                    onPress={() => handleInc()}
                /> : null}
            <View
                style={{
                    borderColor: route.params.color,
                    borderWidth: 4,
                    borderRadius: 5,
                    margin: 10,
                    marginBottom: 0,
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
            {returnCatModal()}
            {returnMdModal()}
            {cal ? returnCalModal() : null}
            {returnAddModal()}
            <View
                style={{
                    borderColor: route.params.color,
                    borderWidth: 4,
                    borderRadius: 5,
                    margin: 10,
                }}
            >
                <TextInput
                    placeholder="Enter Description"
                    onChangeText={SetDesc}
                    value={desc}
                    multiline={true}
                    placeholderTextColor={route.params.textColor}
                    color={route.params.textColor}
                    style={{
                        fontSize: 20,
                        margin: 10,
                    }}
                />
            </View>
            <View
                style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    margin: 10,
                }}
            >
                <View
                    style={cat ? {
                        backgroundColor: route.params.color,
                        borderColor: route.params.color,
                        borderWidth: 3,
                        borderRadius: 5,
                        width: '40%',
                    } : {

                        borderColor: route.params.color,
                        borderWidth: 3,
                        borderRadius: 5,
                        width: '40%',
                    }}
                >
                    <TouchableOpacity
                        onPress={() => handleCat()}
                    >
                        <View
                            style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                margin: 10,
                            }}
                        >
                            <Material
                                name='category'
                                size={50}
                                color={route.params.textColor}
                            />
                            <Text
                                style={{
                                    color: route.params.textColor,
                                    fontSize: 20,
                                }}
                            >Category</Text>
                        </View>
                    </TouchableOpacity>
                </View>
                <View
                    style={md ? {
                        backgroundColor: route.params.color,
                        borderColor: route.params.color,
                        borderWidth: 3,
                        borderRadius: 5,
                        width: '40%',
                    } : {

                        borderColor: route.params.color,
                        borderWidth: 3,
                        borderRadius: 5,
                        width: '40%',
                    }}
                >
                    <TouchableOpacity
                        onPress={() => handleMd()}
                    >
                        <View
                            style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                margin: 10,
                            }}
                        >
                            <Material
                                name='category'
                                size={50}
                                color={route.params.textColor}
                            />
                            <Text
                                style={{
                                    color: route.params.textColor,
                                    fontSize: 20,
                                }}
                            >Mode</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
            <View
                style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    margin: 10,
                }}
            >
                <View
                    style={cal ? {
                        backgroundColor: route.params.color,
                        borderColor: route.params.color,
                        borderWidth: 3,
                        borderRadius: 5,
                        width: '40%',
                    } : {

                        borderColor: route.params.color,
                        borderWidth: 3,
                        borderRadius: 5,
                        width: '40%',
                    }}
                >
                    <TouchableOpacity
                        onPress={() => handleCal()}
                    >
                        <View
                            style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                margin: 10,
                            }}
                        >
                            <MaterialC
                                name='calendar-range-outline'
                                size={50}
                                color={route.params.textColor}
                            />
                            <Text
                                style={{
                                    color: route.params.textColor,
                                    fontSize: 20,
                                }}
                            >Calender</Text>
                        </View>
                    </TouchableOpacity>
                </View>
                <View
                    style={add ? {
                        backgroundColor: route.params.color,
                        borderColor: route.params.color,
                        borderWidth: 3,
                        borderRadius: 5,
                        width: '40%',
                    } : {

                        borderColor: route.params.color,
                        borderWidth: 3,
                        borderRadius: 5,
                        width: '40%',
                    }}
                >
                    <TouchableOpacity
                        onPress={() => handleAdd()}
                    >
                        <View
                            style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                margin: 10,
                                marginLeft: 25,
                            }}
                        >
                            <Foundation
                                name='page-add'
                                size={50}
                                color={route.params.textColor}
                            />
                            <Text
                                style={{
                                    color: route.params.textColor,
                                    fontSize: 20,
                                    marginLeft: 10,
                                }}
                            >Add</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        </ScrollView>
    )
}

export default Expense;