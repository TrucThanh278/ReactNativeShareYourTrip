import React, { useState, useEffect } from 'react';
import { View, Text, Button, Alert, StyleSheet, ScrollView, Modal } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { authApi, endpoints } from '../../configs/APIs';
import UserStatsScreen from './UserStatsScreen';

const ManageReports = () => {
  const [reports, setReports] = useState([]);
  const [token, setToken] = useState(null);
  const [userStats, setUserStats] = useState({});
  const [showUserStats, setShowUserStats] = useState(false);

  useEffect(() => {
    const getToken = async () => {
      try {
        const storedToken = await AsyncStorage.getItem('token');
        if (storedToken) {
          setToken(storedToken);
          fetchReports(storedToken);
        } else {
          Alert.alert('Error', 'Token not found');
        }
      } catch (error) {
        console.error('Error fetching token:', error.message);
        Alert.alert('Lỗi', 'Vui lòng đăng nhập');
      }
    };

    getToken();
  }, []);

  const fetchReports = async (token) => {
    try {
      const api = authApi(token);
      const response = await api.get(endpoints.reports);

      if (response.data && Array.isArray(response.data) && response.data.length > 0) {
        setReports(response.data);
        calculateUserStats(response.data);
      } else {
        setReports([]);
        setUserStats({});
        console.log('No reports found or invalid data:', response.data);
      }
    } catch (error) {
      console.error('Error fetching reports:', error.response?.data || error.message);
      Alert.alert('Lỗi', 'Block người dùng không thành công');
    }
  };

  const calculateUserStats = (reports) => {
    const stats = {};
    reports.forEach((report) => {
      const { reported_user } = report;
      if (stats[reported_user]) {
        stats[reported_user]++;
      } else {
        stats[reported_user] = 1;
      }
    });
    setUserStats(stats);
  };

  const handleBlockUser = async (userId) => {
    try {
      const api = authApi(token);
      await api.post(endpoints.blockUser(userId));

      Alert.alert('Thành công', 'Block người dùng thành công');
      fetchReports(token);
    } catch (error) {
      console.error('Error blocking user:', error.response?.data || error.message);
      Alert.alert('Lỗi', 'Block người dùng không thành công');
    }
  };

  const toggleUserStatsModal = () => {
    setShowUserStats(!showUserStats);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Danh sách Report</Text>
      <Button
        title="Thống kê danh sách Report"
        onPress={toggleUserStatsModal}
        style={styles.statsButton}
      />
      <ScrollView>
        {reports.map((report) => (
          <View key={report.id} style={styles.reportContainer}>
            <Text>Report ID: {report.id}</Text>
            <Text>Ngày tạo: {new Date(report.created_date).toLocaleString()}</Text>
            <Text>Lý do: {report.content}</Text>
            <Text>Người tạo: {report.reporter}</Text>
            <Text>Report: {report.reported_user_username}</Text>
          </View>
        ))}
      </ScrollView>
      <Modal
        visible={showUserStats}
        animationType="slide"
        transparent={true}
        onRequestClose={toggleUserStatsModal}
      >
        <UserStatsScreen
          userStats={userStats}
          onClose={toggleUserStatsModal}
          onBlockUser={handleBlockUser}
        />
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  reportContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 12,
    marginBottom: 12,
  },
  statsButton: {
    marginVertical: 10,
  },
});

export default ManageReports;
