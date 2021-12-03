import React, { useLayoutEffect, useState } from 'react'
import { SafeAreaView, StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native'
import CustomListItem from '../components/CustomListItem'
import { Avatar } from 'react-native-elements/dist/avatar/Avatar'
import { auth, db } from '../config/firebase'

import { AntDesign, SimpleLineIcons } from "@expo/vector-icons";
import { useEffect } from 'react'

const HomeScreen = ({ navigation }) => {

    const [chats, setChats] = useState([]);

    const signOutUser = () => {
        auth.signOut().then(() => {
            navigation.replace("Login");
        })
    }

    useEffect(() => {
        const unsucscribe = db.collection('chats')
        .orderBy('timestamp', 'desc')
        .onSnapshot(snaphot => {
            setChats(snaphot.docs.map(doc => ({
                id: doc.id,
                data: doc.data(),
            })))
        });

        return unsucscribe;
    }, [])

    useLayoutEffect(() => {
        navigation.setOptions({
            headerBackTitle: "Back to Login",
            title: "Signal",
            headerStyle: {backgroundColor: "#fff"},
            headerTitleStyle: { color: "black", fontWeight: '600' },
            headerTintColor: "black",
            headerLeft: () => (
                <View style={{marginLeft: 20}}>
                    <TouchableOpacity onPress={signOutUser} activeOpacity={0.5}>
                        <Avatar rounded source={{ uri: auth?.currentUser?.photoURL || "https://yorktonrentals.com/wp-content/uploads/2017/06/usericon.png" }} />
                    </TouchableOpacity>
                </View>
            ),
            headerRight: () => (
                <View style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    width: 80,
                    marginRight: 20,
                }}>
                    <TouchableOpacity activeOpacity={0.5}>
                        <AntDesign name='camerao' size={24} color="black"/>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate('AddChat')} activeOpacity={0.5}>
                        <SimpleLineIcons name='pencil' size={20} color="black" />
                    </TouchableOpacity>
                </View>
            ),
        });
    }, [navigation]);

    const enterChat = (id, chatName) => {
        navigation.navigate('Chat', {
            id: id,
            chatName: chatName,
        });
    };

    return (
        // To protect for different border with some phone ... we need something to be safe and clean
        // So use SafeAreaView from react-native
        <SafeAreaView>
            {/* For have a cool page scrollable, remember Scrollview from react-native */}
            <ScrollView style={styles.container}>
                {chats.map(({id, data: { chatName } }) => (
                    <CustomListItem enterChat={enterChat} key={id} id={id} chatName={chatName}/>
                ))}
            </ScrollView>
        </SafeAreaView>
    )
}

export default HomeScreen

const styles = StyleSheet.create({
    container: {
        height: "100%",
    }
})
