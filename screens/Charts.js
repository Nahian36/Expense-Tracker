import React, { useState, useEffect } from 'react';
import {
    View, Text, ScrollView,
    TouchableOpacity, Button,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MyPieChart from './components/MyPieChart';
import MyLineChart from './components/MyLineChart';
import MyBarChart from './components/MyBarChart';


const Charts = ({ navigation, route }) => {

    const [incomeWeekly, SetIncomeWeekly] = useState();
    const [incomeYearly, SetIncomeYearly] = useState();
    const [expenseWeekly, SetExpenseWeekly] = useState();
    const [expenseYearly, SetExpenseYearly] = useState();
    const [profitWeekly,SetProfitWeekly] = useState();
    const [profitYearly,SetProfitYearly] = useState();

    useEffect(() => {
        fetchIncomeWeekly();
        fetchIncomeYearly();
        fetchExpenseWeekly();
        fetchExpenseYearly();
        fetchProfitWeekly();
        fetchProfitYearly();
    }, []);

    const fetchIncomeWeekly = async () => {
        await fetch('http://10.0.2.2:80/expense_tracker_alpha/income_weekly.php', {
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
                    alert('No weekly Income to Show.');
                } else {
                    SetIncomeWeekly(data);
                }

            }).catch((error) => {
                console.log('Error inside handleIncomeWeekly ' + error);
            });
    }

    const fetchIncomeYearly = async () => {
        await fetch('http://10.0.2.2:80/expense_tracker_alpha/income_yearly.php', {
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
                    alert('No yearly Income to Show.');
                } else {
                    SetIncomeYearly(data);
                }

            }).catch((error) => {
                console.log('Error inside handleIncomeWeekly ' + error);
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
                    alert('No weekly Expense to Show.');
                } else {
                    SetExpenseWeekly(data);
                }

            }).catch((error) => {
                console.log('Error inside handleIncomeWeekly ' + error);
            });
    }

    const fetchExpenseYearly = async () => {
        await fetch('http://10.0.2.2:80/expense_tracker_alpha/expense_yearly.php', {
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
                    alert('No yearly Expense to Show.');
                } else {
                    SetExpenseYearly(data);
                }

            }).catch((error) => {
                console.log('Error inside handleIncomeWeekly ' + error);
            });
    }

    const fetchProfitWeekly = async () => {
        await fetch('http://10.0.2.2:80/expense_tracker_alpha/profit_weekly.php', {
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
                    alert('No weekly Profit to Show.');
                } else {
                    SetProfitWeekly(data);
                }

            }).catch((error) => {
                console.log('Error inside handleProfitWeekly ' + error);
            });
    }

    const fetchProfitYearly = async () => {
        await fetch('http://10.0.2.2:80/expense_tracker_alpha/profit_yearly.php', {
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
                    alert('No yearly Profit to Show.');
                } else {
                    SetProfitYearly(data);
                }

            }).catch((error) => {
                console.log('Error inside handleProfitYearly ' + error);
            });
    }

    const [pie, SetPie] = useState(false);
    const [bar, SetBar] = useState(false);
    const [line, SetLine] = useState(false);


    const handleTest = () => {
        /*console.log('income Weekly');
        console.log(incomeWeekly);
        console.log('income Yearly');
        console.log(incomeYearly);
        console.log('expense Weekly');
        console.log(expenseWeekly);
        console.log('expense Yearly');
        console.log(expenseYearly);*/
        //makeProfitData();
        //console.log(profitWeekly);
        console.log(profitYearly);

        for(let i=0;i<7;i++)
        {
            //console.log(i+' '+incomeWeekly[i].day_col);
        }
    }


    const handlePressPie = () => {

        if(handleNull()){
            alert("Sorry Shortage of Data");
            return ;
        }

        SetBar(false);
        SetLine(false);

        if (pie == false) {
            SetPie(true);
        } else {
            SetPie(false);
        }

    }

    const handlePressBar = () => {

        if(handleNull()){
            alert("Sorry Shortage of Data");
            return ;
        }

        SetPie(false);
        SetLine(false);

        if (bar == false) {
            SetBar(true);
        } else {
            SetBar(false);
        }
    }

    const handlePressLine = () => {

        if(handleNull()){
            alert("Sorry Shortage of Data");
            return ;
        }

        SetPie(false);
        SetBar(false);

        if (line == false) {
            SetLine(true);
        } else {
            SetLine(false);
        }

    }

    const handleNull = () => {
        if(!expenseWeekly||
           !expenseYearly||
           !incomeWeekly||
           !incomeYearly||
           !profitWeekly||
           !profitYearly){
               return true;
           }

        return false;
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
                    marginTop: 20,
                }}
            >
                <View
                    style={pie ? {
                        backgroundColor: route.params.color,
                        borderColor: route.params.color,
                        borderWidth: 3,
                        borderRadius: 5,
                    } : {
                        borderColor: route.params.color,
                        borderWidth: 3,
                        borderRadius: 5,
                    }}
                >
                    <TouchableOpacity
                        onPress={() => handlePressPie()}
                    >
                        <View
                            style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                margin: 5,
                            }}
                        >
                            <AntDesign
                                name='piechart'
                                size={50}
                                color={route.params.textColor}
                            />
                            <Text
                                style={{
                                    color: route.params.textColor,
                                    fontWeight: 'bold',
                                    marginLeft: 5,
                                }}
                            >PieChart</Text>
                        </View>
                    </TouchableOpacity>
                </View>
                <View
                    style={bar ? {
                        backgroundColor: route.params.color,
                        borderColor: route.params.color,
                        borderWidth: 3,
                        borderRadius: 5,
                    } : {
                        borderColor: route.params.color,
                        borderWidth: 3,
                        borderRadius: 5,
                    }}
                >
                    <TouchableOpacity
                        onPress={() => handlePressBar()}
                    >
                        <View
                            style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                margin: 5,
                            }}
                        >
                            <AntDesign
                                name='barschart'
                                size={50}
                                color={route.params.textColor}
                            />
                            <Text
                                style={{
                                    color: route.params.textColor,
                                    fontWeight: 'bold',
                                    marginLeft: 5,
                                }}
                            >BarChart</Text>
                        </View>
                    </TouchableOpacity>
                </View>
                <View
                    style={line ? {
                        backgroundColor: route.params.color,
                        borderColor: route.params.color,
                        borderWidth: 3,
                        borderRadius: 5,
                    } : {
                        borderColor: route.params.color,
                        borderWidth: 3,
                        borderRadius: 5,
                    }}
                >
                    <TouchableOpacity
                        onPress={() => handlePressLine()}
                    >
                        <View
                            style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                margin: 5,
                            }}
                        >
                            <AntDesign
                                name='linechart'
                                size={50}
                                color={route.params.textColor}
                            />
                            <Text
                                style={{
                                    color: route.params.textColor,
                                    fontWeight: 'bold',
                                    marginLeft: 5,
                                }}
                            >LineChart</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
            {pie?
            <MyPieChart
                incomeWeekly={incomeWeekly}
                incomeYearly={incomeYearly}
                expenseWeekly={expenseWeekly}
                expenseYearly={expenseYearly}
                profitWeekly={profitWeekly}
                profitYearly={profitYearly}
                color={route.params.color}
                mood={route.params.mood}
                textColor={route.params.textColor}
                more={true}
                type={0}
            />:null}
            {line?
            <MyLineChart
                incomeWeekly={incomeWeekly}
                incomeYearly={incomeYearly}
                expenseWeekly={expenseWeekly}
                expenseYearly={expenseYearly}
                profitWeekly={profitWeekly}
                profitYearly={profitYearly}
                color={route.params.color}
                mood={route.params.mood}
                textColor={route.params.textColor}
            />:null}
            {bar?
            <MyBarChart
                incomeWeekly={incomeWeekly}
                incomeYearly={incomeYearly}
                expenseWeekly={expenseWeekly}
                expenseYearly={expenseYearly}
                profitWeekly={profitWeekly}
                profitYearly={profitYearly}
                color={route.params.color}
                mood={route.params.mood}
                textColor={route.params.textColor}
            />:null}
        </ScrollView>
    )
}

export default Charts;