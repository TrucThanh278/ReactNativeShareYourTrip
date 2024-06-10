import React, { useState } from "react";
import { View, Text, ScrollView, KeyboardAvoidingView, Platform, Alert, Image, ImageBackground } from "react-native";
import { Button, HelperText, TextInput, TouchableRipple, RadioButton } from "react-native-paper";
import MyStyles from "../../styles/MyStyles";
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';
import { useNavigation } from "@react-navigation/native";

const Register = () => {
    const fields = [
        { label: "First Name", icon: "text", field: "first_name" },
        { label: "Last Name", icon: "text", field: "last_name" },
        { label: "Email", icon: "email", field: "email" },
        { label: "Phone", icon: "phone", field: "phone_number" },
        { label: "Username", icon: "account", field: "username" },
        { label: "Password", icon: "eye", field: "password", secureTextEntry: true },
        { label: "Confirm Password", icon: "eye", field: "confirm", secureTextEntry: true }
    ];

    const [user, setUser] = useState({ gender: "men" });
    const [err, setErr] = useState(false);
    const [loading, setLoading] = useState(false);
    const nav = useNavigation();

    const change = (value, field) => {
        setUser(current => ({ ...current, [field]: value }));
    };

    const picker = async () => {
        let { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') Alert.alert("iCourseApp", "Permissions Denied!");
        else {
            let res = await ImagePicker.launchImageLibraryAsync({ mediaTypes: ImagePicker.MediaTypeOptions.Images, allowsEditing: true, aspect: [4, 3], quality: 1 });
            if (!res.canceled) change(res.assets[0], 'avatar');
        }
    };

    const register = async () => {
        if (user.password !== user.confirm) {
            setErr(true);
        } else {
            setErr(false);
            let form = new FormData();
            for (let k in user) {
                if (k !== 'confirm') {
                    if (k === 'avatar') {
                        form.append(k, {
                            uri: user.avatar.uri,
                            name: user.avatar.uri.split('/').pop(),
                            type: 'image/jpeg'
                        });
                    } else {
                        form.append(k, user[k]);
                    }
                }
            }

            setLoading(true);

            try {
                console.log('Registering user with form data:', form);
                console.log('Endpoint:', 'http://172.16.12.10:8000/users/');
                
                const response = await axios.post('http://172.16.12.10:8000/users/', form, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                });

                if (response.status === 201) {
                    console.log(response.data);
                    nav.navigate("Login");
                } else {
                    throw new Error(response.data.message || "Registration failed. Please try again.");
                }
            } catch (ex) {
                console.error('API Error: ', ex);
                console.log('Response from server:', ex.response);

                if (ex.response && ex.response.data && ex.response.data.message) {
                    Alert.alert("Registration Error", ex.response.data.message);
                } else {
                    Alert.alert("Registration Error", "Registration failed. Please try again.");
                }
            } finally {
                setLoading(false);
            }
        }
    };

    return (
        <ImageBackground source={require('./assets/images/user.jpeg')} style={{ flex: 1 }}>
            <View style={[MyStyles.container, MyStyles.margin]}>
                <ScrollView>
                    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
                        <Text style={[MyStyles.subject, MyStyles.name]}>MEMBER REGISTER</Text>
                        {fields.map(f => (
                            <TextInput
                                value={user[f.field]}
                                onChangeText={t => change(t, f.field)}
                                key={f.field}
                                style={MyStyles.margin}
                                label={f.label}
                                secureTextEntry={f.secureTextEntry}
                                right={<TextInput.Icon icon={f.icon} />}
                            />
                        ))}

                        <RadioButton.Group 
                            onValueChange={value => change(value, 'gender')} 
                            value={user.gender}
                            color="white"
                        >
                            <View style={{ flexDirection: 'row', justifyContent: 'center'}}>
                                <View style={[MyStyles.radioContainer, { marginRight: 50 }]}>
                                    <RadioButton 
                                        value="men" 
                                        uncheckedColor="rgba(255, 255, 255, 0.5)" 
                                        color="white" 
                                    />
                                    <Text style={{ color: 'white' }}>Men</Text>
                                </View>
                                <View style={[MyStyles.radioContainer, { marginRight: 50 }]}>
                                    <RadioButton 
                                        value="women" 
                                        uncheckedColor="rgba(255, 255, 255, 0.5)" 
                                        color="white" 
                                    />
                                    <Text style={{ color: 'white' }}>Women</Text>
                                </View>
                                <View style={MyStyles.radioContainer}>
                                    <RadioButton 
                                        value="others" 
                                        uncheckedColor="rgba(255, 255, 255, 0.5)" 
                                        color="white" 
                                    />
                                    <Text style={{ color: 'white' }}>Others</Text>
                                </View>
                            </View>
                        </RadioButton.Group>

                        <TouchableRipple onPress={picker}>
                            <Text style={[MyStyles.margin, { color: 'white', marginTop: 20 }]}>Choose avatar...</Text>
                        </TouchableRipple>

                        <HelperText type="error" visible={err}>Password incorrect!</HelperText>

                        {user.avatar && <Image source={{ uri: user.avatar.uri }} style={MyStyles.avatar} />}

                        <Button loading={loading} icon="account" mode="contained" onPress={register} buttonColor="rgb(79, 133, 13)" style={MyStyles.button}>REGISTER</Button>
                    </KeyboardAvoidingView>
                </ScrollView>
            </View>
        </ImageBackground>
    );
}

export default Register;
