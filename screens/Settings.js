import React, { useState,useEffect } from 'react';
import {
    View, Text, ScrollView,
    TouchableOpacity, TextInput,
    Button
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';

//error error error
//database er command e vul ase
//shob gular delete1 e code change korte hobe

const Settings = ({ navigation, route }) => {

    useEffect(()=>{
        alert("Careful!!! any category or mode You delete, the associated data will also get deleted");
    },[]);

    const [addincomeCat,SetAddincomeCat] = useState('');
    const [deleteincomeCat,SetDeleteincomeCat] = useState('');
    const [addexpenseCat,SetAddexpenseCat] = useState('');
    const [deleteexpenseCat,SetDeleteexpenseCat] = useState('');
    const [addmodeCat,SetAddmodeCat] = useState('');
    const [deletemodeCat,SetDeletemodeCat] = useState('');
    
    const handleTest = () => {
        console.log(route.params);
    }

    const handleAddIncomeCat = async () => {

        if(handleNullAdd(addincomeCat))return ;
        if(handleLengthAdd(addincomeCat))return ;

        console.log(addincomeCat.length);

        //return ;
        
        await fetch('http://10.0.2.2:80/expense_tracker_alpha/add_income_cat.php',{
            method:'POST',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                name:addincomeCat,
                user_id:route.params.user_id,
            })
        }).then((response)=>response.json())
        .then((responseJson)=>{
            
            alert("Category Added");
            SetAddincomeCat('');

        }).catch((error)=>{
            console.log('new '+error);
        });
    }

    const handleDeleteIncomeCat = async () => {

        if(handleNullDel(deleteincomeCat))return ;
        if(handleLengthDel(deleteincomeCat))return ;
        if(deleteincomeCat == 'zero'){
            alert("Sorry You can not delete default zero category");
            return ;
        }
        
        await fetch('http://10.0.2.2:80/expense_tracker_alpha/show_income_cat_user_id.php',{
            method:'POST',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                //user_id:route.params.user_id,
                user_id:route.params.user_id,
            })
        }).then((response)=>response.json())
        .then((responseJson)=>{
            
            let flag = 0;

            responseJson.forEach(item=>{
                if(item.name==deleteincomeCat){
                    flag=1;
                    handleDeleteIncomeCat1();
                }
            })

            if(flag==0){
                alert('There is nothing to delete.');
            }

        }).catch((error)=>{
            console.log('Error inside handleDeleteIncomeCat '+error);
        });
    }

    const handleDeleteIncomeCat1 = async () =>{
        await fetch('http://10.0.2.2:80/expense_tracker_alpha/delete_income_cat_name_user_id.php',{
            method:'POST',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                name:deleteincomeCat,
                user_id:route.params.user_id,
            })
        }).then((response)=>response.json())
        .then((responseJson)=>{
            
            alert(responseJson);
            SetDeleteincomeCat('');

        }).catch((error)=>{
            console.log('Error inside handleDeleteIncomeCat1 '+error);
        });
    }

    const handleAddExpenseCat = async () => {
        if(handleNullAdd(addexpenseCat))return ;
        if(handleLengthAdd(addexpenseCat))return ;

        console.log(addexpenseCat.length+' '+addexpenseCat+' '+route.params.user_id);

        //return ;
        
        await fetch('http://10.0.2.2:80/expense_tracker_alpha/add_expense_cat.php',{
            method:'POST',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                name:addexpenseCat,
                user_id:route.params.user_id,
            })
        }).then((response)=>response.json())
        .then((responseJson)=>{
            
            alert("Category Added");
            SetAddexpenseCat('');

        }).catch((error)=>{
            console.log('new '+error);
        });
    }

    const handleDeleteExpenseCat = async () => {
        if(handleNullDel(deleteexpenseCat))return ;
        if(handleLengthDel(deleteexpenseCat))return ;
        if(deleteexpenseCat == 'zero'){
            alert("Sorry you can not delete default zero category.");
            return ;
        }
        
        await fetch('http://10.0.2.2:80/expense_tracker_alpha/show_expense_cat_user_id.php',{
            method:'POST',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                //user_id:route.params.user_id,
                user_id:route.params.user_id,
            })
        }).then((response)=>response.json())
        .then((responseJson)=>{
            
            let flag = 0;

            responseJson.forEach(item=>{
                if(item.name==deleteexpenseCat){
                    flag=1;
                    handleDeleteExpenseCat1();
                }
            })

            if(flag==0){
                alert('There is nothing to delete.')
            }

        }).catch((error)=>{
            console.log('Error inside handleDeleteIncomeCat '+error);
        });
    }

    const handleDeleteExpenseCat1 = async () => {
        await fetch('http://10.0.2.2:80/expense_tracker_alpha/delete_expense_cat_name_user_id.php',{
            method:'POST',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                name:deleteexpenseCat,
                user_id:route.params.user_id,
            })
        }).then((response)=>response.json())
        .then((responseJson)=>{
            
            alert(responseJson);
            SetDeleteexpenseCat('');

        }).catch((error)=>{
            console.log('Error inside handleDeleteIncomeCat1 '+error);
        });
    }

    const handleAddModeCat = async () => {
        if(handleNullAdd(addmodeCat))return ;
        if(handleLengthAdd(addmodeCat))return ;

        console.log(addmodeCat.length+' '+addmodeCat+' '+route.params.user_id);

        //return ;
        
        await fetch('http://10.0.2.2:80/expense_tracker_alpha/add_mode_cat.php',{
            method:'POST',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                name:addmodeCat,
                user_id:route.params.user_id,
            })
        }).then((response)=>response.json())
        .then((responseJson)=>{
            
            alert("Mode Added");
            SetAddmodeCat('');

        }).catch((error)=>{
            console.log('new '+error);
        });
    }
    
    const handleDeleteModeCat = async () => {
        if(handleNullDel(deletemodeCat))return ;
        if(handleLengthDel(deletemodeCat))return ;
        
        await fetch('http://10.0.2.2:80/expense_tracker_alpha/show_mode_cat_user_id.php',{
            method:'POST',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                //user_id:route.params.user_id,
                user_id:route.params.user_id,
            })
        }).then((response)=>response.json())
        .then((responseJson)=>{
            
            let flag = 0;

            responseJson.forEach(item=>{
                if(item.name==deletemodeCat){
                    flag=1;
                    handleDeleteModeCat1();
                }
            })

            if(flag==0){
                alert('There is nothing to delete.')
            }

        }).catch((error)=>{
            console.log('Error inside handleDeleteIncomeCat '+error);
        });
    }

    const handleDeleteModeCat1 = async () => {
        await fetch('http://10.0.2.2:80/expense_tracker_alpha/delete_mode_cat_name_user_id.php',{
            method:'POST',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                name:deletemodeCat,
                user_id:route.params.user_id,
            })
        }).then((response)=>response.json())
        .then((responseJson)=>{
            
            alert(responseJson);
            SetDeletemodeCat('');

        }).catch((error)=>{
            console.log('Error inside handleDeleteIncomeCat1 '+error);
        });
    }

    const handleNullAdd = (v) => {
        if(v==''){
            alert('Empty field can not be added.');
            return true;
        }
        return false;
    } 

    const handleNullDel = (v) => {
        if(v==''){
            alert('Empty field can not be deleted.');
            return true;
        }
        return false;
    }

    const handleLengthAdd = (v) => {
        if(v.length>35){
            alert('Name can not be greater than 35');
            return true;
        }
        return false;
    }

    const handleLengthDel = (v) => {
        if(v.length>35){
            alert('To be deleted Name can not be greater than 35');
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
            {false?<Button
                title='test'
                onPress={() => handleTest()}
            />:null}
            <View
                style={{
                    borderColor: route.params.color,
                    borderRadius: 100,
                    borderWidth: 4,
                    alignItems: 'center',
                    marginLeft: 120,
                    marginRight: 120,
                    margin: 20,
                }}
            >
                <Entypo
                    name='add-to-list'
                    color={route.params.color}
                    size={100}
                />
            </View>
            <View
                style={{
                    borderRadius: 5,
                    borderColor: route.params.color,
                    borderWidth: 2,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    margin: 10,
                    padding: 0,
                }}
            >
                <TextInput
                    style={{
                        color: route.params.textColor,
                        fontSize: 20,
                    }}
                    placeholder={'Add Income Category'}
                    onChangeText={SetAddincomeCat}
                    value={addincomeCat}
                    placeholderTextColor={route.params.textColor}
                />
                <View>
                    <TouchableOpacity
                        onPress={()=>handleAddIncomeCat()}
                    >
                        <AntDesign
                            name='plus'
                            color={route.params.color}
                            size={50}
                        />
                    </TouchableOpacity>
                </View>
            </View>
            <View
                style={{
                    borderRadius: 5,
                    borderColor: route.params.color,
                    borderWidth: 2,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    margin: 10,
                    padding: 0,
                }}
            >
                <TextInput
                    style={{
                        color: route.params.textColor,
                        fontSize: 20,
                    }}
                    placeholder={'Delete Income Category'}
                    onChangeText={SetDeleteincomeCat}
                    value={deleteincomeCat}
                    placeholderTextColor={route.params.textColor}
                />
                <View>
                    <TouchableOpacity
                        onPress={()=>handleDeleteIncomeCat()}
                    >
                        <AntDesign
                            name='minus'
                            color={route.params.color}
                            size={50}
                        />
                    </TouchableOpacity>
                </View>
            </View>
            <View
                style={{
                    borderRadius: 5,
                    borderColor: route.params.color,
                    borderWidth: 2,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    margin: 10,
                    padding: 0,
                }}
            >
                <TextInput
                    style={{
                        color: route.params.textColor,
                        fontSize: 20,
                    }}
                    placeholder={'Add Expense Category'}
                    onChangeText={SetAddexpenseCat}
                    value={addexpenseCat}
                    placeholderTextColor={route.params.textColor}
                />
                <View>
                    <TouchableOpacity
                        onPress={()=>handleAddExpenseCat()}
                    >
                        <AntDesign
                            name='plus'
                            color={route.params.color}
                            size={50}
                        />
                    </TouchableOpacity>
                </View>
            </View>
            <View
                style={{
                    borderRadius: 5,
                    borderColor: route.params.color,
                    borderWidth: 2,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    margin: 10,
                    padding: 0,
                }}
            >
                <TextInput
                    style={{
                        color: route.params.textColor,
                        fontSize: 20,
                    }}
                    placeholder={'Delete Expense Category'}
                    onChangeText={SetDeleteexpenseCat}
                    value={deleteexpenseCat}
                    placeholderTextColor={route.params.textColor}
                />
                <View>
                    <TouchableOpacity
                        onPress={()=>handleDeleteExpenseCat()}
                    >
                        <AntDesign
                            name='minus'
                            color={route.params.color}
                            size={50}
                        />
                    </TouchableOpacity>
                </View>
            </View>
            <View
                style={{
                    borderRadius: 5,
                    borderColor: route.params.color,
                    borderWidth: 2,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    margin: 10,
                    padding: 0,
                }}
            >
                <TextInput
                    style={{
                        color: route.params.textColor,
                        fontSize: 20,
                    }}
                    placeholder={'Add Mode Category'}
                    onChangeText={SetAddmodeCat}
                    value={addmodeCat}
                    placeholderTextColor={route.params.textColor}
                />
                <View>
                    <TouchableOpacity
                        onPress={()=>handleAddModeCat()}
                    >
                        <AntDesign
                            name='plus'
                            color={route.params.color}
                            size={50}
                        />
                    </TouchableOpacity>
                </View>
            </View>
            <View
                style={{
                    borderRadius: 5,
                    borderColor: route.params.color,
                    borderWidth: 2,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    margin: 10,
                    padding: 0,
                }}
            >
                <TextInput
                    style={{
                        color: route.params.textColor,
                        fontSize: 20,
                    }}
                    placeholder={'Delete Mode Category'}
                    onChangeText={SetDeletemodeCat}
                    value={deletemodeCat}
                    placeholderTextColor={route.params.textColor}
                />
                <View>
                    <TouchableOpacity
                        onPress={()=>handleDeleteModeCat()}
                    >
                        <AntDesign
                            name='minus'
                            color={route.params.color}
                            size={50}
                        />
                    </TouchableOpacity>
                </View>
            </View>
        </ScrollView>
    )

}

export default Settings;