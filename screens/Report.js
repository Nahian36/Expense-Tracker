import React, { useState, useEffect } from 'react';
import {
    View, Text,
    ScrollView, TouchableOpacity,
    TextInput, Button
} from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import AntDesign from 'react-native-vector-icons/AntDesign';

const DATA = [
    { id: '1', amount: '123', },
    { id: '2', amount: '123', },
    { id: '3', amount: '123', },
    { id: '4', amount: '123', },
];

const Report = ({ navigation, route }) => {

    const [catMap, SetCatMap] = useState();
    const [excatMap,SetExCatMap] = useState();
    const [mdMap, SetMdMap] = useState();

    useEffect(() => {

        createCatMap();
        createExCatMap();
        createMdMap();

    }, []);

    const createCatMap = async () => {
        await fetch('http://10.0.2.2:80/expense_tracker_alpha/show_income_cat_user_id.php', {
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

                let vm = new Map();

                vm.set('2', 'Business');
                vm.set('3', 'Salary');
                vm.set('4', 'Pocket Money');

                responseJson.forEach(item => {
                    vm.set(item.id, item.name);
                })

                SetCatMap(vm);

            }).catch((error) => {
                console.log('Error inside handleDeleteIncomeCat ' + error);
            });

        //console.log(vm);
    }

    const createExCatMap = async () => {
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

                let vm = new Map();

                //vm.set('2', 'Business');
                //vm.set('3', 'Salary');
                //vm.set('4', 'Pocket Money');

                responseJson.forEach(item => {
                    vm.set(item.id, item.name);
                })

                SetExCatMap(vm);

            }).catch((error) => {
                console.log('Error inside handleDeleteIncomeCat ' + error);
            });
    }

    const createMdMap = async () => {
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

                let vm = new Map();

                //vm.set('2', 'Business');
                //vm.set('3', 'Salary');
                //vm.set('4', 'Pocket Money');

                responseJson.forEach(item => {
                    vm.set(item.id, item.name);
                })

                SetMdMap(vm);

            }).catch((error) => {
                console.log('Error inside handleDeleteIncomeCat ' + error);
            });

        //console.log(vm);
    }

    const [inc, SetInc] = useState(false);
    const [incData, SetIncData] = useState();
    const [fincData, SetFincData] = useState([]);

    const [ex, SetEx] = useState(false);
    const [exData, SetExData] = useState();
    const [fexData, SetFexData] = useState([]);

    const [bd, SetBd] = useState(false);
    const [bdData, SetBdData] = useState();
    const [fbdData, SetFbdData] = useState([]);

    const [searchButton, SetSearchButton] = useState(true);
    const [searchText, SetSearchText] = useState('');

    const handleTest = () => {
        //console.log(catMap);
        //console.log(mdMap);
        console.log(bdData);
    }

    const handleBack = () => {
        SetSearchButton(true);
        SetSearchText('');
        SetFincData([]);
    }

    const handleSearch = (vtext) => {

        if (inc == true) {
            SetSearchButton(false);
            SetSearchText(vtext);

            let fdata = incData.filter((item) => {
                return item.date_col.includes(searchText);
            });

            SetFincData(fdata);
        } else if (bd == true) {
            SetSearchButton(false);
            SetSearchText(vtext);

            let fdata = bdData.filter((item) => {
                return item.start_date.includes(searchText);
            });

            SetFbdData(fdata);
        } else if(ex==true){
            SetSearchButton(false);
            SetSearchText(vtext);

            let fdata = exData.filter((item) => {
                return item.date_col.includes(searchText);
            });

            SetFexData(fdata);
        }

    }

    const handleInc = async () => {

        await fetch('http://10.0.2.2:80/expense_tracker_alpha/show_income_user_id.php', {
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
                    if(item.amount>0)data.push(item);
                })

                if (flag == 0) {
                    alert('No Income to Show.');
                } else {
                    SetIncData(data);
                    SetInc(true);
                    SetEx(false);
                    SetBd(false);
                }

            }).catch((error) => {
                console.log('Error inside handleDeleteIncomeCat ' + error);
            });

    }

    const returnInc = () => {

        const renderItem = ({ item }) => {

            return (
                <View
                    style={{
                        borderWidth: 2,
                        borderRadius: 5,
                        borderColor: route.params.color,
                        margin: 10,
                    }}
                >
                    <View
                        style={{
                            alignItems: 'center',
                            margin: 10,
                        }}
                    >
                        <Text
                            style={{
                                color: route.params.color,
                                fontSize: 30,
                                fontWeight: 'bold',
                            }}
                        >Income {item.id}</Text>
                    </View>
                    <View
                        style={{
                            borderWidth: 2,
                            borderRadius: 5,
                            borderColor: route.params.color,
                            margin: 5,
                            flexDirection: 'row',
                        }}
                    >
                        <View
                            style={{
                                width: '35%',
                                borderColor: route.params.color,
                                borderRightWidth: 2,
                            }}
                        >
                            <Text
                                style={{
                                    color: route.params.textColor,
                                    fontSize: 20,
                                    margin: 10,
                                }}
                            >Amount</Text>
                        </View>
                        <View>
                            <Text
                                style={{
                                    color: route.params.textColor,
                                    fontSize: 20,
                                    margin: 10,
                                }}
                            >{item.amount}</Text>
                        </View>
                    </View>
                    <View
                        style={{
                            borderWidth: 2,
                            borderRadius: 5,
                            borderColor: route.params.color,
                            margin: 5,
                            flexDirection: 'row',
                        }}
                    >
                        <View
                            style={{
                                width: '35%',
                                borderColor: route.params.color,
                                borderRightWidth: 2,
                            }}
                        >
                            <Text
                                style={{
                                    color: route.params.textColor,
                                    fontSize: 20,
                                    margin: 10,
                                }}
                            >Category</Text>
                        </View>
                        <View>
                            <Text
                                style={{
                                    color: route.params.textColor,
                                    fontSize: 20,
                                    margin: 10,
                                }}
                            >{catMap.get(item.category)}</Text>
                        </View>
                    </View>
                    <View
                        style={{
                            borderWidth: 2,
                            borderRadius: 5,
                            borderColor: route.params.color,
                            margin: 5,
                            flexDirection: 'row',
                        }}
                    >
                        <View
                            style={{
                                width: '35%',
                                borderColor: route.params.color,
                                borderRightWidth: 2,
                            }}
                        >
                            <Text
                                style={{
                                    color: route.params.textColor,
                                    fontSize: 20,
                                    margin: 10,
                                }}
                            >Date</Text>
                        </View>
                        <View>
                            <Text
                                style={{
                                    color: route.params.textColor,
                                    fontSize: 20,
                                    margin: 10,
                                }}
                            >{item.date_col}</Text>
                        </View>
                    </View>
                    <View
                        style={{
                            borderWidth: 2,
                            borderRadius: 5,
                            borderColor: route.params.color,
                            margin: 5,
                            flexDirection: 'row',
                        }}
                    >
                        <View
                            style={{
                                width: '35%',
                                borderColor: route.params.color,
                                borderRightWidth: 2,
                            }}
                        >
                            <Text
                                style={{
                                    color: route.params.textColor,
                                    fontSize: 20,
                                    margin: 10,
                                }}
                            >Day</Text>
                        </View>
                        <View>
                            <Text
                                style={{
                                    color: route.params.textColor,
                                    fontSize: 20,
                                    margin: 10,
                                }}
                            >{item.day_col}</Text>
                        </View>
                    </View>
                    <View
                        style={{
                            borderWidth: 2,
                            borderRadius: 5,
                            borderColor: route.params.color,
                            margin: 5,
                            flexDirection: 'row',
                        }}
                    >
                        <View
                            style={{
                                width: '35%',
                                borderColor: route.params.color,
                                borderRightWidth: 2,
                            }}
                        >
                            <Text
                                style={{
                                    color: route.params.textColor,
                                    fontSize: 20,
                                    margin: 10,
                                }}
                            >Mode</Text>
                        </View>
                        <View>
                            <Text
                                style={{
                                    color: route.params.textColor,
                                    fontSize: 20,
                                    margin: 10,
                                }}
                            >{mdMap.get(item.mode)}</Text>
                        </View>
                    </View>
                    <View
                        style={{
                            borderWidth: 2,
                            borderRadius: 5,
                            borderColor: route.params.color,
                            margin: 5,
                            flexDirection: 'row',
                        }}
                    >
                        <View
                            style={{
                                width: '35%',
                                borderColor: route.params.color,
                                borderRightWidth: 2,
                            }}
                        >
                            <Text
                                style={{
                                    color: route.params.textColor,
                                    fontSize: 20,
                                    margin: 10,
                                }}
                            >Description</Text>
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
                            >{item.descp}</Text>
                        </View>
                    </View>
                </View>
            )

        }

        return (
            <FlatList
                data={fincData && fincData.length > 0 ? fincData : incData}
                renderItem={renderItem}
                keyExtractor={item => item.id}
            />
        )

    }

    const handleEx = async () => {

        await fetch('http://10.0.2.2:80/expense_tracker_alpha/show_expense_user_id.php', {
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
                    if(item.amount>0)data.push(item);
                })

                if (flag == 0) {
                    alert('No Expense to Show.');
                } else {
                    SetExData(data);
                    SetInc(false);
                    SetEx(true);
                    SetBd(false);
                }

            }).catch((error) => {
                console.log('Error inside handleDeleteIncomeCat ' + error);
            });

    }

    const returnEx = () => {

        const renderItem = ({item}) => {
            return (
                <View
                    style={{
                        borderWidth: 2,
                        borderRadius: 5,
                        borderColor: route.params.color,
                        margin: 10,
                    }}
                >
                    <View
                        style={{
                            alignItems: 'center',
                            margin: 10,
                        }}
                    >
                        <Text
                            style={{
                                color: route.params.color,
                                fontSize: 30,
                                fontWeight: 'bold',
                            }}
                        >Expense {item.id}</Text>
                    </View>
                    <View
                        style={{
                            borderWidth: 2,
                            borderRadius: 5,
                            borderColor: route.params.color,
                            margin: 5,
                            flexDirection: 'row',
                        }}
                    >
                        <View
                            style={{
                                width: '35%',
                                borderColor: route.params.color,
                                borderRightWidth: 2,
                            }}
                        >
                            <Text
                                style={{
                                    color: route.params.textColor,
                                    fontSize: 20,
                                    margin: 10,
                                }}
                            >Amount</Text>
                        </View>
                        <View>
                            <Text
                                style={{
                                    color: route.params.textColor,
                                    fontSize: 20,
                                    margin: 10,
                                }}
                            >{item.amount}</Text>
                        </View>
                    </View>
                    <View
                        style={{
                            borderWidth: 2,
                            borderRadius: 5,
                            borderColor: route.params.color,
                            margin: 5,
                            flexDirection: 'row',
                        }}
                    >
                        <View
                            style={{
                                width: '35%',
                                borderColor: route.params.color,
                                borderRightWidth: 2,
                            }}
                        >
                            <Text
                                style={{
                                    color: route.params.textColor,
                                    fontSize: 20,
                                    margin: 10,
                                }}
                            >Category</Text>
                        </View>
                        <View>
                            <Text
                                style={{
                                    color: route.params.textColor,
                                    fontSize: 20,
                                    margin: 10,
                                }}
                            >{excatMap.get(item.category)}</Text>
                        </View>
                    </View>
                    <View
                        style={{
                            borderWidth: 2,
                            borderRadius: 5,
                            borderColor: route.params.color,
                            margin: 5,
                            flexDirection: 'row',
                        }}
                    >
                        <View
                            style={{
                                width: '35%',
                                borderColor: route.params.color,
                                borderRightWidth: 2,
                            }}
                        >
                            <Text
                                style={{
                                    color: route.params.textColor,
                                    fontSize: 20,
                                    margin: 10,
                                }}
                            >Date</Text>
                        </View>
                        <View>
                            <Text
                                style={{
                                    color: route.params.textColor,
                                    fontSize: 20,
                                    margin: 10,
                                }}
                            >{item.date_col}</Text>
                        </View>
                    </View>
                    <View
                        style={{
                            borderWidth: 2,
                            borderRadius: 5,
                            borderColor: route.params.color,
                            margin: 5,
                            flexDirection: 'row',
                        }}
                    >
                        <View
                            style={{
                                width: '35%',
                                borderColor: route.params.color,
                                borderRightWidth: 2,
                            }}
                        >
                            <Text
                                style={{
                                    color: route.params.textColor,
                                    fontSize: 20,
                                    margin: 10,
                                }}
                            >Day</Text>
                        </View>
                        <View>
                            <Text
                                style={{
                                    color: route.params.textColor,
                                    fontSize: 20,
                                    margin: 10,
                                }}
                            >{item.day_col}</Text>
                        </View>
                    </View>
                    <View
                        style={{
                            borderWidth: 2,
                            borderRadius: 5,
                            borderColor: route.params.color,
                            margin: 5,
                            flexDirection: 'row',
                        }}
                    >
                        <View
                            style={{
                                width: '35%',
                                borderColor: route.params.color,
                                borderRightWidth: 2,
                            }}
                        >
                            <Text
                                style={{
                                    color: route.params.textColor,
                                    fontSize: 20,
                                    margin: 10,
                                }}
                            >Mode</Text>
                        </View>
                        <View>
                            <Text
                                style={{
                                    color: route.params.textColor,
                                    fontSize: 20,
                                    margin: 10,
                                }}
                            >{mdMap.get(item.mode)}</Text>
                        </View>
                    </View>
                    <View
                        style={{
                            borderWidth: 2,
                            borderRadius: 5,
                            borderColor: route.params.color,
                            margin: 5,
                            flexDirection: 'row',
                        }}
                    >
                        <View
                            style={{
                                width: '35%',
                                borderColor: route.params.color,
                                borderRightWidth: 2,
                            }}
                        >
                            <Text
                                style={{
                                    color: route.params.textColor,
                                    fontSize: 20,
                                    margin: 10,
                                }}
                            >Description</Text>
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
                            >{item.descp}</Text>
                        </View>
                    </View>
                </View>
            )
        }

        return (
            <FlatList
                data={fexData && fexData.length > 0 ? fexData : exData}
                renderItem={renderItem}
                keyExtractor={item => item.id}
            />
        )

    }

    const handleBd = async () => {

        await fetch('http://10.0.2.2:80/expense_tracker_alpha/show_budget_user_id.php', {
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
                    alert('No Budget to Show.');
                } else {
                    SetBdData(data);
                    SetInc(false);
                    SetEx(false);
                    SetBd(true);
                }

            }).catch((error) => {
                console.log('Error inside handleDeleteIncomeCat ' + error);
            });

    }

    const returnBd = () => {

        const renderItem = ({ item }) => {

            return (
                <View
                    style={{
                        borderWidth: 2,
                        borderRadius: 5,
                        borderColor: route.params.color,
                        margin: 10,
                    }}
                >
                    <View
                        style={{
                            alignItems: 'center',
                            margin: 10,
                        }}
                    >
                        <Text
                            style={{
                                color: route.params.color,
                                fontSize: 30,
                                fontWeight: 'bold',
                            }}
                        >Budget {item.id}</Text>
                    </View>
                    <View
                        style={{
                            borderWidth: 2,
                            borderRadius: 5,
                            borderColor: route.params.color,
                            margin: 5,
                            flexDirection: 'row',
                        }}
                    >
                        <View
                            style={{
                                width: '35%',
                                borderColor: route.params.color,
                                borderRightWidth: 2,
                            }}
                        >
                            <Text
                                style={{
                                    color: route.params.textColor,
                                    fontSize: 20,
                                    margin: 10,
                                }}
                            >Name</Text>
                        </View>
                        <View>
                            <Text
                                style={{
                                    color: route.params.textColor,
                                    fontSize: 20,
                                    margin: 10,
                                }}
                            >{item.name}</Text>
                        </View>
                    </View>
                    <View
                        style={{
                            borderWidth: 2,
                            borderRadius: 5,
                            borderColor: route.params.color,
                            margin: 5,
                            flexDirection: 'row',
                        }}
                    >
                        <View
                            style={{
                                width: '35%',
                                borderColor: route.params.color,
                                borderRightWidth: 2,
                            }}
                        >
                            <Text
                                style={{
                                    color: route.params.textColor,
                                    fontSize: 20,
                                    margin: 10,
                                }}
                            >Amount</Text>
                        </View>
                        <View>
                            <Text
                                style={{
                                    color: route.params.textColor,
                                    fontSize: 20,
                                    margin: 10,
                                }}
                            >{item.amount}</Text>
                        </View>
                    </View>
                    <View
                        style={{
                            borderWidth: 2,
                            borderRadius: 5,
                            borderColor: route.params.color,
                            margin: 5,
                            flexDirection: 'row',
                        }}
                    >
                        <View
                            style={{
                                width: '35%',
                                borderColor: route.params.color,
                                borderRightWidth: 2,
                            }}
                        >
                            <Text
                                style={{
                                    color: route.params.textColor,
                                    fontSize: 20,
                                    margin: 10,
                                }}
                            >Start Date</Text>
                        </View>
                        <View>
                            <Text
                                style={{
                                    color: route.params.textColor,
                                    fontSize: 20,
                                    margin: 10,
                                }}
                            >{item.start_date}</Text>
                        </View>
                    </View>
                    <View
                        style={{
                            borderWidth: 2,
                            borderRadius: 5,
                            borderColor: route.params.color,
                            margin: 5,
                            flexDirection: 'row',
                        }}
                    >
                        <View
                            style={{
                                width: '35%',
                                borderColor: route.params.color,
                                borderRightWidth: 2,
                            }}
                        >
                            <Text
                                style={{
                                    color: route.params.textColor,
                                    fontSize: 20,
                                    margin: 10,
                                }}
                            >End Date</Text>
                        </View>
                        <View>
                            <Text
                                style={{
                                    color: route.params.textColor,
                                    fontSize: 20,
                                    margin: 10,
                                }}
                            >{item.end_date}</Text>
                        </View>
                    </View>
                    <View
                        style={{
                            borderWidth: 2,
                            borderRadius: 5,
                            borderColor: route.params.color,
                            margin: 5,
                            flexDirection: 'row',
                        }}
                    >
                        <View
                            style={{
                                width: '35%',
                                borderColor: route.params.color,
                                borderRightWidth: 2,
                            }}
                        >
                            <Text
                                style={{
                                    color: route.params.textColor,
                                    fontSize: 20,
                                    margin: 10,
                                }}
                            >Type</Text>
                        </View>
                        <View>
                            <Text
                                style={{
                                    color: route.params.textColor,
                                    fontSize: 20,
                                    margin: 10,
                                }}
                            >{item.type}</Text>
                        </View>
                    </View>
                </View>
            )
        }

        return (
            <FlatList
                data={fbdData && fbdData.length > 0 ? fbdData : bdData}
                renderItem={renderItem}
                keyExtractor={item => item.id}
            />
        )

    }

    return (
        <View
            style={{
                backgroundColor: route.params.mood,
                flex: 1,
            }}
        >
            {false ?
                <Button
                    title='test'
                    onPress={() => handleTest()}
                /> : null}
            <View
                style={{
                    flexDirection: 'row',
                    justifyContent: 'space-around',
                    margin: 10,
                }}
            >
                <View
                    style={inc ? {
                        backgroundColor: route.params.color,
                        borderColor: route.params.color,
                        borderRadius: 5,
                        borderWidth: 3,
                        width: '27%',
                        alignItems: 'center',
                    } : {
                        borderColor: route.params.color,
                        borderRadius: 5,
                        borderWidth: 3,
                        width: '27%',
                        alignItems: 'center',
                    }}
                >
                    <TouchableOpacity
                        onPress={() => handleInc()}
                    >
                        <Text
                            style={{
                                color: route.params.textColor,
                                fontSize: 20,
                                margin: 10,
                            }}
                        >Income</Text>
                    </TouchableOpacity>
                </View>
                <View
                    style={ex ? {
                        backgroundColor: route.params.color,
                        borderColor: route.params.color,
                        borderRadius: 5,
                        borderWidth: 3,
                        width: '27%',
                        alignItems: 'center',
                    } : {
                        borderColor: route.params.color,
                        borderRadius: 5,
                        borderWidth: 3,
                        width: '27%',
                        alignItems: 'center',
                    }}
                >
                    <TouchableOpacity
                        onPress={() => handleEx()}
                    >
                        <Text
                            style={{
                                color: route.params.textColor,
                                fontSize: 20,
                                margin: 10,
                            }}
                        >Expense</Text>
                    </TouchableOpacity>
                </View>
                <View
                    style={bd ? {
                        backgroundColor: route.params.color,
                        borderColor: route.params.color,
                        borderRadius: 5,
                        borderWidth: 3,
                        width: '27%',
                        alignItems: 'center',
                    } : {
                        borderColor: route.params.color,
                        borderRadius: 5,
                        borderWidth: 3,
                        width: '27%',
                        alignItems: 'center',
                    }}
                >
                    <TouchableOpacity
                        onPress={() => handleBd()}
                    >
                        <Text
                            style={{
                                color: route.params.textColor,
                                fontSize: 20,
                                margin: 10,
                            }}
                        >Budget</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View
                style={{
                    flexDirection: 'row',
                    marginTop: 10,
                    margin: 10,
                    borderColor: route.params.color,
                    borderWidth: 2,
                    borderRadius: 50,
                }}
            >
                {searchButton ?
                    <View
                        style={{
                            borderRadius: 50,
                            borderColor: route.params.color,
                            borderWidth: 2,
                        }}
                    >
                        <AntDesign
                            name='search1'
                            color={route.params.color}
                            size={40}
                        />
                    </View> :
                    <View
                        style={{
                            borderWidth: 2,
                            borderColor: route.params.color,
                            borderRadius: 50,
                        }}
                    >
                        <TouchableOpacity
                            onPress={() => handleBack()}
                        >
                            <AntDesign
                                name='arrowleft'
                                color={route.params.color}
                                size={40}
                            />
                        </TouchableOpacity>
                    </View>}
                <TextInput
                    style={{
                        color: route.params.textColor,
                        fontSize: 20,
                    }}
                    placeholder={'Search By Date (YYYY-MM-DD-)'}
                    onChangeText={handleSearch}
                    value={searchText}
                    placeholderTextColor={route.params.textColor}
                />
            </View>
            {inc ? returnInc() : null}
            {ex ? returnEx() : null}
            {bd ? returnBd() : null}
        </View>
    )
}

export default Report;