import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { ListItem , Avatar } from 'react-native-elements'
import Firebase from '../firebase'

export default function CustomListItem({id,chatName,enterChat}) {

    const db = Firebase.firestore()

    const [chatMessages, setchatMessages] = useState([])

    useEffect(() => {
            const unsubscribe = db.collection('chats').doc(id).collection('messages').onSnapshot(snapshot => (
                setchatMessages(snapshot.docs.map(doc => doc.data()))
            ))

            return unsubscribe
        
    })

    return (
        <ListItem onPress={() => enterChat(id,chatName)} key={id} bottomDivider>
            <Avatar
            rounded
            source={{
                uri:'https://cencup.com/wp-content/uploads/2019/07/avatar-placeholder.png'
            }}
            />
            <ListItem.Content>
                <ListItem.Title style={{fontWeight:'800'}}>
                    {chatName}
                </ListItem.Title>

                <ListItem.Subtitle numberOfLines={1} ellipsizeMode="tail">
                    {chatMessages?.[0]?.displayName} : {chatMessages?.[0]?.message}
                </ListItem.Subtitle>
            </ListItem.Content>
        </ListItem>
    )
}

const styles = StyleSheet.create({})
