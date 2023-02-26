import React, { useEffect, useState } from 'react';
import { View, Text, Button,
TouchableOpacity } from 'react-native';
import { PieChart } from 'react-native-chart-kit';
import { Dimensions } from "react-native";
import { handleColor } from './ColorManagement';
import AntDesign from 'react-native-vector-icons/AntDesign';

const screenWidth = Dimensions.get("window").width;

const MyPieChart = (props) => {

  const title = [
    'Income Weekly',
    'Income Yearly',
    'Expense Weekly',
    'Expense Yearly',
    'Profit Weekly',
    'Profit Yearly',
  ];

  const [DATA, SETDATA] = useState();
  const [visible, SetVisible] = useState(false);
  const [type,SetType] = useState(props.type);

  useEffect(() => {

    switch (type) {
      case 0:
        SetVisible(false);
        handleIncomeWeekly();
        break;
      case 1:
        SetVisible(false);
        handleIncomeYearly();
        break;
      case 2:
        SetVisible(false);
        handleExpenseWeekly();
        break;
      case 3:
        SetVisible(false);
        handleExpenseYearly();
        break;
      case 4:
        SetVisible(false);
        handleProfitWeekly();
        break;
      case 5:
        SetVisible(false);
        handleProfitYearly();
        break;
      default:
        alert('Huge Error in login of nav of Charts!!!!');
    }

  }, [type]);

  const handleIncomeWeekly = () => {
    let Arrobj = new Array();
    const colorMap = new handleColor();

    props.incomeWeekly.forEach(item => {

      let obj = {
        name: item.day_col,
        population: parseFloat(item.wamount),
        color: colorMap.get(item.day_col),
        legendFontColor: "#7F7F7F",
        legendFontSize: 15
      }

      Arrobj.push(obj);
    });

    SETDATA(Arrobj);
    SetVisible(true);
  }

  const handleIncomeYearly = () => {
    let Arrobj = new Array();
    const colorMap = handleColor();

    props.incomeYearly.forEach(item => {

      let obj = {
        name: item.month_col,
        population: parseFloat(item.yamount),
        color: colorMap.get(item.month_col),
        legendFontColor: "#7F7F7F",
        legendFontSize: 15
      }

      //console.log('inside useeffect : ' + obj);

      Arrobj.push(obj);
    });

    SETDATA(Arrobj);
    SetVisible(true);
  }

  const handleExpenseWeekly = () => {
    let Arrobj = new Array();
    const colorMap = new handleColor();

    props.expenseWeekly.forEach(item => {

      let obj = {
        name: item.day_col,
        population: parseFloat(item.wamount),
        color: colorMap.get(item.day_col),
        legendFontColor: "#7F7F7F",
        legendFontSize: 15
      }

      Arrobj.push(obj);
    });

    SETDATA(Arrobj);
    SetVisible(true);
  }

  const handleExpenseYearly = () => {
    let Arrobj = new Array();
    const colorMap = new handleColor();

    props.expenseYearly.forEach(item => {

      let obj = {
        name: item.month_col,
        population: parseFloat(item.yamount),
        color: colorMap.get(item.month_col),
        legendFontColor: "#7F7F7F",
        legendFontSize: 15
      }

      Arrobj.push(obj);
    });

    SETDATA(Arrobj);
    SetVisible(true);
  }

  const handleProfitWeekly = () => {

    SetVisible(false);
    alert('Sorry Negative values can not be shown in pie chart.');
    /*let Arrobj = new Array();
    const colorMap = new handleColor();

    props.profitWeekly.forEach(item => {

      let obj = {
        name: item.day_col,
        population: parseFloat(item.pamount),
        color: colorMap.get(item.day_col),
        legendFontColor: "#7F7F7F",
        legendFontSize: 15
      }

      Arrobj.push(obj);
    });

    SETDATA(Arrobj);
    SetVisible(true);*/
  }

  const handleProfitYearly = () => {

    SetVisible(false);
    alert('Sorry Negative values can not be shown in pie chart.');

    /*let Arrobj = new Array();
    const colorMap = new handleColor();

    props.profitYearly.forEach(item => {

      let obj = {
        name: item.month_col,
        population: parseFloat(item.pamount),
        color: colorMap.get(item.month_col),
        legendFontColor: "#7F7F7F",
        legendFontSize: 15
      }

      Arrobj.push(obj);
    });

    SETDATA(Arrobj);
    SetVisible(true);*/
  }

  const handleTest = () => {
    console.log(DATA);
  }

  const goLeft = () => {

    let vv = type;

    vv--;

    if(vv < 0){
      vv=5;
    }

    SetType(vv);
  }

  const goRight = () => {
    let vv = type;

    vv++;

    if(vv > 5){
      vv=0;
    }

    SetType(vv);
  }


  const chartConfig = {
    backgroundGradientFrom: "#1E2923",
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: "#08130D",
    backgroundGradientToOpacity: 0.5,
    color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
    strokeWidth: 2, // optional, default 3
    barPercentage: 0.5,
    useShadowColorFromDataset: false // optional
  };

  return (
    <View>
      {false ? <Button
        title='PieTest'
        onPress={() => handleTest()}
      /> : null}
      <View
        style={{
          alignItems:'center',
          justifyContent:'center',
          margin:10,
          marginBottom:0,
        }}
      >
        <Text
          style={{
            color:'grey',
            fontSize:20,
            fontWeight:'bold',
          }}
        >
          {title[type]}
        </Text>
      </View>
      {visible ? <PieChart
        style={{
          flex: 1,
          marginTop: 20,
          backgroundColor: props.mood,
        }}
        data={DATA}
        width={screenWidth}
        height={300}
        chartConfig={chartConfig}
        accessor={"population"}
        backgroundColor={"transparent"}
        paddingLeft={"15"}
        center={[10, 30]}
        absolute
      /> : null}
      {props.more?<View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-around',
          marginTop: 25,
        }}
      >
        <View
          style={{
            borderRadius: 5,
            borderWidth: 3,
            borderColor: props.color,
            paddingLeft: 30,
            paddingRight: 30,
            paddingTop: 2,
            paddingBottom: 2,
          }}
        >
          <TouchableOpacity
            onPress={() => goLeft()}
          >
            <AntDesign
              name='left'
              size={50}
              color={props.color}
            />
          </TouchableOpacity>
        </View>
        <View
          style={{
            borderRadius: 5,
            borderWidth: 3,
            borderColor: props.color,
            paddingLeft: 30,
            paddingRight: 30,
            paddingTop: 2,
            paddingBottom: 2,
          }}
        >
          <TouchableOpacity
            onPress={() => goRight()}
          >
            <AntDesign
              name='right'
              size={50}
              color={props.color}
            />
          </TouchableOpacity>
        </View>
      </View>:null}
    </View>
  )
}

export default MyPieChart;