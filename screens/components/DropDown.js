import React,{useState} from 'react';
import {
    View,Text,StyleSheet,
    Modal,TouchableOpacity,SafeAreaView,
    ScrollView,Dimensions
} from 'react-native';
//import { ScrollView } from 'react-native-gesture-handler';

//import { ModalPicker } from './components/ModalPicker';

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

const DropDown = (props) => {

    //console.log(props.title);

    const [chooseData,SetChooseData] = useState(props.title);
    const [isModalVisible,SetIsModalVisible] = useState(false);
    
    const changeModalVisibility = (bool) => {
        SetIsModalVisible(bool);
    }
    
    const setData = (option) => {
        SetChooseData(option);
    }

    const onPressItem = (option) => {
        changeModalVisibility(false);
        SetChooseData(option);
        //console.log('inside onPressItem '+option);
        if(props.title=='Category'){
            props.handleCategory(option);
        } else if(props.title=='Mode'){
            props.handleMode(option);
        } else if(props.title=='Report'){
            props.handleOption(option);
        }
    }

    const options = props.OPTIONS.map((option,index)=>{
        return (
            <TouchableOpacity
                style={styles.option}
                key={index}
                onPress={()=>onPressItem(option)}
            >
                <Text style={styles.modText}>
                    {option}
                </Text>
            </TouchableOpacity>
        )
    })

    return (
        <View style={styles.container}>
            <TouchableOpacity 
                style={styles.touchableOpacity}
                onPress={() => changeModalVisibility(true)}
            >
                <Text style={styles.text}>{chooseData}</Text>
            </TouchableOpacity>
            <Modal
                transparent={true}
                animationType='slide'
                visible={isModalVisible}
                onRequestClose={()=>changeModalVisibility(false)}
            >
                <TouchableOpacity
                    onPress={() => changeModalVisibility(false)}
                    style={styles.modContainer}
                >
                    <View style={styles.modal}>
                        <ScrollView>
                            {options}
                        </ScrollView>
                    </View>
                </TouchableOpacity>
            </Modal>
        </View>
    )

}

export default DropDown;

const styles = StyleSheet.create({
    container:{
        backgroundColor:'black',
        alignItems:'center',
        justifyContent:'center',
        padding:20,
    },
    text:{
        marginVertical:20,
        fontSize:25,
        color:'white',
    },
    touchableOpacity:{
        backgroundColor:'#563df5',
        alignSelf:'stretch',
        paddingHorizontal:20,
        borderRadius:5,
    },
    modContainer:{
        flex:1,
        alignItems:'center',
        justifyContent:'center',
    },
    modal:{
        backgroundColor:'white',
        borderRadius:10,
        width:WIDTH-20,
        
    },
    option:{
        alignItems:'flex-start',
    },
    modText:{
        margin:20,
        fontSize:20,
        fontWeight:'bold',
    }
});