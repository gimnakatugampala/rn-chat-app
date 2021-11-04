import React, { useEffect, useLayoutEffect, useState } from 'react'
import { Keyboard, KeyboardAvoidingView, Platform, SafeAreaView, StyleSheet, Text, TextInput, View ,TouchableOpacity} from 'react-native'
import { Avatar } from 'react-native-elements'
import { AntDesign ,SimpleLineIcons ,Ionicons, FontAwesome } from '@expo/vector-icons'
import { StatusBar } from 'expo-status-bar'
import { ScrollView } from 'react-native'
import { TouchableWithoutFeedback } from 'react-native'
import Firebase from '../firebase'


export default function ChatScreen({navigation,route}) {

    const db = Firebase.firestore()
    const auth = Firebase.auth()

    const [input, setinput] = useState('')
    const [messages, setmessages] = useState([])

    useLayoutEffect(() => {

        navigation.setOptions({
            title:route.params.chatName,
            headerBackTitleVisible:false,
            headerTitleAlign:'left',
            headerTitle:() => (
                <View
                style={{
                    flexDirection:'row',
                    alignItems:'center'
                }}
                >
                    <Avatar rounded
                    source={{
                        uri:'https://cencup.com/wp-content/uploads/2019/07/avatar-placeholder.png'
                    }}
                    />
                    <Text style={{color:'white',marginLeft:10,fontWeight:'700'}}>{route.params.chatName}</Text>
                </View>
            ),
            headerLeft:() => (
                <TouchableOpacity 
                style={{marginLeft:10}}
                onPress={navigation.goBack}
                >
                    <AntDesign name="arrowleft" size={24} color="white" />
                </TouchableOpacity>
            ),
            headerRight:() =>(
                <View
                
                style={{flexDirection:'row',justifyContent:'space-between',width:80,marginLeft:20}}>
                    <TouchableOpacity>
                        <FontAwesome name="video-camera" size={24} color="white" />
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Ionicons name="call" size={24} color="white" />
                    </TouchableOpacity>
                </View>
            )
        })
        
    }, [navigation])

    const sendMessage = () =>{
        Keyboard.dismiss()

        db.collection('chats').doc(route.params.id).collection('messages').add({
            // timestamp: db.FieldValue.serverTimestamp(),
            message:input,
            displayName:auth.currentUser.displayName,
            email:auth.currentUser.email,
            photoURL:auth.currentUser.photoURL
        })

        setinput('')
    }

    useLayoutEffect(() => {
        const unsubscribe = db.collection('chats').doc(route.params.id).collection('messages').onSnapshot((snapshot) => setmessages(
            snapshot.docs.map(doc => ({
                id:doc.id,
                data:doc.data()
            }))
        ))

        return unsubscribe

    }, [route])


    return (
        <SafeAreaView style={{flex:1,backgroundColor:'white'}}>
            <StatusBar style='light' />
            <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.container}
            keyboardVerticalOffset={90}
            >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <>
            <ScrollView contentContainerStyle={{paddingTop:15}}>
                {messages.map(({id,data}) => (
                    data.email === auth.currentUser.email ? (
                        <View key={id} style={styles.reciever}>
                            <Avatar
                            source={{
                                uri:data.photoURL
                            }}
                            size={30}
                            rounded
                            right={-5}
                            bottom={-15}
                            position="absolute"
                            />
                            <Text style={styles.recieverText}>{data.message}</Text>
                        </View>
                    ) :(
                        <View key={id} style={styles.sender}>
                             <Avatar />
                            <Text style={styles.senderText}>{data.message}</Text>
                            <Text style={styles.senderName}>{data.displayName}</Text>
                        </View>
                    )
                ))}
            </ScrollView>

            <View style={styles.footer}> 
                <TextInput onSubmitEditing={sendMessage} value={input} onChangeText={text => setinput(text)} placeholder="Signal Message"  style={styles.textInput}/>
                <TouchableOpacity onPress={sendMessage}>
                <Ionicons name="send" size={24} color="#2B68E6" />
                </TouchableOpacity>
            </View>
            </>
            </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1
    },
    footer:{
        flexDirection:'row',
        alignItems:'center',
        width:'100%',
        padding:15
    },
    reciever:{
        padding:15,
        backgroundColor:'#ececec',
        alignSelf:'flex-end',
        borderRadius:20,
        marginRight:20,
        marginBottom:20,
        maxWidth:'80%',
        position:'relative'
    },
    recieverText:{
        color:'black',
        fontWeight:'500',
        marginLeft:10
    },
    sender:{
        padding:15,
        backgroundColor:'#2B68E6',
        alignSelf:'flex-start',
        borderRadius:20,
        margin:15,
        maxWidth:'80%',
        position:'relative'
    },
    senderText:{
        color:'white',
        fontWeight:'500',
        marginLeft:10,
        marginBottom:15
    },
    senderName:{
        left:10,
        paddingRight:10,
        fontSize:10,
        color:'white'
    },
    textInput:{
        bottom:0,
        height:40,
        flex:1,
        marginRight:15,
        borderColor:'transparent',
        backgroundColor:'#ECECEC',
        borderWidth:1,
        padding:10,
        color:'grey',
        borderRadius:30
    }
})
