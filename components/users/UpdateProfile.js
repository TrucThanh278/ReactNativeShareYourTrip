
import React, { useState, useContext } from "react";
import { View, Text, TextInput, StyleSheet, Button, Alert } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { authApi, endpoints } from '../../configs/APIs'; // Import cấu hình API
import MyStyles from "../../styles/MyStyles";
import { MyDispatchContext, MyUserContext } from "../../configs/Context";
import * as DocumentPicker from 'expo-document-picker';

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
        avatar: null // Initialize avatar state
    });

    const handleChange = (name, value) => {
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleAvatarPick = async () => {
        const result = await DocumentPicker.getDocumentAsync({
            type: 'image/*',
            copyToCacheDirectory: true
        });
        if (result.type === 'success') {
            setFormData({
                ...formData,
                avatar: result.uri
            });
        }
    };

    const handleSubmit = async () => {
        try {
            const token = await AsyncStorage.getItem('token');
            if (token) {
                const formDataObj = new FormData();
                formDataObj.append('first_name', formData.first_name);
                formDataObj.append('last_name', formData.last_name);
                formDataObj.append('email', formData.email);
                formDataObj.append('phone_number', formData.phone_number);
                formDataObj.append('gender', formData.gender);
                formDataObj.append('address', formData.address);
                formDataObj.append('date_of_birth', formData.date_of_birth);
                formDataObj.append('password', formData.password);
                if (formData.avatar) {
                    formDataObj.append('avatar', {
                        uri: formData.avatar,
                        type: 'image/jpeg',
                        name: 'avatar.jpg'
                    });
                }

                const response = await fetch(`http://192.168.1.48:8000${endpoints['current-user']}`, {
                    method: 'PATCH',
                    headers: {
                        'Authorization': `Bearer ${token}`
                    },
                    body: formDataObj
                });

                if (response.ok) {
                    const data = await response.json();
                    dispatch({ type: 'update_user', payload: data });
                    Alert.alert('Thành công', 'Cập nhật hồ sơ thành công');
                    navigation.goBack(); // Quay lại màn hình hồ sơ
                } else {
                    throw new Error('Có lỗi xảy ra khi cập nhật hồ sơ');
                }
            }
        } catch (error) {
            Alert.alert('Lỗi', error.message);
        }
    };

    return (
        <View style={MyStyles.container}>
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
            <Button title="Chọn ảnh đại diện" onPress={handleAvatarPick} />
            <Button title="Cập nhật hồ sơ" onPress={handleSubmit} />
        </View>
    );
};

const styles = StyleSheet.create({
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 10,
        paddingHorizontal: 10,
    },
});

export default UpdateProfile;
