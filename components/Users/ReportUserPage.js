import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, Alert } from 'react-native';
import { authApi, endpoints } from '../../configs/APIs';

const ReportUserPage = ({ userId, token }) => {
    const [reportContent, setReportContent] = useState('');

    useEffect(() => {
        console.log('Token:', token);
        console.log('User ID:', userId);
    }, []); // Chỉ chạy một lần sau khi component được render lần đầu tiên

    const handleReport = async () => {
        try {
            const api = authApi(token);
            const response = await api.post(endpoints['report-user'], {
                reported_user: userId,
                content: reportContent
            });
            Alert.alert('Report Success', 'User has been reported successfully!');
        } catch (error) {
            console.error('Report failed:', error);
            Alert.alert('Report Failed', 'An error occurred while reporting user. Please try again later.');
        }
    };

    return (
        <View>
            <TextInput
                placeholder="Enter report content"
                value={reportContent}
                onChangeText={setReportContent}
                multiline
            />
            <Button title="Report" onPress={handleReport} />
        </View>
    );
};

export default ReportUserPage;

