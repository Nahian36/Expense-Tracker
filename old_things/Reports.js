import React,{useState,useEffect} from 'react';
import {View,Text,Button,
ScrollView,TouchableOpacity} from 'react-native';

import DropDown from './components/DropDown';
import MyBarChart from './components/MyBarChart';
import MyPieChart from './components/MyPieChart';
import MyLineChart from './components/MyLineChart';
import {handleMaps} from './components/MapManagement';

const Reports = () => {

    const [option,SetOption] = useState('Report');
    const [data,SetData] = useState();
    const [visible,SetVisible] = useState(false);

    const handleOption = (voption) => {
        SetOption(voption);
        //console.log(voption);

        if(voption=='Weekly'){

            fetch('http://10.0.2.2:80/expense_tracker_alpha/show_weekly_alpha.php')
            .then((response)=>response.json())
            .then((responseJson)=>{

                const dataMap = handleMaps('Weekly');
                //console.log(dataMap);

                responseJson.forEach(element=>{

                    const vday = element.day_col;
                    const vamt = parseFloat(element.amount);
                    let prev = dataMap.get(vday);

                    if(element.type=='income'){
                        prev+=vamt;
                    } else if (element.type=='expense'){
                        prev-=vamt;
                    }

                    prev = Math.round(prev*1000)/1000;
                    dataMap.set(vday,prev);
                    //console.log(dataMap);
                })
                
                //console.log(dataMap);
                SetData(dataMap);
                SetVisible(true);

            }).catch((error)=>{
                console.log('inside Report '+error);
            })
            
        } else if(voption=='Monthly'){

        } else if(voption=='Yearly'){

        } else {
            console.log('Some error has been occured in Report Dropdown.');
        }
    }

    const handleTest = () => {

        fetch('http://10.0.2.2:80/expense_tracker_alpha/show_weekly_alpha.php')
        .then((response)=>response.json())
        .then((responseJson)=>{

            console.log(responseJson);

        }).catch((error)=>{
            console.log('inside Report testing '+error);
        })

    }

    return (
        <ScrollView
            style={{
                flex:1,
                backgroundColor:'black',
            }}
        >
            <Button
                title='test'
                onPress={()=>handleTest()}
            />
            <DropDown
                title="Report"
                OPTIONS={['Weekly','Monthly','Yearly']}
                handleOption={handleOption}
            />
            <View style={{backgroundColor:'white',}}>
            {visible?
            <MyBarChart
                data={data}
            />:null}
            {visible?
            <MyLineChart
                data={data}
            />:null}
            {visible?
            <MyPieChart
                data={data}
            />
            :null}
            </View>
        </ScrollView>
    )

}

export default Reports;