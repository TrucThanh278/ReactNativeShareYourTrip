import React, { useState, useContext } from "react";
import {
	View,
	Text,
	TextInput,
	StyleSheet,
	Button,
	Alert,
	Image,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { authApi, endpoints } from "../../configs/APIs"; // Import cấu hình API
import MyStyles from "../../styles/MyStyles";
import { MyDispatchContext, MyUserContext } from "../../configs/Context";
import * as ImagePicker from 'expo-image-picker';
import { TouchableRipple } from 'react-native-paper';
import { ScrollView } from "react-native-gesture-handler";

const UpdateProfile = ({ navigation }) => {
    const dispatch = useContext(MyDispatchContext);
    const user = useContext(MyUserContext);

    const [formData, setFormData] = useState({
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        phone_number: user.phone_number,
        gender: user.gender,
        address: user.address,
        date_of_birth: user.date_of_birth,
        password: '',
        avatar: user.avatar // Sử dụng avatar từ context người dùng
    });

    const handleChange = (name, value) => {
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleAvatarPick = async () => {
        let { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
            Alert.alert("iCourseApp", "Permissions Denied!");
        } else {
            let res = await ImagePicker.launchImageLibraryAsync({ mediaTypes: ImagePicker.MediaTypeOptions.Images, allowsEditing: true, aspect: [4, 3], quality: 1 });
            if (!res.cancelled) {
                setFormData({
                    ...formData,
                    avatar: res.assets[0].uri
                });
            }
        }
    };

	const handleAvatarPick = async () => {
		let { status } =
			await ImagePicker.requestMediaLibraryPermissionsAsync();
		if (status !== "granted") {
			Alert.alert("iCourseApp", "Permissions Denied!");
		} else {
			let res = await ImagePicker.launchImageLibraryAsync({
				mediaTypes: ImagePicker.MediaTypeOptions.Images,
				allowsEditing: true,
				aspect: [4, 3],
				quality: 1,
			});
			if (!res.cancelled) {
				setFormData({
					...formData,
					avatar: res.assets[0].uri,
				});
			}
		}
	};

	const handleSubmit = async () => {
		try {
			const token = await AsyncStorage.getItem("token");
			if (!token) {
				throw new Error("Token không tồn tại");
			}

            const response = await fetch(`http://192.168.1.30:8000${endpoints['current-user']}`, {
                method: 'PATCH',
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                body: formDataObj
            });


			const response = await fetch(
				`http://192.168.1.6:8000${endpoints["current-user"]}`,
				{
					method: "PATCH",
					headers: {
						Authorization: `Bearer ${token}`,
					},
					body: formDataObj,
				}
			);

			const responseData = await response.json();

    return (
        <ScrollView style={[ styles.colorGround]}>
            <View style={[styles.background,MyStyles.margin, styles.margin]}>
                {user.avatar && (
                    <Image source={{ uri: user.avatar }} style={styles.avatar} />
                )}
                <Text style={styles.name}>{formData.first_name} {formData.last_name}</Text>
            </View>

            <ScrollView style={[styles.background,MyStyles.margin, styles.marginBot]}>
                <TouchableRipple onPress={handleAvatarPick}>
                    <Text style={[MyStyles.margin, { color: 'white', marginTop: 20 }]}>Chọn ảnh đại diện...</Text>
                </TouchableRipple>

                <TextInput
                    style={styles.input}
                    placeholder="Tên"
                    value={formData.first_name}
                    onChangeText={(value) => handleChange('first_name', value)}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Họ"
                    value={formData.last_name}
                    onChangeText={(value) => handleChange('last_name', value)}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Email"
                    value={formData.email}
                    onChangeText={(value) => handleChange('email', value)}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Số điện thoại"
                    value={formData.phone_number}
                    onChangeText={(value) => handleChange('phone_number', value)}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Giới tính"
                    value={formData.gender}
                    onChangeText={(value) => handleChange('gender', value)}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Địa chỉ"
                    value={formData.address}
                    onChangeText={(value) => handleChange('address', value)}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Ngày sinh"
                    value={formData.date_of_birth}
                    onChangeText={(value) => handleChange('date_of_birth', value)}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Mật khẩu"
                    value={formData.password}
                    secureTextEntry
                    onChangeText={(value) => handleChange('password', value)}
                />

                <View style={styles.buttonContainer}>
                    <Button title="Cập nhật hồ sơ" onPress={handleSubmit} />
                </View>
            </ScrollView>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 10,
        paddingHorizontal: 10,
        width: "90%",
        borderRadius: 10,
        alignSelf: "center"
    },
    avatar: {
        width: 100,
        height: 100,
        marginBottom: 10,
        borderRadius: 50,
        alignSelf: 'center',
    },
    buttonContainer: {
        marginVertical: 10,
    },
    background: {
        backgroundColor: "#ffff",
        borderRadius: 20,
        padding: 15,
    },
    margin: {
        marginTop:10,
        marginBottom:5
    },
    marginBot:{
        marginBottom:10
    },
    name: {
        alignSelf: 'center',
        fontSize: 18,
        fontWeight: "400"
    },
    colorGround:{
        backgroundColor: "#efefef"
    }
});

export default UpdateProfile;

