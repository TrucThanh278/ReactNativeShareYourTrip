// import React, { useContext, useState } from "react"
// import { View, Text, TextInput, TouchableOpacity, Image } from "react-native"
// import { useNavigation } from "@react-navigation/native" // Import useNavigation hook

// import MyStyles from "../../styles/MyStyles"
// import Styles from "./Styles"
// import Context from "../../configs/Context"
// import APIs, { authAPI, endpoint } from "../../configs/APIs"

// const Login = () => { 
//     const navigation = useNavigation(); // Initialize navigation

//     const [username, setUsername] = useState("")
//     const [password, setPassword] = useState("")
//     const [user, dispatch] = useContext(Context)

//     const login = async () => {
//         try {
//             let res = await APIs.post(endpoint['login'], {
//                 'username': username,
//                 'password': password,
//                 'client_id':'Vbe8euZZQJoWJ2UzW9wDThg4hJEZHHbhFmnfj7UR',
//                 'client_secret':'cVm4w4hSdy4MtwbP4KuNgXkGPeQJ9yrQdBvXHGR6b3e97F2bYqQ81XJ49FEufzjcw4SKwpuOZQiCLsNelHY1MkuYTGBRcSqtWmSlebSUk27WfyDskCB2VeCQihnEKdZ2',
//                 'grant_type': 'password'
//             })
//             console.info(res.data)

//             let user = await authAPI(res.data.access_token).get(endpoint['current-user'])
//             dispatch({
//                 type: "login",
//                 payload: user.data
//             })
            
//         } catch (ex) {
//             console.error(ex)
//         }

//         // if (username === 'admin' && password === '123456') {
//         //     dispatch({
//         //         type: "login",
//         //         payload: {
//         //             username: "admin"
//         //         }
//         //     })
//         //     navigation.navigate("Home") // Navigate to Home screen
//         // } else {
//         //     alert("Invalid username or password") // Alert for invalid credentials
//         // }
//     }

//     return (
//         <View>
//             <Image  style={Styles.imgBackGround} source={require('./assets/images/user.jpeg')} />
//             <View style={[Styles.view, MyStyles.absolute]}>
//                 <Text style={Styles.title}>Sign up</Text>
//                 <TextInput 
//                     value={username} 
//                     onChangeText={text => setUsername(text)} 
//                     placeholder="Username..." 
//                     style={Styles.input}
//                 />
//                 <TextInput 
//                     value={password} 
//                     onChangeText={text => setPassword(text)} 
//                     secureTextEntry={true} 
//                     placeholder="Password..." 
//                     style={Styles.input}
//                 />
//                 <TouchableOpacity onPress={login}>
//                     <Text style={Styles.button}>Login</Text>
//                 </TouchableOpacity>
//             </View>
//         </View>
//     )
// }

// export default Login

import { useNavigation } from "@react-navigation/native";
import { useContext, useState } from "react";
import { View, Text, ImageBackground } from "react-native"; // Thêm ImageBackground từ thư viện react-native
import { Button, TextInput, Image } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import APIs, { authApi, endpoints } from "../../configs/APIs";
import { MyDispatchContext } from "../../configs/Context";
import MyStyles from "../../styles/MyStyles";
import Styles from "./Styles";

const Login = () => {
    const fields = [{
        label: "Username",
        icon: "account",
        field: "username"
    }, {
        label: "Password",
        icon: "eye",
        field: "password",
        secureTextEntry: true
    }];

    const [user, setUser] = useState({});
    const [loading, setLoading] = useState(false);
    const nav = useNavigation();
    const dispatch = useContext(MyDispatchContext);

    const change = (value, field) => {
        setUser(current => {
            return { ...current, [field]: value }
        })
    }

    const login = async () => {
        setLoading(true);
        try {
            const formData = new FormData();
            formData.append('username', user.username);
            formData.append('password', user.password);
            formData.append('client_id', 'WgOmpbfpdtDHqJjKnLNsMZS3xB6JgHP3hXHb3pFL');
            formData.append('client_secret', 'YZbc9zfyrp302BMQzjIYXvgJzNcluNPuBLffUoP4h0WNpCKQw6jPuy391jDCJc8NE5Aw2XxjIMgYMCqdiQT30ChrlVr1PNsfK4SmOZRogqB9aQnr7pCWNEsoNJbY5ufp');
            formData.append('grant_type', 'password');

            let res = await APIs.post(endpoints['login'], formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            await AsyncStorage.setItem("token", res.data.access_token);

            setTimeout(async () => {
                let user = await authApi(res.data.access_token).get(endpoints['current-user']);
                console.info(user.data);

                dispatch({
                    "type": "login",
                    "payload": user.data
                })

                nav.navigate("Home");
            }, 100);
        } catch (ex) {
            console.error(ex);
        } finally {
            setLoading(false);
        }
    }

    

    return (
        <ImageBackground source={require('./assets/images/user.jpeg')} style={{ flex: 1 }}>
            <View style={[MyStyles.container, MyStyles.margin]}>
                <Text style={[MyStyles.subject, MyStyles.name]}>MEMBER LOGIN</Text>
                {fields.map(f => <TextInput value={user[f.field]} onChangeText={t => change(t, f.field)} key={f.field} style={MyStyles.margin} label={f.label} secureTextEntry={f.secureTextEntry} right={<TextInput.Icon icon={f.icon} />} />)}
                <Button loading={loading} icon="account" mode="contained" onPress={login} buttonColor="rgb(79, 133, 13)" style={MyStyles.button}>LOGIN</Button>
            </View>
        </ImageBackground>

    );
}

export default Login;