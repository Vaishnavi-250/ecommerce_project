import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { user } from '../api';

const HomeScreen = ({ navigation }) => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadUserData();
  }, []);

  const loadUserData = async () => {
    try {
      const profile = await user.getProfile();
      const stats = await user.getStats();
      setUserData({ ...profile, ...stats });
    } catch (err) {
      console.error('Failed to load user data', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading || !userData) {
    return (
      <View style={styles.container}>
        <Text>Loading dashboard...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Image
          source={{ uri: userData.avatar }}
          style={styles.avatar}
        />
        <View style={styles.headerInfo}>
          <Text style={styles.username}>{userData.username}</Text>
          <Text style={styles.level}>Level {userData.level}</Text>
        </View>
      </View>

      <View style={styles.statsContainer}>
        <View style={styles.statBox}>
          <Text style={styles.statLabel}>Experience</Text>
          <Text style={styles.statValue}>{userData.experience}</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={styles.statLabel}>Coins</Text>
          <Text style={styles.statValue}>💰 {userData.coins}</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={styles.statLabel}>Badges</Text>
          <Text style={styles.statValue}>{userData.badges?.length || 0}</Text>
        </View>
      </View>

      <View style={styles.achievementsContainer}>
        <Text style={styles.sectionTitle}>🏆 Achievements</Text>
        <View style={styles.achievementItem}>
          <Text>📚 Quizzes: {userData.achievements?.totalQuizzesCompleted || 0}</Text>
        </View>
        <View style={styles.achievementItem}>
          <Text>🎯 Missions: {userData.achievements?.totalMissionsCompleted || 0}</Text>
        </View>
        <View style={styles.achievementItem}>
          <Text>🌱 Eco-Actions: {userData.achievements?.totalEcoActionsLogged || 0}</Text>
        </View>
      </View>

      <View style={styles.quickActionsContainer}>
        <TouchableOpacity
          style={styles.quickAction}
          onPress={() => navigation.navigate('Quizzes')}
        >
          <Text style={styles.quickActionIcon}>📚</Text>
          <Text style={styles.quickActionText}>Quizzes</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.quickAction}
          onPress={() => navigation.navigate('Missions')}
        >
          <Text style={styles.quickActionIcon}>🎯</Text>
          <Text style={styles.quickActionText}>Missions</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: '#667eea',
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 15,
    borderWidth: 3,
    borderColor: '#fff',
  },
  headerInfo: {
    flex: 1,
  },
  username: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
  },
  level: {
    fontSize: 14,
    color: '#f0f0f0',
    marginTop: 5,
  },
  statsContainer: {
    flexDirection: 'row',
    padding: 15,
    gap: 10,
  },
  statBox: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
    marginBottom: 5,
  },
  statValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#667eea',
  },
  achievementsContainer: {
    padding: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  achievementItem: {
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
  },
  quickActionsContainer: {
    flexDirection: 'row',
    padding: 15,
    gap: 10,
  },
  quickAction: {
    flex: 1,
    backgroundColor: '#667eea',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  quickActionIcon: {
    fontSize: 32,
    marginBottom: 8,
  },
  quickActionText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default HomeScreen;
