import React,{useState} from 'react';
import {View,Text,Button,LogBox,
ScrollView,
TouchableOpacity} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MIcon from 'react-native-vector-icons/MaterialCommunityIcons';

LogBox.ignoreAllLogs();

const Configure = ({navigation,route}) => {

    const [fill1,SetFill1] = useState(route.params.bar);
    const [fill2,SetFill2] = useState(route.params.pie);
    const [fill3,SetFill3] = useState(route.params.line); 

    let fc1 = 0;
    let fc2 = 0;
    let fc3 = 0;

    const handleTest = () => {
        console.log(route.params.textColor);
    }
    
    const handleColor = (vc) => {
        route.params.handleColor(vc);
    }

    const handleMood = (vm) => {
        if(vm=='black'){
            route.params.handleMood('black');
            route.params.handleTextColor('white');
            //console.log('Atiq is here');
        } else if(vm=='white'){
            route.params.handleMood('white');
            route.params.handleTextColor('black');
        }
    }

    const handleChart = (vch) => {

        if(vch=='bar'){
            if(fc1%2==0){
                SetFill1(true);
                route.params.handleBar(true);
                fc1++;
            } else {
                SetFill1(false);
                route.params.handleBar(false);
                fc1++;
            }
        } else if(vch=='pie'){
            if(fc2%2==0){
                SetFill2(true);
                route.params.handlePie(true);
                fc2++;
            } else {
                SetFill2(false);
                route.params.handlePie(false);
                fc2++;
            }
        } else if(vch=='line'){
            if(fc3%2==0){
                SetFill3(true);
                route.params.handleLine(true);
                fc3++;
            } else {
                SetFill3(false);
                route.params.handleLine(false);
                fc3++;
            }
        }

    }

    return (
        <ScrollView
            style={{
                flex:1,
                backgroundColor:route.params.mood,
            }}
        >
            <View
                style={{
                    borderColor:route.params.color,
                    borderWidth:3,
                    borderRadius:100,
                    justifyContent:'center',
                    alignItems:'center',
                    paddingTop:5,
                    paddingBottom:10,
                    marginLeft:120,
                    marginRight:120,
                    margin:50,
                }}
            >
                <MIcon
                  name='card-bulleted-settings-outline'
                  size={100}
                  color={route.params.color}
                />
            </View>
            <View
                style={{
                    margin:10,
                }}
            >
                <View
                    style={{
                        alignItems:'center',
                        justifyContent:'center',
                    }}
                >
                <Text
                    style={{
                        color:route.params.textColor,
                        fontSize:20,
                        fontWeight:'bold',
                    }}
                >--Select A Color--</Text>
                </View>
                <View
                    style={{
                        flexDirection:'row',
                        justifyContent:'space-around',
                        margin:10,
                    }}
                >
                    <TouchableOpacity
                        onPress={()=>handleColor('#a2f25c')}
                        style={{
                           width:80,
                           height:80, 
                        }}
                    >
                    <View
                        style={{
                            backgroundColor:'#a2f25c',
                            width:'100%',
                            height:'100%',
                        }}
                    >
                    </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={()=>handleColor('#563df5')}
                        style={{
                            width:80,
                            height:80,
                        }}
                    >
                    <View
                        style={{
                            backgroundColor:'#563df5',
                            width:'100%',
                            height:'100%',
                        }}
                    >
                    </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={()=>handleColor('#f4511e')}
                        style={{
                            width:80,
                            height:80,
                        }}
                    >
                    <View
                        style={{
                            backgroundColor:'#f4511e',
                            width:'100%',
                            height:'100%',
                        }}
                    >
                    </View>
                    </TouchableOpacity>    
                </View>
            </View>
            <View>
                <View
                    style={{
                        justifyContent:'center',
                        alignItems:'center',
                    }}
                >
                    <Text
                        style={{
                            color:route.params.textColor,
                            fontWeight:'bold',
                            fontSize:20,
                        }}
                    >--Select A Mood--</Text>
                </View>
                <View
                    style={{
                        flexDirection:'row',
                        justifyContent:'space-between',
                        marginLeft:25,
                        marginRight:25,
                        margin:10,
                    }}
                >
                <View
                    style={{
                        width:'40%',
                        borderWidth:4,
                        borderColor:route.params.color,
                    }}
                >
                    <TouchableOpacity
                        onPress={()=>handleMood('white')}
                    >
                        <View
                            style={{
                                flexDirection:'row',
                                justifyContent:'space-between',
                                margin:10,
                                alignItems:'center',
                            }}
                        >
                        <FontAwesome
                            name='sun-o'
                            size={50}
                            color={route.params.color}
                        />
                        <Text
                            style={{
                                color:route.params.textColor,
                                fontSize:20,
                                marginRight:15,
                            }}
                        >Day</Text>
                        </View>
                    </TouchableOpacity>
                </View>
                <View
                    style={{
                        width:'40%',
                        borderWidth:4,
                        borderColor:route.params.color,
                    }}
                >
                    <TouchableOpacity
                        onPress={()=>handleMood('black')}
                    >
                        <View
                            style={{
                                flexDirection:'row',
                                justifyContent:'space-between',
                                margin:10,
                                alignItems:'center',
                            }}
                        >
                        <FontAwesome
                            name='moon-o'
                            size={50}
                            color={route.params.color}
                        />
                        <Text
                            style={{
                                color:route.params.textColor,
                                fontSize:20,
                                marginRight:0,
                            }}
                        >Night</Text>
                        </View>
                    </TouchableOpacity>
                </View>
                </View>
            </View>
            {false?<View>
                <View
                    style={{
                        flexDirection:'row',
                        alignItems:'center',
                        margin:20,
                    }}
                >
                    <View
                        style={fill1?{
                            backgroundColor:route.params.color,
                            borderColor:route.params.color,
                            borderRadius:5,
                            borderWidth:4,
                        }:{
                            borderColor:route.params.color,
                            borderRadius:5,
                            borderWidth:4,
                        }}
                    >
                        <TouchableOpacity
                            onPress={()=>handleChart('bar')}
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
                            color:route.params.textColor,
                            fontSize:20,
                            margin:10,
                        }}
                    > - BarChart</Text>
                </View>
                <View
                    style={{
                        flexDirection:'row',
                        alignItems:'center',
                        margin:20,
                    }}
                >
                    <View
                        style={fill2?{
                            backgroundColor:route.params.color,
                            borderColor:route.params.color,
                            borderRadius:5,
                            borderWidth:4,
                        }:{
                            borderColor:route.params.color,
                            borderRadius:5,
                            borderWidth:4,
                        }}
                    >
                        <TouchableOpacity
                            onPress={()=>handleChart('pie')}
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
                            color:route.params.textColor,
                            fontSize:20,
                            margin:10,
                        }}
                    > - PieChart</Text>
                </View>
                <View
                    style={{
                        flexDirection:'row',
                        alignItems:'center',
                        margin:20,
                    }}
                >
                    <View
                        style={fill3?{
                            backgroundColor:route.params.color,
                            borderColor:route.params.color,
                            borderRadius:5,
                            borderWidth:4,
                        }:{
                            borderColor:route.params.color,
                            borderRadius:5,
                            borderWidth:4,
                        }}
                    >
                        <TouchableOpacity
                            onPress={()=>handleChart('line')}
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
                            color:route.params.textColor,
                            fontSize:20,
                            margin:10,
                        }}
                    > - LineChart</Text>
                </View>
            </View>:null}
            {false?
            <Button
                title='test'
                onPress={()=>handleTest()}
            />:null}
        </ScrollView>
    )
}

export default Configure;