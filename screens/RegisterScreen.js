import { StatusBar } from 'expo-status-bar';
import React, { useLayoutEffect, useState } from 'react'
import { StyleSheet, Text, View ,KeyboardAvoidingView } from 'react-native'
import { Button,Input } from 'react-native-elements';
import Firebase from '../firebase';

export default function RegisterScreen({navigation}) {

    const auth = Firebase.auth()

    const [name, setname] = useState('')
    const [email, setemail] = useState('')
    const [password, setpassword] = useState('')
    const [imageUrl, setimageUrl] = useState('')


    useLayoutEffect(() => {

        navigation.setOptions({
            headerBackTitle:'Back to Login'
        })
       
    }, [navigation])

    const register = () =>{
        auth.createUserWithEmailAndPassword(email,password)
        .then((authUser) => {

            authUser.user.updateProfile({
                displayName:name,
                photoURL:imageUrl || 'https://cencup.com/wp-content/uploads/2019/07/avatar-placeholder.png'
            })

            // authUser.user.update({
            //     displayName:name,
            //     photoURL:imageUrl || 'https://cencup.com/up-content/uploads/2019/07/avatar-placeholder.png'
            // })


            console.log(authUser)

        })
        .then((error) => alert(error.message))
    }

    return (
        <KeyboardAvoidingView behavior="padding" style={styles.container}>
            <StatusBar style="light" />

            <Text h3 style={{marginBottom:50}}>Create a Signal Account</Text>

            <View style={styles.inputContainer}>
                <Input placeholder="Full Name"  autoFocus typpe="text" value={name} onChangeText={(text) => setname(text)} />
                <Input placeholder="Email"  typpe="email" value={email} onChangeText={(text) => setemail(text)} />
                <Input placeholder="Password"  typpe="password" value={password} onChangeText={(text) => setpassword(text)} />
                <Input placeholder="Profile Picture URl (optional)"  typpe="text" value={imageUrl} onChangeText={(text) => setimageUrl(text)} />
            </View>

            <Button
                containerStyle={styles.button}
                raised
                onPress={register}
                title="Register"
            />
            <View style={{height:100}} />
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        alignItems:'center',
        justifyContent:'center',
        padding:10,
        backgroundColor:'white'
    },
    inputContainer:{
        width:300
    },
    button:{
        width:200,
        marginTop:10

    }
})
