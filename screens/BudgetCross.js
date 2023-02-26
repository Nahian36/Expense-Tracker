import React from 'react';
import {
    View, Text, Button,
    FlatList,
} from 'react-native';

const BudgetCross = ({ navigation, route }) => {

    const handleTest = () => {
        console.log(route.params.arr);



        //console.log()
    }

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
                    >Budget {item.name}</Text>
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
                        >Budget Estimated</Text>
                    </View>
                    <View>
                        <Text
                            style={{
                                color: route.params.textColor,
                                fontSize: 20,
                                margin: 10,
                            }}
                        >{item.flamt}</Text>
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
                        >Expense Till now</Text>
                    </View>
                    <View>
                        <Text
                            style={{
                                color: route.params.textColor,
                                fontSize: 20,
                                margin: 10,
                            }}
                        >{item.cur}</Text>
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
                        >Extra cost</Text>
                    </View>
                    <View>
                        <Text
                            style={{
                                color: route.params.textColor,
                                fontSize: 20,
                                margin: 10,
                            }}
                        >{parseFloat(item.cur)-parseFloat(item.flamt)}</Text>
                    </View>
                </View>
            </View>
        )
    }

    return (
        <View
            style={{
                backgroundColor:route.params.mood,
                flex:1,
            }}
        >
            {false?<Button
                title='test'
                onPress={()=>handleTest()}
            />:null}
            <FlatList
                data={route.params.arr}
                renderItem={renderItem}
                keyExtractor={item => item.name}
            />
        </View>
    )
}

export default BudgetCross;