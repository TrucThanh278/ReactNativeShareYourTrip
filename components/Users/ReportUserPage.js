import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, Alert } from 'react-native';
import { authApi, endpoints } from '../../configs/APIs';

const ReportUserPage = ({ userId, token }) => {
    const [reportContent, setReportContent] = useState('');

    useEffect(() => {
        console.log('Token:', token);
        console.log('User ID:', userId);
    }, []);

    const handleReport = async () => {
        if (!reportContent.trim()) {
            Alert.alert('Lý do trống', 'Bạn phải bổ sung lý do');
            return;
        }

        if (!token) {
            Alert.alert('Lỗi', 'Vui lòng đăng nhập');
            return;
        }

        try {
            const api = authApi(token);
            const response = await api.post(endpoints['report-user'], {
                reported_user: userId,
                content: reportContent
            });
            if (response.status === 200 || response.status === 201) {
                Alert.alert('Report thành công', 'Bạn đã report thành công!');
                setReportContent('');
            } else {
                console.error('Response status:', response.status);
                console.error('Response data:', response.data);
                throw new Error('Network response was not ok');
            }
        } catch (error) {
            console.error('Report failed:', error);
            Alert.alert('Report thất bại', 'Đã xảy ra lỗi khi báo cáo người dùng. Vui lòng thử lại sau.');
        }
    };

    return (
        <View>
            <TextInput
                placeholder="Nhập lý do báo cáo"
                value={reportContent}
                onChangeText={setReportContent}
                multiline
                style={{ height: 100, borderColor: 'gray', borderWidth: 1, marginBottom: 10, padding: 10 }}
            />
            <Button title="Báo cáo" onPress={handleReport} />
        </View>
    );
};

export default ReportUserPage;

