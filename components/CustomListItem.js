import React, { useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { ListItem, Avatar } from "react-native-elements"
import { useEffect } from 'react';
import { db } from '../config/firebase';

const CustomListItem = ({id, chatName, enterChat}) => {
    // To know who is pushing the last message, don't forget the key={id} on the ListItem
    const [chatMessages, setChatMessages] = useState([]);
    useEffect(() => {
        const unsubscribe = db
            .collection('chats')
            .doc(id)
            .collection('messages')
            .orderBy('timestamp', 'desc')
            .limit(1)
            .onSnapshot((snapshot) => 
                setChatMessages(snapshot.docs.map((doc) => doc.data()))
            );
        return unsubscribe;
    });

    return (
        <ListItem key={id} onPress={() => enterChat(id, chatName)} key={id} bottomDivider>
                <Avatar 
                rounded
                source={{
                    uri: chatMessages?.[0]?.photoURL ||
                    "https://yorktonrentals.com/wp-content/uploads/2017/06/usericon.png",
                }}
            />
            {/* UNIFORM RESSOURCE INDENTIFIER */}
            {/* Closeble parent so childreen inside */}
            <ListItem.Content>
            <ListItem.Title style={{ fontWeight: "700" }}>{chatName}</ListItem.Title>
                {/* ellipsizeMode="tail" wrapped the text */}
                <ListItem.Subtitle numberOfLines={1} ellipsizeMode="tail">{chatMessages?.[0]?.displayName} {!chatMessages?.[0] ? ("No messages") : (" : ")} {chatMessages?.[0]?.message}</ListItem.Subtitle>
            </ListItem.Content>
        </ListItem>
    )
}

export default CustomListItem

const styles = StyleSheet.create({})
