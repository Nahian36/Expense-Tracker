import React from 'react';
import {View,Text} from 'react-native';
import { FlatList } from 'react-native-gesture-handler';

/*const DATA = [
    {id:1,amount:'100.80',type:'income'},
    {id:2,amount:'570.75',type:'expense'},
    {id:3,amount:'800.87',type:'income'},
];*/

const mapColor = new Map();
const mapSign = new Map();

mapColor.set('income','#43f773');
mapColor.set('expense','#eb281a');
mapSign.set('income','+');
mapSign.set('expense','-');


const Reciept = ({navigation,route}) => {

    const renderItem = ({item}) => {

        //console.log('inside renderItem'+' '+mapColor.get(item.type));

        return(
            <View
                style={{
                    backgroundColor:mapColor.get(item.type),
                    marginLeft:10,
                    marginRight:10,
                    marginTop:20,
                    padding:20,
                    borderRadius:4,
                }}
            >
                <Text
                    style={{
                        color:'black',
                        fontSize:20,
                    }}
                >{mapSign.get(item.type)} {item.type} {item.amount}</Text>
            </View>
        )
    }

    return (
        <FlatList
            data={route.params.DATA}
            renderItem={renderItem}
            keyExtractor={item=>item.id}
            style={{
                backgroundColor:'black',
            }}
        />
    )

}

export default Reciept;