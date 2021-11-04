import React, { useEffect, useLayoutEffect, useState } from 'react'
import { StyleSheet, Text, View ,SafeAreaView ,ScrollView ,TouchableOpacity } from 'react-native'
import { Avatar } from 'react-native-elements'
import CustomListItem from '../components/CustomListItem'
import Firebase from '../firebase'

import { AntDesign ,SimpleLineIcons } from '@expo/vector-icons'

export default function HomeScreen({navigation}) {

    const [chats, setchats] = useState([])

    const auth = Firebase.auth()
    const db = Firebase.firestore()


    const signOutUser = () => {
        auth.signOut().then(() => {
            navigation.replace('Login')
        })
    }

    useEffect(() => {
        const unsubscribe = db.collection('chats').onSnapshot(snapshop => (
            setchats(snapshop.docs.map(doc => ({
                id:doc.id,
                data:doc.data()
            })))
        ))

        return unsubscribe

    }, [])

    

    useLayoutEffect(() => {
        navigation.setOptions({
            title:'Signal',
            headerStyle:{backgroundColor:'#fff'},
            headerTitleStyle:{color:'black'},
            headerTintColor:'black',
            headerLeft:() => (
                <View style={{marginLeft:20}}>
                    <TouchableOpacity onPress={signOutUser}>
                    <Avatar
                    rounded
                    source={{uri: auth?.currentUser?.photoURL}}
                    />
                    </TouchableOpacity>
                </View>
            ),
            headerRight:() => (
                <View style={{
                    flexDirection:'row',
                    justifyContent:'space-between',
                    width:80,
                    marginRight:20
                    
                }}>
                    <TouchableOpacity>
                        <AntDesign name="camerao" size={24} color="black" />
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <SimpleLineIcons onPress={() => navigation.navigate('AddChat')} name="pencil" size={24} color="black" />
                    </TouchableOpacity>
                </View>
        )
        })
    }, [navigation])

    const enterChat = (id,chatName) =>{
        navigation.navigate('Chat',{
            id,
            chatName
        })
    }



    return (
        <SafeAreaView>
            <ScrollView style={styles.container}>
                {chats.map(({id,data:{chatName}}) => (
                    <CustomListItem id={id} chatName={chatName} key={id} enterChat={enterChat} />
                ))}
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container:{
        height:'100%',

    }
})
