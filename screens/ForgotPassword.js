import { TabRouter } from '@react-navigation/routers';
import React, { useState } from 'react';
import {
    View, Text, ScrollView,
    TextInput,TouchableOpacity,
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import { sendEmail } from './components/send-email';
import {hiding} from './components/Cryptic';

const ForgotPassword = ({ navigation, route }) => {

    const [email, SetEmail] = useState('');
    const [errtxtEmail, SetErrtxtEmail] = useState('');

    const validateEmail = (mail) => {
        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)){
          return (true);
        }
        
        return (false);
    }

    const handleSendYourPassword = async () => {

        SetErrtxtEmail('');

        if(validateEmail(email)==false){
            SetErrtxtEmail('Invalid Email');
            return ;
        }

        await fetch('http://10.0.2.2:80/expense_tracker_alpha/show_user.php')
        .then((response) => response.json())
        .then((responseJson) => {

          let flag = 0;
          let pass = '';

          responseJson.forEach(item => {

            if(hiding("decrypt",item.email)==email){
              flag=1;
              pass=hiding("decrypt",item.password);
            }

          })

          if (flag == 0) handleErrortxt();
          else if(flag==1){
            handleSendingEmail(pass);
          }

        }).catch((error) => {
          console.log('inside HomeScreen ' + error);
        });
    }

    const handleErrortxt = () => {
        SetErrtxtEmail('No user is registered with this email');
    }

    const handleSendingEmail = (v) => {
        const str = 'Your Password is '+v;

        sendEmail(
            email,
            'Expense-Tracker',
            str,
            {cc:'mh.mushfiq99@gmail.com'}
        ).then(()=>{
            console.log('Your message was successfully sent!');
        });
    }

    return (
        <ScrollView
            style={{
                backgroundColor: route.params.mood,
            }}
        >
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
                        placeholder="Enter Email"
                        onChangeText={SetEmail}
                        value={email}
                        placeholderTextColor={route.params.textColor}
                        color={route.params.textColor}
                        secureTextEntry={false}
                        style={{
                            fontSize: 20,
                            margin: 10,
                        }}
                    />
                </View>
                <Text style={{ color: "red", fontWeight: "bold", marginTop: 5 }}>
                    {errtxtEmail}
                </Text>
            </View>
            <TouchableOpacity
                onPress={()=>handleSendYourPassword()}
                style={{
                    alignItems: 'center',
                }}
            >
                <View
                    style={{
                        borderColor: route.params.color,
                        borderWidth: 4,
                        borderRadius: 50,
                        margin: 10,
                        marginTop: 30,
                        flexDirection: 'row',
                        alignItems: 'center',
                    }}
                >
                    <Feather
                        name='key'
                        size={50}
                        color={route.params.color}
                        style={{
                            margin: 10,
                        }}
                    />
                    <Text
                        style={{
                            color: route.params.textColor,
                            fontSize: 25,
                            fontWeight: 'bold',
                            margin: 10,
                        }}
                    >Send Mail</Text>
                </View>
            </TouchableOpacity>
        </ScrollView>
    )
}

export default ForgotPassword;