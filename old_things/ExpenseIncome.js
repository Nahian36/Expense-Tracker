import React,{useState} from 'react';
import {View,Text,TextInput,Button,
    KeyboardAvoidingView,TouchableOpacity,
    ScrollView
} from 'react-native';

import DropDown from './components/DropDown';
import DateDay from './components/DateDay';

const monthMap = new Map();
monthMap.set('Jan','1');
monthMap.set('Feb','2');
monthMap.set('Mar','3');
monthMap.set('Apr','4');
monthMap.set('May','5');
monthMap.set('Jun','6');
monthMap.set('Jul','7');
monthMap.set('Aug','8');
monthMap.set('Sep','9');
monthMap.set('Oct','10');
monthMap.set('Nov','11');
monthMap.set('Dec','12');

const ExpenseIncome = ({navigation,route}) => {

    const [amount,SetAmount] = useState();
    const [note,SetNote] = useState();
    const [category,SetCategory] = useState();
    const [mode,SetMode] = useState();
    const [type,SetType] = useState();
    const [date_col,SetDate_col] = useState();

    const handleTest = () => {

        //console.log(route.params.type);
        const vd = new Date('2021','3','1');
        console.log(vd.toDateString());

    }

    const handleCategory = (vcategory) => {
        SetCategory(vcategory);
        //console.log(vcategory);
    }

    const handleMode = (vmode) => {
        SetMode(vmode);
        //console.log(vmode);
    }

    const handleDate_col = (vdate_col) => {
        SetDate_col(vdate_col);
        //console.log('inside ExpenseIncome '+vdate_col);
    }

    const handleSave = () => {
        //console.log(amount+' '+route.params.type+' '+mode+' '+category+' '+note+' '+date_col);
        const vday = (date_col[0]+date_col[1]+date_col[2]);
        const vmon = (date_col[4]+date_col[5]+date_col[6]);
        const vdayn = (date_col[8]+date_col[9]);
        const vyear = (date_col[11]+date_col[12]+date_col[13]+date_col[14]);

        const vdate_col = vyear+'-'+monthMap.get(vmon)+'-'+vdayn;
        //console.log(vdate_col);

        fetch('http://10.0.2.2:80/expense_tracker_alpha/insert_alpha.php',{
            method:'POST',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                amount:amount,
                type:route.params.type,
                mode:mode,
                category:category,
                note:note,
                date_col:vdate_col,
                day_col:vday,
            })
        }).then((response)=>response.json())
        .then((responseJson)=>{
            alert(responseJson);
        }).catch((error)=>{
            console.log('new '+error);
        });
    }

    return (
        
            <ScrollView
                style={{
                    flex:1,
                    backgroundColor:'black',
                }}
            >
            <TextInput
                placeholder="Amount"
                keyboardType="numeric"
                onChangeText={SetAmount}
                value={amount}
                placeholderTextColor="white"
                color="white"
            />
            <DropDown 
                title="Category"
                OPTIONS={['Clothing','Food','Fuel','Movie','Rent']}
                handleCategory = {handleCategory}
            />
            <DateDay handleDate_col={handleDate_col}/>
            <DropDown 
                title="Mode"
                OPTIONS={['Cash','Credit Card','Debit Card','Net Banking','Cheque']}
                handleMode={handleMode}
            />
            <TextInput
                placeholder="Note"
                onChangeText={SetNote}
                value={note}
                multiline={true}
                placeholderTextColor="white"
                color="white"
            />
            
            <View
                style={{
                    backgroundColor:'#563df5',
                    alignItems:'center',
                    padding:20,
                    margin:10,
                    marginLeft:100,
                    marginRight:100,
                    borderRadius:10,
                }}
            >
                <TouchableOpacity
                    onPress={handleSave}
                >
                    <Text style={{
                        color:'white',
                        fontSize:20,
                    }}>
                        Save
                    </Text>
                </TouchableOpacity>
            </View>
            <Button title="test" onPress={()=>handleTest()}/>
            </ScrollView>
        
    )

}

export default ExpenseIncome;