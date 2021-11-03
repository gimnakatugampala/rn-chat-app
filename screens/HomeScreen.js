import React, { useLayoutEffect } from 'react'
import { StyleSheet, Text, View ,SafeAreaView ,ScrollView ,TouchableOpacity } from 'react-native'
import { Avatar } from 'react-native-elements'
import CustomListItem from '../components/CustomListItem'
import Firebase from '../firebase'

export default function HomeScreen({navigation}) {

    const auth = Firebase.auth()

    useLayoutEffect(() => {
        navigation.setOptions({
            title:'Signal',
            headerStyle:{backgroundColor:'#fff'},
            headerTitleStyle:{color:'black'},
            headerTintColor:'black',
            headerLeft:() => (
                <View style={{marginLeft:20}}>
                    <TouchableOpacity>
                    <Avatar
                    rounded
                    source={{uri: auth?.currentUser?.photoURL}}
                    />
                    </TouchableOpacity>
                </View>
            )
        })
    }, [])

    return (
        <SafeAreaView>
            <ScrollView>
                <CustomListItem />
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({})
