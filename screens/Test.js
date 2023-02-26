import { min } from 'moment';
import React, { useState, useEffect } from 'react';
import {
    View, Text,Button,
    TextInput
} from 'react-native';

const Test = () => {

    const [email, SetEmail] = useState();
    const [pwd, SetPwd] = useState();

    const handleEncrypt = () => {
        console.log(Encrypt(pwd));
    }

    const handleDecrypt = () => {
        console.log(Decrypt(Encrypt(pwd)));
    }

    const Encrypt = (vs) => {
        
        let sqt = Math.sqrt(vs.length);
        let x = Math.floor(sqt);
        let y = Math.ceil(sqt);

        if(x*y < vs.length){
            if(Math.min(x,y) == x){
                x++;
            } else {
                y++;
            }
        }

        console.log(vs.length+' '+x+' '+' '+y);

        let arr2d = new Array();

        for(let i=0;i<x;i++){

            let arr1d = new Array();

            for(let j=0;j<y;j++){
                if( ((i*y)+j) < vs.length ) {
                    arr1d.push(vs[(i*y)+j]);
                }
            }

            arr2d.push(arr1d);
        }

        let envs = new String();

        for(let i=0;i<y;i++){
            for(let j=0;j<x;j++){
                if( ((j*y)+i) < vs.length ) {
                    envs+=arr2d[j][i];
                }
            }
        }

        //console.log("Inside Encrypt : "+envs);
        return envs;
    }

    const Decrypt = (vs) => {
        let sqt = Math.sqrt(vs.length);
        let x = Math.floor(sqt);
        let y = Math.ceil(sqt);

        if(x*y < vs.length){
            if(Math.min(x,y) == x){
                x++;
            } else {
                y++;
            }
        }

        console.log(vs.length+' '+x+' '+' '+y);

        let arr2d = new Array();
        let cnt = 0;

        for(let i=0;i<y;i++){

            let arr1d = new Array();

            for(let j=0;j<x;j++){

                if( ((j*y)+i) < vs.length ){
                    arr1d.push(vs[(i*x)+j-cnt]);
                } else cnt++;
            }

            console.log(arr1d);
            arr2d.push(arr1d);
        }

        let devs = new String();

        for(let i=0;i<x;i++){
            for(let j=0;j<y;j++){
                if( ((i*y)+j) < vs.length){
                    devs+=arr2d[j][i];
                }
            }
        }

        //console.log("Inside decrypt message : "+devs);
        return devs;
    }

    return (
        <View
            style={{
                backgroundColor:"black",
                flex:1,
            }}
        >
            <View
                style={{
                    borderColor:"white",
                    borderRadius:5,
                    borderWidth:3,
                    margin:10,
                    marginTop:20,
                }}
            >
                <TextInput
                    placeholder="Enter User Email"
                    onChangeText={SetEmail}
                    value={email}
                    placeholderTextColor="white"
                    color="white"
                    style={{
                        fontSize: 20,
                        margin: 10,
                    }}
                />
            </View>
            <View
                style={{
                    borderColor:"white",
                    borderRadius:5,
                    borderWidth:3,
                    margin:10,
                }}
            >
                <TextInput
                    placeholder="Enter User Password"
                    onChangeText={SetPwd}
                    value={pwd}
                    placeholderTextColor="white"
                    color="white"
                    style={{
                        fontSize: 20,
                        margin: 10,
                    }}
                />
            </View>
            <View
                style={{
                    justifyContent:"space-between",
                    flexDirection:"row",
                    margin:10,
                }}
            >
                <Button
                    title="encrypt"
                    onPress={()=>handleEncrypt()}
                />
                <Button
                    title="decrypt"
                    onPress={()=>handleDecrypt()}
                />
            </View>
        </View>
    )
}

export default Test;