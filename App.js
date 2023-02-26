import 'react-native-gesture-handler';
import React, { useState } from 'react';
import {
  Button, View, Text,
  ScrollView, TextInput,
  TouchableOpacity,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import EnTypo from 'react-native-vector-icons/Entypo';
import MIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import { hiding } from './screens/components/Cryptic';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import HomeScreen from './screens/HomeScreen';
import DropDown from './screens/components/DropDown';
import Calender from './screens/Calender';
import Settings from './screens/Settings';
import Budget from './screens/Budget';
import Configure from './screens/Configure';
import SignIn from './screens/SignIn';
import ForgotPassword from './screens/ForgotPassword';
import Income from './screens/Income';
import Expense from './screens/Expense';
import Report from './screens/Report';
import Charts from './screens/Charts';
import Test from './screens/Test';
import BudgetCross from './screens/BudgetCross';


const Stack = createStackNavigator();

const App = () => {

  const [color, SetColor] = useState('#563df5');
  const [mood, SetMood] = useState('black');
  const [textColor, SetTextColor] = useState('white');
  const [bar, SetBar] = useState(false);
  const [pie, SetPie] = useState(true);
  const [line, SetLine] = useState(false);

  const Login = ({ navigation, route }) => {

    const [email, SetEmail] = useState('');
    const [errtxtEmail, SetErrtxtEmail] = useState('');
    const [pass, SetPass] = useState('');
    const [errtxtPass, SetErrtxtPass] = useState('');

    const handleTest = () => {
      console.log('bar is ' + bar);
      console.log('pie is ' + pie);
      console.log('line is ' + line);
    }

    const handleColor = (vcolor) => {
      SetColor(vcolor);
    }

    const handleMood = (vmood) => {
      SetMood(vmood);
    }

    const handleTextColor = (vc) => {
      SetTextColor(vc);
    }

    const handleBar = (vb) => {
      SetBar(vb);
    }

    const handlePie = (vb) => {
      SetPie(vb);
    }

    const handleLine = (vb) => {
      SetLine(vb);
    }

    const handleLogin = async () => {

      SetErrtxtEmail('');
      SetErrtxtPass('');

      if (email == '') {
        SetErrtxtEmail('You need to have an email to login.');
        return;
      }

      if (pass == '') {
        SetErrtxtPass('You need to have a Password to login.');
        return;
      }

      await fetch('http://10.0.2.2:80/expense_tracker_alpha/show_user.php')
        .then((response) => response.json())
        .then((responseJson) => {

          let flag = 0;
          let vemail='';
          let vpass='';
          let vname='';
          let vid=0;

          responseJson.forEach(item => {

            if(hiding("decrypt",item.email)==email && hiding("decrypt",item.password)==pass){
              flag=1;
              vemail=item.email;
              vpass=item.password;
              vid=item.id;
              vname=hiding("decrypt",item.name);
            }

          })

          if (flag == 0) handleErrortxt();
          else if(flag==1){
            handleNavHome(vemail,vpass,vid,vname);
          }

        }).catch((error) => {
          console.log('inside Login ' + error);
        });

    }

    const handleErrortxt = () => {
      SetErrtxtEmail('Credentials are not valid.');
      SetErrtxtPass('Credentials are not Valid.');
    }

    const handleNavHome = (vemail,vpass,vid,vname) => {
      navigation.navigate('HomeScreen',{
        color:color,
        textColor:textColor,
        mood:mood,
        email:vemail,
        username:vname,
        user_id:vid,
        password:vpass,
        bar:bar,
        pie:pie,
        line:line,
      });
    }

    const handleConfigure = () => {
      navigation.navigate('Configure', {
        color: color,
        mood: mood,
        textColor: textColor,
        bar: bar,
        pie: pie,
        line: line,
        handleColor: handleColor,
        handleMood: handleMood,
        handleTextColor: handleTextColor,
        handleBar: handleBar,
        handleLine: handleLine,
        handlePie: handlePie,
      })
    }

    const handleSignIn = () => {
      navigation.navigate('SignIn', {
        color: color,
        textColor: textColor,
        mood: mood,
      });
    }

    const handleFP = () => {
      navigation.navigate('ForgotPassword',{
        color:color,
        mood:mood,
        textColor:textColor,
      })
    }


    return (
      <ScrollView
        style={{
          flex: 1,
          backgroundColor: mood,
        }}
      >
        {false ? <Button
          title='test'
          onPress={() => handleTest()}
        /> : null}
        <View>
          <View
            style={{
              borderColor: color,
              borderWidth: 4,
              borderRadius: 5,
              margin: 10,
            }}
          >
            <TextInput
              placeholder="Enter email"
              onChangeText={SetEmail}
              value={email}
              placeholderTextColor={textColor}
              color={textColor}
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
              borderColor: color,
              borderWidth: 4,
              borderRadius: 5,
              margin: 10,
            }}
          >
            <TextInput
              placeholder="Enter Password"
              onChangeText={SetPass}
              value={pass}
              placeholderTextColor={textColor}
              color={textColor}
              secureTextEntry={true}
              style={{
                fontSize: 20,
                margin: 10,
              }}
            />
          </View>
          <Text style={{ color: "red", fontWeight: "bold", marginTop: 5 }}>
            {errtxtPass}
          </Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            margin: 10,
          }}
        >
          <View
            style={{
              width: '40%',
              borderRadius: 5,
              borderColor: color,
              borderWidth: 2,
            }}
          >
            <TouchableOpacity
              onPress={() => handleLogin()}
            >
              <View
                style={{
                  margin: 10,
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                <AntDesign
                  name='login'
                  size={50}
                  color={color}
                />
                <Text
                  style={{
                    color: textColor,
                    fontSize: 20,
                    margin: 10,
                  }}
                >Login</Text>
              </View>
            </TouchableOpacity>
          </View>
          <View
            style={{
              width: '40%',
              borderRadius: 5,
              borderColor: color,
              borderWidth: 2,
            }}
          >
            <TouchableOpacity
              onPress={() => handleSignIn()}
            >
              <View
                style={{
                  margin: 10,
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                <AntDesign
                  name='adduser'
                  size={50}
                  color={color}
                />
                <Text
                  style={{
                    color: textColor,
                    fontSize: 20,
                    margin: 10,
                  }}
                >Sign-In</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            margin: 10,
          }}
        >
          <View
            style={{
              width: '40%',
              borderRadius: 5,
              borderColor: color,
              borderWidth: 2,
            }}
          >
            <TouchableOpacity
              onPress={()=>handleFP()}
            >
              <View
                style={{
                  margin: 10,
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                <AntDesign
                  name='unlock'
                  size={50}
                  color={color}
                />
                <View>
                  <Text
                    style={{
                      color: textColor,
                      fontSize: 18,
                    }}
                  >Forgot </Text>
                  <Text
                    style={{
                      color: textColor,
                      fontSize: 18,
                    }}
                  >Password</Text>
                </View>
              </View>
            </TouchableOpacity>
          </View>
          <View
            style={{
              width: '40%',
              borderRadius: 5,
              borderColor: color,
              borderWidth: 2,
            }}
          >
            <TouchableOpacity
              onPress={() => handleConfigure()}
            >
              <View
                style={{
                  margin: 10,
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                <MIcon
                  name='card-bulleted-settings-outline'
                  size={50}
                  color={color}
                />
                <Text
                  style={{
                    color: textColor,
                    fontSize: 20,
                    margin: 0,
                  }}
                >Configure</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    )

  }

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen
          name="Login"
          component={Login}
          options={{
            title: 'Expense-Tracker', //Set Header Title
            headerStyle: {
              backgroundColor: color, //Set Header color
            },
            headerTintColor: '#fff', //Set Header text color
            headerTitleStyle: {
              fontWeight: 'bold', //Set Header text style
            },
          }}
        />
        <Stack.Screen
          name="HomeScreen"
          component={HomeScreen}
          options={{
            title: 'Home', //Set Header Title
            headerStyle: {
              backgroundColor: color, //Set Header color
            },
            headerTintColor: '#fff', //Set Header text color
            headerTitleStyle: {
              fontWeight: 'bold', //Set Header text style
            },
          }}
        />
        <Stack.Screen
          name="Calender"
          component={Calender}
          options={{
            title: 'Calender', //Set Header Title
            headerStyle: {
              backgroundColor: color, //Set Header color
            },
            headerTintColor: '#fff', //Set Header text color
            headerTitleStyle: {
              fontWeight: 'bold', //Set Header text style
            },
          }}
        />
        <Stack.Screen
          name="Settings"
          component={Settings}
          options={{
            title: 'Settings', //Set Header Title
            headerStyle: {
              backgroundColor: color, //Set Header color
            },
            headerTintColor: '#fff', //Set Header text color
            headerTitleStyle: {
              fontWeight: 'bold', //Set Header text style
            },
          }}
        />
        <Stack.Screen
          name="Budget"
          component={Budget}
          options={{
            title: 'Budget', //Set Header Title
            headerStyle: {
              backgroundColor: color, //Set Header color
            },
            headerTintColor: '#fff', //Set Header text color
            headerTitleStyle: {
              fontWeight: 'bold', //Set Header text style
            },
          }}
        />
        <Stack.Screen
          name="Configure"
          component={Configure}
          options={{
            title: 'Configure', //Set Header Title
            headerStyle: {
              backgroundColor: color, //Set Header color
            },
            headerTintColor: '#fff', //Set Header text color
            headerTitleStyle: {
              fontWeight: 'bold', //Set Header text style
            },
          }}
        />
        <Stack.Screen
          name="SignIn"
          component={SignIn}
          options={{
            title: 'Sign-In', //Set Header Title
            headerStyle: {
              backgroundColor: color, //Set Header color
            },
            headerTintColor: '#fff', //Set Header text color
            headerTitleStyle: {
              fontWeight: 'bold', //Set Header text style
            },
          }}
        />
        <Stack.Screen
          name="ForgotPassword"
          component={ForgotPassword}
          options={{
            title: 'Forgot Password', //Set Header Title
            headerStyle: {
              backgroundColor: color, //Set Header color
            },
            headerTintColor: '#fff', //Set Header text color
            headerTitleStyle: {
              fontWeight: 'bold', //Set Header text style
            },
          }}
        />
        <Stack.Screen
          name="Income"
          component={Income}
          options={{
            title: 'Income', //Set Header Title
            headerStyle: {
              backgroundColor: color, //Set Header color
            },
            headerTintColor: '#fff', //Set Header text color
            headerTitleStyle: {
              fontWeight: 'bold', //Set Header text style
            },
          }}
        />
        <Stack.Screen
          name="Expense"
          component={Expense}
          options={{
            title: 'Expense', //Set Header Title
            headerStyle: {
              backgroundColor: color, //Set Header color
            },
            headerTintColor: '#fff', //Set Header text color
            headerTitleStyle: {
              fontWeight: 'bold', //Set Header text style
            },
          }}
        />
        <Stack.Screen
          name="Report"
          component={Report}
          options={{
            title: 'Report', //Set Header Title
            headerStyle: {
              backgroundColor: color, //Set Header color
            },
            headerTintColor: '#fff', //Set Header text color
            headerTitleStyle: {
              fontWeight: 'bold', //Set Header text style
            },
          }}
        />
        <Stack.Screen
          name="Charts"
          component={Charts}
          options={{
            title: 'Charts', //Set Header Title
            headerStyle: {
              backgroundColor: color, //Set Header color
            },
            headerTintColor: '#fff', //Set Header text color
            headerTitleStyle: {
              fontWeight: 'bold', //Set Header text style
            },
          }}
        />
        <Stack.Screen
          name="Test"
          component={Test}
          options={{
            title: 'Test', //Set Header Title
            headerStyle: {
              backgroundColor: color, //Set Header color
            },
            headerTintColor: '#fff', //Set Header text color
            headerTitleStyle: {
              fontWeight: 'bold', //Set Header text style
            },
          }}
        />
        <Stack.Screen
          name="BudgetCross"
          component={BudgetCross}
          options={{
            title: 'Budget Cross', //Set Header Title
            headerStyle: {
              backgroundColor: color, //Set Header color
            },
            headerTintColor: '#fff', //Set Header text color
            headerTitleStyle: {
              fontWeight: 'bold', //Set Header text style
            },
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>

  );
};

export default App;