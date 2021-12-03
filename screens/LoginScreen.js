import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, KeyboardAvoidingView, ScrollView, Dimensions } from 'react-native';

// set up and import elements we need fro this build
import {Button, Input, Image} from 'react-native-elements';

import { StatusBar } from 'expo-status-bar';
import { auth } from '../config/firebase';

let ScreenHeight = Dimensions.get("window").height * 0.9;

// props navigation when we need to navigate
const LoginScreen = ({ navigation }) => {

    // Link our dom and Input
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const singIn = () => {
        auth.signInWithEmailAndPassword(email, password).catch((error) => alert(error));
    };

    // Perstance Login user
    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((authUser) => {
            if(authUser) {
                navigation.replace("Home");
            }
        });
        return unsubscribe;
    }, [])


    return (
        // ========= WE NEED TO MENTION ALL ELEMENT IS AUTOMATICLY FLEX IN REACT NATIVE
        // ========= AND FLEX DIRECTION IS BY DEFAULT IN COLUMN
        // ========= SO ALIGN ITEMS AND JUSTIFY CONTENT IS INVERTED IN REACT NATIVE

        // ====== onClick is onPress =====

        /* ======= ABSOLUTLY NEEDED WHEN WE FOCUS AN INPUT
        AVOIDING FROM HIDE THE ELEMENTS WHEN WE ARE FOCUS
        ======= */

        // <View style={styles.container}>
        // We replace our <View> to KeyboardAvoidingView
        // don't forget : behavior="padding" =====
        // ====== HELP THE SCREEN UPPER WHEN WE FOCUS ON INPUT ====== 
        <ScrollView keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>
            <KeyboardAvoidingView keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false} style={styles.container}>
                {/* Change the color of status bar text, date, time ... */}
                <StatusBar style="light" />
                <Image 
                    source={{
                        uri: "https://upload.wikimedia.org/wikipedia/commons/4/4f/Signal_Blue_Icon.png"
                    }}
                    style={{ width: 150, height: 150, marginBottom: 20 }}
                />
                <View style={styles.inputContainer}> 
                    <Input 
                        placeholder="Emails" 
                        autoFocus
                        // focus directly the this input when we jump to this screen
                        type="Email"
                        value={email}
                        onChangeText={(text) => setEmail(text)}
                    />
                    <Input 
                        placeholder="Password" 
                        secureTextEntry
                        // for have the "*******" format
                        type="password"
                        value={password}
                        onChangeText={(text) => setPassword(text)}
                        onSubmitEditing={singIn}
                    />
                </View>
                <Button containerStyle={styles.button} onPress={singIn} title="Login"></Button>
                {/* to navigate : navigation.navigate("Register") ; navigation need to be in props of our component*/}
                <Button onPress={() => navigation.navigate("Register")} containerStyle={styles.button} type="outline" title="Register"></Button>
            </ KeyboardAvoidingView>
        </ScrollView>
        // </View>
        
    )
}

export default LoginScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        padding: 10,
        height: ScreenHeight,
    },
    inputContainer: {
        width: 300,
    },
    button: {
        width: 200,
        marginTop: 10,
    }
})
