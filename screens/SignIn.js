import React,{useState} from 'react';
import {
    View, Text, ScrollView,
    TextInput,TouchableOpacity,
    Button,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {hiding} from './components/Cryptic';

const SignIn = ({ navigation, route }) => {

    const [userName,SetUserName] = useState('');
    const [email,SetEmail] = useState('');
    const [pass,SetPass] = useState('');
    const [errtxtEmail,SetErrtxtEmail] = useState('');
    const [errtxtPass,SetErrtxtPass] = useState('');
    const [errtxtUser,SetErrtxtUser] = useState('');
    const [ava,SetAva] = useState(false);

    const validateEmail = (mail) => {
        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)){
          return (true);
        }
        
        return (false);
    }

    const handleRegister = async () => {

        if(handleNullCheck())return ;
        if(handleLengthCheck())return ;
        if(validateEmail(email)==false){
            SetErrtxtEmail('Invalid Email');
            return ;
        }
        
        await fetch('http://10.0.2.2:80/expense_tracker_alpha/show_user.php')
        .then((response)=>response.json())
        .then((responseJson)=>{

            SetErrtxtEmail('');
            SetErrtxtUser('');
            let flag=0;

            responseJson.forEach(item=>{
                
                if(hiding("decrypt",item.name)==userName){
                    handleNotAvailable('user');
                    flag=1;
                    //console.log('bujhi na kisu '+flag);
                }
                if(hiding("decrypt",item.email)==email){
                    handleNotAvailable('email');
                    flag=1;
                }
            })

            if(flag==0)handleRegister2();

        }).catch((error)=>{
            console.log('inside Signing '+error);
        });
        
        return ;

        

    }

    const handleRegister2 = async () => {
        SetErrtxtEmail('');
        SetErrtxtPass('');
        SetErrtxtUser('');

        //console.log('atiq should be here456.');

        await fetch('http://10.0.2.2:80/expense_tracker_alpha/insert_user.php',{
            method:'POST',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                name:hiding("encrypt",userName),
                password:hiding("encrypt",pass),
                email:hiding("encrypt",email),
            })
        }).then((response)=>response.json())
        .then((responseJson)=>{
            alert("Your Account is created");
        }).catch((error)=>{
            console.log('Inside Signing '+error);
        });
    }

    const handleNullCheck = () => {
        if(userName==''){
            SetErrtxtUser('You can not register with empty username.');
            return true;
        } else if(email==''){
            SetErrtxtEmail('You can not register with empty email.');
            return true;
        } else if(pass==''){
            SetErrtxtPass('You can not register with empty password.')
            return true;
        }

        return false;
    }

    const handleLengthCheck = () => {
        
        if(userName.length>35){
            SetErrtxtUser('You can not have a user name greater than 35.');
            return true;
        } else if(email.length>35){
            SetErrtxtEmail('You can not have a email greater than 35.');
            return true;
        } else if(pass.length>35){
            SetErrtxtPass('You can not have a password greater than 35.');
            return true;
        }

        return false;
    }

    const handleAvailable = async () => {
        
    }

    const handleNotAvailable = (v) => {
        if(v=='email'){
            SetErrtxtEmail('Following email is not available.');
        } else if(v=='user'){
            SetErrtxtUser('Following user name is not available.');
        }
    }

    const handleTest = () => {

        console.log(ava);

        
    }

    return (
        <ScrollView
            style={{
                backgroundColor: route.params.mood,
            }}
        >
            {false?<Button
                title='test'
                onPress={()=>handleTest()}
            />:null}
            <View
                style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderWidth: 4,
                    borderColor: route.params.color,
                    borderRadius: 100,
                    marginLeft: 150,
                    marginRight: 150,
                    margin: 10,
                }}
            >
                <AntDesign
                    name='adduser'
                    size={100}
                    color={route.params.color}
                />
            </View>
            <View>
                <View
                    style={{
                        borderColor: route.params.color,
                        borderWidth: 4,
                        borderRadius: 5,
                        margin: 10,
                    }}
                >
                    <TextInput
                        placeholder="Enter User Name"
                        onChangeText={SetUserName}
                        value={userName}
                        placeholderTextColor={route.params.textColor}
                        color={route.params.textColor}
                        style={{
                            fontSize: 20,
                            margin: 10,
                        }}
                    />
                </View>
                <Text style={{
                    color: "red",
                    fontWeight: "bold",
                    marginBottom: 0,
                }}>
                    {errtxtUser}
                </Text>
                <View
                    style={{
                        borderColor: route.params.color,
                        borderWidth: 4,
                        borderRadius: 5,
                        margin: 10,
                    }}
                >
                    <TextInput
                        placeholder="Enter email"
                        onChangeText={SetEmail}
                        value={email}
                        placeholderTextColor={route.params.textColor}
                        color={route.params.textColor}
                        style={{
                            fontSize: 20,
                            margin: 10,
                        }}
                    />
                </View>
                <Text style={{
                    color: "red",
                    fontWeight: "bold",
                    marginBottom: 0,
                }}>
                    {errtxtEmail}
                </Text>
                <View
                    style={{
                        borderColor: route.params.color,
                        borderWidth: 4,
                        borderRadius: 5,
                        margin: 10,
                    }}
                >
                    <TextInput
                        placeholder="Enter Password"
                        onChangeText={SetPass}
                        value={pass}
                        placeholderTextColor={route.params.textColor}
                        color={route.params.textColor}
                        secureTextEntry={true}
                        style={{
                            fontSize: 20,
                            margin: 10,
                        }}
                    />
                </View>
                <Text style={{ 
                    color: "red", 
                    fontWeight: "bold", 
                    marginTop: 5 
                    }}
                >
                    {errtxtPass}
                </Text>
            </View>
            <TouchableOpacity
                onPress={()=>handleRegister()}
                style={{
                    alignItems:'center',
                    marginTop:0,
                }}
            >
                <View
                    style={{
                        borderColor:route.params.color,
                        borderWidth:2,
                        alignItems:'center',
                        borderRadius:50,
                        flexDirection:'row',
                    }}
                >
                    <FontAwesome
                        name='check-square-o'
                        size={50}
                        color={route.params.color}
                        style={{
                            margin:10,
                        }}
                    />
                    <Text
                        style={{
                            color:route.params.color,
                            fontWeight:'bold',
                            fontSize:25,
                            margin:10,
                            marginLeft:0,
                        }}
                    >Register</Text>
                </View>
            </TouchableOpacity>
        </ScrollView>
    )

}

export default SignIn;