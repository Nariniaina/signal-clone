import React, { useState, useLayoutEffect, useEffect } from 'react'
import { StyleSheet, View, KeyboardAvoidingView, ScrollView, Dimensions } from 'react-native'
import { StatusBar } from 'expo-status-bar'

// set up and import elements we need fro this build
import {Button, Input, Text} from 'react-native-elements';
import { auth } from '../config/firebase';

let ScreenHeight = Dimensions.get("window").height * 0.9;

// props navigation when we need to navigate
const RegisterScreen = ({ navigation }) => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [imageUrl, setImageUrl] = useState("");

    // If you want to change setOptions Directly to the app
    useLayoutEffect(() => {
        navigation.setOptions({
            headerBackTitle: "Back to Login",
            // To change the back title ::: very useful in UX
        });
    }, [navigation])

    const register = () => {
        auth.createUserWithEmailAndPassword(email, password)
        .then((authUser) => {
            authUser.user.updateProfile({
                displayName: name,
                photoURL: imageUrl || 
                "https://yorktonrentals.com/wp-content/uploads/2017/06/usericon.png",
            });
        }).catch((error) => alert(error.message));
    };

    return (
        
        <ScrollView keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>
            <KeyboardAvoidingView keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false} style={styles.container}>
                <StatusBar style="light" />
                <Text h3 style={{ marginBottom: 30 }}>
                    Create a Signal account
                </Text>
                <View style={styles.inputContainer}>
                    <Input 
                        placeholder="Full Name"
                        autofocus
                        type="text"
                        value={name}
                        onChangeText={(text) => setName(text)}
                    />
                    <Input 
                        placeholder="Email"
                        type="email"
                        value={email}
                        onChangeText={(text) => setEmail(text)}
                    />
                    <Input 
                        placeholder="Password"
                        type="password"
                        secureTextEntry
                        value={password}
                        onChangeText={(text) => setPassword(text)}
                    />
                    <Input 
                        placeholder="Profile picture URL (optional)"
                        type="test"
                        value={imageUrl}
                        onChangeText={(text) => setImageUrl(text)}
                        // When we press enter on the last input
                        onSubmitEditing={register}
                    />
                    <Button containerStyle={styles.button} raised onPress={register} title="Register" />
                </View >

            </KeyboardAvoidingView >
        </ScrollView>
    )
}

export default RegisterScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        padding: 10,
        height: ScreenHeight,
        backgroundColor: "white",
    },
    button: {
        width: "90%",
        marginTop: 20,
    },
    inputContainer: {
        alignItems: "center",
        width: 300,
    },
})
