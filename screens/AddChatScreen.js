import React, { useLayoutEffect, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Button , Icon, Input } from 'react-native-elements'
import Firebase from '../firebase'

export default function AddChatScreen({navigation}) {

    const db = Firebase.firestore()

    const [input, setinput] = useState('')

    useLayoutEffect(() => {

        navigation.setOptions({
            title:'Add a new Chat',
            headerBackTitle:'Chats'
        })

    }, [navigation])

    const createChat = async () =>{
        await db.collection('chats').add({
            chatName:input
        }).then(() => {
            navigation.goBack()
        }).catch((error) => alert(error))
    }
    

    return (
        <View style={styles.container}>
            <Input 
                placeholder="Enter a Chat Name"
                value={input}
                onChangeText={(text) => setinput(text)}
                onSubmitEditing={createChat}
                leftIcon={
                    <Icon name="wechat" type="antdesign" size={24} color="black" />
                }
            />
            <Button 
                onPress={createChat}
                title="Create new Chat"
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        backgroundColor:'white',
        padding:30,
        height:'100%'

    }
})
