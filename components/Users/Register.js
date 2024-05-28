// import React, { useState } from "react";
// import { View, Text, TextInput, TouchableOpacity, Image } from "react-native";
// import * as ImagePicker from 'expo-image-picker';
// import MyStyles from "../../styles/MyStyles";
// import Styles from "./Styles";

// const Register = ({ navigation }) => {
//     const [user, setUser] = useState({
//         "first_name": "",
//         "last_name": "",
//         "username": "",
//         "password": "",
//         "avatar": ""
//     });
//     const [confirmPassword, setConfirmPassword] = useState("");
//     const [error, setError] = useState("");
//     const [loading, setLoading] = useState(false);

//     const register = async () => {
//         if (user.password !== confirmPassword) {
//             setError("Passwords do not match.");
//             return;
//         }

//         setLoading(true);

//         let form = new FormData();
//         for (let key in user) {
//             if (key === 'avatar') {
//                 form.append(key, {
//                     uri: user[key].uri,
//                     name: user[key].fileName,
//                     type: user[key].uri.type
//                 });
//             } else {
//                 form.append(key, user[key]);
//             }
//         }

//         try {
//             const response = await fetch("https://thanhduong.pythonanywhere.com/users/", {
//                 method: "POST",
//                 headers: {
//                     "Content-Type": "multipart/form-data",
//                 },
//                 body: form,
//             });
//             if (!response.ok) {
//                 throw new Error("Network response was not ok. Status: " + response.status);
//             }
//             const data = await response.json();
//             console.log("Registration successful:", data);
//             navigation.navigate("Login");
//         } catch (error) {
//             console.error("Error during registration:", error.message);
//             setError("Registration failed. Please try again. Error: " + error.message);
//         } finally {
//             setLoading(false);
//         }
//     };

//     const picker = async () => {
//         let { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
//         if (status !== 'granted') {
//             alert("Permission denied!");
//         } else {
//             let res = await ImagePicker.launchImageLibraryAsync();
//             if (!res.cancelled) {
//                 change('avatar', res.assets[0]);
//             }
//         }
//     };

//     const change = (field, value) => {
//         setUser(current => {
//             return { ...current, [field]: value };
//         });
//     };

//     return (
//         <View>
//             <Image style={Styles.imgBackGround} source={require('./assets/images/user.jpeg')} />
//             <View style={[Styles.view, MyStyles.absolute]}>
//                 <Text style={Styles.title}>Register</Text>
//                 <TextInput value={user.first_name} onChangeText={t => change("first_name", t)} placeholder="FirstName..." style={Styles.input} />
//                 <TextInput value={user.last_name} onChangeText={t => change("last_name", t)} placeholder="LastName..." style={Styles.input} />
//                 <TextInput value={user.username} onChangeText={t => change("username", t)} placeholder="Username..." style={Styles.input} />
//                 <TextInput value={user.password} onChangeText={t => change("password", t)} secureTextEntry={true} placeholder="Password..." style={Styles.input} />
//                 <TextInput value={confirmPassword} onChangeText={setConfirmPassword} secureTextEntry={true} placeholder="Confirm Password..." style={Styles.input} />
//                 <TouchableOpacity onPress={picker}>
//                     <Text style={Styles.input}>Choose avatar...</Text>
//                 </TouchableOpacity>
//                 {user.avatar ? <Image style={Styles.image} source={{ uri: user.avatar.uri }} /> : null}
//                 <TouchableOpacity onPress={register} disabled={loading}>
//                     <Text style={Styles.button}>{loading ? "Loading..." : "Register"}</Text>
//                 </TouchableOpacity>
//                 {error ? <Text style={Styles.error}>{error}</Text> : null}
//             </View>
//         </View>
//     );
// };

// export default Register;

import { useState } from "react";
import { View, Text, ScrollView, KeyboardAvoidingView, Platform, Alert, Image, ImageBackground } from "react-native";
import { Button, HelperText, TextInput, TouchableRipple, RadioButton } from "react-native-paper";
import MyStyles from "../../styles/MyStyles";
import * as ImagePicker from 'expo-image-picker';
import API, { endpoints } from "../../configs/APIs";
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

    const [user, setUser] = useState({ gender: "male" });
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
        if (user.password !== user.confirm) setErr(true);
        else {
            setErr(false);
            let form = new FormData();
            for (let k in user) {
                if (k !== 'confirm') {
                    if (k === 'avatar') {
                        form.append(k, {
                            uri: user.avatar.uri,
                            name: user.avatar.uri.split('/').pop(),
                            type: user.avatar.type || 'image/jpeg'
                        });
                    } else {
                        form.append(k, user[k]);
                    }
                }
            }
            console.log("Data to be sent:", form);
            setLoading(true);
            try {
                let res = await API.post(endpoints['register'], form, {
                    headers: { 'Content-Type': 'multipart/form-data' }
                });
                if (res.status === 201) {
                    nav.navigate("Login");
                } else {
                    throw new Error("Registration failed. Please try again.");
                }
            } catch (ex) {
                console.error('API Error: ', ex);
                Alert.alert("Registration Error", ex.message);
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
                            color="white" // Màu chữ cho RadioButton
                        >
                            <View style={{ flexDirection: 'row', justifyContent: 'center'}}>
                                <View style={[MyStyles.radioContainer, { marginRight: 50 }]}>
                                    <RadioButton 
                                        value="men" 
                                        uncheckedColor="rgba(255, 255, 255, 0.5)" // Màu nền cho RadioButton khi không được chọn
                                        color="white" // Màu chữ cho RadioButton khi được chọn
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