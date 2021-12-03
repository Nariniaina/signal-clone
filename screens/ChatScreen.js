import React, { useState } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView, KeyboardAvoidingView, Platform, TextInput, ScrollView, Keyboard, TouchableWithoutFeedback } from 'react-native'
import { useLayoutEffect } from 'react'
import { Avatar } from 'react-native-elements/dist/avatar/Avatar'
import { AntDesign, FontAwesome, Ionicons } from '@expo/vector-icons'
import { StatusBar } from 'expo-status-bar'
import { db, auth } from '../config/firebase'
import firebase from 'firebase/compat/app';

// route is the params
const ChatScreen = ({ navigation, route }) => {

    const [input, setInput] = useState("");
    const [messages, setMessages] = useState([]);

    useLayoutEffect(() => {
        navigation.setOptions({
            title: "Chat",
            headerBackTitleVisible: false,
            // where the header title gonna be positioning
            headerTitleAlign: "left",
            headerTitle: () => (
                <View style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginLeft: -10,
                }}>
                    <Avatar rounded source= {{
                        // For changing the last avatar who send a message
                        // So last message is message[0]
                        uri: messages[0]?.data.photoURL || "https://yorktonrentals.com/wp-content/uploads/2017/06/usericon.png",
                    }} /> 
                <Text style={{color: "white", marginLeft: 10, fontWeight: '700'}}>{route.params.chatName}</Text>
                </View>
            ),
            headerLeft: () => (
                <TouchableOpacity style={{ marginLeft: 10 }} 
                onPress={navigation.goBack}>
                    <AntDesign name="arrowleft" size={24} color="white" />
                </TouchableOpacity>
            ),
            headerRight: () => (
                <View style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    width: 80,
                    marginRight: 20,
                }}>
                    <TouchableOpacity>
                        <FontAwesome name="video-camera" size={24} color="white" />
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Ionicons name="call" size={24} color="white" />
                    </TouchableOpacity>
                </View>
            )
        });
    }, [navigation, messages]);

    const sendMessage = () => {
        // hide the keyboard after press the send icon
        Keyboard.dismiss();
        db.collection('chats').doc(route.params.id).collection('messages').add({
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            message: input,
            displayName: auth.currentUser.displayName,
            email: auth.currentUser.email,
            photoURL: auth.currentUser.photoURL,
        });
        setInput('');
    }

    useLayoutEffect(() => {
        const unsubscribe = db
            .collection('chats')
            .doc(route.params.id)
            .collection('messages')
            .orderBy("timestamp", "desc")
            .onSnapshot((snaphot) => 
            setMessages(snaphot.docs.map((doc) => ({
                id: doc.id,
                data: doc.data(),
            }))
            )
        );

        return unsubscribe;
    }, [route]);

    return (
        <SafeAreaView style={{
            flex: 1,
            backgroundColor: "white"
        }}>
            <StatusBar style="light" />
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={styles.container}
                keyboardVerticalOffset={90}
            >
                {/* When we touch anything inside this area <=> outside of the keyboard
                    => hide the keyboard 
                */}
                {/* Be careful dismiss is not a function with () here */}
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <>
                    {/* contentContainerStyle : shortcut for styling */}
                    <ScrollView contentContainerStyle={{ paddingTop: 15 }}>
                        {messages.map(({ id, data }) =>
                            data.email === auth.currentUser.email ? (
                                <View key={id} style={styles.reciever}>
                                    <Avatar 
                                        rounded
                                        // == ON WEB == Don't forget to COMMENT this before deploy
                                        // Some people use the web browser for make developpement
                                        // Fast no need smartphone always
                                        containerStyle={{
                                            position: "absolute",
                                            bottom: -15,
                                            right: -5,
                                        }}
                                        // ON MOBILE 
                                        position="absolute"
                                        bottom={-15}
                                        right={-5}
                                        size={30} 
                                        source={{uri: data.photoURL,}} 
                                    />
                                    <Text style={styles.recieverText}>{data.message}</Text>
                                </View>
                            ) : (
                                <View key={id} style={styles.sender}>
                                    <Avatar 
                                        rounded
                                        // == ON WEB == Don't forget to COMMENT this before deploy
                                        // Some people use the web browser for make developpement
                                        // Fast no need smartphone always
                                        containerStyle={{
                                            position: "absolute",
                                            bottom: -15,
                                            left: -5,
                                        }}
                                        // ON MOBILE 
                                        // position="absolute"
                                        // bottom={-15}
                                        // right={-5}
                                        size={30} 
                                        source={{uri: data.photoURL,}} 
                                    />
                                    <Text style={styles.senderText}>{data.message}</Text>
                                    <Text style={styles.senderName}>{data.displayName}</Text>
                                </View>
                            )
                        )}

                    </ScrollView>
                    <View style={styles.footer}>
                        <TextInput 
                            value={input} 
                            onChangeText={text => setInput(text)} 
                            placeholder="Signal Message"
                            style={styles.TextInput}
                            onSubmitEditing={sendMessage}
                        />
                        <TouchableOpacity onPress={sendMessage} activeOpacity={0.5} >
                            <Ionicons name="send" size={24} color='#2B68E6'/>
                        </TouchableOpacity>
                    </View>
                </>
                </ TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}

export default ChatScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    footer: {
        // position : "sticky",
        bottom : 10,
        backgroundColor: "white",
        flexDirection: "row",
        alignItems: "center",
        width : "100%",
        padding: 15, 
        // shadowColor: '#000',
        // shadowOffset: { width: 0, height: 2 },
        // shadowOpacity: 0.8,
        // shadowRadius: 2,
    },
    TextInput: {
        bottom: 0,
        height: 40,
        flex: 1,
        marginRight: 15,
        borderColor: "transparent",
        backgroundColor: "#ECECEC",
        borderWidth: 1,
        padding: 10,
        color: "grey",
        borderRadius: 30,
    },
    reciever: {
        padding: 15,
        backgroundColor: "#ECECEC",
        alignSelf: "flex-end",
        borderRadius: 20,
        marginRight: 15,
        marginBottom: 20,
        maxWidth: "80%",
        position: "relative",
    },
    sender: {
        padding: 15,
        backgroundColor: "#2B68E6",
        alignSelf: "flex-start",
        borderRadius: 20,
        margin: 15,
        maxWidth: "80%",
        position: "relative",
    },
    senderName: {
        left: 10,
        paddingRight: 10,
        fontSize: 10,
        color: "white",
    },
    senderText: {
        color: "white",
        fontWeight: "500",
        marginLeft: 10,
        marginBottom: 15,
    },
})
