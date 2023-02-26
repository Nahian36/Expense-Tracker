import React,{useState} from 'react';
import {View,Text,
    TouchableOpacity,Button} from 'react-native';
import CalendarPicker from 'react-native-calendar-picker';

const Calender = (props) => {

    const [selectedStartDate,SetSelectedStartDate] = useState();
    const [range,SetRange] = useState(props.range);
    const [date,SetDate] = useState('Click to Set Date.');
    const [startDate,SetStartDate] = useState('Click to Set Start Date.');
    const [startBool,SetStartBool] = useState(false);
    const [endDate,SetEndDate] = useState('Click to Set End Date.');
    const [endBool,SetEndBool] = useState(false);

    const cstr = 'Set & Close';

    const handleTest = () => {

    }

    const handleDateChange = (date) => {

        console.log(date.toString());

        SetSelectedStartDate(date);
    }

    const handleSinglePress = () => {
        if(selectedStartDate){
            SetDate(selectedStartDate.toString());
        } else {
            alert('Please Select a Date first from the Screen above.');
        }
    }

    const handleStartPress = () => {
        if(selectedStartDate){
            SetStartDate(selectedStartDate.toString());
        } else {
            alert('Please Select a Date first from the Screen above.');
        }
    }

    const handleEndPress = () => {
        if(selectedStartDate){
            SetEndDate(selectedStartDate.toString());
        } else {
            alert('Please Select a Date first from the Screen above.');
        }
    }

    const returnSingle = () => {

        return (
            <View
                style={{
                    borderRadius:5,
                    borderColor:'#563df5',
                    borderWidth:2,
                    margin:10,
                    alignItems:'center',
                }}
            >
                <TouchableOpacity
                    onPress={()=>handleSinglePress()}
                >
                    <Text
                        style={{
                            color:'white',
                            fontSize:20,
                            margin:10,
                        }}
                    >{date}</Text>
                </TouchableOpacity>
            </View>
        )
        
    }

    const returnRange = () => {

        return (
            <View>
                <View
                    style={{
                        borderRadius:5,
                        borderColor:'#563df5',
                        borderWidth:2,
                        margin:10,
                        alignItems:'center',
                    }}
                >
                    <TouchableOpacity
                    onPress={()=>handleStartPress()}
                    >
                        <Text
                            style={{
                                color:'white',
                                fontSize:20,
                                margin:10,
                            }}
                        >{startDate}</Text>
                    </TouchableOpacity>
                </View>
                <View
                    style={{
                        borderRadius:5,
                        borderColor:'#563df5',
                        borderWidth:2,
                        marginTop:0,
                        margin:10,
                        alignItems:'center',
                    }}
                >
                    <TouchableOpacity
                        onPress={()=>handleEndPress()}
                    >
                        <Text
                            style={{
                                color:'white',
                                fontSize:20,
                                margin:10,
                            }}
                        >{endDate}</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )

    }

    const handleSingle = () =>{

        if(props.range==true){
            alert('Only Range Input is allowed.');
            return ;
        }

        SetRange(false);
    }

    const handleRange = () => {

        if(props.range==false){
            alert('Only Single Input is allowed.');
            return ;
        }

        SetRange(true);
    }

    const handleSetClose = () => {

        if(range==true){

            if(startDate=='Click to Set Start Date.'||
            endDate=='Click to Set End Date.'){
                alert('Set both start & end date');
                return ;
            }

            if( (new Date(endDate).getTime()) < 
            (new Date(startDate).getTime()) ){
                alert('Choose end date greater than start date.');
                return ;
            }

            props.handleSetClose(startDate,endDate);
        } else if(range==false) {
            
            if(date=='Click to Set Date.'){
                alert('Set a Date first.');
                return ;
            }

            props.handleSetClose(date);
        }

    }

    return (
        <View
            style={{
                backgroundColor:'black',
                flex:1,
                margin:5,
                marginTop:0,
            }}
        >
            {false?<Button
                title='test'
                onPress={()=>handleTest()}
            />:null}
            <CalendarPicker
                onDateChange={handleDateChange}
                textStyle={{
                    color:'white',
                }}
                customDatesStyles={[
                    {textStyle:{color:'white'}},
                ]}
            />
            <View
                style={{
                    flexDirection:'row',
                    alignItems:'center',
                    justifyContent:'space-around',
                }}
            >
                <View
                    style={range?{
                        borderWidth:4,
                        borderColor:'#563df5',
                        borderRadius:5,
                        width:'40%',
                        alignItems:'center',
                        justifyContent:'center',
                    }:{
                        backgroundColor:'#563df5',
                        borderWidth:4,
                        borderColor:'#563df5',
                        borderRadius:5,
                        width:'40%',
                        alignItems:'center',
                        justifyContent:'center',
                    }}
                >
                    <TouchableOpacity
                        onPress={()=>handleSingle()}
                    >
                        <Text
                            style={{
                                color:'white',
                                fontSize:20,
                            }}
                        >Single</Text>
                    </TouchableOpacity>
                </View>
                <View
                    style={range?{
                        backgroundColor:'#563df5',
                        borderWidth:4,
                        borderColor:'#563df5',
                        borderRadius:5,
                        width:'40%',
                        alignItems:'center',
                        justifyContent:'center',
                    }:{
                        borderWidth:4,
                        borderColor:'#563df5',
                        borderRadius:5,
                        width:'40%',
                        alignItems:'center',
                        justifyContent:'center',
                    }}
                >
                    <TouchableOpacity
                        onPress={()=>handleRange()}
                    >
                        <Text
                            style={{
                                color:'white',
                                fontSize:20,
                            }}
                        >Range</Text>
                    </TouchableOpacity>
                </View>
            </View>
            {range?
            returnRange()
            :returnSingle()}
            <View
                style={{
                    backgroundColor:'#563df5',
                    borderRadius:10,
                    justifyContent:'center',
                    alignItems:'center',
                    marginLeft:120,
                    marginRight:120,
                }}
            >
                <TouchableOpacity
                    onPress={()=>handleSetClose()}
                >
                    <Text
                        style={{
                            color:'white',
                            fontSize:20,
                            margin:10,
                        }}
                    >{cstr}</Text>
                </TouchableOpacity>
            </View>
        </View>
    )

} 

export default Calender;