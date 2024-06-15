import React from 'react';
import { View, Text, Button, TouchableOpacity, StyleSheet } from 'react-native';
import { BarChart } from 'react-native-chart-kit';

const UserStatsScreen = ({ userStats, onClose, onBlockUser }) => {
  const chartData = {
    labels: Object.keys(userStats),
    datasets: [
      {
        data: Object.values(userStats),
      },
    ],
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Thống Kê Report</Text>
      <View style={styles.chartContainer}>
        <BarChart
          data={chartData}
          width={300}
          height={200}
          yAxisLabel="Reports"
          chartConfig={{
            backgroundColor: '#fff',
            backgroundGradientFrom: '#fff',
            backgroundGradientTo: '#fff',
            decimalPlaces: 0,
            color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            style: {
              borderRadius: 16,
            },
          }}
          style={styles.chart}
        />
      </View>
      <View style={styles.userStatsContainer}>
        {Object.keys(userStats).map((userId) => (
          <View key={userId} style={styles.userStatItem}>
            <Text>Người bị report: {userId}</Text> 
            <Text>Người report: {userStats[userId]}</Text>
            <TouchableOpacity
              style={styles.blockButton}
              onPress={() => onBlockUser(userId)}
            >
              <Text style={styles.blockButtonText}>Khóa</Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>
      <Button
        title="Đóng"
        onPress={onClose}
        style={styles.closeButton}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#fff', // Background color white
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  chartContainer: {
    marginBottom: 20,
  },
  chart: {
    marginVertical: 8,
    borderRadius: 16,
  },
  userStatsContainer: {
    alignItems: 'center',
  },
  userStatItem: {
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingBottom: 10,
    width: '80%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  blockButton: {
    backgroundColor: '#f44336',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  blockButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  closeButton: {
    marginTop: 20,
  },
});

export default UserStatsScreen;
