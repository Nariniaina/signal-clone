import React, { useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { useLayoutEffect } from 'react'
import { Button, Input } from 'react-native-elements';
import { db } from '../config/firebase';
import firebase from 'firebase/compat/app';

// another way to use Icon
import Icon from "react-native-vector-icons/FontAwesome"

const AddChatSreen = ({ navigation }) => {

    const [input, setInput] = useState("");

    useLayoutEffect(() => {
        navigation.setOptions({
            title: "Add a new chat",
            headerBackTitle: "Chats"
        });
    }, [navigation])

    const createChat = async () => {
        await db
        .collection("chats")
        .add({
            chatName: input,
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        })
        .then(() => {
            navigation.goBack();
        })
        .catch((error) => alert(error));
    };

    return (
        <View style={styles.container}>
            <Input 
            style={{ outline: "none" }}
            placeholder="Enter a chat name" 
            value={input} 
            onChangeText={
                (text) => setInput(text)
            }
            leftIcon= {
                <Icon style={{marginRight: 10}} name="wechat" type="antdesign" size={24} color="black" />
            }
            onSubmitEditing={createChat}
            />
            <Button style={{marginTop: 10}} disabled={!input} onPress={createChat} title='Create new Chat' />
        </View>
    )
}

export default AddChatSreen

const styles = StyleSheet.create({
    container: {
        backgroundColor: "white",
        padding: 30,
        height: "100%",
    },
})
