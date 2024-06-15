
import React, { useContext } from 'react';
import { Button } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { MyDispatchContext } from '../../configs/Context';
import axios from 'axios';

const Logout = ({ navigation }) => {
    const dispatch = useContext(MyDispatchContext);

    const logout = async () => {
        try {
            const token = await AsyncStorage.getItem("token");

            // Gửi yêu cầu để xóa accessToken từ backend
            if (token) {
                await axios.delete('http://192.168.1.30:8000/api/logout', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
            }

            // Xóa accessToken từ AsyncStorage
            await AsyncStorage.removeItem("token");
            console.log("Token removed successfully from AsyncStorage");

            // Dispatch action để đánh dấu người dùng đã logout
            dispatch({ type: "logout" });

            // Chuyển hướng người dùng đến màn hình đăng nhập
            navigation.navigate("Login");
        } catch (e) {
            console.error("Failed to remove the user token or logout from backend.", e);
        }
    };

    return <Button icon="logout" mode="contained" onPress={logout}>Thoát</Button>;
};

export default Logout;
