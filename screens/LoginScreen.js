import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react'
import { StyleSheet, Text, View ,Image, KeyboardAvoidingView} from 'react-native'
import { Button, Input } from 'react-native-elements';

export default function LoginScreen() {

    const [email, setemail] = useState('')
    const [password, setpassword] = useState('')

    const signIn = () =>{

    }


    return (
        <KeyboardAvoidingView behavior="padding" style={styles.container}>
            <StatusBar style="light" />
            <Image source={{
                uri:'https://blog.mozilla.org/internetcitizen/files/2018/08/signal-logo.png'
            }} style={{width:200,height:200}} />

            <View style={styles.inputContainer}>
                <Input placeholder="Email" autoFocus type="email" value={email} onChangeText={text => setemail(text)} />
                <Input placeholder="Password"  type="password" secureTextEntry value={password} onChangeText={text => setpassword(text)} />
            </View>
            <Button title="Login" containerStyle={styles.button} onPress={signIn} />
            <Button title="Register" type="outline" containerStyle={styles.button} />
            <View style={{height:100}} />
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        alignItems:'center',
        justifyContent:'center',
        padding:10
    },
    inputContainer:{
        width:300
    },
    button:{
        width:200,
        marginTop:10
    }
})
