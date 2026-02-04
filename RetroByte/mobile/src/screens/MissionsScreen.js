import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, FlatList, Alert } from 'react-native';
import { missions } from '../api';

const MissionsScreen = ({ navigation }) => {
  const [missionList, setMissionList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadMissions();
  }, []);

  const loadMissions = async () => {
    try {
      const data = await missions.getAll();
      setMissionList(data);
    } catch (err) {
      console.error('Failed to load missions', err);
    } finally {
      setLoading(false);
    }
  };

  const handleAcceptMission = async (missionId) => {
    try {
      await missions.accept(missionId);
      Alert.alert('Success', 'Mission accepted! Start taking real-world eco-actions.');
    } catch (err) {
      Alert.alert('Error', 'Failed to accept mission');
    }
  };

  const renderMissionCard = ({ item }) => (
    <View style={styles.missionCard}>
      <Text style={styles.missionTitle}>{item.title}</Text>
      <Text style={styles.missionDesc}>{item.description}</Text>

      <View style={styles.missionMeta}>
        <Text style={styles.type}>{item.type}</Text>
        <Text style={styles.difficulty}>{item.difficulty}</Text>
      </View>

      <View style={styles.rewards}>
        <Text style={styles.rewardText}>💰 {item.rewardCoins} coins</Text>
        <Text style={styles.rewardText}>⭐ {item.rewardExperience} XP</Text>
      </View>

      <TouchableOpacity
        style={styles.acceptBtn}
        onPress={() => handleAcceptMission(item._id)}
      >
        <Text style={styles.acceptBtnText}>Accept Mission</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🎯 Eco Missions</Text>
      <Text style={styles.subtitle}>
        Complete real-world environmental actions and earn rewards!
      </Text>

      {loading ? (
        <View style={styles.loadingContainer}>
          <Text>Loading missions...</Text>
        </View>
      ) : (
        <FlatList
          data={missionList}
          renderItem={renderMissionCard}
          keyExtractor={(item) => item._id}
          contentContainerStyle={{ padding: 10, paddingBottom: 20 }}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    padding: 15,
  },
  subtitle: {
    paddingHorizontal: 15,
    color: '#666',
    marginBottom: 10,
  },
  missionCard: {
    backgroundColor: '#fff',
    padding: 15,
    marginBottom: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  missionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  missionDesc: {
    color: '#666',
    marginBottom: 10,
  },
  missionMeta: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 10,
  },
  type: {
    backgroundColor: '#e8f5e9',
    color: '#2e7d32',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 5,
    fontSize: 12,
  },
  difficulty: {
    backgroundColor: '#fff3e0',
    color: '#e65100',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 5,
    fontSize: 12,
  },
  rewards: {
    flexDirection: 'row',
    gap: 15,
    marginBottom: 10,
    backgroundColor: '#f5f5f5',
    padding: 10,
    borderRadius: 5,
  },
  rewardText: {
    fontWeight: 'bold',
    color: '#333',
  },
  acceptBtn: {
    backgroundColor: '#667eea',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  acceptBtnText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default MissionsScreen;
